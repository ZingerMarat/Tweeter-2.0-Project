import { useState, useMemo } from "react"

const MAX_LEN = 140

function TweetBox() {
  const [text, setText] = useState("")
  const [tweets, setTweets] = useState(localStorage.getItem("tweets") ? JSON.parse(localStorage.getItem("tweets")) : [])
  const [userName, setUserName] = useState("Zinger")

  const overLimit = text.length > MAX_LEN
  const disabled = overLimit || text.trim() === ""
  const counter = useMemo(() => `${text.length}/${MAX_LEN}`, [text])

  const handleTweet = () => {
    if (disabled) return
    const t = { text: text.trim(), time: new Date().toISOString() }

    //save to local storage
    localStorage.setItem("tweets", JSON.stringify([t, ...tweets]))
    setTweets((prev) => [t, ...prev])
    setText("")
  }

  return (
    <div className="tweet-box-container">
      <div className="tweet-box">
        <textarea className="tweet-input" placeholder="How are you feeling?" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="tweet-button" onClick={handleTweet} disabled={disabled}>
          Tweet
        </button>
      </div>

      <div className="tweet-list">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="tweet">
            <div className="tweet-header">
              <span className="tweet-owner">{userName}</span>
              <span className="tweet-time">{tweet.time}</span>
            </div>
            <p className="tweet-text">{tweet.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TweetBox
