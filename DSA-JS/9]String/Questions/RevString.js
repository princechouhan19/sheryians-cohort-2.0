// Q56. Accept a string and print it in reverse order

let prompt = require("prompt-sync")();
let str = prompt("Enter a string: ");
let rev = "";

for (let i=str.length-1 ; i>=0 ; i--){
    rev += str.charAt(i);
}
console.log("Reversed string is: " + rev);



// for (let i=str.length-1 ; i>=0 ; i--){
//     process.stdout.write(str.charAt(i));
// }