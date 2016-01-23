// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/test', function(req, res) {
  res.send('hello world');
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

