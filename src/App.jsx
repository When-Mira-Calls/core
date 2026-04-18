import React, { useState, useEffect, useCallback, useRef } from 'react'
import PhishGame from './PhishGame'
import TextAnalyzer from './TextAnalyzer'
import PasswordChest from './PasswordChest'
import TrailMap from './TrailMap'
import FinalGame from './FinalGame'
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
import consolScreenGreen from '../assets/Consol Screen - green.png'

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
    { speaker: 'Narrator', text: 'Woman A says nothing. She watches Woman B. Then she looks at the player.', showWomen: true },
    { speaker: 'Narrator', text: 'The player moves to the next screen. A recorded phone call plays through a small speaker. The player can see a transcript alongside it. This is the call that the family in Sunshare Square received.' },
    { speaker: '', text: '', showVishing: true, hideBubble: true },
    { speaker: '[YOUR NAME]', text: 'That is vishing. A phone call instead of a text or email. And it sounds completely real because they used Priya\'s actual school name and her actual first name.' },
    { speaker: 'WOMAN A', text: 'And notice the final step. The verification code they asked for was not for security. It was the password reset code for Priya\'s account. The caller was using the parent\'s trust and the official-sounding process to intercept a code that would give them access. The personal information opened the door. The code was the key.', showWomen: true, emotion: 'thinking' },
    { speaker: '', text: '', showVishingInfo: true, hideBubble: true },
    { speaker: '', text: '', showQuiz: true, hideBubble: true, showWomen: true, hideWomanB: true },
    { speaker: 'WOMAN B', text: 'You have to trust me. I am your aunt. You know what I sound like from the letter. You know who I am.', showWomen: true, emotion: 'upset' },
    { speaker: '[YOUR NAME]', text: 'This needs two things to open. A code and a card.', showWomen: true },
    { speaker: 'WOMAN A', text: 'The code is the passphrase you have been carrying. The card is in the strongbox - Mira left it there before the compass.', showWomen: true, emotion: 'thinking' },
    { speaker: 'WOMAN A', text: 'That door cannot be opened by guessing the passphrase alone. Even if someone knew your passphrase, they would need the physical card too. And even if they had the card, they would need the passphrase. Both. Always both.', showWomen: true, emotion: 'thinking' },
    { speaker: '', text: '', showMFAInfo: true, hideBubble: true },
    { speaker: '', text: '', showMFAQuiz: true, hideBubble: true, showWomen: true, hideWomanB: true },
    { speaker: 'Narrator', text: 'The locked room reveals the Shadow Man\'s full trail.' },
    { speaker: '', text: '', showTrailMap: true, hideBubble: true },
    { speaker: 'Narrator', text: 'The screen in the locked room shows the Shadow Man\'s trail in red — every stop, every gap, every piece of information collected. Seabright: the phishing emails that harvested harbour logins. The lighthouse: circling for weaknesses in the strongbox. Sunshare Square: collecting personal information from public profiles, building a picture of every person who lived and posted there. And then arriving here, ahead of the player, with an impostor in place.' },
    { speaker: 'WOMAN A', text: 'Look at the dates on his collection from Sunshare Square.', showWomen: true, hideWomanB: true, emotion: 'thinking' },
    { speaker: 'Narrator', text: 'The player looks at the timestamps on the Shadow Man\'s file. Some entries are from this week. But others are from over a year ago. Two years. Posts that no longer exist on anyone\'s live profile. Still here. Still readable. Still used.' },
    { speaker: '[YOUR NAME]', text: 'He has posts that were deleted. How does he have those?', showWomen: true },
    { speaker: 'WOMAN A', text: 'He collected them while they were live. Cached copies. Screenshots. His own archive. The internet does not automatically forget on your behalf — it only forgets when every copy, everywhere, is gone. And you only control one copy.', showWomen: true, hideWomanB: true },
    { speaker: '', text: '', showPermanenceInfo: true, hideBubble: true },
    { speaker: 'WOMAN A', text: 'Look at the pattern. Every attack across this journey. The phishing emails at Seabright. The scam texts. The vishing call. The fake ad Tomas almost clicked. The security questions answered from Jaylen\'s public profile. The deleted posts that should not exist any more but do. What do they all have in common?', showWomen: true, hideWomanB: true, emotion: 'thinking' },
    { speaker: '[YOUR NAME]', text: 'They all used feelings. Fear, urgency, authority. None of them broke in by force. They all found a gap in how someone felt and slipped through it.', showWomen: true },
    { speaker: '', text: '', showSocialEngInfo: true, hideBubble: true },
    { speaker: 'WOMAN B', text: 'We do not have time for the lesson. I need the items. He is getting closer.', showWomen: true, emotion: 'upset' },
    { speaker: 'Narrator', text: 'A pause. Then Woman B adds something quickly, as if filling the silence.', showWomen: true },
    { speaker: 'WOMAN B', text: 'You have already spoken to both of them — Celia and Rosa. You know how important this is. Please.', showWomen: true, emotion: 'upset' },
    { speaker: 'Narrator', text: 'The player did not say how many aunts they had visited. They did not mention Rosa by name. Not in this room. Not to either of these women. A wrong note in a familiar song. The room is very quiet for a moment.', showWomen: true },
    { speaker: 'WOMAN A', text: 'There it is again.', showWomen: true, hideWomanB: true },
    { speaker: 'Narrator', text: 'You stand in the middle of the Observatory with the strongbox in your hands. Two identical women watch you. The screens show the Shadow Man\'s trail still active — but slowed. He is waiting, too. Waiting to see if his trap works.', showWomen: true },
    { speaker: 'Narrator', text: 'You have everything you need. You have been building toward this moment since a Saturday morning when a letter arrived with a lighthouse stamp. Think. Look at what happened. Look at what each woman did.', showWomen: true },
    { speaker: '', text: '', showFinalGameIntro: true, hideBubble: true },
    { speaker: '', text: '', showFinalGame: true, hideBubble: true },
  ],
}

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [view, setView] = useState('home') // 'home' | 'story' | 'story-classic' | 'story-observatory' | 'phish' | 'analyzer' | 'chest'
  const [isObservatoryShaking, setIsObservatoryShaking] = useState(false)
  const [typedLength, setTypedLength] = useState(0)
  const [playerChoiceConfirmed, setPlayerChoiceConfirmed] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [mfaQuizAnswer, setMfaQuizAnswer] = useState(null)
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
  const showVishingScreen = view === 'story-observatory' && Boolean(observatoryLine?.showVishing)
  const showVishingInfo = view === 'story-observatory' && Boolean(observatoryLine?.showVishingInfo)
  const showQuizScreen = view === 'story-observatory' && Boolean(observatoryLine?.showQuiz)
  const showMFAInfo = view === 'story-observatory' && Boolean(observatoryLine?.showMFAInfo)
  const showMFAQuizScreen = view === 'story-observatory' && Boolean(observatoryLine?.showMFAQuiz)
  const showTrailMap = view === 'story-observatory' && Boolean(observatoryLine?.showTrailMap)
  const showPermanenceInfo = view === 'story-observatory' && Boolean(observatoryLine?.showPermanenceInfo)
  const showSocialEngInfo = view === 'story-observatory' && Boolean(observatoryLine?.showSocialEngInfo)
  const showFinalGameIntro = view === 'story-observatory' && Boolean(observatoryLine?.showFinalGameIntro)
  const showFinalGame = view === 'story-observatory' && Boolean(observatoryLine?.showFinalGame)
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

  const showWhiteBackground = showSmishingScreen || showSmishingInfo || showVishingScreen || showVishingInfo || showQuizScreen || showMFAInfo || showMFAQuizScreen || showTrailMap || showPermanenceInfo || showSocialEngInfo || showFinalGameIntro || showFinalGame
  const observatoryBackgroundStyle = {
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
    if (showQuizScreen) {
      if (quizAnswer === 'B') observatoryNext()
      else setQuizAnswer(null)
      return
    }

    if (showFinalGame) return // FinalGame controls its own advancement

    if (showMFAQuizScreen) {
      if (mfaQuizAnswer === 'B') observatoryNext()
      else setMfaQuizAnswer(null)
      return
    }

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
  }, [showFinalGame, showQuizScreen, quizAnswer, showMFAQuizScreen, mfaQuizAnswer, showPlayerChoice, isObservatoryView, isTyping, next, observatoryNext, revealCurrentLine])

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
    setQuizAnswer(null)
    setMfaQuizAnswer(null)
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
    if (isNowInterior === wasInterior) {
      setObsBgBlack(false) // safety: clear any stuck black from an aborted transition
      return undefined
    }

    // Threshold crossed — swap background immediately, animate black overlay over it
    setObsShowInterior(isNowInterior)
    setObsBgBlack(true)
    const t = window.setTimeout(() => setObsBgBlack(false), 700)
    return () => {
      window.clearTimeout(t)
      setObsBgBlack(false) // aborted — clear overlay, background already correct
    }
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
        {showWhiteBackground && <div className="obs-white-overlay" aria-hidden="true" />}
        <div className={`stage observatory-stage ${isObservatoryShaking ? 'observatory-shaking' : ''}`}>
          <div className={`observatory-blackout ${observatoryLine?.blackout ? 'active' : ''}`} aria-hidden="true" />
          {showSmishingScreen && (
            <div
              className={`smishing-overlay${hideObservatoryBubble ? ' smishing-overlay--full' : ' smishing-overlay--bg'}`}
              onClick={hideObservatoryBubble ? handleStoryNext : undefined}
            >
              <div className="smishing-console-wrap">
                <img src={consolScreenGreen} className="smishing-console-img" alt="" aria-hidden="true" />
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
                  <div className={`smishing-continue${hideObservatoryBubble ? '' : ' smishing-continue--hidden'}`}>tap anywhere to continue</div>
                </div>
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
          {showVishingScreen && (
            <div className="vishing-overlay" onClick={handleStoryNext}>
              <div className="smishing-console-wrap">
                <img src={consolScreenGreen} className="smishing-console-img" alt="" aria-hidden="true" />
                <div className="vishing-panel">
                  <div className="vishing-header">
                    <span className="vishing-rec" aria-hidden="true">⏺</span>
                    <span className="vishing-title">VISHING CALL — RECORDED</span>
                  </div>
                  <div className="vishing-meta">
                    <span className="vishing-meta-label">Caller:</span>
                    <span className="vishing-meta-value">National Cyber Safety Authority (unverified)</span>
                  </div>
                  <div className="vishing-transcript">
                    <div className="vishing-waveform" aria-hidden="true">
                      {[18,32,48,28,60,40,72,36,56,44,80,30,64,50,76,38,68,42,58,34,70,46,54,26,66,52,74,22].map((h, i) => (
                        <div key={i} className="vishing-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }} />
                      ))}
                    </div>
                    <p className="vishing-quote">
                      'Good afternoon. I am calling from the National Cyber Safety Authority regarding a security concern associated with your child's online account. I have your child's details here — first name Priya, registered at Sunshare Academy. We have detected unauthorised access attempts and require a verification code to secure the account immediately. I will send a code to your registered number now — please read it back to me to complete the security process.'
                    </p>
                  </div>
                  <div className="smishing-continue">tap anywhere to continue</div>
                </div>
              </div>
            </div>
          )}
          {showVishingInfo && (
            <div className="smishing-info-overlay" onClick={handleStoryNext}>
              <div className="smishing-info-panel">
                <div className="smishing-info-section">
                  <h2 className="smishing-info-heading">VISHING</h2>
                  <p className="smishing-info-body">Vishing is voice phishing — scam phone calls. They work the same way as smishing but use a real human voice, which adds authority and urgency that text cannot match. A real voice saying your name, your child's school, and a professional script feels more legitimate than any text. The key tactics are: authority (official-sounding name and title), personalisation (real details gathered in advance), and a manufactured process that ends with you handing over something valuable.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">ASKING FOR A CODE THEY JUST SENT</div>
                    <p className="smishing-flag-body">A caller who says 'I will send you a code — please read it back to me' is intercepting your authentication code. No legitimate organisation uses this process. The code you receive is for you to enter yourself — never to read to a caller.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">AUTHORITY PLUS URGENCY PLUS PERSONALISATION</div>
                    <p className="smishing-flag-body">When all three appear together — official title, genuine personal details, and time pressure — that combination should trigger maximum caution, not maximum trust. The sophistication of the attack does not make it legitimate.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}
          {showMFAInfo && (
            <div className="smishing-info-overlay" onClick={handleStoryNext}>
              <div className="smishing-info-panel mfa-info-panel">
                <div className="smishing-info-section">
                  <h2 className="smishing-info-heading">MFA: WHAT IS MULTI-FACTOR AUTHENTICATION?</h2>
                  <p className="smishing-info-body">Multi-Factor Authentication — MFA, also called Two-Factor Authentication or 2FA — means using two different types of proof to verify your identity. Something you know (a password or passphrase) and something you have (a phone that receives a code, an app that generates one, or a physical key). Even if an attacker gets your password through phishing or a data breach, they cannot get in without the second factor. It is the most powerful single protection you can add to any account.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label mfa-label">MFA</div>
                    <div className="smishing-flag-title">THE THREE FACTORS</div>
                    <p className="smishing-flag-body">Authentication uses three possible factors: something you KNOW (password, passphrase, PIN), something you HAVE (phone, authenticator app, physical key), and something you ARE (fingerprint, face ID). MFA combines at least two of these. A password alone is one factor. A password plus a code sent to your phone is two factors. Two factors means an attacker needs both — which is exponentially harder to achieve.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label mfa-label">MFA</div>
                    <div className="smishing-flag-title">WHERE TO ENABLE IT</div>
                    <p className="smishing-flag-body">Most major platforms — email, gaming accounts, social media — offer MFA in their security settings. It adds a few seconds to logging in. It makes your account approximately ten times harder to compromise. Enable it on every account that offers it, starting with your email.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}
          {showTrailMap && <TrailMap onClick={handleStoryNext} />}
          {showFinalGameIntro && (
            <div className="smishing-info-overlay" onClick={handleStoryNext}>
              <div className="smishing-info-panel finalgame-intro-panel">
                <div className="smishing-info-section">
                  <h2 className="smishing-info-heading">MINIGAME FINAL: WHO IS THE REAL AUNT MIRA?</h2>
                  <p className="smishing-info-body">Throughout your time in the Observatory, both women interacted with you. One of them is Aunt Mira. One of them is the Shadow Man's impostor. You have collected clues about their behaviour — things they said, things they did, and things they did not do. Now you must use everything you have learned across the entire journey to identify which one is real.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label finalgame-label">HOW TO PLAY</div>
                    <div className="smishing-flag-title">REVIEW THE EVIDENCE</div>
                    <p className="smishing-flag-body">You will be shown seven pieces of evidence collected from the Observatory. Work through each one carefully — you can review them in any order before making your final choice.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label finalgame-label">HOW TO PLAY</div>
                    <div className="smishing-flag-title">GETTING IT RIGHT MATTERS MORE THAN GETTING IT FAST</div>
                    <p className="smishing-flag-body">If you choose incorrectly, Mira will gently explain what you overlooked — then you try again. There is no penalty for looking again. Take your time.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to begin</div>
              </div>
            </div>
          )}
          {showFinalGame && <FinalGame onComplete={observatoryNext} />}
          {showPermanenceInfo && (
            <div className="smishing-info-overlay" onClick={handleStoryNext}>
              <div className="smishing-info-panel permanence-info-panel">
                <div className="smishing-info-section">
                  <h2 className="smishing-info-heading">THE PERMANENCE OF THE INTERNET IN ACTION</h2>
                  <p className="smishing-info-body">The Shadow Man's file on the people of Sunshare Square is not built only from what they post today. It is built from everything they ever posted publicly — including things they deleted months or years ago. He collected those posts before they were removed, and they have been useful ever since. This is why the question to ask before posting is not 'can I delete this later?' It is 'am I comfortable with this existing permanently?' You control deletion. You do not control every copy.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label permanence-label">REMEMBER</div>
                    <div className="smishing-flag-title">YOU CONTROL DELETION. NOT EVERY COPY.</div>
                    <p className="smishing-flag-body">When you delete a post, you remove your copy. But anyone who saved it, screenshotted it, or cached it still has theirs. A post that existed publicly — even briefly — may have been collected by anyone, anywhere.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label permanence-label">REMEMBER</div>
                    <div className="smishing-flag-title">ASK THE RIGHT QUESTION BEFORE POSTING</div>
                    <p className="smishing-flag-body">The question is not 'can I delete this later?' — you can. The question is 'am I comfortable with this existing permanently, in someone else's copy, being used in ways I cannot predict?' Post accordingly.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}
          {showSocialEngInfo && (
            <div className="smishing-info-overlay" onClick={handleStoryNext}>
              <div className="smishing-info-panel se-info-panel">
                <div className="smishing-info-section">
                  <h2 className="smishing-info-heading">SOCIAL ENGINEERING</h2>
                  <p className="smishing-info-body">Social engineering is the art of manipulating people rather than systems. Instead of breaking through a firewall or cracking a code, a social engineer exploits human psychology — trust, fear, urgency, authority, helpfulness — to get people to hand over information or access voluntarily.</p>
                </div>
                <div className="se-attacks-section">
                  <div className="se-attacks-label">EVERY ATTACK ON THIS JOURNEY WAS SOCIAL ENGINEERING</div>
                  <ul className="se-attacks-list">
                    <li>Phishing emails used authority (official-looking sender) and urgency (expire in 24 hours)</li>
                    <li>Scam ads used excitement and manufactured deadlines</li>
                    <li>Smishing used personalisation to manufacture trust</li>
                    <li>Vishing used a professional voice and a structured process</li>
                    <li>The security question exploit used public personal information</li>
                    <li>Deleted posts collected before removal gave the attacker a permanent record the victim thought was gone</li>
                    <li>In this room, the Shadow Man used the player's emotional desire to find Aunt Mira to plant an impostor at the finish line</li>
                    <li>Online groups recruiting young people use the same pattern: manufactured belonging, urgency, requests for secrecy, isolation from people who care about you</li>
                  </ul>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label se-label">THE METHOD</div>
                    <div className="smishing-flag-title">FIND THE FEELING. EXPLOIT THE GAP. WORK IN SECRET.</div>
                    <p className="smishing-flag-body">The tactics are the same whether someone wants your password, your money, your personal information, or your loyalty. The method is always the same.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label se-label">KNOWING THE NAME</div>
                    <div className="smishing-flag-title">ONCE YOU SEE THE PATTERN, YOU SEE IT EVERYWHERE</div>
                    <p className="smishing-flag-body">Knowing the name for it is the first step to seeing it everywhere. Once you can see the pattern, you can see it in every context it appears.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}
          {showMFAQuizScreen && (
            <div
              className="quiz-overlay"
              onClick={mfaQuizAnswer === 'B' ? handleStoryNext : mfaQuizAnswer ? () => setMfaQuizAnswer(null) : undefined}
            >
              <div className="quiz-panel">
                <div className="quiz-header">WHAT DO YOU DO?</div>
                <p className="quiz-question">Jaylen asks: If I have MFA on, and someone calls me pretending to be from the gaming platform and asks me to read them my authentication code — what do I do?</p>

                {!mfaQuizAnswer ? (
                  <div className="quiz-options">
                    {[
                      { id: 'A', text: 'Read them the code — they verified they are from the platform and I have MFA enabled so it is safe.' },
                      { id: 'B', text: 'Never read an authentication code to anyone over the phone. MFA codes are for you to enter yourself — not to share.' },
                      { id: 'C', text: 'Ask them to verify who they are by giving me some account details first.' },
                    ].map(({ id, text }) => (
                      <div
                        key={id}
                        className="quiz-option"
                        onClick={(e) => { e.stopPropagation(); setMfaQuizAnswer(id) }}
                      >
                        <span className="quiz-option-key">{id}</span>
                        <span className="quiz-option-text">{text}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="quiz-result">
                    {mfaQuizAnswer === 'A' && (
                      <div className="quiz-feedback quiz-feedback--wrong">
                        <div className="quiz-verdict">✗ INCORRECT</div>
                        <p className="quiz-woman-says">That is exactly what the caller wants. Having MFA enabled does not make it safe to share the code — it makes the code the target. No legitimate platform will ever call and ask you to read back a code. The code exists to authenticate you to the platform, not to a caller.</p>
                      </div>
                    )}
                    {mfaQuizAnswer === 'B' && (
                      <div className="quiz-feedback quiz-feedback--correct">
                        <div className="quiz-verdict">✓ CORRECT</div>
                        <p className="quiz-woman-says">MFA only protects you if you keep the second factor private. The moment you read that code to someone — even someone who seems completely legitimate — you have handed them the key. Authentication codes are generated for you to use, not to share. Hang up.</p>
                        <div className="quiz-remember">
                          <div className="quiz-remember-label">REMEMBER: AUTHENTICATION CODES ARE PRIVATE</div>
                          <p className="quiz-remember-body">An authentication code sent to your phone or generated by your app is a single-use key. The moment you share it, it can be used to access your account. No legitimate caller will ever ask for it.</p>
                        </div>
                      </div>
                    )}
                    {mfaQuizAnswer === 'C' && (
                      <div className="quiz-feedback quiz-feedback--wrong">
                        <div className="quiz-verdict">✗ INCORRECT</div>
                        <p className="quiz-woman-says">A skilled caller can answer basic account questions — they gathered that information before the call. Verifying their identity by asking questions does not protect you. The rule is simple: hang up and never share the code.</p>
                      </div>
                    )}
                    {mfaQuizAnswer === 'B'
                      ? <div className="smishing-continue">tap anywhere to continue</div>
                      : <div className="smishing-continue">tap anywhere to try again</div>
                    }
                  </div>
                )}
              </div>
            </div>
          )}
          {showQuizScreen && (
            <div
              className="quiz-overlay"
              onClick={quizAnswer === 'B' ? handleStoryNext : quizAnswer ? () => setQuizAnswer(null) : undefined}
            >
              <div className="quiz-panel">
                <div className="quiz-header">WHAT DO YOU DO?</div>
                <p className="quiz-question">The parent in this scenario is still on the phone with the caller. What should they do right now?</p>

                {!quizAnswer ? (
                  <div className="quiz-options">
                    {[
                      { id: 'A', text: 'Stay on the call and verify the caller\'s identity by asking questions.' },
                      { id: 'B', text: 'End the call immediately. Then call the organisation directly on a number found independently — not one the caller provides. Do not enter any codes or click any links related to the call.' },
                      { id: 'C', text: 'Ask the caller to hold while they check the code.' },
                    ].map(({ id, text }) => (
                      <div
                        key={id}
                        className="quiz-option"
                        onClick={(e) => { e.stopPropagation(); setQuizAnswer(id) }}
                      >
                        <span className="quiz-option-key">{id}</span>
                        <span className="quiz-option-text">{text}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="quiz-result">
                    {quizAnswer === 'A' && (
                      <div className="quiz-feedback quiz-feedback--wrong">
                        <div className="quiz-verdict">✗ INCORRECT</div>
                        <p className="quiz-woman-says">Staying on the call gives the caller more time to manipulate and more opportunity to gather information. Skilled vishers are trained to answer verification questions convincingly. End the call.</p>
                      </div>
                    )}
                    {quizAnswer === 'B' && (
                      <div className="quiz-feedback quiz-feedback--correct">
                        <div className="quiz-verdict">✓ CORRECT</div>
                        <p className="quiz-woman-says">End the call. Then find the official number yourself — on the organisation's website, not from the caller. If it was real, calling the official number will confirm it and allow you to continue through a legitimate channel. If it was fake, you have given them nothing.</p>
                        <div className="quiz-remember">
                          <div className="quiz-remember-label">REMEMBER: HANG UP AND CALL BACK INDEPENDENTLY</div>
                          <p className="quiz-remember-body">If a phone call asks for codes, passwords, or personal information — hang up. Then find the official contact number yourself and call back through that. Never call a number the suspicious caller gave you.</p>
                        </div>
                      </div>
                    )}
                    {quizAnswer === 'C' && (
                      <div className="quiz-feedback quiz-feedback--wrong">
                        <div className="quiz-verdict">✗ INCORRECT</div>
                        <p className="quiz-woman-says">Putting a visher on hold does not protect you. They know you are uncertain — they use that. End the call completely and call back on an independent number.</p>
                      </div>
                    )}
                    {quizAnswer === 'B'
                      ? <div className="smishing-continue">tap anywhere to continue</div>
                      : <div className="smishing-continue">tap anywhere to try again</div>
                    }
                  </div>
                )}
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
              const emotion = (showQuizScreen && quizAnswer)
                ? (quizAnswer === 'B' ? null : 'upset')
                : (showMFAQuizScreen && mfaQuizAnswer)
                  ? (mfaQuizAnswer === 'B' ? null : 'upset')
                  : observatoryLine?.emotion
              const leftSpeaking = observatorySpeakerSide === 'left'
              const rightSpeaking = observatorySpeakerSide === 'right'
              const applyLeftEmotion = leftSpeaking || showQuizScreen || showMFAQuizScreen
              const emotionImgLeft = emotion === 'thinking' ? aunt1Thinking : emotion === 'upset' ? aunt1Upset : null
              const emotionImgRight = emotion === 'thinking' ? aunt1Thinking : emotion === 'upset' ? aunt1Upset : null
              return (
                <>
                  <div className={`observatory-figure left ${leftSpeaking || showQuizScreen || showMFAQuizScreen ? 'speaking' : 'silent'}`}>
                    <img
                      src={applyLeftEmotion && emotionImgLeft ? emotionImgLeft : aunt1Left}
                      alt="Woman A"
                      className="observatory-figure-img"
                      style={applyLeftEmotion && emotionImgLeft ? { transform: 'scaleX(-1)' } : undefined}
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
