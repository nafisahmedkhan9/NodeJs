var express = require('express');
var request = require("request");
var app = express();
var PORT = process.env.PORT || 3000;
//var inputid = parseInt(req.params.id) ;
app.get('/abcd', function(req, res) {
	var queryParams = req.query;
	console.log("queryParams : " + JSON.stringify(queryParams));
	var longUrl = encodeURI(queryParams.longUrl);
	console.log("longUrl : " + longUrl);

	bitlyurl(longUrl, function(cb) {
		console.log("Bitlyurl URL inside callback function : " + cb);
		res.send(cb);
		console.log("End.....");
	});
});

function bitlyurl(URL, callback) {
	var options = {
		url: 'https://api-ssl.bitly.com/v3/shorten',
		qs: {
			longUrl: URL,
			access_token: 'ea23cf151e923390bc763648089f8ddaf0faaec1'
		}
	};
	request(options, function(error, response, body) {
		if (error) {
			callback(error)
		} else {
			var resp = JSON.parse(body);
			if (resp.data.length >= 0) {
				console.log("URL mistake : " + resp.status_txt);
				callback(resp.status_txt);
			} else {
				console.log("Bitlyurl URL inside function : " + resp.data.url);
				callback(resp.data.url);
			}

		}
	});
}
app.listen(PORT, function() {
	console.log("Express Server Is Started " + PORT + " !.")
});