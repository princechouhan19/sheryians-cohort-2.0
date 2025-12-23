// Q 17. Counting number of days in a given month of a year 

let prompt = require("prompt-sync")();

let month = Number(prompt("Enter a Month (1-12) : "));
let year = Number(prompt("Enter a Year : "));

let days = 0;
if (month==0 && month>12) console.log("Inavlid Month");
else if (month == 2) {
    if (year% 4==0 && year% 100 != 0 || year% 400==0 ) {
        days = 29;
    }else {
        days = 28;
    }
}
else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
    days = 31;
} else days = 30 ;

console.log("Number of Days in a Month " + month + " of a year " + year + " = " + days )