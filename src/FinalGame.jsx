import React, { useState } from 'react'
import aunt1Left from '../assets/Aunt 1_left.png'
import aunt1 from '../assets/Aunt 1.png'
import shadowReveal from '../assets/shadow.png'
import observatoryExt from '../assets/Observatory Ext.png'
import strongboxOpen from '../assets/Strongbox - open.png'
import compass from '../assets/Compass.png'
import prism from '../assets/Prism.png'
import goldenKnot from '../assets/Golden Knot.png'

const EVIDENCE_A = [
  'Told you not to hand over the items until you were certain - even if that meant doubting her own claim.',
  'Walked through smishing, vishing, and MFA - explaining each step before making any ask.',
  'Never once created urgency or pressure. Let the investigation move at your pace, through every question.',
  'Noticed when Woman B named Rosa without being told. Said quietly: "There it is again."',
]

const EVIDENCE_B = [
  'Demanded the items repeatedly - "He is getting closer", "We are running out of time", "I need them now."',
  'Cut off every lesson - "We do not have time for this" - each time you were learning something new.',
  'Used urgency in every message. Every request came with a reason to stop thinking and act fast.',
  'Named Celia and Rosa - your other aunts - to seem familiar. You never said those names in this room.',
]

const WRONG_EXPLANATIONS = [
  'Look at who told you not to give anything away until you were certain - even if that meant not trusting her. An impostor wants the items. The real Aunt Mira wanted you to be sure first.',
  'Look at who used urgency and pressure every time. Every attack on this journey used urgency to stop you thinking carefully.',
  'Woman B named Rosa without being told. You never said that name in the Observatory. She used personal information gathered in advance - the same tactic the Shadow Man used throughout.',
  'Woman A caught the slip herself. "There it is again." She had been watching. A real person does not need to manufacture familiarity.',
]

const CONFETTI_COLORS = ['#2dd4bf', '#4ade80', '#f59e0b', '#a78bfa', '#fb7185', '#38bdf8', '#fbbf24', '#e879f9', '#34d399', '#60a5fa']

export default function FinalGame({ onComplete }) {
  const [phase, setPhase] = useState('evidence')
  const [wrongCount, setWrongCount] = useState(0)
  const [revealStage, setRevealStage] = useState(0)
  const [hoveredFig, setHoveredFig] = useState(null)

  const handleReady = () => setPhase('truth')

  const handleChoice = (c) => {
    if (c === 'A') {
      setPhase('confetti')
      setTimeout(() => { setPhase('result-correct'); setRevealStage(1) }, 2800)
      setTimeout(() => setRevealStage(2), 3500)
      setTimeout(() => setRevealStage(3), 5000)
    } else {
      setPhase('result-wrong')
    }
  }

  const handleTryAgain = () => {
    setWrongCount(n => n + 1)
    setRevealStage(0)
    setHoveredFig(null)
    setPhase('evidence')
  }

  const confettiPieces = Array.from({ length: 68 }).map((_, i) => ({
    x: Math.round(((i * 1.618033) % 1) * 96 + 2),
    delay: i * 0.036,
    dur: 2.4 + (i % 9) * 0.2,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    drift: ((i % 7) - 3) * 28,
    size: 7 + (i % 4) * 3,
    round: i % 5 === 0,
    spin: i * 53,
  }))

  return (
    <div className="finalgame-overlay">

      {/* ── Evidence phase ── */}
      {phase === 'evidence' && (
        <div className="finalgame-panel finalgame-panel--wide">
          <div className="finalgame-header">
            <span className="finalgame-title">WHO IS THE REAL AUNT MIRA?</span>
          </div>
          <p className="finalgame-instr">
            Review the evidence collected from the Observatory. Consider what each woman said,
            what she did, and what she chose not to do.
          </p>

          <div className="finalgame-ev-cols">
            <div className="finalgame-ev-col finalgame-ev-col--a">
              <div className="finalgame-ev-col-head">WOMAN A</div>
              {EVIDENCE_A.map((text, i) => (
                <div key={i} className="finalgame-ev-item">
                  <span className="finalgame-ev-bullet finalgame-ev-bullet--a" aria-hidden="true">▸</span>
                  <p className="finalgame-ev-text">{text}</p>
                </div>
              ))}
            </div>
            <div className="finalgame-ev-col finalgame-ev-col--b">
              <div className="finalgame-ev-col-head">WOMAN B</div>
              {EVIDENCE_B.map((text, i) => (
                <div key={i} className="finalgame-ev-item">
                  <span className="finalgame-ev-bullet finalgame-ev-bullet--b" aria-hidden="true">▸</span>
                  <p className="finalgame-ev-text">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="finalgame-cta" onClick={handleReady}>
            I have reviewed the evidence - make my choice →
          </button>
        </div>
      )}

      {/* ── Moment of truth + confetti ── */}
      {(phase === 'truth' || phase === 'confetti') && (
        <div className="finalgame-truth-scene">

          {/* ── Layer 1: background ── */}
          <div className="fgt-bg" aria-hidden="true">
            <img src={observatoryExt} className="fgt-bg-img" alt="" />
            <div className="fgt-bg-overlay" />
          </div>

          {/* ── Layer 2: blurred map + shadow man at Observatory ── */}
          <div className="fgt-map-layer" aria-hidden="true">
            {/* preserveAspectRatio="xMidYMid slice" + width/height 100% means
                SVG center (380,150) maps exactly to the scene center (50%,50%),
                so the final trail node lands right under the shadow man. */}
            <svg viewBox="0 0 760 300" className="fgt-map-svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="fgt-tmbg" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#071c18" />
                  <stop offset="100%" stopColor="#020c09" />
                </radialGradient>
                <filter id="fgt-redglow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect width="760" height="300" fill="url(#fgt-tmbg)" />

              {/* Grid */}
              {[95, 190, 285, 380, 475, 570, 665].map(x => (
                <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="300" stroke="rgba(0,150,90,0.06)" strokeWidth="1" />
              ))}
              {[50, 100, 150, 200, 250].map(y => (
                <line key={`gy${y}`} x1="0" y1={y} x2="760" y2={y} stroke="rgba(0,150,90,0.06)" strokeWidth="1" />
              ))}

              {/* Side terrain banks */}
              <path d="M 0,0 L 175,0 Q 140,50 125,100 Q 110,150 135,200 Q 160,250 140,300 L 0,300 Z" fill="rgba(8,25,18,0.78)" />
              <path d="M 760,0 L 585,0 Q 625,50 640,100 Q 655,150 630,200 Q 605,250 630,300 L 760,300 Z" fill="rgba(8,25,18,0.78)" />
              <path d="M 0,0 L 760,0 L 760,24 Q 620,14 500,26 Q 420,34 380,28 Q 320,20 220,32 Q 120,44 0,32 Z" fill="rgba(5,18,12,0.55)" />
              <path d="M 0,300 L 760,300 L 760,272 Q 620,282 500,270 Q 420,262 380,268 Q 320,274 220,264 Q 120,254 0,268 Z" fill="rgba(5,18,12,0.55)" />

              {/* Topo rings around the two mid waypoints */}
              <ellipse cx="230" cy="96" rx="44" ry="26" fill="none" stroke="rgba(0,130,75,0.09)" strokeWidth="1" />
              <ellipse cx="230" cy="96" rx="24" ry="14" fill="none" stroke="rgba(0,130,75,0.12)" strokeWidth="1" />
              <ellipse cx="530" cy="125" rx="42" ry="24" fill="none" stroke="rgba(0,130,75,0.09)" strokeWidth="1" />
              <ellipse cx="530" cy="125" rx="23" ry="13" fill="none" stroke="rgba(0,130,75,0.12)" strokeWidth="1" />

              {/* Trail - same S-curve style, start shifted down to y=70 so it clears
                  the heading text; end stays at SVG center (380,150) = shadow man */}
              <path
                d="M 380,50 C 510,56 155,72 230,96 C 305,106 600,113 530,125 C 460,136 200,143 380,150"
                fill="none" stroke="rgba(195,30,18,0.14)" strokeWidth="10" strokeLinecap="round"
              />
              <path
                d="M 380,50 C 510,56 155,72 230,96 C 305,106 600,113 530,125 C 460,136 200,143 380,150"
                fill="none" stroke="rgba(210,42,24,0.88)" strokeWidth="1.6" strokeLinecap="round"
              />

              {/* Waypoints along the trail */}
              {[{ x: 380, y: 50 }, { x: 230, y: 96 }, { x: 530, y: 125 }].map((loc, i) => (
                <g key={i}>
                  <circle cx={loc.x} cy={loc.y} r="8" fill="rgba(210,42,24,0.07)" />
                  <circle cx={loc.x} cy={loc.y} r="4" fill="rgba(195,38,22,0.82)" />
                </g>
              ))}

              {/* Final node at SVG center (380,150) - lines up exactly with shadow man */}
              <circle cx="380" cy="150" r="18" fill="rgba(210,42,24,0.10)" />
              <circle cx="380" cy="150" r="10" fill="rgba(210,42,24,0.18)" />
              <circle cx="380" cy="150" r="6" fill="rgba(220,45,26,1)" filter="url(#fgt-redglow)" />

              <text x="14" y="14" fill="rgba(0,155,85,0.22)" fontSize="7" fontFamily="'Courier New',monospace" letterSpacing="1.6">CLASSIFIED - TRAIL RECONSTRUCTION</text>
              <text x="746" y="295" textAnchor="end" fill="rgba(0,155,85,0.16)" fontSize="7" fontFamily="'Courier New',monospace">RESTRICTED ACCESS</text>
            </svg>

            {/* Shadow man pinned to Observatory node (≈85% x, ≈33% of SVG height) */}
            <div className="fgt-shadow-on-map">
              <div className="fgt-radar-ring fgt-radar-ring--1" />
              <div className="fgt-radar-ring fgt-radar-ring--2" />
              <div className="fgt-radar-ring fgt-radar-ring--3" />
              <img src={shadowReveal} className="fgt-shadow-ghost" alt="" />
            </div>
          </div>

          {/* ── Layer 3: confetti ── */}
          {phase === 'confetti' && (
            <div className="finalgame-confetti-full" aria-hidden="true">
              {confettiPieces.map((p, i) => (
                <span
                  key={i}
                  className={`finalgame-cfp${p.round ? ' finalgame-cfp--round' : ''}`}
                  style={{
                    '--cfx': `${p.x}%`,
                    '--cfd': `${p.drift}px`,
                    '--cfc': p.color,
                    '--cfdelay': `${p.delay}s`,
                    '--cfdur': `${p.dur}s`,
                    '--cfsize': `${p.size}px`,
                    '--cfspin': `${p.spin}deg`,
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Layer 4: heading ── */}
          <div className="finalgame-truth-top">
            <div className="finalgame-truth-eyebrow">MOMENT OF TRUTH</div>
            <div className="finalgame-truth-heading">WHO IS AUNT MIRA?</div>
            <div className="finalgame-truth-sub">The strongbox and everything inside it goes to whoever you choose.</div>
          </div>

          {/* ── Layer 5: strongbox + orbiting items ── */}
          <div className="fgt-lockbox-scene" aria-hidden="true">
            <div className="fgt-lockbox-glow" />
            <img src={strongboxOpen} className="fgt-lockbox-img" alt="" />
            <div className="fgt-orbit fgt-orbit--compass">
              <img src={compass} className="fgt-orbit-item" alt="" />
            </div>
            <div className="fgt-orbit fgt-orbit--prism">
              <img src={prism} className="fgt-orbit-item" alt="" />
            </div>
            <div className="fgt-orbit fgt-orbit--knot">
              <img src={goldenKnot} className="fgt-orbit-item" alt="" />
            </div>
          </div>

          {/* ── Layer 6: labels ── */}
          <div className="finalgame-truth-labels">
            <span className={`finalgame-truth-fig-label${hoveredFig === 'A' ? ' finalgame-truth-fig-label--lit' : ''}`}>WOMAN A</span>
            <span className={`finalgame-truth-fig-label${hoveredFig === 'B' ? ' finalgame-truth-fig-label--lit' : ''}`}>WOMAN B</span>
          </div>

          {/* ── Layer 7: characters ── */}
          <div className="finalgame-truth-figures">
            <button
              className={`finalgame-truth-fig-btn finalgame-truth-fig-btn--left${hoveredFig === 'A' ? ' finalgame-fig-hovered' : ''}`}
              onClick={() => handleChoice('A')}
              onMouseEnter={() => setHoveredFig('A')}
              onMouseLeave={() => setHoveredFig(null)}
              disabled={phase === 'confetti'}
            >
              <img src={aunt1Left} alt="Woman A" className="finalgame-truth-img" />
            </button>

            <button
              className={`finalgame-truth-fig-btn finalgame-truth-fig-btn--right${hoveredFig === 'B' ? ' finalgame-fig-hovered' : ''}`}
              onClick={() => handleChoice('B')}
              onMouseEnter={() => setHoveredFig('B')}
              onMouseLeave={() => setHoveredFig(null)}
              disabled={phase === 'confetti'}
            >
              <img src={aunt1} alt="Woman B" className="finalgame-truth-img" />
            </button>
          </div>

          {/* ── Background glow on hover ── */}
          <div className={`finalgame-hover-glow finalgame-hover-glow--left${hoveredFig === 'A' ? ' finalgame-hover-glow--active' : ''}`} aria-hidden="true" />
          <div className={`finalgame-hover-glow finalgame-hover-glow--right${hoveredFig === 'B' ? ' finalgame-hover-glow--active' : ''}`} aria-hidden="true" />
        </div>
      )}

      {/* ── Correct result ── */}
      {phase === 'result-correct' && (
        <div className="finalgame-truth-scene finalgame-truth-scene--result">

          <div className="fgt-bg" aria-hidden="true">
            <img src={observatoryExt} className="fgt-bg-img" alt="" />
            <div className="fgt-bg-overlay" />
          </div>

          <div className="finalgame-truth-top">
            <div className="finalgame-truth-heading finalgame-truth-heading--correct fg-fade-up">
              AUNT MIRA IDENTIFIED
            </div>
          </div>

          <div className="finalgame-truth-labels">
            <span className={`finalgame-truth-fig-label${revealStage >= 1 ? ' finalgame-truth-fig-label--mira' : ''}`}>
              {revealStage >= 1 ? 'AUNT MIRA' : 'WOMAN A'}
            </span>
            <span className={`finalgame-truth-fig-label${revealStage >= 2 ? ' finalgame-truth-fig-label--shadow' : ''}`}>
              {revealStage >= 2 ? 'THE SHADOW MAN' : 'WOMAN B'}
            </span>
          </div>

          <div className="finalgame-truth-figures">
            <div className={`finalgame-truth-fig-btn finalgame-truth-fig-btn--left finalgame-truth-fig-btn--static${revealStage >= 1 ? ' finalgame-fig-spotlight' : ''}`}>
              <img src={aunt1Left} alt="Aunt Mira" className="finalgame-truth-img" />
            </div>

            <div className="finalgame-truth-fig-btn finalgame-truth-fig-btn--right finalgame-truth-fig-btn--static finalgame-truth-fig-btn--dim">
              <div className="finalgame-morph-wrap">
                <img
                  src={aunt1}
                  alt=""
                  aria-hidden="true"
                  className={`finalgame-truth-img finalgame-morph-out${revealStage >= 2 ? ' finalgame-morph-out--gone' : ''}`}
                />
                <img
                  src={shadowReveal}
                  alt="The Shadow Man"
                  className={`finalgame-truth-img finalgame-morph-in${revealStage >= 2 ? ' finalgame-morph-in--visible' : ''}`}
                />
              </div>
            </div>
          </div>

          {revealStage >= 3 && (
            <div className="finalgame-caption fg-fade-up">
              <p>You recognised the pattern. Every tactic that failed across the entire journey - urgency, mirroring, manufactured familiarity - was used in this room too. And you saw it.</p>
              <button className="finalgame-continue-btn" onClick={onComplete}>Continue →</button>
            </div>
          )}
        </div>
      )}

      {/* ── Wrong result ── */}
      {phase === 'result-wrong' && (
        <div className="finalgame-panel">
          <div className="finalgame-verdict finalgame-verdict--wrong">✗ NOT QUITE - LOOK AGAIN</div>
          <div className="finalgame-result-body">
            <img src={aunt1Left} alt="Aunt Mira" className="finalgame-portrait" />
            <div className="finalgame-result-text">
              <p className="finalgame-mira-voice">{WRONG_EXPLANATIONS[wrongCount % WRONG_EXPLANATIONS.length]}</p>
            </div>
          </div>
          <button className="finalgame-try-btn" onClick={handleTryAgain}>Look again →</button>
        </div>
      )}

    </div>
  )
}
