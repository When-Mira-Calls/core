import React, { useState, useEffect } from 'react'
import { playCorrect, playWrong, playClick } from './sounds'

const SPEED_SECS = { normal: 8, fast: 6, fastest: 4 }

function getRiskyIds(post) {
  const ids = []
  if (post.riskyBlock) ids.push(post.riskyBlock.id)
  if (post.captionParts) post.captionParts.filter(p => p.risky).forEach(p => ids.push(p.id))
  if (post.location) ids.push(post.location.id)
  if (post.screenshot) ids.push(post.screenshot.id)
  return ids
}

const POSTS = [
  {
    id: 1, speed: 'normal', verdict: 'edit', sender: 'JamieC_gaming',
    photo: 'New gaming setup — keyboard, monitor, RGB lighting.',
    riskyBlock: { id: 'diary', content: 'Diary on desk: SUNSHARE ACADEMY — Jamie Chen', label: 'BLUR', editText: '[diary blurred]' },
    caption: 'Finally got it all set up!! 🎮🔥',
    feedback: 'The setup is great to share. The name and school on the diary cover are not.',
  },
  {
    id: 2, speed: 'normal', verdict: 'edit', sender: 'sunny_sq',
    captionParts: [
      { text: 'Mum just booked our holiday!! Two weeks in Spain ' },
      { risky: true, id: 'dates', content: 'from the 14th July', label: 'REMOVE', editText: '' },
      { text: ' — nobody break into our house lol 🏖️' },
    ],
    feedback: 'A joke about burglary is still a burglary invitation. Specific dates tell anyone exactly when the house is empty.',
  },
  {
    id: 3, speed: 'normal', verdict: 'edit', sender: 'maya_ss',
    photo: 'Selfie: school uniform, big smile, end of term energy.',
    riskyBlock: { id: 'badge', content: 'School badge: SUNSHARE ACADEMY', label: 'BLUR', editText: '[badge blurred]' },
    caption: 'Last day before summer!!! 🎉☀️',
    feedback: 'The happiness is entirely preserved without the badge. The badge identifies your school to anyone who sees it.',
  },
  {
    id: 4, speed: 'normal', verdict: 'edit', sender: 'kai_match',
    captionParts: [
      { text: 'Walking home from the match — anyone near ' },
      { risky: true, id: 'road', content: 'the north end of Riverside Road', label: 'REMOVE', editText: 'me' },
      { text: ' want to meet up? ⚽' },
    ],
    feedback: '"Anyone near me want to meet up?" works just as well. No need to name the road.',
  },
  {
    id: 5, speed: 'normal', verdict: 'approve', sender: 'cat_lover99',
    caption: 'Happy 3rd birthday to my cat Marmite!! She is the best thing in my life 🐱❤️',
    feedback: 'This is the way. Celebrate your cat freely. No location, no school, no personal information.',
  },
  {
    id: 6, speed: 'fast', verdict: 'edit', sender: 'music_fan_sq',
    captionParts: [
      { text: 'Just found out I passed my music exam!!! ' },
      { risky: true, id: 'teacher', content: 'My teacher Miss Chen', label: 'REMOVE NAME', editText: 'My teacher' },
      { text: ' told me in front of the whole class 🎵🎉' },
    ],
    feedback: 'The joy of passing stays completely intact. Teacher names do not need to be public.',
  },
  {
    id: 7, speed: 'fastest', verdict: 'edit', sender: 'b_day_crew',
    photo: 'Birthday party — friends laughing, balloons, cake.',
    caption: '🎂🎉 Best night!!',
    location: { id: 'loc7', content: '14 Millbank Road, Seabright (auto-filled)', label: 'REMOVE TAG' },
    feedback: 'The photo is lovely. The home address is not needed and was added automatically by the app.',
  },
  {
    id: 8, speed: 'fast', verdict: 'edit', sender: 'g_chat_user',
    caption: 'can you believe this lol 😭',
    screenshot: {
      id: 'screencap',
      content: '[Private group chat]\nRex_M: honestly I was so embarrassed at the thing yesterday I wanted to disappear 😭',
      label: 'REMOVE',
    },
    feedback: 'Private conversations belong to everyone in them. Posting someone else\'s private words without their knowledge is a form of harm — even if what they said seems funny.',
    note: 'This is relational sharing: you do not own other people\'s words.',
  },
  {
    id: 9, speed: 'fastest', verdict: 'edit', sender: 'priya_sq',
    photo: 'Two friends at a birthday party — both visible, big smiles.',
    captionParts: [
      { text: 'Best night ever with ' },
      { risky: true, id: 'name', content: 'Aisha Patel', label: 'REMOVE NAME', editText: 'my friend' },
      { text: '!! 🎂✨' },
    ],
    location: { id: 'loc9', content: '22 Cranfield Avenue (auto-filled)', label: 'REMOVE TAG' },
    feedback: 'A photo that includes someone else is their information too. You can share your experience without publishing their name and location.',
    note: 'Did you ask before you posted this? You do not own someone else\'s face, name, and location.',
  },
]

export default function EditBeforeYouPost({ onComplete }) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('reading') // reading | result | done
  const [edited, setEdited] = useState({})
  const [action, setAction] = useState(null) // 'approve' | 'edit' | 'timeout'
  const [timeLeft, setTimeLeft] = useState(SPEED_SECS.normal)
  const [results, setResults] = useState([])

  const post = POSTS[idx]
  const riskyIds = getRiskyIds(post)
  const allDone = riskyIds.length > 0 && riskyIds.every(id => edited[id])
  const total = SPEED_SECS[post.speed]

  // Reset on new post
  useEffect(() => {
    setPhase('reading')
    setEdited({})
    setAction(null)
    setTimeLeft(SPEED_SECS[post.speed])
  }, [idx])

  // Timer countdown
  useEffect(() => {
    if (phase !== 'reading') return
    if (timeLeft <= 0) {
      setAction('timeout')
      setResults(r => [...r, false])
      setPhase('result')
      playWrong()
      return
    }
    const t = setTimeout(() => setTimeLeft(v => +(v - 0.05).toFixed(3)), 50)
    return () => clearTimeout(t)
  }, [phase, timeLeft])

  // Auto-finish when all risky elements edited
  useEffect(() => {
    if (phase !== 'reading' || !allDone) return
    setAction('edit')
    setResults(r => [...r, true])
    setPhase('result')
    playCorrect()
  }, [allDone, phase])

  const tapRisky = id => {
    if (phase !== 'reading') return
    setEdited(e => ({ ...e, [id]: true }))
    playClick()
  }

  const handleApprove = () => {
    if (phase !== 'reading') return
    const ok = post.verdict === 'approve'
    setAction('approve')
    setResults(r => [...r, ok])
    setPhase('result')
    ok ? playCorrect() : playWrong()
  }

  const handleNext = () => {
    playClick()
    if (idx >= POSTS.length - 1) setPhase('done')
    else setIdx(i => i + 1)
  }

  const correct = action === 'edit' || (action === 'approve' && post.verdict === 'approve')

  // ── Score screen ───────────────────────────────────────────────
  if (phase === 'done') {
    const score = results.filter(Boolean).length
    const perfect = score >= 7
    const reset = () => { playClick(); setIdx(0); setResults([]) }
    return (
      <div className="ebp-root">
        <div className="ebp-bg-net" aria-hidden="true" />
        <div className="ebp-bg-beam" aria-hidden="true" />
        <div className="ebp-console">
          <div className="ebp-hud">
            <span className="ebp-hud-label">EDIT BEFORE YOU POST</span>
            <span className="ebp-hud-sub">RESULTS</span>
          </div>
          <div className="ebp-score-screen">
            <div className="ebp-score-ring">
              <div className="ebp-score-big">{score}<span className="ebp-score-of">/{POSTS.length}</span></div>
              <div className="ebp-score-label">handled correctly</div>
            </div>
            <div className="ebp-score-cards">
              {POSTS.map((p, i) => (
                <div
                  key={p.id}
                  className={`ebp-score-card${results[i] ? ' ebp-score-card--ok' : ' ebp-score-card--bad'}`}
                  style={{ animationDelay: `${0.18 + i * 0.08}s` }}
                >
                  <span className="ebp-score-card-icon">{results[i] ? '✓' : '✗'}</span>
                  <span className="ebp-score-card-name">Post {p.id}</span>
                  <span className="ebp-score-card-verdict">{p.verdict.toUpperCase()}</span>
                </div>
              ))}
            </div>
            {perfect
              ? <button className="ebp-btn ebp-btn--continue" onClick={() => { playClick(); onComplete() }}>CONTINUE →</button>
              : <button className="ebp-btn ebp-btn--retry" onClick={reset}>TRY AGAIN ↺</button>
            }
          </div>
        </div>
      </div>
    )
  }

  // ── Game screen ────────────────────────────────────────────────
  return (
    <div className="ebp-root">
      <div className="ebp-bg-net" aria-hidden="true" />
      <div className="ebp-bg-beam" aria-hidden="true" />
      <div className="ebp-console">

        {/* HUD */}
        <div className="ebp-hud">
          <span className="ebp-hud-label">EDIT BEFORE YOU POST</span>
          <div className="ebp-pips">
            {POSTS.map((_, i) => (
              <span
                key={i}
                className={`ebp-pip${i < idx ? ' ebp-pip--done' : i === idx ? ' ebp-pip--active' : ''}`}
              />
            ))}
          </div>
          <span className="ebp-hud-count">{idx + 1} / {POSTS.length}</span>
        </div>

        {/* Timer bar */}
        <div className="ebp-timer-track">
          <div
            className={`ebp-timer-fill ebp-timer-fill--${post.speed}`}
            style={{ width: phase === 'reading' ? `${(timeLeft / total) * 100}%` : '0%' }}
          />
        </div>

        {/* Post card */}
        <div className={`ebp-card${phase === 'result' ? (correct ? ' ebp-card--ok' : ' ebp-card--bad') : ''}`}>

          {/* Speed badge */}
          {post.speed !== 'normal' && phase === 'reading' && (
            <div className={`ebp-speed-badge ebp-speed-badge--${post.speed}`}>
              {post.speed === 'fastest' ? '⚡⚡ FASTEST' : '⚡ FAST'}
            </div>
          )}

          {/* Stamp */}
          {phase === 'result' && (
            <div className={`ebp-stamp${correct ? '' : ' ebp-stamp--bad'}`}>
              {action === 'timeout'
                ? 'POSTED UNEDITED'
                : action === 'approve'
                  ? correct ? 'APPROVED ✓' : 'SHOULD EDIT'
                  : 'EDITED ✓'}
            </div>
          )}

          {/* Sender row */}
          <div className="ebp-post-header">
            <div className="ebp-avatar">{post.sender[0].toUpperCase()}</div>
            <span className="ebp-sender">@{post.sender}</span>
          </div>

          {/* Photo description */}
          {post.photo && (
            <div className="ebp-photo-desc">📷 {post.photo}</div>
          )}

          {/* Risky block — element in the photo */}
          {post.riskyBlock && (
            edited[post.riskyBlock.id]
              ? <div className="ebp-edited-block">{post.riskyBlock.editText}</div>
              : <div className="ebp-risky-block" onClick={() => tapRisky(post.riskyBlock.id)}>
                  {post.riskyBlock.content}
                  <span className="ebp-risky-pill">{post.riskyBlock.label}</span>
                </div>
          )}

          {/* Screenshot */}
          {post.screenshot && (
            edited[post.screenshot.id]
              ? <div className="ebp-screenshot-removed">[screenshot removed]</div>
              : <div className="ebp-screenshot ebp-risky-block" onClick={() => tapRisky(post.screenshot.id)}>
                  {post.screenshot.content.split('\n').map((l, i) => <div key={i}>{l}</div>)}
                  <span className="ebp-risky-pill">{post.screenshot.label}</span>
                </div>
          )}

          {/* Caption — plain or with inline risky spans */}
          {post.captionParts ? (
            <p className="ebp-caption">
              {post.captionParts.map((part, i) => {
                if (!part.risky) return <span key={i}>{part.text}</span>
                if (edited[part.id]) {
                  return part.editText
                    ? <span key={i} className="ebp-edited-inline">{part.editText}</span>
                    : null
                }
                return (
                  <span key={i} className="ebp-risky-inline" onClick={() => tapRisky(part.id)}>
                    {part.content}
                    <span className="ebp-risky-pill">{part.label}</span>
                  </span>
                )
              })}
            </p>
          ) : post.caption ? (
            <p className="ebp-caption">{post.caption}</p>
          ) : null}

          {/* Location tag */}
          {post.location && (
            edited[post.location.id]
              ? null
              : <div className="ebp-location-tag ebp-risky-block" onClick={() => tapRisky(post.location.id)}>
                  📍 {post.location.content}
                  <span className="ebp-risky-pill">{post.location.label}</span>
                </div>
          )}
        </div>

        {/* Result panel */}
        {phase === 'result' && (
          <div className={`ebp-result-panel${correct ? ' ebp-result-panel--ok' : ' ebp-result-panel--bad'}`}>
            <p className="ebp-result-feedback">{post.feedback}</p>
            {post.note && <p className="ebp-result-note">{post.note}</p>}
            <button className="ebp-btn ebp-btn--next" onClick={handleNext}>
              {idx >= POSTS.length - 1 ? 'SEE RESULTS' : 'NEXT →'}
            </button>
          </div>
        )}

        {/* Approve button */}
        {phase === 'reading' && (
          <div className="ebp-actions">
            {riskyIds.length > 0 && (
              <p className="ebp-action-hint">tap highlighted element to edit</p>
            )}
            <button className="ebp-btn ebp-btn--approve" onClick={handleApprove}>
              ✓ APPROVE
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
