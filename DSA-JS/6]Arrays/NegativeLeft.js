// Move all the negative elements on the left side and positive elements on the right side O(n).
let arr= [1, -1 ,2 ,4, 7, -6, -65, -25 , 8 , -4, -6, 6, -7, -3];
let i = 0 ,j = 0;

while (i<arr.length){
    if (arr[i]<0){
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        j++;
    }
    i++;
}
console.log(arr);