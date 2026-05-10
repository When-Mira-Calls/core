import React, { useState, useEffect } from 'react'
import consolScreenRed from '../assets/Consol Screen - Red.png'
import shadowImg from '../assets/shadow.png'

const LOCATIONS = [
  {
    id: 'seabright',
    label: 'SEABRIGHT',
    x: 105, y: 298,
    textAnchor: 'start',
    labelX: 118, labelY: 282,
    numX: 118, numY: 293,
    num: '01',
    name: 'Seabright Harbour',
    desc: 'Phishing emails harvested harbour worker logins. First breach in the chain.',
  },
  {
    id: 'lighthouse',
    label: 'LIGHTHOUSE CLIFF',
    x: 210, y: 138,
    textAnchor: 'start',
    labelX: 223, labelY: 122,
    numX: 223, numY: 133,
    num: '02',
    name: 'Lighthouse Cliff',
    desc: 'Repeated passes - circling for weaknesses in the strongbox transfer route.',
  },
  {
    id: 'sunshare',
    label: 'SUNSHARE SQUARE',
    x: 438, y: 232,
    textAnchor: 'middle',
    labelX: 438, labelY: 214,
    numX: 438, numY: 225,
    num: '03',
    name: 'Sunshare Square',
    desc: 'Personal information collected from public profiles - names, schools, relationships.',
  },
  {
    id: 'observatory',
    label: 'THE OBSERVATORY',
    x: 648, y: 100,
    textAnchor: 'end',
    labelX: 634, labelY: 84,
    numX: 634, numY: 95,
    num: '04',
    name: 'The Observatory',
    desc: 'Final position. Arrived ahead - impostor placed inside to intercept the strongbox.',
    isFinal: true,
  },
]

const TRAIL = 'M 105,298 C 148,220 172,172 210,138 C 288,142 366,195 438,232 C 524,196 590,144 648,100'
const TRAIL_LEN = 1080

export default function TrailMap({ onClick }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="trailmap-overlay" onClick={onClick}>
      <div className="trailmap-console-wrap">
        <img src={consolScreenRed} className="trailmap-console-img" alt="" aria-hidden="true" />

        <div className="trailmap-panel">
          <div className="trailmap-heading">
            <span className="trailmap-heading-dot" aria-hidden="true" />
            SHADOW MAN - FULL TRAIL RECONSTRUCTED
            <span className="trailmap-heading-tag">CLASSIFIED</span>
          </div>

          {/* Map */}
          <div className="trailmap-svg-wrap">
            <svg viewBox="0 0 760 300" className="trailmap-svg" aria-hidden="true">
              <defs>
                <radialGradient id="tmbg" cx="35%" cy="65%" r="80%">
                  <stop offset="0%" stopColor="#071c18" />
                  <stop offset="100%" stopColor="#030d0a" />
                </radialGradient>
                <filter id="tmglow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="tmredglow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect width="760" height="300" fill="url(#tmbg)" rx="3" />

              {/* Grid */}
              {[95, 190, 285, 380, 475, 570, 665].map(x => (
                <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="rgba(0,150,90,0.055)" strokeWidth="1" />
              ))}
              {[50, 100, 150, 200, 250].map(y => (
                <line key={y} x1="0" y1={y} x2="760" y2={y} stroke="rgba(0,150,90,0.055)" strokeWidth="1" />
              ))}

              {/* Southern lowland */}
              <path d="M 0,300 L 0,195 Q 45,180 75,240 Q 105,285 155,268 Q 215,252 290,240 Q 375,228 458,218 Q 540,205 618,182 Q 688,162 740,145 L 760,140 L 760,300 Z" fill="rgba(10,30,24,0.85)" />
              {/* Northern highlands */}
              <path d="M 0,300 L 0,0 L 760,0 L 760,90 Q 700,70 645,62 Q 572,76 494,110 Q 424,140 344,155 Q 262,150 204,100 Q 168,66 120,88 Q 56,116 0,195 Z" fill="rgba(6,20,16,0.65)" />
              {/* Coastal inlet */}
              <path d="M 0,300 L 0,278 Q 38,296 60,300 Q 42,276 50,252 Q 58,232 88,240 Q 112,250 125,270 Q 148,284 168,272 L 155,300 Z" fill="rgba(4,28,38,0.55)" />

              {/* Topographic rings */}
              <ellipse cx="210" cy="138" rx="50" ry="32" fill="none" stroke="rgba(0,130,75,0.08)" strokeWidth="1" />
              <ellipse cx="210" cy="138" rx="27" ry="17" fill="none" stroke="rgba(0,130,75,0.11)" strokeWidth="1" />
              <ellipse cx="648" cy="100" rx="46" ry="28" fill="none" stroke="rgba(0,130,75,0.08)" strokeWidth="1" />
              <ellipse cx="648" cy="100" rx="25" ry="15" fill="none" stroke="rgba(0,130,75,0.11)" strokeWidth="1" />

              {/* Trail glow */}
              <path d={TRAIL} fill="none" stroke="rgba(195,30,18,0.1)" strokeWidth="16" strokeLinecap="round" />
              {/* Trail animated */}
              <path
                className={`trailmap-line${active ? ' trailmap-line--on' : ''}`}
                d={TRAIL}
                fill="none"
                stroke="rgba(210,42,24,0.92)"
                strokeWidth="2"
                strokeDasharray={TRAIL_LEN}
                strokeLinecap="round"
              />

              {/* Nodes */}
              {LOCATIONS.map((loc, i) => (
                <g key={loc.id} className={`trailmap-node${active ? ' trailmap-node--on' : ''}`} style={{ '--nd': `${0.55 + i * 0.38}s` }}>
                  <circle cx={loc.x} cy={loc.y} r="18" fill={loc.isFinal ? 'rgba(210,42,24,0.09)' : 'rgba(210,42,24,0.05)'} />
                  <circle cx={loc.x} cy={loc.y} r="10" fill={loc.isFinal ? 'rgba(210,42,24,0.14)' : 'rgba(210,42,24,0.08)'} />
                  <circle cx={loc.x} cy={loc.y} r={loc.isFinal ? 6 : 4.5} fill={loc.isFinal ? 'rgba(220,45,26,1)' : 'rgba(195,38,22,0.88)'} filter={loc.isFinal ? 'url(#tmredglow)' : 'url(#tmglow)'} />
                  <line x1={loc.x} y1={loc.y - 5} x2={loc.labelX} y2={loc.labelY + 11} stroke="rgba(180,210,200,0.18)" strokeWidth="0.8" />
                  <text x={loc.labelX} y={loc.labelY} textAnchor={loc.textAnchor} fill="rgba(185,212,202,0.82)" fontSize="8.5" fontFamily="'Courier New',monospace" fontWeight="bold" letterSpacing="0.7">{loc.label}</text>
                  <text x={loc.numX} y={loc.numY} textAnchor={loc.textAnchor} fill="rgba(210,42,24,0.6)" fontSize="7.5" fontFamily="'Courier New',monospace">[{loc.num}]</text>
                </g>
              ))}

              <text x="14" y="18" fill="rgba(0,155,85,0.22)" fontSize="7.5" fontFamily="'Courier New',monospace" letterSpacing="1.8">CLASSIFIED - TRAIL RECONSTRUCTION</text>
              <text x="746" y="293" textAnchor="end" fill="rgba(0,155,85,0.18)" fontSize="7.5" fontFamily="'Courier New',monospace">RESTRICTED ACCESS</text>
            </svg>

            {/* Shadow Man - on top of SVG, translucent ghost over Observatory */}
            <img
              src={shadowImg}
              alt=""
              aria-hidden="true"
              className={`trailmap-shadow-fig${active ? ' trailmap-shadow-fig--on' : ''}`}
            />
          </div>

          {/* Annotation cards */}
          <div className="trailmap-cards">
            {LOCATIONS.map((loc, i) => (
              <div
                key={loc.id}
                className={`trailmap-card${loc.isFinal ? ' trailmap-card--final' : ''}${active ? ' trailmap-card--on' : ''}`}
                style={{ '--cd': `${1.0 + i * 0.2}s` }}
              >
                <div className="trailmap-card-num">{loc.num}</div>
                <div className="trailmap-card-name">{loc.name}</div>
                <div className="trailmap-card-desc">{loc.desc}</div>
              </div>
            ))}
          </div>

          <div className="smishing-continue">tap anywhere to continue</div>
        </div>
      </div>
    </div>
  )
}
