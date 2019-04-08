require("dotenv").config();

var axios = require("axios");

var fs = require("fs");

var keys = require("./keys.js");

var spotify = require("node-spotify-api");

var moment = require("moment");

var args = process.argv;

var command = args[2];

var userInput = args.splice(3).join(" ");

//to get data from Bands In Town

if (command === "concert-this") {
    var bandsInTownUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    console.log(bandsInTownUrl);
    axios.get(bandsInTownUrl).then(function(err,response) {
        console.log(response);
        if (!err) {
            var performances = JSON.parse(response);
            for (var i = 0; i < performances.length; i++) {
                console.log("Name of the venue: " + performances[i].venue.name);
                console.log("Location: " + performances[i].venue.city);
                var date = moment().format(concert[i].datetime);
                console.log("Date of the concert: " + date); 
        }
    }
        else {
            console.log("There has been an error!")
        }
        }
    
)
}

else if (command === "spotify-this-song") {
    var spotifyUrl = "https://api.spotify.com/v1/search?q=" + userInput + "&type=track&market=US&limit=1";
    spotifySearch.get(spotifyUrl).then(function(err, response) {
        if (err) {
            console.log("There has been an error!");
        }
        else {
            var spotify = new Spotify(keys.spotify);
            if (!userInput) {
                var userInput = "The Sign";
            };
            spotify.search({
                    type: 'track',
                    query: searchObject
                }, function (err, data) {
                    var songInfo = data.tracks.items[0].album;
                    if (err) {
                        console.log("An error occured!");
                    }
                    else {
                        console.log("Song Title: " + userInput);
                        console.log("Album Title: " + songInfo.name);
                        console.log("Artists: " + songInfo.artists.name);
                        console.log("Hear a snippet: " + songInfo.external_urls.spotify);
                    }
                })
            
        }
    })
}
else if (command === "movie-this") {
    var omdbUrl = "http://www.omdbapi.com/?t=" + userInput;
    axios.get(omdbUrl, function(err, response, body) {
        if (err) {
            console.log("There has been an error!")
        }
        else if (!userInput) {
            userInput = "Mr. Nobody";
        }
        var response = JSON.parse(body);
        console.log("Title: " + response.Title);
        console.log("Release Year: " + response.Year);
        console.log("IMDb Rating: " + response.imdbRating);
        console.log("Rotten Tomatoes Score: " + response.Ratngs[1].Value);
        console.log("Country: " + response.Country);
        console.log("Language: " + response.Language);
        console.log("Plot: " + response.Plot);
        console.log("Actors: " + response.Actors);
    })
}
else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(err, data) {
        console.log(userInput)
        spotify.search({
            type: 'track',
            query: userInput
        }, function (err, data) {
            var songInfo = data.tracks.items[0].album;
            if (err) {
                console.log("An error occured!");
            }
            else {
                console.log("Song Title: " + searchObject);
                console.log("Album Title: " + songInfo.name);
                console.log("Artists: " + songInfo.artists.name);
                console.log("Hear a snippet: " + songInfo.external_urls.spotify);
            }
        })
    })
}

