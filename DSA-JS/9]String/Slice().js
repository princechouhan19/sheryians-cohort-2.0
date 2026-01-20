let str = "Prince"
console.log(str.slice(0,3)); // Pri
console.log(str.slice(3)); // nce
console.log(str.slice(-4)); // ince
console.log(str.slice(-5,-2)); // rin
console.log(str.slice(5,2)); // (empty string, as start index is greater than end index)
console.log(str.slice()); // Prince (returns the whole string)