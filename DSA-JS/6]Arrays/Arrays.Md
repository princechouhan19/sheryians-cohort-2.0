# Arrays

## ✅ Introduction to Arrays

**What is an Array?**  
An array is a data structure that stores a collection of elements (values or variables) in contiguous memory locations. Each element in an array can be accessed using an index, which starts from `0`.

**Why Use Arrays?**
- Store multiple values in a single variable
- Easy access to elements using indices
- Dynamic sizing (in JavaScript)
- Support for various built-in methods
- Efficient for storing and manipulating collections of data

**Array Declaration and Initialization**
```javascript
// Empty array
let arr = [];

// Array with values
let numbers = [10, 20, 30, 40, 50];

// Using Array constructor
let arr2 = new Array(5);  // Array of size 5 with undefined elements
let arr3 = new Array(1, 2, 3, 4, 5);  // Array with elements

// Mixed data types (JavaScript allows this)
let mixed = [1, "hello", true, null, {name: "John"}];
```

---

## 🔧 Core Array Properties and Methods

### **1. Length Property**
Returns the number of elements in the array.
```javascript
let arr = [10, 20, 30, 40, 50];
console.log(arr.length);  // Output: 5
```

### **2. Push (add element at the end)**
Adds one or more elements to the end of an array and returns the new length.
```javascript
let arr = [10, 20, 30];
arr.push(40);  // arr = [10, 20, 30, 40]
arr.push(50, 60);  // arr = [10, 20, 30, 40, 50, 60]
```

### **3. Pop (remove element from the end)**
Removes the last element from an array and returns that element.
```javascript
let arr = [10, 20, 30, 40];
let removed = arr.pop();  // removed = 40, arr = [10, 20, 30]
```

### **4. Unshift (add element at the beginning)**
Adds one or more elements to the beginning of an array and returns the new length.
```javascript
let arr = [20, 30, 40];
arr.unshift(10);  // arr = [10, 20, 30, 40]
arr.unshift(5, 8);  // arr = [5, 8, 10, 20, 30, 40]
```

### **5. Shift (remove element from the beginning)**
Removes the first element from an array and returns that element.
```javascript
let arr = [10, 20, 30, 40];
let removed = arr.shift();  // removed = 10, arr = [20, 30, 40]
```

### **6. Other Useful Methods**
```javascript
// Accessing elements
let arr = [10, 20, 30, 40, 50];
console.log(arr[0]);  // 10
console.log(arr[2]);  // 30

// Modifying elements
arr[1] = 25;  // arr = [10, 25, 30, 40, 50]

// Check if array includes an element
console.log(arr.includes(30));  // true

// Find index of an element
console.log(arr.indexOf(40));  // 3
```

---

## 📥 Accepting Values from User and Assigning to Array

**Using prompt() in Browser:**
```javascript
let n = parseInt(prompt("Enter the size of array: "));
let arr = [];

for(let i = 0; i < n; i++) {
    let value = parseInt(prompt(`Enter element ${i + 1}: `));
    arr.push(value);
}

console.log("Array elements are:", arr);
```

**Using readline in Node.js:**
```javascript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let arr = [];
let n;

rl.question('Enter the size of array: ', (size) => {
    n = parseInt(size);
    let count = 0;
    
    const getInput = () => {
        if(count < n) {
            rl.question(`Enter element ${count + 1}: `, (value) => {
                arr.push(parseInt(value));
                count++;
                getInput();
            });
        } else {
            console.log("Array elements are:", arr);
            rl.close();
        }
    };
    
    getInput();
});
```

**Simple approach with hardcoded values:**
```javascript
let arr = [10, 20, 30, 40, 50];
console.log("Array elements are:", arr);
```

---

## 📝 Practice Questions

- [x] **Q43.** Sum of array's elements  
- [x] **Q44.** Max element from array  
- [x] **Q45.** Second max element from array  
- [x] **Q46.** Reverse the array  
- [x] **Q47.** All zeroes to left and all ones to right 
- [x] **Q.** Move all the negative elements on the left side and positive elements on the right side O(n).
- [x] **Q48.** Array left rotation by 1
- [x] **Q49.** Array left rotation by K elements
- [x] **Q** Print the count of subarrays whose sum is equal to the target. (Ex - {1,2,3,7,5} , T = 12 O/P - 2 - [ {2,3,7}, {7,5}] - Both subarrays have sum 12)


---

## 💡 Key Points to Remember

- Array indices start from `0` and go up to `length - 1`
- JavaScript arrays are **dynamic** - they can grow or shrink in size
- Arrays can store elements of different data types
- Accessing an index outside the array bounds returns `undefined` (no error)
- `push()` and `pop()` operate on the **end** of the array
- `unshift()` and `shift()` operate on the **beginning** of the array
- Time complexity:
  - Access by index: **O(1)**
  - Push/Pop: **O(1)**
  - Shift/Unshift: **O(n)** (because all elements need to be shifted)

---