// Q 15. Shop discount - Description on Graphic ESL
// Amount      | Discount
// 0-5000      | 0%
// 5001- 7000- | 5%
// 7001-9000   | 10%
// >9000       | 20% 

let prompt = require("prompt-sync")();

let p1 = Number(prompt("Enter Amount Of Product 1 : "));
let p2 = Number(prompt("Enter Amount Of Product 2 : "));
let p3 = Number(prompt("Enter Amount Of Product 3 : "));
let p4 = Number(prompt("Enter Amount Of Product 4 : "));

let Total = p1 + p2 + p3 + p4 ;
console.log("Total = " + Total);

let dis =0;

if (Total<=0 && Total<=5000)  dis =0;
else if (Total>5000 && Total<=7000)  dis = 5;
else if (Total>7000 && Total<=9000)  dis = 10;
else if (Total>9000)  dis = 20;

console.log("Total after 20% Discount = " + (Total - (dis * Total)/100));