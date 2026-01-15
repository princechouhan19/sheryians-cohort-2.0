let prompt = require('prompt-sync')();
let arr = [45 , 23, 78, 12, 56, 89, 90];
let t  = Number(prompt("Enter the target value to search: "));
let index = -1;

for (let i=0 ; i < arr.length ; i++) {
    if (arr[i] === t){
        index = i;
        break;
    }
}
console.log(index==-1 ? "Element not found" : `Element found at index ${index}`);