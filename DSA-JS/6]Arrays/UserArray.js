// Accept value from user and assign in the array

let prompt = require('prompt-sync')();
let n = Number(prompt("Enter the Size of Array : "));
let arr = new Array(n);

for (let i=0 ; i<arr.length ; i++){
    arr[i] = Number(prompt("Enter a value for index " + i + " : "));
}
console.log(arr);