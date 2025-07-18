import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function UserRoutes(props) {

  const { isLoggedIn, isAdmin, loading } = useContext(AuthContext);
  console.log(isLoggedIn, isAdmin, loading)

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    isLoggedIn ? (props.children)
      :
      (<Navigate to="/login" />)
  )
}

export default UserRoutes
