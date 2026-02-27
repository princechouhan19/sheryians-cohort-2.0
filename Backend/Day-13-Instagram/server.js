require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000, ()=>{
    console.log("Server Started at PORT 3000")
})