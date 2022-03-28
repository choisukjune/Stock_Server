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
			global.wsFuns[ _m.funcNm ]();
		}
	});
	ws.on('close', function close() {
		//console.log('disconnected SOCKET - PORT : 5000');
	});
	//var r = {	type : "connection", data : id };
//global.ws.send( JSON.stringify( r ) );
});

global.wsFuns = {}
global.wsFuns.MarketIndex =function(){
	var url = global.CONST.SERVER.CRWALER.NAVER.protocol + global.CONST.SERVER.CRWALER.NAVER.host + ":" + global.CONST.SERVER.CRWALER.NAVER.port
	http.get( url + '/getMarketIndex', function(response){
		response.setEncoding('utf8');

		var d = "";
		response.on('end', function () {
			//res.end( d )
			var r = {
				type : "data",
				nm : "MarketIndex",
				func : "renderMarketIndex(d)",
				d : d
			}
			global.ws.boradCastMessage( r )
		});

		response.on('data', function (body) {
			d += body;
		});
	});
}

global.wsFuns.MarketIndexGlobal =function(){
	var url = global.CONST.SERVER.CRWALER.NAVER.protocol 
		+ global.CONST.SERVER.CRWALER.NAVER.host + ":" 
		+ global.CONST.SERVER.CRWALER.NAVER.port
	http.get( url + '/getMarketIndexGlobal', function(response){
		response.setEncoding('utf8');

		var d = "";
		response.on('end', function () {
			//res.end( d )
			var r = {
				type : "data",
				nm : "MarketIndexGlobal",
				func : "renderMarketIndexGlobal(d)",
				d : d
			}
			global.ws.boradCastMessage( r )
		});

		response.on('data', function (body) {
			d += body;
		});
	});
}
var curDateTime = function(){
	var a = new Date()
	return a.getFullYear()
	+ String( a.getMonth() + 1 ).padStart(2, '0')
	+ String( a.getDate() ).padStart(2, '0')
	//+ String( a.getHours() ).padStart(2, '0')
	//+ String( a.getMinutes() ).padStart(2, '0')
	//+ String( a.getSeconds() ).padStart(2, '0');
}
global.wsFuns.updateRank_buy =function(){

	var curDate = curDateTime();
	if( curDate < 153300 )
	{
		global.ws.clearIntervals.updateRank_buy()
		return;		
	}
	var tForderPath = "./data/realTime/mass_trans_buy/json/"
	var _d = fs.readFileSync( tForderPath + "mass_trans_buy_rank.json" ).toString();
	
	var r = {
		type : "data",
		nm : "updateRank",
		func : "renderUpdateRank()",
		d : _d
	}
	global.ws.boradCastMessage( r )
}

global.wsFuns.updateRank_sell =function(){

	var curDate = curDateTime();
	if( curDate < 153300 )
	{
		global.ws.clearIntervals.updateRank_sell()
		return;
	}
	var tForderPath = "./data/realTime/mass_trans_sell/json/"
	var _d = fs.readFileSync( tForderPath + "mass_trans_sell_rank.json" ).toString();
	
	var r = {
		type : "data",
		nm : "updateRank_sell",
		func : "renderUpdateRank_sell()",
		d : _d
	}
	global.ws.boradCastMessage( r )
}

//--------------------------------------------------;
//--------------------------------------------------;


global.wsFuns.renderMassTransList_buy = function(){
	var curDate = curDateTime();
	if( curDate < 153300 )
	{
		global.ws.clearIntervals.updateRank_sell()
		return;
	}
	var tForderPath = "./data/realTime/mass_trans_buy/json/"
	var _d = fs.readFileSync( tForderPath + "mass_trans_buy.json" ).toString();
	
	var d = JSON.parse( _d );

	var sendData = [];
	var i = 0,iLen = d.length,io;
	for(;i<iLen;++i){
		io = d[ i ];
		if( i == 0 ) global.wsFuns.renderMassTransList_buy.lastIdx = io._id
		if( io._id == global.wsFuns.renderMassTransList_buy.lastIdx - 50 )
		{
			break;
		}
		sendData.push( io );
		
	}

	var r = {
		type : "data",
		nm : "renderMassTransList_buy",
		func : "renderMassTransList_buy()",
		d : JSON.stringify( sendData )
	}
	global.ws.boradCastMessage( r )
}
global.wsFuns.renderMassTransList_buy.lastIdx = -1;


global.wsFuns.renderMassTransInfo_buy = function(){
	var curDate = curDateTime();
	if( curDate < 153300 )
	{
		global.ws.clearIntervals.renderMassTransInfo_buy()
		return;
	}
	var tForderPath = "./data/realTime/mass_trans_buy/json/"
	var _d = fs.readFileSync( tForderPath + "mass_trans_buy.json" ).toString();
	
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
		nm : "renderMassTransInfo_buy",
		func : "renderMassTransInfo_buy()",
		d : JSON.stringify( sendData )
	}
	global.ws.boradCastMessage( r )
}

global.wsFuns.renderMassTransInfo_sell = function(){
	var curDate = curDateTime();
	if( curDate < 153300 )
	{
		global.ws.clearIntervals.renderMassTransInfo_sell()
		return;
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
		func : "renderMassTransInfo_sell()",
		d : JSON.stringify( sendData )
	}
	global.ws.boradCastMessage( r )
}

//--------------------------------------------------;
//--------------------------------------------------;


global.ws.intervals = {}
global.ws.intervals.MarketIndex 		= setInterval(global.wsFuns.MarketIndex,5000);
//global.ws.intervals.MarketIndexGlobal	 = setInterval(global.wsFuns.MarketIndexGlobal,5000);
global.ws.intervals.updateRank_buy		= setInterval(global.wsFuns.updateRank_buy,30000);
global.ws.intervals.updateRank_sell		= setInterval(global.wsFuns.updateRank_sell,30000);
global.ws.intervals.renderMassTransList_buy		= setInterval(global.wsFuns.renderMassTransList_buy,30000);
global.ws.intervals.renderMassTransInfo_buy		= setInterval(global.wsFuns.renderMassTransInfo_buy,30000);
global.ws.intervals.renderMassTransInfo_sell		= setInterval(global.wsFuns.renderMassTransInfo_sell,30000);

global.ws.clearIntervals = {}
global.ws.clearIntervals.MarketIndex 		= function(){ clearInterval( global.ws.intervals.MarketIndex ) };
//global.ws.clearIntervals.MarketIndexGlobal 	= function(){ clearInterval( global.ws.intervals.MarketIndexGlobal ) };
global.ws.clearIntervals.updateRank_buy 		= function(){ clearInterval( global.ws.intervals.updateRank_buy ) };
global.ws.clearIntervals.updateRank_sell 		= function(){ clearInterval( global.ws.intervals.updateRank_sell ) };
global.ws.clearIntervals.renderMassTransList_buy 	= function(){ clearInterval( global.ws.intervals.renderMassTransList_buy ) };
global.ws.clearIntervals.renderMassTransInfo_buy 	= function(){ clearInterval( global.ws.intervals.renderMassTransInfo_buy ) };
global.ws.clearIntervals.renderMassTransInfo_sell 	= function(){ clearInterval( global.ws.intervals.renderMassTransInfo_sell ) };

global.ws.boradCastMessage = function( o ){
	var s,so;
	for( s in global.ws.clients )
	{
		so = global.ws.clients[ s ];
		so.send( JSON.stringify( o ), { binary : true } )
		//so.send( JSON.stringify( o ) )
	}
}

//--------------------------------------------------;
//--------------------------------------------------;
//--------------------------------------------------;
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