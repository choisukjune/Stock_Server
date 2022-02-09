var fs = require( "fs" );

var execSync = require('child_process').execSync;
var iconv = require( "iconv-lite" );
var spawn = require('child_process').spawn;

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

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
/*
 * @function
 * @param {String} str
 * @param {Number} n
 * @return {String} str
 */
var deleteLines = function( str, n ){
	var i = 0,iLen = n,io;
	for(;i<iLen;++i){ str = str.slice(str.indexOf("\n") + 1, str.length ); }
	//str = str.replace( /\t/g, '' );
	//str = str.replace( /\r\n/g, '' );
	return str;
};
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
/*
 * @function
 * @param {String} url
 * @return {Object} o
 */
var paramToObject = function( url ){
	
	var r =  url.split("?")[ 1 ];
	var a = r.split("&");
	var o = {};
	var i = 0,iLen = a.length,io;
	
	for(;i<iLen;++i){
		io = a[ i ];
		var _ta = io.split( "=" );
		o[ _ta[0] ] = _ta[ 1 ];
	}
	console.log( o )
	return o;
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


var dir_nm = "all"
var dir_date = "20220126"
var JSON_PATH = "./data/" + dir_nm + "/" + dir_date + "/json/";

var db_nm = "trading_volume";
var col_nm = "20220126"

var FUNC00 = function( file_nm ){

	console.log( "Target File - " + file_nm );
	var _tdbjs_nm = "insert__JSON";

	var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();

	var data = fs.readFileSync( JSON_PATH + file_nm ).toString();

	var query = _tQuery.replace( "<!=DB_NM=!>", db_nm )
		.replace( "<!=DATA=!>", data )
		.replace( "<!=COL_NM=!>", col_nm )
	var dbjs_nm = "insert_" + file_nm + ".dbjs";

	var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;

	fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
	var r = exec_query_DB( dbjs_nm )

	return;

}

var logic = function(){
	var a = fs.readdirSync( JSON_PATH );
	var i = 0,iLen = a.length,io;
	var _txt=""
	for(;i<iLen;++i){
		io = a[ i ];
		_txt += "FUNC00(" + io + ")\n"
	}
	console.log( _txt )
}

//logic();


//FUNC00(20220126_000022.json)
//FUNC00(20220126_000102.json)
//FUNC00(20220126_000132.json)
//FUNC00(20220126_002907.json)
//FUNC00(20220126_003336.json)
//FUNC00(20220126_003349.json)
//FUNC00(20220126_003430.json)
//FUNC00(20220126_003521.json)
//FUNC00(20220126_003853.json)
//FUNC00(20220126_003933.json)
//FUNC00(20220126_003952.json)
//FUNC00(20220126_004006.json)
//FUNC00(20220126_004021.json)
//FUNC00(20220126_004039.json)
//FUNC00(20220126_004050.json)
//FUNC00(20220126_004106.json)
//FUNC00(20220126_004129.json)
//FUNC00(20220126_004324.json)
//FUNC00(20220126_004340.json)
//FUNC00(20220126_004419.json)
//FUNC00(20220126_165201.json)
//FUNC00(20220126_200357.json)
//FUNC00(20220126_202828.json)
//FUNC00(20220126_215359.json)
//FUNC00(20220126_223546.json)
//FUNC00(20220126_230158.json)
//FUNC00(20220126_232213.json)
//FUNC00(20220126_232427.json)
//FUNC00(20220126_232501.json)
//FUNC00(20220126_232548.json)
//FUNC00(20220126_233333.json)
//FUNC00(20220126_233544.json)
//FUNC00(20220126_233836.json)
//FUNC00(20220126_234007.json)
//FUNC00(20220126_234051.json)
//FUNC00(20220126_234106.json)
//FUNC00("20220126_234217.json")
//FUNC00("20220126_234248.json")
//FUNC00("20220126_234312.json")
//FUNC00("20220126_234824.json")
//FUNC00("20220126_235006.json")
//FUNC00("20220126_235204.json")
//FUNC00("20220126_235257.json")
//FUNC00("20220126_235419.json")
//FUNC00("20220126_235450.json")
//FUNC00("20220126_235544.json")
//FUNC00("20220126_235649.json")
//FUNC00("20220126_235746.json")
//FUNC00("20220126_235847.json")
//FUNC00("20220126_235941.json")