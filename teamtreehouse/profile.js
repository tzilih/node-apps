var https = require('https');
var http = require('http');

//print out message
function printMessage(username, badgeCount, points, topic) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in " + topic;
  console.log(message);
}

//print out error messages
function printError (error) {
	console.error(error);
}

function get(username, topic) {
	//Connect to the API URL
	var request = https.get('https://teamtreehouse.com/' + username + '.json', function (response) {
		var body = "";
		//Read the data
		response.on('data', function (chunk) { 
			body += chunk;
		})
		response.on('end', function () {
			if (response.statusCode === 200) {
				try {
					//Parse the data
					var profile = JSON.parse(body);
					//print the data
					var topicPoints = profile.points[topic];
					printMessage(username, profile.badges.length, profile.points[topic], topic);
				} catch (error) {
					//parse error
					printError (error);
				}
				} else {
					//status code error
					printError({message : "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
				} 
			}); 
		});
		//connection error
		request.on('error', printError); 
}



module.exports.get = get;