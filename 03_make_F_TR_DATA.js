//--------------------------------------------------
var FILE_NM = "03_make_F_TR_DATA";
console.log( FILE_NM + ".js")
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

var _forder_root = './data/03/';
var target_folder = _forder_root + target_date;
var target_folder_csv = _forder_root + target_date + "/csv/"; 
var target_folder_json = _forder_root + target_date + "/json/"; 
var target_folder_bak = _forder_root + target_date + "/bak/"; 

global.target_file_list = fs.readdirSync( target_folder_csv )


var arr = [];
var csvToJson = function( fileNm, folderNm ){
	
	var _to = {};
	if( !fileNm ) return;
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

	var d = fs.readFileSync( filePath );
	var data = iconv.decode( d, 'EUC-KR').toString();
	
	var _d = data.split("\n")
	var i = 1, iLen = _d.length,io;
	for(;i<iLen;++i){
		io = _d[ i ];
		if( io == "" ) continue;
		var _d01 = io.split( ",\"" );
		var _d02 = _d01.shift().split(",");
		var _d00 = _d01[2].split("\",").shift();
		//시간	종목코드	종목명	거래원명	구분	순간거래량	누적순매수	추정가격	전일대비		등락률
		//시간,종목코드,종목명,거래원명,구분,순간거래량,누적순매수,추정가격,전일대비,,등락률
		/*
		15:32:27,'570022,TRUE 레버리지 S&P500 선물 ETN(H),교  보,매도,"-7,000","-7,000","24,875",▼,"-770","-3.00"
		15:32:19,'395160,KODEX Fn시스템반도체,교  보,매수,"4,080","+4,080","9,540",▼,"-130","-1.34"
		15:31:59,'244920,에이플러스에셋,교  보,매수,"6,500","+18,484","7,680",▼,"-30","-0.39"
		15:31:36,'088980,맥쿼리인프라,교  보,매도,"-31,011","-312,512","13,250",▼,"-500","-3.64"
		15:31:22,'023960,에쓰씨엔지니어링,교  보,매수,"3,000","+15,413","2,420",▼,"-160","-6.20"
		15:30:46,'002995,금호건설우,교  보,매도,"-25","+387","29,650",▼,"-800","-2.63"
		15:30:39,'001529,동양3우B,교  보,매도,"-51","-4,885","36,900",▼,"-400","-1.07"
		15:30:38,'001420,태원물산,교  보,매수,"2,000","+5,000","4,975",▼,"-105","-2.07"
		15:21:36,'244920,에이플러스에셋,교  보,매수,"500","+11,984","7,630",▼,"-80","-1.04"
		*/
		//console.log( io )
		var _o ={
			_t : _d02[ 0 ].replace(/\:/gi,"")
			, tr : _d02[ 3 ].replace(/ /gi,"")
			, nm : _d02[ 2 ]
			, cd : _d02[ 1 ].replace(/\'/gi,"")
			
			, amt : _d01[ 0 ].replace(/\"/gi,"").replace(/\,/gi,"") * 1
			, s_amt : _d01[ 1 ].replace(/\"/gi,"").replace(/\,/gi,"").replace(/\+/gi,"") * 1
			, p : _d00.replace(/\"/gi,"").replace(/\,/gi,"") * 1
			, tt : ""
			, ydt : _d01[ 3 ].replace(/\"/gi,"").replace(/\,/gi,"") * 1
			, rt : parseFloat( _d01[ 4 ].replace(/\"/gi,"") )
			, ogText : io
		}

		if( _d02[ 4 ] == "매수" )
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
		
		if( !_to[ _o._id ] ) arr.push( _o );
		_to[ _o._id ] = {};
		
	}	
		
	console.log( fileNm + " --> " + fileNm + ".json");
	fs.writeFileSync( target_folder_json + fileNm + ".json", JSON.stringify(arr,null,4),{flag :'w'} )	

	//var command = "move " + filePath.replace(/\//gi,"\\") +  " " + target_folder_bak.replace(/\//gi,"\\");
	//var r = execSync( command );
	//console.log( iconv.decode( r, 'EUC-KR').toString() );


	console.log( "[ E ] - " + Date.now() );



	if( target_file_list.length - 1 == csvToJson.cnt )
	{
		console.log( "end" )
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

var logic = function(){
	global.target_file_list = fs.readdirSync( target_folder_csv )
	if( global.target_file_list.length == 0 )
	{
		console.log("No Target! - Wait 10sec.")
		setTimeout(function(){
			logic();
		},10000)
	}
	else
	{
		csvToJson( global.target_file_list[ csvToJson.cnt ], "20220204" )	
	}
	
}

logic();