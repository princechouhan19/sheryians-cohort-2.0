let str = "Prince";
console.log(str.slice(5,2)); // (empty string, as start index is greater than end index) ❌
console.log(str.substring(5,2)); // 2,5 ince (correct behavior of substring method)
console.log(str.substring(-3)); // Prince (negative index treated as 0 in substring method)
console.log(str.substring()); // Prince (returns the whole string)