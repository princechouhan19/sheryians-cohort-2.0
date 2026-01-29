/*
    - Server ko create karna
    - Server ko config karna
*/

const express = require('express')

const app = express()

app.use(express.json())

const notes = []

/* POST /notes */
app.post("/notes" , (req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)
    res.send("Note created📝")
})

/* GET /notes */
app.get("/notes" , (req,res)=>{
    res.send(notes)
})

/* DELETE /notes */
/* params */
/* delete/notes/2 */
app.delete("/notes/:index" , (req,res)=>{
    console.log(req.params.index)
    delete notes [req.params.index]
    res.send("note deleted successfully")
})

/* PATCH /notes?:index */
/* req.body */

app.patch("/notes/:index" , (req,res)=>{
    notes[ req.params.index ].description = req.body.description

    res.send("Note Updated Successfully")
})

module.exports = app