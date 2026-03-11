import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import axios from 'axios'
import { useState } from 'react'

const Register = () => {

  //form handlers
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/register", {
      username,
      email,
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => { setEmail(e.target.value) }} type="text"
            name="Email"
            placeholder='Enter your email' />
          <input
            onInput={(e) => { setUsername(e.target.value) }} type="text"
            name="username"
            placeholder='Enter username' />
          <input
            onInput={(e) => { setPassword(e.target.value) }} type="text"
            name="password"
            placeholder='Enter your password' />
          <button>Register</button>
        </form>
        <p>Alredy have an account?<Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register