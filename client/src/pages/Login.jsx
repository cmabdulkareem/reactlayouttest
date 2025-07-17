import React, {useState, useContext, useEffect} from 'react'
import Footer from '../partials/Footer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

function Login() {

  const {login, logout, isLoggedIn, isAdmin, loading} = useContext(AuthContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e){
    e.preventDefault()
    axios.post('http://localhost:3000/login', {email, password}, {withCredentials: true})
      .then((res)=>{
        toast.success(res.data.message)
        login(res.data.role)
        navigate('/')
      })
      .catch((err)=>{
        toast.error(err.response.data)
      })
  }

  useEffect(()=>{
    console.log({login, logout, isLoggedIn, isAdmin, loading})
    if(isLoggedIn){
      navigate('/')
    }
  }, [isLoggedIn])

  return (
    <div>
      <ToastContainer />
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label><br />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Password:</label><br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
