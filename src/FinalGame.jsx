import React, { useState } from 'react'
import aunt1Left from '../assets/Aunt 1_left.png'
import aunt1 from '../assets/Aunt 1.png'
import shadowReveal from '../assets/shadow.png'

const EVIDENCE_A = [
  'Told you not to hand over the items until you were certain — even if that meant doubting her own claim.',
  'Walked through smishing, vishing, and MFA — explaining each step before making any ask.',
  'Never once created urgency or pressure. Let the investigation move at your pace, through every question.',
  'Noticed when Woman B named Rosa without being told. Said quietly: "There it is again."',
]

const EVIDENCE_B = [
  'Demanded the items repeatedly — "He is getting closer", "We are running out of time", "I need them now."',
  'Cut off every lesson — "We do not have time for this" — each time you were learning something new.',
  'Used urgency in every message. Every request came with a reason to stop thinking and act fast.',
  'Named Celia and Rosa — your other aunts — to seem familiar. You never said those names in this room.',
]

const WRONG_EXPLANATIONS = [
  'Look at who told you not to give anything away until you were certain — even if that meant not trusting her. An impostor wants the items. The real Aunt Mira wanted you to be sure first.',
  'Look at who used urgency and pressure every time. Every attack on this journey used urgency to stop you thinking carefully.',
  'Woman B named Rosa without being told. You never said that name in the Observatory. She used personal information gathered in advance — the same tactic the Shadow Man used throughout.',
  'Woman A caught the slip herself. "There it is again." She had been watching. A real person does not need to manufacture familiarity.',
]

const CONFETTI_COLORS = ['#2dd4bf', '#4ade80', '#f59e0b', '#a78bfa', '#fb7185', '#38bdf8', '#fbbf24', '#e879f9', '#34d399', '#60a5fa']

export default function FinalGame({ onComplete }) {
  const [phase, setPhase] = useState('evidence') // 'evidence' | 'truth' | 'confetti' | 'result-correct' | 'result-wrong'
  const [wrongCount, setWrongCount] = useState(0)
  const [revealStage, setRevealStage] = useState(0) // 0 → 1(reveal) → 2(morph) → 3(caption)
  const [hoveredFig, setHoveredFig] = useState(null) // 'A' | 'B' | null

  const handleReady = () => setPhase('truth')

  const handleChoice = (c) => {
    if (c === 'A') {
      setPhase('confetti')
      setTimeout(() => {
        setPhase('result-correct')
        setRevealStage(1)
      }, 2800)
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

  // Full-screen confetti falling from top
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
            I have reviewed the evidence — make my choice →
          </button>
        </div>
      )}

      {/* ── Moment of truth + confetti ── */}
      {(phase === 'truth' || phase === 'confetti') && (
        <div className="finalgame-truth-scene">

          {/* Full-screen confetti rain */}
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

          {/* Heading floats at top centre */}
          <div className="finalgame-truth-top">
            <div className="finalgame-truth-eyebrow">MOMENT OF TRUTH</div>
            <div className="finalgame-truth-heading">WHO IS AUNT MIRA?</div>
            <div className="finalgame-truth-sub">Choose carefully. Trust what you observed.</div>
          </div>

          {/* Labels at bottom — mirroring the figure positions */}
          <div className="finalgame-truth-labels">
            <span className={`finalgame-truth-fig-label${hoveredFig === 'A' ? ' finalgame-truth-fig-label--lit' : ''}`}>WOMAN A</span>
            <span className={`finalgame-truth-fig-label${hoveredFig === 'B' ? ' finalgame-truth-fig-label--lit' : ''}`}>WOMAN B</span>
          </div>

          {/* Characters — same layout as observatory-figures */}
          <div className="finalgame-truth-figures">
            {/* Wrapper span gets anxiety class — img className never changes so its slide-in animation is never restarted */}
            <button
              className="finalgame-truth-fig-btn finalgame-truth-fig-btn--left"
              onClick={() => handleChoice('A')}
              onMouseEnter={() => setHoveredFig('A')}
              onMouseLeave={() => setHoveredFig(null)}
              disabled={phase === 'confetti'}
            >
              <span className={hoveredFig === 'A' ? 'finalgame-fig-anxiety' : 'finalgame-fig-idle'}>
                <img src={aunt1Left} alt="Woman A" className="finalgame-truth-img finalgame-truth-img--left" />
              </span>
            </button>

            <button
              className="finalgame-truth-fig-btn finalgame-truth-fig-btn--right"
              onClick={() => handleChoice('B')}
              onMouseEnter={() => setHoveredFig('B')}
              onMouseLeave={() => setHoveredFig(null)}
              disabled={phase === 'confetti'}
            >
              <span className={hoveredFig === 'B' ? 'finalgame-fig-anxiety' : 'finalgame-fig-idle'}>
                <img src={aunt1} alt="Woman B" className="finalgame-truth-img finalgame-truth-img--right" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ── Correct result ── */}
      {phase === 'result-correct' && (
        <div className="finalgame-truth-scene finalgame-truth-scene--result">

          <div className="finalgame-truth-top">
            <div className="finalgame-truth-heading finalgame-truth-heading--correct fg-fade-up">
              AUNT MIRA IDENTIFIED
            </div>
          </div>

          {/* Labels */}
          <div className="finalgame-truth-labels">
            <span className={`finalgame-truth-fig-label${revealStage >= 1 ? ' finalgame-truth-fig-label--mira' : ''}`}>
              {revealStage >= 1 ? 'AUNT MIRA' : 'WOMAN A'}
            </span>
            <span className={`finalgame-truth-fig-label${revealStage >= 2 ? ' finalgame-truth-fig-label--shadow' : ''}`}>
              {revealStage >= 2 ? 'THE SHADOW MAN' : 'WOMAN B'}
            </span>
          </div>

          {/* Characters */}
          <div className="finalgame-truth-figures">
            {/* Woman A — spotlit */}
            <div className={`finalgame-truth-fig-btn finalgame-truth-fig-btn--left finalgame-truth-fig-btn--static${revealStage >= 1 ? ' finalgame-fig-spotlight' : ''}`}>
              <img src={aunt1Left} alt="Aunt Mira" className="finalgame-truth-img" />
            </div>

            {/* Woman B → Shadow Man morph */}
            <div className={`finalgame-truth-fig-btn finalgame-truth-fig-btn--right finalgame-truth-fig-btn--static finalgame-truth-fig-btn--dim`}>
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
              <p>You recognised the pattern. Every tactic that failed across the entire journey — urgency, mirroring, manufactured familiarity — was used in this room too. And you saw it.</p>
              <button className="finalgame-continue-btn" onClick={onComplete}>Continue →</button>
            </div>
          )}
        </div>
      )}

      {/* ── Wrong result ── */}
      {phase === 'result-wrong' && (
        <div className="finalgame-panel">
          <div className="finalgame-verdict finalgame-verdict--wrong">✗ NOT QUITE — LOOK AGAIN</div>
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
