import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()


  function handleSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:3000/register', {name, email, password})
      .then((res)=>{
        console.log(res.data.message)
        setName('')
        setEmail('')
        setPassword('')
        setTimeout(() => {
          navigate('/login')
        },3000)
      })
      .catch(err => console.log(err))
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label><br />
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} required style={{ width: '100%', padding: '8px' }}
          />
        </div>
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
        <button type="submit" style={{ padding: '10px 20px' }}>Register</button>
      </form>
    </div>
  )
}

export default Register
