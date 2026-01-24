// Q57. Palindromic String using Two pointer algorithm (hint: Array reverse algo)
let prompt = require("prompt-sync")();
let str = prompt("Enter a string: ");

let i= 0 , j = str.length - 1;
let isPalindromic = true;
while (i<j){
    if (str.charAt(i) != str.charAt(j)){
        isPalindromic = false;
        break;
    } else {
        i++;
        j--;
    }
}
if (isPalindromic){
    console.log(`${str} is a Palindromic String`);
} else {
    console.log(`${str} is not a Palindromic String`);
}
// let rev = "";

// for (let i=str.length-1 ; i>=0 ; i--){
//     rev += str.charAt(i);
// }
// if (str == rev){
//     console.log(`${str} is a Palindromic String`);
// } else {
//     console.log(`${str} is not a Palindromic String`);
// }