// String :- A string is a sequence of characters used to represent text. In JavaScript, strings are enclosed in single quotes (' '), double quotes (" "), or backticks (` `) for template literals. 
// - Immutable
// - Can be accessed using index

let str = "Hello, World!";
let name = 'Alice'; // in js '' and "" are both used for strings
console.log(typeof str); // string
console.log(typeof name); // string

// String properties and methods
console.log(str.length); // 13
console.log(str[0]); // H
console.log(str.toUpperCase()); // HELLO, WORLD!
console.log(str.toLowerCase()); // hello, world!
console.log(name.concat(" How are you?")); // Alice How are you?
console.log(str.indexOf("World")); // 7
console.log(str.lastIndexOf("World")); // 7
console.log(str.includes("Hello")); // true
console.log(str.startsWith("Hello")); // true
console.log(str.endsWith("!")); // true
console.log(str.replace("World", "JavaScript")); // Hello, JavaScript!
console.log(str.replaceAll("World", "Prince"));  // Hello, Prince!
console.log(str.split(", ")); // [ 'Hello', 'World!' ]
console.log(str.repeat(2)); // Hello, World!Hello, World!
console.log(str.charAt(1)); // e



// Extracting parts of a string
console.log(str.slice(0, 5)); // Hello
console.log(str.substring(7, 12)); // World
console.log(str.substr(7, 5)); // World

let data = "       Naruto Uzumaki       ";
console.log(data.trim()); // Naruto Uzumaki (removes whitespace from both ends)