import React, { useState, useRef } from 'react'
import { playCorrect, playWrong, playClick, playCardIn } from './sounds'

function Marked({ text, mark, verdict }) {
  if (!mark) return <>{text}</>
  const i = text.indexOf(mark)
  if (i === -1) return <>{text}</>
  return <>
    {text.slice(0, i)}
    <span className={verdict === 'real' ? 'orf-mark orf-mark--real' : 'orf-mark orf-mark--fake'}>
      {mark}
    </span>
    {text.slice(i + mark.length)}
  </>
}

const MESSAGES = [
  {
    id: 1,
    displayName: 'Amazon',
    address: 'orders@amazon-delivery-alert.net',
    subject: 'Your order has been placed on hold',
    body: 'Your order has been held. Click here to confirm your delivery address and card details within 2 hours or your order will be cancelled:',
    link: 'www.amazon-delivery-alert.net/confirm',
    verdict: 'fake',
    flag: 'FAKE DOMAIN',
    explanation: 'Real Amazon emails come from amazon.co.uk or amazon.com — not amazon-delivery-alert.net. Never click a link asking for card details in an email.',
    mark: 'amazon-delivery-alert.net',
  },
  {
    id: 2,
    displayName: 'Deliveroo',
    address: 'no-reply@deliveroo-support-help.com',
    subject: 'Your order has been cancelled',
    body: 'Your order has been cancelled. To get a full refund click here and confirm your payment details:',
    link: 'deliveroo-support-help.com/refund',
    verdict: 'fake',
    flag: 'FAKE DOMAIN',
    explanation: "Real Deliveroo emails come from deliveroo.co.uk or deliveroo.com — not deliveroo-support-help.com. The extra words 'support-help' are the giveaway. Real refunds are automatic — they never ask you to click and confirm payment details.",
    mark: 'deliveroo-support-help.com',
  },
  {
    id: 3,
    displayName: 'Roblox Support',
    address: 'support@roblox.com',
    subject: 'New login to your account',
    body: 'Your Roblox account was successfully logged in. If this was not you, secure your account here:',
    link: 'roblox.com/settings/security',
    verdict: 'real',
    flag: 'OFFICIAL DOMAIN',
    explanation: 'The sender address is @roblox.com — the real Roblox domain. The link goes to roblox.com/settings. No urgency, no request for payment details. This is a genuine security notification.',
    mark: 'roblox.com',
  },
  {
    id: 4,
    msgType: 'sms',
    displayName: 'SCHOOL ADMIN',
    address: 'Text Message',
    subject: '',
    body: 'Important: Your school account will be deleted in 24 hours unless you verify at:',
    link: 'school-accounts-verify.com/students',
    verdict: 'fake',
    flag: 'FAKE DOMAIN + URGENCY TACTIC',
    explanation: 'Schools do not delete student accounts via text message with 24-hour warnings. The link goes to school-accounts-verify.com which is not a real school domain. Classic urgency + fear combination.',
    mark: 'school-accounts-verify.com',
  },
  {
    id: 5,
    displayName: 'PlayStation',
    address: 'no-reply@playstation.com',
    subject: 'Thank you for your PlayStation Store purchase',
    body: 'Thank you for your PlayStation Store purchase of £49.99. If you did not make this purchase, visit:',
    link: 'playstation.com/support',
    verdict: 'real',
    flag: 'OFFICIAL DOMAIN',
    explanation: 'The sender is no-reply@playstation.com — the real PlayStation domain. The support link goes to playstation.com. No unusual urgency. This is the kind of receipt email that gaming platforms send automatically.',
    mark: 'playstation.com',
  },
]

function SenderAvatar({ name }) {
  return (
    <div className="orf-avatar" aria-hidden="true">
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

export default function RealOrFakeGame({ onComplete }) {
  const [idx,     setIdx]     = useState(0)
  const [phase,   setPhase]   = useState('read')
  const [answer,  setAnswer]  = useState(null)
  const [results, setResults] = useState([])
  const [flash,   setFlash]   = useState('')

  const lastTap = useRef(0)
  const guard = (fn) => (e) => {
    e.stopPropagation()
    const now = Date.now()
    if (now - lastTap.current < 350) return
    lastTap.current = now
    fn()
  }

  const msg    = MESSAGES[idx]
  const isLast = idx === MESSAGES.length - 1

  const pick = (a) => {
    if (phase !== 'read') return
    const ok = a === msg.verdict
    setAnswer(a)
    setResults(r => [...r, ok])
    setFlash(msg.verdict)
    setTimeout(() => setFlash(''), 480)
    ok ? playCorrect() : playWrong()
    setPhase('verdict')
  }

  const next = () => {
    playClick()
    if (isLast) { setPhase('done'); return }
    setIdx(i => i + 1)
    setAnswer(null)
    setPhase('read')
    playCardIn()
  }

  const score   = results.filter(Boolean).length
  const correct = answer === msg?.verdict

  /* ── Score screen ─────────────────────────────────────── */
  if (phase === 'done') {
    const perfect = score === MESSAGES.length
    const notes = [
      'None identified correctly. Go back and look carefully at every sender address and link.',
      'One correct. Scammers study what makes people trust. Study each message again.',
      'Two of five identified. The tricky ones always look the most official. Try again.',
      'Three of five. The domain is always the thing they cannot quite hide. Almost there.',
      'Four of five. One slipped through — find it and try again.',
      'Every intercept correctly classified. The fishermen are taking notes.',
    ]
    const reset = () => {
      playClick()
      setIdx(0)
      setPhase('read')
      setAnswer(null)
      setResults([])
      setFlash('')
    }
    return (
      <div className="orf-root">
        <div className="orf-bg-net"  aria-hidden="true" />
        <div className="orf-bg-beam" aria-hidden="true" />
        <svg className="orf-bg-water" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2880 320" preserveAspectRatio="none">
          <path d="M0,175 C180,115 360,235 540,175 C720,115 900,235 1080,175 C1260,115 1440,235 1620,175 C1800,115 1980,235 2160,175 C2340,115 2520,235 2880,175 L2880,320 L0,320 Z" fill="rgba(6,48,72,0.65)"/>
          <path d="M0,212 C240,158 480,266 720,212 C960,158 1200,266 1440,212 C1680,158 1920,266 2160,212 C2400,158 2640,266 2880,212 L2880,320 L0,320 Z" fill="rgba(12,72,105,0.48)"/>
          <path d="M0,250 C360,218 720,282 1080,250 C1440,218 1800,282 2160,250 C2520,218 2700,270 2880,250 L2880,320 L0,320 Z" fill="rgba(18,95,132,0.36)"/>
        </svg>
        <div className="orf-console">
        <div className="orf-hud">
          <span className="orf-hud-label">REAL OR FAKE?</span>
          <span className="orf-hud-sub">ANALYSIS COMPLETE</span>
        </div>
        <div className="orf-score-screen">
          <div className="orf-score-ring">
            <div className="orf-score-big">
              {score}<span className="orf-score-of">/{MESSAGES.length}</span>
            </div>
            <div className="orf-score-label">intercepted correctly</div>
          </div>
          <div className="orf-score-cards">
            {MESSAGES.map((m, i) => (
              <div
                key={m.id}
                className={`orf-score-card${results[i] ? ' orf-score-card--ok' : ' orf-score-card--bad'}`}
                style={{ animationDelay: `${0.22 + i * 0.12}s` }}
              >
                <span className="orf-score-card-icon">{results[i] ? '✓' : '✗'}</span>
                <span className="orf-score-card-name">{m.displayName}</span>
                <span className="orf-score-card-verdict">{m.verdict.toUpperCase()}</span>
              </div>
            ))}
          </div>
          <p className="orf-score-note" style={{ animationDelay: '0.58s' }}>
            {notes[score]}
          </p>
          {perfect ? (
            <button
              className="orf-continue-btn"
              style={{ animationDelay: '0.72s' }}
              onClick={guard(() => { playClick(); onComplete() })}
            >
              CONTINUE →
            </button>
          ) : (
            <button
              className="orf-continue-btn orf-retry-btn"
              style={{ animationDelay: '0.72s' }}
              onClick={guard(reset)}
            >
              TRY AGAIN ↺
            </button>
          )}
        </div>
        </div>
      </div>
    )
  }

  /* ── Game screen ──────────────────────────────────────── */
  return (
    <div className="orf-root">

      {/* Verdict flash */}
      {flash && <div className={`orf-flash orf-flash--${flash}`} key={flash + idx} />}

      <div className="orf-bg-net"  aria-hidden="true" />
      <div className="orf-bg-beam" aria-hidden="true" />
      <svg className="orf-bg-water" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2880 320" preserveAspectRatio="none">
        <path d="M0,175 C180,115 360,235 540,175 C720,115 900,235 1080,175 C1260,115 1440,235 1620,175 C1800,115 1980,235 2160,175 C2340,115 2520,235 2880,175 L2880,320 L0,320 Z" fill="rgba(6,48,72,0.65)"/>
        <path d="M0,212 C240,158 480,266 720,212 C960,158 1200,266 1440,212 C1680,158 1920,266 2160,212 C2400,158 2640,266 2880,212 L2880,320 L0,320 Z" fill="rgba(12,72,105,0.48)"/>
        <path d="M0,250 C360,218 720,282 1080,250 C1440,218 1800,282 2160,250 C2520,218 2700,270 2880,250 L2880,320 L0,320 Z" fill="rgba(18,95,132,0.36)"/>
      </svg>

      <div className="orf-console">
      {/* HUD */}
      <div className="orf-hud">
        <span className="orf-hud-label">REAL OR FAKE?</span>
        <div className="orf-hud-progress">
          {MESSAGES.map((_, i) => (
            <span
              key={i}
              className={`orf-pip${i < idx ? ' orf-pip--done' : i === idx ? ' orf-pip--active' : ''}`}
            />
          ))}
        </div>
        <span className="orf-hud-count">{idx + 1} / {MESSAGES.length}</span>
      </div>

      {/* Email card */}
      <div className="orf-play-area">
        <div
          key={idx}
          className={[
            'orf-email-card',
            phase === 'verdict' ? 'orf-email-card--decided' : '',
            phase === 'verdict' ? `orf-email-card--${msg.verdict}` : '',
          ].filter(Boolean).join(' ')}
        >
          {/* Stamp */}
          {phase === 'verdict' && (
            <div className={`orf-stamp orf-stamp--${msg.verdict}`}>
              {msg.verdict === 'real' ? 'GENUINE' : 'FRAUDULENT'}
            </div>
          )}

          {/* Header — SMS or Email */}
          {msg.msgType === 'sms' ? (
            <div className="orf-email-header">
              <div className="orf-sms-badge">SMS</div>
              <div className="orf-email-meta">
                <div className="orf-email-from-name">{msg.displayName}</div>
                <div className="orf-email-from-addr">Text Message</div>
              </div>
            </div>
          ) : (
            <div className="orf-email-header">
              <SenderAvatar name={msg.displayName} />
              <div className="orf-email-meta">
                <div className="orf-email-from-name">{msg.displayName}</div>
                <div className="orf-email-from-addr">
                  {phase === 'verdict'
                    ? <Marked text={msg.address} mark={msg.mark} verdict={msg.verdict} />
                    : msg.address}
                </div>
              </div>
            </div>
          )}

          {msg.msgType !== 'sms' && <div className="orf-email-subject">{msg.subject}</div>}
          <div className="orf-email-divider" />

          {/* Body */}
          <p className="orf-email-body">{msg.body}</p>

          {/* Link */}
          <div className="orf-email-link-row">
            <span className="orf-email-link-icon">↗</span>
            <span className="orf-email-link-text">
              {phase === 'verdict'
                ? <Marked text={msg.link} mark={msg.mark} verdict={msg.verdict} />
                : msg.link}
            </span>
          </div>
        </div>

        {/* Verdict explanation */}
        {phase === 'verdict' && (
          <div className={`orf-verdict-panel${correct ? ' orf-verdict-panel--ok' : ' orf-verdict-panel--wrong'}`}>
            <div className="orf-verdict-result">
              {correct
                ? `✓ CORRECT — this is ${msg.verdict.toUpperCase()}`
                : `✗ INCORRECT — this is ${msg.verdict.toUpperCase()}`}
            </div>
            <div className="orf-verdict-flag">
              {msg.verdict === 'fake' ? `RED FLAG: ${msg.flag}` : `WHY IT'S REAL: ${msg.flag}`}
            </div>
            <p className="orf-verdict-body">{msg.explanation}</p>
            <button className="orf-next-btn" onClick={guard(next)}>
              {isLast ? 'SEE RESULTS' : 'NEXT →'}
            </button>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {phase === 'read' && (
        <div className="orf-actions">
          <button className="orf-action-btn orf-action-btn--real" onClick={guard(() => pick('real'))}>
            <span className="orf-action-glyph">✓</span>
            <span className="orf-action-label">REAL</span>
          </button>
          <button className="orf-action-btn orf-action-btn--fake" onClick={guard(() => pick('fake'))}>
            <span className="orf-action-glyph">✗</span>
            <span className="orf-action-label">FAKE</span>
          </button>
        </div>
      )}

      </div>
    </div>
  )
}
