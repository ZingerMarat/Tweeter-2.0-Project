import { useState, useMemo, useEffect, useContext } from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext.jsx"
import { TweetsContext } from "../context/TweetsContext.jsx"

import { supabase } from "../lib/supabaseClient.js"

const MAX_LEN = 140

function TweetBox() {
  const [text, setText] = useState("")

  const { tweets, setTweets } = useContext(TweetsContext)

  const { userName, setUserName } = useContext(UserContext)

  const [loading, setLoading] = useState(false)

  const overLimit = text.length > MAX_LEN
  const disabled = overLimit || text.trim() === ""

  const handleTweet = () => {
    if (disabled) return
    const t = { content: text.trim(), date: new Date().toISOString(), userName }

    //save to the server
    saveTweet(t)

    //update states
    setTweets((prev) => [t, ...prev])

    setText("")
  }

  const saveTweet = async (newTweet) => {
    try {
      const { err } = await supabase.from("tweets").insert(newTweet)
    } catch (err) {
      console.error(err)
    }
  }

  const loadTweets = async () => {
    setLoading(true)

    try {
      const { data: tweets } = await supabase.from("tweets").select()
      setTweets(tweets.sort((a, b) => new Date(b.date) - new Date(a.date)))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTweets()

    const timeOutId = setInterval(() => {
      loadTweets()
      console.log("tweets updated")
    }, 100000)

    return () => clearTimeout(timeOutId)
  }, [])

  return (
    <div className="tweet-box-container">
      <div className="tweet-box">
        <textarea className="tweet-input" placeholder="How are you feeling?" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="tweet-button" onClick={handleTweet} disabled={disabled}>
          {loading ? "Posting..." : "Tweet"}
        </button>
        {overLimit && <div className="tweet-error">{`The tweet can't contain more then ${MAX_LEN} chars`}</div>}
      </div>

      {tweets && (
        <div className="tweet-list">
          {tweets.map((tweet, index) => (
            <div key={index} className="tweet">
              <div className="tweet-header">
                <span className="tweet-owner">{tweet.userName}</span>
                <span className="tweet-time">{tweet.date}</span>
              </div>
              <p className="tweet-text">{tweet.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TweetBox
