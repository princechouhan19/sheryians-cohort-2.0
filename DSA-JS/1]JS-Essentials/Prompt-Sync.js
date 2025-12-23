// Prompt Sync: A module that provides a simple way to capture user input from the command line in a synchronous manner.
// Usage: Require the module and use it to prompt the user for input. The input is then stored in a variable for further use.

let prompt = require('prompt-sync')();

let age = prompt("Enter Your Age : ");
console.log(`Age ${age}`);
