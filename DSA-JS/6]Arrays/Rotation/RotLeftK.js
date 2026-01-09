// Q49. Array left rotation by K elements

let prompt = require('prompt-sync')();
let arr= [11, 22, 33, 44, 55, 66];
let k = Number(prompt("Enter Number of Rotations : "));
k  = k % arr.length ; 

for (let j=1 ; j<=k ; j++){
    let temp = arr[0];
    for (let i=1 ; i<arr.length ; i++){
        arr[i-1] = arr[i]
    }
    arr[arr.length-1] = temp;
}
console.log(arr);