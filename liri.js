require("dotenv").config();

var fs = require("fs");

var keys = require("./keys.js");

var spotify = require("node-spotify-api");

var spotifySearch = new Spotify(keys.spotify);

var bandsInTown = require("bandsintown")(codingbootcamp);

var moment = require("moment");

var args = process.argv;

var command = args[2];

var searchObject = "";

for (var i = 2; i < args.length; i++) {
    if (i > 2 && i < args.length) {
        searchObject = searchObject + "+" + args[i];
    } else {
        searchObject += args[i];
    }
};

var bandsInTownUrl = "https://rest.bandsintown.com/artists/" + searchObject + "/events?app_id=codingbootcamp";

var spotifyUrl = "https://api.spotify.com/v1/search?q=" + searchObject + "&type=track&market=US&limit=1";

var omdbUrl = "http://www.omdbapi.com/?t=" + searchObject;

//to get data from Bands In Town

if (command === "concert-this") {
    bandsInTown.get(bandsInTownUrl, function(err, response) {
        if (err) {
            console.log("There has been a giant error!");
        }
        else {
            var performances = JSON.parse(response);
            for (var i = 0; i < performances.length; i++) {
                console.log("Name of the venue: " + performances[i].venue.name);
                console.log("Location: " + performances[i].venue.city);
                var date = moment().format(concert[i].datetime);
                console.log("Date of the concert: " + date);
            }
        }
    })
}

else if (command === "spotify-this-song") {
    spotify.get(spotifyUrl, function(err, response) {
        if (err) {
            console.log("There has been an error!");
        }
        else {
            var spotify = new Spotify(dataKeys.spotify);
            if (!searchObject) {
                var searchObject = "The Sign";
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
                        console.log("Song Title: " + searchObject);
                        console.log("Album Title: " + songInfo.name);
                        console.log("Artists: " + songInfo.artists.name);
                        console.log("Hear a snippet: " + songInfo.external_urls.spotify);
                    }
                })
            
        }
    })
}
else if (command === "movie-this") {
    axios.get(omdbUrl, function(err, response, body) {
        if (err) {
            console.log("There has been an error!")
        }
        else if (!searchObject) {
            searchObject = "Mr. Nobody";
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
        console.log(searchObject)
        spotify.search({
            type: 'track',
            query: searchObject
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

