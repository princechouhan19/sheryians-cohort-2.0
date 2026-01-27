// Q58. Toggle each alphabet of String (In - `AcgDfD` Output - `aCGdFd`)

let prompt = require('prompt-sync')();
let s  = prompt("Ente a String : ");
let ans = "";

for (let i=0 ; i<s.length-1 ; i++){
    let ascii = s.charCodeAt(i); // A=65 , a=97
     //Uppercase (65,90) 
    if (ascii>=65 && ascii<=90){
        ans += String.fromCharCode(ascii+32);
    }else{
        ans+= String.fromCharCode(ascii-32);
    }
}
console.log(ans);