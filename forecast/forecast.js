var https = require('https');


//print out forecast for specified zipcode
function printForecast (temp) {
	console.log("It is currently " + temp + " degrees")
};

//use Google API to geocode a zipcode

var key = 'AIzaSyC81a4qmwXy7Tu7coPPdWUGfJliKpRSbNU'
var address = process.argv[2];
getGeocode(address);
function getGeocode (address) {
	var request = https.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + key, function (results) {
		var body = '';
		results.on('data', function (chunk) {
			body += chunk;
		});
		results.on('end', function () {
			var parsedAddy = JSON.parse(body);
			var latitude = parsedAddy.results[0].geometry.location.lat;
			var longitude = parsedAddy.results[0].geometry.location.lng;
			getForecast(latitude, longitude, key);
		});
	}); 
};


var key = "5eadb50d1f78c301cf8831741c252d78";

function getForecast (latitude, longitude, key) {
	//connect to the forecast API
	var request = https.get('https://api.forecast.io/forecast/' + key + '/' + latitude + ',' + longitude, function (response) {
		//read the forecast
		var body = '';
		response.on('data', function (chunk) {
			body += chunk;
		});
		response.on('end', function () {
			//parse the forecast 
			var parsedForecast = JSON.parse(body) 

			//extract the needed property, in this case, today's forecast
			var currentTemp = parsedForecast.currently.temperature;

			//call the printForecast method with the current temp
			printForecast(currentTemp);
		});
	});
};

module.exports.weather = getGeocode;
