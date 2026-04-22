import React, { useState } from 'react'
import strongboxClosed from '../assets/Strongbox - closed.png'
import strongboxOpen from '../assets/Strongbox - open.png'
import compass from '../assets/Compass.png'
import prism from '../assets/Prism.png'
import goldenKnot from '../assets/Golden Knot.png'

const ITEMS = [
  { id: 'compass',   src: compass,    label: 'THE COMPASS'     },
  { id: 'prism',     src: prism,      label: 'THE PRISM'       },
  { id: 'knot',      src: goldenKnot, label: 'THE GOLDEN KNOT' },
]

// phase 0 — closed strongbox
// phase 1 — open strongbox (glow)
// phase 2 — all three items appear greyed; each item individually clickable
// phase 3 — transition: items + box fade, solo compass rises → onComplete

export default function StrongboxScene({ onComplete }) {
  const [phase, setPhase] = useState(0)
  const [lit, setLit] = useState(new Set()) // tracks which items have been clicked
  const allLit = lit.size === ITEMS.length

  const handleRootClick = () => {
    if (phase < 2) {
      setPhase(p => p + 1)
    } else if (phase === 2 && allLit) {
      setPhase(3)
      setTimeout(onComplete, 1100)
    }
  }

  const handleItemClick = (e, id) => {
    e.stopPropagation()
    if (phase === 2) setLit(prev => new Set([...prev, id]))
  }

  const itemsVisible = phase >= 2
  const transitioning = phase >= 3

  return (
    <div className="sbscene-root" onClick={handleRootClick}>

      {/* Strongbox — shrinks when items appear, fades out in transition */}
      <div
        className={`sbscene-box-wrap${itemsVisible ? ' sbscene-box-wrap--small' : ''}`}
        style={{ opacity: transitioning ? 0 : 1, transition: 'opacity 0.4s ease' }}
      >
        {phase >= 1 && <div className="sbscene-box-glow" />}
        <img
          src={phase >= 1 ? strongboxOpen : strongboxClosed}
          alt={phase >= 1 ? 'Open strongbox' : 'Closed strongbox'}
          className="sbscene-box-img"
        />
      </div>

      {/* Items row — slides in at phase 2, fades out in phase 3 */}
      <div
        className={`sbscene-items${itemsVisible ? ' sbscene-items--visible' : ''}`}
        style={{ opacity: transitioning ? 0 : undefined, transition: transitioning ? 'opacity 0.4s ease' : undefined }}
      >
        {ITEMS.map((item, i) => {
          const isLit = lit.has(item.id)
          return (
            <div
              key={item.id}
              className={`sbscene-item${phase === 2 && !isLit ? ' sbscene-item--clickable' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
              onClick={(e) => handleItemClick(e, item.id)}
            >
              <img
                src={item.src}
                alt={item.label}
                className={`sbscene-item-img${isLit ? ' sbscene-item-img--lit' : ''}`}
              />
              <span className={`sbscene-item-label${isLit ? ' sbscene-item-label--lit' : ''}`}>
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Solo compass — fades in during phase 3 then floats (matching ItemFocusOverlay) */}
      <div className={`sbscene-solo${transitioning ? ' sbscene-solo--visible' : ''}`}>
        <img src={compass} alt="" className="sbscene-solo-img" />
      </div>

      {/* Hint — changes once all items are lit */}
      {!transitioning && (
        <div className="sbscene-hint">
          {phase < 2
            ? (phase === 0 ? 'tap to open' : 'tap to continue')
            : allLit
              ? 'tap to continue'
              : 'tap each item'
          }
        </div>
      )}
    </div>
  )
}
