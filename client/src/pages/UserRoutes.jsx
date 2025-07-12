import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function UserRoutes(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div>
      {isLoggedIn ? (props.children)
      :
      (<Navigate to="/login" />)}
    </div>
  )
}

export default UserRoutes
