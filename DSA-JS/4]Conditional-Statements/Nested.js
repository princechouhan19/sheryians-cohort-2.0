let prompt = require("prompt-sync")();

let marks = Number(prompt("Enter Your Marks : "));

if (marks > 85 && marks <= 95) console.log("Excellent");
else if (marks > 80 && marks <= 85) console.log("Very Good");
else if (marks > 70 && marks <= 75) console.log("Good");
else  console.log("Fair");




