require("dotenv").config();

var axios = require("axios");

var fs = require("fs");

var keys = require("./keys.js");

var spotify = require("node-spotify-api");

var spotifyKeys = new spotify (keys.spotify);

var moment = require("moment");

var args = process.argv;

var command = args[2];

var userInput = args.splice(3).join(" ");

//to get data from Bands In Town

if (command === "concert-this") {
    var bandsInTownUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    console.log(bandsInTownUrl);
    axios.get(bandsInTownUrl).then(function(response, err) {
        if (!err) {
            var performances = response.data;
            for (var i = 0; i < performances.length; i++) {
                console.log("\nName of the venue: " + performances[i].venue.name);
                console.log("Location: " + performances[i].venue.city);
                var date = moment(performances[i].datetime).format("MM/DD/YY");
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
    if (!userInput) {
        var userInput = "The Sign Ace of Base";
    }
    spotifyKeys.search({
        type: "track",
        query: userInput,
    }).then(function(response, err) {
        if (!err) {
        var songInfo = response.tracks.items[0];
        
        console.log("Song Title: " +  songInfo.name),
        console.log("Album Title: " + songInfo.album.name),
        console.log("Artists: " + songInfo.artists[0].name),
        console.log("Hear a snippet: " + songInfo.external_urls.spotify);
        }
        else if (err) {
            console.log("There has been an error!");
        }
        

    }
    
)
}
    
else if (command === "movie-this") {
    if (!userInput) {
        userInput = "Mr. Nobody";
    };
    var omdbUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    
    axios.get(omdbUrl).then(function(response, err) {
        var response = response.data;
        console.log("\nTitle: " + response.Title);
        console.log("Release Year: " + response.Year);
        console.log("IMDb Rating: " + response.imdbRating);
        console.log("Rotten Tomatoes Score: " + response.Ratings[1].Value);
        console.log("Country: " + response.Country);
        console.log("Language: " + response.Language);
        console.log("Plot: " + response.Plot);
        console.log("Actors: " + response.Actors);

        if (err) {
            console.log("There has been an error!")
        }
    })
}
else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err)
        }
        else {
        var dataArray = data.split(",");
        userInput = dataArray[1];
        spotifyKeys.search({
            type: "track",
            query: userInput,
        }).then(function(response, err) {
            if (!err) {
            var songInfo = response.tracks.items[0];
            
            console.log("Song Title: " +  songInfo.name),
            console.log("Album Title: " + songInfo.album.name),
            console.log("Artists: " + songInfo.artists[0].name),
            console.log("Hear a snippet: " + songInfo.external_urls.spotify);
            }
            else if (err) {
                console.log("There has been an error!");
            }
            
    
        })
    }
    })
}

