//--------------------------------------------------
var FILE_NM = "02_make_F_TR_DATA_REALTIME";
console.log( "Excute File Name : " + FILE_NM + ".js")
//--------------------------------------------------


var fs = require('fs');
var execSync = require('child_process').execSync;
var iconv = require( "iconv-lite" );
var spawn = require('child_process').spawn;

var execSync = require('child_process').execSync;
var iconv = require( "iconv-lite" );
var spawn = require('child_process').spawn;


var curDateTime = function(){
	var a = new Date()
	return a.getFullYear()
	+ String( a.getMonth() + 1 ).padStart(2, '0')
	+ String( a.getDate() ).padStart(2, '0')
	//+ String( a.getHours() ).padStart(2, '0')
	//+ String( a.getMinutes() ).padStart(2, '0')
	//+ String( a.getSeconds() ).padStart(2, '0');
}

var dateFormat_YYMMDDHHMMSS = function( date ){
	date = date || new Date();

	var YYYY = date.getFullYear();
	var MM = pad( date.getMonth() + 1, 2 );
	var DD = pad( date.getDate(), 2 );
	var H = pad( date.getHours(), 2 );
	var M = pad( date.getMinutes(), 2 );
	var S = pad( date.getSeconds(), 2 );

	return YYYY + MM + DD + H +  M + S;
};


var dateFormat_YYMMDD_HHMMSS = function( date ){
	date = date || new Date();

	var YYYY = date.getFullYear();
	var MM = pad( date.getMonth() + 1, 2 );
	var DD = pad( date.getDate(), 2 );
	var H = pad( date.getHours(), 2 );
	var M = pad( date.getMinutes(), 2 );
	var S = pad( date.getSeconds(), 2 );

	return YYYY + "-" + MM+ "-" + DD+ " " + H + ":" + M + ":" + S;
};


var dateFormat_HHMMSS = function( date ){
	date = date || new Date();

	var YYYY = date.getFullYear();
	var MM = pad( date.getMonth() + 1, 2 );
	var DD = pad( date.getDate(), 2 );
	var H = pad( date.getHours(), 2 );
	var M = pad( date.getMinutes(), 2 );
	var S = pad( date.getSeconds(), 2 );

	return (H +  M + S) * 1;
};

var dateFormat_Object = function( date ){
	date = date || new Date();
	var r = {
		y : date.getFullYear()
		, m : date.getMonth() + 1
		, d : date.getDate()
		, h : date.getHours()
		, mi : date.getMinutes()
		, s : date.getSeconds()
	
	};
	return r;
};

var dateString_Object = function( str ){
	if( !str ) return;

	var r = {
		y : str.substr(0,4) * 1
		, m : str.substr(4,2) * 1
		, d : str.substr(6,2) * 1
		, h : str.substr(8,2) * 1
		, mi : str.substr(10,2) * 1
		, s : str.substr(12,2) * 1
	
	};
	return r;
};

var dateFormat_YYMMDD = function( date ){
	date = date || new Date();

	var YYYY = date.getFullYear();
	var MM = pad( date.getMonth() + 1, 2 );
	var DD = pad( date.getDate(), 2 );
//	var H = pad( date.getHours(), 2 );
//	var M = pad( date.getMinutes(), 2 );
//	var S = pad( date.getSeconds(), 2 );

	return YYYY + MM + DD;// + H +  M + S;
};

var dateString_YYYYMMDD = function( str ){
	
	var YYYY = str.slice(0,4)
	var MM = str.slice(4,6)
	var DD = str.slice(6,8)

	return YYYY + "-" + MM + "-" + DD;

}

var pad = function(n, width){
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

var _ROOT_PATH = process.cwd();
var target_date = dateFormat_YYMMDD();//process.argv[2];

global._to = {};

var forders = [ "mass_trans_buy", "mass_trans_sell" ]

var csvToJson = function(){
	global.arr = [];	

	var fileNm  = forders[ csvToJson.cnt ];

	console.log( "[ s ] - " + fileNm + " - " + dateFormat_YYMMDD_HHMMSS() )


	var filePath = _ROOT_PATH + "/data/realTime/" + fileNm + "/csv/" + fileNm;
	var target_folder_json = _ROOT_PATH + "/data/realTime/" + fileNm + "/json/";

	var d = fs.readFileSync( filePath + ".txt" );
	var data = iconv.decode( d, 'EUC-KR').toString();
	var _d = data.split("\n")
	var i = 1, iLen = _d.length,io;
	for(;i<iLen;++i){
		io = _d[ i ];

		var _d00 = io.replace(/\'/gi,"").replace(/\"/gi,"").split( "\t" );
		
		if( _d00[1] == "" || _d00 == "" )
		{
			continue;
		}
		var toTimestamp = function( str){
			var dt = Date.parse( str )
				return dt
		}
		var _o ={
			_id : i
			, _t :  dateString_YYYYMMDD( target_date ) + "T" + _d00[ 0 ]//.replace(/\:/gi,"")
			//_t :  _d00[ 0 ]//.replace(/\:/gi,"")
			, cd : _d00[ 1 ].replace(/\'/gi,"")
			, nm : _d00[ 2 ]
			, price : _d00[ 3 ].replace(/\,/gi,"") * 1
			, amt : _d00[ 5 ].replace(/\,/gi,"") * 1
			, rt : parseFloat( _d00[ 4 ].replace(/\"/gi,"").replace(/\%/gi,"") )
			, ogText : io
			, type : 1
		}

		_o.pp = _o.amt * _o.price
		_o.ist_dt = dateFormat_Object();

		global.arr.push( _o )
		
		
	}	
	
	
	fs.writeFileSync( target_folder_json + fileNm + ".json", JSON.stringify(global.arr ),{flag :'w'} )	
	
	var o = {}
	var i = 0,iLen = global.arr.reverse().length,io;
	for(;i<iLen;++i){
		io = global.arr.reverse()[ i ];
		if( !o[ io.cd ] ) o[ io.cd ] = { nm : io.nm, total_pp : 0, amt : 0, cnt : 0, data : [],p : io.price, rt : io.rt }
		o[ io.cd ]._id = io.cd
		o[ io.cd ].total_pp += io.pp
		o[ io.cd ].amt += io.amt
		o[ io.cd ].cnt += 1
		o[ io.cd ].data.push( { _t : io._t, pp : io.pp, amt : io.amt, p : io.price, rt : io.rt } )
	}

	var r = [];
	var s,so;
	for( s in o ){
		so = o[ s ];
		r.push( so );
	}
	var _r = r.sort(function(a,b){ return a.pp - b.pp })
	fs.writeFileSync( target_folder_json + fileNm + "_rank.json", JSON.stringify( _r.reverse(),null,4 ),{flag :'w'} )	

	if( forders.length -1 == csvToJson.cnt )
	{

		console.log( "[ E ] - " + fileNm + " - " + dateFormat_YYMMDD_HHMMSS() );
		return;
	}
	else
	{
		console.log( "[ E ] - " + fileNm + " - " + dateFormat_YYMMDD_HHMMSS() );
		++csvToJson.cnt;
		return csvToJson();
	}
}
csvToJson.cnt = 0;


csvToJson();

//var logic = function(){
//	global.target_file_list = fs.readdirSync( target_folder_csv )
//	if( global.target_file_list.length == 0 )
//	{
//		console.log("No Target! - Wait 10sec.")
//		setTimeout(function(){
//			logic();
//		},10000)
//	}
//	else
//	{
//		csvToJson( fileNm, target_date )	
//	}
//	
//}

//logic();
