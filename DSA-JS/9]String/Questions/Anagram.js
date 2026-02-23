// Q62. Check the two string are Anagram or not Anagrams words length & same character count . 
// Ex - arc = car , state = taste , night = thing
// - Frequency should be same for both string
// -

let prompt = require("prompt-sync")();
let s1 = prompt("Enter a first word : ")
let s2 = prompt("Enter a second word : ")
let arr = new Array(126).fill(0);

for (let i=0;i<s1.length;i++){
    let ascii = s1.charCodeAt(i);
    arr[ascii-97] = arr[ascii-97]+1;
}
for (let i=0;i<s2.length;i++){
    let ascii = s2.charCodeAt(i);
    arr[ascii-97] = arr[ascii-97]-1;
}

let IsAnagram = true;
for (let i=0;i<arr.length;i++){
    if(arr[i]!=0){
        IsAnagram=false;
        break;
    }
}

if (IsAnagram==true){
    console.log("Anagram");
} else {
    console.log("Not Anagram");
}