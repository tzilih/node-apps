var profile = require('./profile');

var topic = process.argv[2]
var users = process.argv.slice(3);

users.forEach(function (username) {
	profile.get(username, topic)
});

