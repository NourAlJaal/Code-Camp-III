//STEP 1

//Installing the Papaparse package and requiring the files etc.
const fs = require('fs');
const Papa = require('papaparse');
const fetch = require('node-fetch');
const rawData = fs.readFileSync('bechdel-test.csv', 'utf-8');
const parsedData = Papa.parse(rawData);

//STEP 2

//Determine whether the movie passes or fails the test using forEach, and add it to the data structure using push.
parsedData.data.forEach(function(element) {
    if (element[8] === "0" && element[9] === "0" && element[10] === "0" && element[11] === "0") {
        element.push(1) //Passes
    } else {
        element.push(0) //Fails
    }
});
parsedData.data[0][12] = "bechdel-test"; //Add it to the list of categories.

//STEP 3

//Filter out the titles with unexpected characters (# and &).
//Added into the variable cleanTitles.
let cleanTitles = parsedData.data.filter(function (element) {
    return !element[1].includes("#" && "&") //We know that all the titles contain one of these two.
});
//1679 movies are left.

//STEP 4

//The query string that retrieves the information: uses the title parameter (t=), the titles from cleanTitles (found at index 1), and my API key.
let urls = [];
cleanTitles.forEach(function (element) {
    urls.push("https://www.omdbapi.com/?t=" + element[1].split(" ").join("+") + "&apikey=ff697aa6") //Split and join for the titles that contain more than one word.
});

let combinedData = [];
urls.forEach(function (url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cleanTitles.forEach(function (element) { //forEach to access all elements/information in the csv-file that are in the cleanTitles variable.
                if (data.Title === element[1]) {  //Get the data for the titles that match each other (those in the csv-file/cleanTitles and those in OMDB).
                    data.bechdelScore = element[12]; //Add the bechdel-score to the data.
                    combinedData.push(data) //Push it to an empty array.
                    console.log(combinedData)
                    fs.writeFileSync('combinedData.json', JSON.stringify(combinedData));
                }
            })
        })
});



























