/*
    Server ko Start Karna
    Database ko Connect Karna
*/
require("dotenv").config()
const app = require('./src/app');
const connectToDb = require("./src/config/database")

connectToDb()

app.listen(3000 , ()=>{
    console.log("Server Started At Port 3000🎉")
})