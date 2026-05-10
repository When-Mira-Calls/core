import React, { useState } from 'react'

const sampleMessages = [
  {
    id: 1,
    from: 'admin@sunshare-acad.net',
    subject: 'Verify Your Student Account Immediately',
    body: 'Your Sunshare Academy student account has been flagged for unusual activity. To prevent suspension, confirm your login credentials using the secure link below. This must be completed within 24 hours or your access to grades and assignments will be permanently revoked.',
    phishing: true,
    redFlags: ['Wrong domain - .net, not .edu', 'Artificial 24-hour deadline', 'Threatens permanent account loss'],
  },
  {
    id: 2,
    from: 'office@sunshareacademy.edu',
    subject: 'Spring Science Fair - Project Registration Open',
    body: 'Hello Sunshare Academy families! Project registration for the Spring Science Fair is now open. Students may submit their project title and a short description through the Student Portal by April 25th. Reply to this email with any questions - we look forward to seeing your projects!',
    phishing: false,
  },
  {
    id: 3,
    from: 'security@seabright-alerts.net',
    subject: 'URGENT: Your Seabright Account Has Been Suspended',
    body: 'We detected an unauthorized login to your Seabright Bank account from an unrecognized device. Your account is temporarily suspended for your protection. To restore access immediately, verify your account number and the last 4 digits of your Social Security number at the link below.',
    phishing: true,
    redFlags: ['Wrong domain - not the official bank site', 'Requests Social Security number', 'Urgent suspension threat to create panic'],
  },
  {
    id: 4,
    from: 'priya.k@sunshareacademy.edu',
    subject: 'Study group this Saturday?',
    body: 'Hey! Are you free Saturday afternoon? Jaylen and I are heading to the library around 2pm to go over the chemistry notes before the exam next week. Let me know if you can make it - the more the merrier!',
    phishing: false,
  },
  {
    id: 5,
    from: 'awards@sunshare-spring-fund.com',
    subject: 'Congratulations - Sunshare Academy Educational Grant',
    body: 'You have been selected as a recipient of the $500 Sunshare Academy Spring Educational Grant! To claim your award, reply with your full legal name, date of birth, and student ID number within 48 hours. Failure to respond means forfeiting your grant.',
    phishing: true,
    redFlags: ['Unsolicited award you never applied for', 'Requests date of birth and student ID', 'Fake scarcity - "48 hours or you lose it"'],
  },
  {
    id: 6,
    from: 'itsupport@sunshare-edu.online',
    subject: 'Password Expires Tonight - Reset Required',
    body: 'IT Support Notice: Your Sunshare Academy account password expires at midnight tonight. Failure to reset it will lock you out of all school systems, including Gradebook and the Student Portal. Reset your password immediately using the form at the link below.',
    phishing: true,
    redFlags: ['Wrong domain - .online, not .edu', 'IT departments do not send unsolicited reset emails', 'Threatens lockout from school systems'],
  },
]

export default function PhishGame({ onExit }) {
  const [cards, setCards] = useState(sampleMessages)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const total = sampleMessages.length

  const decide = (isPhishing) => {
    if (finished || cards.length === 0) return
    const card = cards[currentIndex]
    if (!card) return
    const correct = isPhishing === card.phishing
    if (correct) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 900)
    }
    const feedbackText = correct
      ? (card.phishing ? 'Correct - that was phishing.' : 'Correct - this one is safe.')
      : (card.phishing ? 'Missed it - that was phishing.' : 'Careful - that one was actually safe.')

    setScore((s) => s + (correct ? 1 : 0))
    setCompleted((c) => c + 1)
    setCards((arr) => {
      const next = arr.filter((_, i) => i !== currentIndex)
      setCurrentIndex((ci) => Math.min(ci, Math.max(0, next.length - 1)))
      if (next.length === 0) setFinished(true)
      return next
    })
    setFeedback({ ok: correct, text: feedbackText, flags: card.phishing ? card.redFlags : null })
    setTimeout(() => setFeedback(null), 3000)
  }

  const reset = () => {
    setCards(sampleMessages)
    setScore(0)
    setCompleted(0)
    setCurrentIndex(0)
    setFinished(false)
    setFeedback(null)
  }

  const percent = total > 0 ? Math.round((score / total) * 100) : 0

  return (
    <div className="phish-root phish-game-bg">
      <header className="phish-header">
        <div className="phish-title">Inbox Defender</div>
        <div className="phish-hud">
          <div className="score-badge">Score <strong>{score}</strong></div>
          <div className="progress">{completed} / {total}</div>
        </div>
      </header>

      <div className="phish-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <div className="fill" style={{ width: `${Math.min(100, percent)}%` }} />
      </div>

      {feedback && (
        <div className={`phish-feedback ${feedback.ok ? 'ok' : 'bad'}`}>
          <div className="feedback-main">{feedback.text}</div>
          {feedback.flags && (
            <ul className="feedback-flags">
              {feedback.flags.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          )}
        </div>
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
                {cards.length > 0 ? (
                  (() => {
                    const m = cards[currentIndex]
                    return (
                      <div key={m.id} className="mail-card fancy">
                        <div className="mail-top">
                          <div className="avatar teal-avatar">{m.from.charAt(0).toUpperCase()}</div>
                          <div className="meta">
                            <div className="from">{m.from}</div>
                            <div className="subject">{m.subject}</div>
                          </div>
                        </div>
                        <div className="body">{m.body}</div>
                      </div>
                    )
                  })()
                ) : (
                  <div className="empty">All messages reviewed</div>
                )}
              </div>

              <div className="decision-row">
                <button className="big-btn junk" onClick={() => decide(true)} aria-label="Mark as Phishing" disabled={finished || cards.length === 0}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                  Phishing
                </button>
                <button className="big-btn keep" onClick={() => decide(false)} aria-label="Mark as Safe" disabled={finished || cards.length === 0}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Safe
                </button>
              </div>

              <div className="phish-footer">
                <div className="score-info">
                  <span className="accuracy">Accuracy: <strong>{completed > 0 ? Math.round((score / completed) * 100) : 0}%</strong></span>
                </div>
                <div className="footer-actions">
                  <button className="footer-btn exit-btn" onClick={onExit}>← Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {finished && (
        <div className="phish-complete" role="dialog" aria-modal="true">
          <h3>Inbox Secured</h3>
          <p>You reviewed all {total} messages and scored <strong>{score} / {total}</strong>. The more you recognize these red flags, the harder it is for attackers to fool you.</p>
          <div className="complete-actions">
            <button className="big-btn keep" onClick={reset}>Try Again</button>
            <button className="big-btn junk" onClick={onExit}>Exit</button>
          </div>
        </div>
      )}
    </div>
  )
}
