// Q41. Print an V
//     *       *
//      *     *
//       *   *
//        * *
//         * 

let prompt = require('prompt-sync')();
let n = Number(prompt("Enter a Number : "));

// Outer loop for rows
    for (let i = 1; i <= n; i++) { 
        // Loop for leading spaces
        for (let j = 1; j < 2*n; j++) { 
            if(i == j || i+j == 2*n)
               process.stdout.write("*"); 
            else
              process.stdout.write(" "); 
        }
        console.log();
    }

// j == i  → prints the left diagonal
//           because column number equals row number
//
// i + j == n + 1 → prints the right diagonal
//                  because row + column equals (n + 1)
//
// if (i > n - i + 1) → stops printing after diagonals meet
//                      so only the top half is printed
//
// Using both diagonal conditions together,
// but stopping early, forms a V pattern instead of X
