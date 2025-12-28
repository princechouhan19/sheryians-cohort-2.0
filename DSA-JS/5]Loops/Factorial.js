// Q 22. Factorial of a number.

let prompt = require("prompt-sync")();
let n = Number(prompt("Enter a number : "));
mul = 1;

for (let i=1 ; i<=n ; i++) {
    mul = mul * i ;
}
console.log("Factorial of " + n + " = " + mul);