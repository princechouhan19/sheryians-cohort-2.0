// 1] Math.abs() :- Returns the absolute value of a number, converting negative values to positive.

console.log("Math.abs(-23) = " + Math.abs(-23)); // 23
console.log("Math.abs(23) = " + Math.abs(23)); // 23

// 2] Math.ceil() :- Rounds a number up to the nearest integer.
console.log("Math.ceil(23.43) = " + Math.ceil(23.43)); // 24

// 3] Math.floor() :- Rounds a number down to the nearest integer.
console.log("Math.floor(23.43) = " + Math.floor(23.43)); // 23

// 4] Math.round() :- Rounds a number to the nearest integer. If the fraction is 0.5 or greater, it rounds up; otherwise, it rounds down.
// .5 >=  then act as ceil 
// .4 <= then act as floor
console.log("Math.round(13.4) = " + Math.round(13.4)); // 13
console.log("Math.round(13.5) = " + Math.round(13.5)); // 14

// 5] Math.trunc() :- Removes the decimal part of a number, returning only the integer part.
console.log("Math.trunc(13.445) = " + Math.trunc(13.445)); // 13

// 6] Math.pow(base, power) :- Returns the base raised to the power of the exponent.
console.log("Math.pow(2,2) = " +Math.pow(2,2)); // 4

// 7] Math.sqrt() :- Returns the square root of a number.
console.log("Math.sqrt(2) = " + Math.sqrt(2)); // 1.4142135623730951

// 8] Math.cbrt() :- Returns the cube root of a number.
console.log("Math.cbrt(8) = " + Math.cbrt(8)); // 2

// 9] Math.max() :- Returns the largest of the provided numbers.
console.log("Math.max(22,54,95,2,5) = " + Math.max(22,54,95,2,5)); // 95

// 10] Math.min() :- Returns the smallest of the provided numbers.
console.log("Math.min(22,54,95,2,5) = " + Math.min(22,54,95,2,5)); // 2

// 11] Math.random() :- Returns a random number between 0 (inclusive) and 1 (exclusive).
console.log("Math.random() = " + Math.random()); // any value bw 0 to 1

// 12] toFixed() :- Formats a number to a fixed number of decimal places, returning a string representation.
console.log("22.443435.toFixed(2) = " + 22.443435.toFixed(2)); // 22.44
