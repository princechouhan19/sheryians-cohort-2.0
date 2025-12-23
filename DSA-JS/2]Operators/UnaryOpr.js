// ==================================================
// UNARY OPERATORS
// ==================================================
// Unary operators work with a single operand.

// Increment (++)

// Post-Increment (a++)
// Value is used first, then incremented
let a = 5;
console.log("a++ :", a); // OP: 5
a++;
console.log("a after a++ :", a); // OP: 6

// Pre-Increment (++a)
// Value is incremented first, then used
let b = 5;
console.log("++b :", ++b); // OP: 6

// Decrement (--)

// Post-Decrement (a--)
// Value is used first, then decremented
let c = 5;
console.log("c-- :", c); // OP: 5
c--;
console.log("c after c-- :", c); // OP: 4

// Pre-Decrement (--a)
// Value is decremented first, then used
let d = 5;
console.log("--d :", --d); // OP: 4

// ==================================================
// MIXED PRE & POST INCREMENT / DECREMENT
// ==================================================

let x = 12;
let y = 15;
let z = 8;

// Expression evaluation happens left to right
let result = x++ + --y - z++ + ++x;

// Step-by-step:
// x++ → 12 (x becomes 13)
// --y → 14
// z++ → 8 (z becomes 9)
// ++x → 14
// Final: 12 + 14 - 8 + 14 = 32

console.log("Final Result :", result); // OP: 32
