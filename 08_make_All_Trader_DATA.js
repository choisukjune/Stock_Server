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


//*/
var curDate = process.argv[2];
/*/
var curDate = "20220222";
//*/
var _forder_root = './data/08/';
var target_folder = _forder_root;
var target_folder_csv = _forder_root + "/csv/"; 
var target_folder_json = _forder_root + "/json/"; 
var target_folder_bak = _forder_root + "/bak/"; 

global.stockInfo = JSON.parse( fs.readFileSync( "allStockInfoObject.json" ).toString() );
global.target_file_list = fs.readdirSync( target_folder_csv )


global.o = {};

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
		
		if( fileNm.indexOf( "b" ) == -1 )
		{
			var type = "s";	
		}
		else
		{
			var type = "b";	
		}
		
		
		var i = 1, iLen = _d.length,io;
		for(;i<iLen;++i){
			io = _d[ i ];

			var _d00 = io.replace(/\'/gi,"").replace(/\"/gi,"").replace(/\\r/gi,"").split( "\t" );

			
			if( _d00[0] == "" )
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
			
				if( _d00[ 0 ].indexOf( ":" ) != -1 ) continue;

				var _date = _d00[ 0 ].split( "/" )
				var _t = "20" + _date[0] + _date[1] + _date[2];
				var _t00 = "20" + _date[0] + "-" + _date[1] + "-" + _date[2];
				
				//if( ( _t * 1 ) == 20220323 ) continue;
				if( ( _t * 1 ) <= 20220408 ) continue;
				
				if( !global.o[ cd ] ) global.o[ cd ] = {};
				if( !global.o[ cd ][ _t ] ) global.o[ cd ][ _t ] = {};
				if( !global.o[ cd ][ _t ][ type ] ) global.o[ cd ][ _t ][ type ] = {};
				
				try
				{
				
					global.o[ cd ][ _t ]._t = _t * 1;
					
					var a = new Date(_t00)
					global.o[ cd ][ _t ].timeStamp = a.getTime();;

					global.o[ cd ][ _t ].price = _d00[ 1 ].replace(/\,/gi,"") * 1;
					global.o[ cd ][ _t ].amt = _d00[ 5 ].replace(/\,/gi,"") * 1
					global.o[ cd ][ _t ].cd = cd
					global.o[ cd ][ _t ].nm = global.stockInfo[ cd ].ISU_ABBRV
					global.o[ cd ][ _t ].ydt = _d00[ 3 ].replace(/\,/gi,"") * 1
					global.o[ cd ][ _t ].rt = parseFloat( _d00[ 4 ].replace(/\"/gi,"") )
					global.o[ cd ][ _t ].ogText = io;
					global.o[ cd ][ _t ].ist_dt = dateFormat_Object();

					global.o[ cd ][ _t ][ type ].tr1  = _d00[ 6 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1 ;
					global.o[ cd ][ _t ][ type ].tr2  = _d00[ 7 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1 ;
					global.o[ cd ][ _t ][ type ].tr3  = _d00[ 8 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1 ;
					global.o[ cd ][ _t ][ type ].tr4  = _d00[ 10 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ type ].tr5  = _d00[ 11 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ type ].tr6  = _d00[ 12 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ type ].tr7  = _d00[ 13 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ type ].tr8  = _d00[ 14 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ type ].tr9  = _d00[ 15 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ type ].tr10 = _d00[ 16 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ type ].tr11 = _d00[ 17 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ type ].tr12 = _d00[ 18 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ type ].tr13 = _d00[ 19 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;		

					if( !global.o[ cd ][ _t ][ "pp" ] ) 
					{
						global.o[ cd ][ _t ][ "pp" ] = {};
						
						global.o[ cd ][ _t ][ "pp" ].tr1  = 0
						global.o[ cd ][ _t ][ "pp" ].tr2  = 0
						global.o[ cd ][ _t ][ "pp" ].tr3  = 0
						global.o[ cd ][ _t ][ "pp" ].tr4  = 0
						global.o[ cd ][ _t ][ "pp" ].tr5  = 0
						global.o[ cd ][ _t ][ "pp" ].tr6  = 0
						global.o[ cd ][ _t ][ "pp" ].tr7  = 0
						global.o[ cd ][ _t ][ "pp" ].tr8  = 0
						global.o[ cd ][ _t ][ "pp" ].tr9  = 0
						global.o[ cd ][ _t ][ "pp" ].tr10 = 0
						global.o[ cd ][ _t ][ "pp" ].tr11 = 0
						global.o[ cd ][ _t ][ "pp" ].tr12 = 0
						global.o[ cd ][ _t ][ "pp" ].tr13 = 0
					}

					global.o[ cd ][ _t ][ "pp" ].tr1  += _d00[ 6 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1 ;
					global.o[ cd ][ _t ][ "pp" ].tr2  += _d00[ 7 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1 ;
					global.o[ cd ][ _t ][ "pp" ].tr3  += _d00[ 8 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1 ;
					global.o[ cd ][ _t ][ "pp" ].tr4  += _d00[ 10 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ "pp" ].tr5  += _d00[ 11 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ "pp" ].tr6  += _d00[ 12 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ "pp" ].tr7  += _d00[ 13 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ "pp" ].tr8  += _d00[ 14 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ "pp" ].tr9  += _d00[ 15 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ "pp" ].tr10 += _d00[ 16 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ "pp" ].tr11 += _d00[ 17 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ "pp" ].tr12 += _d00[ 18 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;
					global.o[ cd ][ _t ][ "pp" ].tr13 += _d00[ 19 ].replace(/\,/gi,"").replace(/\+/gi,"") * 1;		


				}
				catch( er )
				{
					debugger;
				}

				
		}	
	//console.log( "[ E ] - " + Date.now() );

	if( target_file_list.length - 1 == csvToJson.cnt )
	{
		var arr = [];
		var cnt = 0
		var s,so;
		for( s in global.o ){
			so = global.o[ s ];
			
			var k,ko;
			for( k in so ){

				ko = so[ k ]
				//delete ko.ogText;
				ko._id = k + "_" + ko.cd
				arr.push( ko )
				if( arr.length == 5000 )
				{
					fs.writeFileSync( target_folder_json + curDate + "_" + cnt + ".json", JSON.stringify( arr ),{flag :'w'} )
					++cnt;
					arr = []
				}
			}
			
		}
		fs.writeFileSync( target_folder_json + curDate + "_" + cnt + ".json", JSON.stringify( arr ),{flag :'w'} )
		
		
		console.log( "process end - " + new Date() )
		csvToJson.cnt = 0
		//logic();
	}
	else
	{
		++csvToJson.cnt;
		csvToJson( global.target_file_list[ csvToJson.cnt] )
	}
	 

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