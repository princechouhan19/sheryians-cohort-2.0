let arr= [11, 22, 33, 44, 55, 66];
let temp = arr[arr.length-1];

for (let i=arr.length-2 ; i>=0 ; i--){
    arr[i+1] = arr[i];
}
arr[0] = temp;
console.log(arr);