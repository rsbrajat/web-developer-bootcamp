var faker = require("faker");

var productName = faker.commerce.productName();
var producPrice = faker.commerce.price();

console.log("==================");
console.log("Welcome to my shop");
console.log("==================");

for(var i = 0; i < 10; i++){
    console.log(faker.commerce.productName() + " - $" + faker.commerce.price());   
}