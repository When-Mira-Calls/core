import React, { useState } from 'react'
import strongboxClosed from '../assets/Strongbox - closed.png'
import strongboxOpen from '../assets/Strongbox - open.png'

// phase 0 — closed strongbox
// phase 1 — open strongbox, card slides up
// phase 2 — card prominent, tap to continue

export default function StrongboxCardScene({ onComplete }) {
  const [phase, setPhase] = useState(0)

  const handleTap = () => {
    if (phase === 0) setPhase(1)
    else if (phase === 1) setPhase(2)
    else onComplete()
  }

  return (
    <div className="sbcard-root" onClick={handleTap}>
      <div className={`sbcard-box-wrap${phase >= 1 ? ' sbcard-box-wrap--open' : ''}`}>
        <img
          src={phase >= 1 ? strongboxOpen : strongboxClosed}
          alt=""
          className="sbcard-box-img"
        />

        {/* Card emerges from the open box */}
        <div className={`sbcard-card${phase >= 1 ? ' sbcard-card--visible' : ''}${phase >= 2 ? ' sbcard-card--prominent' : ''}`}>
          <div className="sbcard-card-inner">
            <div className="sbcard-card-stripe" />
            <div className="sbcard-card-chip" />
            <div className="sbcard-card-lines">
              <div className="sbcard-card-line" />
              <div className="sbcard-card-line sbcard-card-line--short" />
            </div>
            <div className="sbcard-card-label">MFA CARD</div>
          </div>
        </div>
      </div>

      <div className="sbcard-hint">
        {phase === 0 ? 'tap to open' : phase === 1 ? 'tap to reveal' : 'tap to continue'}
      </div>
    </div>
  )
}
