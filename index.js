const data = require('./property_listings.json');
var args = process.argv.slice(2);

// if (args.length) {
//     console.log("Please provide stateAbbrviation and minBaths as command line arguments.")
// }

const stateAbbreviation = args[0];
const minBaths = args[1];

let filteredHouses = data.filter((house) => {
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

console.log(formattedHouses);

const calcAvgPrice = () => {
    let totalPrice = filteredHouses.map((house) => {
        return Math.trunc(house.price * 100);
    }).reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    return Math.round(totalPrice / filteredHouses.length) / 100;
}

let avgPrice = calcAvgPrice();

console.log(`Average Price: $${avgPrice}`)

const calcAvgPricePerSqft = () => {
    let pricesPerSqft = filteredHouses.map((house) => {
        if (!house.price || !house.squareFeet) return null;
        return Math.trunc(house.price * 100) / house.squareFeet;       
    }).reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    return Math.round(pricesPerSqft / filteredHouses.length) / 100;
}


let avgPricePerSqft = calcAvgPricePerSqft();

console.log(`Average Price per sqft: $${avgPricePerSqft}`);