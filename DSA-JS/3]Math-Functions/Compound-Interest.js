const prompt = require("prompt-sync")();

let P = Number(prompt("Enter principal : "));
let r = Number(prompt("Enter rate : "));
let t = Number(prompt("Enter time : "));

let CP = (P * Math.pow(1 + r / 100, t) - P).toFixed(2);
console.log("CP : " + CP);
