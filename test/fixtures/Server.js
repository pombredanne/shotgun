'use strict';

var express = require('express');
var app = express();

console.log('Fixture server started at: ' + new Date().toUTCString());

app
  .use(express.static(__dirname + '/public'))
  .listen(4000);

app.get('/', function (req, res) {
  res.send(200, 'Hello! I am the Shotgun fixture server');
});

module.exports = app;
