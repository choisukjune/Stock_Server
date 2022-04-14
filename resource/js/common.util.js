window.Info = {};
window.Info.renderTradeValueByCd = {}
window.Info.renderTradeValueByCd.curCd = null;

window.socketData = {};


window.UTIL = {}
window.UTIL.Agent = {}
window.UTIL.Agent.isMobile = function(){

	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		return true;

	}
	else
	{
		return false;
	}
}


window.UTIL.Link = {}
window.UTIL.Link.a = function( url, target ){
	var a = window.document.createElement( "a" );
	a.target = target;
	a.href = url;
	a.click();
	return;
}

window.UTIL.Url = {}
/*
 *
 */
window.UTIL.Url.paramToObject = function(){
	
	var r =  window.location.search.replace("?","");
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


window.UTIL.Number = {}
/*
 *
 */
window.UTIL.Number.numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.UTIL.Number.longNumberAddString = function( n ){
	var _p = n.toString().length;
	if( _p == 1 ) return n + "백만"
	if( _p == 2 ) return ( n * 0.1 ).toFixed(1) + "천만"
	if( _p >= 3 ) return ( n * 0.01 ).toFixed(1) + "억"
}


window.UTIL.Date = {}

/*
 *
 */
window.UTIL.Date.getTimeTo__HHMMSS = function(date){
	
	date = date || new Date();
	//var year = date.getFullYear();
	//var month = date.getMonth() + 1;
	//var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	//month = month >= 10 ? month : '0' + month;
	//day = day >= 10 ? day : '0' + day;
	hour = hour >= 10 ? hour : '0' + hour;
	minute = minute >= 10 ? minute : '0' + minute;
	second = second >= 10 ? second : '0' + second;
	var r = ( hour + minute + second ) * 1;

	return r

}
/*
 *
 */
window.UTIL.Date.getTimeTo__YYYYMMDD = function(date){
	
	date = date || new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
//	var hour = date.getHours();
//	var minute = date.getMinutes();
//	var second = date.getSeconds();

	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;
	//hour = hour >= 10 ? hour : '0' + hour;
	//minute = minute >= 10 ? minute : '0' + minute;
	//second = second >= 10 ? second : '0' + second;
	var r = year + month + day

	return r

}
/*
 *
 */
window.UTIL.Date.getTimeTo__YYYYMMDD_HHMMSS = function(date){
	
	date = date || new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;
	hour = hour >= 10 ? hour : '0' + hour;
	minute = minute >= 10 ? minute : '0' + minute;
	second = second >= 10 ? second : '0' + second;
	var r = year + "-" + month + "-" + day + " " + hour + ":" + minute+ ":" + second

	return r

}
/*
 *
 */
window.UTIL.Date.getTimeTo__HHMMSS = function(date){
	
	date = date || new Date();
	//var year = date.getFullYear();
	//var month = date.getMonth() + 1;
	//var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	//month = month >= 10 ? month : '0' + month;
	//day = day >= 10 ? day : '0' + day;
	hour = hour >= 10 ? hour : '0' + hour;
	minute = minute >= 10 ? minute : '0' + minute;
	second = second >= 10 ? second : '0' + second;
	//var r = year + "-" + month + "-" + day + " " + hour + ":" + minute+ ":" + second
	var r =  hour.toString() + minute.toString() + second.toString()
	return r*1

}

/*
 *
 */
window.UTIL.Date.getTimeTo__YYYY_MM_DD = function(date){
	
	date = date || new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
//	var hour = date.getHours();
//	var minute = date.getMinutes();
//	var second = date.getSeconds();

	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;
	//hour = hour >= 10 ? hour : '0' + hour;
	//minute = minute >= 10 ? minute : '0' + minute;
	//second = second >= 10 ? second : '0' + second;
	var r = year + "-" + month + "-" + day

	return r

}

/*
 *
 */
window.UTIL.Date.getTimeTo__YYYYMMDD_berfore_day = function(date,day){
	
	date = date || new Date();
	date.setDate( date.getDate() - day );
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
//	var hour = date.getHours();
//	var minute = date.getMinutes();
//	var second = date.getSeconds();

	month = month >= 10 ? month : '0' + month;
	day = day >= 10 ? day : '0' + day;
	//hour = hour >= 10 ? hour : '0' + hour;
	//minute = minute >= 10 ? minute : '0' + minute;
	//second = second >= 10 ? second : '0' + second;
	var r = year.toString() + month.toString() + day.toString()

	return r

}


window.UTIL.Color = {};
/*
 *
 */
window.UTIL.Color.hex = function(c) {
	var s = "0123456789abcdef";
	var i = parseInt (c);
	if (i == 0 || isNaN (c))
	return "00";
	i = Math.round (Math.min (Math.max (0, i), 255));
	return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}
/*
 *
 */
window.UTIL.Color.convertToHex = function(rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}
/*
 *
 */
window.UTIL.Color.trim = function(s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }
/*
 *
 */
window.UTIL.Color.convertToRGB = function(hex) {
  var color = [];
  color[0] = parseInt ((window.UTIL.Color.trim(hex)).substring (0, 2), 16);
  color[1] = parseInt ((window.UTIL.Color.trim(hex)).substring (2, 4), 16);
  color[2] = parseInt ((window.UTIL.Color.trim(hex)).substring (4, 6), 16);
  return color;
}
/*
 *
 */
window.UTIL.Color.generateColor = function(colorStart,colorEnd,value){

	// The beginning of your gradient
	var start = convertToRGB (colorStart);    

	// The end of your gradient
	var end   = convertToRGB (colorEnd);    

	// The number of colors to compute
	//var len = colorCount;

	//Alpha blending amount
	var alpha = 0.0;

	alpha = value / 30//window.MassTrd.maxCnt
	var c = [];
	//alpha =value + (1.0/len);
		
	c[0] = start[0] * alpha + (1 - alpha) * end[0];
	c[1] = start[1] * alpha + (1 - alpha) * end[1];
	c[2] = start[2] * alpha + (1 - alpha) * end[2];

	return convertToHex (c);
	
}

window.UTIL.Html = {};
/*
 *
 */
window.UTIL.Html.htmlToElement = function( html ){
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

window.COMPONENT = {};
/*
 *
 */
window.COMPONENT.gnb = function(){
	
	var today = window.UTIL.Date.getTimeTo__YYYYMMDD()
	var yesterday = window.UTIL.Date.getTimeTo__YYYYMMDD_berfore_day( null, 1 );

	var _target_el = window.document.getElementById( "gnb" );

	var html = `
		<div>
		<span id="gnb_00" style="cursor:pointer;">실시간대량거래</span> | 
		<span id="gnb_01" style="cursor:pointer;">기관거래원별</span> | 
		<span id="gnb_02" style="cursor:pointer;">외국계거래원별</span> | 
		<span id="gnb_03" style="cursor:pointer;">외국계증권사매매동향</span> | 
		<span id="gnb_04" style="cursor:pointer;">wics업종별현황</span> |
		<span id="gnb_05" style="cursor:pointer;">관심종목</span>
		</div>
	`
	var new_el = window.UTIL.Html.htmlToElement( html );
	_target_el.appendChild( new_el );

	var urls = {
		gnb_00 : `/html/실시간대량거래.html`,
		gnb_01 : `/html/기관거래원별.html?date=${today}`,
		gnb_02 : `/html/외국계거래원별.html?date=${today}`,
		gnb_03 : `/html/외국계증권사매매동향.html?date=${today}`,
		gnb_04 : `/html/wics업종별현황.html?date=${today}`,
		gnb_05 : `/html/관심종목.html?date=${yesterday}`,
	};

	window.document.getElementById( "gnb_00").addEventListener('click',function(e){ window.UTIL.Link.a(urls.gnb_00,"_blank"); });
	window.document.getElementById( "gnb_01").addEventListener('click',function(e){ window.UTIL.Link.a(urls.gnb_01,"_blank"); });
	window.document.getElementById( "gnb_02").addEventListener('click',function(e){ window.UTIL.Link.a(urls.gnb_02,"_blank"); });
	window.document.getElementById( "gnb_03").addEventListener('click',function(e){ window.UTIL.Link.a(urls.gnb_03,"_blank"); });
	window.document.getElementById( "gnb_04").addEventListener('click',function(e){ window.UTIL.Link.a(urls.gnb_04,"_blank"); });
	window.document.getElementById( "gnb_05").addEventListener('click',function(e){ window.UTIL.Link.a(urls.gnb_05,"_blank"); });
	
	return;
};



/*
 *
 */
window.COMPONENT.searchStock = function(q,cbFunction){

	var xhr = new XMLHttpRequest();
	xhr.open("GET" , `http://112.144.208.118:8888/getStockSearch?q=${q.value}`, true);

	xhr.onreadystatechange = function() {

		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var d = JSON.parse( xhr.responseText );
			cbFunction(d.suggestItems,q)
		}

	}
	xhr.send();
}
/*
 *
 */
window.COMPONENT.makeSearchList = function( arr, tDom, cb ){
	
	var resultDom = tDom.parentElement.parentElement.children[1];
	resultDom.style.width = tDom.offsetWidth + "px";
	resultDom.style.display = "block";
	resultDom.innerHTML = "";

	var html = ""
	var i =0,iLen =arr.length,io;
	for(;i<iLen;++i){
		io = arr[ i ];
		html = `
		<div class="item" id="search_result_${io.displayedCode}" data-cd-value="${io.displayedCode}" style="cursor:pointer;">(${io.displayedCode}) - ${io.koreanName}</div>
		`
		var new_el = window.UTIL.Html.htmlToElement( html )
		var target_el = window.document.getElementById( "search_result_" + io.displayedCode )
		if( target_el )
		{
			resultDom.lastElementChild.parentNode.removeChild( target_el )
			resultDom.insertBefore( new_el,resultDom.firstChild )			
			
		}
		else
		{
			resultDom.insertBefore( new_el,resultDom.firstChild )	
		}

		new_el.addEventListener( "click",function(e){
			
			var cd = e.currentTarget.getAttribute("data-cd-value");
			
			resultDom.innerHTML = "";
			resultDom.style.display = "none";		
			//candleChart 페이지로이동시킴;
			cb( cd )
		})
	}
	//resultDom.innerHTML = html
}
/*
 *
 */
window.COMPONENT.stockSearch_global = function(){

	var idNm = "search";
	var _target_el = window.document.getElementById( idNm + "_wrap" );

	var html = `
		<div>
			<div class="ui fluid icon input">
				<input type="text" placeholder="Search a very wide input..." id="${idNm}">
				<i class="search icon"></i>
			</div>
			<div class="ui list" id="${idNm}_result" style="position: absolute;z-index: 100;background-color: #fff;border:1px solid #ccc;width:491px;padding:10px;display:none;"></div>
		</div>
	`;

	var new_el = window.UTIL.Html.htmlToElement( html );
	
	_target_el.appendChild( new_el );
	
	var eventUlr = '../html/candle.html?cd=';
		window.document.addEventListener('click',function(e){ window.document.getElementById( `${idNm}_result` ).style.display = "none"; });
	window.document.getElementById( idNm ).addEventListener('keyup', function(e){
	
		if( e.currentTarget.value == "" )
		{
			window.document.getElementById( idNm + "_result" ).style.display = "none"
			window.document.getElementById( idNm + "_result" ).innerHTML = "";
		}
		else
		{
			if (window.event.keyCode == 13) {
				window.COMPONENT.searchStock( e.currentTarget,function(d,tDom){
					if(d.length == 1 )
					{
						window.document.getElementById( idNm + "_result" ).style.display = "none"
						window.document.getElementById( idNm + "_result" ).innerHTML = "";
						var cd = d[0].displayedCode;				
						//candleChart 페이지로이동시킴;
						window.UTIL.Link.a( eventUlr + cd, "_blank")					
					}
					else if( d.length > 1 )
					{
						window.COMPONENT.makeSearchList(d,tDom,function(cd){
							window.UTIL.Link.a( eventUlr + cd, "_blank")
						})
					}

				});
			}
			else
			{
				window.COMPONENT.searchStock( e.currentTarget,function(d,tDom){
					if( d.length == 0)
					{
						window.document.getElementById( idNm + "_result" ).style.display = "none"
						window.document.getElementById( idNm + "_result" ).innerHTML = "";
					}
					else
					{
						window.COMPONENT.makeSearchList(d,tDom,function(cd){
								window.UTIL.Link.a( eventUlr + cd, "_blank")
						})	
					}
				});
			
			}	
		}
	})
}


window.COMPONENT.getTradeValueByCd = function(){
	
	if( window.Info.renderTradeValueByCd.curCd == null ) return;
	if( !window.charts.renderTradeValueByCd ) window.charts.renderTradeValueByCd = {};

	var xhr = new XMLHttpRequest();
	xhr.open("GET" , `http://112.144.208.118:8888/getTradeValueByCd?cd=${window.Info.renderTradeValueByCd.curCd}&date=${window.date.curDate}`, true);
	xhr.onreadystatechange = function(){
		
		if( xhr.readyState == 4 && xhr.status == 200)
		{
			var d = JSON.parse( xhr.responseText )
			window.COMPONENT.renderTradeValueByCd( d.data )
		}
	}

	xhr.send();
}

window.COMPONENT.renderTradeValueByCd = function( d ){
	if( !window.charts ) window.charts = {};
	var dom = document.getElementById("tradeValueByCd");
	window.charts.renderTradeValueByCd = echarts.init(dom);
	
	var app = {};
	
	window.charts.renderTradeValueByCd.showLoading()
	
	var d00 = []
	var d01 = []
	var xAis = []

	var i = 0,iLen = d.length,io;
	for(;i<iLen;++i){
		io = d[ i ]

		d00.push( io.price );
		var color = 0
		if( io.rtChange > 0 ) var color = 1
		if( io.rtChange < 0 ) var color = -1
		d01.push( [ io._t, io.tradeValueGap, color] );
		xAis.push( io._t );
	}

	
	var h = dom.style.height.replace("px") * 1
	var _p = d[ d.length -1 ];

	var symbol = "▲"
	if( _p.rt == 0 ) var symbol = "-"
	if( _p.rt < 0 ) var symbol = "▼"
	
	var title = `${_p.nm} - ${_p.cd }`

	var lineColor = "red";
	if( _p.rt < 0 ) lineColor = "blue";
	if( _p.rt == 0 ) lineColor = "orange";

	var subTitle = `${echarts.format.addCommas( _p.price )} ${symbol} ${echarts.format.addCommas( _p.prevChange )}(${_p.rt}%) - 거래대금 : ${window.UTIL.Number.longNumberAddString( _p.tradeValue )}`
	var option = {
		title : { text : title, subtext : subTitle, left : 'center',},
		height : h,
		//width : "100%",
		tooltip: {
			trigger: 'axis', axisPointer: { type: 'cross' }, borderWidth: 1, borderColor: '#ccc', padding: 10,
			formatter : function(d){
				var r = ""
				r += d[0].name + "<br>"
				r += "거래대금갭 :" + window.UTIL.Number.longNumberAddString( d[0].value[1] ) + "<br>"
				r += "주가 :" + window.UTIL.Number.numberWithCommas( d[1].value ) + "<br>"
				return r;
			},
			//grid:[{	left : "10%"},{ left : "40%" }],
			textStyle: { color: '#000'  },
			position: [ 50, 10 ]
			// extraCssText: 'width: 170px'
		},
		//toolbox: { feature: { dataZoom: { yAxisIndex: 'none' }, restore: {}, saveAsImage: {} } },
		xAxis: [ 
			{ type: 'category', data: xAis, boundaryGap: true,	axisLine: { onZero: true }, axisTick: { show: true }, splitLine: { show: true }, axisLabel: { show: true }	}
		],
		yAxis: [
			{ scale: true, splitArea: {show: true },splitLine: { show: false } },
			{ scale: true, splitArea: {show: false },splitLine: { show: false } }
		],
		dataZoom: [
			{ show: true, realtime: true, start: 0, end: 100, xAxisIndex: [0, 1] },
			{ type: 'inside', realtime: true, start: 0, end: 100, xAxisIndex: [0, 1] }
		],
		grid: { left: '4%', right: '4%', top : 50, bottom : 30},
		visualMap : [
			{
				type : "piecewise",
				precision : true,
				show :false,seriesIndex : 0,dimention:2,maxOpen : true,
				pieces : [
					{ value : 1, color :"red"},
					{ value : -1, color :"blue", opacity : 0.5 },
					{ value : 0, color :"orange", opacity : 0.5 }
				]
			},
		],
		series: [
			{ 
				name : "Volume",
				//width :"100%",height :"100%",
				data: d01,type: 'bar', xAxisIndex: 0, yAxisIndex: 1, zlevel : 1,
				//showBackground: true,backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)'},
				//markPoint: {
				//	data: [
				//		{ type: 'max', name: 'Max' },
				//		{ type: 'min', name: 'Min' }
				//	]
				//},
				//markLine: {
				//	data: [{ type: 'average', name: 'Avg' }]
				//},
				itemStyle : { color : 'red' },
				animation : true
			},
			{
			name: 'Price', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: d00, zlevel : 0,
			showSymbol : false, smooth :true, areaStyle : { opacity : 0.4, 
			color:new echarts.graphic.LinearGradient(0,0,0,1,[
			{
			offset : 0,
			color : lineColor
			},
			{
				offset : 0.9,
				color : "white"
				}

				]),
				origin:"auto"
				},
				//markPoint: {
				//	data: [
				//		{ type: 'max', name: 'Max' },
				//		{ type: 'min', name: 'Min' }
				//	]
				//},
				//markLine : {
				//	data : [ { name : 'Start Price',yAxis : d[0].price + _p, label : { formatter : `Start Price`, position : "start" } }]	
				//},
				lineStyle : { width : 1, color : lineColor, opacity : 0.2 },
				animation : true,
			}
		]
	};

	if (option && typeof option === 'object'){
		window.charts.renderTradeValueByCd.setOption(option);
		window.charts.renderTradeValueByCd.resize();
		window.charts.renderTradeValueByCd.hideLoading();
	}
}

/*
 *
 */
window.COMPONENT.stockSearch_tradeValueBarchart = function(){

	var idNm = "search_tradeValueBarchart";
	var _target_el = window.document.getElementById( idNm + "_wrap" );

	var html = `
		<div>
			<div class="ui fluid icon input">
				<input type="text" placeholder="Search a very wide input..." id="${idNm}">
				<i class="search icon"></i>
			</div>
			<div class="ui list" id="${idNm}_result" style="position: absolute;z-index: 100;background-color: #fff;border:1px solid #ccc;width:491px;padding:10px;display:none;"></div>
		</div>
	`;

	var new_el = window.UTIL.Html.htmlToElement( html );
	
	_target_el.appendChild( new_el );
	
	var eventUlr = '../html/candle.html?cd=';
	
	window.document.addEventListener('click',function(e){ window.document.getElementById( `${idNm}_result` ).style.display = "none"; });
	window.document.getElementById( idNm ).addEventListener('keyup', function(e){
	
		if( e.currentTarget.value == "" )
		{
			window.document.getElementById( idNm + "_result" ).style.display = "none"
			window.document.getElementById( idNm + "_result" ).innerHTML = "";
		}
		else
		{
			if (window.event.keyCode == 13) {
				window.COMPONENT.searchStock( e.currentTarget,function(d,tDom){
					if(d.length == 1 )
					{
						window.document.getElementById( idNm + "_result" ).style.display = "none"
						window.document.getElementById( idNm + "_result" ).innerHTML = "";
						var cd = d[0].displayedCode;				
						//candleChart 페이지로이동시킴;
						window.Info.renderTradeValueByCd.curCd = cd;
						window.COMPONENT.getTradeValueByCd();					
					}
					else if( d.length > 1 )
					{
						window.COMPONENT.makeSearchList(d,tDom,function(cd){
							window.Info.renderTradeValueByCd.curCd = cd;
							window.COMPONENT.getTradeValueByCd();					
						})
					}

				});
			}
			else
			{
				window.COMPONENT.searchStock( e.currentTarget,function(d,tDom){
					if( d.length == 0)
					{
						window.document.getElementById( idNm + "_result" ).style.display = "none"
						window.document.getElementById( idNm + "_result" ).innerHTML = "";
					}
					else
					{
						window.COMPONENT.makeSearchList(d,tDom,function(cd){
							window.Info.renderTradeValueByCd.curCd = cd;
							window.COMPONENT.getTradeValueByCd();					
						})	
					}
				});
			
			}	
		}
	})
}


window.COMPONENT.getMarketIndex = function( cbFunction ){
		
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET" , `http://112.144.208.118:8888/getMarketIndex`, true);
	xhr.onreadystatechange = function(){
		
		if( xhr.readyState == 4 && xhr.status == 200)
		{
			
			var d = JSON.parse( xhr.responseText )
			window.socketData.MarketIndex = d;
			window.COMPONENT.renderMarketIndex()
			cbFunction();
			
		}
	}
	
	xhr.send();

}

window.COMPONENT.renderMarketIndex = function(){
	//window._el.id_market_index.innerHTML = "";
	var status = {
		"UNCHANGED" : {	color:"grey", symbol : "-",},
		"RISING" : {	color:"red", symbol : "▲",},
		"FALLING" : {	color:"blue", symbol : "▼",},
		//"UPPER_LIMIT" : {	color:"red", symbol : "▲",},
	}

	var display;
	var i = 0,iLen = window.socketData.MarketIndex.datas.length,io;
	for(;i<iLen;++i){
		io = window.socketData.MarketIndex.datas[ i ];
		//var color = window.UTIL.Color.generateColor('#FF0000','#cccccc',o.rt)

		if( io.marketStatus == "CLOSE") display = "block"
		else display = "none"

//https://ssl.pstatic.net/imgfinance/chart/mobile/world/mini/.DJI_home_open.png?1649664420000
//https://ssl.pstatic.net/imgfinance/chart/mobile/mini/KOSDAQ_home_open.png?1649754060000
	
		var _html00 = `<div class="card" style="margin-top:0px;padding: 5px!important;box-shadow: 0 1px 1px 0 #ccc, 0 0 0 1px #ccc !important;border-radius: 0rem !important;display:block;cursor:pointer;min-height:10px;" id="market_index_${io.symbolCode}" data-cd-value="${io.symbolCode}" data-nm-value="${io.stockName}">`
		var _html01 = `
				<div style="background-color: #97979747;position: absolute;width: 100%;height: 100%;z-index: 5;top: 0px;left: 0;display:${display};"></div>
				<div class="">
					<span class="right floated" style="padding: 5px;background-color: #fff;min-height:35px;">
						<img src="https://ssl.pstatic.net/imgfinance/chart/mobile/mini/${io.symbolCode}_home_open.png?${Date.now()}" load="lazy" style="height:35px">

					</span>
					<span style="font-size:15px;"> ${io.symbolCode}</span> - <span style="font-size:11px;">  ${io.marketStatus}</span><br>
					<span style="font-size:16px;color:${status[ io.compareToPreviousPrice.name ].color}">${window.UTIL.Number.numberWithCommas(io.closePrice)} 
						<span style="font-size:12px;color:${status[ io.compareToPreviousPrice.name ].color}">${status[ io.compareToPreviousPrice.name ].symbol} ${io.compareToPreviousClosePrice}( ${ io.fluctuationsRatio}% )</span>
					</span>

				</div>

				<!--div class="description"></div-->
			`
			var _html02 =`</div>`

			//window._el.id_market_index.appendChild( new_el )


			var new_el = window.UTIL.Html.htmlToElement( _html00 + _html01 + _html02 )
			var target_el = window.document.getElementById( "market_index_" + io.symbolCode )
			if( target_el )
			{
				//window._el.id_market_index.lastElementChild.parentNode.removeChild( target_el )
				//window._el.id_market_index.insertBefore( new_el,window._el.id_market_index.firstChild )
				target_el.innerHTML = _html01
				
			}
			else
			{
				window.document.getElementById( "market_index" ).appendChild( new_el )	
			}
	}

}


window.COMPONENT.getMarketIndexGlobal = function(){
		
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET" , `http://112.144.208.118:8888/getMarketIndexGlobal`, true);
	xhr.onreadystatechange = function(){
		
		if( xhr.readyState == 4 && xhr.status == 200)
		{
			var d = JSON.parse( xhr.responseText )
			window.socketData.MarketIndexGlobal = d;
			window.COMPONENT.renderMarketIndexGlobal();		
		}
	}
	xhr.send();
}

window.COMPONENT.renderMarketIndexGlobal = function( option ){
	var status = {
		"UNCHANGED" : {	color:"grey", symbol : "-",},
		"RISING" : {	color:"red", symbol : "▲",},
		"FALLING" : {	color:"blue", symbol : "▼",},
		//"UPPER_LIMIT" : {	color:"red", symbol : "▲",},
	}

	var display;
	var s,so;
	for( s in window.socketData.MarketIndexGlobal ){
		so = window.socketData.MarketIndexGlobal[ s ];
		if( typeof option != "undefined" )
		{
			if( option.length != 0 ) if( option.indexOf( s ) == -1 ) continue	
		} 
		var i = 0,iLen = so.length,io;
		for(;i<iLen;++i){
			io = so[ i ];
			//var color = window.UTIL.Color.generateColor('#FF0000','#cccccc',o.rt)		
			var name = ""
			//if( io.stockEndType != "futures") continue;

			if( io.marketStatus == "CLOSE") display = "block"
			else display = "none"

			if( io.stockEndType == "futures") name = io.futuresName;
			else name = io.indexName;
			var _html00 = `<div class="card" style="margin-top:0px;padding: 5px!important;box-shadow: 0 1px 1px 0 #ccc, 0 0 0 1px #ccc !important;border-radius: 0rem !important;display:block;cursor:pointer;min-height:10px;" id="market_index_${io.reutersCode}" data-cd-value="${io.reutersCode}" data-nm-value="${io.indexName}">`
			var _html01 =`
				<div style="background-color: #97979747;position: absolute;width: 100%;height: 100%;z-index: 5;top: 0px;left: 0;display:${display};"></div>
				<div class="">
					<span class="right floated" style="padding: 5px;background-color: #fff;min-height:35px;">
						<img src="https://ssl.pstatic.net/imgfinance/chart/mobile/world/mini/${io.reutersCode}_home_open.png?${Date.now()}" load="lazy" style="height:35px">
					</span>
					<span style="font-size:13px;"> ${name}</span> - <span style="font-size:11px;">  ${io.marketStatus}</span><br>
					<span style="font-size:14px;color:${status[ io.compareToPreviousPrice.name ].color}">${window.UTIL.Number.numberWithCommas(io.closePrice)}
						<span style="font-size:12px;color:${status[ io.compareToPreviousPrice.name ].color}">${status[ io.compareToPreviousPrice.name ].symbol} ${io.compareToPreviousClosePrice}( ${ io.fluctuationsRatio}% )</span>
					</span>

				</div>
				


				<!--div class="description"></div-->
			`
			var _html02 =`</div>`
	
			var new_el = window.UTIL.Html.htmlToElement( _html00 + _html01 + _html02 )
			var target_el = window.document.getElementById( "market_index_" + io.reutersCode )
			if( target_el )
			{
				//window._el.id_market_index.lastElementChild.parentNode.removeChild( target_el )
				//window._el.id_market_index.insertBefore( new_el,window._el.id_market_index.firstChild )
				target_el.innerHTML = _html01
				
			}
			else
			{
				window.document.getElementById( "market_index" ).appendChild( new_el )	
			}
		}
	}
}

window.COMPONENT.getExchangeIndex = function(){
		
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET" , `http://112.144.208.118:8888/getExchangeIndex`, true);
	xhr.onreadystatechange = function(){
		
		if( xhr.readyState == 4 && xhr.status == 200)
		{
			var d = JSON.parse( xhr.responseText )
			window.socketData.getExchangeIndex = d;
			window.COMPONENT.renderExchangeIndex();
		}
	}
	
	xhr.send();

}
window.COMPONENT.renderExchangeIndex = function(){
	var status = {
		"UNCHANGED" : {	color:"grey", symbol : "-",},
		"RISING" : {	color:"red", symbol : "▲",},
		"FALLING" : {	color:"blue", symbol : "▼",},
		//"UPPER_LIMIT" : {	color:"red", symbol : "▲",},
	}

	var display;

	var i = 0,iLen = window.socketData.getExchangeIndex.length,io;
	for(;i<iLen;++i){
		io = window.socketData.getExchangeIndex[ i ];
		//var color = window.UTIL.Color.generateColor('#FF0000','#cccccc',o.rt)		
		var name = io.name;
		if( io.categoryType == "exchangeWorld") continue;

		if( io.marketStatus == "CLOSE") display = "block"
		else display = "none"
		
		var marketStatus = "";
		if( io.marketStatus != null ) marketStatus = ` - <span style="font-size:11px;">${io.marketStatus}</span>`;
		
		var _html00 = `<div class="card" style="margin-top:0px;padding: 5px!important;box-shadow: 0 1px 1px 0 #ccc, 0 0 0 1px #ccc !important;border-radius: 0rem !important;display:block;cursor:pointer;" id="exchange_index_${io.reutersCode}" data-cd-value="${io.reutersCode}" data-nm-value="${io.reutersCode}">`
		var _html01 =`
			<div style="background-color: #97979747;position: absolute;width: 100%;height: 100%;z-index: 5;top: 0px;left: 0;display:${display};"></div>
			<div class="">
				<span style="font-size:13px;"> ${name}</span>${marketStatus}
				<span class="right floated" style="font-size:12px;color:${status[ io.fluctuationsType.name ].color}">${window.UTIL.Number.numberWithCommas(io.closePrice)}   ${status[ io.fluctuationsType.name ].symbol} ${io.fluctuations}( ${ io.fluctuationsRatio}% )</span>
			</div>
			<!--div class="description"></div-->
		`
		var _html02 =`</div>`

		var new_el = window.UTIL.Html.htmlToElement( _html00 + _html01 + _html02 )
		var target_el = window.document.getElementById( "exchange_index_" + io.reutersCode )
		if( target_el )
		{
			//window._el.id_exchange_index.lastElementChild.parentNode.removeChild( target_el )
			//window._el.id_exchange_index.insertBefore( new_el,window._el.id_exchange_index.firstChild )
			target_el.innerHTML = _html01
			
		}
		else
		{
			window.document.getElementById( "exchange_index" ).appendChild( new_el )	
		}
	}

}
window.COMPONENT.getEnergyIndex = function(){
		
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET" , `http://112.144.208.118:8888/getEnergyIndex`, true);
	xhr.onreadystatechange = function(){
		
		if( xhr.readyState == 4 && xhr.status == 200)
		{
			var d = JSON.parse( xhr.responseText )
			window.socketData.getEnergyIndex = d;
			window.COMPONENT.renderEnergyIndex();
		}
	}
	
	xhr.send();

}
window.COMPONENT.renderEnergyIndex = function(){
	var status = {
		"UNCHANGED" : {	color:"grey", symbol : "-",},
		"RISING" : {	color:"red", symbol : "▲",},
		"FALLING" : {	color:"blue", symbol : "▼",},
		//"UPPER_LIMIT" : {	color:"red", symbol : "▲",},
	}

	var display;

	var i = 0,iLen = window.socketData.getEnergyIndex.length,io;
	for(;i<iLen;++i){
		io = window.socketData.getEnergyIndex[ i ];
		//var color = window.UTIL.Color.generateColor('#FF0000','#cccccc',o.rt)		
		var name = io.name;
		//if( io.categoryType == "exchangeWorld") continue;
		
		
		if( io.marketStatus == "CLOSE") display = "block"
		else display = "none"

		var marketStatus = "";
		if( io.marketStatus != null ) marketStatus = ` - <span style="font-size:11px;">${io.marketStatus}</span>`;
		
		var _html00 = `<div class="card" style="margin-top:0px;padding: 5px!important;box-shadow: 0 1px 1px 0 #ccc, 0 0 0 1px #ccc !important;border-radius: 0rem !important;display:block;cursor:pointer;" id="energy_index_${io.reutersCode}" data-cd-value="${io.reutersCode}" data-nm-value="${io.reutersCode}">`
		var _html01 =`
			<div style="background-color: #97979747;position: absolute;width: 100%;height: 100%;z-index: 5;top: 0px;left: 0;display:${display};"></div>
			<div class="">
				<span style="font-size:13px;"> ${name}</span>${marketStatus}
				<span class="right floated" style="font-size:12px;color:${status[ io.fluctuationsType.name ].color}">${window.UTIL.Number.numberWithCommas(io.closePrice)}   ${status[ io.fluctuationsType.name ].symbol} ${io.fluctuations}( ${ io.fluctuationsRatio}% )</span>
			</div>
			<!--div class="description"></div-->
		`
		var _html02 =`</div>`

		var new_el = window.UTIL.Html.htmlToElement( _html00 + _html01 + _html02 )
		var target_el = window.document.getElementById( "energy_index_" + io.reutersCode )
		if( target_el )
		{
			//window._el.id_energy_index.lastElementChild.parentNode.removeChild( target_el )
			//window._el.id_energy_index.insertBefore( new_el,window._el.id_energy_index.firstChild )
			target_el.innerHTML = _html01
			
		}
		else
		{
			window.document.getElementById( "energy_index" ).appendChild( new_el )	
		}
	}

}

window.COMPONENT.getMetalIndex = function(){
		
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET" , `http://112.144.208.118:8888/getMetalIndex`, true);
	xhr.onreadystatechange = function(){
		
		if( xhr.readyState == 4 && xhr.status == 200)
		{
			var d = JSON.parse( xhr.responseText )
			window.socketData.getMetalIndex = d;
			window.COMPONENT.renderMetalIndex();	
		}
	}
	
	xhr.send();

}
window.COMPONENT.renderMetalIndex = function(){
	var status = {
		"UNCHANGED" : {	color:"grey", symbol : "-",},
		"RISING" : {	color:"red", symbol : "▲",},
		"FALLING" : {	color:"blue", symbol : "▼",},
		//"UPPER_LIMIT" : {	color:"red", symbol : "▲",},
	}

	var display;

	var i = 0,iLen = window.socketData.getMetalIndex.length,io;
	for(;i<iLen;++i){
		io = window.socketData.getMetalIndex[ i ];
		//var color = window.UTIL.Color.generateColor('#FF0000','#cccccc',o.rt)		
		var name = io.name;
		//if( io.categoryType == "exchangeWorld") continue;
		
		
		if( io.marketStatus == "CLOSE") display = "block"
		else display = "none"

		var marketStatus = "";
		if( io.marketStatus != null ) marketStatus = ` - <span style="font-size:11px;">${io.marketStatus}</span>`;
		
		var _html00 = `<div class="card" style="margin-top:0px;padding: 5px!important;box-shadow: 0 1px 1px 0 #ccc, 0 0 0 1px #ccc !important;border-radius: 0rem !important;display:block;cursor:pointer;" id="metal_index_${io.reutersCode}" data-cd-value="${io.reutersCode}" data-nm-value="${io.reutersCode}">`
		var _html01 =`
			<div style="background-color: #97979747;position: absolute;width: 100%;height: 100%;z-index: 5;top: 0px;left: 0;display:${display};"></div>
			<div class="">
				<span style="font-size:13px;"> ${name}</span>${marketStatus}
				<span class="right floated" style="font-size:12px;color:${status[ io.fluctuationsType.name ].color}">${window.UTIL.Number.numberWithCommas(io.closePrice)}   ${status[ io.fluctuationsType.name ].symbol} ${io.fluctuations}( ${ io.fluctuationsRatio}% )</span>
			</div>
			<!--div class="description"></div-->
		`
		var _html02 =`</div>`

		var new_el = window.UTIL.Html.htmlToElement( _html00 + _html01 + _html02 )
		var target_el = window.document.getElementById( "metal_index_" + io.reutersCode )
		if( target_el )
		{
			//window._el.id_energy_index.lastElementChild.parentNode.removeChild( target_el )
			//window._el.id_energy_index.insertBefore( new_el,window._el.id_energy_index.firstChild )
			target_el.innerHTML = _html01
			
		}
		else
		{
			window.document.getElementById( "metal_index" ).appendChild( new_el )	
		}
	}

}

window.COMPONENT.getAgriculturalIndex = function(){
		
	var xhr = new XMLHttpRequest();
	
	xhr.open("GET" , `http://112.144.208.118:8888/getAgriculturalIndex`, true);
	xhr.onreadystatechange = function(){
		
		if( xhr.readyState == 4 && xhr.status == 200)
		{
			var d = JSON.parse( xhr.responseText )
			window.socketData.getAgriculturalIndex = d;
			window.COMPONENT.renderAgriculturalIndex();		
		}
	}
	
	xhr.send();

}
window.COMPONENT.renderAgriculturalIndex = function(){
	var status = {
		"UNCHANGED" : {	color:"grey", symbol : "-",},
		"RISING" : {	color:"red", symbol : "▲",},
		"FALLING" : {	color:"blue", symbol : "▼",},
		//"UPPER_LIMIT" : {	color:"red", symbol : "▲",},
	}

	var display;

	var i = 0,iLen = window.socketData.getAgriculturalIndex.length,io;
	for(;i<iLen;++i){
		io = window.socketData.getAgriculturalIndex[ i ];
		//var color = window.UTIL.Color.generateColor('#FF0000','#cccccc',o.rt)		
		var name = io.name;
		//if( io.categoryType == "exchangeWorld") continue;
		
		
		if( io.marketStatus == "CLOSE") display = "block"
		else display = "none"

		var marketStatus = "";
		if( io.marketStatus != null ) marketStatus = ` - <span style="font-size:11px;">${io.marketStatus}</span>`;

		var _html00 = `<div class="card" style="margin-top:0px;padding: 5px!important;box-shadow: 0 1px 1px 0 #ccc, 0 0 0 1px #ccc !important;border-radius: 0rem !important;display:block;cursor:pointer;" id="agricultural_index_${io.reutersCode}" data-cd-value="${io.reutersCode}" data-nm-value="${io.reutersCode}">`
		var _html01 =`
			<div style="background-color: #97979747;position: absolute;width: 100%;height: 100%;z-index: 5;top: 0px;left: 0;display:${display};"></div>
			<div class="">
				<span style="font-size:13px;"> ${name}</span>${marketStatus}
				<span class="right floated" style="font-size:12px;color:${status[ io.fluctuationsType.name ].color}">${window.UTIL.Number.numberWithCommas(io.closePrice)}   ${status[ io.fluctuationsType.name ].symbol} ${io.fluctuations}( ${ io.fluctuationsRatio}% )</span>
			</div>
			<!--div class="description"></div-->
		`
		var _html02 =`</div>`

		var new_el = window.UTIL.Html.htmlToElement( _html00 + _html01 + _html02 )
		var target_el = window.document.getElementById( "agricultural_index_" + io.reutersCode )
		if( target_el )
		{
			//window._el.id_Agricultural_index.lastElementChild.parentNode.removeChild( target_el )
			//window._el.id_Agricultural_index.insertBefore( new_el,window._el.id_Agricultural_index.firstChild )
			target_el.innerHTML = _html01
			
		}
		else
		{
			window.document.getElementById( "agricultural_index" ).appendChild( new_el )	
		}
	}

}

window.COMPONENT.renderTradeValueInfo = function(){
	
	if( window.socketData.renderTradeValueInfo.length == 0 ) return;
	
	var domId = "tradeValueTree";
	
	var dom = document.getElementById( domId );
	if( !window.charts ) window.charts = {}
	if( !window.charts.renderTradeValueInfo )
	{
		window.charts.renderTradeValueInfo = echarts.init(dom);
		window.charts.renderTradeValueInfo.isEvent = 0;
	}
	
	//window.treemapChart_03.showLoading()

	var _chartData = [];
	
	//d.sort(function(a,b){ return a.rt - b.rt }).reverse()
	//var i =0,iLen = window.socketData.updateRank.length,io;
	
	var i = 0,iLen = window.socketData.renderTradeValueInfo.length,so;
	for(;i<iLen;++i){
		so = window.socketData.renderTradeValueInfo[i]
		
		var symbol = "▲";
		if( so.rt == 0 ) symbol = "-";
		if( so.rt < 0 ) symbol = "▼";
		
		var _o = {
			name : so.nm
			,cd : so.cd
			,value : [ so.tradeValue, so.rt ]
			,price : so.price
			,rt : so.rt
			,r_mark : symbol
			,tradeValue : so.tradeValue
			,amt : so.amt
			,children : []
		}
		_chartData.push( _o )
	}
	var h = dom.style.height.replace("px") * 1 - 0
	var chartData = _chartData.sort(function(a,b){ return a.rt - b.rt }).reverse();
	var app = {};

	var option;
	var nowDate = window.UTIL.Date.getTimeTo__YYYYMMDD_HHMMSS()
	var title = "실시간 거래대금순위 - " + nowDate;
	var subTitle = nowDate
	option = {

		title : { show :true, text : title,textStyle : { fontSize:12 } },
		grid : { top:10,bottom:0 },
		height : h,
		series: [
			{ type: 'treemap', leafDepth: null, roam: true, nodeClick: false,
			breadcrumb : { show : false, },
			width :"100%",
			//height :h,
			//top:0,
			data : chartData.slice(0,100),
//			data : chartData,
			label : { formatter: function (params) { 
			let arr = [ "{title|" + params.name + "}",
				"{hr|}",
				"{a|" + echarts.format.addCommas(params.data.price) + " " + params.data.r_mark + echarts.format.addCommas(params.data.rt) + "%}",			
				"{hr|}",
				"{b|" + window.UTIL.Number.longNumberAddString( params.data.tradeValue) + "}",
				//"{a|" + echarts.format.addCommas(params.data.amt) + "}",

			];
			return arr.join('\n');
			}
			, rich : {
				title : { fontSize: 14 },
				a : { fontSize: 9 },
				b : { fontSize: 12 },
				hr : { 
					width : "100%",
					borderColor : "rgba(255,255,255,0.0)",
					borderWidth : 0.5,
					height : 0,
					lineHeight : 10,
				}
			}
			},
			visualMin : -30,
			visualMax : 30,
			visualDimension : 1,
			levels: [{ color: ['blue','#ccc','red'],colorMappingBy: 'value',itemStyle: {gapWidth: 1}}]
		}
		]
	};

	if( option && typeof option === 'object' ){
		window.charts.renderTradeValueInfo.setOption(option);
		window.charts.renderTradeValueInfo.resize();

		//setTimeout(function(){ window.charts.renderTradeValueInfo.hideLoading(); },1000)
	}

	if( !window.charts.renderTradeValueInfo.isEvent )
	{
		window.charts.renderTradeValueInfo.on('click',function(d){
			window.Info.renderTradeValueByCd.curCd = d.data.cd;
			window.COMPONENT.getTradeValueByCd()
		})
		window.charts.renderTradeValueInfo.isEvent = 1;
	}
}

window.COMPONENT.renderTradeValueInfo_gap = function(){
	console.log( "[ S ] - window.wsFns.renderTradeValueInfo_gap" )

	var domId = "tradeValueTreeGap";	
	var dom = document.getElementById( domId );

	var now = window.UTIL.Date.getTimeTo__HHMMSS();
	if( now > 153300 )
	{
		dom.remove();
		var _a = document.getElementById( "tradeValueTree" );
		_a.className = _a.className.replace( "eight","sixteen" );
		window.charts.renderTradeValueInfo.resize();
		return;
		
	}

	if( window.socketData.renderTradeValueInfo_gap.length == 0 ) return;
	

	if( !window.charts ) window.charts = {}
	if( !window.charts.renderTradeValueInfo_gap )
	{
		window.charts.renderTradeValueInfo_gap = echarts.init(dom);
		window.charts.renderTradeValueInfo_gap.isEvent = 0;
	}
	
	//window.treemapChart_04.showLoading()

	var _chartData = [];
	var colors = [];
	//d.sort(function(a,b){ return a.rt - b.rt }).reverse()
	//var i =0,iLen = window.socketData.updateRank.length,io;
	
	//var i = 0,iLen = window.socketData.renderTradeValueInfo_gap.length,so;
	var i = 0,iLen = 50,so;
	for(;i<iLen;++i){
		so = window.socketData.renderTradeValueInfo_gap[i]
		
		var symbol = "▲"
		if( so.rt == 0 ) 
		{
			var symbol = "-"
		}
		if( so.rt < 0 ) 
		{
			var symbol = "▼"	
		}

		var _o = {
			name : so.nm
			,cd : so.cd
			,value : [ so.tradeValueGap, so.rtChange ]
			,price : so.price
			,rt : so.rt
			,rtChange : so.rtChange
			,curRt : so.curRt
			,prevRt : so.prevRt
			,r_mark : symbol
			,tradeValue : so.tradeValue
			,tradeValueGap : so.tradeValueGap
			,amt : so.amt
			,children : []
		}
		_chartData.push( _o )
	}
	var h = dom.style.height.replace("px") * 1
	var chartData = _chartData.sort(function(a,b){ return b.tradeValueGap - a.tradeValueGap });
	var app = {};

	var option;
	var nowDate = window.UTIL.Date.getTimeTo__YYYYMMDD_HHMMSS()
	var title = "실시간 거래대금갭 - " + nowDate;
	var subTitle = nowDate;
	option = {
		title : { show :true, text : title,textStyle : { fontSize:12 } },
		grid : { top:10,bottom : 0 },
		height : h,
		series: [
			{ type: 'treemap', leafDepth: null, roam: true, nodeClick: false,
			breadcrumb : { show : false, },
			width :"100%",
			//height :h,
			//top:0,
			data : chartData,
			label : { formatter: function (params) { 
			let arr = [ "{title|" + params.name + "}",
				//"{hr|}",
				"{a|" + echarts.format.addCommas(params.data.price) + " " + params.data.r_mark + echarts.format.addCommas(params.data.rt) + "%}",			
				"{hr|}",
				"{a|volume:" + echarts.format.addCommas(params.data.amt) + " / value:" + window.UTIL.Number.longNumberAddString(params.data.tradeValue) + "}",
				"{a|curRt:" + echarts.format.addCommas(params.data.curRt) + " / prevRt:" + echarts.format.addCommas(params.data.prevRt) + "}",
				"{hr|}",
				"{b|" + window.UTIL.Number.longNumberAddString( params.data.tradeValueGap ) + "(" + echarts.format.addCommas(params.data.rtChange.toFixed(2)) + "%)}",

			];
			return arr.join('\n');
			}
			, rich : {
				title : { fontSize: 14 },
				a : { fontSize: 9 },
				b : { fontSize: 12 },
				hr : { 
					width : "100%",
					borderColor : "rgba(255,255,255,0.0)",
					borderWidth : 0.5,
					height : 0,
					lineHeight : 10,
				}
			}
			},
			visualMin : -1,
			visualMax : 1,
			visualDimension : 1,
			levels: [{ color: ['blue','#999','red'],colorMappingBy: 'value',itemStyle: {gapWidth: 1}}]
		}
		]
	};

	if( option && typeof option === 'object' ){
		window.charts.renderTradeValueInfo_gap.setOption(option);
		window.charts.renderTradeValueInfo_gap.resize();

		//setTimeout(function(){ window.charts.renderTradeValueInfo_gap.hideLoading(); },1000)	
	}

	if( !window.charts.renderTradeValueInfo_gap.isEvent )
	{
		window.charts.renderTradeValueInfo_gap.on('click',function(d){
			window.Info.renderTradeValueByCd.curCd = d.data.cd
			window.COMPONENT.getTradeValueByCd()
		})
		window.charts.renderTradeValueInfo_gap.isEvent = 1;
	}
	console.log( "[ E ] - window.wsFns.renderTradeValueInfo_gap" )
}


window.COMPONENT.renderStockInfo = function( cd ){
		
	var d = window.socketData.renderStockInfo;
			
	var status = {
		"EVEN" : {	color:"grey", symbol : "-",},
		"RISE" : {	color:"red", symbol : "▲",},
		"FALL" : {	color:"blue", symbol : "▼",},
		"UPPER_LIMIT" : {	color:"red", symbol : "▲",},
	}

	var color = status[ d.change ].color
	var symbol = status[ d.change ].symbol
	var tradeVolumeRatio = 0
	
	if( d.prevAccTradeVolumeChangeRate < 1 )
	{
		tradeVolumeRatio = ((1-d.prevAccTradeVolumeChangeRate)*-100).toFixed(2);
	}
	else
	{
		tradeVolumeRatio =(( d.prevAccTradeVolumeChangeRate - 1 )*100).toFixed(2)
	}

	var _htmlTxt = `
	<div class="sixteen wide column" style="">
		<div class="ui grid">
			<div class="three wide column" style="">
				<span style='font-size:12px;padding:10px 0px;color:#ccc;'>${ d.date }</span><br>
				<span style='font-size:15px;padding:10px 0px;'>${ d.name }</span>
				<span style='font-size:12px;padding:10px 0px;'>( ${ d.symbolCode } ) - ${d.market} </span><br>
				<span style="color:${color};font-size:18px;font-weight:bold;">  ${window.UTIL.Number.numberWithCommas( d.tradePrice )}</span> 
				<span style="color:${color};"> ${symbol} ${window.UTIL.Number.numberWithCommas( d.changePrice )} ( ${(d.changeRate*100).toFixed(2)} % )</span><br>
				<span style="font-size:12px;">  거래량 : ${window.UTIL.Number.numberWithCommas( d.accTradeVolume )}( ${tradeVolumeRatio}% ) | 거래대금 ${window.UTIL.Number.numberWithCommas( d.accTradePrice )} </span>  
			</div>
			<div class="three wide column" style="min-height:200px;">
				<div claa="image"><img src="https://ssl.pstatic.net/imgfinance/chart/mobile/mini/${cd}_end_up_tablet.png?${Date.now()}"  style="width:-webkit-fill-available;"></div>
			</div>
			
			<div class="ten wide column" style="">
				<div class="ui grid">
					<div class="sixteen wide column" style="">
						<table class="ui celled table compact">
							<thead>
								<tr>
									<th>전일종가</th>
									<th>전일거래량</th>
									<th>거래금</th>
									<th>시가</th>
									<th>고가</th>
									<th>저가</th>
									<th>시가총액</th>
									<th>외국인비율</th>
									<th>EPS</th>
									<th>BPS</th>
									<th>PBR</th>
									<th>PER</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>${window.UTIL.Number.numberWithCommas( d.prevClosingPrice )}</td>
									<td>${window.UTIL.Number.numberWithCommas( d.prevAccTradeVolume )}</td>
									<td>${window.UTIL.Number.numberWithCommas( d.accTradePrice )}</td>
									<td>${window.UTIL.Number.numberWithCommas( d.openingPrice )}</td>
									<td>${window.UTIL.Number.numberWithCommas( d.highPrice )}</td>
									<td>${window.UTIL.Number.numberWithCommas( d.lowPrice )}</td>
									<td>${window.UTIL.Number.numberWithCommas( d.marketCap )}( ${d.marketCapRank}위 )</td>
									<td>${d.foreignRatio}%( ${d.prevForeignRatio}% )</td>
									<td>${window.UTIL.Number.numberWithCommas( d.eps )}원</td>
									<td>${window.UTIL.Number.numberWithCommas( d.bps )}원</td>
									<td>${d.pbr}배</td>
									<td>${d.per}배</td>
								</tr>
							<tbody>
						</table>
					</div>
					<div class="sixteen wide column" style="">
						<span style="font-size:11px;">${d.companySummary}</span>
					</div>
				</div>
			</div>


		</div>
	</div>
	`
	
	var _target_dom = document.getElementById( "renderStockInfo" );
	_target_dom.innerHTML = _htmlTxt
}



var imageOnError = function( img ){
	img.onerror = "";
	img.src = "https://dummyimage.com/100x80/000/fff&text=Ooops!"
	return true;
}

window.COMPONENT.renderNewsFromDaum = function( cd ){
		
		var xhr = new XMLHttpRequest();
		xhr.open("GET" , "http://112.144.208.118:8888/getNewsByCdFromDaum?cd=" + cd, true);
		xhr.onreadystatechange = function() {

			if(xhr.readyState == 4 && xhr.status == 200)
			{
				var d = JSON.parse( xhr.responseText )
				var _htmlTxt = `<div class="ui grid" style="padding:0px 0 0px 0;">`
				
				var i = 0,iLen = d.data.length,io;
				//var i = 0,iLen = 5,io;
				for(;i<iLen;++i){
					io = d.data[ i ]
					var a = ""
					var b = `<div class="six wide column" style="">
						<div><img src="${io.imageUrl}" onerror="return imageOnError(this)" style="width: 100%;height:80px;object-fit:cover;" loading='lazy'></div>
					  </div>`
					if( io.imageUrl == null )
					{
						a = "sixteen";
						b = "";
					}
					else
					{
						a = "ten"
					}

					_htmlTxt += `
					${b}
					  <div class="${a} wide column" style="padding:5px 10px!important;border-bottom:0px solid #ccc;padding-bottom:10px;">
						<a href="https://m.finance.daum.net/quotes/A${window.params.cd}/news/stock/${io.newsId}" target="_blank" style="color:#000!important;cursor:pointer;display:block;">
						<div stlye="margin-bottom:40px;">
						<span style="font-size:12px;font-weight: bold;line-height:18px;">${io.title}</span></br>
						<span style="font-size:11px;color:#666;">${io.cpKorName} · ${io.createdAt} <!--img src="https://t1.daumcdn.net/top/favicon.ico" style="width:15px"--></span>
						</div>
						</a>
						
						<!--div stlye="margin-bottom:40px;"><span style="font-size:12px;font-weight: bold;line-height:22px;">${io.summary}</span></div-->
					  </div>`	
				}
				_htmlTxt += `</div>`
				
				var _target_dom = document.getElementById( "news" );
				_target_dom.innerHTML = _htmlTxt
			}

		}

		xhr.send();
	
	
}

window.COMPONENT.renderNewsFromNaver = function( cd ){

		var xhr = new XMLHttpRequest();

		xhr.open("GET" , "http://112.144.208.118:8888/getNewsByCdFromNaver?cd=" + cd, true);

		xhr.onreadystatechange = function() {

			if(xhr.readyState == 4 && xhr.status == 200)
			{
				var d = JSON.parse( xhr.responseText )
				var _htmlTxt = `<div class="ui grid" style="padding:0px 0 0px 0;">`
				
				var i = 0,iLen = d.length,io;
				//var i = 0,iLen = 5,io;
				for(;i<iLen;++i){
					io = d[ i ].items[0]
					var a = ""
					var b = `<div class="six wide column" style="">
						<div><img src="${io.imageOriginLink}" onerror="return imageOnError(this)" style="width: 100%;height:80px;object-fit:cover;" loading='lazy'></div>
					  </div>`
					if( io.imageOriginLink == null )
					{
						a = "sixteen";
						b = "";

					}
					else
					{
						a = "ten"
					}
					_htmlTxt += `
					${b}
					  <div class="${a} wide column" style="padding:5px 10px;!important;border-bottom:0px solid #ccc;padding-bottom:10px;">
						<a href="https://m.stock.naver.com/domestic/stock/${window.params.cd}/news/view/${io.officeId}/${io.articleId}" target="_blank" style="color:#000!important;cursor:pointer;display:block">
							<div stlye="margin-bottom:40px;">
							<span style="font-size:12px;font-weight: bold;line-height:18px;">${io.titleFull}</span></br>
							<span style="font-size:11px;color:#666;">${io.officeName} · ${io.datetime} <!--img src="https://ssl.pstatic.net/imgstock/favicon.ico" style="width:15px;"--></span>
							</div>
						</a>
						<!--div stlye="margin-bottom:40px;"><span style="font-size:11px;font-weight: bold;line-height:22px;">${io.body}</span></div-->
					  </div>`	
				}
				_htmlTxt += `</div>`
				
				var _target_dom = document.getElementById( "news" );
				_target_dom.innerHTML = _htmlTxt
			}

		}

		xhr.send();
}


window.COMPONENT.getAcgDataByCd = function( cd, start, end ){
		
	var xhr = new XMLHttpRequest();

	xhr.open("GET" , `http://112.144.208.118:8888/getAcgDataByCd?cd=${cd}&start=${start}&end=${end}`, true);
	xhr.onreadystatechange = function() {

		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var _d = JSON.parse( xhr.responseText )
			var d = _d.reverse()	
			if( d == null ) return;
			var _htmlTxt = ""
			var _htmlTxt = `
			<div style="color:#666;font-size:12px;">
			일자별 투자자 누적순매수 ( 단위 : 백만 )
			</div>
			<table class="ui celled table compact">
				<thead>
					<tr>
						<th> 일자   </th>
						<th> 현재가격 </th>
						<th> 거래량  </th>
						<!--th> "cd"   </th-->
						<th> 전일비  </th>
						<th> 등락률   </th>
						<th> 개인  </th>
						<th> 외국인  </th>
						<th> 기관계  </th>
						<th> 금융투자  </th>
						<th> 보험  </th>
						<th> 투신  </th>
						<th> 기타금융  </th>
						<th> 은행  </th>
						<th> 연기금등  </th>
						<th> 사모펀드 </th>
						<!--th> 국가 </th-->
						<th> 기타법인 </th>
						<th> 내외국인 </th>
					</tr>
				</thead>
				<tbody>
			`
			var i =0,iLen = _d.length,io,io00;
			for(;i<iLen;++i){
				io00 = d[ i ];
				io = d[ i ].pp;
				
				window.data.d00.push( io.tr1 )
				window.data.d01.push( io.tr2 )
				window.data.d02.push( io.tr3 )
				window.data.d99.push( io )
			}
			window.data.d00 = window.data.d00.reverse();
			window.data.d01 = window.data.d01.reverse();
			window.data.d02 = window.data.d02.reverse();
			//window.data.d99.push( io )
			//var i =0,iLen = d.length,io,io00;
			var i =0,iLen = 15,io,io00;

			for(;i<iLen;++i){
				io00 = d[ i ];
				io = d[ i ].pp;

				_htmlTxt += "<tr>"
				_htmlTxt += "<td>" + io00._t + "</td>"  
				_htmlTxt += "<td>" + io00.price + "</td>"  
				_htmlTxt += "<td>" + io00.amt  + "</td>"  
				//_htmlTxt += "<td>" + io.cd  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io00.ydt )};'>` + io00.ydt + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io00.rt )};'>`  + io00.rt  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr1 )};'>`	  + longNumberAddString( io.tr1  )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr2 )};'>`	  + longNumberAddString( io.tr2  )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr3 )};'>`	  + longNumberAddString( io.tr3  )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr4 )};'>`	  + longNumberAddString( io.tr4  )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr5 )};'>`	  + longNumberAddString( io.tr5  )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr6 )};'>`	  + longNumberAddString( io.tr6  )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr7 )};'>`	  + longNumberAddString( io.tr7  )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr8 )};'>`	  + longNumberAddString( io.tr8  )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr9 )};'>`	  + longNumberAddString( io.tr9  )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr10 )};'>`  + longNumberAddString( io.tr10 )  + "</td>"  
				//_htmlTxt += `<td style='color:${_html_updateStock( io.tr11 )};'>`  + longNumberAddString( io.tr11 )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr12 )};'>`  + longNumberAddString( io.tr12 )  + "</td>"  
				_htmlTxt += `<td style='color:${_html_updateStock( io.tr13 )};'>`  + longNumberAddString( io.tr13 )  + "</td>"  

				_htmlTxt += "</tr>"
			}
			
			_htmlTxt += `</tbody></table>`
				
			
			var _target_dom = document.getElementById( "AgcData" );
			_target_dom.innerHTML = _htmlTxt
		}

	}

	xhr.send();

}



window.COMPONENT.getCandleChartByCd = function(cd,startTime,endTime,cbFunction){
	var xhr = new XMLHttpRequest();

	//http://112.144.208.118:8888/getCandleDataByCd?cd=510007&startTime=20220201&endTime=20220214
	xhr.open("GET" , `http://112.144.208.118:8888/getCandleDataByCd?cd=${cd}&startTime=${startTime}&endTime=${endTime}`, true);

	xhr.onreadystatechange = function() {

		if(xhr.readyState == 4 && xhr.status == 200)
		{
			var d = JSON.parse( xhr.responseText );
			window.COMPONENT.renderCandleChartByCd(d)	
		}

	}
	xhr.send();
}


function splitData(rawData) {
  let categoryData = [];
  let values = [];
  let volumes = [];
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push([rawData[i][0],rawData[i][3],rawData[i][2],rawData[i][1]]);
    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][3] ? 1 : -1]);
  }
  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  };
}

function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}

window.COMPONENT.renderCandleChartByCd = function(data){
	

	if( window.data.d00.length == 0 ) return setTimeout(function(){ window.COMPONENT.renderCandleChartByCd(data) },1000)
	if( window.data.d01.length == 0 ) return setTimeout(function(){ window.COMPONENT.renderCandleChartByCd(data) },1000)
	if( window.data.d02.length == 0 ) return setTimeout(function(){ window.COMPONENT.renderCandleChartByCd(data) },1000)

	var dom = document.getElementById("candleChart");
	window.charts.candle00 = echarts.init(dom);


	var app = {};
	var option;

	var upColor = 'red';
	var downColor = 'skyblue';

	//var rawData = window.socketData.renderCandleChartByCd;
	var rawData = data;
	var data = splitData(rawData);

	window.charts.candle00.setOption(
	(option = {
	  animation: false,
	  legend: { top: 10, left: 'left',data: ['일봉', 'MA5', 'MA20', 'MA60', 'MA120', "개인", "외국인", "기관"]  },
	  tooltip: {
		trigger: 'axis',axisPointer: { type: 'cross' }, borderWidth: 1,	borderColor: '#ccc', padding: 10, textStyle: { color: '#000'  }, 
		position: function (pos, params, el, elRect, size) {
		  const obj = { top: 10  };
		  obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
		  return obj;
		}
		// extraCssText: 'width: 170px'
	  },
	  axisPointer: { link: [ { xAxisIndex: '0' } ], label: { backgroundColor: '#777' } },
	  toolbox: { feature: { 
			dataZoom: { yAxisIndex: false },
			//brush: {   type: ['lineX', 'clear'] }
		}
	  },
	  brush: { xAxisIndex: 'all', brushLink: 'all', outOfBrush: { colorAlpha: 0.1 } },
	  visualMap: {
		show: false,seriesIndex: 1,dimension: 2,
		pieces: [
		  {value: 1,color: downColor},
		  {value: -1,color: upColor}
		]
	  },
	  grid: [
		{ left: '4%', right: '4%', height: '68%' },
		{ left: '4%', right: '4%', top: '80%', height: '15%'   }
	  ],
	  xAxis: [
		{
		  type: 'category',
		  data: data.categoryData,
		  boundaryGap: false,
		  axisLine: { onZero: true },
		  //splitLine: { show: true },
		  min: 'dataMin',
		  max: 'dataMax',
		  axisPointer: {
			z: 100
		  }, axisLabel : { fontSize : 9 }
		},
		{
		  type: 'category',
		  gridIndex: 1,
		  data: data.categoryData,
		  //boundaryGap: false,
		  //axisLine: { onZero: false },
		  axisTick: { show: false },
		  splitLine: { show: false },
		  axisLabel: { show: false },
		  min: 'dataMin',
		  max: 'dataMax'
		}
	  ],
	  yAxis: [
		{ scale: true, splitArea: {show: false },splitLine: { show: false },axisLine: { show: true }, axisLabel : { fontSize : 9 } },
		{ scale: true, gridIndex: 1,splitNumber: 2,axisLabel: { show: false,fontSize : 9 },axisLine: { show: false },axisTick: { show: false },splitLine: { show: false }},
		{ scale: true, type:"value",splitLine: { show: false },axisLine: { show: true }, axisLabel : { fontSize : 9 } },
	  ],
	  //dataZoom: [{ type: 'inside', xAxisIndex: [0, 1], start: 98, end: 100 }, { show: true, xAxisIndex: [0, 1], type: 'slider', top: '85%', start: 98, end: 100 } ],
	  series: [
		{
		  name: '일봉',
		  type: 'candlestick',
		  data: data.values,
		  itemStyle: { color: upColor, color0: downColor, borderColor: undefined,  borderColor0: undefined },
		  tooltip: {
			formatter: function (param) {
			  param = param[0];
			  return [
				'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
				'Open: ' + param.data[0] + '<br/>',
				'Close: ' + param.data[1] + '<br/>',
				'Lowest: ' + param.data[2] + '<br/>',
				'Highest: ' + param.data[3] + '<br/>'
			  ].join('');
			}
		  }
		},
		{ name: 'Volume', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: data.volumes },
		{ name: 'MA5', type: 'line', data: calculateMA(5, data), smooth: true, showSymbol: false, lineStyle: { opacity: 0.5 } },
		{ name: 'MA20', type: 'line', data: calculateMA(20, data), smooth: true, showSymbol: false, lineStyle: { opacity: 0.5 } },
		{ name: 'MA60', type: 'line', data: calculateMA(60, data), smooth: true, showSymbol: false, lineStyle: { opacity: 0.5 } },
		{ name: 'MA120', type: 'line', data: calculateMA(120, data), smooth: true, showSymbol: false, lineStyle: { opacity: 0.5 } },
		{ name: '개인', type: 'line', data: window.data.d00, smooth: true, showSymbol: false, lineStyle: { opacity: 0.2 }, yAxisIndex: 2, areaStyle : { opacity: 0.2 } },
		{ name: '외국인', type: 'line', data: window.data.d01, smooth: true, showSymbol: false, lineStyle: { opacity: 0.2 }, yAxisIndex:2, areaStyle : { opacity: 0.2 }  },
		{ name: '기관', type: 'line', data: window.data.d02, smooth: true, showSymbol: false, lineStyle: { opacity: 0.2 }, yAxisIndex: 2, areaStyle : { opacity: 0.2 }},

		
	  ]
	}), true );

	if (option && typeof option === 'object') {
		window.charts.candle00.setOption(option);
	}
}

window.COMPONENT.getAcgDataByCd_50 = function(){
		

		if( window.data.d00.length == 0 ) return setTimeout(function(){ window.COMPONENT.getAcgDataByCd_50(data) },1000)
		if( window.data.d01.length == 0 ) return setTimeout(function(){ window.COMPONENT.getAcgDataByCd_50(data) },1000)
		if( window.data.d02.length == 0 ) return setTimeout(function(){ window.COMPONENT.getAcgDataByCd_50(data) },1000)
		if( window.data.d99.length == 0 ) return setTimeout(function(){ window.COMPONENT.getAcgDataByCd_50(data) },1000)


		var r00 = {}
		var i =0,iLen = 30,io;
		for(;i<iLen;++i){
			io = window.data.d99[ i ];
			
			var s,so;
			for( s in io ){
				so = io[ s ];
				if( !r00[ s ] ) r00[ s ] = so;
				else r00[ s ] += so;
			}
		}		

		var r01 = {}
		var i =0,iLen = 15,io;
		for(;i<iLen;++i){
			io = window.data.d99[ i ];
			
			var s,so;
			for( s in io ){
				so = io[ s ];
				if( !r01[ s ] ) r01[ s ] = so;
				else r01[ s ] += so;
			}
		}		


		var r02 = {}
		var i =0,iLen = 5,io;
		for(;i<iLen;++i){
			io = window.data.d99[ i ];
			
			var s,so;
			for( s in io ){
				so = io[ s ];
				if( !r02[ s ] ) r02[ s ] = so;
				else r02[ s ] += so;
			}
		}		


		var _htmlTxt = ""
		var _htmlTxt = `
		<div style="color:#666;font-size:12px;">
		기간별 투자자 누적순매수 ( 단위 : 백만 )
		</div>
		<table class="ui celled table compact">
			<thead>
				<tr>
					<th> 기간   </th>
					<!--th> 현재가격</th-->
					<!--th> 거래량  </th-->
					<!--th> "cd"   </th-->
					<!--th> 전일비  </th-->
					<!--th> 등락률  </th-->
					<th> 개인  </th>
					<th> 외국인  </th>
					<th> 기관계  </th>
					<th> 금융투자  </th>
					<th> 보험  </th>
					<th> 투신  </th>
					<th> 기타금융  </th>
					<th> 은행  </th>
					<th> 연기금등  </th>
					<th> 사모펀드 </th>
					<th> 국가 </th>
					<th> 기타법인 </th>
					<th> 내외국인 </th>
				</tr>
			</thead>
			<tbody>
		`

		_htmlTxt += "<tr>"
		_htmlTxt += "<td> 5일 </td>"  
		//_htmlTxt += "<td>" + io00.price + "</td>"  
		//_htmlTxt += "<td>" + io00.amt  + "</td>"  
		//_htmlTxt += "<td>" + io.cd  + "</td>"  
		//_htmlTxt += `<td style='color:${_html_updateStock( io00.ydt )};'>` + io00.ydt + "</td>"  
		//_htmlTxt += `<td style='color:${_html_updateStock( io00.rt )};'>` + io00.rt   + "</td>"  
		
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr1 ) };'>` + longNumberAddString( r02.tr1  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr2 ) };'>` + longNumberAddString( r02.tr2  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr3 ) };'>` + longNumberAddString( r02.tr3  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr4 ) };'>` + longNumberAddString( r02.tr4  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr5 ) };'>` + longNumberAddString( r02.tr5  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr6 ) };'>` + longNumberAddString( r02.tr6  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr7 ) };'>` + longNumberAddString( r02.tr7  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr8 ) };'>` + longNumberAddString( r02.tr8  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr9 ) };'>` + longNumberAddString( r02.tr9  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr10) };'>` + longNumberAddString( r02.tr10 )  + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr11) };'>` + longNumberAddString( r02.tr11 )  + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr12) };'>` + longNumberAddString( r02.tr12 )  + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r02.tr13) };'>` + longNumberAddString( r02.tr13 )  + "</td>"  

		_htmlTxt += "</tr>"
	
		_htmlTxt += "<tr>"
		_htmlTxt += "<td> 15일 </td>"  
		//_htmlTxt += "<td>" + io00.price + "</td>"  
		//_htmlTxt += "<td>" + io00.amt  + "</td>"  
		//_htmlTxt += "<td>" + io.cd  + "</td>"  
		//_htmlTxt += `<td style='color:${_html_updateStock( io00.ydt )};'>` + io00.ydt + "</td>"  
		//_htmlTxt += `<td style='color:${_html_updateStock( io00.rt )};'>` + io00.rt   + "</td>"  
		
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr1 )};'>` +  longNumberAddString( r01.tr1  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr2 )};'>` +  longNumberAddString( r01.tr2  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr3 )};'>` +  longNumberAddString( r01.tr3  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr4 )};'>` +  longNumberAddString( r01.tr4  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr5 )};'>` +  longNumberAddString( r01.tr5  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr6 )};'>` +  longNumberAddString( r01.tr6  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr7 )};'>` +  longNumberAddString( r01.tr7  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr8 )};'>` +  longNumberAddString( r01.tr8  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr9 )};'>` +  longNumberAddString( r01.tr9  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr10 )};'>` + longNumberAddString( r01.tr10 )  + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr11 )};'>` + longNumberAddString( r01.tr11 )  + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr12 )};'>` + longNumberAddString( r01.tr12 )  + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r01.tr13 )};'>` + longNumberAddString( r01.tr13 )  + "</td>"  

		_htmlTxt += "</tr>"


		_htmlTxt += "<tr>"
		_htmlTxt += "<td> 50일 </td>"  
		//_htmlTxt += "<td>" + io00.price + "</td>"  
		//_htmlTxt += "<td>" + io00.amt  + "</td>"  
		//_htmlTxt += "<td>" + io.cd  + "</td>"  
		//_htmlTxt += `<td style='color:${_html_updateStock( io00.ydt )};'>` + io00.ydt + "</td>"  
		//_htmlTxt += `<td style='color:${_html_updateStock( io00.rt )};'>` + io00.rt   + "</td>"  
		
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr1 )};'>` +  longNumberAddString( r00.tr1  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr2 )};'>` +  longNumberAddString( r00.tr2  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr3 )};'>` +  longNumberAddString( r00.tr3  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr4 )};'>` +  longNumberAddString( r00.tr4  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr5 )};'>` +  longNumberAddString( r00.tr5  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr6 )};'>` +  longNumberAddString( r00.tr6  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr7 )};'>` +  longNumberAddString( r00.tr7  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr8 )};'>` +  longNumberAddString( r00.tr8  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr9 )};'>` +  longNumberAddString( r00.tr9  ) + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr10 )};'>` + longNumberAddString( r00.tr10 )  + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr11 )};'>` + longNumberAddString( r00.tr11 )  + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr12 )};'>` + longNumberAddString( r00.tr12 )  + "</td>"  
		_htmlTxt += `<td style='color:${_html_updateStock( r00.tr13 )};'>` + longNumberAddString( r00.tr13 )  + "</td>"  

		_htmlTxt += "</tr>"
		_htmlTxt += `</tbody></table>`
			
		
		var _target_dom = document.getElementById( "AgcData_50" );
		_target_dom.innerHTML = _htmlTxt
	
}

window.COMPONENT.getTradersData = function( date,cbFunction ){

	var xhr = new XMLHttpRequest();
    xhr.open("GET" , encodeURI("http://112.144.208.118:8888/getInsightByStock?date=" + 	date ) , true);

    xhr.onreadystatechange = function() {

        if(xhr.readyState == 4 && xhr.status == 200)
        {
            var a =JSON.parse(xhr.responseText);
			var chartDatas = { b : [], s : [] };
			var i = 0,iLen = a.length,io;
			for(;i<iLen;++i){
				io = a[ i ];

				var b = { name: io.nm, cd : io.cd, b : io.total[ "b" ], s : io.total[ "s" ], pp : io.total[ "pp" ], value: io.total[ "b" ], children: []	};
				var s = { name: io.nm, cd : io.cd, b : io.total[ "b" ], s : io.total[ "s" ], pp : io.total[ "pp" ], value: io.total[ "s" ] * -1, children: []	};

				var k,ko;
				for( k in io.trs ){
					ko = io.trs[ k ];
					b.children.push({ name: k, value: ko.b, b : ko.b, s : ko.s, pp : ko.b + ko.s, children: [] });
					s.children.push({ name: k, value: ko.s * -1, b : ko.b, s : ko.s, pp : ko.b + ko.s, children: [] });
				}
				chartDatas.b.push( b );
				chartDatas.s.push( s );				
			}
			cbFunction( chartDatas );
		}
	}
	xhr.send();
}


window.COMPONENT.fTradersBuyTreemap = function( data ){
	
	if( !window.charts ) window.charts = {};	
	var dom = document.getElementById("fTradersBuyTreemap");
	window.charts.fTradersBuyTreemap = echarts.init(dom);

	var h = dom.style.height.replace("px") * 1

	var nowDate = window.UTIL.Date.getTimeTo__YYYYMMDD_HHMMSS()
	var title = "외국계증권사별 매수현황( 금액 ) - " + nowDate;

	var app = {};
	var option = {
		title : { show :true, text : title,textStyle : { fontSize:12 } },
//		grid : { top:10,bottom : 0 },
		//height : h,
		tooltip: {},
		series: [
			{
				name: '외국계증권사별 매수현황( 금액 )',
				type: 'treemap',
				width :"100%",
				top : 10,
				height : h,
				visibleMin: 300,
				data: data,
				leafDepth: 1,
				roam: false,
				label : { 
					formatter: function (params){
						let arr = ["{title|" + params.name + "}",
							"{hr|}",
							"{a| 매수 : "  + echarts.format.addCommas(params.data.b ) + "}",
							"{a| 메도 : " + echarts.format.addCommas(params.data.s ) + "}",
							"{hr|}",
							"{b| 순매수 : " + echarts.format.addCommas(params.data.pp ) + "}",

						];
						return arr.join('\n');
					},
					rich : {
						title : { fontSize: 14 },
						a : { fontSize: 9 },
						b : { fontSize: 12 },
						hr : { 
							width : "100%",
							borderColor : "rgba(255,255,255,0.0)",
							borderWidth : 0.5,
							height : 0,
							lineHeight : 10,
						}
					}
				},
				levels: [
					{ color: ['pink','red'], colorMappingBy: 'value', itemStyle: { borderColor: '#fff', borderWidth: 4, gapWidth: 4 } },
					{ color: ['pink','red'], colorMappingBy: 'value', itemStyle: { borderColorSaturation: 0.7, gapWidth: 2, borderWidth: 2 } },
				]
			}
		]
	};

	if (option && typeof option === 'object') {
		window.charts.fTradersBuyTreemap.setOption(option);
	}
}

window.COMPONENT.fTradersSellTreemap = function(data){

	if( !window.charts ) window.charts = {};	
	var dom = document.getElementById("fTradersSellTreemap");
	window.charts.fTradersSellTreemap = echarts.init(dom);

	var h = dom.style.height.replace("px") * 1

	var nowDate = window.UTIL.Date.getTimeTo__YYYYMMDD_HHMMSS()
	var title = "외국계증권사별 매도현황( 금액 ) - " + nowDate;

	var app = {};
	var option = {
		title : { show :true, text : title,textStyle : { fontSize:12 } },
		//grid : { top:10,bottom : 0 },
		//height : h,
		tooltip: {},
		series: [
			{
				name: '외국계증권사별 매도현황( 금액 )',
				type: 'treemap',
				width :"100%",
				top : 10,
				height : h,
				visibleMin: 300,
				data: data,
				roam: false,
				leafDepth: 1,
				label : { 
					formatter: function (params){
						let arr = ["{title|" + params.name + "}",
							"{hr|}",
							"{a| 매수 : "  + echarts.format.addCommas(params.data.b ) + "}",
							"{a| 메도 : " + echarts.format.addCommas(params.data.s ) + "}",
							"{hr|}",
							"{b| 순매수 : " + echarts.format.addCommas(params.data.pp ) + "}",

						];
						return arr.join('\n');
					},
					rich : {
						title : { fontSize: 14 },
						a : { fontSize: 9 },
						b : { fontSize: 12 },
						hr : { 
							width : "100%",
							borderColor : "rgba(255,255,255,0.0)",
							borderWidth : 0.5,
							height : 0,
							lineHeight : 10,
						}
					}
				},
				levels: [
					{ color: ['skyblue','blue'], colorMappingBy: 'value', itemStyle: { borderColor: '#fff', borderWidth: 4, gapWidth: 4 } },
					{ color: ['skyblue','blue'], colorMappingBy: 'value', itemStyle: { borderColorSaturation: 0.7, gapWidth: 2, borderWidth: 2 } },
				]
			}
		]
	};


	if (option && typeof option === 'object') {
		window.charts.fTradersSellTreemap.setOption(option);
	}
}
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;
//-------------------------------------------------------;

window.Websocket = {}
window.Websocket.init = function(){

	window.ws = new WebSocket("ws://112.144.208.118:8888/index.html");

	window.ws.onopen = function(e) {
		console.log("[open] 커넥션이 만들어졌습니다.");
		console.log("데이터를 서버에 전송해봅시다.");
	};

	window.ws.onmessage = function(e) {
		
		var reader = new FileReader();
		reader.onload = function() {

			try
			{
				var d = JSON.parse( reader.result ) 
				//console.log( d.type + " - " + d.nm )
				window.socketData[ d.nm ] = JSON.parse( d.d )
				console.log( d.func );
				var p = null;
				if( d.p !== null || !d.p ) p = d.p
				window.COMPONENT[ d.func ]( p )	
			}
			catch( er )
			{
				debugger;
			}
			
		}
		reader.readAsText(e.data);

	};

	window.ws.onclose = function(event){
		if (event.wasClean) {
			console.log(`[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`);
		} else {
			// 예시: 프로세스가 죽거나 네트워크에 장애가 있는 경우
			// event.code가 1006이 됩니다.
			console.log('[close] 커넥션이 죽었습니다.');
			console.log('--커낵션을다시 연결합니다.');
			setTimeout(function(){ window.ws = new WebSocket("ws://112.144.208.118:8888/index.html"); },5000)
		}
	};

	window.ws.onerror = function(error) { console.log(`[error] ${error.message}`); };
}