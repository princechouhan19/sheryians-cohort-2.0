let prompt = require("prompt-sync")();

let day = Number(prompt("Enter day number : "));

switch (day) {
    case 1:
    case 8: {
        console.log("Monday");
        break
    }
    case 3:{
        console.log("Wednesday");
        break
    }
    case 4:{
        console.log("Thursday");
        break
    }
    case 5:{
        console.log("Friday");
        break
    }
    case 6:{
        console.log("Saturday");
        break
    }
    case 7:{
        console.log("Sunday");
        break
    }
    default : console.log("END");
}