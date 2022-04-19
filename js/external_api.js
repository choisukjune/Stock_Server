//-------------------------------------------------------;
var fileNm = "js/external_api.js";
if( console ) console.log( "[ S ] - " + fileNm + "----------" );
//-------------------------------------------------------;
(function(){
//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var fs = require( "fs" );
var url = require('url');
var http = require('http');
var execSync = require('child_process').execSync;
var iconv = require( "iconv-lite" );
var spawn = require('child_process').spawn;

//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;

var ROOT_PATH = process.cwd();

var CP_COMMAND = {};
	CP_COMMAND.MONGO = "..\\Binary\\Mongodb\\mongodb-win32-x86_64-windows-4.4.3\\bin\\mongo";
	//CP_COMMAND.MONGO = "mongo";

var DBJS_DIRECTORY_PATH = ROOT_PATH + "/dbjs/";
var _tDbjs_PATH = ROOT_PATH + "/tdbjs/";

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
	var FILE_PATH = ROOT_PATH + "/dbjs/" + DBJS_NM;
	var fileNm = ROOT_PATH + "\\result\\" + dbjsNm + "__" + Date.now() 
	
	var _t_command = CP_COMMAND.MONGO + " --username <!=ID=!> --password <!=PWD=!> --authenticationDatabase admin --host <!=HOST=!> --port <!=PORT=!> admin \"<!=FILE_PATH=!>\"";
	    _t_command = _t_command + " > " + fileNm + ".result";
	
	var command = _t_command.replace( "<!=ID=!>", global.CONST.MongoDB.OPTIONS.self.ID )
		.replace( "<!=PWD=!>", global.CONST.MongoDB.OPTIONS.self.PWD )
		.replace( "<!=HOST=!>", global.CONST.MongoDB.OPTIONS.self.HOST )
		.replace( "<!=PORT=!>", global.CONST.MongoDB.OPTIONS.self.PORT )
		.replace( "<!=FILE_PATH=!>", FILE_PATH );
	console.log( command )
	execSync( command );
	var r = fs.readFileSync( fileNm + ".result" ).toString();
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
var paramToObject = function( _url ){
	
//	var r =  url.split("?")[ 1 ];
//	var a = r.split("&");
//	var o = {};
//	var i = 0,iLen = a.length,io;
//	
//	for(;i<iLen;++i){
//		io = a[ i ];
//		var _ta = io.split( "=" );
//		o[ _ta[0] ] = _ta[ 1 ];
//	}
//	console.log( o )
	var queryData = url.parse( _url, true).query;
	return queryData;
};

var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

//-------------------------------------------------------;
// ROUTER;
//-------------------------------------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getNewsByCdFromDaum",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.DAUM.protocol + global.CONST.SERVER.CRWALER.DAUM.host + ":" + global.CONST.SERVER.CRWALER.DAUM.port
		http.get( url + '/getAllStockInfo?cd=' + paramsO.cd, function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getCandle5",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.DAUM.protocol + global.CONST.SERVER.CRWALER.DAUM.host + ":" + global.CONST.SERVER.CRWALER.DAUM.port
		http.get( url + '/getCandle5?cd=' + paramsO.cd, function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getTraderRank",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.DAUM.protocol + global.CONST.SERVER.CRWALER.DAUM.host + ":" + global.CONST.SERVER.CRWALER.DAUM.port
		http.get( url + '/getTraderRank?cd=' + paramsO.cd, function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getStockInfoByCd",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.DAUM.protocol + global.CONST.SERVER.CRWALER.DAUM.host + ":" + global.CONST.SERVER.CRWALER.DAUM.port
		http.get( url + '/getStockInfoByCd?cd=' + paramsO.cd, function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getStockInfoIntegration?cd=000660
	* </code>
	*/
	global.server.addRouter("/getStockInfoIntegration",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		http.get( url + '/getStockInfoByCd?cd=' + paramsO.cd, function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
		/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getIntegration
	* </code>
	*/
	global.server.addRouter("/getIntegrationByCd",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		http.get( url + '/getIntegrationByCd?cd=' + paramsO.cd, function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getStockInfoIntegration?cd=000660
	* </code>
	*/
	global.server.addRouter("/gitPull_Stock_Relay_Server__NAVER",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		http.get( url + '/gitPull', function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
		/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getWicsData",function( req, res ){

		var routerNm = req.url.split("?")[0];
		//var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.DAUM.protocol + global.CONST.SERVER.CRWALER.DAUM.host + ":" + global.CONST.SERVER.CRWALER.DAUM.port
		//http.get( url + '/getWicsData?cd=' + paramsO.cd, function(response){
		http.get( url + '/getWicsData', function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				debugger;
				res.end( d )
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getWicsDataByCd",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.DAUM.protocol + global.CONST.SERVER.CRWALER.DAUM.host + ":" + global.CONST.SERVER.CRWALER.DAUM.port
		http.get( url + '/getWicsDataByCd?cd=' + paramsO.cd, function(response){
		
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
	})
			/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getMarketIndex
	* </code>
	*/
	global.server.addRouter("/getMarketIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		//var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		//http.get( url + '/getWicsData?cd=' + paramsO.cd, function(response){
		http.get( url + '/getMarketIndex', function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
			/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/getMarketIndexGlobal
	* </code>
	*/
	global.server.addRouter("/getMarketIndexGlobal",function( req, res ){

		var routerNm = req.url.split("?")[0];
		//var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		//http.get( url + '/getWicsData?cd=' + paramsO.cd, function(response){
		http.get( url + '/getMarketIndexGlobal', function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
	/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getStockSearch",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		debugger;
		var url = global.CONST.SERVER.CRWALER.DAUM.protocol + global.CONST.SERVER.CRWALER.DAUM.host + ":" + global.CONST.SERVER.CRWALER.DAUM.port
		http.get( url + '/getStockSearch?q=' + paramsO.q, function(response){
			response.setEncoding('utf8');
			debugger;
			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})

		/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getNewsByCdFromNaver",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		http.get( url + '/getNewsByCd?cd=' + paramsO.cd, function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getCandleDataByCd",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		http.get( url + '/getCandleDataByCd?cd=' + paramsO.cd + "&startTime=" + paramsO.startTime + "&endTime=" + paramsO.endTime, function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})

				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getExchangeIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		http.get( url + '/getExchangeIndex', function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getEnergyIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		http.get( url + '/getEnergyIndex', function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})

				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getMetalIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		http.get( url + '/getMetalIndex', function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})

				/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getAgriculturalIndex",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
		http.get( url + '/getAgriculturalIndex', function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
		

	})
					/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/getAllStockInfo",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.CRWALER.KRX.protocol + global.CONST.SERVER.CRWALER.KRX.host + ":" + global.CONST.SERVER.CRWALER.KRX.port
		http.get( url + `/getAllStockInfo`, function(response){
			response.setEncoding('utf8');

			var d = "";
			response.on('end', function () {
				res.end( d )	
			});
	
			response.on('data', function (body) {
				d += body;
			});
		});
	})

		/**
	 * 쿼리파일을 실행하는 라우터
	 * @function
	 * @param {http.ClientRequest} req
	 * <code>
		{

		}
	* </code>
	*
	* @param {http.ClientResponse} res
	* <code>
		{

		}
	* </code>
	*
	* @example
	* <code>
		http://localhost:8888/find?brand=varihope&page=1
	* </code>
	*/
	global.server.addRouter("/ah/06",function( req, res ){

		var routerNm = req.url.split("?")[0];
		var paramsO = paramToObject( req.url );
				
		res.statusCode = 200;
		res.setHeader( "Access-Control-Allow-Headers", "Content-Type" );
		res.setHeader( "Access-Control-Allow-Origin", "*" );
		res.setHeader( "Access-Control-Allow-Methods", "OPTIONS,POST,GET" );
		res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
		
		var url = global.CONST.SERVER.API.AUTOH.protocol + global.CONST.SERVER.API.AUTOH.host + ":" + global.CONST.SERVER.API.AUTOH.port
		http.get( url + '/06?date=' + paramsO.date + "&type=" +paramsO.type, function(response){
			response.setEncoding('utf8');
			var d = "";
			response.on('end', function () {
				res.end( d )
			});
		
			response.on('data', function (body) {
				d += body;
			});
		});
		

	});
})();

//-------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//-------------------------------------------------------;
