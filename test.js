var https = require( "https" );

https.get( 'https://m.stock.naver.com/api/stocks/industry?page=1&pageSize=50', function(response){
	response.setEncoding('utf8');
	var d=""
	response.on('end', function () {
		console.log(d)
	});

	response.on('data', function (body) {
		d += body;
	});
});