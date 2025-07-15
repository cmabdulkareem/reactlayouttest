import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'


function Login() {

  const {isLoggedIn, isAdmin, login, logout, loading} = useContext(AuthContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

useEffect(() => {
  if (isLoggedIn) {
    navigate('/');
  }
}, [isLoggedIn]);

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let res = await axios.post('http://localhost:3000/login', {email, password}, {withCredentials: true})
      const user = res.data.user
      login(user.role)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container">
      <div className="row  vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
              <p className="text-center mt-3">
                Don't you have an account? <Link to="/register">Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
