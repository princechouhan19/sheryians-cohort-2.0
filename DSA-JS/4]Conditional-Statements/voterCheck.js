// Q 12.Accept name and age from the user. Check if the user is a valid voter or not.

let prompt = require("prompt-sync")();

let name = prompt("Enter your Name : ");
let age = Number(prompt("Enter your Age : "));

if (age>=18){
    console.log(name + " is an Valid Voter");
}else{
    console.log(name + " is an Invalid Voter");
}