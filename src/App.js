import React, {useState, useEffect} from "react"

function App() {
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(5)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  function handleChange(e) {
    const {value} = e.target
    setText(value)
  }

  function calculateWordCount(text) {
    const words = text.trim().split(" ")
    return words.filter(word => word !== "").length
  }

  useEffect(() => {
    if(isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1)
      }, 1000)
    } else if (timeRemaining <= 0) {
      endGame()
    }
  }, [timeRemaining, isTimeRunning])
  
  function startGame() {
    setIsTimeRunning(true)
    setText("")
    setTimeRemaining(5)
  }

  function endGame() {
    setWordCount(calculateWordCount(text))
    setIsTimeRunning(false)
  }

  return (
    <div>
      <h1>How fast can you type?</h1>
      <textarea onChange={handleChange} value={text}/>
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>Start</button>
      <h1>Word Count: {wordCount}</h1>
    </div>
  )
}

export default App