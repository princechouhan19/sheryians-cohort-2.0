import { useState } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([
    {
      title: "Test Title 1",
      description: "Test Description 1",
      id: 1
    },
    {
      title: "Test Title 2",
      description: "Test Description 2",
      id: 2
    },
    {
      title: "Test Title 3",
      description: "Test Description 3",
      id: 3
    },
    {
      title: "Test Title 4",
      description: "Test Description 4",
      id: 4
    }
  ])

  axios.get("http://localhost:3000/api/notes")
  .then(res=>{
    setNotes(res.data.notes)
  })

  return (
    <>
      <div className="notes">
        {
          notes.map(note => {
            return (
              <div className="note">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App