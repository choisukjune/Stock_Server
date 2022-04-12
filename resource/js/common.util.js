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

window.COMPONENT.stockSearch = function(){

	var idNm = "search";
	var _target_el = window.document.getElementById( idNm + "_warp" );

	var html = `
		<div>
			<div class="ui fluid icon input">
				<input type="text" placeholder="Search a very wide input..." id="${idNm}">
				<i class="search icon"></i>
			</div>
			<div class="ui list" id="${idNm}_result" style="position: absolute;z-index: 100;background-color: #fff;border:1px solid #ccc;width:491px;padding:10px;display:none;"></div>
		</div>
	`

	var new_el = window.UTIL.Html.htmlToElement( html );
	_target_el.appendChild( new_el );
	var eventUlr = 'candle.html?cd=';
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
