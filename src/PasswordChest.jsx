import React, { useState } from 'react'

function scorePassword(pw) {
  let score = 0
  if (pw.length >= 8) score += 1
  if (pw.length >= 14) score += 1
  if (/[A-Z]/.test(pw)) score += 1
  if (/[a-z]/.test(pw)) score += 1
  if (/[0-9]/.test(pw)) score += 1
  if (/[^A-Za-z0-9]/.test(pw)) score += 1
  return score // 0–6
}

const strengthLabel = (s) => {
  if (s >= 5) return { label: 'Excellent', color: '#2dd4bf' }
  if (s >= 4) return { label: 'Strong', color: '#4ade80' }
  if (s >= 3) return { label: 'Fair', color: '#f59e0b' }
  if (s >= 1) return { label: 'Weak', color: '#f97316' }
  return { label: 'Very Weak', color: '#ef4444' }
}

const rules = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'At least 14 characters', test: (pw) => pw.length >= 14 },
  { label: 'Uppercase letter (A–Z)', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'Lowercase letter (a–z)', test: (pw) => /[a-z]/.test(pw) },
  { label: 'Number (0–9)', test: (pw) => /[0-9]/.test(pw) },
  { label: 'Special character (!@#$…)', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
]

export default function PasswordChest({ onExit }) {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const score = scorePassword(pw)
  const { label: strengthText, color: strengthColor } = strengthLabel(score)

  const handleChange = (e) => {
    setPw(e.target.value)
    if (unlocked) setUnlocked(false)
  }

  const handleUnlock = () => {
    if (unlocked) return
    setAttempts((a) => a + 1)
    if (score >= 4) {
      setUnlocked(true)
      setFeedback({ ok: true, text: 'Strongbox unlocked! The files are protected.' })
    } else {
      setFeedback({ ok: false, text: 'Password too weak - the Shadow Man could crack this.' })
    }
    setTimeout(() => setFeedback(null), 2000)
  }

  const reset = () => {
    setPw('')
    setAttempts(0)
    setUnlocked(false)
    setFeedback(null)
    setShow(false)
  }

  return (
    <div className="chest-root">
      <header className="chest-header">
        <h2>Observatory Strongbox</h2>
        <div className="chest-hud">Attempts: {attempts}</div>
      </header>

      <div className="chest-narrative">
        A locked strongbox sits on the observatory desk. Inside is everything we know about the Shadow Man - his methods, his targets, his next move. The information is only as safe as the password protecting it. Set a password strong enough that no one can break through.
      </div>

      <div className="chest-area">
        <div className={`chest ${unlocked ? 'open' : ''}`} aria-hidden>
          <div className="chest-icon">{unlocked ? '🔓' : '🔒'}</div>
          <div className="chest-status">{unlocked ? 'Unlocked' : 'Locked'}</div>
        </div>

        <div className="chest-controls">
          <label className="chest-field">
            <div className="chest-field-label">Set a password for the strongbox</div>
            <div className="chest-input-wrap">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={handleChange}
                placeholder="Type a strong password…"
                className="chest-input"
              />
              <button
                className="chest-show-btn"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {show ? '🙈' : '👁'}
              </button>
            </div>
          </label>

          <div className="chest-strength-bar-wrap">
            <div
              className="chest-strength-bar"
              style={{ '--w': `${(score / 6) * 100}%`, '--c': strengthColor }}
            />
            <div className="chest-strength-label" style={{ color: strengthColor }}>{pw.length > 0 ? strengthText : 'Enter a password'}</div>
          </div>

          <ul className="chest-rules">
            {rules.map((r, i) => {
              const passed = pw.length > 0 && r.test(pw)
              return (
                <li key={i} className={`chest-rule ${passed ? 'passed' : ''}`}>
                  <span className="chest-rule-icon">{passed ? '✓' : '○'}</span>
                  {r.label}
                </li>
              )
            })}
          </ul>

          <div className="chest-actions">
            <button className="big-btn keep" onClick={handleUnlock} disabled={unlocked || pw.length === 0}>
              {unlocked ? 'Unlocked' : 'Lock Strongbox'}
            </button>
            <button className="footer-btn" onClick={reset}>Reset</button>
            <button className="footer-btn" onClick={onExit}>← Back</button>
          </div>

          {feedback && (
            <div className={`chest-feedback ${feedback.ok ? 'ok' : 'bad'}`}>{feedback.text}</div>
          )}
        </div>
      </div>

      <div className="chest-tip">
        <strong>Tip:</strong> A strong password is long, mixes character types, and never uses your name, birthday, or common words. The Shadow Man knows all the usual tricks.
      </div>
    </div>
  )
}
