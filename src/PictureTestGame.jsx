import React, { useMemo, useState } from 'react'
import { playCardIn, playClick, playCorrect, playPartial, playWrong } from './sounds'

const POSTS = [
  {
    id: 'marcus-room14',
    author: 'Marcus',
    handle: '@marcus_skates',
    privacy: 'Public',
    text: 'Just got home from Sunshare Comp. Room 14 is the best classroom change my mind @JayJay12 @Priya_arts',
    history: ['Location tags show Marcus usually walks home via Millbank Road.'],
    correctAction: 'edit',
    editTargets: ['Sunshare Comp', 'Room 14', '@JayJay12', '@Priya_arts'],
    feedback: 'Edit the school/classroom detail and tagged friends before this goes public.',
    explanations: [
      { id: 'A', text: 'This tells people which room you are in and which way you walk home - that is a map of your day.' },
      { id: 'B', text: 'Tagging your friends shares your post with everyone who follows them too.' },
      { id: 'C', text: 'Both A and B - the classroom, the route, and the tagged friends together build a picture a stranger could use.' },
    ],
    correctExplanation: 'C',
  },
  {
    id: 'priya-sunset',
    author: 'Priya',
    handle: '@Priya_arts',
    privacy: 'Public',
    text: 'This sunset is everything',
    photo: 'generic beach sunset, no people, no signs, no school badge, no location tag',
    history: ['No location tag.', 'No people visible.', 'No identifying details in the image.'],
    correctAction: 'approve',
    feedback: 'Approve. The safety comes from the absence of identifying details.',
    explanations: [
      { id: 'A', text: 'This shares nothing that identifies you, where you are, or who you are with.' },
      { id: 'B', text: 'Sunset photos are always safe.' },
      { id: 'C', text: 'You should always approve photos of nature.' },
    ],
    correctExplanation: 'A',
  },
  {
    id: 'jaylen-away-match',
    author: 'Jaylen',
    handle: '@JayJay12',
    privacy: 'Public',
    text: 'Huge win for the team today!! Away match at Riverside Secondary, we destroyed them 4-1. Back home by 6 if anyone wants to meet up at the square',
    history: ['His home address is visible on a previous photo.'],
    correctAction: 'edit',
    editTargets: ['Back home by 6', 'meet up at the square'],
    feedback: 'Edit out the arrival time and meet-up invitation before it goes public.',
    explanations: [
      { id: 'A', text: 'Saying when you will be home tells people when your house is empty.' },
      { id: 'B', text: 'You should not post about football matches.' },
      { id: 'C', text: 'Announcing a meet-up time is fine as long as you do not give your address.' },
    ],
    correctExplanation: 'A',
  },
  {
    id: 'soren-locker',
    author: 'Soren',
    handle: '@soren_new',
    privacy: 'Public',
    text: 'Started at Sunshare Academy this week. Year 8. Loving it so far. My locker is number 47 if anyone wants to come say hi',
    history: ['First post.', 'No history yet.'],
    correctAction: 'edit',
    editTargets: ['My locker is number 47'],
    feedback: 'Edit out the locker number. It is too specific for a public post.',
    explanations: [
      { id: 'A', text: 'A locker number tells someone exactly where to find you in the building.' },
      { id: 'B', text: 'New students should not post at all.' },
      { id: 'C', text: 'School year is the dangerous detail here.' },
    ],
    correctExplanation: 'A',
  },
  {
    id: 'priya-brother',
    author: 'Priya',
    handle: '@Priya_arts',
    privacy: 'Private',
    text: 'So proud of my little brother! Started Year 6 today at Millbank Primary. He was so nervous but he smashed it',
    history: ['No location tag.', 'Profile is already private.', 'Only approved followers can see this post.'],
    correctAction: 'approve',
    feedback: 'Approve for a private audience. The key is chosen followers, not the whole public board.',
    explanations: [
      { id: 'A', text: 'This shares your brother\'s school and year group - that is his information, not yours to post publicly. Because this account is private, sharing with chosen followers is safer than posting it publicly.' },
      { id: 'B', text: 'Posts about family are always private.' },
      { id: 'C', text: 'Year 6 is not a dangerous detail.' },
    ],
    correctExplanation: 'A',
  },
]

function HighlightedPost({ post, revealEdits }) {
  if (!revealEdits || !post.editTargets?.length) return <>{post.text}</>
  const matches = post.editTargets
    .map(target => ({ target, index: post.text.indexOf(target) }))
    .filter(m => m.index >= 0)
    .sort((a, b) => a.index - b.index)

  if (!matches.length) return <>{post.text}</>

  const parts = []
  let cursor = 0
  matches.forEach(({ target, index }) => {
    if (index > cursor) parts.push(post.text.slice(cursor, index))
    parts.push(<mark key={`${target}-${index}`} className="ptg-risk-mark">{target}</mark>)
    cursor = index + target.length
  })
  if (cursor < post.text.length) parts.push(post.text.slice(cursor))
  return <>{parts}</>
}

function actionLabel(action) {
  if (action === 'approve') return 'APPROVE'
  if (action === 'edit') return 'EDIT'
  return 'HOLD'
}

export default function PictureTestGame({ onComplete }) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('decide')
  const [decision, setDecision] = useState(null)
  const [explanation, setExplanation] = useState(null)
  const [results, setResults] = useState([])

  const post = POSTS[idx]
  const isLast = idx === POSTS.length - 1
  const decisionCorrect = decision === post.correctAction
  const explanationCorrect = explanation === post.correctExplanation
  const fullCorrect = decisionCorrect && explanationCorrect

  const score = useMemo(() => results.filter(r => r.fullCorrect).length, [results])

  const chooseDecision = (choice) => {
    if (phase !== 'decide') return
    setDecision(choice)
    playClick()
    setPhase('explain')
  }

  const chooseExplanation = (choice) => {
    if (phase !== 'explain') return
    const full = decision === post.correctAction && choice === post.correctExplanation
    setExplanation(choice)
    setResults(prev => [...prev, { postId: post.id, decisionCorrect: decision === post.correctAction, explanationCorrect: choice === post.correctExplanation, fullCorrect: full }])
    full ? playCorrect() : decision === post.correctAction || choice === post.correctExplanation ? playPartial() : playWrong()
    setPhase('feedback')
  }

  const next = () => {
    playCardIn()
    if (isLast) {
      setPhase('done')
      return
    }
    setIdx(i => i + 1)
    setPhase('decide')
    setDecision(null)
    setExplanation(null)
  }

  const reset = () => {
    playClick()
    setIdx(0)
    setPhase('decide')
    setDecision(null)
    setExplanation(null)
    setResults([])
  }

  if (phase === 'done') {
    const canContinue = score >= 3
    return (
      <div className="ptg-root">
        <div className="ptg-board-bg" aria-hidden="true" />
        <div className="ptg-shell ptg-shell--done">
          <div className="ptg-topbar">
            <span>THE PICTURE TEST</span>
            <span>BOARD REVIEW COMPLETE</span>
          </div>
          <div className="ptg-score">
            <div className="ptg-score-big">{score}<span>/{POSTS.length}</span></div>
            <div className="ptg-score-label">posts fully checked</div>
          </div>
          <div className="ptg-result-list">
            {POSTS.map((p, i) => (
              <div key={p.id} className={`ptg-result-row${results[i]?.fullCorrect ? ' ptg-result-row--ok' : ' ptg-result-row--bad'}`}>
                <span>{results[i]?.fullCorrect ? '✓' : '!'}</span>
                <strong>{p.author}</strong>
                <em>{actionLabel(p.correctAction)}</em>
              </div>
            ))}
          </div>
          <p className="ptg-done-note">
            {canContinue
              ? 'Good enough to move on. You spotted the pattern: the whole picture matters more than any one post.'
              : 'You need at least 3 fully checked posts to move on. A good decision and the right explanation both matter.'}
          </p>
          {canContinue ? (
            <button className="ptg-primary-btn" onClick={() => { playClick(); onComplete() }}>CONTINUE →</button>
          ) : (
            <button className="ptg-primary-btn ptg-primary-btn--retry" onClick={reset}>TRY AGAIN ↺</button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="ptg-root">
      <div className="ptg-board-bg" aria-hidden="true" />
      <div className="ptg-shell">
        <div className="ptg-topbar">
          <span>PUBLIC BOARD QUEUE</span>
          <span>{idx + 1} / {POSTS.length}</span>
        </div>

        <div className="ptg-main">
          <section className="ptg-post-panel">
            <div className="ptg-post-head">
              <div className="ptg-avatar">{post.author.charAt(0)}</div>
              <div>
                <div className="ptg-author">{post.author}</div>
                <div className="ptg-handle">{post.handle}</div>
              </div>
              <div className={`ptg-privacy ptg-privacy--${post.privacy.toLowerCase()}`}>{post.privacy}</div>
            </div>

            <p className="ptg-post-text">
              <HighlightedPost post={post} revealEdits={phase !== 'decide' && post.correctAction === 'edit'} />
            </p>

            {post.photo && (
              <div className="ptg-photo">
                <div className="ptg-sun" />
                <div className="ptg-sea" />
                <span>{post.photo}</span>
              </div>
            )}

            <div className="ptg-history">
              <div className="ptg-history-label">RECENT HISTORY</div>
              {post.history.map(item => <div key={item} className="ptg-history-item">{item}</div>)}
            </div>
          </section>

          <aside className="ptg-control-panel">
            {phase === 'decide' && (
              <>
                <div className="ptg-panel-title">CHECK BEFORE IT GOES LIVE</div>
                <p className="ptg-panel-copy">What should happen to this post?</p>
                <div className="ptg-actions">
                  {['approve', 'edit', 'hold'].map(action => (
                    <button key={action} className={`ptg-action ptg-action--${action}`} onClick={() => chooseDecision(action)}>
                      {actionLabel(action)}
                    </button>
                  ))}
                </div>
              </>
            )}

            {phase === 'explain' && (
              <>
                <div className={`ptg-decision-chip${decisionCorrect ? ' ptg-decision-chip--ok' : ' ptg-decision-chip--bad'}`}>
                  YOU CHOSE {actionLabel(decision)}
                </div>
                <div className="ptg-panel-title">WHY?</div>
                <p className="ptg-panel-copy">Choose the explanation that best describes the risk.</p>
                <div className="ptg-explanations">
                  {post.explanations.map(opt => (
                    <button key={opt.id} className="ptg-explanation" onClick={() => chooseExplanation(opt.id)}>
                      <span>{opt.id}</span>
                      {opt.text}
                    </button>
                  ))}
                </div>
              </>
            )}

            {phase === 'feedback' && (
              <>
                <div className={`ptg-feedback ${fullCorrect ? 'ptg-feedback--ok' : 'ptg-feedback--bad'}`}>
                  <div className="ptg-feedback-title">{fullCorrect ? 'FULL POINT' : decisionCorrect || explanationCorrect ? 'PARTLY SPOTTED' : 'TRY THE PICTURE AGAIN'}</div>
                  <p>{post.feedback}</p>
                  <p>The best answer is <strong>{actionLabel(post.correctAction)}</strong>, explanation <strong>{post.correctExplanation}</strong>.</p>
                </div>
                <button className="ptg-primary-btn" onClick={next}>{isLast ? 'SEE RESULTS' : 'NEXT POST →'}</button>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
