// Q 11.Accept an integer and check whether it is an even number or odd.

let prompt = require("prompt-sync")();

let a = prompt("Enter an Number : ")

if (a%2===0 && a===0){
    console.log(a + " is an even no");   
}else{
    console.log(a + " is an odd no"); 
}