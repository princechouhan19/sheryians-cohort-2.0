/* 
    server ko create krna
    server ko config krna
*/

const express = require('express');

const app = express()

app.use(express.json())

const notes = []

/* GET /notes */
app.get("/notes" , (req,res)=>{
    app.status(200)
})

module.exports = app