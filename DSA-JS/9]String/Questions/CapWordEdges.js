// Q60. Capitalize first & last character of each word in the sentence and print the new sentence Ex :  Hello bhai Kaise ho a
// Output : HellO BhaI KaisE HO A

/* s=hello
   s.charAt(0) h
   s.charAt(s.length-1) o
   s.substring(1,s.length-1)
*/

let prompt  = require('prompt-sync')();
let s = prompt("Enter a sentence : ")
let arr = s.split(" ");
let ans = "";

for (let i=0 ; i<arr.length;i++){
    let word = arr[i];
    let first = word.charAt(0).toUpperCase();
    let mid = word.substring(1,word.length-1);
    let last = word.charAt(word.length-1).toUpperCase();

    ans += (first+mid+last)+" ";
}
console.log(ans);