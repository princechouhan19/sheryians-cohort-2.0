// Q 23. Print the sum of all even & odd numbers in a range separately .
// (0 - 20) range 

let prompt = require("prompt-sync")();
let a = Number(prompt("Enter first number : "));
let b = Number(prompt("Enter second number : "));

if (a>b) {
    let temp = a ; 
    a = b;
    b = temp;
}

let EvenSum = 0;
let OddSum = 0;

for (let i=a ; i<=b ; i++){
    if(i%2==0) {
        EvenSum += i ;
    }
    else OddSum += i;
}
console.log("Even Sum = " + EvenSum);
console.log("Odd Sum = " + OddSum);