// Q 22. using Switch (Check Consonant or Vowel using Switch)

let prompt = require("prompt-sync")();
let s = prompt("Enter an Alphabet (a - z , A - Z) : ").toLowerCase();

let consonent = 0 , vowel = 0 ; 

for (let i = 0 ; i<s.length;i++){
    let ch = s.charAt(i);
    switch(ch){
        case 'a':
        case 'e':
        case 'i':
        case 'o':
        case 'u': vowel++
        break
        
        default : consonent++
    }
}

console.log("consonent :" + consonent);
console.log("vowel :" + vowel);