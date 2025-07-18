import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function UserRoutes(props) {
    const {isLoggedIn} = useContext(AuthContext)

  return (
      isLoggedIn ? (props.children)
      :
      (<Navigate to="/login" />)
  )
}

export default UserRoutes
