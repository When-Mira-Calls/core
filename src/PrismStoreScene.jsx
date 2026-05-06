import React, { useState, useEffect } from 'react'
import { playCorrect, playClick } from './sounds'
import strongboxOpenImg   from '../assets/Strongbox - open.png'
import strongboxClosedImg from '../assets/Strongbox - closed.png'
import compassImg         from '../assets/Compass.png'
import prismImg           from '../assets/Prism.png'

// phases: 'floating' → 'flying' → 'sealed' → 'done'
export default function PrismStoreScene({ onComplete }) {
  const [phase, setPhase] = useState('floating')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flying'),  1600)
    const t2 = setTimeout(() => { playCorrect(); setPhase('sealed') }, 2800)
    const t3 = setTimeout(() => setPhase('done'),    3600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const sealed = phase === 'sealed' || phase === 'done'
  const flying = phase === 'flying' || sealed

  return (
    <div
      className="sbseal-root"
      onClick={phase === 'done' ? () => { playClick(); onComplete() } : undefined}
      style={{ cursor: phase === 'done' ? 'pointer' : 'default' }}
    >
      {/* Compass — already inside, shown faintly on the left as a "placed" item */}
      <img
        src={compassImg}
        alt=""
        aria-hidden="true"
        className="sbseal-item prism-store-item--compass-placed"
      />

      {/* Strongbox — centre */}
      <div className="sbseal-box-wrap">
        <img
          src={strongboxOpenImg}
          alt=""
          aria-hidden="true"
          className={`sbseal-box sbseal-box--open${sealed ? ' sbseal-box--hidden' : ''}`}
        />
        <img
          src={strongboxClosedImg}
          alt=""
          aria-hidden="true"
          className={`sbseal-box sbseal-box--closed${sealed ? ' prism-store-sealed' : ''}`}
        />
      </div>

      {/* Prism — right side, flies in */}
      <img
        src={prismImg}
        alt=""
        aria-hidden="true"
        className={`sbseal-item prism-store-item--prism${flying ? ' prism-store-item--fly' : ''}`}
      />

      {phase === 'done' && (
        <div className="smishing-continue" style={{ position: 'absolute', bottom: 28, left: 0, right: 0 }}>
          tap anywhere to continue
        </div>
      )}
    </div>
  )
}
