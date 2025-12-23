/*
 * Differences between var, let, and const in JavaScript
 */

console.log("===== 1. var =====");
// Definition:
// var is used to declare variables that can be updated and re-declared within the same scope.
console.log("var x = 10;");
console.log("x = 20;   // allowed");
console.log("var x = 30; // allowed (but not recommended)");
// Key Points:
// - Function-scoped (not block-scoped).
// - Can be re-declared and reassigned.
// - Hoisting: variable declarations are hoisted to the top and initialized with undefined.
// - Can cause unexpected bugs due to lack of block scope.

function scopeExample() {
  if (true) {
    var x = 10;
    // var is function-scoped, accessible outside the block

    let y = 20;
    // let is block-scoped, valid only inside {}

    const z = 30;
    // const is also block-scoped, and its value cannot be changed

    console.log("Inside block:");
    console.log("x =", x);
    console.log("y =", y);
    console.log("z =", z);
  }

  console.log("Outside block:");
  console.log("x =", x);
  // y and z will cause errors here because they are not accessible outside the block

  // console.log(y); // ReferenceError
  // console.log(z); // ReferenceError
}

scopeExample();

console.log("\n===== 2. let =====");
// Definition:
// let is used to declare variables that can be updated but cannot be re-declared in the same scope.
console.log("let y = 10;");
console.log("y = 20;   // allowed");
console.log("let y = 30; // ❌ error");
// Key Points:
// - Block-scoped ({}).
// - Can be reassigned but not re-declared in the same scope.
// - Hoisting: variables are hoisted but remain in the Temporal Dead Zone until initialized.
// - Preferred over var for safer code.

console.log("\n===== 3. const =====");
// Definition:
// const is used to declare variables that cannot be reassigned or re-declared.
console.log("const z = 10;");
console.log("z = 20;   // ❌ error");
console.log("const z = 30; // ❌ error");
// Key Points:
// - Block-scoped.
// - Must be initialized at the time of declaration.
// - Cannot be reassigned or re-declared.
// - Hoisting: hoisted but not initialized (Temporal Dead Zone).
// - For objects and arrays, properties/elements can be modified, but the reference cannot change.

// Hoisting does not mean usability.
// let and const are hoisted, but accessing them before declaration results in an error due to the Temporal Dead Zone (TDZ).

// Recommended Usage (Industry Practice)
// - Use const by default.
// - Use let when reassignment is required.
// - Avoid var in modern JavaScript.

console.log("\n===== 4. REASSIGNMENT =====");

// var values can be reassigned
var d = 100;
console.log("Initial var d =", d);
d = 200;
console.log("Reassigned var d =", d);

// let values can also be reassigned
let e = 300;
console.log("Initial let e =", e);
e = 400;
console.log("Reassigned let e =", e);

// const values cannot be reassigned
const f = 500;
console.log("const f =", f);
// f = 600; // TypeError

console.log("\n===== 5. RE-DECLARATION =====");

// var can be redeclared in the same scope
var g = 700;
var g = 800;
console.log("var g after redeclaration =", g);

// let cannot be redeclared in the same scope
let h = 900;
console.log("let h =", h);
// let h = 1000; // SyntaxError

// const cannot be redeclared in the same scope
const i = 1100;
console.log("const i =", i);
// const i = 1200; // SyntaxError

console.log("\n===== 6. CONST WITH OBJECTS & ARRAYS =====");

// const does not mean the object cannot be changed
// it means only the reference cannot be changed

const user = { name: "Prince", age: 21 };
console.log("Before mutation:", user);

// the values inside the object can be changed
user.age = 22;
console.log("After mutation:", user);

// user = {}; // ❌ not allowed

const numbers = [1, 2, 3];
numbers.push(4); // array can be modified
console.log("Array after push:", numbers);

// numbers = []; // ❌ not allowed

console.log("\n===== 7. PRACTICAL USE CASES =====");

// let is best for loops because it is block-scoped
for (let j = 0; j < 3; j++) {
  console.log("let loop j =", j);
}

// var is accessible outside the loop (can cause issues)
for (var k = 0; k < 3; k++) {
  console.log("var loop k outside loop =", k);
}

console.log("\n===== SUMMARY =====");
console.log(`
var   → function-scoped, hoisted with undefined, redeclare allowed (avoid this)
let   → block-scoped, safe option, reassign allowed
const → block-scoped, default choice, reassign not allowed
`);
