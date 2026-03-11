import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import axios from 'axios'
import { useState } from 'react'

const login = () => {

  // form handlers
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/login", {
      username,
      password
    }, {
      withCredentials: true
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            name="username"
            placeholder="Enter your username" />
          <input
            onInput={(e) => { setPassword(e.target.value) }}
            type="text"
            name="password"
            placeholder="Enter password" />
          <button>Login</button>
        </form>
        <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default login