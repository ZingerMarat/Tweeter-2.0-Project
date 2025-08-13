import React, { useEffect } from "react"
import { NavLink } from "react-router"
import { supabase } from "../lib/supabaseClient.js"
import { useState } from "react"

const NavBar = () => {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.log(err)
      } else {
        setAuth(true)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Ошибка выхода:", error.message)
    } else {
      setAuth(false)
    }
  }

  return (
    <nav className="navbar">
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/user">User</NavLink>
      </div>

      {auth ? (
        <div
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            padding: "5px 10px",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Logout
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  )
}

export default NavBar
