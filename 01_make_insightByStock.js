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

var pad = function(n, width){
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

console.log( "[ S ] - " + Date.now() );

var _ROOT_PATH = process.cwd();
var target_date = process.argv[2];

var _forder_root = './data/01/';
var _forder_root_1 = './data/02/';
var target_folder = _forder_root + target_date;
var target_folder_csv = _forder_root + target_date + "/csv/"; 
var target_folder_json = _forder_root + target_date + "/json/"; 
var target_folder_bak = _forder_root_1 + target_date + "/bak/"; 

global.target_file_list = fs.readdirSync( target_folder_bak )

global._to = {};
global.arr = [];
var csvToJson = function( fileNm, folderNm ){
	console.log( fileNm + "-" + folderNm )
	if( !fileNm )
	{
		console.log( "file Not Found!" )
		++csvToJson.cnt
		return csvToJson( global.target_file_list[ csvToJson.cnt ], target_date)
	}

	if( fileNm.split(".")[1] == "json" )
	{
		console.log( "file is json" )
		++csvToJson.cnt;
		return csvToJson( global.target_file_list[ csvToJson.cnt ], target_date )
	}
	console.log( fileNm )
	folderNm = folderNm || target_date

	var filePath = target_folder_bak + fileNm;
	console.log( "[ S ] - " + Date.now() );
	if( !fs.existsSync( _forder_root + folderNm ) )
	{
		fs.mkdirSync( _forder_root + folderNm );
		fs.mkdirSync( _forder_root + folderNm + "/csv" );
		fs.mkdirSync( _forder_root + folderNm + "/json" );
		fs.mkdirSync( _forder_root + folderNm + "/bak" );
	}

	console.log( dateFormat_YYMMDD_HHMMSS() )

	var d = fs.readFileSync( filePath );
	var data = iconv.decode( d, 'EUC-KR').toString();
	var _d = data.split("\n")
	var i = 1, iLen = _d.length,io;
	for(;i<iLen;++i){
		io = _d[ i ];
		if( io == "" )
		{
			break;	
		}
		var _d00 = io.split( "\t" );
		/*
		시간	종목코드	종목명	거래원명	구분	순간거래량	누적순매수	추정가격	전일대비		등락률
		15:33:40	'200780	비씨월드제약	JP모간서울	매도	"-68"	"-980"	"12,900"	▼	"-50"	"-0.39"
		15:33:39	'192390	윈하이텍	JP모간서울	매수	"41"	"+2,881"	"3,350"	 	"0"	"0"
		15:33:38	'187220	디티앤씨	JP모간서울	매도	"-18"	"-857"	"6,280"	▼	"-10"	"-0.16"
		15:33:35	'156100	엘앤케이바이오	JP모간서울	매도	"-723"	"-3,278"	"9,510"	▼	"-310"	"-3.16"
		15:33:34	'151910	나노스	JP모간서울	매도	"-1,987"	"-39,985"	"4,420"	▲	"150"	"+3.51"
		15:33:32	'143160	아이디스	JP모간서울	매도	"-8"	"-670"	"22,900"	 	"0"	"0"
		15:33:32	'143240	사람인에이치알	JP모간서울	매수	"7"	"+802"	"39,400"	▲	"500"	"+1.29"
		15:33:31	'138610	나이벡	JP모간서울	매도	"-221"	"-6,749"	"22,800"	▼	"-300"	"-1.30"
		*/
		
		var _o ={
			_t : _d00[ 0 ].replace(/\:/gi,"")
			, tr : _d00[ 3 ].replace(/ /gi,"")
			, nm : _d00[ 2 ]
			, cd : _d00[ 1 ].replace(/\'/gi,"")
			
			, amt : _d00[ 5 ].replace(/\"/gi,"").replace(/\,/gi,"") * 1
			, s_amt : _d00[ 6 ].replace(/\"/gi,"").replace(/\,/gi,"").replace(/\+/gi,"") * 1
			, p : _d00[ 7 ].replace(/\"/gi,"").replace(/\,/gi,"") * 1
			, tt : ""
			, ydt : _d00[ 9 ].replace(/\"/gi,"").replace(/\,/gi,"") * 1
			, rt : parseFloat( _d00[ 10 ].replace(/\"/gi,"") )
			, ogText : io
		}

		if( _d00[ 4 ] == "매수" )
		{
			_o.tt = 1;
		}
		else
		{
			_o.tt = 0;
			//_o.amt = _o.amt * -1
		}
		
		//var key =  _d01[ 0 ].replace(/\"/gi,"").replace(/\,/gi,"");
		//if( _o.s_amt.indexOf( "-" ) == -1 )
		//{
		//	_o.s_amt = _d00[ 6 ].replace(/\"/gi,"").replace(/\,/gi,"").replace(/\+/gi,"") ) * -1;
		//}
		//else
		//{
		//	_o.s_amt = Number( _d00[ 6 ].replace(/\"/gi,"").replace(/\,/gi,"").replace(/\-/gi,"") ) * -1;
		//}

		_o.pp = _o.amt * _o.p
		var spl = ""
		if( _o.amt > 0 ) spl = "P" + _o.amt
		if( _o.amt < 0 ) spl = "M" + _o.amt*-1
		_o._id = _o[ "_t" ].toString().padStart(6, '0') + "_" + _o[ "cd" ]+ "_" + _o[ "tr" ] + "_" + spl;
		_o.ist_dt = dateFormat_Object();
		_o.dt = dateString_Object( target_date + _o[ "_t" ] )
		

		//if( !compare_o[ _o._id ] )
		//{
			if( !global._to[ _o._id ] ) global.arr.push( _o );
			global._to[ _o._id ] = {};	
		//}
		
		
	}	
	
	

	//var command = "move " + filePath.replace(/\//gi,"\\") +  " " + target_folder_bak.replace(/\//gi,"\\");
	//var r = execSync( command );
	//console.log( iconv.decode( r, 'EUC-KR').toString() );


	console.log( "[ E ] - " + Date.now() );



	if( target_file_list.length - 1 == csvToJson.cnt )
	{
		console.log( "end" )
		//fs.writeFileSync( target_folder_json + target_date + ".json", JSON.stringify(global.arr,null,4),{flag :'w'} )	
		//global.arr = [];
		FN01( global.arr, fileNm )
		csvToJson.cnt = 0
		//logic();
	}
	else
	{
		++csvToJson.cnt;
		csvToJson( global.target_file_list[ csvToJson.cnt ], target_date )
	}

}
csvToJson.cnt = 0;


var FN01 = function( arr,fileNm ){
	var o = {}
	console.log( "FN01" )
	var tt = {
	"0" : "s"
	, "1" : "b"
	}

	//var agencyInfo = fs.readFileSync( "d:/dev/krx_stock_info/data/agency/20220204/json/" + curDate + ".json" ).toString()
	//var a_agencyInfo = JSON.parse( agencyInfo )

	//var _o_agencyInfo = {}
	//var i = 0, iLen = a_agencyInfo.length,io;
	//for(;i<iLen;++i){
	//	io = a_agencyInfo[ i ]
	//
	//	_o_agencyInfo[io._id] = io.data
	//}

	//var siseInfo = fs.readFileSync( "d:/dev/krx_stock_info/data/sise/20220204/json/" + curDate + ".json" ).toString()
	//var a_siseInfo = JSON.parse( siseInfo )

	//var _o_siseInfo = {}
	//var i = 0, iLen = a_siseInfo.length,io;
	//for(;i<iLen;++i){
	//	io = a_siseInfo[ i ]
	
	//	_o_siseInfo[io._id] = io;
	//}

	var i = 0, iLen = arr.length,io;
	console.log( iLen )
	for(;i<iLen;++i){
		io = arr[ i ]
	
		if( !o[ io.nm ] ) o[ io.nm ]  = {};
		if( !o[ io.nm ][ "trs" ] ) o[ io.nm ][ "trs" ] = {};
		if( !o[ io.nm ][ "total" ] ) o[ io.nm ][ "total" ] = { pp : 0, s :0, b : 0,pp_amt:0, s_amt : 0, b_amt : 0 }
		if( !o[ io.nm ][ "trs" ][ io.tr ] ) o[ io.nm ][ "trs" ][ io.tr ] = { s : 0, b : 0, s_amt : 0, b_amt : 0 };

		o[ io.nm ][ "trs" ][ io.tr ][ tt[ io.tt ] ] += io.pp;
		o[ io.nm ][ "trs" ][ io.tr ][ tt[ io.tt ] + "_amt" ] += io.amt;
		o[ io.nm ][ "total" ][ tt[ io.tt ] ] += io.pp;
		o[ io.nm ][ "total" ][ tt[ io.tt ] + "_amt" ] += io.amt;
		o[ io.nm ][ "total" ].pp += io.pp;
		o[ io.nm ][ "total" ].pp_amt += io.amt;

		o[ io.nm ].cd = io.cd
		o[ io.nm ].nm = io.nm

		//o[ io.nm ].agency = _o_agencyInfo[ io.cd ]
		
		//o[ io.nm ].sum_fa ={
		//	f : o[ io.nm ][ "total" ].pp + io.pp,
		//	a : _o_agencyInfo[ io.cd ][ "기관합계" ].NETBID_TRDVAL,
		//	t : o[ io.nm ][ "total" ].pp + io.pp + _o_agencyInfo[ io.cd ][ "기관합계" ].NETBID_TRDVAL
		//};
		
		//debugger;
		//o[ io.nm ].sise = _o_siseInfo[ io.cd ]

		
	}
	
	fs.writeFileSync( target_folder_json + target_date + ".json", JSON.stringify(o,null,4),{flag :'w'} )	

}



var logic = function(){
	global.target_file_list = fs.readdirSync( target_folder_bak )
	if( global.target_file_list.length == 0 )
	{
		console.log("No Target! - Wait 10sec.")
		setTimeout(function(){
			logic();
		},10000)
	}
	else
	{
		csvToJson( global.target_file_list[ csvToJson.cnt ], target_date )	
	}
	
}

logic();