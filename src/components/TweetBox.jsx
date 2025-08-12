import { useState, useMemo, useEffect } from "react"
import axios from "axios"

const MAX_LEN = 140

function TweetBox() {
  const [text, setText] = useState("")
  //const [tweets, setTweets] = useState(localStorage.getItem("tweets") ? JSON.parse(localStorage.getItem("tweets")) : [])
  const [tweets, setTweets] = useState(null)
  const [userName, setUserName] = useState("marat_zinger")
  const [loading, setLoading] = useState(false)

  const overLimit = text.length > MAX_LEN
  const disabled = overLimit || text.trim() === ""
  const counter = useMemo(() => `${text.length}/${MAX_LEN}`, [text])

  const handleTweet = () => {
    if (disabled) return
    const t = { content: text.trim(), date: new Date().toISOString(), userName }

    //save to local storage
    //localStorage.setItem("tweets", JSON.stringify([t, ...tweets]))

    //save to the server
    saveTweet(t)

    //update states
    //setTweets((prev) => [t, ...prev])
    setText("")
  }

  const saveTweet = async (newTweet) => {
    try {
      const res = await axios.post(
        `https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo
`,
        newTweet
      )
      await loadTweets()
    } catch (err) {
      console.error(err)
    }
  }

  const loadTweets = async () => {
    setLoading(true)
    try {
      const res =
        await axios.get(`https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1/Tweets?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo
`)
      setTweets(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTweets()
  }, [])

  return (
    <div className="tweet-box-container">
      <div className="tweet-box">
        <textarea className="tweet-input" placeholder="How are you feeling?" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="tweet-button" onClick={handleTweet} disabled={disabled}>
          {loading ? "Posting..." : "Tweet"}
        </button>
      </div>

      {tweets && (
        <div className="tweet-list">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="tweet">
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
