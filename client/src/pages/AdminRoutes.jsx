import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function AdminRoutes(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    
  return (
    <div>
      {isLoggedIn ? (
        isAdmin ? (
          props.children
        ) : (
          <Navigate to="/" />
        )
      )
      :
      (<Navigate to="/login" />)}
    </div>
  )
}

export default AdminRoutes
