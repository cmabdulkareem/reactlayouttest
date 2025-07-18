import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function AdminRoutes(props) {
  const { isLoggedIn, isAdmin, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // or your spinner
  }

  return isLoggedIn ? (
    isAdmin ? props.children : <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
}


export default AdminRoutes
