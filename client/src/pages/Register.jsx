import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let res = await axios.post('http://localhost:3000/register', {name, email, password})
      toast.success(res.data)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className="container">
      <div className="row  vh-100 justify-content-center align-items-center">
        <ToastContainer />
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
