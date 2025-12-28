// Q 24. Print all the factors of a number. 

let prompt = require("prompt-sync")();
let n = Number(prompt("Enter a number : "));

for (let i=1 ; i<=n ; i++){
    if(n%i==0){
        process.stdout.write(i + " ");
    }
}