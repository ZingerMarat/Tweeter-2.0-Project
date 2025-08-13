import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserContext.jsx"
import { useNavigate } from "react-router"
import { supabase } from "../lib/supabaseClient.js"

const LogIn = () => {
  const [logUserName, setLogUserName] = useState("")
  const [logPassword, setLogPassword] = useState("")
  const { userName, setUserName } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogIn = async () => {
    console.log(logUserName)
    console.log(logPassword)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: logUserName,
      password: logPassword,
    })

    if (error) {
      console.log("Logged error:", error)
    } else {
      console.log("Logged in:", data)
      setUserName(data.user.email)
      navigate("/")
    }
    setLogUserName("")
    setLogPassword("")
  }

  return (
    <div className="tweet-box-container">
      <div className="change-user-name-form">
        <h3>Profile</h3>
        <label htmlFor="change-user-name" className="change-user-name-lable">
          User Name
        </label>
        <input id="change-user-name" className="change-user-name-input" type="text" placeholder="user name" value={logUserName} onChange={(e) => setLogUserName(e.target.value)} />

        <label htmlFor="change-user-name" className="change-user-name-lable">
          Password
        </label>
        <input id="change-user-name" className="change-user-name-input" type="text" placeholder="user password" value={logPassword} onChange={(e) => setLogPassword(e.target.value)} />
        <button className="change-user-name-btn" onClick={() => handleLogIn()}>
          LogIn
        </button>
      </div>
    </div>
  )
}

export default LogIn
