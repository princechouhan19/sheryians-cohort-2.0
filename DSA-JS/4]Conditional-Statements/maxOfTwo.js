//Q 10.Accept two numbers and print the greatest between them

let prompt = require("prompt-sync")();
let a = prompt("Enter First Number : ");
let b = prompt("Enter Second Number : ");

if (a>b){
    console.log(a + " is greater than " + b );
}else{
    console.log(b + " is greater than " + a);

}