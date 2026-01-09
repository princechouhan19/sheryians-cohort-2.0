// Q48. Array left rotation by 1

let arr= [11, 22, 33, 44, 55, 66];
let temp = arr[0];

for (let i=1 ; i<arr.length ; i++){
    arr[i-1] = arr[i];
}
arr[arr.length-1] = temp;
console.log(arr); // [ 22, 33, 44, 55, 66, 11 ]