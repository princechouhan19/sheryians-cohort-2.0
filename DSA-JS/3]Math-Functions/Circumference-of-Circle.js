// Circumference of Circle = π r^2

const prompt = require("prompt-sync")();

const r = prompt("Enter radius : ");

let COC = (3.141592653589793 * Math.pow(r,2)).toFixed(2);
console.log("Circumference of Circle = " + COC);