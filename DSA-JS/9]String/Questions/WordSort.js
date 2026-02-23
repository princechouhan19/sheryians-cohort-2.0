// Sort the word of sentence
// lexographical order - is the order in which words are arranged in a dictionary. It is also known as alphabetical order. In lexicographical order, the words are sorted based on the Unicode value of their characters. The word with the smallest Unicode value comes first, followed by the word with the next smallest Unicode value, and so on.

let prompt = require("prompt-sync")();
let sentence = prompt("Enter the sentence: ");
let arr = sentence.split(" ");
let n = arr.length;

for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
console.log(arr);