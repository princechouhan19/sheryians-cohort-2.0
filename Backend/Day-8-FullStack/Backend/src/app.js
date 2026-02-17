/*
    - Server Ko Create Krna
*/

const express = require('express')
const noteModel = require("./models/note.model")
const cors = require("cors")

const app = express()

app.use(express.json()) //MiddleWare
app.use(cors())

/*
    - Post /api/notes
    - Create New Note And Save Data In MongoDb
    - req.body = {title,description}
*/
app.post("/api/notes" ,async (req,res)=>{
    const {title,description} = req.body
    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note create Successfully",
        note
    })
})

/*
    - Get /api/notes
    - Fetch all Notes Data from MongoDb and Send Them in the Response
*/
app.get("/api/notes" , async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message:"Notes Fetched Successfully🎉",
        notes
    })
})

/*
    - Delete /api/notes/:id
    - Delete Note with the ID from req.params
*/
app.delete("/api/notes/:id" , async (req,res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"Note Deleted Successfully  "
    })
})

/*
    - Patch /api/notes/:id
    - Update the Description of the note
    - req.body = {description}
*/
app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id , {description})
    res.status(200).json({
        message:"Note Updated Successfully"
    })
})

module.exports = app