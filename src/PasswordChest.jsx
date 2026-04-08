import React, { useState } from 'react'

function scorePassword(pw) {
  let score = 0
  if (pw.length >= 8) score += 1
  if (pw.length >= 12) score += 1
  if (/[A-Z]/.test(pw)) score += 1
  if (/[a-z]/.test(pw)) score += 1
  if (/[0-9]/.test(pw)) score += 1
  if (/[^A-Za-z0-9]/.test(pw)) score += 1
  return score // 0-6
}

const strengthLabel = (s) => {
  if (s >= 5) return 'Excellent'
  if (s >= 4) return 'Strong'
  if (s >= 3) return 'Fair'
  if (s >= 1) return 'Weak'
  return 'Very Weak'
}

export default function PasswordChest({ onExit }) {
  const [pw, setPw] = useState('')
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const handleChange = (e) => {
    const v = e.target.value
    setPw(v)
    setScore(scorePassword(v))
  }

  const handleUnlock = () => {
    if (unlocked) return
    setAttempts((a) => a + 1)
    if (score >= 4) {
      setUnlocked(true)
      setFeedback({ ok: true, text: 'Chest unlocked!' })
    } else {
      setFeedback({ ok: false, text: 'Password too weak' })
    }
    setTimeout(() => setFeedback(null), 1200)
  }

  const reset = () => {
    setPw('')
    setScore(0)
    setAttempts(0)
    setUnlocked(false)
    setFeedback(null)
  }

  return (
    <div className="chest-root">
      <header className="chest-header">
        <h2>🔐 Password Chest</h2>
        <div className="hud">Attempts: {attempts}</div>
      </header>

      <div className="chest-area">
        <div className={`chest ${unlocked ? 'open' : ''}`} aria-hidden>
          <div className="lid" />
          <div className="body">{unlocked ? '🎉' : '🔒'}</div>
        </div>

        <div className="chest-controls">
          <label className="field">
            <div className="label">Set password for the chest</div>
            <input type="password" value={pw} onChange={handleChange} placeholder="Type a strong password" />
          </label>

          <div className="strength">
            <div className="strength-bar" style={{ '--w': `${(score / 6) * 100}%`, '--c': score >= 5 ? '#22c55e' : score >= 4 ? '#60a5fa' : score >= 3 ? '#f59e0b' : '#ef4444' }} />
            <div className="strength-label">{strengthLabel(score)}</div>
          </div>

          <div className="chest-actions">
            <button className="big-btn keep" onClick={handleUnlock} disabled={unlocked}>Lock/Unlock</button>
            <button className="footer-btn" onClick={reset}>Reset</button>
            <button className="footer-btn" onClick={onExit}>Exit</button>
          </div>

          {feedback && <div className={`phish-feedback ${feedback.ok ? 'ok' : 'bad'}`}>{feedback.text}</div>}
        </div>
      </div>
    </div>
  )
}
