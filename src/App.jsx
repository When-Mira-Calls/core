import React, { useState, useEffect, useCallback, useRef } from 'react'
import PhishGame from './PhishGame'
import TextAnalyzer from './TextAnalyzer'
import PasswordChest from './PasswordChest'
import aunt1 from '../assets/Aunt 1.png'
import aunt1Left from '../assets/Aunt 1_left.png'
import aunt1Thinking from '../assets/Aunt 1 - thinking.png'
import aunt1Upset from '../assets/Aunt 1 - upset.png'
import aunt2 from '../assets/Aunt 2.png'
import aunt2Left from '../assets/Aunt 2_left.png'
import backArrow from '../assets/Back Arrow.png'
import nextArrow from '../assets/Next Arrow.png'
import observatoryExt from '../assets/Observatory Ext.png'
import observatoryInt from '../assets/Observatory Int.png'
import shadowFigure from '../assets/shadow.png'

// Cinematic narrator positions — irregular left/right rhythm, not strict alternation
const NARRATOR_POSITIONS = [
  'left', 'right', 'left', 'left', 'right', 'right',
  'left', 'right', 'left', 'right', 'right', 'left',
]
const narratorPos = (lineIndex) => NARRATOR_POSITIONS[lineIndex % NARRATOR_POSITIONS.length]

const story = [
  {
    background: '#1e1e2f',
    characters: [
      { id: 'aunt1', side: 'left', name: 'Aunt 1', portrait: aunt1, portraitLeft: aunt1Left },
      { id: 'aunt2', side: 'right', name: 'Aunt 2', portrait: aunt2, portraitLeft: aunt2Left },
    ],
    dialogue: [
      { speaker: 'Narrator', text: 'You wake up in a dimly lit control room.' },
      { speaker: 'Aunt 2', text: 'Good, you are awake. We have little time.' },
    ],
  },
  {
    background: '#0f2d2e',
    characters: [
      { id: 'aunt1', side: 'left', name: 'Aunt 1', portrait: aunt1, portraitLeft: aunt1Left },
    ],
    dialogue: [
      { speaker: 'Aunt 1', text: 'What happened? Where am I?' },
      { speaker: 'Narrator', text: 'A cold wind brushes past the monitors.' },
    ],
  },
]

const observatoryStory = {
  dialogue: [
    { speaker: 'Narrator', text: 'The Observatory sits at the top of a hill above Sunshare Square, and it is not what you expected.' },
    { speaker: 'Narrator', text: 'You expected a building full of telescopes pointing at stars.' },
    { speaker: 'Narrator', text: 'Instead, it feels like a room built to see patterns. Banks of screens, maps of connections, and data flowing across curved walls.' },
    { speaker: 'Narrator', text: 'Everything below is visible from here. Seabright. Sunshare Square. The trails that connect them.' },
    { speaker: '[YOUR NAME]', text: 'That red trail. That is him. That is the Shadow Man.' },
    { speaker: '[YOUR NAME]', text: 'That red trail. That is him. That is the Shadow Man.', shake: true, showShadow: true },
    { speaker: 'Narrator', text: 'You stand still, reading the map.' },
    { speaker: 'Narrator', text: 'The red trail stops and starts. It pauses at the lighthouse cliff. It lingers at the edges of Sunshare Square.' },
    { speaker: 'Narrator', text: 'It has been following you at a careful distance this entire time.' },
    { speaker: 'Narrator', text: 'But it has also been doing something else - reaching into Seabright, into the square, taking small pieces. Information. Details. Gaps.' },
    { speaker: 'Narrator', text: 'And then you hear movement behind you. And everything stops.' },
    { speaker: '', text: '', blackout: true, hideBubble: true },
    { speaker: 'Woman A', text: 'You made it. I am Aunt Mira. Give me the items - we need them to stop him.', showWomen: true, hideWomanB: true },
    { speaker: 'Woman B', text: 'You made it. I am Aunt Mira. Give me the items - we need them to stop him.', showWomen: true, revealWomanB: true },
    { speaker: 'Narrator', text: 'Word for word. Tone for tone. You cannot tell them apart. And one of them is lying.', showWomen: true },
    { speaker: '[YOUR NAME]', text: '...I cannot give the items to either of you. Not yet.', showWomen: true },
    { speaker: 'WOMAN A', text: 'You are right. Do not give anything to either of us yet. Not until you are certain. I taught you how to be certain. Use what you know.', showWomen: true, emotion: 'thinking' },
    { speaker: 'WOMAN B', text: 'You are right. Do not give anything to either of us yet. Not until you are certain. I taught you how to be certain. Use what you know.', showWomen: true, emotion: 'thinking' },
    { speaker: 'Narrator', text: 'Both of them said it. You cannot tell which gave good advice and which was copying it. You stand in the middle of the Observatory, the strongbox in your hands, and you understand exactly what this is.', showWomen: true },
    { speaker: 'Narrator', text: 'The Shadow Man sent someone ahead. A trap at the finish line. And the only way through it is to use everything you have learned.', showWomen: true },
    { speaker: '[YOUR NAME]', text: 'I am going to look around first. The answer is somewhere in this room.', showWomen: true },
    { speaker: '', text: '', showSmishing: true, hideBubble: true },
    { speaker: '[YOUR NAME]', text: 'This is smishing. A fake text - but using real personal information to make it feel real.', showSmishing: true },
    { speaker: 'WOMAN A', text: 'Look at what it uses. His first name. His school name. A saved contact name that seemed official. All of that came from his public profile. Without the personal information, this is just a generic scam. With it, it feels personal.', showWomen: true, showSmishing: true, emotion: 'thinking' },
    { speaker: 'WOMAN B', text: 'Look at what it uses. His first name. His school name. A saved contact name that seemed official. All of that came from his public profile. Without the personal information, this is just a generic scam. With it, it feels personal.', showWomen: true, showSmishing: true, emotion: 'thinking' },
    { speaker: '', text: '', showSmishingInfo: true, hideBubble: true },
    { speaker: 'WOMAN B', text: 'We are running out of time. He is still tracking the strongbox. Just give me the items now and we can lock him out before he gets closer.', showWomen: true, emotion: 'upset' },
  ],
}

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [view, setView] = useState('home') // 'home' | 'story' | 'story-classic' | 'story-observatory' | 'phish' | 'analyzer' | 'chest'
  const [isObservatoryShaking, setIsObservatoryShaking] = useState(false)
  const [typedLength, setTypedLength] = useState(0)
  const [playerChoiceConfirmed, setPlayerChoiceConfirmed] = useState(false)
  const [obsShowInterior, setObsShowInterior] = useState(false)
  const [obsBgBlack, setObsBgBlack] = useState(false)
  const obsLineIndexRef = useRef(-1)

  const scene = story[sceneIndex]
  const line = scene.dialogue[lineIndex]
  const observatoryLine = observatoryStory.dialogue[lineIndex] || observatoryStory.dialogue[0]
  const isObservatoryView = view === 'story-observatory'
  const isStoryView = ['story', 'story-classic', 'story-observatory'].includes(view)
  const activeStoryLine = isObservatoryView ? observatoryLine : line
  const activeStoryText = activeStoryLine?.text || ''
  const showObservatoryShadow = view === 'story-observatory' && Boolean(observatoryLine?.showShadow)
  const showObservatoryWomen = view === 'story-observatory' && Boolean(observatoryLine?.showWomen)
  const showObservatoryWomanB = showObservatoryWomen && !observatoryLine?.hideWomanB
  const hideObservatoryBubble = view === 'story-observatory' && Boolean(observatoryLine?.hideBubble)
  const showSmishingScreen = view === 'story-observatory' && Boolean(observatoryLine?.showSmishing)
  const showSmishingInfo = view === 'story-observatory' && Boolean(observatoryLine?.showSmishingInfo)
  const isNarratorLine = isStoryView && !hideObservatoryBubble && activeStoryLine?.speaker === 'Narrator'
  // All contiguous narrator lines before the current one (for the book stack)
  const narratorSequenceLines = (() => {
    if (!isNarratorLine) return []
    const activeDialogue = isObservatoryView ? observatoryStory.dialogue : scene.dialogue
    const history = []
    let i = lineIndex - 1
    while (i >= 0 && activeDialogue[i]?.speaker === 'Narrator' && !activeDialogue[i]?.hideBubble) {
      history.unshift({ text: activeDialogue[i].text, lineIndex: i })
      i--
    }
    return history
  })()
  const observatorySpeakerSide =
    observatoryLine?.speaker === 'Woman A' || observatoryLine?.speaker === 'WOMAN A'
      ? 'left'
      : observatoryLine?.speaker === 'Woman B' || observatoryLine?.speaker === 'WOMAN B'
        ? 'right'
        : null
  const getPortraitForSide = (character) => (
    character.side === 'left' ? (character.portraitLeft || character.portrait) : character.portrait
  )
  const storyBackgroundStyle = {
    backgroundColor: scene.background,
  }

  const showWhiteBackground = showSmishingScreen || showSmishingInfo
  const observatoryBackgroundStyle = showWhiteBackground
    ? {
        backgroundColor: '#f0ecff',
        backgroundImage: 'linear-gradient(160deg, #f8f6ff 0%, #e4dcff 100%)',
      }
    : {
        backgroundColor: '#0f1728',
        backgroundImage: `linear-gradient(180deg, rgba(8, 12, 22, 0.12), rgba(8, 12, 22, 0.28)), url(${obsShowInterior ? observatoryInt : observatoryExt})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }
  const renderObservatoryText = (text) => {
    const emphasis = 'I am Aunt Mira.'

    if (!text.includes(emphasis)) {
      return text
    }

    const [before, after] = text.split(emphasis)

    return (
      <>
        {before}
        <span className="observatory-emphasis">{emphasis}</span>
        {after}
      </>
    )
  }
  const isPlayerLine = isStoryView && !hideObservatoryBubble && activeStoryLine?.speaker === '[YOUR NAME]'
  const prevDialogueLine = isObservatoryView
    ? observatoryStory.dialogue[lineIndex - 1]
    : scene.dialogue[lineIndex - 1]
  const showPlayerChoice = isPlayerLine && !playerChoiceConfirmed && prevDialogueLine?.speaker !== '[YOUR NAME]'
  const isTyping = isStoryView && !hideObservatoryBubble && !showPlayerChoice && !isPlayerLine && !isNarratorLine && typedLength < activeStoryText.length
  const displayedStoryText = hideObservatoryBubble ? '' : activeStoryText.slice(0, typedLength)

  const next = useCallback(() => {
    if (lineIndex + 1 < scene.dialogue.length) {
      setLineIndex(lineIndex + 1)
    } else if (sceneIndex + 1 < story.length) {
      setSceneIndex(sceneIndex + 1)
      setLineIndex(0)
    } else {
      // End of story - loop or stop
      setSceneIndex(0)
      setLineIndex(0)
    }
  }, [lineIndex, scene.dialogue.length, sceneIndex])

  const prev = useCallback(() => {
    if (lineIndex > 0) {
      setLineIndex(lineIndex - 1)
    } else if (sceneIndex > 0) {
      const prevScene = story[sceneIndex - 1]
      setSceneIndex(sceneIndex - 1)
      setLineIndex(prevScene.dialogue.length - 1)
    }
  }, [lineIndex, sceneIndex])

  const observatoryNext = useCallback(() => {
    if (lineIndex + 1 < observatoryStory.dialogue.length) {
      setLineIndex(lineIndex + 1)
    }
  }, [lineIndex])

  const observatoryPrev = useCallback(() => {
    if (lineIndex > 0) {
      setLineIndex(lineIndex - 1)
    }
  }, [lineIndex])

  const revealCurrentLine = useCallback(() => {
    setTypedLength(activeStoryText.length)
  }, [activeStoryText])

  const handleStoryNext = useCallback(() => {
    if (showPlayerChoice) {
      setPlayerChoiceConfirmed(true)
      return
    }

    if (isTyping) {
      revealCurrentLine()
      return
    }

    if (isObservatoryView) {
      observatoryNext()
      return
    }

    next()
  }, [showPlayerChoice, isObservatoryView, isTyping, next, observatoryNext, revealCurrentLine])

  const handleStoryPrev = useCallback(() => {
    if (isTyping) {
      revealCurrentLine()
      return
    }

    if (isObservatoryView) {
      observatoryPrev()
      return
    }

    prev()
  }, [isObservatoryView, isTyping, observatoryPrev, prev, revealCurrentLine])

  useEffect(() => {
    if (!isStoryView) {
      setTypedLength(0)
      return undefined
    }

    if (hideObservatoryBubble) {
      setTypedLength(0)
      return undefined
    }

    setTypedLength(0)
    return undefined
  }, [activeStoryText, hideObservatoryBubble, isStoryView])

  useEffect(() => {
    setPlayerChoiceConfirmed(false)
  }, [lineIndex])

  useEffect(() => {
    if (!isStoryView || hideObservatoryBubble || isPlayerLine || isNarratorLine || typedLength >= activeStoryText.length) {
      return undefined
    }

    const delay = activeStoryText[typedLength] === ' ' ? 0 : 18
    const timer = window.setTimeout(() => {
      setTypedLength((current) => Math.min(current + 1, activeStoryText.length))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [activeStoryText, hideObservatoryBubble, isNarratorLine, isPlayerLine, isStoryView, typedLength])

  useEffect(() => {
    if (view !== 'story-observatory' || !observatoryLine?.shake) {
      setIsObservatoryShaking(false)
      return undefined
    }

    setIsObservatoryShaking(true)
    const timer = window.setTimeout(() => setIsObservatoryShaking(false), 700)
    return () => window.clearTimeout(timer)
  }, [observatoryLine, view])

  useEffect(() => {
    if (view !== 'story-observatory' || !observatoryLine?.blackout) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setLineIndex((currentIndex) => (
        currentIndex + 1 < observatoryStory.dialogue.length ? currentIndex + 1 : currentIndex
      ))
    }, 1600)

    return () => window.clearTimeout(timer)
  }, [observatoryLine, view])

  // Observatory background transition: fade to black, swap bg image, fade back
  useEffect(() => {
    if (view !== 'story-observatory') {
      obsLineIndexRef.current = -1
      return undefined
    }

    const prev = obsLineIndexRef.current
    obsLineIndexRef.current = lineIndex

    const isNowInterior = lineIndex >= 2

    if (prev === -1) {
      // Fresh entry — set interior state immediately, no fade
      setObsShowInterior(isNowInterior)
      setObsBgBlack(false)
      return undefined
    }

    const wasInterior = prev >= 2
    if (isNowInterior === wasInterior) return undefined

    // Threshold crossed — do fade-to-black transition
    setObsBgBlack(true)
    const t1 = window.setTimeout(() => setObsShowInterior(isNowInterior), 550)
    const t2 = window.setTimeout(() => setObsBgBlack(false), 700)
    return () => { window.clearTimeout(t1); window.clearTimeout(t2) }
  }, [lineIndex, view])

  useEffect(() => {
    const onKey = (e) => {
      if (!isStoryView) {
        return
      }

      if (e.key === 'ArrowRight' || e.key === 'Enter') handleStoryNext()
      if (e.key === 'ArrowLeft') handleStoryPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleStoryNext, handleStoryPrev, isStoryView])

  // show top-left back-link only for the standalone game views
  const showGlobalBack = ['phish', 'analyzer', 'chest'].includes(view)

  // Home view
  if (view === 'home') {
    return (
      <div className="game-root" style={{ background: scene.background }}>
        <div className="stage home-stage">
          <h1 className="home-title">CyberSafe</h1>
          <div className="home-actions">
            <div className="home-story-group">
              <span className="home-group-label">Story Mode</span>
              <button onClick={() => setView('story')} className="home-btn story-new">Cinematic</button>
              <button onClick={() => setView('story-classic')} className="home-btn story-classic">Classic Bubble</button>
              <button onClick={() => { setLineIndex(0); setTypedLength(0); setIsObservatoryShaking(false); setView('story-observatory') }} className="home-btn story-observatory">Observatory Intro</button>
            </div>
            <button onClick={() => setView('phish')} className="home-btn primary">Phishing Exercise</button>
            <button onClick={() => setView('analyzer')} className="home-btn primary">Text Detective</button>
            <button onClick={() => setView('chest')} className="home-btn primary">Password Chest</button>
          </div>
          <div className="home-note">Keyboard: ArrowRight / Enter to advance in story</div>
        </div>
      </div>
    )
  }

  // Phishing game view
  if (view === 'phish') {
    return (
      <div className="game-root">
        <div className="stage">
          {showGlobalBack && <button className="back-link" onClick={() => setView('home')}>← Back</button>}
          <PhishGame onExit={() => setView('home')} />
        </div>
      </div>
    )
  }

  // Text analyzer game view
  if (view === 'analyzer') {
    return (
      <div className="game-root">
        <div className="stage">
          {showGlobalBack && <button className="back-link" onClick={() => setView('home')}>← Back</button>}
          <TextAnalyzer onExit={() => setView('home')} />
        </div>
      </div>
    )
  }

  // Password chest game view
  if (view === 'chest') {
    return (
      <div className="game-root">
        <div className="stage">
          {showGlobalBack && <button className="back-link" onClick={() => setView('home')}>← Back</button>}
          <PasswordChest onExit={() => setView('home')} />
        </div>
      </div>
    )
  }

  // Classic bubble story view
  if (view === 'story-classic') {
    return (
      <div className="game-root" style={storyBackgroundStyle}>
        <div className="stage">
          <div className="characters">
            {scene.characters.map((c) => (
              <div key={c.id} className={`character ${c.side}`}>
                {getPortraitForSide(c)
                  ? <img src={getPortraitForSide(c)} alt={c.name} className="portrait-img" />
                  : <div className="portrait-placeholder">{c.name}</div>
                }
              </div>
            ))}
          </div>

          <div className="bubble-tail-container">
            <div className="bubble">
              <div className="nameplate">{line.speaker}</div>
              <div className="bubble-inner" onClick={handleStoryNext}>
                <div className="bubble-line">
                  {displayedStoryText}
                  {isTyping && <span className="type-cursor" aria-hidden="true" />}
                </div>
                <div className="dialogue-controls">
                  <button className="back-inline" onClick={(e) => { e.stopPropagation(); handleStoryPrev() }} aria-label="previous">
                    <img src={backArrow} alt="back" />
                  </button>
                  <button className="next-btn" onClick={(e) => { e.stopPropagation(); handleStoryNext() }} aria-label="next">
                    <img src={nextArrow} alt="next" />
                  </button>
                </div>
              </div>
            </div>
            <svg className="bubble-tail" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" fill="rgba(18,18,18,0.86)">
              <path d="M 140 -16 Q 140 160  224 140 140 140  160 -16" />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'story-observatory') {
    return (
      <div className="game-root observatory-intro" style={observatoryBackgroundStyle}>
        <div className="obs-bg-fade" style={{ opacity: obsBgBlack ? 1 : 0 }} aria-hidden="true" />
        <div className={`stage observatory-stage ${isObservatoryShaking ? 'observatory-shaking' : ''}`}>
          <div className={`observatory-blackout ${observatoryLine?.blackout ? 'active' : ''}`} aria-hidden="true" />
          {showSmishingScreen && (
            <div
              className={`smishing-overlay${hideObservatoryBubble ? ' smishing-overlay--full' : ' smishing-overlay--bg'}`}
              onClick={hideObservatoryBubble ? handleStoryNext : undefined}
            >
              <div className="smishing-panel">
                <div className="smishing-header">
                  <span className="smishing-alert-icon" aria-hidden="true">⚠</span>
                  <span className="smishing-title">SMISHING MESSAGE — INTERCEPTED</span>
                </div>
                <div className="smishing-phone">
                  <div className="smishing-from">
                    <span className="smishing-label">From:</span>
                    <span className="smishing-contact">Sunshare_Academy_Admin</span>
                    <span className="smishing-saved">(saved contact)</span>
                  </div>
                  <div className="smishing-bubble">
                    Hi Jaylen - urgent. Your school account is being reviewed after a security concern was flagged. Reply with your current password so we can verify your identity before the account is suspended. This must be done within 1 hour.
                  </div>
                </div>
                {hideObservatoryBubble && (
                  <div className="smishing-continue">tap anywhere to continue</div>
                )}
              </div>
            </div>
          )}
          {showSmishingInfo && (
            <div className="smishing-info-overlay" onClick={handleStoryNext}>
              <div className="smishing-info-panel">
                <div className="smishing-info-section">
                  <h2 className="smishing-info-heading">SMISHING</h2>
                  <p className="smishing-info-body">Smishing is phishing by text message. Like email phishing, it uses fake senders and urgent language to trick you into clicking a link or giving away information. What makes smishing particularly dangerous is personalisation — when an attacker has gathered your personal information from public sources, they can make a fake text sound like it genuinely comes from someone or something that knows you. The text feels real because the details in it are real. But the request is always the red flag.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">REQUEST FOR YOUR PASSWORD BY TEXT</div>
                    <p className="smishing-flag-body">No school, gaming platform, bank, or organisation will ever ask for your password in a text message. Ever. A text asking for your password is a scam regardless of how official it looks or how much it already knows about you.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">URGENCY — ONE HOUR DEADLINE</div>
                    <p className="smishing-flag-body">Real account reviews do not have one-hour reply windows sent by text. Real processes use official channels and give plenty of time.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">PERSONALISED DETAILS ARE NOT PROOF OF LEGITIMACY</div>
                    <p className="smishing-flag-body">Just because a message knows your name, your school, or your username does not mean it is genuine. That information may have come from your public profile, not from an official system that has authenticated you.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}
          {showObservatoryShadow && (
            <div className="observatory-shadow visible" aria-hidden="true">
              <img src={shadowFigure} alt="" className="observatory-shadow-img" />
            </div>
          )}
          <div className={`observatory-figures ${showObservatoryWomen ? 'visible' : ''}`} aria-hidden={!showObservatoryWomen}>
            {(() => {
              const emotion = observatoryLine?.emotion
              const leftSpeaking = observatorySpeakerSide === 'left'
              const rightSpeaking = observatorySpeakerSide === 'right'
              const emotionImgLeft = emotion === 'thinking' ? aunt1Thinking : emotion === 'upset' ? aunt1Upset : null
              const emotionImgRight = emotion === 'thinking' ? aunt1Thinking : emotion === 'upset' ? aunt1Upset : null
              return (
                <>
                  <div className={`observatory-figure left ${leftSpeaking ? 'speaking' : 'silent'}`}>
                    <img
                      src={leftSpeaking && emotionImgLeft ? emotionImgLeft : aunt1Left}
                      alt="Woman A"
                      className="observatory-figure-img"
                      style={leftSpeaking && emotionImgLeft ? { transform: 'scaleX(-1)' } : undefined}
                    />
                  </div>
                  <div className={`observatory-figure right ${showObservatoryWomanB ? 'visible' : 'hidden'} ${observatoryLine?.revealWomanB ? 'surprise-enter' : ''} ${rightSpeaking ? 'speaking' : 'silent'}`}>
                    <img
                      src={rightSpeaking && emotionImgRight ? emotionImgRight : aunt1}
                      alt="Woman B"
                      className="observatory-figure-img"
                    />
                  </div>
                </>
              )
            })()}
          </div>
          {showPlayerChoice ? (
            <div className="bubble-tail-container player-choice-wrap" onClick={handleStoryNext}>
              <div className="bubble">
                <div className="bubble-inner player-choice-inner">
                  <div className="bubble-line">
                    <span className="player-choice-arrow" aria-hidden="true">▷</span>{' '}
                    {activeStoryText}
                  </div>
                </div>
              </div>
              <svg className="bubble-tail" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" fill="rgba(18,18,18,0.86)">
                <path d="M 140 -16 Q 140 160  224 140 140 140  160 -16" />
              </svg>
            </div>
          ) : isPlayerLine ? (
            <div className="bubble-tail-container observatory-bubble-wrap" onClick={handleStoryNext}>
              <div className="bubble">
                <div className="nameplate">[YOUR NAME]</div>
                <div className="bubble-inner">
                  <div className="bubble-line">
                    {activeStoryText}
                  </div>
                  <div className="dialogue-controls">
                    <button className="back-inline" onClick={(e) => { e.stopPropagation(); handleStoryPrev() }} aria-label="previous">
                      <img src={backArrow} alt="back" />
                    </button>
                    <button className="next-btn" onClick={(e) => { e.stopPropagation(); handleStoryNext() }} aria-label="next">
                      <img src={nextArrow} alt="next" />
                    </button>
                  </div>
                </div>
              </div>
              <svg className="bubble-tail" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" fill="rgba(18,18,18,0.86)">
                <path d="M 140 -16 Q 140 160  224 140 140 140  160 -16" />
              </svg>
            </div>
          ) : isNarratorLine ? (
            <div className="narrator-overlay" onClick={handleStoryNext}>
              <div className="narrator-lines">
                {narratorSequenceLines.slice(-3).map((histLine, i, arr) => {
                  const pastLevel = arr.length - i
                  return (
                    <p key={histLine.lineIndex} className={`narrator-text narrator-text--past-${pastLevel} narrator-text--${narratorPos(histLine.lineIndex)}`}>
                      {histLine.text}
                    </p>
                  )
                })}
                <p key={lineIndex} className={`narrator-text narrator-text--current narrator-text--${narratorPos(lineIndex)}`}>
                  {renderObservatoryText(activeStoryText)}
                </p>
              </div>
              <div className="narrator-controls">
                <button className="narrator-back" onClick={(e) => { e.stopPropagation(); handleStoryPrev() }} aria-label="previous">
                  <img src={backArrow} alt="back" />
                </button>
                <button className="narrator-next" onClick={(e) => { e.stopPropagation(); handleStoryNext() }} aria-label="next">
                  <img src={nextArrow} alt="next" />
                </button>
              </div>
            </div>
          ) : hideObservatoryBubble ? null : (
            <div className="bubble-tail-container observatory-bubble-wrap">
              <div className="bubble">
                <div className="nameplate">{observatoryLine.speaker}</div>
                <div className="bubble-inner" onClick={handleStoryNext}>
                  <div className="bubble-line">
                    {renderObservatoryText(displayedStoryText)}
                    {isTyping && <span className="type-cursor" aria-hidden="true" />}
                  </div>
                  <div className="dialogue-controls">
                    <button className="back-inline" onClick={(e) => { e.stopPropagation(); handleStoryPrev() }} aria-label="previous">
                      <img src={backArrow} alt="back" />
                    </button>
                    <button className="next-btn" onClick={(e) => { e.stopPropagation(); handleStoryNext() }} aria-label="next">
                      <img src={nextArrow} alt="next" />
                    </button>
                  </div>
                </div>
              </div>
              <svg className="bubble-tail" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" fill="rgba(18,18,18,0.86)">
                <path d="M 140 -16 Q 140 160  224 140 140 140  160 -16" />
              </svg>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Default: cinematic story view
  const activeSpeaker = line.speaker

  return (
    <div className="game-root story-mode" style={storyBackgroundStyle}>
      <div className="vignette" />

      <div className="characters">
        {scene.characters.map((c) => (
          <div key={c.id} className={`character ${c.side} ${c.name === activeSpeaker ? 'speaking' : 'silent'}`}>
            {getPortraitForSide(c)
              ? <img src={getPortraitForSide(c)} alt={c.name} className="portrait-img" />
              : <div className="portrait-placeholder">{c.name}</div>
            }
          </div>
        ))}
      </div>

      {showPlayerChoice ? (
        <div className="bubble-tail-container player-choice-wrap" onClick={handleStoryNext}>
          <div className="bubble">
            <div className="bubble-inner player-choice-inner">
              <div className="bubble-line">
                <span className="player-choice-arrow" aria-hidden="true">▷</span>{' '}
                {activeStoryText}
              </div>
            </div>
          </div>
          <svg className="bubble-tail" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" fill="rgba(18,18,18,0.86)">
            <path d="M 140 -16 Q 140 160  224 140 140 140  160 -16" />
          </svg>
        </div>
      ) : isPlayerLine ? (
        <div className="bubble-tail-container" onClick={handleStoryNext}>
          <div className="bubble">
            <div className="nameplate">[YOUR NAME]</div>
            <div className="bubble-inner">
              <div className="bubble-line">
                {activeStoryText}
              </div>
              <div className="dialogue-controls">
                <button className="back-inline" onClick={(e) => { e.stopPropagation(); handleStoryPrev() }} aria-label="previous">
                  <img src={backArrow} alt="back" />
                </button>
                <button className="next-btn" onClick={(e) => { e.stopPropagation(); handleStoryNext() }} aria-label="next">
                  <img src={nextArrow} alt="next" />
                </button>
              </div>
            </div>
          </div>
          <svg className="bubble-tail" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" fill="rgba(18,18,18,0.86)">
            <path d="M 140 -16 Q 140 160  224 140 140 140  160 -16" />
          </svg>
        </div>
      ) : isNarratorLine ? (
        <div className="narrator-overlay" onClick={handleStoryNext}>
          <div className="narrator-lines">
            {narratorSequenceLines.slice(-3).map((histLine, i, arr) => {
              const pastLevel = arr.length - i
              const seqPos = lineIndex - arr.length + i
              const side = seqPos % 2 === 0 ? 'left' : 'right'
              return (
                <p key={histLine.lineIndex} className={`narrator-text narrator-text--past-${pastLevel} narrator-text--${side}`}>
                  {histLine.text}
                </p>
              )
            })}
            <p key={lineIndex} className={`narrator-text narrator-text--current narrator-text--${narratorSequenceLines.length % 2 === 0 ? 'left' : 'right'}`}>
              {displayedStoryText}
              {isTyping && <span className="type-cursor" aria-hidden="true" />}
            </p>
          </div>
          <div className="narrator-controls">
            <button className="narrator-back" onClick={(e) => { e.stopPropagation(); handleStoryPrev() }} aria-label="previous">
              <img src={backArrow} alt="back" />
            </button>
            <button className="narrator-next" onClick={(e) => { e.stopPropagation(); handleStoryNext() }} aria-label="next">
              <img src={nextArrow} alt="next" />
            </button>
          </div>
        </div>
      ) : (
        <div className="dialogue-panel" onClick={handleStoryNext}>
          <div className="dialogue-body">
            <span className="speaker-tag">{line.speaker}</span>
            <p className="dialogue-text">
              {displayedStoryText}
              {isTyping && <span className="type-cursor" aria-hidden="true" />}
            </p>
          </div>
          <div className="dialogue-controls">
            <button className="back-inline" onClick={(e) => { e.stopPropagation(); handleStoryPrev() }} aria-label="previous">
              <img src={backArrow} alt="back" />
            </button>
            <button className="next-btn" onClick={(e) => { e.stopPropagation(); handleStoryNext() }} aria-label="next">
              <img src={nextArrow} alt="next" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
