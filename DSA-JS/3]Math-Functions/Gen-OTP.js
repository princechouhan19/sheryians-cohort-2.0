// OTP generation: random 4-digit number
// Math.random() returns a float in [0,1)
// Multiply by 9000 → range [0, 9000)
// Add 1000 → shifts range to [1000, 10000)
// Math.trunc() removes fractional part → integer in [1000, 9999]

const otp = Math.trunc(Math.random() * 9000) + 1000;
console.log("OTP : " + otp);