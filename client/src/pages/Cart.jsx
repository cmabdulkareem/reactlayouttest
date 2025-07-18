import { useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Cart() {

  const {isLoggedIn, isAdmin, login, logout, loading} = useContext(AuthContext)
  console.log(isLoggedIn, isAdmin, loading)

  return (
    <div>
      <h1>This Cart page is Private</h1>
    </div>
  )
}

export default Cart
