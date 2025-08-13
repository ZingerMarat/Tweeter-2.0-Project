import { useState } from "react"
import "./App.css"
import Home from "./pages/Home.jsx"
import User from "./pages/User.jsx"
import LogIn from "./pages/Login.jsx"
import NavBar from "./components/NavBar.jsx"
import { BrowserRouter, Route, Routes } from "react-router"
import { UserContext } from "./context/UserContext.jsx"
import { TweetsContext } from "./context/TweetsContext.jsx"
import RequireAuth from "./auth/RequireAuth.jsx"
import { AuthProvider } from "./auth/AuthProvider.jsx"

function App() {
  const [userName, setUserName] = useState(null)
  const [tweets, setTweets] = useState(null)

  return (
    <>
      <AuthProvider>
        <UserContext value={{ userName, setUserName }}>
          <TweetsContext value={{ tweets, setTweets }}>
            <BrowserRouter basename="/Tweeter-2.0-Project/">
              <NavBar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/user"
                  element={
                    <RequireAuth>
                      <User />
                    </RequireAuth>
                  }
                />
                <Route path="/login" element={<LogIn />} />
              </Routes>
            </BrowserRouter>
          </TweetsContext>
        </UserContext>
      </AuthProvider>
    </>
  )
}

export default App
