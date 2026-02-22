const express = require('express');

const app = express() // Server Created

app.get('/' , (req,res)=>{
    res.send("Hello World!")
})

app.get('/about' , (req,res)=>{
    res.send("This Is About Page")
})

app.get('/profile' , (req,res)=>{
    res.send("Name = Prince Chouhan" )
})

app.listen(3000) // Server Start 3000 is developement port