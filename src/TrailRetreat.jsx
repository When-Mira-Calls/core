import React, { useState, useEffect } from 'react'
import consolScreenRed from '../assets/Consol Screen - Red.png'
import shadowImg from '../assets/shadow.png'

const LOCATIONS = [
  {
    id: 'seabright',
    label: 'SEABRIGHT', x: 105, y: 298,
    textAnchor: 'start', labelX: 118, labelY: 282, numX: 118, numY: 293, num: '01',
  },
  {
    id: 'lighthouse',
    label: 'LIGHTHOUSE CLIFF', x: 210, y: 138,
    textAnchor: 'start', labelX: 223, labelY: 122, numX: 223, numY: 133, num: '02',
  },
  {
    id: 'sunshare',
    label: 'SUNSHARE SQUARE', x: 438, y: 232,
    textAnchor: 'middle', labelX: 438, labelY: 214, numX: 438, numY: 225, num: '03',
  },
  {
    id: 'observatory',
    label: 'THE OBSERVATORY', x: 648, y: 100,
    textAnchor: 'end', labelX: 634, labelY: 84, numX: 634, numY: 95, num: '04',
    isFinal: true,
  },
]

// Approximate dashoffset at which each node becomes erased from the end
// (TRAIL goes Seabright→Observatory; increasing dashoffset erases from Observatory end)
const FADE_AT = { observatory: 0, sunshare: 370, lighthouse: 740 }

const TRAIL = 'M 105,298 C 148,220 172,172 210,138 C 288,142 366,195 438,232 C 524,196 590,144 648,100'
const TRAIL_LEN = 1080

export default function TrailRetreat({ onClick }) {
  // phase 0 = initial, full trail
  // phase 1 = observatory arm erasing
  // phase 2 = sunshare erasing
  // phase 3 = lighthouse erasing, trail going still
  // phase 4 = stopped — tap to continue
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2600),
      setTimeout(() => setPhase(3), 4400),
      setTimeout(() => setPhase(4), 6000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Dashoffset increases to erase from Observatory end toward Seabright
  const dashOffset =
    phase >= 3 ? 930 :
    phase >= 2 ? 740 :
    phase >= 1 ? 370 :
    0

  // Shadow man disappears fully as trail retreats
  const shadowOpacity =
    phase >= 4 ? 0 :
    phase >= 3 ? 0.08 :
    phase >= 2 ? 0.24 :
    phase >= 1 ? 0.42 :
    0.55

  const nodeFaded = (id) => {
    const threshold = FADE_AT[id]
    if (threshold === undefined) return false // seabright never fades
    return dashOffset > threshold
  }

  return (
    <div className="trailretreat-overlay" onClick={phase >= 4 ? onClick : undefined}>
      <div className="trailmap-console-wrap">
        <img src={consolScreenRed} className="trailmap-console-img" alt="" aria-hidden="true" />

        <div className="trailmap-panel">
          <div className="trailmap-heading">
            <span className="trailmap-heading-dot" aria-hidden="true" />
            SHADOW MAN — TRAIL STATUS
            <span className={`trailmap-heading-tag trailretreat-tag${phase >= 4 ? ' trailretreat-tag--still' : ''}`}>
              {phase >= 4 ? 'STILL' : 'RETREATING'}
            </span>
          </div>

          <div className="trailmap-svg-wrap">
            <svg viewBox="0 0 760 300" className="trailmap-svg" aria-hidden="true">
              <defs>
                <radialGradient id="trbg" cx="35%" cy="65%" r="80%">
                  <stop offset="0%" stopColor="#071c18" />
                  <stop offset="100%" stopColor="#030d0a" />
                </radialGradient>
                <filter id="trglow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="trredglow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect width="760" height="300" fill="url(#trbg)" rx="3" />

              {[95, 190, 285, 380, 475, 570, 665].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="rgba(0,150,90,0.055)" strokeWidth="1" />
              ))}
              {[50, 100, 150, 200, 250].map(y => (
                <line key={y} x1="0" y1={y} x2="760" y2={y} stroke="rgba(0,150,90,0.055)" strokeWidth="1" />
              ))}

              <path d="M 0,300 L 0,195 Q 45,180 75,240 Q 105,285 155,268 Q 215,252 290,240 Q 375,228 458,218 Q 540,205 618,182 Q 688,162 740,145 L 760,140 L 760,300 Z" fill="rgba(10,30,24,0.85)" />
              <path d="M 0,300 L 0,0 L 760,0 L 760,90 Q 700,70 645,62 Q 572,76 494,110 Q 424,140 344,155 Q 262,150 204,100 Q 168,66 120,88 Q 56,116 0,195 Z" fill="rgba(6,20,16,0.65)" />
              <path d="M 0,300 L 0,278 Q 38,296 60,300 Q 42,276 50,252 Q 58,232 88,240 Q 112,250 125,270 Q 148,284 168,272 L 155,300 Z" fill="rgba(4,28,38,0.55)" />

              <ellipse cx="210" cy="138" rx="50" ry="32" fill="none" stroke="rgba(0,130,75,0.08)" strokeWidth="1" />
              <ellipse cx="210" cy="138" rx="27" ry="17" fill="none" stroke="rgba(0,130,75,0.11)" strokeWidth="1" />
              <ellipse cx="648" cy="100" rx="46" ry="28" fill="none" stroke="rgba(0,130,75,0.08)" strokeWidth="1" />
              <ellipse cx="648" cy="100" rx="25" ry="15" fill="none" stroke="rgba(0,130,75,0.11)" strokeWidth="1" />

              {/* Trail glow — fades with trail */}
              <path
                d={TRAIL}
                fill="none"
                stroke="rgba(195,30,18,0.1)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={TRAIL_LEN}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1.8s ease-in-out' }}
              />
              {/* Trail line — retreating */}
              <path
                d={TRAIL}
                fill="none"
                stroke="rgba(210,42,24,0.92)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={TRAIL_LEN}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1.8s ease-in-out' }}
              />

              {/* Nodes — fade out as trail retreats past them */}
              {LOCATIONS.map((loc) => {
                const faded = nodeFaded(loc.id)
                return (
                  <g
                    key={loc.id}
                    style={{
                      opacity: faded ? 0 : 1,
                      transition: 'opacity 1.0s ease',
                    }}
                  >
                    <circle cx={loc.x} cy={loc.y} r="18" fill={loc.isFinal ? 'rgba(210,42,24,0.09)' : 'rgba(210,42,24,0.05)'} />
                    <circle cx={loc.x} cy={loc.y} r="10" fill={loc.isFinal ? 'rgba(210,42,24,0.14)' : 'rgba(210,42,24,0.08)'} />
                    <circle cx={loc.x} cy={loc.y} r={loc.isFinal ? 6 : 4.5} fill={loc.isFinal ? 'rgba(220,45,26,1)' : 'rgba(195,38,22,0.88)'} filter={loc.isFinal ? 'url(#trredglow)' : 'url(#trglow)'} />
                    <line x1={loc.x} y1={loc.y - 5} x2={loc.labelX} y2={loc.labelY + 11} stroke="rgba(180,210,200,0.18)" strokeWidth="0.8" />
                    <text x={loc.labelX} y={loc.labelY} textAnchor={loc.textAnchor} fill="rgba(185,212,202,0.82)" fontSize="8.5" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="0.7">{loc.label}</text>
                    <text x={loc.numX} y={loc.numY} textAnchor={loc.textAnchor} fill="rgba(210,42,24,0.6)" fontSize="7.5" fontFamily="'Courier New',monospace">[{loc.num}]</text>
                  </g>
                )
              })}

              <text x="14" y="18" fill="rgba(0,155,85,0.22)" fontSize="7.5" fontFamily="'Courier New',monospace" letterSpacing="1.8">CLASSIFIED — TRAIL RECONSTRUCTION</text>
              <text x="746" y="293" textAnchor="end" fill="rgba(0,155,85,0.18)" fontSize="7.5" fontFamily="'Courier New',monospace">RESTRICTED ACCESS</text>
            </svg>

            <img
              src={shadowImg}
              alt=""
              aria-hidden="true"
              className="trailmap-shadow-fig trailmap-shadow-fig--on"
              style={{
                opacity: shadowOpacity,
                transition: 'opacity 2s ease',
                filter: phase >= 4 ? 'none' : undefined,
              }}
            />
          </div>

          {phase >= 4 && (
            <div className="smishing-continue">tap anywhere to continue</div>
          )}
        </div>
      </div>
    </div>
  )
}
