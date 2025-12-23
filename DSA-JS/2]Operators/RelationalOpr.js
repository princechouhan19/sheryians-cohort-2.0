// ==================================================
// RELATIONAL (COMPARISON) OPERATORS
// ==================================================
// These operators compare two values
// and always return a boolean (true / false).

// Equal to (==)
// Compares only values, NOT data types (type coercion)
console.log("5 == 5 :", 5 == 5);       // OP: true
console.log("'5' == 5 :", '5' == 5);   // OP: true

// Not equal (!=)
// Also allows type coercion
console.log("5 != 3 :", 5 != 3);       // OP: true
console.log("'5' != 5 :", '5' != 5);   // OP: false

// Strict equal (===)
// Compares both value AND data type
console.log("5 === 5 :", 5 === 5);     // OP: true
console.log("'5' === 5 :", '5' === 5); // OP: false

// Strict not equal (!==)
// Checks value and type
console.log("5 !== 3 :", 5 !== 3);     // OP: true
console.log("'5' !== 5 :", '5' !== 5); // OP: true

// Greater than (>)
console.log("5 > 3 :", 5 > 3);         // OP: true

// Less than (<)
console.log("5 < 3 :", 5 < 3);         // OP: false

// Greater than or equal to (>=)
console.log("5 >= 5 :", 5 >= 5);       // OP: true

// Less than or equal to (<=)
console.log("5 <= 3 :", 5 <= 3);       // OP: false
