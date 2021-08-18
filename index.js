const data = require('./property_listings.json');
var args = process.argv.slice(2);

const VALID_STATES = {
    'CA': true,
    'FL': true,
    'NY': true,
}

if (!VALID_STATES[args[0]]) {
    console.log("Please enter a valid state as your first argument.");
    process.exitCode = 1;
}

if (isNaN(Number(args[1])) || Number(args[1]) < 0) {
    console.log("Please enter an integer >=0 as your second argument.");
    process.exitCode = 1;
}

if (process.exitCode) process.exit();

const stateAbbreviation = args[0];
const minBaths = args[1];

let filteredHouses = data.filter((house) => {
    if (!house.price || !house.squareFeet) return false;
    return stateAbbreviation === house.administrativeAreaLevel1 && minBaths <= house.baths;
}).sort(( a, b ) => {
    return a.squareFeet - b.squareFeet;
});

let formattedHouses = filteredHouses.map((house) => {
    return {
        id: house.id,
        addressLine1: house.street,
        addressLine2: `${house.locality}, ${house.administrativeAreaLevel1} ${house.postalCode}`,
        price: house.price,
        squareFeet: house.squareFeet,
        beds: house.beds,
        baths: house.baths,
    }
})

console.log(JSON.stringify(formattedHouses, null, 2));

const calcAvgPrice = (price) => {
    return Math.round(price / filteredHouses.length) / 100;
}

let totalPrice = filteredHouses.map((house) => {
    return Math.trunc(house.price * 100);
}).reduce((acc, curr) => {
    return acc + curr;
}, 0);

let avgPrice = calcAvgPrice(totalPrice);

console.log(`Average Price: $${avgPrice}`)

let totalPricePerSqft = filteredHouses.map((house) => {
    return Math.trunc(house.price * 100) / house.squareFeet;       
}).reduce((acc, curr) => {
    return acc + curr;
}, 0);

let avgPricePerSqft = calcAvgPrice(totalPricePerSqft);

console.log(`Average Price per sqft: $${avgPricePerSqft}`);