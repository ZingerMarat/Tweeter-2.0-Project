import { useState, useMemo } from "react"

const MAX_LEN = 140

function TweetBox() {
  const [text, setText] = useState("")
  const [tweets, setTweets] = useState([]) // [{ id, text, time }]

  const overLimit = text.length > MAX_LEN
  const disabled = overLimit || text.trim() === ""
  const counter = useMemo(() => `${text.length}/${MAX_LEN}`, [text])

  const handleTweet = () => {
    if (disabled) return
    const t = { id: Date.now(), text: text.trim(), time: new Date().toISOString() }
    setTweets((prev) => [t, ...prev])
    setText("")
  }

  return (
    <div className="tweet-box-container">
      <div className="tweet-box">
        <textarea className="tweet-input" placeholder="Введите текст..." value={text} onChange={(e) => setText(e.target.value)} />
        <button className="tweet-button" onClick={handleTweet} disabled={disabled}>
          Tweet
        </button>
      </div>

      <div className="tweet-list">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="tweet">
            <span className="tweet-time">{new Date(tweet.time).toLocaleString()}</span>
            <p className="tweet-text">{tweet.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TweetBox
