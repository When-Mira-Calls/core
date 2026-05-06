import React, { useState } from 'react'
import { playClick, playCorrect } from './sounds'
import strongboxClosedImg from '../assets/Strongbox - closed.png'
import strongboxOpenImg   from '../assets/Strongbox - open.png'

const PERSONAL_WORDS = [
  'name','pet','cat','dog','mum','mom','dad','school','class',
  'football','soccer','minecraft','roblox','password','pass',
  'login','admin','123','abc','qwerty','iloveyou','letmein',
]
const KNOWN_PHRASES = [
  'star wars','harry potter','superman','spiderman','batman','avengers',
  'quick brown fox','to be or not','may the force','hakuna matata',
  'taylor swift','beyonce','bieber','drake','liverpool','manchester',
  'chelsea','arsenal','tottenham','pokemon','fortnite','among us',
]

function getStrength(pw) {
  const trimmed = pw.trim()
  const lower = trimmed.toLowerCase()
  const words = trimmed.split(/\s+/).filter(w => w.length > 0)
  const len = trimmed.length
  if (len === 0) return null
  if (words.length < 2) return 'few-words'
  if (PERSONAL_WORDS.some(w => lower.includes(w))) return 'personal'
  if (KNOWN_PHRASES.some(p => lower.includes(p))) return 'known-phrase'
  if (len < 12) return 'too-short'
  if (words.length >= 4 && len >= 17) return 'strong'
  return 'medium'
}

const FEEDBACK = {
  'few-words':    "Four words, not one — the length is where the strength comes from. Mira's notebook: tiger, cloud, lamp, river. Four separate random words. Try again.",
  'personal':     "That one is too close to you. The Shadow Man knows things about you. Use something completely random — words that have nothing to do with your life.",
  'known-phrase': "That one is a bit too well-known — if you have heard it, others have too. The best passphrase is one that has never been said in that combination before. Try something more unexpected.",
  'too-short':    "That is the kind of thing the Shadow Man cracks before breakfast. Longer, please.",
  'medium':       "Better. But Mira's notebook said four random words — can you go longer?",
  'strong':       "There it is. That is a knot that holds.",
}

const METER = {
  'few-words':    { pct: 15, color: '#e03030' },
  'personal':     { pct: 20, color: '#e03030' },
  'known-phrase': { pct: 20, color: '#e03030' },
  'too-short':    { pct: 32, color: '#e03030' },
  'medium':       { pct: 62, color: '#e8a020' },
  'strong':       { pct: 100, color: '#30c870' },
}

export default function StrongboxPasswordGame({ onComplete }) {
  const [pw, setPw]       = useState('')
  const [locked, setLocked] = useState(false)

  const strength = getStrength(pw)
  const meter    = strength ? METER[strength] : null
  const words    = pw.trim().split(/\s+/).filter(w => w.length > 0)
  const isStrong = strength === 'strong'

  const handleLock = () => {
    if (!isStrong || locked) return
    playCorrect()
    setLocked(true)
    setTimeout(() => { playClick(); onComplete() }, 2000)
  }

  return (
    <div className="sbpw-root">
      {/* Strongbox */}
      <div className="sbpw-box-wrap">
        <img
          src={locked ? strongboxClosedImg : strongboxOpenImg}
          alt="Strongbox"
          className={`sbpw-box-img${locked ? ' sbpw-box-img--locked' : ''}`}
        />
        {locked && <div className="sbpw-locked-badge">LOCKED</div>}
      </div>

      {!locked ? (
        <div className="sbpw-panel">
          <div className="sbpw-label">ENTER YOUR PASSPHRASE</div>

          <input
            className="sbpw-input"
            type="text"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="four random unrelated words…"
            autoComplete="off"
            spellCheck={false}
          />

          {/* Word chips — show each word as it's typed */}
          {words.length > 0 && (
            <div className="sbpw-chips-row">
              {words.map((w, i) => (
                <React.Fragment key={i}>
                  <span className={`sbpw-chip${isStrong ? ' sbpw-chip--strong' : ''}`}>{w}</span>
                  {i < words.length - 1 && (
                    <span className="sbpw-chip-sep">+</span>
                  )}
                </React.Fragment>
              ))}
              {/* Combined preview — appears once 2+ words exist */}
              {words.length >= 2 && (
                <span className={`sbpw-combined${isStrong ? ' sbpw-combined--strong' : ''}`}>
                  = {words.join('-')}
                </span>
              )}
            </div>
          )}

          {/* Strength meter */}
          <div className="sbpw-meter-track">
            <div
              className="sbpw-meter-fill"
              style={{
                width: meter ? `${meter.pct}%` : '0%',
                background: meter ? meter.color : 'transparent',
              }}
            />
          </div>

          {/* Celia feedback */}
          {strength && (
            <div className={`sbpw-feedback sbpw-feedback--${strength}`}>
              <span className="sbpw-feedback-speaker">CELIA —</span>{' '}
              {FEEDBACK[strength]}
            </div>
          )}

          {/* Lock button — only when strong */}
          {isStrong && (
            <button className="sbpw-lock-btn" onClick={handleLock}>
              LOCK IT ↗
            </button>
          )}
        </div>
      ) : (
        /* Locked state — show the sealed passphrase */
        <div className="sbpw-sealed-panel">
          <div className="sbpw-sealed-label">PASSPHRASE SEALED</div>
          <div className="sbpw-sealed-pw">{words.join('-')}</div>
          <p className="sbpw-locked-msg">The strongbox is locked. Remember your passphrase.</p>
        </div>
      )}
    </div>
  )
}
