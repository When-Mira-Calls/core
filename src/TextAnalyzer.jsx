import React, { useState } from 'react'

const sampleTexts = [
  {
    id: 1,
    subject: 'Urgent: Verify Your Account',
    body: 'Your account has been compromised. Click here immediately to confirm your identity and reset your password. Do not delay.',
    suspiciousWords: ['Urgent', 'Click', 'here', 'immediately', 'Do', 'not', 'delay'],
  },
  {
    id: 2,
    subject: 'Meeting Tomorrow at 2pm',
    body: 'Hi, looking forward to our meeting tomorrow at 2pm in the conference room. See you then!',
    suspiciousWords: [],
  },
  {
    id: 3,
    subject: 'Congratulations! You Won!',
    body: 'You have won a $10,000 prize! Claim your reward by clicking the link below. Act now before it expires.',
    suspiciousWords: ['Congratulations', 'won', 'prize', 'Claim', 'reward', 'link', 'Act', 'now', 'expires'],
  },
  {
    id: 4,
    subject: 'Invoice #12345',
    body: 'Please find attached your invoice for services rendered. If you have any questions, contact us.',
    suspiciousWords: [],
  },
]

export default function TextAnalyzer({ onExit }) {
  const [texts, setTexts] = useState(sampleTexts)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [selected, setSelected] = useState(new Set())
  const [confetti, setConfetti] = useState(false)

  const total = sampleTexts.length

  const currentText = texts[currentIndex]
  
  // Parse body into words
  const words = currentText.body.split(/\s+/)
  const suspiciousWordsSet = new Set(currentText.suspiciousWords)

  const handleWordClick = (word) => {
    if (finished) return
    const cleanWord = word.replace(/[^\w]/g, '') // remove punctuation for comparison
    const ns = new Set(selected)
    if (ns.has(cleanWord)) ns.delete(cleanWord)
    else ns.add(cleanWord)
    setSelected(ns)
  }

  const handleSubmit = () => {
    if (finished) return

    // Count correct and incorrect
    let correct = 0
    let incorrect = 0
    suspiciousWordsSet.forEach((word) => {
      if (selected.has(word)) correct++
      else incorrect++
    })
    selected.forEach((word) => {
      if (!suspiciousWordsSet.has(word)) incorrect++
    })

    // Score: all correct and nothing wrong = 1 point
    const isCorrect = correct === suspiciousWordsSet.size && incorrect === 0
    if (isCorrect) {
      setConfetti(true)
      setTimeout(() => setConfetti(false), 900)
    }

    setScore((s) => {
      const ns = s + (isCorrect ? 1 : 0)
      if (ns >= total) setFinished(true)
      return ns
    })
    setCompleted((c) => c + 1)

    // Move to next text
    if (currentIndex < texts.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelected(new Set())
    } else {
      setFinished(true)
    }

    setFeedback({ ok: isCorrect, text: isCorrect ? 'Perfect!' : 'Try again' })
    setTimeout(() => setFeedback(null), 1100)
  }

  const reset = () => {
    setTexts(sampleTexts)
    setScore(0)
    setCompleted(0)
    setCurrentIndex(0)
    setFinished(false)
    setSelected(new Set())
  }

  const percent = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="analyzer-root analyzer-game-bg">
      <header className="analyzer-header">
        <div className="analyzer-title">🔍 Text Detective</div>
        <div className="analyzer-hud">
          <div className="score-badge">Score <strong>{score}</strong></div>
          <div className="progress">{completed} / {sampleTexts.length}</div>
        </div>
      </header>

      <div className="analyzer-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <div className="fill" style={{ width: `${Math.min(100, percent)}%` }} />
      </div>

      {feedback && (
        <div className={`analyzer-feedback ${feedback.ok ? 'ok' : 'bad'}`}>{feedback.text}</div>
      )}

      {confetti && (
        <div className="confetti">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="confetti-piece" style={{ '--i': (i + 1) }} />
          ))}
        </div>
      )}

      <div className="analyzer-container">
        <div className="analyzer-content">
          <h2 className="text-subject">{currentText.subject}</h2>

          <div className="text-body">
            {words.map((word, idx) => {
              const cleanWord = word.replace(/[^\w]/g, '')
              const isSuspicious = suspiciousWordsSet.has(cleanWord)
              const isSelected = selected.has(cleanWord)
              return (
                <span
                  key={idx}
                  className={`word ${isSelected ? 'selected' : ''} ${isSuspicious ? 'suspicious-word' : ''}`}
                  onClick={() => handleWordClick(word)}
                >
                  {word}
                </span>
              )
            })}
          </div>

          <div className="analyzer-instruction">
            Click on suspicious phrases and words that seem phishing-related
          </div>

          <div className="analyzer-actions">
            <button className="big-btn keep" onClick={handleSubmit} disabled={finished}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Submit
            </button>
          </div>

          <div className="analyzer-footer">
            <div className="accuracy">Accuracy: <strong>{completed > 0 ? Math.round((score / completed) * 100) : 0}%</strong></div>
            <button className="footer-btn exit-btn" onClick={onExit}>← Back</button>
          </div>
        </div>
      </div>

      {finished && (
        <div className="analyzer-complete" role="dialog" aria-modal="true">
          <h3>Text Detective Complete</h3>
          <p>You identified all suspicious text patterns — expert level!</p>
          <div className="complete-actions">
            <button className="big-btn keep" onClick={reset}>Play again</button>
            <button className="big-btn junk" onClick={onExit}>Exit</button>
          </div>
        </div>
      )}
    </div>
  )
}
