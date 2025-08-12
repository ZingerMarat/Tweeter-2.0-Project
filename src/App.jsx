import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { Textarea, Button } from "@mantine/core"
import TweetBox from "./components/TweetBox.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TweetBox />
    </>
  )
}

export default App
