// Q 16. Bijli Bill - Description on Graphic 
// Unit           | Discount
// up to 100      | Rs 4.2 /unit
// 101 - 200      | Rs 6 /unit
// 201 - 400      | Rs 8 /unit
// >400           | Rs 13 /unit

let prompt = require("prompt-sync")();

let unit = Number(prompt("Enter Your Unit : "));
let bill = 0;

if (unit<=100) {
    bill = unit * 4.2;
}
else if (unit>100 && unit<=200) {
    bill = (100 * 4.2) + ((unit - 100) * 6)
}
else if (unit>200 && unit<=400) {
    bill = (100 * 4.2) + (100 * 6) + ((unit - 200) * 8);
}
else if (unit>400) {
    bill = (100 * 4.2) + (100 * 6) + (200*8) + ((unit - 400) * 13); 
}

console.log("Your Electricity Bill is = ₹" + bill);