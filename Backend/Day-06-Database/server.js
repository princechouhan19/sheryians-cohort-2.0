/*
    server ko start krna
    database se connect krna
*/

const app = require("./src/app");
const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect("your_mongodb_connection_string_here")
    .then(()=>{
        console.log("Connected to DataBase✅")
    })
}

connectToDb()

app.listen(3000 , ()=>{
    console.log("Server started on port 3000🎉")
})