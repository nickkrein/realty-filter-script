const data = require('./property_listings.json');
var args = process.argv.slice(2);

console.log(args)

// if (args.length) {
//     console.log("Please provide stateAbbrviation and minBaths as command line arguments.")
// }

const stateAbbreviation = args[0];
const minBaths = args[1];

let filteredHouses = data.filter(filterHouses).sort(sortBySquareFootage)

const filterHouses = (house) => {
    return stateAbbreviation === house.administrativeAreaLevel1 && minBaths <= house.baths;
};

const sortBySquareFootage = ( a, b ) => {
    return a.squareFeet - b.squareFeet;
};

console.log(filteredHouses);

// console.log(data);