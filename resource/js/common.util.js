window.UTIL = {}

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
window.UTIL.Html.htmlToElement = function( html ){
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

window.COMPONENT = {};
window.COMPONENT.gnb = function(){
	
	var today = window.UTIL.Date.getTimeTo__YYYYMMDD()
	var yesterday = window.UTIL.Date.getTimeTo__YYYYMMDD_berfore_day( null, 1 );

	var _target_el = window.document.getElementById( "gnb" );

	var html = `
		<div>
		<span id="menu_00" style="cursor:pointer;">실시간대량거래</span> | 
		<span id="menu_01" style="cursor:pointer;">기관거래원별</span> | 
		<span id="menu_02" style="cursor:pointer;">외국계거래원별</span> | 
		<span id="menu_03" style="cursor:pointer;">외국계증권사매매동향</span> | 
		<span id="menu_04" style="cursor:pointer;">wics업종별현황</span> |
		<span id="menu_05" style="cursor:pointer;">관심종목</span>
		</div>
	`
	var new_el = window.UTIL.Html.htmlToElement( html );
	_target_el.appendChild( new_el );

	var urls = {
		menu_00 : `/html/실시간대량거래.html`,
		menu_01 : `/html/기관거래원별.html?date=${today}`,
		menu_02 : `/html/외국계거래원별.html?date=${today}`,
		menu_03 : `/html/외국계증권사매매동향.html?date=${today}`,
		menu_04 : `/html/wics업종별현황.html?date=${today}`,
		menu_05 : `/html/관심종목.html?date=${yesterday}`,
		candle : `/html/candle.html?cd=`
	};

	window.document.getElementById( "menu_00 ").addEventListener('click',function(e){ window.UTIL.Link.a(urls.menu_00,"_blank"); });
	window.document.getElementById( "menu_01 ").addEventListener('click',function(e){ window.UTIL.Link.a(urls.menu_01,"_blank"); });
	window.document.getElementById( "menu_02 ").addEventListener('click',function(e){ window.UTIL.Link.a(urls.menu_02,"_blank"); });
	window.document.getElementById( "menu_03 ").addEventListener('click',function(e){ window.UTIL.Link.a(urls.menu_03,"_blank"); });
	window.document.getElementById( "menu_04 ").addEventListener('click',function(e){ window.UTIL.Link.a(urls.menu_04,"_blank"); });
	window.document.getElementById( "menu_05 ").addEventListener('click',function(e){ window.UTIL.Link.a(urls.menu_05,"_blank"); });
	
	return;
};