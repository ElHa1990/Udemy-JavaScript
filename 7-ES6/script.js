/******************************
Lecture: coding challenge
******************************/

// parks
class townElements {
    constructor (name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
        this.age = this.calcAge();
    };
    // calculate how old the townElement is
    calcAge () {
        var age = new Date().getFullYear() - this.buildYear;
        return age;
    };
};

console.log('Report parks:');

class parks extends townElements {
    constructor(name, buildYear, numberOfTrees, parkArea) {
        super(name, buildYear);
        this.numberOfTrees = numberOfTrees;
        this.parkArea = parkArea;   // km2 
        this.treeDensity = this.calcTreeDensity();    
    };  
    
    // calculate the tree density --> number of trees / area
    calcTreeDensity () {
        return this.numberOfTrees / this.parkArea;
    };

    logDisplay () {
        var numberOfTreesDisplay = ".";
        if (this.numberOfTrees >= 50000) {
            numberOfTreesDisplay = " and the number of trees exceeds 50.000 trees."
        };
        console.log(`The ${this.name} is ${this.age} years old. The tree density of the ${this.name} is ${Math.round(this.treeDensity)} trees per km2${numberOfTreesDisplay}`);
    };
};

const nationaalPark = new parks('Nationaal Park', 1901, 150000, 5);
const veluwsBos = new parks('Veluws Bos', 1850, 100000, 6);
const katzand = new parks('Katzand', 1980, 10000, 10);
let allParks = [nationaalPark, veluwsBos, katzand];

// calc mean age of all parks
var totalAge = 0;
var meanAge = 0;
function calcAverageAge (allParks) {  
    for (i = 0; i < allParks.length; i++) {
        totalAge += allParks[i].age;
        meanAge = totalAge / allParks.length;    
        
        allParks[i].logDisplay();
    };
};

calcAverageAge(allParks); 
console.log(`The average age of all the parks is ${Math.round(meanAge)} years.`);

// Streets
console.log('Streets report:');

class streets extends townElements {
    constructor(name, buildYear, lengthRoad) {
        super(name, buildYear);
        this.lengthRoad = lengthRoad;
        this.streetType;
    };
    
    logDisplay () {
        console.log(`The ${this.name} is ${this.age} years old. And ${this.streetType}.`)
    }
};

const Kerkstraat = new streets('Kerkstraat', 1900, 1.0);
const Bosweg = new streets('Bosweg', 1950, 0.5);
const Dorpstraat = new streets('Dorpstraat', 1930, 0.6);
const Randweg = new streets('Randweg', 1990, 15);

// calc average length of all roads + size classification
let allStreets = [Kerkstraat, Bosweg, Dorpstraat, Randweg];
var totalLength = 0;
var averageLength = 0;

function calcAverageLength (allStreets) {
    for(i = 0; i < allStreets.length; i++) {
        totalLength += allStreets[i].lengthRoad;
        averageLength = totalLength / allStreets.length

        if (allStreets[i].lengthRoad <= 0.3) {
            allStreets[i].streetType = "has a tiny street length"
        } else if (allStreets[i].lengthRoadd <= 0.5) {
            allStreets[i].streetType = "has a small street length"
        } else if (allStreets[i].lengthRoad <= 1.0) {
            allStreets[i].streetType = "has a normal street length"
        } else if (allStreets[i].lengthRoad <= 5) {            
            allStreets[i].streetType = "has a big street length"
        } else if (allStreets[i].lengthRoad > 5) {            
            allStreets[i].streetType = "has a huge street length"
        } else {            
            allStreets[i].streetType = "has a normal street length"
        };

        allStreets[i].logDisplay();
    };
};

calcAverageLength(allStreets);      
console.log(`The total length of the roads is ${totalLength} km. The average length is ${averageLength} km.`)

// Size classification
/* size classification roads
 tiny <= 0.3km
 small <= 0.5km
 normal <= 1.0km
 big <= 5km
 huge > 5km
*/





























































