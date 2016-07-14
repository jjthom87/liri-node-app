var command = process.argv[2];

function twitter () {

		var twitterGet = require('./keys.js').twitterKeys;
		var Twitter = require('twitter');
		var client = new Twitter(twitterGet); 
		var params = {screen_name: 'jcjt929'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
				var twitterObject = JSON.stringify(tweets);
				var twitterParse = JSON.parse(twitterObject)
			} else {
				console.log('error');
			}
			for (var i = 0; i < twitterParse.length; i++) {
				console.log(" ");
				console.log("I Posted " + twitterParse[i].text + " on " + twitterParse[i].created_at);
				console.log(" ");
				logResults("I Posted " + twitterParse[i].text + " on " + twitterParse[i].created_at);
			}
	})
};

function spotify() {

	var spotifyRequest = require('spotify');
	var spotifyLookup = process.argv.slice(3).join('+');

	spotifyRequest.search({ type: 'track', query: spotifyLookup }, function(err, data) {
		if(err) {
			console.log('Error occurred: ' + err)
			return;
		}

		var spotifyStringify = JSON.stringify(data);
		var spotifyParse = JSON.parse(spotifyStringify);
		var spotifyObject = spotifyParse.tracks;
		var spotifyStringify2 = JSON.stringify(spotifyObject.items);
		var spotifyParse2 = JSON.parse(spotifyStringify2);
		// console.log(spotifyParse2);

		function titleCase(str) {
		    var splitStr = str.toLowerCase().split('+');
		    for (var i = 0; i < splitStr.length; i++){
		        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		    }
		    return splitStr.join('+');
		}

		var spotifyTitle = titleCase(spotifyLookup)

			if (spotifyObject.total === 0) {

				var aceOfBase = 'ace+of+base';
				// var replace = spotifyLookup.replace(spotifyLookup, "the sign");	
				spotifyRequest.search({ type: 'track', query: aceOfBase}, function(err, data) {
					var stringifyArist = JSON.stringify(data.tracks.items);
					var parseArtist = JSON.parse(stringifyArist);

					console.log(" ");
					console.log("Artist: " + parseArtist[1].artists[0].name);
					console.log("Song Name: " + parseArtist[1].name);
					console.log("Link to Song: " + parseArtist[1].href);
					console.log("Album: " + parseArtist[1].album.name);
					
					logResults("Artist: " + parseArtist[1].artists[0].name);
					logResults("Song Name: " + parseArtist[1].name);
					logResults("Link to Song: " + parseArtist[1].href);
					logResults("Album: " + parseArtist[1].album.name);
					})

					} else {
					console.log(" ")
					console.log("Artist: " + spotifyParse2[0].artists[0].name);
					console.log("Song Name: " + spotifyTitle.replace(/["+"]/g, " "));
					console.log("Link to Song: " + spotifyParse2[0].album.href)
					console.log("Album: " + spotifyParse2[0].album.name)
					console.log(" ");
					console.log("Artist: " + spotifyParse2[1].artists[0].name);
					console.log("Song Name: " + spotifyTitle.replace(/["+"]/g, " "));
					console.log("Link to Song: " + spotifyParse2[1].album.href)
					console.log("Album: " + spotifyParse2[1].album.name)
					console.log(" ");
					console.log("Artist: " + spotifyParse2[2].artists[0].name);
					console.log("Song Name: " + spotifyTitle.replace(/["+"]/g, " "));
					console.log("Link to Song: " + spotifyParse2[2].album.href)
					console.log("Album: " + spotifyParse2[2].album.name)

					logResults("Artist: " + spotifyParse2[0].artists[0].name);
					logResults("Song Name: " + spotifyTitle.replace(/["+"]/g, " "));
					logResults("Link to Song: " + spotifyParse2[0].album.href);
					logResults("Album: " + spotifyParse2[0].album.name);

					logResults("Artist: " + spotifyParse2[1].artists[0].name);
					logResults("Song Name: " + spotifyTitle.replace(/["+"]/g, " "));
					logResults("Link to Song: " + spotifyParse2[1].album.href);
					logResults("Album: " + spotifyParse2[1].album.name);

					logResults("Artist: " + spotifyParse2[2].artists[0].name);
					logResults("Song Name: " + spotifyTitle.replace(/["+"]/g, " "));
					logResults("Link to Song: " + spotifyParse2[2].album.href);
					logResults("Album: " + spotifyParse2[2].album.name);
				}
	});
}

function omdb() {
	var request = require('request');
	var movieTitle = process.argv.slice(3).join('+');

	request('http://www.omdbapi.com/?r=json&t=' + movieTitle, function(error, response, body) {
		if (!error && response.statusCode === 200) {

			if (!movieTitle) {
				process.argv.push("mr nobody");
				omdb();
			} else {
			var movieObject = JSON.parse(body);
			console.log(" ");
			console.log("Movie Title: " + movieObject.Title);
			console.log("Release Date: " + movieObject.Released);
			console.log("IMDB Rating: " + movieObject.imdbRating);
			console.log("Country: " + movieObject.Country);
			console.log("Language: " + movieObject.Language);
			console.log("Plot: " + movieObject.Plot);
			console.log("Actors: " + movieObject.Actors);

			logResults("Movie Title: " + movieObject.Title)
			logResults("Release Date: " + movieObject.Released);
			logResults("IMDB Rating: " + movieObject.imdbRating);
			logResults("Country: " + movieObject.Country);
			logResults("Language: " + movieObject.Language);
			logResults("Plot: " + movieObject.Plot);
			logResults("Actors: " + movieObject.Actors);
			}
		}
	})
	
}

function random() {
	var fs = require('fs');

	fs.readFile('random.txt', "utf8", function(err, data){
		if (err) {
			return console.log("Error is: " + err)
		}
		var randomArray = data.split(",");
		var spotifyText = randomArray[0];
		var object = randomArray[1];
		// var replace = command.replace(command, spotify)

		if (command === "do-what-it-says") {
			process.argv.splice(2,2);
			process.argv.push(spotifyText);
			process.argv.push(object);
			spotify();
		}
	})
};

function pretty(obj){
		var fs = require('fs');
		var readData = fs.readFile('./log.txt');
		var parseData =  JSON.parse(readData); 
		parseData.push(obj);
		var configJson = JSON.stringify(parseData);
		fs.writeFile('./log.txt', configJson)
}

function logResults(commandData){
	var fs = require('fs');
	var stringifyData =  JSON.stringify(commandData, null, 3); 

	// var commaData = stringifyData.slice().join(", ")
	// var array = []
	// var arrayPush = array.push(commaData)
	// var stringConvert = arrayPush.toString();

	fs.appendFile('log.txt', stringifyData + " " , function(err,data){	
		if (err) {
			console.log("Error is: " + err);
		}
	})
}

if (command === "my-tweets") {
	twitter();
} else if (command === "spotify-this-song") {
	spotify();
} else if (command === "movie-this") {
	omdb();
} else if (command === "do-what-it-says") {
	random();
}