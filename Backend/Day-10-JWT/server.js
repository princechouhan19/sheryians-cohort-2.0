require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3000 , ()=>{
    console.log("server started at port 3000🎉")
})