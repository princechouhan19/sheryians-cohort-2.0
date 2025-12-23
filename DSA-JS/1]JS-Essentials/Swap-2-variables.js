// 1] Using 3 Variables 
let a = 10;
let b = 20;
console.log("BEFORE :- " + "a = "+ a +" and " + "b = " + b)
temp = a; // temp = 10
a = b; // a = 20
b = temp; // b = 10

console.log("AFTER :- " + "a = " + a  + " and " + "b = " + b)

// 2] Using 2 variables 
let A = 20;
let B = 30;
console.log("BEFORE :- " + "A = "+ A +" and " + "B = " + B)

A = A+B; // A=50
B = A-B; // B=20
A = A-B; // A=30
console.log("AFTER :- " + "A = " + A  + " and " + "B = " + B)

// 3] Swapping using Destructuring Array
let c = 3;
let d = 9;
console.log("BEFORE :- " + "c = "+ c +" and " + "d = " + d);

[c,d] = [d,c]
console.log("AFTER :- " + "c = " + c  + " and " + "d = " + d)