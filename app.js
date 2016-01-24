// Setup basic express server
var express = require('express');
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var app = express();
var rp = require('request-promise')

var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

var scenify = require('./lib/scenify')
console.log(scenify)

app.post('/api/coord', function(req, res) {
    console.log(req.body)
    var result = scenify.process(req.body, function(err, _res) {
        res.send(_res);
    })
});




app.post('/api/ratings', function(req, res) {
    console.log(req.body)
    var urls = req.body.urls
    res.send(urls);
});

app.listen(port, function () {
  console.log('Server listening at port %d', port);
});

