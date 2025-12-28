// Q 20. Take a number as input and print its table
// 5*1=5
// 5*2=10...up to 10 terms 

let prompt = require("prompt-sync")();
let n = Number(prompt("Enter a number : "));

for (let i=1 ; i<=10 ; i++){
    console.log(n + " * " + i + " = " + n*i);
}