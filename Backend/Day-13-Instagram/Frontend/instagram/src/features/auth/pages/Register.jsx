import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'

const Register = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <input type="text" name="Email" placeholder='Enter your email' />
          <input type="text" name="username" placeholder='Enter username' />
          <input type="text" name="password" placeholder='Enter your password' />
          <button>Register</button>
        </form>
        <p>Alredy have an account?<Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register