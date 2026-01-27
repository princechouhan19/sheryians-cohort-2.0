// Q59. Take an array of strings words and a String Prefix. Print the number of strings 1 in words that contain pref as a prefix. 
// Example - Input: words =["pay", "attention", "practice", "attend"], pref = "at"
// Output :- 2

let prompt = require('prompt-sync')();
let words = ["pay", "attention", "practice", "attend"]
let pref = prompt("Enter pref : ");
let count = 0;

for (let i=0 ; i<words.length; i++){
    if(words[i].startsWith(pref)) count++;
}
console.log(count);