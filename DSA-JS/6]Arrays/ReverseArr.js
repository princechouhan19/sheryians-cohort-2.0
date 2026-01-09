// Q46. Reverse the array 

let arr = [11,22,33,44,55,66,77,88,99];
let temp = new Array(arr.length);

// let i = arr.length-1;
// for (let j=0 ; j<temp.length; j++){
//     temp[j] = arr[i];
//     i--;
// }
// console.log(arr);
// console.log(temp);

let i = 0 ,  j = arr.length-1;
while (i<j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++;
    j--;
}
console.log(arr);