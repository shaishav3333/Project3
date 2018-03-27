var express = require('express'),
    app = express(),
    request = require("request");

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/getWikiJson', function(req, res, next) {
    request({
        uri: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Albert%20Einstein&utf8=&format=json",
        method: "GET",
        timeout: 2000,
        followRedirect: true,
        maxRedirects: 10
    }, function(error, response, body) {
        res.send(body);
    });
});

/**
 *  setting port
 */
app.use('/', express.static(__dirname + '/public'));
app.listen(3000);
console.log('listening port 3000');
