// Q28. Reverse of number 

let prompt = require('prompt-sync')();
let n = Number(prompt("Enter a Number : "));

while (n>0) {
    let rem = n%10;
    process.stdout.write(String(rem + " "));
    n =Math.floor(n/10);
}