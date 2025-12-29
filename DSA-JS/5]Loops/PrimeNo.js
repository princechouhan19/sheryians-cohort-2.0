// Q25. Check whether a number is Prime or Not Prime

let prompt = require("prompt-sync")();
let n = Number(prompt("Enter a number : "));

let isPrime = true;

if (n <= 1) isPrime = false;
else {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      isPrime = false;
      break;
    }
  }
}

console.log(isPrime ? "Prime" : "Not Prime");