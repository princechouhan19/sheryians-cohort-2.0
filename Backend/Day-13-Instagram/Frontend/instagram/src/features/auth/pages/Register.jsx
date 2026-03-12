import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  //form handlers
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { handleRegister } = useAuth()

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    handleRegister(username, email, password)
      .then((res) => {
        console.log(res)
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