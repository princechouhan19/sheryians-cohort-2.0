let prompt = require('prompt-sync')();
let n = Number(prompt("Enter a Number : "))
let sum = 0;
while (n>0) {
    let rem = n%10
    console.log(rem);
    n=Math.floor(n/10);
}