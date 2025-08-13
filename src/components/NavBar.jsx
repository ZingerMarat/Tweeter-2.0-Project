import React from "react"
import { NavLink } from "react-router"

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/user">User</NavLink>
    </nav>
  )
}

export default NavBar
