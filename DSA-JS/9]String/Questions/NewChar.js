// Q55. Accept a string from user and print its each character on a new line

let prompt = require("prompt-sync")();
let s = prompt("Enter a string: ");

for (let i=0 ; i<=s.length-1 ; i++){
    console.log(s.charAt(i));
}