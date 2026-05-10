import React, { useState } from 'react'

const sampleTexts = [
  {
    id: 1,
    type: 'SMS',
    from: 'Sunshare Academy IT',
    subject: 'Text Message',
    body: 'URGENT: Your child enrollment record at Sunshare Academy is incomplete. Verify identity immediately at sunshare-enroll.net or access will be removed within 24 hours.',
    suspiciousWords: ['URGENT', 'incomplete', 'Verify', 'identity', 'immediately', 'sunshare-enroll.net', 'removed', 'within'],
    explanation: 'Schools contact families through official channels, not unsolicited texts. The link domain is fake.',
  },
  {
    id: 2,
    type: 'Email',
    from: 'office@sunshareacademy.edu',
    subject: 'Parent-Teacher Conference - Thursday, April 17th',
    body: 'Dear Sunshare Academy families, this is a reminder that parent-teacher conferences are scheduled for Thursday, April 17th from 4pm to 7pm. Please sign up for a time slot through the Student Portal. We look forward to meeting with you.',
    suspiciousWords: [],
    explanation: 'This email comes from the official school domain, contains no links, and makes no urgent demands.',
  },
  {
    id: 3,
    type: 'Email',
    from: 'security@seabright-verify.net',
    subject: 'Action Required: Confirm Your Identity',
    body: 'Dear valued customer, we have detected suspicious login activity on your Seabright Bank account. Your account is at risk. Confirm your personal details and account PIN immediately by clicking the link below to avoid permanent suspension.',
    suspiciousWords: ['suspicious', 'at', 'risk', 'personal', 'details', 'account', 'PIN', 'immediately', 'clicking', 'permanent', 'suspension'],
    explanation: 'Banks never ask for your PIN by email. The domain is fake and the language is designed to create panic.',
  },
  {
    id: 4,
    type: 'SMS',
    from: '+1-888-WIN-4455',
    subject: 'Text Message',
    body: 'Congratulations! You have won the Seabright Community Raffle. Claim your $750 prize now by replying with your full name, address, and date of birth before the offer expires tonight.',
    suspiciousWords: ['Congratulations', 'won', 'Raffle', 'Claim', 'prize', 'now', 'replying', 'full', 'name', 'address', 'date', 'of', 'birth', 'expires', 'tonight'],
    explanation: 'Legitimate prizes do not ask for your personal information over SMS. This is a classic social engineering trap.',
  },
]

export default function TextAnalyzer({ onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [finished, setFinished] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [selected, setSelected] = useState(new Set())
  const [confetti, setConfetti] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const total = sampleTexts.length
  const currentText = sampleTexts[currentIndex]
  const words = currentText.body.split(/\s+/)
  const suspiciousWordsSet = new Set(currentText.suspiciousWords)

  const handleWordClick = (word) => {
    if (finished || showExplanation) return
    const clean = word.replace(/[^\w\-.]/g, '')
    const ns = new Set(selected)
    if (ns.has(clean)) ns.delete(clean)
    else ns.add(clean)
    setSelected(ns)
  }

  const handleSubmit = () => {
    if (finished || showExplanation) return

    let correct = 0
    let incorrect = 0
    suspiciousWordsSet.forEach((w) => { if (selected.has(w)) correct++ })
    selected.forEach((w) => { if (!suspiciousWordsSet.has(w)) incorrect++ })

    const isCorrect = correct === suspiciousWordsSet.size && incorrect === 0
    const isSafe = suspiciousWordsSet.size === 0 && selected.size === 0

    const earned = isCorrect || isSafe ? 1 : 0
    if (earned) {
      setConfetti(true)
      setTimeout(() => setConfetti(false), 900)
    }

    setScore((s) => s + earned)
    setCompleted((c) => c + 1)
    setFeedback({ ok: !!earned, text: earned ? 'Well spotted!' : 'Not quite - see the explanation below.' })
    setShowExplanation(true)
    setTimeout(() => setFeedback(null), 1800)
  }

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelected(new Set())
      setShowExplanation(false)
    } else {
      setFinished(true)
    }
  }

  const reset = () => {
    setCurrentIndex(0)
    setScore(0)
    setCompleted(0)
    setFinished(false)
    setSelected(new Set())
    setShowExplanation(false)
    setFeedback(null)
  }

  const percent = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="analyzer-root analyzer-game-bg">
      <header className="analyzer-header">
        <div className="analyzer-title">Signal Decoder</div>
        <div className="analyzer-hud">
          <div className="score-badge">Score <strong>{score}</strong></div>
          <div className="progress">{completed} / {total}</div>
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
          <div className="analyzer-msg-meta">
            <span className="analyzer-type-pill">{currentText.type}</span>
            <span className="analyzer-from">{currentText.from}</span>
          </div>

          <h2 className="text-subject">{currentText.subject}</h2>

          <div className="text-body">
            {words.map((word, idx) => {
              const clean = word.replace(/[^\w\-.]/g, '')
              const isSuspicious = suspiciousWordsSet.has(clean)
              const isSelected = selected.has(clean)
              const isRevealed = showExplanation && isSuspicious
              return (
                <span
                  key={idx}
                  className={`word ${isSelected ? 'selected' : ''} ${isRevealed ? 'revealed-suspicious' : ''}`}
                  onClick={() => handleWordClick(word)}
                >
                  {word}{' '}
                </span>
              )
            })}
          </div>

          {!showExplanation && (
            <div className="analyzer-instruction">
              {suspiciousWordsSet.size > 0
                ? 'Tap the words and phrases that are red flags for phishing or social engineering.'
                : 'Read carefully - tap any words that seem suspicious, then submit.'}
            </div>
          )}

          {showExplanation && (
            <div className="analyzer-explanation">
              <strong>Explanation:</strong> {currentText.explanation}
            </div>
          )}

          <div className="analyzer-actions">
            {!showExplanation ? (
              <button className="big-btn keep" onClick={handleSubmit} disabled={finished}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Submit
              </button>
            ) : (
              <button className="big-btn keep" onClick={handleNext}>
                {currentIndex < total - 1 ? 'Next Message →' : 'See Results →'}
              </button>
            )}
          </div>

          <div className="analyzer-footer">
            <div className="accuracy">Accuracy: <strong>{completed > 0 ? Math.round((score / completed) * 100) : 0}%</strong></div>
            <button className="footer-btn exit-btn" onClick={onExit}>← Back</button>
          </div>
        </div>
      </div>

      {finished && (
        <div className="analyzer-complete" role="dialog" aria-modal="true">
          <h3>Decoding Complete</h3>
          <p>You analyzed all {total} messages and scored <strong>{score} / {total}</strong>. Every red flag you catch is one attack the Shadow Man loses.</p>
          <div className="complete-actions">
            <button className="big-btn keep" onClick={reset}>Try Again</button>
            <button className="big-btn junk" onClick={onExit}>Exit</button>
          </div>
        </div>
      )}
    </div>
  )
}
