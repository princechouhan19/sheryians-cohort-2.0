// q] Given an array of integers, calculate the absolute difference between the sum of the first half and the sum of the second half of the array. If both sums are equal, return 0.

let arr = [1, 2, 1, 2, 1, 3];
let lsum = 0;
let rsum = 0;

for (let i = 0; i < arr.length / 2; i++) {
  lsum += arr[i];
}

for (let j = arr.length / 2; j < arr.length; j++) {
  rsum += arr[j];
}

let result;
if (lsum === rsum) {
  result = 0;
} else {
  result = Math.abs(lsum - rsum);
}

console.log(result);