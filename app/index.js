//index.js

var express = require('express');
var app = express();
var motivations = require('motivations'); //points to whatever module.exports is = to, in this case an array
var pickOne = require('pick-one');
var exphbs = require('express-handlebars');

app.use(express.static('./app/public'));

app.engine('handlebars', exphbs({
  defaultLayout: 'main', 
  layoutsDir:'./app/views/layouts'
}));

app.set('views', './app/views');
app.set('view engine', 'handlebars');

app.get('/', function(request, response) {
	var motivation = pickOne(motivations);
	var filePrefix = [1,2,3,4,5,6];
	var cat = pickOne(filePrefix);
	response.render("motivation", {motivation: motivation, image: cat});
	
});

app.get('/dogs', function(request, response) {
	response.send('I love dogs');
})
module.exports = app;