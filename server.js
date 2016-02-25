//server.js

var port = "2000";
var host = "0.0.0.0";
var express = require('express');

var app = express();

app.use(require('./app')); //for this app, use the rules in the index.js file in app dir

app.listen(port, host);

console.log('Yay! The server started.');