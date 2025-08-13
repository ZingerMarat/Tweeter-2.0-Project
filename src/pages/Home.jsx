import React, { useEffect } from "react"
import TweetBox from "../components/TweetBox.jsx"
import { supabase } from "../lib/supabaseClient.js"
import { useNavigate } from "react-router"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        navigate("/login")
      }
    }

    checkAuth()
  }, [navigate])

  return <TweetBox />
}

export default Home
