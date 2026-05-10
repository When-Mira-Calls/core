import React, { useState, useEffect, useRef, useCallback } from 'react'
import { playCorrect, playWrong, playClick, playCardIn } from './sounds'

const ROUNDS = [
  {
    id: 1, label: 'ROUND 1', sublabel: 'SLOW', timePerPopup: 10,
    popups: [
      {
        id: 'r1-a', verdict: 'fake', template: 'ad',
        banner: '⭐ YOU HAVE BEEN SELECTED ⭐',
        emoji: '🎣',
        headline: ['WIN A PROFESSIONAL', 'FISHING ROD SET'],
        value: 'WORTH $350',
        claim: 'Claim your prize in the next 60 seconds!',
        hasTimer: true,
        cta: 'CLAIM NOW →',
        domain: 'seabright-freegear-claims.co',
        mark: 'seabright-freegear-claims.co',
        flag: 'FAKE DOMAIN',
        explanation: 'Real SeaGear Direct emails come from seageardirect.com. The countdown resets on loop - the prize never disappears. You cannot win a competition you never entered.',
      },
      {
        id: 'r1-b', verdict: 'real', template: 'notification',
        appIcon: '🌊', appName: 'Seabright Tides',
        title: 'Tide update for today',
        body: 'High tide 14:22 · Wind 18 kn NW · Swell 1.2 m · Small craft advisory until 18:00',
        domain: 'seabright-tides.gov',
        mark: 'seabright-tides.gov',
        flag: 'OFFICIAL .GOV DOMAIN',
        explanation: 'The notification comes from seabright-tides.gov - a government-verified domain. No urgency, no personal information requested.',
      },
      {
        id: 'r1-c', verdict: 'real', template: 'notification',
        appIcon: '🎮', appName: 'Roblox',
        title: 'FisherKid99 sent you a friend request',
        body: 'Accept or ignore from your friends page on roblox.com',
        domain: 'roblox.com',
        mark: 'roblox.com',
        flag: 'OFFICIAL DOMAIN',
        explanation: 'The notification is from roblox.com - the real Roblox domain. No login details requested, no urgency. This is a standard friend request notification.',
      },
    ],
  },
  {
    id: 2, label: 'ROUND 2', sublabel: 'MEDIUM', timePerPopup: 7,
    popups: [
      {
        id: 'r2-a', verdict: 'fake', template: 'ad',
        banner: '🎁 CONGRATULATIONS - 1,000,000TH CUSTOMER 🎁',
        emoji: '💰',
        headline: ['YOU HAVE WON', 'A $500 GIFT CARD'],
        value: '$500 AMAZON CREDIT',
        claim: 'This offer expires in 30 minutes. Tap below to claim.',
        hasTimer: false,
        cta: 'CLAIM YOUR PRIZE →',
        domain: 'amazon-prize-centre.com',
        mark: 'amazon-prize-centre.com',
        flag: 'FAKE DOMAIN',
        explanation: 'Real Amazon emails come from amazon.com - never amazon-prize-centre.com. Amazon does not give away prizes to millionth customers. The 30-minute deadline is a pressure tactic.',
      },
      {
        id: 'r2-b', verdict: 'fake', template: 'sms',
        smsFrom: 'SCHOOL ADMIN',
        smsBody: 'URGENT: Your school account will be deleted in 24 hours unless you verify at:',
        smsLink: 'school-accounts-verify.com/students',
        domain: 'school-accounts-verify.com',
        mark: 'school-accounts-verify.com',
        flag: 'FAKE DOMAIN + URGENCY',
        explanation: 'Schools do not delete student accounts via text with 24-hour warnings. school-accounts-verify.com is not a real school domain. Classic urgency + fear combination.',
      },
      {
        id: 'r2-c', verdict: 'real', template: 'notification',
        appIcon: '▶', appName: 'YouTube',
        title: 'CrabCam uploaded a new video',
        body: 'Storm season at Seabright Harbour - watch now on youtube.com',
        domain: 'youtube.com',
        mark: 'youtube.com',
        flag: 'OFFICIAL DOMAIN',
        explanation: 'The notification is from youtube.com - the real YouTube domain. No personal information requested, no urgency.',
      },
      {
        id: 'r2-d', verdict: 'real', template: 'notification',
        appIcon: '🛵', appName: 'DoorDash',
        title: 'Your order is on its way',
        body: 'The Harbour Kitchen · Arriving in ~25 min · Track at doordash.com',
        domain: 'doordash.com',
        mark: 'doordash.com',
        flag: 'OFFICIAL DOMAIN',
        explanation: 'The notification is from doordash.com - the real DoorDash domain. No payment details requested. This is a genuine delivery update.',
      },
    ],
  },
  {
    id: 3, label: 'ROUND 3', sublabel: 'FAST', timePerPopup: 5,
    popups: [
      {
        id: 'r3-a', verdict: 'fake', template: 'ad',
        banner: '⏱ FINAL CHANCE - CLAIM NOW ⏱',
        emoji: '🎣',
        headline: ['LAST OPPORTUNITY', 'FISHING ROD PRIZE'],
        value: 'WORTH $350',
        claim: 'When it reaches zero the prize is gone.',
        hasTimer: true,
        cta: 'CLAIM BEFORE TIME RUNS OUT →',
        domain: 'seabright-prizes-online.net',
        mark: 'seabright-prizes-online.net',
        flag: 'FAKE DOMAIN + FAKE TIMER',
        explanation: 'Same looping timer trick - different fake domain. seabright-prizes-online.net is not SeaGear Direct. The timer resets forever. There is no prize.',
      },
      {
        id: 'r3-b', verdict: 'fake', template: 'alert',
        alertIcon: '⛔',
        alertBrand: 'Minecraft Support',
        alertTitle: 'Account Flagged for Permanent Ban',
        alertBody: 'Suspicious activity detected on your Minecraft account. You have 12 hours to verify your identity or your account will be permanently deleted.',
        alertCta: 'VERIFY NOW → minecraft-bans-support.net/appeal',
        domain: 'minecraft-bans-support.net',
        mark: 'minecraft-bans-support.net',
        flag: 'FAKE DOMAIN',
        explanation: 'Real Minecraft emails come from minecraft.net or microsoft.com - not minecraft-bans-support.net. Ban warnings with urgent deadlines sent to off-brand domains are a classic scam.',
      },
      {
        id: 'r3-c', verdict: 'fake', template: 'alert',
        alertIcon: '🔒',
        alertBrand: 'PlayStation Network',
        alertTitle: 'Your PSN Account Has Been Suspended',
        alertBody: 'Unusual sign-in activity detected. Your account is temporarily suspended. Verify your identity within 6 hours to restore access.',
        alertCta: 'RESTORE ACCESS → playstation-account-alerts.org/verify',
        domain: 'playstation-account-alerts.org',
        mark: 'playstation-account-alerts.org',
        flag: 'FAKE DOMAIN',
        explanation: 'Real PlayStation emails come from playstation.com - not playstation-account-alerts.org. Suspension warnings with off-domain links and 6-hour deadlines are scam patterns.',
      },
      {
        id: 'r3-d', verdict: 'real', template: 'notification',
        appIcon: 'G', appName: 'Google',
        title: 'Password reset completed',
        body: 'Your Google Account password was changed. If this was you, no action needed. accounts.google.com',
        domain: 'accounts.google.com',
        mark: 'accounts.google.com',
        flag: 'OFFICIAL GOOGLE SUBDOMAIN',
        explanation: 'The notification is from accounts.google.com - a verified Google subdomain. No credentials requested, no urgency. This is a routine security confirmation.',
      },
      {
        id: 'r3-e', verdict: 'real', template: 'notification',
        appIcon: '📚', appName: 'Seabright Elementary',
        title: 'September newsletter',
        body: 'Term dates, events, and a message from the principal. View at seabrightelem.edu',
        domain: 'seabrightelem.edu',
        mark: 'seabrightelem.edu',
        flag: 'OFFICIAL .EDU DOMAIN',
        explanation: '.edu domains are registered to accredited US schools and educational institutions. No urgency, no personal information requested. This is a genuine school newsletter.',
      },
    ],
  },
  {
    id: 4, label: 'BONUS ROUND', sublabel: 'EXPERT', timePerPopup: 5,
    popups: [
      {
        id: 'r4-a', verdict: 'fake', template: 'alert',
        alertIcon: '⚠️',
        alertBrand: 'Amazon',
        alertTitle: 'Action Required: Verify Your Payment Method',
        alertBody: 'We were unable to process your recent payment. To avoid service interruption, please verify your payment details within 48 hours.',
        alertCta: 'UPDATE PAYMENT → amazon-us.co/payments/verify',
        domain: 'amazon-us.co',
        mark: 'amazon-us.co',
        flag: 'WRONG DOMAIN',
        explanation: 'This is the hardest to spot. The name and design look right - but the address is amazon-us.co, not amazon.com. The hyphen and the .co ending are the giveaway. Real Amazon emails always come from amazon.com.',
      },
    ],
  },
]

function useLoopTimer(active) {
  const [t, setT] = useState(8)
  const ref = useRef(null)
  useEffect(() => {
    if (!active) { setT(8); clearInterval(ref.current); return }
    setT(8)
    ref.current = setInterval(() => setT(v => v <= 1 ? 8 : v - 1), 1000)
    return () => clearInterval(ref.current)
  }, [active])
  return t
}

function AdPopup({ popup, phase, loopSecs }) {
  const revealed = phase === 'result'
  return (
    <div className={`pg-popup-ad${revealed ? ' pg-popup-ad--' + popup.verdict : ''}`}>
      {revealed && <div className={'pg-stamp pg-stamp--' + popup.verdict}>{popup.verdict === 'fake' ? 'SCAM' : 'SAFE'}</div>}
      <div className="pg-ad-banner">{popup.banner}</div>
      <div className="pg-ad-emoji">{popup.emoji}</div>
      <div className="pg-ad-headline">{popup.headline.map((l, i) => <div key={i}>{l}</div>)}</div>
      <div className="pg-ad-value">{popup.value}</div>
      <div className="pg-ad-claim">{popup.claim}</div>
      {popup.hasTimer && (
        <div className="pg-ad-timer">
          {String(Math.floor(loopSecs / 60)).padStart(2, '0')}:{String(loopSecs % 60).padStart(2, '0')}
        </div>
      )}
      <div className={'pg-ad-domain' + (revealed ? ' pg-ad-domain--revealed' : '')}>
        {revealed
          ? <><span style={{color:'inherit'}}>{popup.domain.replace(popup.mark, '')}</span><span className="pg-mark--fake">{popup.mark}</span></>
          : popup.domain}
      </div>
      <div className="pg-ad-cta">{popup.cta}</div>
    </div>
  )
}

function AlertPopup({ popup, phase }) {
  const revealed = phase === 'result'
  const [before, after] = popup.alertCta.split(popup.mark)
  return (
    <div className={'pg-popup-alert' + (revealed ? ' pg-popup-alert--' + popup.verdict : '')}>
      {revealed && <div className={'pg-stamp pg-stamp--' + popup.verdict}>{popup.verdict === 'fake' ? 'SCAM' : 'SAFE'}</div>}
      <div className="pg-alert-header">
        <span className="pg-alert-icon">{popup.alertIcon}</span>
        <span className="pg-alert-brand">{popup.alertBrand}</span>
      </div>
      <div className="pg-alert-title">{popup.alertTitle}</div>
      <p className="pg-alert-body">{popup.alertBody}</p>
      <div className={'pg-alert-cta' + (revealed ? ' pg-alert-cta--' + popup.verdict : '')}>
        {revealed ? <>{before}<span className="pg-mark--fake">{popup.mark}</span>{after}</> : popup.alertCta}
      </div>
    </div>
  )
}

function SmsPopup({ popup, phase }) {
  const revealed = phase === 'result'
  return (
    <div className={'pg-popup-sms' + (revealed ? ' pg-popup-sms--' + popup.verdict : '')}>
      {revealed && <div className={'pg-stamp pg-stamp--' + popup.verdict}>{popup.verdict === 'fake' ? 'SCAM' : 'SAFE'}</div>}
      <div className="pg-sms-bar">
        <span className="pg-sms-label">SMS</span>
        <span className="pg-sms-from">{popup.smsFrom}</span>
      </div>
      <div className="pg-sms-bubble">
        <p className="pg-sms-text">{popup.smsBody}</p>
        <span className={revealed ? 'pg-mark--fake' : 'pg-sms-link'}>{popup.smsLink}</span>
      </div>
    </div>
  )
}

function NotifPopup({ popup, phase }) {
  const revealed = phase === 'result'
  const [before, after] = popup.body.split(popup.mark)
  return (
    <div className={'pg-popup-notif' + (revealed ? ' pg-popup-notif--' + popup.verdict : '')}>
      {revealed && <div className={'pg-stamp pg-stamp--' + popup.verdict}>{popup.verdict === 'fake' ? 'SCAM' : 'SAFE'}</div>}
      <div className="pg-notif-row">
        <div className="pg-notif-icon">{popup.appIcon}</div>
        <div className="pg-notif-content">
          <div className="pg-notif-app">{popup.appName}</div>
          <div className="pg-notif-title">{popup.title}</div>
          <div className="pg-notif-body">
            {revealed ? <>{before}<span className="pg-mark--real">{popup.mark}</span>{after}</> : popup.body}
          </div>
        </div>
      </div>
    </div>
  )
}

function PopupRenderer({ popup, phase, loopSecs }) {
  if (popup.template === 'ad')    return <AdPopup popup={popup} phase={phase} loopSecs={loopSecs} />
  if (popup.template === 'alert') return <AlertPopup popup={popup} phase={phase} />
  if (popup.template === 'sms')   return <SmsPopup popup={popup} phase={phase} />
  return <NotifPopup popup={popup} phase={phase} />
}

function TimerBar({ seconds, total }) {
  const pct = Math.max(0, seconds / total) * 100
  return (
    <div className="pg-timer-bar-wrap">
      <div className={'pg-timer-bar' + (pct < 35 ? ' pg-timer-bar--danger' : '')} style={{ width: pct + '%' }} />
      <span className="pg-timer-seconds">{seconds}s</span>
    </div>
  )
}

export default function PopupGame({ onComplete }) {
  const [roundIdx, setRoundIdx] = useState(0)
  const [popupIdx, setPopupIdx] = useState(0)
  const [phase, setPhase]       = useState('intro')
  const [timeLeft, setTimeLeft] = useState(0)
  const [choice, setChoice]     = useState(null)
  const [results, setResults]   = useState([])
  const countRef                = useRef(null)

  const round  = ROUNDS[roundIdx]
  const popup  = round?.popups[popupIdx]
  const isLast = roundIdx === ROUNDS.length - 1 && popupIdx === (round?.popups.length ?? 1) - 1
  const loopSecs = useLoopTimer(phase === 'playing' && !!popup?.hasTimer)

  useEffect(() => {
    if (phase !== 'playing') return
    setTimeLeft(round.timePerPopup)
    countRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(countRef.current); setChoice('timeout'); setPhase('result'); playWrong(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(countRef.current)
  }, [phase, roundIdx, popupIdx, round?.timePerPopup])

  const handleChoice = useCallback((c) => {
    if (phase !== 'playing') return
    clearInterval(countRef.current)
    const ok = (c === 'close' && popup.verdict === 'fake') || (c === 'leave' && popup.verdict === 'real')
    setChoice(c); setResults(r => [...r, { roundId: round.id, popupId: popup.id, correct: ok }])
    ok ? playCorrect() : playWrong(); setPhase('result')
  }, [phase, popup, round])

  const advance = useCallback(() => {
    playClick()
    if (popupIdx >= round.popups.length - 1) {
      roundIdx >= ROUNDS.length - 1 ? setPhase('done') : setPhase('roundEnd')
    } else { setPopupIdx(i => i + 1); setChoice(null); setPhase('playing') }
  }, [popupIdx, round, roundIdx])

  const startNext = () => { playCardIn(); setRoundIdx(i => i + 1); setPopupIdx(0); setChoice(null); setPhase('playing') }

  const isCorrect = choice && (
    (choice === 'close' && popup?.verdict === 'fake') || (choice === 'leave' && popup?.verdict === 'real')
  )

  if (phase === 'intro') return (
    <div className="pg-root">
      <div className="pg-hud"><span className="pg-hud-label">{round.label}</span><span className="pg-hud-sub">{round.sublabel}</span></div>
      <div className="pg-center-panel">
        <div className="pg-intro-round">{round.label}</div>
        <div className="pg-intro-speed">{round.sublabel}</div>
        <p className="pg-intro-desc">{round.popups.length} pop-up{round.popups.length > 1 ? 's' : ''} · {round.timePerPopup} seconds each</p>
        <button className="pg-start-btn" onClick={() => { playCardIn(); setPhase('playing') }}>START →</button>
      </div>
    </div>
  )

  if (phase === 'roundEnd') {
    const rr = results.filter(r => r.roundId === round.id)
    const rc = rr.filter(r => r.correct).length
    return (
      <div className="pg-root">
        <div className="pg-hud"><span className="pg-hud-label">{round.label} COMPLETE</span></div>
        <div className="pg-center-panel">
          <div className="pg-score-big">{rc}<span className="pg-score-of">/{rr.length}</span></div>
          <div className="pg-score-label">fishermen kept safe</div>
          <button className="pg-start-btn" style={{ marginTop: 24 }} onClick={startNext}>{ROUNDS[roundIdx + 1].label} →</button>
        </div>
      </div>
    )
  }

  if (phase === 'done') {
    const total = results.length
    const correct = results.filter(r => r.correct).length
    const canContinue = correct >= 7
    const retry = () => { playClick(); setRoundIdx(0); setPopupIdx(0); setChoice(null); setResults([]); setPhase('intro') }
    return (
      <div className="pg-root">
        <div className="pg-hud"><span className="pg-hud-label">EXERCISE COMPLETE</span></div>
        <div className="pg-center-panel">
          <div className="pg-score-big">{correct}<span className="pg-score-of">/{total}</span></div>
          <div className="pg-score-label">fishermen kept safe</div>
          <div className="pg-done-cards">
            {ROUNDS.map(rnd => {
              const rr = results.filter(r => r.roundId === rnd.id)
              const rc = rr.filter(r => r.correct).length
              return (
                <div key={rnd.id} className={'pg-done-card' + (rc === rr.length ? ' pg-done-card--ok' : rc > 0 ? ' pg-done-card--partial' : ' pg-done-card--bad')}>
                  <span className="pg-done-card-label">{rnd.label}</span>
                  <span className="pg-done-card-score">{rc}/{rr.length}</span>
                </div>
              )
            })}
          </div>
          {canContinue ? (
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button className="pg-start-btn pg-retry-btn" onClick={retry}>TRY AGAIN ↺</button>
              <button className="pg-start-btn" onClick={() => { playClick(); onComplete() }}>CONTINUE →</button>
            </div>
          ) : (
            <button className="pg-start-btn pg-retry-btn" style={{ marginTop: 24 }} onClick={retry}>TRY AGAIN ↺</button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="pg-root">
      <div className="pg-hud">
        <span className="pg-hud-label">{round.label}</span>
        <div className="pg-hud-pips">
          {round.popups.map((_, i) => (
            <span key={i} className={'pg-pip' + (i < popupIdx ? ' pg-pip--done' : i === popupIdx ? ' pg-pip--active' : '')} />
          ))}
        </div>
        <span className="pg-hud-count">{popupIdx + 1}/{round.popups.length}</span>
      </div>

      {phase === 'playing' && <TimerBar seconds={timeLeft} total={round.timePerPopup} />}

      <div className="pg-tablet-wrap">
        <div className="pg-tablet-frame">
          <div className="pg-tablet-urlbar">
            <span className="pg-tablet-urlbar-lock">🔒</span>
            <span className="pg-tablet-urlbar-text">{popup.domain}</span>
          </div>
          <div className="pg-tablet-screen">
            <div className="pg-tablet-bg">
              <div className="pg-tablet-bg-label">SEABRIGHT WEATHER &amp; TIDES</div>
              <div className="pg-tablet-bg-row">Wind: 12 kn NW &nbsp;|&nbsp; Tide: High 14:22 &nbsp;|&nbsp; Swell: 0.8 m</div>
            </div>
            <div className="pg-tablet-popup-overlay">
              <div key={popup.id} className="pg-popup-anim">
                <PopupRenderer popup={popup} phase={phase} loopSecs={loopSecs} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {phase === 'result' && (
        <div className={'pg-verdict-panel' + (isCorrect ? ' pg-verdict-panel--ok' : ' pg-verdict-panel--wrong')}>
          <div className="pg-verdict-header">
            <span className="pg-verdict-icon">
              {choice === 'timeout' ? '⏱' : isCorrect ? '✓' : '✗'}
            </span>
            <div className="pg-verdict-text">
              <div className="pg-verdict-result">
                {choice === 'timeout' ? 'TOO SLOW' : isCorrect ? 'CORRECT' : 'INCORRECT'}
              </div>
              <div className="pg-verdict-sub">THIS WAS {popup.verdict.toUpperCase()}</div>
            </div>
          </div>
          <div className="pg-verdict-flag">
            <span className="pg-verdict-flag-label">
              {popup.verdict === 'fake' ? 'RED FLAG' : "WHY IT'S SAFE"}
            </span>
            <span className="pg-verdict-flag-text">{popup.flag}</span>
          </div>
          <p className="pg-verdict-body">{popup.explanation}</p>
          <button className="pg-next-btn" onClick={advance}>
            {isLast ? 'SEE RESULTS' : popupIdx >= round.popups.length - 1 ? 'NEXT ROUND →' : 'NEXT →'}
          </button>
        </div>
      )}

      {phase === 'playing' && (
        <div className="pg-actions">
          <button className="pg-action-btn pg-action-btn--close" onClick={() => handleChoice('close')}>
            <span className="pg-action-glyph">✕</span>
            <span className="pg-action-label">CLOSE IT</span>
          </button>
          <button className="pg-action-btn pg-action-btn--leave" onClick={() => handleChoice('leave')}>
            <span className="pg-action-glyph">✓</span>
            <span className="pg-action-label">LEAVE IT</span>
          </button>
        </div>
      )}
    </div>
  )
}
