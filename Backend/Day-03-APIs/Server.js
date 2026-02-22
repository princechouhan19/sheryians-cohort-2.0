const express = require('express');

const app = express()

app.use(express.json())

const notes = []

app.post("/notes" , (req,res)=>{
    console.log(req.body)

    notes.push(req.body)

    res.send("Note Created📝")
})

app.get("/notes" , (req,res)=>{
    res.send(notes)
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000🎉")
})