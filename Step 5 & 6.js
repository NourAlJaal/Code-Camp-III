//STEP 5

const fs = require("fs");
const regression = require("regression");
const combinedDataFile = fs.readFileSync("combinedData.json", 'utf-8');
let parsedData = JSON.parse(combinedDataFile);

//Get the data we need in the regression: the bechdelscore (x-axis data) and the imdb-ratings (y-axis data). Put into an array.
let regressionData = parsedData.map(function (element) {
    return [element.bechdelScore, parseFloat(element.imdbRating)]
});

//Filter out NaN, or else the whole array of imdb-ratings will return NaN.
let cleanRegressionData = regressionData.filter(function (element) {
    return !element.includes(NaN)
});

//Put the data into a linear regression.
const result = regression.linear(cleanRegressionData);

//STEP 6

console.log(result);
//y = -0.19x + 6.87

//The ratings (y) depend on the bechdel-score (x).
//There is a negative correlation between the movie passing the bechdel-test and lower ratings.










