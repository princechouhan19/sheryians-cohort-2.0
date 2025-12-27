// Q 23. Write a program to calculate the area of a circle, rectangle, and triangle using a switch statement .

let prompt = require('prompt-sync')();

console.log("1. Area of Rectangle");
console.log("2. Area of Square");
console.log("3. Area of Triangle");

let n = Number(prompt("Enter choice : "));

switch(n){
    case 1:{
        let L = Number(prompt("Enter Length : "))
        let B = Number(prompt("Enter Breadth : "))
        console.log("Area of Rectangle : " + L * B)
        break
    }
    case 2:{
        let S = Number(prompt("Enter Side : "))
        console.log("Area of Circle : " + S * S)
        break
    }
    case 3:{
        let Bs = Number(prompt("Enter Base : "))
        let H = Number(prompt("Enter Height : "))
        console.log("Area of Triangle : " + (Bs * H)/2)
        break
    }
    default : console.log("Kuch Bhi");
    
}