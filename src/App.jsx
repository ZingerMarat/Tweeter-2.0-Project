import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { Textarea, Button } from "@mantine/core"
import TweetBox from "./components/TweetBox.jsx"
import Home from "./pages/Home.jsx"
import User from "./pages/User.jsx"
import NavBar from "./components/NavBar.jsx"
import { BrowserRouter, Route, Routes } from "react-router"
import { UserContext } from "./context/UserContext.jsx"
import { TweetsContext } from "./context/TweetsContext.jsx"

function App() {
  const [userName, setUserName] = useState("marat_zinger")
  const [tweets, setTweets] = useState(null)

  return (
    <>
      <UserContext value={{ userName, setUserName }}>
        <TweetsContext value={{ tweets, setTweets }}>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </BrowserRouter>
        </TweetsContext>
      </UserContext>
    </>
  )
}

export default App
