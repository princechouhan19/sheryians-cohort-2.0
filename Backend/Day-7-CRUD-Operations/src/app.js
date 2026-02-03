/*
    Server Ko Create Karna
    Server Ko Config Karna
*/

const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json()); /* Middleware */

/* - POST /notes 
   - req.body => {title,description}     
*/
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Note Created Successfully",
    note
  })
});

/*
    - GET /notes
    - Fetch All The Notes Data
*/
app.get("/notes" , async (req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message:"Notes Fetched Successfully",
        notes
    })
})

module.exports = app;
