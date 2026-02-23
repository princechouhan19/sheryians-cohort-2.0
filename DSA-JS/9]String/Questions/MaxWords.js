// leetcode-  Maximum Number of Words found in Sentence

let prompt = require('prompt-sync')();
let sentence = prompt("Enter the sentence: ");

let words = sentence.trim().split(" ");
let count = 0;

for (let i = 0; i < words.length; i++) {
    if (words[i] !== "") {   // ignore empty strings
        count++;
    }
}

console.log("Number of words:", count);