// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
const resolve = require('path').resolve;

//

var app = express();
app.use(express.static(__dirname + '/public/admin'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('IM parse server running...');
});


app.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/admin/testdashboard.html'));  
});

app.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/admin/testlogin.html'));
});


var port = 8088;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('server running on port ' + port + '.');
});

