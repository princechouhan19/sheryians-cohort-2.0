const mongoose = require("mongoose");

async function connectToDB(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to DB")
    })
}

module.exports = connectToDB;