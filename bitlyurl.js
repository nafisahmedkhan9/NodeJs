var request = require("request");
var URL = encodeURI('https://.google.co.in/');
console.log(URL);
var options = {
  url: 'https://api-ssl.bitly.com/v3/shorten',
  qs: {
    longUrl: URL,
    access_token: 'ea23cf151e923390bc763648089f8ddaf0faaec1'
  },
};

request(options, function(error, response, body) {
  if (error) {
    return console.log("error : " + error);
  } else {
    var resp = JSON.parse(body);
    if (resp.data.length > 0) {
      console.log("Result : " + resp.data.url);
    } else {
      console.log("Error Result : " + resp.status_txt);
    }
  }
});