/*
    server ko start krna
    database se connect krna
*/

const app = require("./src/app");
const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect("mongodb+srv://prince:fb5tM6mnml26qzAV@cluster0.gbmiktv.mongodb.net/Day-6")
    .then(()=>{
        console.log("Connected to DataBase✅")
    })
}

connectToDb()

app.listen(3000 , ()=>{
    console.log("Server started on port 3000🎉")
})