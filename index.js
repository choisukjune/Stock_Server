//----------------------------------------------------------------------------------------------------;
var fileNm = "Server/index.js";
if( console ) console.log( "[ S ] - " + fileNm + "----------" );
//----------------------------------------------------------------------------------------------------;
//-------------------------------------------------------;
// REQUIRE;
//-------------------------------------------------------;

var cp = require( "child_process" );
var fs = require('fs');
var http = require('http');
var path = require('path');
var WebSocket = require('ws');

var url = require('url');

var execSync = require('child_process').execSync;
var iconv = require( "iconv-lite" );
var spawn = require('child_process').spawn;


//-------------------------------------------------------;
// VARIABLE;
//-------------------------------------------------------;
// 정리해야함 ---- 생각나는데로 하고있음.....;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

global.server = {};
global.server.addRouter = function(a,b){ return global.ROUTER_LIST[ a ] = b; };

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

global.ROUTER_LIST = {};

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;


global.CONST = {};
global.CONST.MongoDB = {};
global.CONST.MongoDB.OPTIONS = {
	"self" : { ID : "tjrwns", PWD : "123qweasdzxc", HOST : "localhost", PORT : 59320 }	
};

global.CONST.SERVER = {};
global.CONST.SERVER.CRWALER = {};
global.CONST.SERVER.CRWALER.NAVER = { protocol: "http://", host : "localhost", port : "8887" } //네이버증권 크롤링서버
global.CONST.SERVER.CRWALER.KRX = { protocol: "http://", host : "localhost", port : "8886" } //한국거래소 크롤링서버
global.CONST.SERVER.CRWALER.DAUM = { protocol: "http://", host : "localhost", port : "8885" } //다음증권 크롤링서버

global.CONST.SERVER.API ={}
global.CONST.SERVER.API.AUTOH = { protocol: "http://", host : "localhost", port : "8889" } //오토핫키 크롤링서버


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
	//console.log( command )
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

var CWD = global.process.cwd();
var server_port = 8888;

var ROUTER_DIRECTORY_PATH = CWD + "/js/";

//router등록을 한다.

(function(){
	var ROUTER_FILE_LIST = fs.readdirSync( ROUTER_DIRECTORY_PATH );
	var i =0,iLen = ROUTER_FILE_LIST.length,io;
	for(;i<iLen;++i){
		//라우터를 등록한다;
		eval( fs.readFileSync( ROUTER_DIRECTORY_PATH + ROUTER_FILE_LIST[ i ] ).toString() );
	}
})();

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;

//-------------------------------------------------------;
// LOGIC;
//-------------------------------------------------------;

var url = global.CONST.SERVER.CRWALER.KRX.protocol + global.CONST.SERVER.CRWALER.KRX.host + ":" + global.CONST.SERVER.CRWALER.KRX.port
http.get( url + `/getAllStockInfo`, function(response){
	response.setEncoding('utf8');
	var d=""
	response.on('end', function () {
	
		global.stock = {}
		global.stock.info = JSON.parse( d )
		

		var _tarr = [];
		var _to = {}

		var s,so;
		for( s in global.stock.info ){
			so = global.stock.info[ s ];
			if( so.MKT_TP_NM == "KONEX" ) continue;
			_to[ s ] = so;
			_tarr.push( s );
		}
		fs.writeFileSync( "allStockCode.json",JSON.stringify( _tarr, null, 4),{flag:"w"} )
		fs.writeFileSync( "allStockInfoObject.json",JSON.stringify( _to, null, 4),{flag:"w"} )


	});

	response.on('data', function (body) {
		d += body;
	});
});

global.server = http.createServer(function(req, res){

    req.on('error', function( err ){
        console.error(err);
        res.statusCode = 400;
        res.end('400: Bad Request');
        return;
    });

    res.on('error', function( err ){ console.error(err); });

	req.url = decodeURIComponent(req.url);
	//var routerNm = req.url.replace(/\//,"");
	var routerNm = req.url.split("?")[0];

	if (req.method == 'POST') {
        var _d = '';

        req.on('data', function (data) {
            _d += data;
        });

        req.on('end', function () {
			//console.log(JSON.parse(_d));
			res.statusCode = 200;
			global.ROUTER_LIST[ routerNm ]( req, res, _d );
        });
    }
	else
	{
		if( req.url == "/" )
		{
			//res.end( JSON.stringify( fs.readdirSync( ROUTER_DIRECTORY_PATH ) ) );
			res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });	

			fs.readFile("./index.html", function(error, content) {
				if(error)
				{
					if(error.code == 'ENOENT')
					{
						res.statusCode = 404;
						res.end('404: File Not Found');
					}
					else
					{
						res.writeHead(500);
						res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
						res.end(); 
					}
				}
				else
				{
					res.end(content.toString(), 'utf-8');
				}
			});
		}
		else if( global.ROUTER_LIST[ routerNm ] )
		{
			res.statusCode = 200;
			global.ROUTER_LIST[ routerNm ]( req, res );
		}
		else
		{
			var filePath = '.' + req.url.split("?")[0];
			console.log( filePath );
			var extname = path.extname(filePath);
			
			var _oContentTypes = {
				".aac": "audio/aac",
				".abw": "application/x-abiword",
				".arc": "application/octet-stream",
				".avi": "video/x-msvideo",
				".azw": "application/vnd.amazon.ebook",
				".bin": "application/octet-stream",
				".bz": "application/x-bzip",
				".bz2": "application/x-bzip2",
				".csh": "application/x-csh",
				".css": "text/css",
				".csv": "text/csv",
				".doc": "application/msword",
				".epub": "application/epub+zip",
				".gif": "image/gif",
				".html": "text/html",
				".htm": "text/html",
				".ico": "image/x-icon",
				".ics": "text/calendar",
				".jar": "application/java-archive",
				".jpeg.jpg": "image/jpeg",
				".jpg.jpg": "image/jpeg",
				".js": "application/js",
				".json": "application/json",
				".midi": "audio/midi",
				".mid": "audio/midi",
				".mpeg": "video/mpeg",
				".mpkg": "application/vnd.apple.installer+xml",
				".odp": "application/vnd.oasis.opendocument.presentation",
				".ods": "application/vnd.oasis.opendocument.spreadsheet",
				".odt": "application/vnd.oasis.opendocument.text",
				".oga": "audio/ogg",
				".ogv": "video/ogg",
				".ogx": "application/ogg",
				".pdf": "application/pdf",
				".ppt": "application/vnd.ms-powerpoint",
				".rar": "application/x-rar-compressed",
				".rtf": "application/rtf",
				".sh": "application/x-sh",
				".svg": "image/svg+xml",
				".swf": "application/x-shockwave-flash",
				".tar": "application/x-tar",
				".tiff": "image/tiff",
				".tif": "image/tiff",
				".ttf": "application/x-font-ttf",
				".vsd": "application/vnd.visio",
				".wav": "audio/x-wav",
				".weba": "audio/webm",
				".webm": "video/webm",
				".webp": "image/webp",
				".woff": "application/x-font-woff",
				".xhtml": "application/xhtml+xml",
				".xls": "application/vnd.ms-excel",
				".xml": "application/xml",
				".xul": "application/vnd.mozilla.xul+xml",
				".zip": "application/zip",
			//    ".3gp": "video/3gpp\naudio/3gpp if it doesn't contain video",
			//    ".3g2": "video/3gpp2\naudio/3gpp2 if it doesn't contain video",
				".7z": "application/x-7z-compressed"
			};
			var contentType = _oContentTypes[ extname ];
			res.writeHead(200, { 'Content-Type': contentType + ';charset=UTF-8' });	

			fs.readFile(filePath, function(error, content) {
				if(error)
				{
					if(error.code == 'ENOENT')
					{
						res.statusCode = 404;
						res.end('404: File Not Found');
					}
					else
					{
						res.writeHead(500);
						res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
						res.end(); 
					}
				}
				else
				{
					res.end(content.toString(), 'utf-8');
				}
			});
		}
	}
	

	return;

})
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;


var curDateTime = function(){
	var a = new Date()
	return a.getFullYear()
	+ String( a.getMonth() + 1 ).padStart(2, '0')
	+ String( a.getDate() ).padStart(2, '0')
	//+ String( a.getHours() ).padStart(2, '0')
	//+ String( a.getMinutes() ).padStart(2, '0')
	//+ String( a.getSeconds() ).padStart(2, '0');
}
var getTimeTo__HHMMSS = function(date){
	
	date = date || new Date();
	//var year = date.getFullYear();
	//var month = date.getMonth() + 1;
	//var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	//month = month >= 10 ? month : '0' + month;
	//day = day >= 10 ? day : '0' + day;
	hour = hour >= 10 ? hour + "" : '0' + hour;
	minute = minute >= 10 ? minute + "" : '0' + minute;
	second = second >= 10 ? second + "" : '0' + second;
	var r = ( hour + minute + second ) * 1;

	return r

}


//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
//웹소켓연결부분;

global.wss = new WebSocket.Server({ server : global.server });
global.ws = {};
global.ws.clients = [];
global.wss.on('connection', function connection( ws ) {
	
	global.ws.clients.push(ws)
	ws.on('message', function incoming( message ){
		//console.log('received: %s', message);
		var _m = JSON.parse( message )
		if( _m.type = "execFunc" )
		{
			console.log( _m.funcNm )
			var p = null;
			if( _m.param ) p = _m.param
			global.wsFuns[ _m.funcNm ]( p );
		}
	});
	ws.on('close', function close() {
		//console.log('disconnected SOCKET - PORT : 5000');
	});
	//var r = {	type : "connection", data : id };
//global.ws.send( JSON.stringify( r ) );
});
global.ws.boradCastMessage = function( o ){
	var s,so;
	for( s in global.ws.clients )
	{
		so = global.ws.clients[ s ];
		so.send( JSON.stringify( o ), { binary : true } )
		//so.send( JSON.stringify( o ) )
	}
}


global.wsFuns = {}
global.wsFuns.MarketIndex =function(){
	
	console.log( "[ S ] - global.wsFuns.MarketIndex" )

	var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
	http.get( url + '/getMarketIndex', function(response){
		response.setEncoding('utf8');

		var d = "";
		response.on('end', function () {
			//res.end( d )
			var r = {
				type : "data",
				nm : "MarketIndex",
				func : "renderMarketIndex",
				d : d,
				p : null
			}
			global.ws.boradCastMessage( r )
			console.log( "[ E ] - global.wsFuns.MarketIndex" )
		});

		response.on('data', function (body) {
			d += body;
		});
	});
}

global.wsFuns.MarketIndexGlobal =function(){
	
	console.log( "[ S ] - global.wsFuns.MarketIndexGlobal" )

	var url = global.CONST.SERVER.CRWALER.NAVER.protocol 
		+ global.CONST.SERVER.CRWALER.NAVER.host + ":" 
		+ global.CONST.SERVER.CRWALER.NAVER.port
	http.get( url + '/getMarketIndexGlobal', function(response){
		response.setEncoding('utf8');

		var d = "";
		response.on('end', function () {
			
			var r = {
				type : "data",
				nm : "MarketIndexGlobal",
				func : "renderMarketIndexGlobal",
				d : d,
				p : null
				
			}
			global.ws.boradCastMessage( r )

			console.log( "[ E ] - global.wsFuns.MarketIndexGlobal" )
		});

		response.on('data', function (body) {
			d += body;
		});
	});
}

global.wsFuns.updateRank_buy =function(){

	var curDate = getTimeTo__HHMMSS();
	if( curDate > 153300 )
	{
		global.ws.clearIntervals.updateRank_buy()
		//return;		
	}
	var tForderPath = "./data/realTime/mass_trans_buy/json/"
	var _d = fs.readFileSync( tForderPath + "mass_trans_buy_rank.json" ).toString();
	var d = JSON.parse( _d )

		d = d.sort(function(a,b){ return b.total_pp - a.total_pp })
		d = d.slice(0,100)
	var r = {
		type : "data",
		nm : "updateRank",
		func : "renderUpdateRank",
		d : JSON.stringify( d ),
		p : null
	}
	global.ws.boradCastMessage( r )
}

global.wsFuns.updateRank_sell =function(){

	var curDate = getTimeTo__HHMMSS();
	if( curDate > 153300 )
	{
		global.ws.clearIntervals.updateRank_sell()
		//return;
	}
	var tForderPath = "./data/realTime/mass_trans_sell/json/"
	var _d = fs.readFileSync( tForderPath + "mass_trans_sell_rank.json" ).toString();

	var d = JSON.parse( _d )
		d = d.sort(function(a,b){ return b.total_pp - a.total_pp })
		d = d.slice(0,100)
	
	var r = {
		type : "data",
		nm : "updateRank_sell",
		func : "renderUpdateRank_sell",
		d : JSON.stringify( d ),
		p : null
	}
	global.ws.boradCastMessage( r )
}

//--------------------------------------------------;
//--------------------------------------------------;

global.data = {};
global.data.MassTransList_buy = {};
global.data.MassTransList_buy.lastIdx = {};
global.data.MassTransList_buy.data = [];

global.data.mass_realTimeData_buy = {}
global.data.mass_realTimeData_buy.prev = {}
global.data.mass_realTimeData_buy.cur = {}

global.data.mass_realTimeData_sell = {}
global.data.mass_realTimeData_sell.prev = {}
global.data.mass_realTimeData_sell.cur = {}


global.data.renderTradeValueInfo_gap = {}
global.data.renderTradeValueInfo_gap.prev = []
global.data.renderTradeValueInfo_gap.cur = []



global.wsFuns.makeMassTransList_buy = function( cbFcuntion ){
	console.log( "[ S ] - global.wsFuns.makeMassTransList_buy")
	var curDate = getTimeTo__HHMMSS();
	if( curDate > 153300 )
	{
		global.ws.clearIntervals.makeMassTransList_buy()
		//return;
	}
	global.data.MassTransList_buy.isProcessing = 1;
	var tForderPath = "./data/realTime/mass_trans_buy/json/"
	var _d = fs.readFileSync( tForderPath + "mass_trans_buy.json" ).toString();	
	var d = JSON.parse( _d );

	var limit = d.length - global.data.MassTransList_buy.lastIdx;
	if( global.data.MassTransList_buy.lastIdx == -1 ) limit = 10
	
	if( limit == 0 )
	{
		console.log( "data not update!" )
	}
	else
	{
		var data = [];
		var i = 0,iLen = d.length,io;
		for(;i<iLen;++i){
			io = d[ i ];
			
			if( i == limit )
			{
				break;
			}

			global.data.MassTransList_buy.data.push( io );
			
		}
		global.data.MassTransList_buy.lastIdx = d.length
		global.data.MassTransList_buy.isProcessing = 0
	}
	
	console.log( "[ E ] - global.wsFuns.makeMassTransList_buy")
}
global.data.MassTransList_buy.lastIdx = -1;



global.wsFuns.renderMassTransList_buy = function(){
	var curDate = getTimeTo__HHMMSS();
	if( curDate > 153300 )
	{
		global.ws.clearIntervals.renderMassTransList_buy()
		return;
	}
	if( global.data.MassTransList_buy.data.length == 0 )
	{
		console.log( "더이상보낼데이터가 없음! - 갱신실행" )
		return;
	}
	
	var sendData = global.data.MassTransList_buy.data.pop();
	

	//if( !global.data.mass_realTimeData_buy.prev[ sendData.cd ] ) return;
	//console.log( "data!" )
	//var prevData = global.data.mass_realTimeData_buy.prev[ sendData.cd ].total_pp
	//var curData = global.data.mass_realTimeData_buy.cur[ sendData.cd ].total_pp
	//console.log( prevData + " - " + curData)

		var r = {
			type : "data",
			nm : "renderMassTransList_buy",
			func : "renderMassTransList_buy",
			d : JSON.stringify( sendData ),
			p : null
		}
		
		global.ws.boradCastMessage( r )		

}


global.wsFuns.renderMassTransInfo_buy = function(){
	var curDate = getTimeTo__HHMMSS();
	debugger;
	if( curDate > 153300 )
	{
		global.ws.clearIntervals.renderMassTransInfo_buy()
		//return;
	}
	var tForderPath = "./data/realTime/mass_trans_buy/json/"
	var _d = fs.readFileSync( tForderPath + "mass_trans_buy.json" ).toString();
	
	var d = JSON.parse( _d );

	global.data.mass_realTimeData_buy.prev = global.data.mass_realTimeData_buy.cur
	global.data.mass_realTimeData_buy.cur = d

	var sendData = {};
	var i = 0,iLen = d.length,io;
	for(;i<iLen;++i){
		io = d[ i ];
		if( !sendData[ io.cd ] )
		{
			sendData[ io.cd ] = io;
			sendData[ io.cd ].total_pp = io.pp
		}
		else
		{
			sendData[ io.cd ].total_pp += io.pp
		}
	}

	var r = {
		type : "data",
		nm : "renderMassTransInfo_buy",
		func : "renderMassTransInfo_buy",
		d : JSON.stringify( sendData ),
		p : null
	}
	global.ws.boradCastMessage( r )
}

global.wsFuns.renderMassTransInfo_sell = function(){
	var curDate = getTimeTo__HHMMSS();
	if( curDate > 153300 )
	{
		global.ws.clearIntervals.renderMassTransInfo_sell()
		//return;
	}
	var tForderPath = "./data/realTime/mass_trans_sell/json/"
	var _d = fs.readFileSync( tForderPath + "mass_trans_sell.json" ).toString();
	
	var d = JSON.parse( _d );

	var sendData = {};
	var i = 0,iLen = d.length,io;
	for(;i<iLen;++i){
		io = d[ i ];
		if( !sendData[ io.cd ] )
		{
			sendData[ io.cd ] = io;
			sendData[ io.cd ].total_pp = io.pp
		}
		else
		{
			sendData[ io.cd ].total_pp += io.pp
		}
	}

	var r = {
		type : "data",
		nm : "renderMassTransInfo_sell",
		func : "renderMassTransInfo_sell",
		d : JSON.stringify( sendData ),
		p : null

	}
	global.ws.boradCastMessage( r )
}

global.wsFuns.renderTradeValueInfo_gap = function(){
	console.log( "[ S ] - global.wsFuns.renderTradeValueInfo_gap" )
	var curDate = getTimeTo__HHMMSS();

	if( curDate > 153300 )
	{
		//global.ws.clearIntervals.renderTradeValueInfo_gap()
		//return;
	}
	var tForderPath = "./data/realTime/tradeValue/json/"
	var _d = fs.readFileSync( tForderPath + "tradeValue.json" ).toString();
	
	var d = JSON.parse( _d );

	global.data.renderTradeValueInfo_gap.prev = global.data.renderTradeValueInfo_gap.cur
	global.data.renderTradeValueInfo_gap.cur = d
	
	var prev = global.data.renderTradeValueInfo_gap.prev
	var cur = global.data.renderTradeValueInfo_gap.cur

	if( prev.length == 0 || cur.length == 0 )
	{
		console.log( "not yet prev Data" )
		return;
	}

	var data = [];
	
	var s,so,so00;
	for( s in cur ){
		so = cur[ s ];
		so00 = prev[ s ];
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

	}
	
	var r = {
		type : "data",
		nm : "renderTradeValueInfo_gap",
		func : "renderTradeValueInfo_gap",
		d : JSON.stringify( data ),
		p : null
	}
	global.ws.boradCastMessage( r )
	global.wsFuns.insertTradeValueInfo_gap( r.d )
	console.log( "[ E ] - global.wsFuns.renderTradeValueInfo_gap" )
}


global.wsFuns.renderTradeValueInfo = function(){
	console.log( "[ S ] - global.wsFuns.renderTradeValueInfo" )
	var curDate = getTimeTo__HHMMSS();

	if( curDate > 153300 )
	{
		//global.ws.clearIntervals.renderTradeValueInfo()
		//return;
	}
	var tForderPath = "./data/realTime/tradeValue/json/"
	var _d = fs.readFileSync( tForderPath + "tradeValue.json" ).toString();
	var d = JSON.parse( _d );

	var data = [];

	var s,so;
	for( s in d ){
		so = d[ s ];
		data.push( so )
	}

	var r = {
		type : "data",
		nm : "renderTradeValueInfo",
		func : "renderTradeValueInfo",
		d : JSON.stringify( data ),
		p : null
	}
	global.ws.boradCastMessage( r )
	console.log( "[ E ] - global.wsFuns.renderTradeValueInfo" )
}

global.wsFuns.ExchangeIndex =function(){
	
	console.log( "[ S ] - global.wsFuns.ExchangeIndex" )

	var url = global.CONST.SERVER.CRWALER.NAVER.protocol 
		+ global.CONST.SERVER.CRWALER.NAVER.host + ":" 
		+ global.CONST.SERVER.CRWALER.NAVER.port
	http.get( url + '/getMarketIndexGlobal', function(response){
		response.setEncoding('utf8');

		var d = "";
		response.on('end', function () {
			
			var r = {
				type : "data",
				nm : "ExchangeIndex",
				func : "renderExchangeIndex",
				d : d,
				p : null
				
			}
			global.ws.boradCastMessage( r )

			console.log( "[ E ] - global.wsFuns.ExchangeIndex" )
		});

		response.on('data', function (body) {
			d += body;
		});
	});
}

//--------------------------------------------------;
//--------------------------------------------------;


global.ws.intervals = {}
global.ws.intervals.MarketIndex 		= setInterval(global.wsFuns.MarketIndex,30000);
global.ws.intervals.MarketIndexGlobal	 = setInterval(global.wsFuns.MarketIndexGlobal,30000);
global.ws.intervals.ExchangeIndex	 = setInterval(global.wsFuns.ExchangeIndex,30000);
//global.ws.intervals.updateRank_buy		= setInterval(global.wsFuns.updateRank_buy,30000);
//global.ws.intervals.updateRank_sell		= setInterval(global.wsFuns.updateRank_sell,30000);
//global.ws.intervals.renderMassTransList_buy		= setInterval(global.wsFuns.renderMassTransList_buy,500);
//global.ws.intervals.renderMassTransInfo_buy		= setInterval(global.wsFuns.renderMassTransInfo_buy,30000);
//global.ws.intervals.renderMassTransInfo_sell		= setInterval(global.wsFuns.renderMassTransInfo_sell,30000);
//global.ws.intervals.makeMassTransList_buy		= setInterval( global.wsFuns.makeMassTransList_buy ,7000);
global.ws.intervals.renderTradeValueInfo		= setInterval( global.wsFuns.renderTradeValueInfo ,7000);
global.ws.intervals.renderTradeValueInfo_gap		= setInterval( global.wsFuns.renderTradeValueInfo_gap ,7000);

global.ws.clearIntervals = {}
global.ws.clearIntervals.MarketIndex 		= function(){ clearInterval( global.ws.intervals.MarketIndex ) };
//global.ws.clearIntervals.MarketIndexGlobal 	= function(){ clearInterval( global.ws.intervals.MarketIndexGlobal ) };
global.ws.clearIntervals.ExchangeIndex 	= function(){ clearInterval( global.ws.intervals.ExchangeIndex ) };
global.ws.clearIntervals.updateRank_buy 		= function(){ clearInterval( global.ws.intervals.updateRank_buy ) };
global.ws.clearIntervals.updateRank_sell 		= function(){ clearInterval( global.ws.intervals.updateRank_sell ) };
global.ws.clearIntervals.renderMassTransList_buy 	= function(){ clearInterval( global.ws.intervals.renderMassTransList_buy ) };
global.ws.clearIntervals.renderMassTransInfo_buy 	= function(){ clearInterval( global.ws.intervals.renderMassTransInfo_buy ) };
global.ws.clearIntervals.renderMassTransInfo_sell 	= function(){ clearInterval( global.ws.intervals.renderMassTransInfo_sell ) };
global.ws.clearIntervals.makeMassTransList_buy 	= function(){ clearInterval( global.ws.intervals.makeMassTransList_buy ) };
global.ws.clearIntervals.renderTradeValueInfo 	= function(){ clearInterval( global.ws.intervals.renderTradeValueInfo ) };
global.ws.clearIntervals.renderTradeValueInfo_gap 	= function(){ clearInterval( global.ws.intervals.renderTradeValueInfo_gap ) };

//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;


global.wsFuns.insertTradeValueInfo_gap = function( d ){
	console.log( "[ S ] - global.wsFns.insertTradeValueInfo_gap" )
	var _tdbjs_nm = "insertTradeValueInfo_gap";
	console.log( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ); 
	try
	{
		var _tQuery = fs.readFileSync( _tDbjs_PATH + "/" + _tdbjs_nm + ".tdbjs" ).toString();
	}
	catch( err )
	{
		console.log( routerNm + " - DBJS File Not Found! - " + err );
		res.end("{ sucess : 0, data : null }");
	}

	var query = _tQuery
				.replace( "<!=DATA=!>", d )
				.replace( "<!=DATE=!>", dateFormat_YYMMDD() );

	var dbjs_nm = "insertTradeValueInfo_gap.dbjs";

	var FILE_PATH = DBJS_DIRECTORY_PATH + dbjs_nm;
	fs.writeFileSync( DBJS_DIRECTORY_PATH + dbjs_nm , query, { flag : "w" } );
	var r = exec_query_DB( dbjs_nm )
	
	console.log( "[ E ] - global.wsFns.insertTradeValueInfo_gap" )
}

//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;



global.server.listen( server_port );

//-------------------------;
//-------------------------;
//-------------------------;
//-------------------------;
//----------------------------------------------------------------------------------------------------;
if( console ) console.log( "[ E ] - " + fileNm + "----------" );
//----------------------------------------------------------------------------------------------------;