// string + string = string (concatenation)
console.log("1]string + string = string (concatenation)")

let s1 = "Hello"
let s2 = " World!"
console.log(s1 + s2)          // Hello World!
console.log(typeof (s1 + s2)) // string


// String + Integer = String (concatenation)
console.log("2]String + Integer = String (concatenation)")

let s3 = "Hello"
let temp = 10
console.log(s3 + temp)          // Hello10
console.log(typeof (s3 + temp)) // string


// integer + integer = integer (Arithmetic)
console.log("3]integer + integer = integer (Arithmetic)")

let a = 10
let b = 20
console.log(a + b)          // 30
console.log(typeof (a + b)) // number


// mixed string and number operations
console.log("4]mixed string and number operations")

let A = 10
let B = 20

console.log("the sum of " + a + "and " + b + " is " + a + b)
// Output: the sum of 10and 20 is 1020

console.log("the sum of " + a + "and " + b + " is " + (a + b))
// Output: the sum of 10and 20 is 30

console.log(a + b + " is the sum of " + a + " and " + b)
// Output: 30 is the sum of 10 and 20

// ================= Key Explanation for Section 4 =================

console.log("Key Explanation for Section 4")

console.log("• JavaScript evaluates expressions from left to right")
console.log("• If a string appears first, '+' performs string concatenation")
console.log("• Numbers are added only when both operands are numbers")
console.log("• Parentheses (a + b) force arithmetic before concatenation")

console.log("Why 1020 happens:")

console.log("\"the sum of \" + a        → string")
console.log("string + b                → string")
console.log("string + a                → string (\"10\" + \"20\" = \"1020\")")