let prompt = require('prompt-sync')();
let arr = [10, 22, 35, 40, 55, 60, 75, 80, 95];
let t = Number(prompt("Enter the target value to search: "));
let st = 0 , en = arr.length - 1 , index = -1;

while (st<=en){
    let mid =Math.floor((st+en)/2);
    if (arr[mid] === t){
        index = mid;
        break;
    }
    else if(arr[mid]< t) st = mid +1;
    else en = mid -1;
}

console.log(index==-1 ? "Element not found" : `Element found at index ${index}`);