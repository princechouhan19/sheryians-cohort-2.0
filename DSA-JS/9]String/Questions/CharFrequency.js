// Q61. Accept a string and print the frequency of each character

let prompt = require("prompt-sync")();
let s = prompt("Enter a word : ")
let arr = new Array(126).fill(0);

for (let i=0 ; i<s.length ; i++){
    let ascii = s.charCodeAt(i);
    arr[ascii-97] = arr[ascii-97]+1;
}

for (let i=0 ; i<arr.length ; i++){
    if (arr[i]>0){
        console.log(String.fromCharCode(i+97) + "-> " + arr[i]);
    }
}

// A - 65 Z - 90
// a - 97 z - 122