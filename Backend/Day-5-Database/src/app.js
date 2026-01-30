/* Server ko create karna 
   Server ko config karna */

const express = require('express');

const app = express()

app.use(express.json()) // middleware

const notes = []

/* Post /notes */
app.post("/notes" , (req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.status(201).json({
        message:"Note created successfully📝"
    })
})

/* Get /notes */
app.get("/notes" , (req,res)=>{
    res.status(200).json({
        notes : notes
    })
})

/* Delete /notes/:index 
   params
   req.params.index
*/
app.delete("/notes/:index" , (req,res)=>{
    delete notes [ req.params.index ]
    res.status(204).json({
        message:"Note Deleted Successfully✅"
    })
})

/*  Patch /notes/:index
    params
*/
app.patch("/notes/:index" , (req,res)=>{
    notes [req.params.index].description = req.body.description
    res.status(200).json({
        message:"Note updated Successfully"
    })
})

module.exports = app