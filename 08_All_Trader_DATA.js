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

var pad = function(n, width){
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

console.log( "[ S ] - " + Date.now() );

var _ROOT_PATH = process.cwd();

var target_date = process.argv[2];
//var fileNm = process.argv[2];

var _forder_root = './data/08/';
var _forder_root_01 = 'D:/dev/krx_stock_info/data/sise/';
//var target_folder = _forder_root + target_date;
//var target_folder_csv = _forder_root + target_date + "/csv/"; 
var target_folder_json = _forder_root_01 + target_date + "/json/"; 
//var target_folder_bak = _forder_root + target_date + "/bak/"; 

var _arr = fs.readFileSync( "./allStockCode.json")
	arr = JSON.parse( _arr )
var startTime = new Date()

var spawn = require('child_process').spawn
var FN01 = function( cd ){

	console.log( arr.length + " / " + FN01.cnt + " - " + cd );
	//var command = `call "c:\\Program Files\\AutoHotkey\\AutoHotkey.exe" 05_make_stock_by_trader.ahk ${cd}`
	
	//var r = execSync( command );
	////console.log( iconv.decode( r, 'EUC-KR').toString() );
	
	var cmd = spawn('cmd', ['/c','c:\\Program Files\\AutoHotkey\\AutoHotkey.exe' ,'08_make_All_trader_DATA.ahk',cd],{shell:false});
	cmd.stdout.on('data', function(data) {
		console.log('stdout: ' + data);
	});
	 
	cmd.stderr.on('data', function(data) {
		console.log('stderr: ' + data);
	});
	 
	cmd.on('exit', function(code) {
		console.log('exit: ' + code);

		++FN01.cnt;
	
		if(arr.length - 1 == FN01.cnt )
		//if(1310 == FN01.cnt )
		{
			console.log("end");
			console.log( "startTime : " + startTime )
			console.log( "endTime : " + new Date() )
			return;
		}

		FN01( arr[ FN01.cnt ] );
	});

}
FN01.cnt = 0;

FN01( arr[ FN01.cnt ] );


 
