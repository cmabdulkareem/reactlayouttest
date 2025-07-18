// to check if the user is logged in or not everytime page is reloaded
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()
// auth context is used to create context to provide to all the components

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3000/userInfo', { withCredentials: true })
            // withCredentials: true is used to send the cookie to the server
            // this is used to check if the user is logged in or not on every page reload
            .then((res) => {
                setIsLoggedIn(true)
                setIsAdmin(res.data.role == 'admin')
            })
            .catch((err) => {
                setIsLoggedIn(false)
                setIsAdmin(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    const login = (role) => {
        setIsLoggedIn(true)
        setIsAdmin(role == 'admin')
    }

    useEffect(()=>{
        console.log(isLoggedIn)
    }, [isLoggedIn])
    // purpose of this function is to login the user
    // this can be consumed by the login component

    const logout = () => {
        setIsLoggedIn(false)
        setIsAdmin(false)
    }
    // purpose of this function is to logout the user
    // this can be consumed by the logout component or the button

    return (
        <AuthContext.Provider value={{login, logout, isLoggedIn, isAdmin, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
export { AuthContext }
