// IF = 

// IF-ELSE = 

let prompt = require("prompt-sync")();
let age = Number(prompt("Enter your Age : "));
let nationality = prompt("Enter your Nationality : ");

if (age >= 18 && nationality === "India") {
    console.log("Valid Voter");
}else{
    console.log("Inalid Voter"); 
}