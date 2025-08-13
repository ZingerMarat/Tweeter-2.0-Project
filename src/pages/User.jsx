import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext.jsx"

const User = () => {
  const [newName, setNewName] = useState("")
  const { userName, setUserName } = useContext(UserContext)

  const handleNameChange = () => {
    setUserName(newName)
    alert("Name is changed")
    setNewName("")
  }

  return (
    <div className="tweet-box-container">
      <div className="change-user-name-form">
        <h3>Profile</h3>
        <label htmlFor="change-user-name" className="change-user-name-lable">
          User Name
        </label>
        <input id="change-user-name" className="change-user-name-input" type="text" placeholder={userName} value={newName} onChange={(e) => setNewName(e.target.value)} />
        <button className="change-user-name-btn" onClick={() => handleNameChange()}>
          Save
        </button>
      </div>
    </div>
  )
}

export default User
