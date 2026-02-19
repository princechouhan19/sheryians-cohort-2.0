import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [notes, setNotes] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [updatedDescription, setUpdatedDescription] = useState("")


  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes")
      .then(res => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  //Create Note
  function handleSubmit(e) {
    e.preventDefault()
    const { title, description } = e.currentTarget.elements
    console.log(title.value, description.value)

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value
    })
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
  }

  //Delete Note By id
  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId)
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
  }

  //Update note by id
  function handelUpdateNote(noteId) {

    axios.patch("http://localhost:3000/api/notes/" + noteId, {
      description: updatedDescription
    })
      .then(res => {
        console.log(res.data)
        setEditingId(null)
        setUpdatedDescription("")
        fetchNotes()
      })
  }



  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder='Title' required />
        <input type="text" name="description" placeholder='Description' required />
        <button type="submit">Create Note</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return (
              <div className="note">
                <h1>{note.title}</h1>
                {
                  editingId === note._id ? (
                    <>
                      <input
                        type="text"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                      />
                      <button onClick={() => handelUpdateNote(note._id)}>
                        Save
                      </button>
                    </>
                  ) : (
                    <p>{note.description}</p>
                  )
                }

                <div className="Buttons">
                  <button
                    className='Update'
                    onClick={() => {
                      setEditingId(note._id)
                      setUpdatedDescription(note.description)
                    }}
                  >
                    Update
                  </button>

                  <button className='Delete' onClick={() => { handleDeleteNote(note._id) }}>Delete</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
