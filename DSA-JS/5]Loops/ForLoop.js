/*
for(inatilize/declare ; condition ; change){
 }
for(start ; end ; change){
    
 }
*/

// Q 17. Accept an integer and Print hello world n times
let prompt = require("prompt-sync")();
let n = Number(prompt("Enter a number : "));

for (let i=1 ; i<=n ; i++){
    console.log("Hello World");
}