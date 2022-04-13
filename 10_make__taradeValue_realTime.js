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

//--------------------------------------------------;
// REQUIRE;
//--------------------------------------------------;
var fs = require( "fs" );
var execSync = require('child_process').execSync;
var iconv = require( "iconv-lite" );
var spawn = require('child_process').spawn;

//--------------------------------------------------;
// VARIABLE;
//--------------------------------------------------;

global.CONST = {};
global.CONST.MongoDB = {};
global.CONST.MongoDB.OPTIONS = {
	"self" : { ID : "tjrwns", PWD : "123qweasdzxc", HOST : "localhost", PORT : 59320 }	
};

var ROOT_PATH = process.cwd();

var CP_COMMAND = {};
	CP_COMMAND.MONGO = "..\\Binary\\Mongodb\\mongodb-win32-x86_64-windows-4.4.3\\bin\\mongo";

var DBJS_DIRECTORY_PATH = ROOT_PATH + "/dbjs/";
var _tDbjs_PATH = ROOT_PATH + "/tdbjs/";
//var _JSON_PATH = ROOT_PATH.replace( /\\/gi, "/" ) + "/../crawler_sale_data/";

//-------------------------------------------------------;
// FUNCTION;
//-------------------------------------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

/*
 * @function
 * @param {String} dbjsNm
 * @param {boolean} bResult
 * @return {String} r
 */
var exec_query_DB = function( dbjsNm, bResult ){

	var DBJS_NM = dbjsNm;
	var FILE_PATH = ROOT_PATH + "\\dbjs\\" + DBJS_NM;

	var _t_command = CP_COMMAND.MONGO + " --username <!=ID=!> --password <!=PWD=!> --authenticationDatabase admin --host <!=HOST=!> --port <!=PORT=!> admin <!=FILE_PATH=!>";
	if( bResult ) _t_command = _t_command + " > " + dbjsNm + "__" + Date.now() + ".result";
	
	var command = _t_command.replace( "<!=ID=!>", global.CONST.MongoDB.OPTIONS.self.ID )
		.replace( "<!=PWD=!>", global.CONST.MongoDB.OPTIONS.self.PWD )
		.replace( "<!=HOST=!>", global.CONST.MongoDB.OPTIONS.self.HOST )
		.replace( "<!=PORT=!>", global.CONST.MongoDB.OPTIONS.self.PORT )
		.replace( "<!=FILE_PATH=!>", FILE_PATH );
	//console.log( command )
	var r = execSync( command ).toString();
		r = deleteLines( r , 4 )
	return r;
};


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

	return H + ":" +  M + ":" + S
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
var nowTime = dateFormat_HHMMSS();
var excuteCnt = process.argv[2] * 1;

global._to = {};

var csvToJson = function(){

	global.o = {};	

	var fileNm  = "tradeValue";
	var fileNmGap = "tradeValueGap";

	console.log( "[ S ] - " + fileNm + " - " + dateFormat_YYMMDD_HHMMSS() )


	var filePath = _ROOT_PATH + "/data/realTime/" + fileNm + "/csv/" + fileNm;
	var target_folder_json = _ROOT_PATH + "/data/realTime/" + fileNm + "/json/";
	var target_folder_gap_json = _ROOT_PATH + "/data/realTime/" + fileNmGap + "/json/";

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

/*
순위	종목코드	종목명	현재가	전일대비		등락률	거래량(장중)	전일비(장중)	거래회전율(장중)	금액(백만)
1	'005930	삼성전자	"69,100"	▼	"-500"	"-0.72"	"15,817,524"	"127.77"	"0.27%"	"1,093,551"
2	'001440	대한전선	"1,855"	▲	"5"	"+0.27"	"335,403,871"	"117.36"	"26.96%"	"649,413"
3	'000660	SK하이닉스	"116,000"	▼	"-2,000"	"-1.69"	"3,808,948"	"84.85"	"0.53%"	"443,434"
4	'016790	현대사료	"97,300"	▼	"-19,500"	"-16.70"	"2,820,374"	""	"45.86%"	"382,966"
5	'249420	일동제약	"65,500"	▼	"-2,700"	"-3.96"	"4,568,794"	"78.56"	"17.71%"	"302,896"
6	'011700	한신기계	"8,470"	▲	"230"	"+2.79"	"32,725,842"	"774.55"	"100.87%"	"294,378"
*/		
		var cd = _d00[ 1 ].replace(/\'/gi,"");
		if( !global.o[ cd ] ) global.o[ io.cd ] = {};

		global.o[ cd ] ={
			_t :  dateString_YYYYMMDD( target_date ) + "T" + nowTime//.replace(/\:/gi,"")
			//_t :  _d00[ 0 ]//.replace(/\:/gi,"")
			, cd : cd
			, nm : _d00[ 2 ]
			, prevChange : _d00[ 5 ].replace(/\,/gi,"") * 1
			, prevChange_reg : _d00[ 8 ] * 1
			, price : _d00[ 3 ].replace(/\,/gi,"") * 1
			, amt : _d00[ 7 ].replace(/\,/gi,"") * 1
			, stockRotation : parseFloat( _d00[ 8 ].replace("%","") )
			, tradeValue : _d00[ 10 ].replace(/\,/gi,"") * 1
			, rt : parseFloat( _d00[ 6 ].replace("%","") )
			, ogText : io
		}
		global.o[ cd ].dt = dateFormat_Object();		
	}	
	
	if( excuteCnt == 1 )
	{
		fs.writeFileSync( target_folder_json + fileNm + ".json", JSON.stringify( global.o ),{flag :'w'} )
	}
	else
	{
		var prevData = JSON.parse( fs.readFileSync( target_folder_json + fileNm + ".json" ).toString() );
		var curData = global.o;

		fs.writeFileSync( target_folder_json + fileNm + ".json", JSON.stringify( global.o ),{flag :'w'} )
		
		var data = [];
		
		var s,so,so00;
		for( s in curData ){
			so = curData[ s ];
			so00 = prevData[ s ];
			try
			{
				if( !so || !so00 ) continue;
				if( so.tradeValue - so00.tradeValue > 0 )
				{
					so.tradeValueGap = so.tradeValue - so00.tradeValue
					so.curRt = so.rt
					so.prevRt = so00.rt
					so.rtChange = so.rt - so00.rt

					data.push( so )

				}
			}
			catch( er )
			{
				debugger;
			}

			fs.writeFileSync( target_folder_gap_json + fileNm + ".json", JSON.stringify( data ),{flag :'w'} )
			JSONtoDb( fileNm );
		}
	}

	
	

	console.log( "[ E ] - " + fileNm + " - " + dateFormat_YYMMDD_HHMMSS() )
}


var JSONtoDb = function( filename ){

	console.log( "[ S ] - " + Date.now() );
	console.log( filename )

	var filePath = target_folder_gap_json + filename + ".json";
	
	var _tdbjs_nm = "insertTradeValueInfo_gap.tdbjs";	

	
	var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
	var data = fs.readFileSync( filePath ).toString();

	var query = _tQuery.replace( "<!=DATA=!>", data )
			.replace( /<!=DATE=!>/gi, target_date )
	var dbjs_nm = _tdbjs_nm + ".dbjs";

	var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
	
	fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
	var r = exec_query_DB( dbjs_nm )

	console.log( "[ E ] - " + Date.now() );
	
	//var command = "move " + filePath.replace(/\//gi,"\\") +  " " + target_folder_bak.replace(/\//gi,"\\");
	
	//var r = execSync( command );
	//console.log( iconv.decode( r, 'EUC-KR').toString() );
	
	//if( global.target_file_list.length - 1 == JSONtoDb.cnt )
	//{
	//	console.log( "end" )
	//	JSONtoDb.cnt = 0;
	//	//logic();
	//	
	//}
	//else
	//{
	//	++JSONtoDb.cnt;
	//	JSONtoDb( global.target_file_list[ JSONtoDb.cnt ] )
	//}
}



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
