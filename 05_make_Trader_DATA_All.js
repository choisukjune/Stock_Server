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


var _ROOT_PATH = process.cwd();

var fileNm = process.argv[2];

var _forder_root = './data/05/';
var target_folder = _forder_root;
var target_folder_csv = _forder_root + "/csv/"; 
var target_folder_json = _forder_root + "/json/"; 
var target_folder_bak = _forder_root + "/bak/"; 

global.target_file_list = fs.readdirSync( target_folder_csv )


global._to = {};

var csvToJson = function( fileNm ){
	
	//console.log( "[ S ] - " + Date.now() );
	console.log( global.target_file_list.length  + " / " + csvToJson.cnt + " / " + fileNm  )
	global.arr = [];	
	if( !fileNm )
	{
		console.log( "error" )
		return
	};
	

	var _t = fileNm.split( "_" );
	var cd = _t[ 0 ];
	


	var filePath = target_folder_csv + fileNm;
	fs.readFile( filePath,function(err,data){
		 
		var _d = data.toString().split("\n")
		var type = "p";
		var i = 1, iLen = _d.length,io;
		for(;i<iLen;++i){
			io = _d[ i ];

			var _d00 = io.replace(/\'/gi,"").replace(/\"/gi,"").replace(/\\r/gi,"").split( "\t" );
			
			
			if( _d00 == "" )
			{
				
				continue;
			}
			
			/*
	일자	현재가	전일비		등락률	거래량	개인	외국인	기관계		금융투자	보험	투신	기타금융	은행	연기금등	사모펀드	국가	기타법인	내외국인
	13:16	"42,100"	 	"0"	"0%"	"5,064,419"	""	"-8,189"	"-26,944"		""	"-169"	"-20,949"	""	""	"-5,852"	""	""	"-3,198"	""
	'22/02/04	"42,100"	▲	"750"	"1.81%"	"1,646,053"	"-2,462"	"+3,536"	"-1,008"		"-1,046"	"-121"	"-606"	""	""	"+403"	"+362"	""	"-20"	"-47"
	'22/02/03	"41,350"	▲	"350"	"0.85%"	"2,175,768"	"-11,369"	"+14,230"	"-2,575"		"-699"	"-411"	"-13"	""	""	"+2,770"	"-4,222"	""	"-223"	"-64"
	'22/01/28	"41,000"	▲	"1,350"	"3.40%"	"2,106,118"	"-7,825"	"+1,644"	"+5,590"		"+316"	"+91"	"-1,612"	""	""	"+8,532"	"-1,736"	""	"+570"	"+20"
	'22/01/27	"39,650"	▼	"-900"	"-2.22%"	"2,378,780"	"+4,291"	"+3,317"	"-7,940"		"-455"	"-809"	"-652"	"-62"	"-62"	"-3,786"	"-2,114"	""	"+250"	"+82"
	'22/01/26	"40,550"	▲	"300"	"0.75%"	"3,305,595"	"+8,819"	"-10,829"	"+981"		"+736"	"+44"	"-767"	"-98"	"+19"	"+2,569"	"-1,522"	""	"+1,098"	"-69"
	'22/01/25	"40,250"	▼	"-1,750"	"-4.17%"	"2,238,405"	"+6,665"	"-11,883"	"+4,877"		"-402"	"-54"	"-321"	""	""	"+4,328"	"+1,326"	""	"+181"	"+160"
	'22/01/24	"42,000"	▼	"-1,800"	"-4.11%"	"1,947,137"	"+14,671"	"-21,100"	"+6,043"		"+4,264"	"-278"	"-243"	""	""	"+3,618"	"-1,318"	""	"+270"	"+116"
	'22/01/21	"43,800"	▲	"1,050"	"2.46%"	"5,118,066"	"+24,023"	"-39,945"	"+15,972"		"+36"	"+821"	"+2,031"	"+45"	""	"+12,798"	"+242"	""	"-183"	"+133"
			*/
			
			var _o = {};
				_o._t = _d00[ 0 ].replace(/\:/gi,"")
				_o.price = _d00[ 1 ].replace(/\,/gi,"") * 1
				_o.amt = _d00[ 5 ].replace(/\,/gi,"") * 1
				_o.cd = cd
				_o.ydt = _d00[ 3 ].replace(/\,/gi,"") * 1
				_o.rt = parseFloat( _d00[ 4 ].replace(/\"/gi,"") )
				
				_o.tr1  = {};
				_o.tr2  = {};
				_o.tr3  = {};
				_o.tr4  = {};
				_o.tr5  = {};
				_o.tr6  = {};
				_o.tr7  = {};
				_o.tr8  = {};
				_o.tr9  = {};
				_o.tr10 = {};
				_o.tr11 = {};
				_o.tr12 = {};
				_o.tr13 = {};

				_o.tr1[ type ]  = _d00[ 6 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr2[ type ]  = _d00[ 7 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr3[ type ]  = _d00[ 8 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr4[ type ]  = _d00[ 10 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr5[ type ]  = _d00[ 11 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr6[ type ]  = _d00[ 12 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr7[ type ]  = _d00[ 13 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr8[ type ]  = _d00[ 14 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr9[ type ]  = _d00[ 15 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr10[ type ] = _d00[ 16 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr11[ type ] = _d00[ 17 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr12[ type ] = _d00[ 18 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
				_o.tr13[ type ] = _d00[ 19 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
		
				_o.ogText_amt = io
			

			
			_o.ist_dt = dateFormat_Object();
			//_o.dt = dateString_Object(  _o[ "_t" ] )
			
		}	

		var filePath00 = target_folder_csv + fileNm.replace("amt","p");
		var type = "amt";
		fs.readFile( filePath00,function(err,data){
			 
			var _d = data.toString().split("\n")
			
			var i = 1, iLen = _d.length,io;
			for(;i<iLen;++i){
				io = _d[ i ];
	
				var _d00 = io.replace(/\'/gi,"").replace(/\"/gi,"").replace(/\\r/gi,"").split( "\t" );
				
				
				if( _d00 == "" )
				{
					
					continue;
				}
				
				/*
		일자	현재가	전일비		등락률	거래량	개인	외국인	기관계		금융투자	보험	투신	기타금융	은행	연기금등	사모펀드	국가	기타법인	내외국인
		13:16	"42,100"	 	"0"	"0%"	"5,064,419"	""	"-8,189"	"-26,944"		""	"-169"	"-20,949"	""	""	"-5,852"	""	""	"-3,198"	""
		'22/02/04	"42,100"	▲	"750"	"1.81%"	"1,646,053"	"-2,462"	"+3,536"	"-1,008"		"-1,046"	"-121"	"-606"	""	""	"+403"	"+362"	""	"-20"	"-47"
		'22/02/03	"41,350"	▲	"350"	"0.85%"	"2,175,768"	"-11,369"	"+14,230"	"-2,575"		"-699"	"-411"	"-13"	""	""	"+2,770"	"-4,222"	""	"-223"	"-64"
		'22/01/28	"41,000"	▲	"1,350"	"3.40%"	"2,106,118"	"-7,825"	"+1,644"	"+5,590"		"+316"	"+91"	"-1,612"	""	""	"+8,532"	"-1,736"	""	"+570"	"+20"
		'22/01/27	"39,650"	▼	"-900"	"-2.22%"	"2,378,780"	"+4,291"	"+3,317"	"-7,940"		"-455"	"-809"	"-652"	"-62"	"-62"	"-3,786"	"-2,114"	""	"+250"	"+82"
		'22/01/26	"40,550"	▲	"300"	"0.75%"	"3,305,595"	"+8,819"	"-10,829"	"+981"		"+736"	"+44"	"-767"	"-98"	"+19"	"+2,569"	"-1,522"	""	"+1,098"	"-69"
		'22/01/25	"40,250"	▼	"-1,750"	"-4.17%"	"2,238,405"	"+6,665"	"-11,883"	"+4,877"		"-402"	"-54"	"-321"	""	""	"+4,328"	"+1,326"	""	"+181"	"+160"
		'22/01/24	"42,000"	▼	"-1,800"	"-4.11%"	"1,947,137"	"+14,671"	"-21,100"	"+6,043"		"+4,264"	"-278"	"-243"	""	""	"+3,618"	"-1,318"	""	"+270"	"+116"
		'22/01/21	"43,800"	▲	"1,050"	"2.46%"	"5,118,066"	"+24,023"	"-39,945"	"+15,972"		"+36"	"+821"	"+2,031"	"+45"	""	"+12,798"	"+242"	""	"-183"	"+133"
				*/
	
					_o.tr1[ type ]  = _d00[ 6 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr2[ type ]  = _d00[ 7 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr3[ type ]  = _d00[ 8 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr4[ type ]  = _d00[ 10 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr5[ type ]  = _d00[ 11 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr6[ type ]  = _d00[ 12 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr7[ type ]  = _d00[ 13 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr8[ type ]  = _d00[ 14 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr9[ type ]  = _d00[ 15 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr10[ type ] = _d00[ 16 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr11[ type ] = _d00[ 17 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr12[ type ] = _d00[ 18 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
					_o.tr13[ type ] = _d00[ 19 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1
			
					_o.ogText_p = io
				
				
	
				global.arr.push( _o )
				
				
			}	
	console.log( "for - end - " + fileNm )
	fs.writeFileSync( target_folder_json + fileNm.split("_")[0] + ".json", JSON.stringify(global.arr,null,4),{flag :'w'} )	

	//console.log( "[ E ] - " + Date.now() );

	if( target_file_list.length - 1 == csvToJson.cnt )
	{
		console.log( "end" )
		
		global.arr = [];

		csvToJson.cnt = 0
		//logic();
	}
	else
	{
		csvToJson.cnt += 2;
		csvToJson( global.target_file_list[ csvToJson.cnt] )
	}
	 });
	 

	});

}
csvToJson.cnt = 0;

var logic = function(){
	global.target_file_list = fs.readdirSync( target_folder_csv )
	
	console.log( global.target_file_list.length )
	if( global.target_file_list.length == 0 )
	{
		console.log("No Target! - Wait 10sec.")
		setTimeout(function(){
			//logic();
		},10000)
	}
	else
	{
		csvToJson( global.target_file_list[ csvToJson.cnt ] )
	}
	
}

logic();