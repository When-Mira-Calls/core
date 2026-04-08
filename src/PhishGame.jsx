import React, { useState, useRef, useEffect } from 'react'

const sampleMessages = [
  { id: 1, from: 'admin@company.com', subject: 'Password reset required', body: 'Please click the link to reset your password.', phishing: true },
  { id: 2, from: 'friend@example.com', subject: 'Lunch tomorrow?', body: 'Want to meet for lunch?', phishing: false },
  { id: 3, from: 'security@bank.com', subject: 'Unusual login detected', body: 'Confirm your account immediately.', phishing: true },
  { id: 4, from: 'newsletter@shop.com', subject: 'Sale this week', body: 'Don\'t miss our sale!', phishing: false },
]

export default function PhishGame({ onExit }) {
  const [cards, setCards] = useState(sampleMessages)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [dropTarget, setDropTarget] = useState(null) // 'keep' | 'junk' | null
  const [feedback, setFeedback] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const total = sampleMessages.length

  const dragItem = useRef(null)

  const onDragStart = (e, index) => {
    dragItem.current = index
    e.dataTransfer.setData('text/plain', index)
  }

  const decide = (keep, explicitIdx) => {
    if (finished) return
    const idx = (typeof explicitIdx === 'number') ? explicitIdx : currentIndex
    const card = cards[idx]
    if (!card) return
    const correct = (keep && !card.phishing) || (!keep && card.phishing)
    if (correct) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 900)
    }
    setScore((s) => {
      const ns = s + (correct ? 1 : 0)
      if (ns >= total) setFinished(true)
      return ns
    })
    setCompleted((c) => c + 1)
    setCards((arr) => {
      const next = arr.filter((_, i) => i !== idx)
      setCurrentIndex((ci) => Math.min(ci, Math.max(0, next.length - 1)))
      return next
    })
    setFeedback({ ok: correct, text: correct ? 'Nice!' : 'Oops' })
    setTimeout(() => setFeedback(null), 1100)
  }

  const onDrop = (e, keep) => {
    e.preventDefault()
    setDropTarget(null)
    const data = e.dataTransfer && e.dataTransfer.getData ? e.dataTransfer.getData('text/plain') : ''
    const idx = data ? Number(data) : currentIndex
    decide(keep, idx)
  }

  const onDragEnter = (e, which) => {
    e.preventDefault()
    setDropTarget(which)
  }

  const onDragLeave = (e) => {
    setDropTarget(null)
  }

  const allow = (e) => { e.preventDefault() }

  const reset = () => {
    setCards(sampleMessages)
    setScore(0)
    setCompleted(0)
    setCurrentIndex(0)
  setFinished(false)
  }

  const percent = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="phish-root phish-game-bg">
      <header className="phish-header">
        <div className="phish-title">🛡️ Inbox Defender</div>
        <div className="phish-hud">
          <div className="score-badge">Score <strong>{score}</strong></div>
          <div className="progress">{completed} / {sampleMessages.length}</div>
        </div>
      </header>

      <div className="phish-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <div className="fill" style={{ width: `${Math.min(100, percent)}%` }} />
      </div>

      {feedback && (
        <div className={`phish-feedback ${feedback.ok ? 'ok' : 'bad'}`}>{feedback.text}</div>
      )}

      {showConfetti && (
        <div className="confetti">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="confetti-piece" style={{ '--i': (i + 1) }} />
          ))}
        </div>
      )}

      <div className="frame">
        <div className="frame-inner">
          <div className="frame-content">
            <div className="phish-area single">
              <div className="inbox single">
                {/* decorative paper burst that flies when a new message appears */}
                {cards.length > 0 && (
                  <div className="paper-burst" aria-hidden>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="paper" style={{ ['--i']: i, ['--d']: `${i * 70}ms` }} />
                    ))}
                  </div>
                )}

                {cards.length > 0 ? (
                  (() => {
                    const m = cards[currentIndex]
                    return (
                      <div
                        key={m.id}
                        draggable={!finished}
                        onDragStart={(e) => onDragStart(e, currentIndex)}
                        className={`mail-card fancy ${m.phishing ? 'sus' : 'ok'}`}
                      >
                        <div className="mail-top">
                          <div className="avatar">{m.from.charAt(0).toUpperCase()}</div>
                          <div className="meta">
                            <div className="from">{m.from}</div>
                            <div className="subject">{m.subject}</div>
                          </div>
                          {m.phishing && <div className="sus-pill">Suspicious</div>}
                        </div>
                        <div className="body">{m.body}</div>
                      </div>
                    )
                  })()
                ) : (
                  <div className="empty">No more messages</div>
                )}
              </div>

              <div className="decision-row">
                <button className="big-btn keep" onClick={() => decide(true)} aria-label="Keep" disabled={finished}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Keep
                </button>
                <button className="big-btn junk" onClick={() => decide(false)} aria-label="Junk" disabled={finished}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m6 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Junk
                </button>
              </div>

              <div className="phish-footer">
                <div className="score-info">
                  <span className="accuracy">Accuracy: <strong>{completed > 0 ? Math.round((score / completed) * 100) : 0}%</strong></span>
                </div>
                <div className="footer-actions">
                  <button className="footer-btn exit-btn" onClick={onExit} aria-label="Exit">← Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {finished && (
        <div className="phish-complete" role="dialog" aria-modal="true">
          <h3>Inbox Secured</h3>
          <p>You correctly identified all threats — great job!</p>
          <div className="complete-actions">
            <button className="big-btn keep" onClick={() => { reset(); }} aria-label="Play again">Play again</button>
            <button className="big-btn junk" onClick={onExit} aria-label="Exit">Exit</button>
          </div>
        </div>
      )}
    </div>
  )
}
