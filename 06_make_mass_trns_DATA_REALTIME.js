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

console.log( "[ S ] - " + Date.now() );

var _ROOT_PATH = process.cwd();

var target_date = process.argv[2];

var _forder_root = './data/06/';
var target_folder = _forder_root + target_date;
var target_folder_csv = _forder_root + target_date + "/csv/"; 
var target_folder_json = _forder_root + target_date + "/json/"; 
var target_folder_bak = _forder_root + target_date + "/bak/"; 

global.target_file_list = fs.readdirSync( target_folder_csv )


global._to = {};

var csvToJson = function( fileNm, folderNm ){
	global.arr = [];	
	if( !fileNm ) return;
	console.log( fileNm )
	folderNm = folderNm || target_date

	var filePath = target_folder_csv + fileNm;
	
	if( !fs.existsSync( _forder_root + folderNm ) )
	{
		fs.mkdirSync( _forder_root + folderNm );
		fs.mkdirSync( _forder_root + folderNm + "/csv" );
		fs.mkdirSync( _forder_root + folderNm + "/json" );
		fs.mkdirSync( _forder_root + folderNm + "/bak" );
	}

	console.log( dateFormat_YYMMDD_HHMMSS() )

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
		
		/*
시간	코드	종목명	현재가	등락률	수량	구분
15:19:59	'104040	대성파인텍	"2,925"	"1.39%"	"3,650"	체결
15:19:59	'950130	엑세스바이오	"19,250"	"4.62%"	"2,604"	체결
15:19:59	'005390	신성통상	"3,790"	"3.41%"	"4,386"	체결
15:19:59	'005390	신성통상	"3,785"	"3.27%"	"3,028"	체결
15:19:58	'087260	모바일어플라이언스	"4,090"	"4.07%"	"2,974"	체결
15:19:58	'000020	동화약품	"12,700"	"2.01%"	"1,987"	체결
15:19:57	'073640	테라사이언스	"2,185"	"5.05%"	"7,880"	체결
15:19:57	'073640	테라사이언스	"2,180"	"4.81%"	"21,937"	체결
15:19:57	'094940	푸른기술	"9,420"	"1.73%"	"1,449"	체결
*/
		var toTimestamp = function( str){
			var dt = Date.parse( str )
				return dt
		}
		var _o ={
			_t :  dateString_YYYYMMDD( target_date ) + "T" + _d00[ 0 ]//.replace(/\:/gi,"")
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
	
	console.log( "[ E ] - " + Date.now() );

	if( target_file_list.length - 1 == csvToJson.cnt )
	{
		console.log( "end" )
		fs.writeFileSync( target_folder_json + fileNm + ".json", JSON.stringify(global.arr.reverse() ),{flag :'w'} )	
		
		//makeRankData( global.arr, fileNm, function(){
			var command = "node 06_insert_mass_trns_DATA_REALTIME.js " + target_date;
			var r = execSync( command );
			console.log( iconv.decode( r, 'EUC-KR').toString() );
			
			global.arr = [];

			csvToJson.cnt = 0	
		//})
		
		
		//logic();
	}
	else
	{
		++csvToJson.cnt;
		csvToJson( fileNm, target_date )
	}

}
csvToJson.cnt = 0;

//var makeRankData = function( arr,fileNm ){

//	var  o = {}
//	var i = 0,iLen = arr.length,io;
//	for(;i<iLen;++i){
//		io = arr[ i ];
//		if( !o[ io.cd ] ) o[ io.cd ] = { nm : io.nm, total_pp : 0, amt : 0, cnt : 0, data : [] }
//		o[ io.cd ]._id = io.cd
//		o[ io.cd ].total_pp += io.pp
//		o[ io.cd ].amt += io.amt
//		o[ io.cd ].cnt += 1
//		o[ io.cd ].data.push( { _t : io._t, pp : io.pp, amt : io.amt } )
//	}

//	var r = [];
//	var s,so;
//	for( s in o ){
//		so = o[ s ];
//		r.push( so );
//	}
//	var _r = r.sort(function(a,b){ return a.pp - b.pp })
//	fs.writeFileSync( target_folder_json + fileNm + "_rank.json", JSON.stringify( _r,null,4 ),{flag :'w'} )	

//}


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

csvToJson( target_date, target_date )	