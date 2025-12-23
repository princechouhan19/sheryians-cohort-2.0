//  Heron's Formula :- ✓s (s-a) (s-b) (s-c)
//  Where s(perimeter) = (a + b + c) / 2

const prompt = require("prompt-sync")();

const a = Number(prompt("Enter value of a : "));
const b = Number(prompt("Enter value of b : "));
const c = Number(prompt("Enter value of c : "));

let s = (a + b + c) / 2;
console.log("s : " + s);

let AOT = (Math.sqrt((s)*(s-a)*(s-b)*(s-c))).toFixed(2);
console.log("Area of Triangle (Heron Formula) : " +AOT);