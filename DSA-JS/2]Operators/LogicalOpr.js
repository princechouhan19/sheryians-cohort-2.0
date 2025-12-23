// ==================================================
// LOGICAL OPERATORS
// ==================================================
// Logical operators are used to combine
// multiple conditions in decision-making.

// AND (&&)
// Returns true only if ALL conditions are true
// Uses short-circuit evaluation
let andResult = (12 < 7 && 8 < 56 && 19 > 10);
console.log("AND Result :", andResult); // OP: false
// First condition is false, so others are skipped

// OR (||)
// Returns true if ANY condition is true
// Stops checking once true is found
let orResult = (5 > 3 || 3 < 1);
console.log("OR Result :", orResult); // OP: true

// NOT (!)
// Reverses the boolean value
let notResult = !(5 > 3);
console.log("NOT Result :", notResult); // OP: false

// Bitwise AND (&)
// Works at binary level (NOT logical AND)
let bitwiseAndResult = (5 & 1);
// 5 -> 101
// 1 -> 001
// Result -> 001 = 1
console.log("Bitwise AND Result :", bitwiseAndResult); // OP: 1
