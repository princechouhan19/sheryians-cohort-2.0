// Q 13. Accept three numbers and print the greatest among them?

let prompt = require("prompt-sync")();

let a = prompt("Enter First Number : ");
let b = prompt("Enter Second Number : ");
let c = prompt("Enter Third Number : ");

// let g = Math.max(a,b,c);
// console.log("From " +  a + " , " + b + " and " +  c + " greatest number is = " + g )

if (a>b && a>c){
    console.log(a + " is greatest");
}
else if (b>c && b>a){
    console.log(b + " is greatest");
}
else {console.log(c + " is greatest");
}