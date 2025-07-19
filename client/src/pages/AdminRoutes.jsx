import React, { useState, useContext, CSSProperties  } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ClipLoader } from "react-spinners";


function AdminRoutes(props) {

  let [color, setColor] = useState("#ffffff");


  const {isLoggedIn, isAdmin, loading} = useContext(AuthContext)

  if(loading){
    return(
        <div><ClipLoader
        color={color}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>
    )
  }

  return (
      isLoggedIn ? (
        isAdmin ? (
          props.children
        ) : (
          <Navigate to="/" />
        )
      )
      :
      (<Navigate to="/login" />)
  )
}

export default AdminRoutes
