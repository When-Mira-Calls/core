import React, { useState, useEffect, useCallback, useRef } from 'react'
import { playClick, playBack, playCorrect, playWrong, playPartial, playReveal, playCardIn, playPhoneBuzz, playInspect, playOptionSelect } from './sounds'
import RealOrFakeGame from './RealOrFakeGame'
import PopupGame from './PopupGame'
import PictureTestGame from './PictureTestGame'
import StrongboxPasswordGame from './StrongboxPasswordGame'
import StrongboxSealScene from './StrongboxSealScene'
import PrismStoreScene from './PrismStoreScene'
import PhishGame from './PhishGame'
import TextAnalyzer from './TextAnalyzer'
import PasswordChest from './PasswordChest'
import TrailMap from './TrailMap'
import TrailRetreat from './TrailRetreat'
import StrongboxScene from './StrongboxScene'
import ItemFocusOverlay from './ItemFocusOverlay'
import FinalGame from './FinalGame'
import EditBeforeYouPost from './EditBeforeYouPost'
import GuidesOverlay from './GuidesOverlay'
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
import observatoryScreen from '../assets/Observatory Screen.png'
import bedroomImg from '../assets/Bedroom.png'
import bookshelUnselected from '../assets/Bookshelf-unselected.png'
import bookshelfSelected from '../assets/Bookshelf-selected.png'
import miraPhoto from '../assets/Aunt Mira Photograph.png'
import observatoryLockedDoor from '../assets/Observatory Locked Door.png'
import observatoryIntRoom from '../assets/Observatory Int Room.png'
import keypadCardSlot from '../assets/Keypad + Card Slot.png'
import StrongboxCardScene from './StrongboxCardScene'
import shadowFigure from '../assets/shadow.png'
import shadowFigure1 from '../assets/shadow1.png'
import consolScreenGreen from '../assets/Consol Screen - green.png'
import consolScreenBlue from '../assets/Consol Screen - blue.png'
import starrySky from '../assets/Starry Sky.png'
import seabrightHarbour from '../assets/SeaBright Harbor.png'
import seabrightAmbience from '../audio/seabright.wav'
import sunshareAmbience from '../audio/sunshare.mp3'
import mainAmbience from '../audio/main.mp3'
import introAmbience from '../audio/intro.mp3'
import lighthouseExt from '../assets/Lighthouse Ext.png'
import oldFinn from '../assets/Old Finn.png'
import coralImg from '../assets/Coral.png'
import compassImg from '../assets/Compass.png'
import prismImg from '../assets/Prism.png'
import phoneOrange from '../assets/Phone - orange.png'
import phoneBlue from '../assets/Phone - blue.png'
import priyaHappy from '../assets/Priya - happy.png'
import priyaUnhappy from '../assets/Priya - unhappy.png'
import aunt3 from '../assets/Aunt 3.png'
import aunt3Thinking from '../assets/Aunt 3 - thinking.png'
import aunt3Upset from '../assets/Aunt 3 - upset.png'
import aunt3Left from '../assets/Aunt 3_left.png'
import lighthouseDoor from '../assets/Lighthouse Door.png'
import lighthouseInt from '../assets/Lighthouse Int.png'
import sunshareSquare from '../assets/Sunshare Square.png'
import aunt2Thinking from '../assets/Aunt 2 - thinking.png'
import aunt2Upset from '../assets/Aunt 2 - upset.png'
import goldenKnotImg from '../assets/Golden Knot.png'
import wmcLogoImg from '../assets/WMC Logo (HD).png'
import strongboxClosed from '../assets/Strongbox - closed.png'

// Cinematic narrator positions - irregular left/right rhythm, not strict alternation
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
    { speaker: 'Narrator', text: 'The hill is steeper than it looked from the square. You climb slowly, the strongbox tucked under your arm, your legs aching by the time the path levels out.' },
    { speaker: 'Narrator', text: 'The Observatory is a round stone building with a domed roof. Older than you expected. The windows are narrow, and a small light blinks near the top - steady and slow, like a heartbeat.' },
    { speaker: 'Narrator', text: 'You push open the front door. It is heavier than it looks.' },
    { speaker: 'Narrator', text: 'Inside it is cool and quiet. The walls curve around you. The room smells faintly of old paper and electricity.' },
    { speaker: 'Narrator', text: 'You made it. You are actually here.' },
    { speaker: 'Narrator', text: 'You are still catching your breath when one of the screens near the window flickers - and on it, just for a second, you see a dark shape moving outside. Someone walking fast. Away from the building.' },
    { speaker: '[YOUR NAME]', text: 'That is him. That is the Shadow Man.' },
    { speaker: '[YOUR NAME]', text: 'That is him. That is the Shadow Man.', shake: true, showShadow: true },
    { speaker: 'Narrator', text: 'You go very still. You watch the screen. The shape does not come back.' },
    { speaker: 'Narrator', text: 'He was here. And now he knows you are here too.' },
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
    { speaker: '', text: '', hideBubble: true, showObsScreen: true },
    { speaker: 'Narrator', text: 'You approach the first bank of screens on the left wall.', showObsScreen: true },
    { speaker: '', text: '', showSmishing: true, hideBubble: true, showObsScreen: true },
    { speaker: '[YOUR NAME]', text: 'This is smishing. A fake text - but using real personal information to make it feel real.', showSmishing: true, showObsScreen: true },
    { speaker: 'WOMAN A', text: 'Look at what it uses. His first name. His school name. A saved contact name that seemed official. All of that came from his public profile. Without the personal information, this is just a generic scam. With it, it feels personal.', showWomen: true, showSmishing: true, emotion: 'thinking', showObsScreen: true },
    { speaker: 'WOMAN B', text: 'Look at what it uses. His first name. His school name. A saved contact name that seemed official. All of that came from his public profile. Without the personal information, this is just a generic scam. With it, it feels personal.', showWomen: true, showSmishing: true, emotion: 'thinking', showObsScreen: true },
    { speaker: '', text: '', showSmishingInfo: true, hideBubble: true, showObsScreen: true },
    { speaker: 'WOMAN B', text: 'We are running out of time. He is still tracking the strongbox. Just give me the items now and we can lock him out before he gets closer.', showWomen: true, emotion: 'upset', showObsScreen: true },
    { speaker: 'Narrator', text: 'Woman A says nothing. She watches Woman B. Then she looks at you.', showWomen: true, showObsScreen: true },
    { speaker: 'Narrator', text: 'You move to the next screen. A recorded phone call plays through a small speaker. You can see a transcript alongside it. This is the call that the family in Sunshare Square received.', showObsScreen: true },
    { speaker: '', text: '', showVishing: true, hideBubble: true, showObsScreen: true },
    { speaker: '[YOUR NAME]', text: 'That is vishing. A phone call instead of a text or email. And it sounds completely real because they used Priya\'s actual school name and her actual first name.', showObsScreen: true },
    { speaker: 'WOMAN A', text: 'And notice the final step. The verification code they asked for was not for security. It was the password reset code for Priya\'s account. The caller was using the parent\'s trust and the official-sounding process to intercept a code that would give them access. The personal information opened the door. The code was the key.', showWomen: true, emotion: 'thinking', showObsScreen: true },
    { speaker: '', text: '', showVishingInfo: true, hideBubble: true, showObsScreen: true },
    { speaker: '', text: '', showQuiz: true, hideBubble: true, showWomen: true, hideWomanB: true, showObsScreen: true },
    { speaker: 'Narrator', text: 'Woman B moves toward you again.', showWomen: true, showObsScreen: true },
    { speaker: 'WOMAN B', text: 'You have to trust me. I am your aunt. You know what I sound like from the letter. You know who I am.', showWomen: true, emotion: 'upset', showObsScreen: true },
    { speaker: 'Narrator', text: 'On the far side of the Observatory, a heavy door is set into the curved wall. Unlike the entrance door, this one is firmly locked - and the lock is unusual. It has two stages.', showLockedDoor: true },
    { speaker: '[YOUR NAME]', text: 'This needs two things to open. A code and a card.', showWomen: true, showLockedDoor: true },
    { speaker: 'WOMAN A', text: 'The code is the passphrase you have been carrying. The card is in the strongbox - Mira left it there before the compass.', showWomen: true, emotion: 'thinking', showLockedDoor: true, showKeypad: true },
    { speaker: '', text: '', hideBubble: true, showLockedDoor: true, showStrongboxCard: true },
    { speaker: 'Narrator', text: 'You enter the passphrase on the keypad. Then slot the card. Two clicks. The door opens.', showLockedDoor: true, showKeypad: true },
    { speaker: 'WOMAN A', text: 'That door cannot be opened by guessing the passphrase alone. Even if someone knew your passphrase, they would need the physical card too. And even if they had the card, they would need the passphrase. Both. Always both.', showWomen: true, emotion: 'thinking', showLockedDoor: true, showKeypad: true },
    { speaker: '', text: '', showMFAInfo: true, hideBubble: true, showLockedDoor: true, showKeypad: true },
    { speaker: '', text: '', showMFAQuiz: true, hideBubble: true, showWomen: true, hideWomanB: true, showLockedDoor: true, showKeypad: true },
    { speaker: 'Narrator', text: 'The locked room reveals the Shadow Man\'s full trail.', showIntRoom: true },
    { speaker: '', text: '', showTrailMap: true, hideBubble: true, showIntRoom: true },
    { speaker: 'Narrator', text: 'The screen in the locked room shows the Shadow Man\'s trail in red - every stop, every gap, every piece of information collected.', showIntRoom: true },
    { speaker: 'Narrator', text: 'Seabright: the phishing emails that harvested harbour logins.', showIntRoom: true },
    { speaker: 'Narrator', text: 'The lighthouse: circling for weaknesses in the strongbox.', showIntRoom: true },
    { speaker: 'Narrator', text: 'Sunshare Square: collecting personal information from public profiles, building a picture of every person who lived and posted there.', showIntRoom: true },
    { speaker: 'Narrator', text: 'And then arriving here, ahead of you, with an impostor in place.', showIntRoom: true },
    { speaker: 'WOMAN A', text: 'Look at the dates on his collection from Sunshare Square.', showWomen: true, hideWomanB: true, emotion: 'thinking', showIntRoom: true },
    { speaker: 'Narrator', text: 'You look at the timestamps on the Shadow Man\'s file. Some entries are from this week. But others are from over a year ago. Two years. Posts that no longer exist on anyone\'s live profile. Still here. Still readable. Still used.', showIntRoom: true },
    { speaker: '[YOUR NAME]', text: 'He has posts that were deleted. How does he have those?', showWomen: true, showIntRoom: true },
    { speaker: 'WOMAN A', text: 'He collected them while they were live. Cached copies. Screenshots. His own archive. The internet does not automatically forget on your behalf - it only forgets when every copy, everywhere, is gone. And you only control one copy.', showWomen: true, hideWomanB: true, showIntRoom: true },
    { speaker: '', text: '', showPermanenceInfo: true, hideBubble: true, showIntRoom: true },
    { speaker: 'WOMAN A', text: 'Look at the pattern. Every attack across this journey. The phishing emails at Seabright. The scam texts. The vishing call. The fake ad Coral almost clicked. The security questions answered from Jaylen\'s public profile. The deleted posts that should not exist any more but do. What do they all have in common?', showWomen: true, hideWomanB: true, emotion: 'thinking', showIntRoom: true },
    { speaker: '[YOUR NAME]', text: 'They all used feelings. Fear, urgency, authority. None of them broke in by force. They all found a gap in how someone felt and slipped through it.', showWomen: true, showIntRoom: true },
    { speaker: '', text: '', showSocialEngInfo: true, hideBubble: true, showIntRoom: true },
    { speaker: 'WOMAN B', text: 'We do not have time for the lesson. I need the items. He is getting closer.', showWomen: true, emotion: 'upset', showIntRoom: true },
    { speaker: 'Narrator', text: 'A pause. Then Woman B adds something quickly, as if filling the silence.', showWomen: true, showIntRoom: true },
    { speaker: 'WOMAN B', text: 'You have already spoken to both of them - Celia and Rosa. You know how important this is. Please.', showWomen: true, emotion: 'upset', showIntRoom: true },
    { speaker: 'Narrator', text: 'You did not say how many aunts you had visited. You did not mention Rosa by name. Not in this room. Not to either of these women. A wrong note in a familiar song. The room is very quiet for a moment.', showWomen: true, showIntRoom: true },
    { speaker: 'WOMAN A', text: 'There it is again.', showWomen: true, hideWomanB: true, showIntRoom: true },
    { speaker: 'Narrator', text: 'You stand in the middle of the Observatory with the strongbox in your hands. Two identical women watch you. The screens show the Shadow Man\'s trail still active - but slowed. He is waiting, too. Waiting to see if his trap works.', showWomen: true, showIntRoom: true },
    { speaker: 'Narrator', text: 'You have everything you need. You have been building toward this moment since a Saturday morning when a letter arrived with a lighthouse stamp. Think. Look at what happened. Look at what each woman did.', showWomen: true, showIntRoom: true },
    { speaker: '', text: '', showFinalGameIntro: true, hideBubble: true, showIntRoom: true },
    { speaker: '', text: '', showFinalGame: true, hideBubble: true, showIntRoom: true },
    { speaker: '[YOUR NAME]', text: 'You are Mira.', showWomen: true, hideWomanB: true, miraMoment: true },
    { speaker: 'MIRA', text: 'I am Mira. Hello, [PLAYER NAME]. I am very glad you made it.', showWomen: true, hideWomanB: true, miraMoment: true },
    { speaker: '', text: '', showTrailRetreat: true, hideBubble: true },
    { speaker: 'Narrator', text: 'The red trail retreats.' },
    { speaker: 'Narrator', text: 'From Sunshare Square, from the lighthouse cliff, from the edges of Seabright. Moving away.' },
    { speaker: 'Narrator', text: 'Not gone - the Shadow Man does not disappear. But the trail that was following you, circling the gaps, waiting for an opening... it goes still.' },
    { speaker: 'Narrator', text: 'There are no gaps left. There is nothing for it to find.' },
    { speaker: 'MIRA', text: 'He moves on to easier targets. He always does. The people who understand what he does are not worth the time it takes.', showWomen: true, hideWomanB: true },
    { speaker: '[YOUR NAME]', text: 'Will he come back?', showWomen: true, hideWomanB: true },
    { speaker: 'MIRA', text: 'He will try different doors. But not these ones. Not yours.', showWomen: true, hideWomanB: true },
    { speaker: '', text: '', showStrongboxScene: true, hideBubble: true },
    { speaker: 'MIRA', text: 'The compass first. Old Finn chose well. Did he actually let you leave?', showWomen: true, hideWomanB: true, showItemFocus: 'compass' },
    { speaker: '[YOUR NAME]', text: 'He waved me off without saying anything.', showWomen: true, hideWomanB: true, showItemFocus: 'compass' },
    { speaker: 'MIRA', text: 'That is the highest compliment he gives. He waves and says nothing. It means he thinks you are going to be alright.', showWomen: true, hideWomanB: true, showItemFocus: 'compass' },
    { speaker: 'MIRA', text: 'The prism. Rosa kept it safe. She always does.', showWomen: true, hideWomanB: true, showItemFocus: 'prism' },
    { speaker: '[YOUR NAME]', text: 'She was watching me the whole time I was in the square. I could feel it.', showWomen: true, hideWomanB: true, showItemFocus: 'prism' },
    { speaker: 'MIRA', text: 'She watches everything. It is the kindest thing she knows how to do - to really pay attention. Most people do not.', showWomen: true, hideWomanB: true, showItemFocus: 'prism' },
    { speaker: 'Narrator', text: 'The knot. Mira holds it for a long moment. Turns it in her fingers. The gold catches the light from the Observatory screens.', showWomen: true, hideWomanB: true, showItemFocus: 'knot' },
    { speaker: 'MIRA', text: 'Celia gave you this properly? She did not make a joke about it?', showWomen: true, hideWomanB: true, showItemFocus: 'knot' },
    { speaker: '[YOUR NAME]', text: 'She made several jokes about it. But she also made sure I understood it.', showWomen: true, hideWomanB: true, showItemFocus: 'knot' },
    { speaker: 'MIRA', text: 'That is Celia. She will do the most important thing in the funniest possible way and somehow it still lands.', showWomen: true, hideWomanB: true, showItemFocus: 'knot' },
    { speaker: 'Narrator', text: 'Three items, across three worlds, carried safely across a journey that started with a photograph on a Saturday morning. All of them here now.', showWomen: true, hideWomanB: true },
    { speaker: 'MIRA', text: 'Thank you. All of this - the compass, the prism, the knot - these are pieces of work I have been doing for a very long time. Documenting the methods. Building the trail. Creating something that would teach, not just warn. I needed them back, and I could not carry them myself right now. And I needed someone who would learn along the way.', showWomen: true, hideWomanB: true },
    { speaker: '[YOUR NAME]', text: 'Why me?', showWomen: true, hideWomanB: true },
    { speaker: 'MIRA', text: 'Because you were ready without knowing you were ready. Because the skills this journey needed are ones that live in the way someone thinks - asking questions before acting, checking before trusting, looking at what is actually there rather than what something claims to be. I knew you had those things. I just needed the journey to prove it to you.', showWomen: true, hideWomanB: true },
    { speaker: '[YOUR NAME]', text: 'Will you explain the whole story now? Who you are, why you were not at home, what all of this was for?', showWomen: true, hideWomanB: true },
    { speaker: 'MIRA', text: 'Yes. All of it. Let me make tea first - it is going to take a while. And I should warn you: some of it is complicated.', showWomen: true, hideWomanB: true },
    { speaker: '[YOUR NAME]', text: 'That is okay. I think I can handle complicated now.', showWomen: true, hideWomanB: true },
    { speaker: 'MIRA', text: 'I know you can. I watched.', showWomen: true, hideWomanB: true },
    { speaker: 'Narrator', text: 'And so you sit down in the Observatory at the top of the hill, with the screens showing a world that is a little safer than it was this morning, and Mira makes tea and begins to explain everything. The whole story. All the parts she could not put in the letter.', showExterior: true },
    { speaker: 'Narrator', text: 'Outside, the lighthouse beam sweeps. The red trail on the big screen holds still.', showExterior: true },
    { speaker: 'Narrator', text: 'You are here. You made it. And now you know enough that getting here was never really the most important thing.', showExterior: true },
    { speaker: 'Narrator', text: 'Knowing what you know now - that is.', showExterior: true },
  ],
}

// ── Progress persistence ──────────────────────────────────────
const SAVE_KEY = 'cybersafe_progress'
// Cached once per page load so every useState lazy initialiser reads the same object
let _savedOnce = null
function loadProgress() {
  if (_savedOnce !== null) return _savedOnce
  try { _savedOnce = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null') || {} }
  catch { _savedOnce = {} }
  return _savedOnce
}
function saveProgress(data) {
  _savedOnce = null
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)) } catch {}
}
export function clearProgress() {
  _savedOnce = null
  try { localStorage.removeItem(SAVE_KEY) } catch {}
}

// ── Demo-mode flag - separate key so it survives general save rewrites ───────
const DEMO_MODE_KEY = 'cybersafe_demo_mode'
function loadDemoModeFlag() {
  try { return localStorage.getItem(DEMO_MODE_KEY) === 'true' } catch { return false }
}
function setDemoModeFlag(val) {
  try { if (val) localStorage.setItem(DEMO_MODE_KEY, 'true'); else localStorage.removeItem(DEMO_MODE_KEY) } catch {}
}

// ── Demo progress persistence ─────────────────────────────────
const DEMO_SAVE_KEY = 'cybersafe_demo_progress'
let _demoSavedOnce = null
function loadDemoProgress() {
  if (_demoSavedOnce !== null) return _demoSavedOnce
  try { _demoSavedOnce = JSON.parse(localStorage.getItem(DEMO_SAVE_KEY) || 'null') || null }
  catch { _demoSavedOnce = null }
  return _demoSavedOnce
}
function saveDemoProgress(data) {
  try { localStorage.setItem(DEMO_SAVE_KEY, JSON.stringify(data)) } catch {}
}
function clearDemoProgress() {
  _demoSavedOnce = null
  try { localStorage.removeItem(DEMO_SAVE_KEY) } catch {}
}

export default function App() {
  const DEMO_ONLY = Boolean(import.meta.env.VITE_DEMO_ONLY)
  const [sceneIndex, setSceneIndex] = useState(() => loadProgress().sceneIndex ?? 0)
  const [lineIndex, setLineIndex]   = useState(() => DEMO_ONLY ? (loadDemoProgress()?.lineIndex ?? 0) : (loadProgress().lineIndex ?? 0))
  const sv = DEMO_ONLY ? {} : loadProgress()   // shorthand for all initialisers below
  // Restore view - skip transient/demo views, fall back to home
  // Only restore story-observatory if demo mode is also active (flag is in its own key)
  const _savedView = sv.view
  const _demoFlagActive = loadDemoModeFlag()
  const _viewAllowed = _demoFlagActive || !['story-observatory', 'demo'].includes(_savedView)
  const _safeView  = ['home','story','story-classic','story-observatory','seabright','phish','analyzer','chest','start-name','start-reveal','start-opener','start-bedroom'].includes(_savedView) && _viewAllowed ? _savedView : 'home'
  const [view, setView] = useState(DEMO_ONLY ? 'demo-home' : 'home') // 'landing' | 'home' | 'story' | 'story-classic' | 'story-observatory' | 'phish' | 'analyzer' | 'chest' | 'start-name' | 'start-reveal' | 'start-opener' | 'start-bedroom'
  const [startNameInput, setStartNameInput] = useState('')
  const [startName, setStartName] = useState(() => sv.startName ?? '')
  const [isFullPlaythrough, setIsFullPlaythrough] = useState(false)
  const [startBedroomLine, setStartBedroomLine] = useState(() => sv.startBedroomLine ?? 0)
  const [playerName, setPlayerName] = useState(() => DEMO_ONLY ? (loadDemoProgress()?.playerName ?? '') : (sv.playerName ?? ''))
  const [playerNameInput, setPlayerNameInput] = useState('')
  const [isObservatoryShaking, setIsObservatoryShaking] = useState(false)
  const [showBedroomLetter, setShowBedroomLetter] = useState(false)
  const [photoShook, setPhotoShook] = useState(false)
  const [photoZooming, setPhotoZooming] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [titleClickable, setTitleClickable] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [outroLine, setOutroLine] = useState(0)
  const [departureLine, setDepartureLine] = useState(0)
  const [seabrightLine, setSeabrightLine] = useState(() => sv.seabrightLine ?? 0)
  const [tabletCountdown, setTabletCountdown] = useState(47)
  const seabrightAudioRef = useRef(null)
  const sunshareAudioRef = useRef(null)
  const mainAudioRef = useRef(null)
  const introAudioRef = useRef(null)
  const mainAudioOffsetRef = useRef(null)    // null = don't seek; number = seek to that second on next play
  const mainGamePositionRef = useRef(null)   // real-game position saved before any chapter jump; null = not overridden
  const tabletTimerRef = useRef(null)
  const [timerResetVal, setTimerResetVal] = useState(5)
  const [timerResetPhase, setTimerResetPhase] = useState('counting') // 'counting' | 'zero' | 'reset'
  const timerResetIntervalRef = useRef(null)
  const timerResetTimeoutRef = useRef(null)
  const [sbInspected, setSbInspected] = useState({ sender: false, link: false })
  const [urlRevealed, setUrlRevealed] = useState(false)
  const [urlHolding, setUrlHolding] = useState(false)
  const urlHoldTimerRef = useRef(null)
  // Phishing quiz (branching)
  const [sbQuizAnswer, setSbQuizAnswer] = useState(null)
  const [sbQuizStep, setSbQuizStep] = useState(0)
  const [sbQuizBReveals, setSbQuizBReveals] = useState({ sender: false, link: false })
  const [sbQuizBHolding, setSbQuizBHolding] = useState({ sender: false, link: false })
  const sbQuizBSenderTimer = useRef(null)
  const sbQuizBLinkTimer = useRef(null)
  // Coral quiz (branching)
  const [cqAnswer, setCqAnswer] = useState(null)
  const [cqStep, setCqStep] = useState(0)
  // Scam-ad quiz (branching)
  const [saqAnswer, setSaqAnswer] = useState(null)
  const [saqStep, setSaqStep] = useState(0)
  // Carol quiz (branching)
  const [bqAnswer, setBqAnswer] = useState(null)
  const [bqStep, setBqStep] = useState(0)
  // Privacy / deliberate sharing quiz (branching)
  const [pqAnswer, setPqAnswer] = useState(null)
  const [pqStep, setPqStep] = useState(0)
  // Security question quiz (branching)
  const [sqAnswer, setSqAnswer] = useState(null)
  const [sqStep, setSqStep] = useState(0)
  // Online trust / secret-keeping quiz (branching)
  const [oqAnswer, setOqAnswer] = useState(null)
  const [oqStep, setOqStep] = useState(0)
  // Password fix order quiz (branching)
  const [fqAnswer, setFqAnswer] = useState(null)
  const [fqStep, setFqStep] = useState(0)
  // Cyberbullying / bystander-perpetrator-victim quiz (branching)
  const [cyqAnswer, setCyqAnswer] = useState(null)
  const [cyqStep, setCyqStep] = useState(0)
  const [chapterInfo, setChapterInfo] = useState(null) // { number, title, subtitle }
  const [chapterDest, setChapterDest] = useState(null) // 'start-bedroom'|'seabright-0'|'seabright-113'|'seabright-176'|'observatory'
  const [instrPage, setInstrPage] = useState(1)
  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false)
  const [devExpandedChapter, setDevExpandedChapter] = useState(null)
  const SB_LINES_COUNT = 327      // keep in sync with SB_LINES array length
  const SB_PHONE_INSPECT_IDX = 15 // index of the phone-inspect entry in SB_LINES
  const SB_URL_PREVIEW_IDX = 22   // index of the url-preview entry in SB_LINES
  const SB_QUIZ_IDX = 27          // index of the phishing-quiz entry in SB_LINES
  const SB_CORAL_QUIZ_IDX = 43    // index of the coral-quiz entry in SB_LINES
  const SB_REAL_OR_FAKE_IDX = 47  // index of the real-or-fake entry in SB_LINES
  const SB_SCAM_AD_QUIZ_IDX = 75  // index of the scam-ad-quiz entry in SB_LINES
  const SAQ_PATH_LENGTHS = { A: 2, B: 5, C: 3 }
  const SB_CAROL_QUIZ_IDX = 89     // index of the bram-quiz entry in SB_LINES
  const SB_PRIVACY_QUIZ_IDX = 195  // index of the privacy-quiz entry in SB_LINES
  const BQ_PATH_LENGTHS = { A: 3, B: 5, C: 3 }
  const PQ_PATH_LENGTHS = { A: 2, B: 3, C: 3 }
  const SB_SECURITY_QUIZ_IDX = 217 // security-question-quiz entry
  const SQ_PATH_LENGTHS = { A: 3, B: 4, C: 2 }
  const SB_ONLINE_TRUST_QUIZ_IDX = 232 // online-trust-quiz entry
  const OQ_PATH_LENGTHS = { A: 2, B: 3, C: 2 }
  const SB_FIX_QUIZ_IDX = 255          // password-fix-quiz entry
  const FQ_PATH_LENGTHS = { A: 2, B: 3, C: 2 }
  const SB_CYBERBULLYING_QUIZ_IDX = 286 // cyberbullying-quiz entry
  const CYQ_PATH_LENGTHS = { A: 2, B: 4, C: 2 }
  const SB_QUIZ_PATH_LENGTHS = { A: 4, B: 5, C: 3 }
  const CQ_PATH_LENGTHS = { A: 2, B: 4, C: 2 }

  const BEDROOM_LINES = [
    { text: 'It is Saturday. There is no school.' },
    { text: 'The smell of toast is coming from somewhere downstairs and through the window you can see a sky that cannot decide between grey and blue.' },
    { text: 'A perfectly normal morning, by all appearances.' },
    { text: 'Your parent appears from the kitchen, holding something.' },
    { speaker: 'PARENT', text: 'There is post for you. Actual post - like, with a stamp and an envelope. When did anyone last get actual post?' },
    { speaker: '[YOUR NAME]', text: 'Post? Who sends me post?' },
    { speaker: 'PARENT', text: 'It has your name on it. Unless there is another [PLAYER NAME], I do not know about. It was in the letterbox this morning. Stamp on it looks like a lighthouse.', showEnvelope: true },
    { waitForLetter: true, showEnvelope: true },
    { speaker: '[YOUR NAME]', text: '...I have an Aunt Mira. Who I have never met. Who knows the cat\'s name.' },
    { isChoice: true, showBookshelf: true, prompt: 'WHAT DO YOU DO?', sub: 'The letter says to look at something you have already seen. What do you do?', options: [
      { label: 'A', text: 'Ask your parent - maybe they know who Aunt Mira is and where she might be.', path: 'continue' },
      { label: 'B', text: 'Take a look around your room more carefully.', path: 'blank' },
    ]},
    { isSelectedChoice: true, showBookshelf: true },
    { text: 'Your parent reads the letter and goes quiet for a moment.', showBookshelf: true },
    { speaker: 'PARENT', text: 'Mira. I have not heard that name in... a long time. She is your dad\'s sister. She travelled everywhere - always sending postcards, always somewhere interesting. She knows this house well. She would have been here when you were very small.', showBookshelf: true },
    { speaker: '[YOUR NAME]', text: 'She says she left me a way to find her. Something I have already seen.', showBookshelf: true },
    { speaker: 'PARENT', text: 'Something in this house, then. Something she left here. Think about what caught your eye this morning - anything unusual?', showBookshelf: true },
    { showBlank: true, showBookshelf: true },
    { showPhotoScene: true, photoPhase: 'wait' },
    { showPhotoScene: true, text: 'A faded photograph in a wooden frame. A woman stands outside a lighthouse, Laughing at the camera, she is wearing a long coat and holding a notebook against her chest. Behind her, carved into a stone post at the lighthouse entrance: SEABRIGHT LIGHTHOUSE.' },
    { showPhotoScene: true, speaker: '[YOUR NAME]', text: 'The photograph. On my bookshelf. A woman in front of a lighthouse. It says Seabright Lighthouse on the stone.' },
    { showPhotoScene: true, speaker: '[YOUR NAME]', text: 'She marked it. She was here and she placed the photograph on my shelf - that is Seabright Lighthouse. That is where she is.' },
    { showPhotoScene: true, speaker: 'PARENT', text: 'Seabright! Yes - she loved that lighthouse. If she is anywhere, she is there. That is your clue, [PLAYER NAME].' },
    { showPhotoScene: true, photoPhase: 'zoomWait' },
  ]
  const [typedLength, setTypedLength] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState(null)
  const [mfaQuizAnswer, setMfaQuizAnswer] = useState(null)
  const [showGameEnd, setShowGameEnd] = useState(false)
  const [showDevConsole, setShowDevConsole] = useState(false)
  const [showGuides, setShowGuides] = useState(false)
  const [demoMode,   setDemoMode]   = useState(() => DEMO_ONLY || loadDemoModeFlag())
  const _dp = DEMO_ONLY ? loadDemoProgress() : null
  const [demoStep,   setDemoStep]   = useState(_dp?.demoStep ?? 'obs') // 'obs' | 'context' | 'game' | 'thanks'
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
  const showTrailRetreat = view === 'story-observatory' && Boolean(observatoryLine?.showTrailRetreat)
  const showStrongboxScene = view === 'story-observatory' && Boolean(observatoryLine?.showStrongboxScene)
  const showItemFocus = view === 'story-observatory' ? (observatoryLine?.showItemFocus || null) : null
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
    observatoryLine?.speaker === 'Woman A' || observatoryLine?.speaker === 'WOMAN A' || observatoryLine?.speaker === 'MIRA'
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

  const showWhiteBackground = showSmishingScreen || showSmishingInfo || showVishingScreen || showVishingInfo || showQuizScreen || showMFAInfo || showMFAQuizScreen || showTrailMap || showPermanenceInfo || showSocialEngInfo || showFinalGameIntro || showFinalGame || showTrailRetreat || showStrongboxScene
  const forceExterior = view === 'story-observatory' && Boolean(observatoryLine?.showExterior)
  const forceObsScreen = view === 'story-observatory' && Boolean(observatoryLine?.showObsScreen)
  const forceLockedDoor = view === 'story-observatory' && Boolean(observatoryLine?.showLockedDoor)
  const forceIntRoom = view === 'story-observatory' && Boolean(observatoryLine?.showIntRoom)
  const showKeypad = view === 'story-observatory' && Boolean(observatoryLine?.showKeypad)
  const showStrongboxCard = view === 'story-observatory' && Boolean(observatoryLine?.showStrongboxCard)
  const miraMoment = view === 'story-observatory' && Boolean(observatoryLine?.miraMoment)
  const bgImage = forceLockedDoor ? observatoryLockedDoor : forceIntRoom ? observatoryIntRoom : forceObsScreen ? observatoryScreen : (obsShowInterior && !forceExterior ? observatoryInt : observatoryExt)
  const bgIsObsExterior = !forceLockedDoor && !forceIntRoom && !forceObsScreen && (!obsShowInterior || forceExterior)
  const observatoryBackgroundStyle = {
    backgroundColor: '#0f1728',
    backgroundImage: `linear-gradient(180deg, rgba(8, 12, 22, 0.12), rgba(8, 12, 22, 0.28)), url(${bgImage})`,
    backgroundPosition: forceLockedDoor && showKeypad ? 'center 20%' : 'center',
    backgroundSize: forceLockedDoor && showKeypad ? '180%' : 'cover',
    backgroundRepeat: 'no-repeat',
  }
  const resolveName = (text) =>
    text
      .replace(/\[YOUR NAME\]/g, playerName || '[YOUR NAME]')
      .replace(/\[PLAYER NAME\]/g, playerName || '[PLAYER NAME]')

  const renderObservatoryText = (text) => {
    text = resolveName(text)
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
  const isTyping = isStoryView && !hideObservatoryBubble && !isPlayerLine && !isNarratorLine && typedLength < activeStoryText.length
  const displayedStoryText = hideObservatoryBubble ? '' : activeStoryText.slice(0, typedLength)

  const next = useCallback(() => {
    playClick()
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
    playBack()
    if (lineIndex > 0) {
      setLineIndex(lineIndex - 1)
    } else if (sceneIndex > 0) {
      const prevScene = story[sceneIndex - 1]
      setSceneIndex(sceneIndex - 1)
      setLineIndex(prevScene.dialogue.length - 1)
    }
  }, [lineIndex, sceneIndex])

  const observatoryNext = useCallback(() => {
    playClick()
    if (lineIndex + 1 < observatoryStory.dialogue.length) {
      setLineIndex(lineIndex + 1)
    } else {
      if (demoMode) {
        setDemoStep('context')
        setView('demo')
      } else {
        setShowGameEnd(true)
      }
    }
  }, [lineIndex, demoMode])

  const observatoryPrev = useCallback(() => {
    playBack()
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
      else { playWrong(); setQuizAnswer(null) }
      return
    }

    if (showFinalGame) return // FinalGame controls its own advancement
    if (showStrongboxScene) return // StrongboxScene controls its own advancement
    if (showStrongboxCard) return // StrongboxCardScene controls its own advancement
    if (showTrailRetreat) return // TrailRetreat controls its own advancement
    if (showGameEnd) { playClick(); setShowGameEnd(false); setView('home'); return }

    if (showMFAQuizScreen) {
      if (mfaQuizAnswer === 'B') observatoryNext()
      else { playWrong(); setMfaQuizAnswer(null) }
      return
    }

    if (isTyping) {
      playClick()
      revealCurrentLine()
      return
    }

    if (isObservatoryView) {
      observatoryNext()
      return
    }

    next()
  }, [showFinalGame, showGameEnd, showQuizScreen, quizAnswer, showMFAQuizScreen, mfaQuizAnswer, isObservatoryView, isTyping, next, observatoryNext, revealCurrentLine])

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

    const isNowInterior = lineIndex >= 3

    if (prev === -1) {
      // Fresh entry - set interior state immediately, no fade
      setObsShowInterior(isNowInterior)
      setObsBgBlack(false)
      return undefined
    }

    const wasInterior = prev >= 3
    if (isNowInterior === wasInterior) {
      setObsBgBlack(false) // safety: clear any stuck black from an aborted transition
      return undefined
    }

    // Threshold crossed - swap background immediately, animate black overlay over it
    setObsShowInterior(isNowInterior)
    setObsBgBlack(true)
    const t = window.setTimeout(() => setObsBgBlack(false), 700)
    return () => {
      window.clearTimeout(t)
      setObsBgBlack(false) // aborted - clear overlay, background already correct
    }
  }, [lineIndex, view])

  useEffect(() => {
    const onKey = (e) => {
      if (view === 'start-bedroom') {
        const currentBedroomLine = BEDROOM_LINES[startBedroomLine]
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
          if (currentBedroomLine?.waitForLetter || currentBedroomLine?.isChoice || currentBedroomLine?.photoPhase) return
          if (startBedroomLine >= BEDROOM_LINES.length - 1) {
            isFullPlaythrough ? (setOutroLine(0), setView('outro')) : setView('home')
          } else {
            setStartBedroomLine(l => l + 1)
          }
        }
        if (e.key === 'ArrowLeft') {
          setStartBedroomLine(l => {
            const prev = Math.max(0, l - 1)
            if (BEDROOM_LINES[prev]?.isSelectedChoice) return Math.max(0, prev - 1)
            return prev
          })
        }
        return
      }
      if (view === 'seabright') {
        if (e.key === 'ArrowRight' || e.key === 'Enter') {
          // Block advance on phone-inspect until both spots are magnified
          if (seabrightLine === SB_PHONE_INSPECT_IDX && !(sbInspected.sender && sbInspected.link)) return
          // Block advance on url-preview until player has revealed the real URL
          if (seabrightLine === SB_URL_PREVIEW_IDX && !urlRevealed) return
          // Quiz: block until answer selected; block B path step 0 until both revealed
          if (seabrightLine === SB_QUIZ_IDX) {
            if (!sbQuizAnswer) return
            if (sbQuizAnswer === 'B' && sbQuizStep === 0 && !(sbQuizBReveals.sender && sbQuizBReveals.link)) return
            const pathLen = SB_QUIZ_PATH_LENGTHS[sbQuizAnswer]
            if (sbQuizStep >= pathLen - 1) {
              if (sbQuizAnswer === 'B') { setSeabrightLine(l => l + 1) }
              else { setSbQuizAnswer(null); setSbQuizStep(0) }
            } else { setSbQuizStep(s => s + 1) }
            return
          }
          if (seabrightLine === SB_CORAL_QUIZ_IDX) {
            if (!cqAnswer) return
            const pathLen = CQ_PATH_LENGTHS[cqAnswer]
            if (cqStep >= pathLen - 1) {
              if (cqAnswer === 'B') { setSeabrightLine(l => l + 1) }
              else { setCqAnswer(null); setCqStep(0) }
            } else { setCqStep(s => s + 1) }
            return
          }
          if (seabrightLine === SB_REAL_OR_FAKE_IDX) return // only completable via perfect score in game
          if (seabrightLine === 94) return  // minigame2 only completable via the game's own onComplete
          if (seabrightLine === 154) return // password minigame only completable via its own onComplete
          if (seabrightLine === 199) return // picture-test minigame only completable via its own onComplete
          if (seabrightLine === 263) return // edit-before-post only completable via its own onComplete
          if (seabrightLine === 69 && timerResetPhase !== 'reset') return // wait for timer to reach zero and reset
          if (seabrightLine === SB_SCAM_AD_QUIZ_IDX) {
            if (!saqAnswer) return
            const pathLen = SAQ_PATH_LENGTHS[saqAnswer]
            if (saqStep >= pathLen - 1) {
              if (saqAnswer === 'B') { setSeabrightLine(l => l + 1) }
              else { setSaqAnswer(null); setSaqStep(0) }
            } else { setSaqStep(s => s + 1) }
            return
          }
          if (seabrightLine === SB_CAROL_QUIZ_IDX) {
            if (!bqAnswer) return
            const pathLen = BQ_PATH_LENGTHS[bqAnswer]
            if (bqStep >= pathLen - 1) {
              if (bqAnswer === 'B') { setSeabrightLine(l => l + 1) }
              else { setBqAnswer(null); setBqStep(0) }
            } else { setBqStep(s => s + 1) }
            return
          }
          if (seabrightLine === SB_PRIVACY_QUIZ_IDX) {
            if (!pqAnswer) return
            const pathLen = PQ_PATH_LENGTHS[pqAnswer]
            if (pqStep >= pathLen - 1) {
              if (pqAnswer === 'C') { setSeabrightLine(l => l + 1) }
              else { setPqAnswer(null); setPqStep(0) }
            } else { setPqStep(s => s + 1) }
            return
          }
          if (seabrightLine === SB_SECURITY_QUIZ_IDX) {
            if (!sqAnswer) return
            const pathLen = SQ_PATH_LENGTHS[sqAnswer]
            if (sqStep >= pathLen - 1) {
              if (sqAnswer === 'B') { setSeabrightLine(l => l + 1) }
              else { setSqAnswer(null); setSqStep(0) }
            } else { setSqStep(s => s + 1) }
            return
          }
          if (seabrightLine === SB_ONLINE_TRUST_QUIZ_IDX) {
            if (!oqAnswer) return
            const pathLen = OQ_PATH_LENGTHS[oqAnswer]
            if (oqStep >= pathLen - 1) {
              if (oqAnswer === 'B' || oqAnswer === 'C') { setSeabrightLine(l => l + 1) }
              else { setOqAnswer(null); setOqStep(0) }
            } else { setOqStep(s => s + 1) }
            return
          }
          if (seabrightLine === SB_FIX_QUIZ_IDX) {
            if (!fqAnswer) return
            const pathLen = FQ_PATH_LENGTHS[fqAnswer]
            if (fqStep >= pathLen - 1) {
              if (fqAnswer === 'B' || fqAnswer === 'C') { setSeabrightLine(l => l + 1) }
              else { setFqAnswer(null); setFqStep(0) }
            } else { setFqStep(s => s + 1) }
            return
          }
          if (seabrightLine === SB_CYBERBULLYING_QUIZ_IDX) {
            if (!cyqAnswer) return
            const pathLen = CYQ_PATH_LENGTHS[cyqAnswer]
            if (cyqStep >= pathLen - 1) {
              if (cyqAnswer === 'B') { setSeabrightLine(l => l + 1) }
              else { setCyqAnswer(null); setCyqStep(0) }
            } else { setCyqStep(s => s + 1) }
            return
          }
          if (seabrightLine >= SB_LINES_COUNT - 1) {
            goToChapter({ number: 'V', title: 'At the Edge of the Sky' }, 'observatory')
          } else if (seabrightLine + 1 === 113) {
            goToChapter({ number: 'III', title: 'Into The Lighthouse' }, 'seabright-113')
          } else if (seabrightLine + 1 === 177) {
            goToChapter({ number: 'IV', title: 'Echoes in the Sunshare Square' }, 'seabright-176')
          } else {
            setSeabrightLine(l => l + 1)
          }
        }
        if (e.key === 'ArrowLeft') setSeabrightLine(l => Math.max(0, l - 1))
        return
      }

      if (!isStoryView) {
        return
      }

      if (e.key === 'ArrowRight' || e.key === 'Enter') handleStoryNext()
      if (e.key === 'ArrowLeft') handleStoryPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleStoryNext, handleStoryPrev, isStoryView, view, BEDROOM_LINES.length, startBedroomLine, seabrightLine, sbInspected, SB_PHONE_INSPECT_IDX, urlRevealed, SB_URL_PREVIEW_IDX, sbQuizAnswer, sbQuizStep, sbQuizBReveals, SB_QUIZ_IDX, SB_QUIZ_PATH_LENGTHS, SB_REAL_OR_FAKE_IDX, timerResetPhase, saqAnswer, saqStep, SB_SCAM_AD_QUIZ_IDX, SAQ_PATH_LENGTHS, bqAnswer, bqStep, SB_CAROL_QUIZ_IDX, BQ_PATH_LENGTHS, pqAnswer, pqStep, SB_PRIVACY_QUIZ_IDX, PQ_PATH_LENGTHS, sqAnswer, sqStep, SB_SECURITY_QUIZ_IDX, SQ_PATH_LENGTHS, oqAnswer, oqStep, SB_ONLINE_TRUST_QUIZ_IDX, OQ_PATH_LENGTHS, fqAnswer, fqStep, SB_FIX_QUIZ_IDX, FQ_PATH_LENGTHS, cyqAnswer, cyqStep, SB_CYBERBULLYING_QUIZ_IDX, CYQ_PATH_LENGTHS])

  // Reset interactive state whenever the player moves to a new line
  useEffect(() => {
    setSbInspected({ sender: false, link: false })
    setUrlRevealed(false)
    setUrlHolding(false)
    if (urlHoldTimerRef.current) { clearTimeout(urlHoldTimerRef.current); urlHoldTimerRef.current = null }
    setSbQuizAnswer(null)
    setSbQuizStep(0)
    setSbQuizBReveals({ sender: false, link: false })
    setSbQuizBHolding({ sender: false, link: false })
    if (sbQuizBSenderTimer.current) { clearTimeout(sbQuizBSenderTimer.current); sbQuizBSenderTimer.current = null }
    if (sbQuizBLinkTimer.current) { clearTimeout(sbQuizBLinkTimer.current); sbQuizBLinkTimer.current = null }
    setCqAnswer(null)
    setCqStep(0)
    setSaqAnswer(null)
    setSaqStep(0)
    setBqAnswer(null)
    setBqStep(0)
    setPqAnswer(null)
    setPqStep(0)
    setSqAnswer(null)
    setSqStep(0)
    setOqAnswer(null)
    setOqStep(0)
    setFqAnswer(null)
    setFqStep(0)
    setCyqAnswer(null)
    setCyqStep(0)
  }, [seabrightLine])


  // Tablet popup countdown - runs only while that line is active
  useEffect(() => {
    if (view !== 'seabright' || seabrightLine !== 54) {
      clearInterval(tabletTimerRef.current)
      setTabletCountdown(47)
      return
    }
    setTabletCountdown(47)
    tabletTimerRef.current = setInterval(() => {
      setTabletCountdown(n => (n <= 1 ? 47 : n - 1))
    }, 1000)
    return () => clearInterval(tabletTimerRef.current)
  }, [view, seabrightLine])

  // Timer-reset sequence: count down to 00:00, flash, reset to 01:00
  useEffect(() => {
    if (view !== 'seabright' || seabrightLine !== 69) {
      clearInterval(timerResetIntervalRef.current)
      clearTimeout(timerResetTimeoutRef.current)
      setTimerResetPhase('counting')
      setTimerResetVal(12)
      return
    }
    setTimerResetPhase('counting')
    let current = 5
    setTimerResetVal(current)
    timerResetIntervalRef.current = setInterval(() => {
      current -= 1
      if (current <= 0) {
        clearInterval(timerResetIntervalRef.current)
        setTimerResetVal(0)
        setTimerResetPhase('zero')
        timerResetTimeoutRef.current = setTimeout(() => {
          setTimerResetPhase('reset')
          let resetCurrent = 60
          setTimerResetVal(resetCurrent)
          timerResetIntervalRef.current = setInterval(() => {
            resetCurrent = resetCurrent <= 1 ? 60 : resetCurrent - 1
            setTimerResetVal(resetCurrent)
          }, 1000)
        }, 1500)
      } else {
        setTimerResetVal(current)
      }
    }, 1000)
    return () => {
      clearInterval(timerResetIntervalRef.current)
      clearTimeout(timerResetTimeoutRef.current)
    }
  }, [view, seabrightLine])

  // Intro + main crossfade — both stop on home menu, resume in game
  useEffect(() => {
    const inGame = !['home', 'landing', 'demo-home'].includes(view)

    let intro = introAudioRef.current
    if (!intro) {
      intro = new Audio(introAmbience)
      intro.loop = true
      intro.volume = 0
      introAudioRef.current = intro
    }
    let main = mainAudioRef.current
    if (!main) {
      main = new Audio(mainAmbience)
      main.loop = true
      main.volume = 0
      mainAudioRef.current = main
    }

    let frameId
    if (!inGame) {
      // Fade out both tracks when on home/landing
      // Restore real-game position before pausing so Continue resumes from the right spot
      if (mainGamePositionRef.current !== null) {
        main.currentTime = mainGamePositionRef.current
        mainGamePositionRef.current = null
      }
      const fadeOut = () => {
        let running = false
        if (intro.volume > 0) { intro.volume = Math.max(0, intro.volume - 0.006); running = true }
        if (main.volume  > 0) { main.volume  = Math.max(0, main.volume  - 0.006); running = true }
        if (running) { frameId = requestAnimationFrame(fadeOut) }
        else { intro.pause(); main.pause() }
      }
      frameId = requestAnimationFrame(fadeOut)
    } else if (!showTitle) {
      // In game, before title card: play intro only
      main.volume = 0; main.pause()
      intro.play().catch(() => {})
      const fadeIn = () => {
        if (intro.volume < 0.22) {
          intro.volume = Math.min(0.22, intro.volume + 0.003)
          frameId = requestAnimationFrame(fadeIn)
        }
      }
      frameId = requestAnimationFrame(fadeIn)
    } else {
      // In game, after title card: crossfade intro → main
      if (mainAudioOffsetRef.current !== null) {
        main.currentTime = mainAudioOffsetRef.current
        mainAudioOffsetRef.current = null
      }
      main.play().catch(() => {})
      const cross = () => {
        let running = false
        if (intro.volume > 0)   { intro.volume = Math.max(0,    intro.volume - 0.004); running = true }
        if (main.volume  < 0.18){ main.volume  = Math.min(0.18, main.volume  + 0.003); running = true }
        if (running) { frameId = requestAnimationFrame(cross) }
        else { intro.pause() }
      }
      frameId = requestAnimationFrame(cross)
    }

    return () => cancelAnimationFrame(frameId)
  }, [view, showTitle])

  // Seabright waves — full volume at harbour (0–111), quiet at lighthouse (112–175), off at sunshare
  useEffect(() => {
    let audio = seabrightAudioRef.current
    if (!audio) {
      audio = new Audio(seabrightAmbience)
      audio.loop = true
      audio.volume = 0
      seabrightAudioRef.current = audio
    }

    const isHarbour    = view === 'seabright' && seabrightLine < 112
    const isLighthouse = view === 'seabright' && seabrightLine >= 112 && seabrightLine < 176
    const targetVol    = isHarbour ? 1.0 : isLighthouse ? 0.28 : 0

    let frameId
    if (targetVol > 0) {
      audio.play().catch(() => {})
      const fade = () => {
        const diff = targetVol - audio.volume
        if (Math.abs(diff) > 0.005) {
          audio.volume = Math.max(0, Math.min(1, audio.volume + (diff > 0 ? 0.005 : -0.008)))
          frameId = requestAnimationFrame(fade)
        } else {
          audio.volume = targetVol
        }
      }
      frameId = requestAnimationFrame(fade)
      return () => cancelAnimationFrame(frameId)
    } else {
      audio.volume = 0
      audio.pause()
    }
  }, [view, seabrightLine])

  // Sunshare Square ambience — plays when in sunshare section (seabrightLine >= 176)
  useEffect(() => {
    let audio = sunshareAudioRef.current
    if (!audio) {
      audio = new Audio(sunshareAmbience)
      audio.loop = true
      audio.volume = 0
      sunshareAudioRef.current = audio
    }

    const active = view === 'seabright' && seabrightLine >= 176
    let frameId
    if (active) {
      audio.play().catch(() => {})
      const fadeIn = () => {
        if (audio.volume < 0.15) {
          audio.volume = Math.min(0.15, audio.volume + 0.005)
          frameId = requestAnimationFrame(fadeIn)
        }
      }
      frameId = requestAnimationFrame(fadeIn)
      return () => cancelAnimationFrame(frameId)
    } else {
      audio.volume = 0
      audio.pause()
    }
  }, [view, seabrightLine])

  const resetAudioForNewGame = useCallback(() => {
    if (introAudioRef.current) { introAudioRef.current.pause(); introAudioRef.current.currentTime = 0; introAudioRef.current.volume = 0 }
    if (mainAudioRef.current)  { mainAudioRef.current.pause();  mainAudioRef.current.currentTime  = 0; mainAudioRef.current.volume  = 0 }
    mainAudioOffsetRef.current = null
    // mainGamePositionRef is intentionally NOT cleared here — the ch1 helper saves the position
    // before calling this, and the home audio effect consumes+clears it when navigating home.
    // By the time New Game is clicked (from home), the home effect has already consumed+nulled it.
    setShowTitle(false)
  }, [])

  // Jump straight to main audio at a specific timestamp — used for chapters 2–5 and minigames
  const startChapterAudio = useCallback((offsetSeconds) => {
    if (introAudioRef.current) { introAudioRef.current.pause(); introAudioRef.current.volume = 0 }
    // Save real-game position on the first chapter jump only (chaining chapters must not overwrite it)
    if (mainGamePositionRef.current === null && mainAudioRef.current) {
      mainGamePositionRef.current = mainAudioRef.current.currentTime
    }
    if (mainAudioRef.current) {
      // Apply the seek immediately — the audio effect won't re-run if view/showTitle don't change
      // (e.g. navigating between seabright sub-chapters while already in seabright)
      mainAudioRef.current.currentTime = offsetSeconds
      mainAudioRef.current.play().catch(() => {})
      mainAudioOffsetRef.current = null  // already consumed; prevent double-seek in the effect
    } else {
      // Audio element not yet created; effect will create it and seek on first run
      mainAudioOffsetRef.current = offsetSeconds
    }
    setShowTitle(true) // skip intro, go straight to main
  }, [])

  // Unlock title-card click only after all CSS animations finish (~4.2 s total)
  useEffect(() => {
    if (!showTitle) { setTitleClickable(false); return }
    const t = setTimeout(() => setTitleClickable(true), 4500)
    return () => clearTimeout(t)
  }, [showTitle])

  // Sync mute toggle to all audio elements
  useEffect(() => {
    [mainAudioRef, introAudioRef, seabrightAudioRef, sunshareAudioRef].forEach(ref => {
      if (ref.current) ref.current.muted = isMuted
    })
  }, [isMuted])

  // Persist progress to localStorage whenever key state changes
  // Skip saving 'home' or 'chapter' so returning to menu / passing a chapter card never overwrites position
  useEffect(() => {
    if (DEMO_ONLY) return
    if (view === 'home') return
    if (view === 'chapter') return  // chapter transition card — not a real save point
    if (playerName === 'Dev') return  // dev console jumps don't overwrite the real save
    saveProgress({ view, sceneIndex, lineIndex, seabrightLine, playerName, startName, startBedroomLine })
  }, [view, sceneIndex, lineIndex, seabrightLine, playerName, startName, startBedroomLine])

  // Persist demo progress separately
  useEffect(() => {
    if (!DEMO_ONLY) return
    if (view === 'demo-home') return // nothing to resume from home
    saveDemoProgress({ view, demoStep, lineIndex, playerName })
  }, [view, demoStep, lineIndex, playerName])

  const goToChapter = (info, dest) => {
    setChapterInfo(info)
    setChapterDest(dest)
    setView('chapter')
  }

  const goAfterChapter = () => {
    playClick()
    const dest = chapterDest
    setChapterInfo(null)
    setChapterDest(null)
    // Black overlay fades out to reveal the new scene
    const overlay = document.createElement('div')
    overlay.style.cssText = 'position:fixed;inset:0;background:#000;z-index:9999;pointer-events:none;animation:scene-from-black 2.6s ease forwards'
    document.body.appendChild(overlay)
    overlay.addEventListener('animationend', () => overlay.remove(), { once: true })
    if (dest === 'instructions') { setView('instructions') }
    else if (dest === 'start-bedroom') { setView('start-bedroom') }
    else if (dest === 'seabright-0') { setSeabrightLine(0); setView('seabright') }
    else if (dest === 'seabright-113') { setSeabrightLine(113); setView('seabright') }
    else if (dest === 'seabright-176') { setSeabrightLine(176); setView('seabright') }
    else if (dest === 'observatory') { setLineIndex(0); setTypedLength(0); setIsObservatoryShaking(false); setView('story-observatory') }
  }

  // show top-left back-link only for the standalone game views
  const showGlobalBack = !DEMO_ONLY && ['phish', 'analyzer', 'chest'].includes(view)
  const showHomeBtn = !DEMO_ONLY && !['home', 'landing', 'demo', 'demo-home'].includes(view)

  // Imperative home button - works with all early returns
  const _homeBtnRef = useRef(null)
  useEffect(() => {
    let btn = _homeBtnRef.current
    if (!btn) {
      btn = document.createElement('button')
      btn.className = 'global-home-btn'
      btn.setAttribute('aria-label', 'Return to main menu')
      btn.textContent = '⌂'
      document.body.appendChild(btn)
      _homeBtnRef.current = btn
    }
    btn.style.display = showHomeBtn ? 'flex' : 'none'
    const handler = () => { playClick(); setView('home') }
    btn.addEventListener('click', handler)
    return () => btn.removeEventListener('click', handler)
  })

  if (showGuides) return <GuidesOverlay onClose={() => setShowGuides(false)} />

  if (view === 'chapter' && chapterInfo) {
    return (
      <div className="game-root chapter-screen" onClick={goAfterChapter}>
        <div className="chapter-glow" aria-hidden="true" />
        <div className="chapter-inner">
          <div className="chapter-label">Chapter {chapterInfo.number}</div>
          <div className="chapter-ornament">
            <span className="chapter-ornament-dot" />
            <span className="chapter-ornament-line" />
            <span className="chapter-ornament-diamond">◆</span>
            <span className="chapter-ornament-line" />
            <span className="chapter-ornament-dot" />
          </div>
          <h2 className="chapter-title">{chapterInfo.title}</h2>
        </div>
        <div className="chapter-continue">- tap to continue -</div>
      </div>
    )
  }

  if (view === 'instructions') {
    const goNext = (e) => {
      e.stopPropagation()
      if (instrPage === 1) { playClick(); setInstrPage(2) }
      else { playClick(); setInstrPage(1); setStartBedroomLine(0); goToChapter({ number: 'I', title: 'A Letter from Nowhere' }, 'start-bedroom') }
    }
    return (
      <div className="game-root instr-screen" onClick={goNext}>

        {instrPage === 1 && (
          <div key="p1" className="instr-inner instr-p1">
            <p className="instr-heading">How to navigate</p>
            <p className="instr-desc">Click the buttons - or use the <span className="instr-key">←</span> <span className="instr-key">→</span> arrow keys - to move through the story.</p>

            <div className="instr-nav-row">
              <div className="instr-nav-side">
                <div className="instr-nav-btn-row">
                  <div className="instr-chevrons instr-chevrons--left">
                    <span>◂</span><span>◂</span><span>◂</span>
                  </div>
                  <div className="dialogue-controls instr-controls-mock">
                    <button className="back-inline" tabIndex={-1} aria-hidden="true">
                      <img src={backArrow} alt="back" />
                    </button>
                  </div>
                </div>
                <p className="instr-nav-label">Go back</p>
              </div>

              <div className="instr-nav-divider" />

              <div className="instr-nav-side">
                <div className="instr-nav-btn-row">
                  <div className="dialogue-controls instr-controls-mock">
                    <button className="next-btn" tabIndex={-1} aria-hidden="true">
                      <img src={nextArrow} alt="next" />
                    </button>
                  </div>
                  <div className="instr-chevrons instr-chevrons--right">
                    <span>▸</span><span>▸</span><span>▸</span>
                  </div>
                </div>
                <p className="instr-nav-label">Continue</p>
              </div>
            </div>

            <p className="instr-tap-hint">tap anywhere to continue</p>
          </div>
        )}

        {instrPage === 2 && (
          <div key="p2" className="instr-inner instr-p2">
            <p className="instr-heading">Your progress</p>

            <ul className="instr-facts">
              <li>
                <span className="instr-fact-icon">⌂</span>
                <span>The <strong>home button</strong> in the top-left corner returns you to the menu at any time</span>
              </li>
              <li>
                <span className="instr-fact-icon">↺</span>
                <span>Progress is saved automatically - <strong>step away and return</strong> whenever you like</span>
              </li>
              <li>
                <span className="instr-fact-icon">⬡</span>
                <span>Come back on <strong>the same browser</strong> and you will pick up exactly where you left off</span>
              </li>
            </ul>

            <p className="instr-tap-hint">tap anywhere to begin</p>
          </div>
        )}

      </div>
    )
  }

  // Outro narration - black screen after title
  if (view === 'outro') {
    return (
      <div className="game-root" style={{ background: '#000' }}>
        <div className="outro-root" onClick={() => { playClick(); setOutroLine(0); setView('doorway') }}>
          <p className="outro-text">
            You have a name. You have a destination. You have a letter from an aunt you did not know existed, telling you to collect things and keep them safe and not let anyone take them. You are not entirely sure what you are walking into. But that, if anything, is exactly the kind of Saturday you wanted.
          </p>
          <div className="outro-press">- tap to continue -</div>
        </div>
      </div>
    )
  }

  // Doorway dialogue - parent in bedroom doorway
  if (view === 'doorway') {
    const DOORWAY_LINES = [
      { speaker: 'PARENT', text: 'I have put my number at the top of your contacts. You call me if anything feels off, alright? Not after something goes wrong. Before.' },
      { speaker: '[YOUR NAME]', text: 'I know. I will.' },
      { speaker: 'PARENT', text: 'Phone is charged?' },
      { speaker: '[YOUR NAME]', text: 'Yes.' },
      { speaker: 'PARENT', text: 'You have looked at the map?' },
      { speaker: '[YOUR NAME]', text: 'Seabright Lighthouse is right on the coast road. Forty minutes on the bus. I have the map open already.' },
      { speaker: 'PARENT', text: `Good. And ${resolveName('[YOUR NAME]')} - Mira has a way of putting people in the middle of interesting situations. Just… be ready for things to be a bit unexpected.` },
      { speaker: '[YOUR NAME]', text: 'What kind of interesting situations?' },
      { speaker: 'PARENT', text: 'The kind where you end up knowing something important that you did not know before. That is usually how it goes with her.' },
    ]
    const line = DOORWAY_LINES[outroLine]
    const atEnd = outroLine >= DOORWAY_LINES.length - 1
    const advanceDoorway = () => { playClick(); atEnd ? (setDepartureLine(0), setView('departure')) : setOutroLine(l => l + 1) }
    const goBackDoorway = () => { playBack(); setOutroLine(l => Math.max(0, l - 1)) }
    return (
      <div className="game-root" style={{ background: '#0a0f1a' }}>
        <div className="start-bedroom-screen">
          <div className="bubble-tail-container observatory-bubble-wrap">
            <div className="bubble">
              <div className="nameplate">{resolveName(line.speaker)}</div>
              <div className="bubble-inner">
                <div className="bubble-line">{resolveName(line.text)}</div>
                <div className="dialogue-controls">
                  <button className="back-inline" aria-label="previous"
                    onClick={e => { e.stopPropagation(); goBackDoorway() }}>
                    <img src={backArrow} alt="back" />
                  </button>
                  <button className="next-btn" aria-label="next"
                    onClick={e => { e.stopPropagation(); advanceDoorway() }}>
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

  // Departure narration - three beats before the journey begins
  if (view === 'departure') {
    const DEPARTURE_LINES = [
      'You put on your jacket. You check your bag. You look around your room one last time - the console, the laptop, the bookshelf with its snow globe and its rocks and the empty space where the photograph used to be.',
      'Something about that empty space feels like the beginning of something.',
      'The journey to Seabright Lighthouse begins.',
    ]
    const depLine = DEPARTURE_LINES[departureLine]
    const depAtEnd = departureLine >= DEPARTURE_LINES.length - 1
    const isFinal = departureLine === DEPARTURE_LINES.length - 1
    return (
      <div className="game-root" style={{ background: '#000' }}>
      <div
        className={`departure-root${isFinal ? ' departure-root--final' : ''}`}
        onClick={() => { playClick(); depAtEnd ? goToChapter({ number: 'II', title: 'SeaBright Ahoy!' }, 'seabright-0') : setDepartureLine(l => l + 1) }}
      >
        <p key={departureLine} className="departure-text">{depLine}</p>
        <div className="departure-press">
          {depAtEnd ? '- tap to begin -' : '- tap to continue -'}
        </div>
      </div>
      </div>
    )
  }

  // Seabright arrival scene
  if (view === 'seabright') {
    const SB_LINES = [
      { type: 'narrator', text: 'The bus drops you at the edge of Seabright and you smell the sea before you see it. Salt and cold air and something else - something quieter than you expected. A fishing village should be noisy. Engines, voices, the clank of equipment. But Seabright is almost silent.' },
      { type: 'narrator', text: 'Something is really wrong here. This place looks like it has just… stopped.' },
      { type: 'narrator', text: 'You take a few steps toward the harbour. Almost immediately, a weathered man in a heavy coat breaks away from one of the groups and walks straight toward you - like he was watching for you.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'You must be the one she said was coming. She described you exactly right.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'She? Do you mean Mira? My aunt?' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'She was here two days ago. Sat in my kitchen, drank half my tea supply, fixed the latch on my door that has been broken for three years, and then left before I woke up. She said her nephew or niece would arrive and would help us sort out what has been happening. Are you them?' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'I am looking for her - she sent me a letter. But I will help. What has been happening?' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'Sit down. It is going to take a moment to explain. And it is embarrassing, honestly. We are not stupid people. But we were tricked, and badly, and now the village cannot function properly and nobody knows how to fix it.' },
      { type: 'narrator', text: 'Old Finn holds out his phone. On the screen is an email. He has read it so many times trying to figure out what went wrong that the edges of the screen are worn from his thumbs.' },
      { type: 'phone-email' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'I forwarded this to twelve people before lunch. I thought it was real. The harbour authority sends us emails sometimes about licences and renewals. This looked exactly like those emails.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'It does look pretty convincing at first.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'I clicked the link. It took me to a page asking for my harbour login and password. I typed them in. Within two hours my account was locked and someone else was using it to cancel supply orders.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Can I look at the email more carefully?' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'Be my guest. I wish I had looked more carefully myself.' },
      { type: 'phone-inspect' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'The sender name says "Seabright Harbour Authority" - but look at the actual email address underneath. seabright-port-renewal.com. That is not a real harbour authority address.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'I did not look at the address. Just the name.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'That is exactly what they were counting on. The display name is just whatever they want to type - anyone can write "Seabright Harbour Authority" as their name. The real address is what matters, and that one has been made up to look official.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'And the link - where does it actually go?' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'I did not check. I just tapped it.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'On a phone, if you press and hold a link before tapping it, the real web address appears. On a computer, you hover your mouse over it without clicking. Let me show you.' },
      { type: 'url-preview' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'It says steal-data right in the address?' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'They do not always make it that obvious. But the point is - checking before you tap tells you where you are actually going. The link text can say anything. The real address is what the link actually does.' },
      { type: 'email-redflags' },
      { type: 'phishing-info' },
      { type: 'phishing-quiz' },
      { type: 'narrator', text: 'Old Finn takes you along the harbour wall to where a young woman is sitting on a bollard, staring at her phone with the expression of someone trying to figure out where exactly everything went wrong.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'This is Coral. She is one of our best young fishers. Three days ago she nearly handed over the login code to our entire crew schedule system to someone pretending to be the coastguard.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'Nearly. I stopped myself. But only just. And I cannot figure out why I almost did it when looking back it seems so obvious.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Can I see what the message said?' },
      { type: 'phone-text' },
      { type: 'dialogue', speaker: 'CORAL', text: 'My friend\'s boat was out that day. When I read that, my heart stopped. What if it was real? What if ignoring it meant something terrible happened?' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'That feeling - that sudden panic - that was not an accident. That was designed.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'What do you mean, designed?' },
      { type: 'feelings-info' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Look at this message carefully. How many things in it are trying to make you feel scared or rushed?' },
      { type: 'dialogue', speaker: 'CORAL', text: 'URGENT in capitals. Emergency beacon. Fifteen minutes. Failure to respond may delay rescue. Every single sentence.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Exactly. A real emergency involving a real boat would be handled by the coastguard calling the boat directly, contacting the harbour master, and dispatching a vessel. They would not send a text asking a crew member to reply with an access code.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'When you say it like that it sounds obvious.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'It always sounds obvious afterwards. That is how it works. In the moment, the panic is real. The trick is learning to name what you are feeling before acting on it.' },
      { type: 'coral-redflags' },
      { type: 'coral-quiz' },
      { type: 'narrator', text: 'Old Finn gathers a small group of fishermen around the harbour-front bench. They have been comparing messages on their phones for two days, trying to figure out which ones were real and which ones tricked them.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'We have been going through these for two days and we keep second-guessing ourselves. Can you help us sort them out?' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Yes. And I am going to show you what to look for in each one so you can do this yourselves next time.' },
      { type: 'real-or-fake' },
      { type: 'narrator', text: 'As you sort through the messages, the fishermen begin to see the patterns. Someone shouts out a red flag before you even do. Someone else spots a fake address. The group starts working together.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'It is the address every time, is it not. The address never quite matches.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'That is the thing they cannot fake perfectly. The name, the logo, the urgent language - all of that is easy to copy. But registering a domain that is identical to the real one is much harder. There is always something slightly off.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'Amazon-delivery-alert. Deliveroo-support-help. School-accounts-verify. They add extra words to make it look official but it is always wrong.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Exactly. And once you see that pattern, you start seeing it everywhere.' },
      { type: 'narrator', text: 'Old Finn leads you to the village square where a community tablet computer is mounted on a post - a donation from a local charity so the fishermen can check weather reports and tide times. Coral is standing in front of it, finger hovering over the screen, staring at something with wide eyes.' },
      { type: 'tablet-popup' },
      { type: 'dialogue', speaker: 'CORAL', text: 'I was just checking the tide chart and this came up. It says I have to claim in sixty seconds or I lose the prize. I have been trying to replace my waterproof kit for months and I cannot afford it right now and - should I tap it? The clock is at forty seconds now.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Stop. Do not tap it yet.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'But the clock-' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'I know. That is the point of the clock. It wants you looking at the numbers instead of the ad. Look at the ad itself for a second.' },
      { type: 'narrator', text: 'Coral looks. You talk her through it.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'You were just checking tide times. You did not enter any competition. How did a fishing rod competition know to pop up for you, specifically, right now?' },
      { type: 'dialogue', speaker: 'CORAL', text: 'I... did not enter anything.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Right. And look at the address bar at the top of the screen. What does it say?' },
      { type: 'dialogue', speaker: 'CORAL', text: 'seabright-freegear-claims.co. Is that... wrong?' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'What is the name of the actual fishing gear shop in the village?' },
      { type: 'dialogue', speaker: 'CORAL', text: 'SeaGear Marine. Their website is seagearmarine.com.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'So this ad is not from them. It is from a different website entirely that just used the word Seabright to look local and relevant.' },
      { type: 'scam-ad-info' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'And this countdown timer - watch what happens if we let it run to zero.' },
      { type: 'tablet-timer-reset' },
      { type: 'dialogue', speaker: 'CORAL', text: 'It just... reset?' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'It was never a real countdown. The urgency was completely made up. These timers are programmed to loop forever. Nobody is going to lose a prize because they took an extra minute to think.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'That is actually really annoying.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Good. Being annoyed by it is the right response. It means you are seeing through it.' },
      { type: 'scam-ad-redflags' },
      { type: 'scam-ad-quiz' },
      { type: 'narrator', text: 'Back at the harbour wall, Coral pulls you aside. She looks like someone who has been carrying something uncomfortable for three days and is finally ready to put it down.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'I need to tell you something I have not told Old Finn yet. Yesterday morning - before I knew about any of this - I tapped a link in a text message before I could stop myself. The page loaded for maybe two seconds before I realised and closed it. I do not think anything happened. But I have been worried ever since.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'You did the right thing closing it. How long ago was this?' },
      { type: 'dialogue', speaker: 'CORAL', text: 'Yesterday. About ten in the morning.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Okay. Here is what we do.' },
      { type: 'scammed-info' },
      { type: 'scammed-steps' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Coral - did the page that loaded ask you to type anything?' },
      { type: 'dialogue', speaker: 'CORAL', text: 'No. It loaded and I immediately thought something was wrong and closed it.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Then the most important thing is to tell a trusted adult today - not because you are in trouble, but because an adult can check your phone for anything suspicious and make sure nothing happened in those two seconds. If something did get through, catching it today is much better than catching it next week.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'You are saying I am not going to get in trouble?' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'You spotted something was wrong and closed it immediately. That is good instinct. The only mistake would be staying quiet about it out of embarrassment. The scam was designed by people who study how to trick people. Getting nearly caught does not mean you were careless. It means they were skilled.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: '(arriving, having overheard the last part) She is right, Coral. Come on - we will call the harbour authority together and you can talk to your dad tonight.' },
      { type: 'bram-quiz' },
      { type: 'narrator', text: 'Old Finn has an idea. He rounds up a few of the younger fishermen - including Coral - and sets them in front of the village tablet. If they are going to understand how to protect themselves, they need to practice reacting quickly to what they see. He asks you to run the exercise.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'They know the theory now. Let them practice the reaction.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Good idea. Let\'s go.' },
      { type: 'minigame2-instructions' },
      { type: 'minigame2' },
      { type: 'narrator', text: 'After the final round, Coral high-fives someone. Old Finn looks at the screen where the scoreboard shows the fishermen\'s results. Everyone got better round by round.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'Look at that. By round three they were getting them right almost immediately.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'That is the thing about this skill. The more you practice, the faster it becomes automatic. You stop reading every suspicious message carefully after a while - you just feel when something is wrong and you check before you act.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'It gets easier?' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Much easier. And once it is automatic, it is actually quite satisfying. Like spotting the trick before the magician finishes the trick.' },
      { type: 'narrator', text: 'It takes the rest of the afternoon. You go with Old Finn from fisherman to fisherman, and each time the conversation goes roughly the same way: embarrassment, then relief, then understanding, then a kind of quiet determination. By early evening, compromised accounts have been reported and locked. Passwords have been changed. The harbour booking system is back online.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'You have done something today that we could not do for ourselves. Not because we are stupid - but because nobody had ever explained it to us in plain language. Where did you learn all of this?' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Honestly? I did not know most of it this morning. I think I just knew enough to ask the right questions.' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'She said you would say something like that.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'Mira? What else did she say?' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'She said you were on your way to find her and that you would pick things up fast. She said the village needed help and that you were the right person to give it. She was right about both things.' },
      { type: 'dialogue', speaker: 'CORAL', text: 'She also left something for you. She gave it to Old Finn before she went. Said you would earn it by the time you came to collect it.' },
      { type: 'narrator', text: 'Old Finn reaches into his coat and produces a small object wrapped in a piece of cloth. He holds it out to you.' },
      { type: 'compass-reveal' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'She also said to tell you: the lighthouse. Once the village was right again. She said you would know what to do.' },
      { type: 'dialogue', speaker: '[YOUR NAME]', text: 'The lighthouse on the cliff?' },
      { type: 'dialogue', speaker: 'OLD FINN', text: 'There is someone up there. Has been for three days. We did not ask questions - she had Mira\'s eyes and we have learned not to ask too many questions about people with Mira\'s eyes.' },
      { type: 'narrator', bg: 'lighthouse', text: 'You look up at the cliff. The lighthouse beam is sweeping in its slow circle - steady now, where it flickered before. Someone is up there, keeping the light running, waiting for you to finish what you came to do.\n\nYou say goodbye to Old Finn and Coral. You promise to come back when you have found Mira. Old Finn waves you off without a word, which from Old Finn, you are beginning to understand, is the highest possible compliment.' },
      { type: 'narrator', bg: 'lighthouse', text: 'The path up the cliff is narrow and winds between gorse bushes that smell of coconut in the cold air. Below, you can hear the harbour coming back to life - the chug of an engine, someone calling across the water. You did that. Not bad for a Saturday.' },
      { type: 'dialogue', bg: 'lighthouse', speaker: '[YOUR NAME]', text: 'She climbed this path. Mira climbed this path and I am finally gonna find her.' },
      { type: 'narrator', bg: 'lighthouse', text: 'You keep climbing, your heart pounding in your chest.' },
      { type: 'narrator', bg: 'lighthouse-door', text: 'Footsteps. Quick, light footsteps. The door opens. And you go absolutely still.' },
      { type: 'aunt-reveal', bg: 'lighthouse-door' },
      { type: 'narrator', bg: 'lighthouse-door', text: 'The face in the doorway is the face from the photograph. The same dark eyes. The same cheekbones. The same slight tilt of the head. For one breathless second you think: I found her. I actually found her.\n\nAnd then the woman in the doorway raises one eyebrow and says -' },
      { type: 'dialogue', bg: 'lighthouse-door', speaker: 'CELIA', text: 'Well. You definitely found the right lighthouse. You have exactly the expression she said you would have.' },
      { type: 'dialogue', bg: 'lighthouse-door', speaker: '[YOUR NAME]', text: '...You are not Mira.' },
      { type: 'dialogue', bg: 'lighthouse-door', speaker: 'CELIA', text: 'No. Though I have been told the resemblance is remarkable. I am Celia. Come in - I have already made tea and I made it for two so do not bother saying you do not want any because it is already poured.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'How many of you are there? Sisters, I mean.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'Three. Mira is the oldest. I am the middle one. There is also Rosa, who is the youngest and by far the most sensible, which has always annoyed both of us. Mira did not tell you about us?' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'She sent one letter. It did not have an address on it.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'That is very Mira. She plans in enormous detail and then leaves out the things other people would consider essential. Like addresses. And the number of sisters. And warnings.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'Warnings about what?' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'Hmm. Let me show you something first.' },
      { type: 'narrator', bg: 'lighthouse-int', text: 'Celia unfolds herself from the chair and goes to a wooden chest by the window. She opens it and takes out two objects, carrying them back to the table with the careful attention of someone handling things that belong to someone else.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'She left these for you. Both of them. She said you would have earned them by the time you arrived here, and that the village being back on its feet was the proof.' },
      { type: 'notebook-reveal', bg: 'lighthouse-int' },
      { type: 'knot-reveal', bg: 'lighthouse-int' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'What is the knot for?' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'Mira will explain the whole of it when you reach her. But she wrote something about it in the notebook. First bookmark.' },
      { type: 'notebook-page', bg: 'lighthouse-int', heading: 'From Mira\'s Notebook - On the Golden Knot', lines: [
        'A knot holds not by its complexity -',
        'but by its length,',
        'and its commitment to itself.',
        '',
        'Remember this when you reach the strongbox.',
        'Remember it every time you make something',
        'that needs to hold.',
      ]},
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'A knot holds by its length. Not its complexity. What does that mean for a strongbox?' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'Ah. That is where the third thing comes in.' },
      { type: 'strongbox-reveal', bg: 'lighthouse-int' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'This is for carrying Mira\'s things safely from here to her. You already have the compass from Old Finn. The knot goes in here too. And whatever you pick up on the way. The box needs a password before you leave this lighthouse - one that only you know. Because there is someone on this path who would very much like to get into it.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'Who?' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'He does not have a name that anyone knows. We call him the Shadow Man. He follows the gaps - weak passwords, unlocked boxes, information left unprotected. He has been following Mira\'s trail for a long time. He wants what she has gathered. And now he knows you have some of it.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'How does he know?' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'Because he was watching the harbour when you arrived at Seabright. And he has been watching this cliff path since you started climbing.' },
      { type: 'shadow-reveal', bg: 'lighthouse-int' },
      { type: 'narrator', bg: 'lighthouse-int', text: 'The lighthouse beam sweeps the cliff path below. For two full seconds, caught in the light, a figure stands at the base of the path. Completely still. Watching. Then the beam moves on. By the time it sweeps back: nothing. Only the pressed-down grass where something stood.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: '...Was that him?' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'That was him. He will not come up here - he does not do direct confrontation. He waits for gaps. Our job is to make sure there are none.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'So. The strongbox needs a password. And Mira left you a page in the notebook about how to make a good one. Second bookmark.' },
      { type: 'notebook-page', bg: 'lighthouse-int', heading: 'From Mira\'s Notebook - On Passwords - Length and Complexity', lines: [
        'People are told to make passwords complex.',
        'Capital letters. Symbols. Numbers.',
        'So they make something like: P@ssw0rd1',
        'and feel safe.',
        '',
        'They should not feel safe.',
        '',
        'P@ssw0rd1 has 9 characters.',
        'A computer trying every combination',
        'can crack 9 characters in minutes.',
        '',
        'Now try this instead:',
        'tiger  cloud  lamp  river',
        '',
        'Four completely random words.',
        '23 characters. No pattern.',
        'The same computer would take thousands of years.',
        '',
        'The complexity did not make P@ssw0rd1 strong.',
        'The length is what makes tiger-cloud-lamp-river strong.',
        '',
        'A knot holds by its length.',
        'So does a password.',
      ]},
      { type: 'password-lesson-length', bg: 'lighthouse-int' },
      { type: 'password-lesson-random', bg: 'lighthouse-int' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'So the knot holds by its length - and so does a password.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'She really likes a good metaphor. The knot, the compass - she is building a whole collection. Open the strongbox panel and set your password.' },
      { type: 'password-minigame-instructions', bg: 'lighthouse-int' },
      { type: 'password-minigame', bg: 'lighthouse-int' },
      { type: 'strongbox-seal', bg: 'lighthouse-int' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'Good. Now it holds. And now he cannot get into it by guessing.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'Before you go. There is something you need to understand about him.' },
      { type: 'narrator', bg: 'lighthouse-int', text: 'Celia sits back down. She is quieter now. The chaotic energy has not gone - it is just directed.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'He does not break things. He does not force doors. He finds the gaps that people leave open and slips through them. A weak password on an account. A login left active on a shared device. A piece of personal information left visible to anyone who looks. He collects those gaps the way some people collect coins. Patiently. One at a time.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'Is that what happened to Seabright?' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'Partly. The people who sent those scam messages to Seabright were working for people like him - collecting login information, account access, whatever they could get. He was not the one who sent the emails. But he would have used what they found.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'And he wants what is in the strongbox.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'He wants everything Mira has gathered. The compass, the knot, the things you will collect further along the path. Partly because they are valuable to her. Partly because having them means she cannot finish what she started. So you protect the box. You use strong passwords. You do not leave gaps.' },
      { type: 'shadow-man-info', bg: 'lighthouse-int' },
      { type: 'narrator', bg: 'lighthouse-int', text: 'Celia goes to a small drawer in the kitchen table and takes out a folded envelope. She holds it out.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'From Mira. She left one of these at each stop. It tells you where to go next - but it is a riddle, not an address. She was quite proud of them. I thought they were unnecessarily complicated but she pointed out that I am not the one building an adventure trail so my opinion is irrelevant.' },
      { type: 'notebook-page', bg: 'lighthouse-int', heading: 'From Mira\'s Notebook - Mira\'s Clue - Where to Go Next', lines: [
        'Find the place where everything is shared',
        'and nothing is hidden,',
        'where the screens are bright',
        'and the doors are always open.',
      ]},
      { type: 'dialogue', bg: 'lighthouse-int', speaker: '[YOUR NAME]', text: 'Sunshare Square. A place where everything is shared and nothing is hidden. That sounds like exactly the kind of place that could go wrong.' },
      { type: 'dialogue', bg: 'lighthouse-int', speaker: 'CELIA', text: 'It has. That is why you need to go there.' },
      { type: 'narrator', bg: 'lighthouse-door', text: 'You stand up to leave. Celia walks you to the lighthouse door. At the threshold she pauses.' },
      { type: 'dialogue', bg: 'lighthouse-door', speaker: 'CELIA', text: 'One more thing. The Shadow Man was at the base of the path. He watched you arrive. He will watch you leave. He cannot stop you - he does not work that way. But he will follow the trail.' },
      { type: 'dialogue', bg: 'lighthouse-door', speaker: '[YOUR NAME]', text: 'How do I know where he is?' },
      { type: 'dialogue', bg: 'lighthouse-door', speaker: 'CELIA', text: 'You usually do not. You just make sure the gaps are closed and the important things are locked. That is the answer. Not watching for him - making sure there is nothing for him to take.' },
      { type: 'shadow-reveal', bg: 'lighthouse-door' },
      { type: 'narrator', bg: 'lighthouse-door', text: 'You carry the strongbox. You carry Mira\'s notebook. You carry the compass and the golden knot inside the locked box. And you carry the knowledge that someone is watching the trail behind you - waiting for a gap that will not come.\n\nYou do not let him have one.' },
      { type: 'narrator', bg: 'sunshare', text: 'Sunshare Square hits you like a change of weather. After grey Seabright and the quiet cliff path, it is loud and colourful and full of light. Screens everywhere. Public feeds scrolling on boards around the square. People posting, sharing, tagging. Everything visible. Everything open. It has the energy of a place that is proud of itself.' },
      { type: 'narrator', bg: 'sunshare', text: 'And then you see her. Standing at the entrance to the square, watching you arrive with the focused attention of someone who notices everything and says only what is needed. She has Mira\'s face. Of course she does.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '???', text: 'You are later than Celia said you would be. But only by twelve minutes, which for a first journey is actually quite good.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Aunt Mira! I found you.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'I am not Mira, I am Rosa! And you are [PLAYER NAME], and you have the strongbox, and the compass and the knot are inside it, and Celia told you about the Shadow Man. Good. We have a lot to get through.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Oh. You are very different from Celia.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'Everyone says that. Come - there are some young people here who need your help and I want you to understand what happened to them before I tell you what Mira left for you.' },
      { type: 'narrator', bg: 'sunshare', text: 'Rosa leads you to a bench on the quieter side of the square where a girl is sitting with her knees pulled up, phone face-down on the bench beside her like she does not want to look at it.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'You are the one Rosa said would come?' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Yes. What happened?' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'Three days ago, two of my friends received messages that looked like they came from me. My account name, my profile picture, the way I write. One of them almost sent money because the message said I was in trouble. Another one told their parents something private because they thought it was me asking. It was not me. Someone else sent those messages pretending to be me. And I do not understand how they knew enough to fake it that well.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'That is what I want you to figure out. Walk us through Priya\'s public profile - everything anyone can see without being her friend or follower.' },
      { type: 'public-profile', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Okay. Let me go through this.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'Out loud, please. So Priya hears it too.' },
      { type: 'profile-footprints', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: '...I just thought I was posting normal things. I was not trying to share any of that.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'You were not. But it adds up. On its own, knowing your school name is not dangerous. But knowing your school, your teacher, your routine, your friend\'s username, and roughly where you live - that is a full picture. And someone built that picture from your public posts.' },
      { type: 'digital-footprint-info', bg: 'sunshare' },
      { type: 'privacy-quiz', bg: 'sunshare' },
      { type: 'narrator', bg: 'sunshare', text: 'Rosa takes you to a larger screen in the square - one of the public posting boards. A queue of posts is waiting to go live. Priya and a few other young people gather around. They want to know how to check their own posts before they share them.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'Each post below is about to go public. Your job is to check each one before it goes live. Look at what it reveals - not just on its own, but combined with what the person has already posted.' },
      { type: 'picture-test-instructions', bg: 'sunshare' },
      { type: 'picture-test-game', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'Did you notice something? The hardest ones were not the obviously dangerous posts. They were the ones that seemed fine on their own.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Because the danger is in the combination. One post is harmless. Five posts together build a picture.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'That is it exactly.' },
      { type: 'narrator', bg: 'sunshare', text: 'Priya is still sitting by the bench from earlier. She has been quiet since she saw her own profile laid out like that. There is something she still does not understand.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'Someone got into my gaming account last month. I changed my password straight away but I never figured out how they got in. My password was not obvious.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Let us figure it out together. Walk me through your security questions.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'The questions the game asks when you forget your password. To prove it is you.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'What were your security questions?' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'Name of your first pet. Name of your primary school. Your favourite football team.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'And now look at what we just examined. Your public profile - still on screen.' },
      { type: 'security-questions-profile', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Priya. Your security questions were answered by your own public profile.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: '...my pet is in a post. My primary school is in a post. And things I like are literally in my bio.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'All three answers to your security questions were publicly visible on your profile. Anyone who spent two minutes reading your posts could reset your password without knowing anything else about you.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'They are not supposed to be a security risk.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'The posts were not. But they were the answers to security questions that were protecting something important. The problem is not the post - it is using personal information that is publicly visible as a security measure.' },
      { type: 'security-question-info', bg: 'sunshare' },
      { type: 'security-question-quiz', bg: 'sunshare' },
      { type: 'narrator', bg: 'sunshare', text: 'Priya catches up with Rosa and you on the far side of the square. She has her phone in her hand and looks uncertain about whether to show it to anyone.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'Rosa - can I show you something? There is someone I have been playing Minecraft with online for three weeks. We have never met in real life. He just messaged me and said we should move our chat to a different app - one my parents have not heard of - and not to tell them because they would not understand gaming friendships. And he wants my phone number.' },
      { type: 'narrator', bg: 'sunshare', text: 'Rosa does not look alarmed. She looks thoughtful. She turns to you.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'What do you notice about that message?' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Three things. He wants to move to a platform Priya\'s parents have not heard of. He is asking Priya to keep it secret from them. And he is asking for a real-world phone number after three weeks of online contact only.' },
      { type: 'secret-keeping-info', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'But I know what games he plays, what his favourite team is, loads about him. We have been playing together for weeks. Does that not mean I know him?' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'What do you actually know that you could verify through someone else? Do you know his real name? Have you ever video-called? Do any of your real-life friends or family know him?' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: '...No. To all of that.' },
      { type: 'verification-info', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'There is also the platform request. Why would a genuine friend need you to move to an app your parents have not heard of?' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'They would not. If someone wants to move the conversation somewhere the trusted adults in your life cannot see, the right question is: what do they want to happen in that space that they do not want anyone to know about?' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'That is a really uncomfortable thing to think about.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Good. That discomfort is useful. It means you are thinking about it clearly.' },
      { type: 'online-trust-quiz', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'Okay. I will talk to my parents tonight.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Good. And if you turn out to be wrong about him, the worst thing that happens is your dad knows you have a gaming friend. That is not a bad outcome.' },
      { type: 'online-trust-info', bg: 'sunshare' },
      { type: 'narrator', bg: 'sunshare', text: 'Rosa takes you and Priya to a quiet corner of the square. Priya sits for a moment. She has just understood exactly how it happened - and understanding does not feel as good as she thought it would.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'My posts. My profile. I put all of that there. I just did not know what it could be used for.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Now you do. That is the difference.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'It does not feel like enough of a difference.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'It never does at first. But it is.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'There is one more part to your story. Once they had access to your gaming account, they found something useful there.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'My email address. It was in the account settings.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'And the password she used for the gaming account was the same one she used for her email.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Oh no.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'I know. I know that now. I used the same password for everything because I could only remember one.' },
      { type: 'password-lesson-reuse', bg: 'sunshare' },
      { type: 'password-lesson-domino', bg: 'sunshare' },
      { type: 'password-lesson-manager', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'So the strongbox password I heard about from Celia - that is the kind of password I should use as a master passphrase?' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Exactly. Long, random words, nothing personal. And then every other account gets its own completely different password that you do not need to remember because the manager holds it.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'Open the notebook. Third bookmark.' },
      { type: 'notebook-page', bg: 'sunshare', heading: 'From Mira\'s Notebook - On Password Hygiene', lines: [
        'One password for everything',
        'is one key that opens every door you own.',
        '',
        'Lose that key -',
        'and you have lost everything.',
        '',
        'Different doors deserve different keys.',
        'That is not inconvenient.',
        'That is just how locks work.',
      ]},
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Different doors deserve different keys.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'She is consistent. You will see the pattern when you meet her.' },
      { type: 'password-fix-quiz', bg: 'sunshare' },
      { type: 'narrator', bg: 'sunshare', text: 'The two of you - you and Priya - have become an unofficial checking team for the square. A crowd has gathered. People want to know: how do I share without leaving a trail? Rosa stands to one side, watching with the slight smile of someone who planned this.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'They have the theory. Now they need the habit. Show them.' },
      { type: 'location-pin-demo', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'One thing to know before you start. Many apps add your location to photos and posts automatically - without asking. A photo you take at home can carry your home address as hidden data, or as a visible tag, without you realising it was added. Part of the job is checking for those tags before anything goes live.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'So the risky detail is not always something you wrote. Sometimes the app added it for you.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'Exactly. Keep an eye on location pins. They appear more often than people expect.' },
      { type: 'edit-before-post-instructions', bg: 'sunshare' },
      { type: 'edit-before-post-game', bg: 'sunshare' },
      { type: 'narrator', bg: 'sunshare', text: 'At the end of the stream, the crowd in Sunshare Square actually applauds. Not for you - for themselves. For learning something they can now use.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'It is actually not that hard once you know what to look for.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'The cat birthday post got approved. That is the content we are all here for.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'The cat birthday post is exactly right. That is what sharing looks like when you have thought about it.' },
      { type: 'narrator', bg: 'sunshare', text: 'The square is quieter now. The crowd that gathered for the editing session has drifted off. You find Priya sitting alone, looking at her phone with the expression of someone deciding something.' },
      { type: 'narrator', bg: 'sunshare', text: 'You approach. Priya quickly turns the phone face-down.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'Sorry. It is nothing.' },
      { type: 'narrator', bg: 'sunshare', text: 'Rosa sits down beside her.' },
      { type: 'narrator', bg: 'sunshare', text: 'Priya turns the phone back over. The screen shows a group chat. Someone has posted a photo of a classmate with a mocking caption underneath. It has been shared by several people in the group. A few have added laughing reactions. Priya is in the group. She has not reacted. She has not said anything. She has not left.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'How long has this been going on?' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'Three days. I did not post the photo. I did not write the caption. I just... I did not do anything.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'That is what a bystander does. You are in the group. You saw it. You said nothing. That is a choice, even when it does not feel like one.' },
      { type: 'bystander-info', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'But if I say something they will turn on me.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Maybe. What are the options? You can speak up in the group. You can message the person being targeted privately to let them know someone sees what is happening. You can report the post to the platform. You can tell a trusted adult. You do not have to be loud to break the silence. You just have to not be part of the wall.' },
      { type: 'narrator', bg: 'sunshare', text: 'Priya has gone quiet. You notice.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Priya. You have been in this position before - on the other side. You know what it is like to be the person people are talking about.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'Yes.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'So you know what it means when one person says something.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: '...It means you are not invisible. It means someone noticed. Even one person.' },
      { type: 'victim-info', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'Most people who contribute to something like this did not set out to cause harm. They went along with the group. They laughed at something that seemed minor. They did not think about the person on the other end of the screen. But every reaction, every share, every silence that reads as approval is a choice with a real effect on a real person. Understanding that is not about guilt. It is about what you choose next time.' },
      { type: 'cyberbullying-quiz', bg: 'sunshare' },
      { type: 'narrator', bg: 'sunshare', text: 'Nobody says anything for a moment. The square noise carries on around them. Screens scrolling. People posting. All that visibility.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'There are three positions in every situation like this. The person it is happening to. The person doing it. And everyone watching. All three have a choice. The choices look different. But they all matter.' },
      { type: 'all-positions-info', bg: 'sunshare' },
      { type: 'narrator', bg: 'sunshare', text: 'Sunshare Square is different by the time you are done. Not fixed - nobody fixes something like this completely in an afternoon. But the young people here know something they did not know before. They are checking their settings. They are talking about what they post and why. That matters.' },
      { type: 'narrator', bg: 'sunshare', text: 'Rosa leads you to a quiet spot at the edge of the square - away from the screens and the noise. She takes a small box from a bag over her shoulder.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'She left this with me. She said you would know what it is for.' },
      { type: 'prism-reveal', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Everything visible has a source. Like a footprint.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'Like a footprint. Like a trail. Everything you can see came from somewhere. And everything you share becomes visible to someone - the question is always, to whom, and what does it let them see?' },
      { type: 'prism-stored', bg: 'sunshare' },
      { type: 'narrator', bg: 'sunshare', text: 'A girl nearby catches Priya\'s eye - maybe thirteen, sitting alone on a bench, staring at her phone with the expression of someone who has just seen something they cannot unsee. Priya knows her vaguely. She nods toward her.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'That is Amara. Something happened to her last month. Someone used photos from her public profile to make fake images of her - images that looked real but were not - and sent them to people at school. She did not post those images. She never agreed to them. But they existed and people saw them.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'This is something that is happening more often. Images, audio, video - things that look completely real but were made by someone using AI tools, without the person\'s knowledge or consent. The person in the image did not choose to be there. But it looks like they did.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'And once it exists and has been seen, you cannot fully take it back.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'No. Which is why the most important things to know are: this is not the victim\'s fault, it is never acceptable regardless of what someone posted publicly, and telling a trusted adult immediately is the only right response - not trying to deal with it alone, not silence out of embarrassment.' },
      { type: 'deepfake-info', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'PRIYA', text: 'She tried to deal with it by herself for two weeks before she told anyone. Two weeks.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'The silence always makes it worse. Not because it is her fault - it is not. But because the people who can actually do something about it are the ones who do not know it is happening.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'One more thing. There is something you need to understand about what is ahead. The Observatory.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'The Observatory??' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'You have seen the Shadow Man twice now. Once at the lighthouse. Once here - at the edge of the square just before you arrived. He was watching. He has been building a picture of you the same way someone builds a picture of a person from their public posts. Piece by piece.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'What does he know about me?' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'Less than he wants to. Because you have been careful. Because the strongbox is locked. But he knows you are going to the Observatory. And he knows that Mira is there.' },
      { type: 'narrator', bg: 'sunshare', text: 'You look toward the edge of the square. A narrow gap between two stalls. Something stands in that gap - the wrong shape for a shadow, the wrong stillness for a person passing through. You watch the gap for five full seconds. Then someone walks past and when the view is clear again, the gap is empty.' },
      { type: 'shadow-glimpse', bg: 'sunshare' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'He was just there.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'He is always just there. That is his method.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'The Observatory is above the square - you will see it when you walk north. Mira is waiting. She has been waiting for a while.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'What is she like? Celia would not say much. You are being careful too.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'She is the reason the three of us do what we do. She understood something about the way these things work that most people only understand after they have been hurt by it. She wanted to make sure other people understood it first. That is what this whole journey has been.' },
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'And the Observatory is where she explains the rest.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'The Observatory is where you will see it all at once. Everything you have learned - it connects there. Mira will show you how.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'She left one clue at every stop. This is the last one. But first - the notebook. Fourth bookmark. She said to open it here.' },
      { type: 'notebook-page', bg: 'sunshare', heading: "From Mira's Notebook - On the Permanence of the Internet", lines: [
        'People talk about deleting things',
        'as though deletion is the end of the story.',
        '',
        'It is not.',
        'Deletion is the end of your copy.',
        'The internet may have kept others.',
        '',
        'A cached page.',
        'A screenshot taken before you removed it.',
        'A platform archive.',
        'An email someone forwarded',
        'before you thought to take it back.',
        '',
        'The better question is never:',
        '‘Can I delete this?’',
        '',
        'The better question is always:',
        '‘Am I comfortable with this',
        'existing permanently?’',
        '',
        'Ask that before you post.',
        'Not after.',
      ]},
      { type: 'dialogue', bg: 'sunshare', speaker: '[YOUR NAME]', text: 'Ask before. Not after.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'She says that is the hardest habit to build. Because in the moment of posting, everything feels temporary. It feels like you can always take it back. You usually can. But not always. And you cannot know in advance which posts will be the ones that stay.' },
      { type: 'dialogue', bg: 'sunshare', speaker: 'ROSA', text: 'She left one clue at every stop. This is the last one.' },
      { type: 'narrator', bg: 'sunshare', text: 'You open it. A card in Mira\'s writing - simpler than the previous riddles.' },
      { type: 'notebook-page', bg: 'sunshare', heading: "From Mira's Notebook - Mira's Final Clue", lines: [
        'No riddle this time.',
        'You have earned the address.',
        '',
        'Come north through the square.',
        'The Observatory is the building',
        'at the top of the hill',
        'with the dome and the open door.',
        '',
        'I am inside.',
        'I have been watching you',
        'the whole way.',
        '',
        'I am so proud of you.',
        'Come and find me.',
        '',
        '  -  M',
      ]},
      { type: 'narrator', bg: 'sunshare', text: 'No riddle. Just an address. And four words you have been waiting for since the photograph fell into your hands on a Saturday morning that feels like a different world now.\n\nI am so proud.' },
    ]
    const sbLine = SB_LINES[seabrightLine]
    const sbAtEnd = seabrightLine >= SB_LINES.length - 1
    const isNarrator = sbLine.type === 'narrator'
    const isPhoneEmail = sbLine.type === 'phone-email'
    const isPhoneInspect = sbLine.type === 'phone-inspect'
    const isUrlPreview = sbLine.type === 'url-preview'
    const isEmailRedflags = sbLine.type === 'email-redflags'
    const isPhishingInfo = sbLine.type === 'phishing-info'
    const isPhishingQuiz = sbLine.type === 'phishing-quiz'
    const isPhoneText = sbLine.type === 'phone-text'
    const isPublicProfile = sbLine.type === 'public-profile'
    const isSecurityQuestionsProfile = sbLine.type === 'security-questions-profile'
    const isSecurityQuestionInfo = sbLine.type === 'security-question-info'
    const isSecurityQuestionQuiz = sbLine.type === 'security-question-quiz'
    const isSecretKeepingInfo = sbLine.type === 'secret-keeping-info'
    const isVerificationInfo = sbLine.type === 'verification-info'
    const isOnlineTrustQuiz = sbLine.type === 'online-trust-quiz'
    const isOnlineTrustInfo = sbLine.type === 'online-trust-info'
    const isPasswordFixQuiz = sbLine.type === 'password-fix-quiz'
    const isLocationPinDemo = sbLine.type === 'location-pin-demo'
    const isEditBeforePostInstructions = sbLine.type === 'edit-before-post-instructions'
    const isEditBeforePostGame = sbLine.type === 'edit-before-post-game'
    const isBystanderInfo = sbLine.type === 'bystander-info'
    const isVictimInfo = sbLine.type === 'victim-info'
    const isCyberbullyingQuiz = sbLine.type === 'cyberbullying-quiz'
    const isAllPositionsInfo = sbLine.type === 'all-positions-info'
    const isPrismReveal = sbLine.type === 'prism-reveal'
    const isPrismStored = sbLine.type === 'prism-stored'
    const isDeepfakeInfo = sbLine.type === 'deepfake-info'
    const isShadowGlimpse = sbLine.type === 'shadow-glimpse'
    const isProfileFootprints = sbLine.type === 'profile-footprints'
    const isDigitalFootprintInfo = sbLine.type === 'digital-footprint-info'
    const isPrivacyQuiz = sbLine.type === 'privacy-quiz'
    const isPictureTestInstructions = sbLine.type === 'picture-test-instructions'
    const isPictureTestGame = sbLine.type === 'picture-test-game'
    const isFeelingsInfo = sbLine.type === 'feelings-info'
    const isCoralRedflags = sbLine.type === 'coral-redflags'
    const isTabletPopup = sbLine.type === 'tablet-popup'
    const isScamAdInfo = sbLine.type === 'scam-ad-info'
    const isTimerReset = sbLine.type === 'tablet-timer-reset'
    const isScamAdRedflags = sbLine.type === 'scam-ad-redflags'
    const isScamAdQuiz = sbLine.type === 'scam-ad-quiz'
    const isScammedInfo = sbLine.type === 'scammed-info'
    const isScammedSteps = sbLine.type === 'scammed-steps'
    const isMg2Instructions = sbLine.type === 'minigame2-instructions'
    const isMinigame2 = sbLine.type === 'minigame2'
    const isCompassReveal = sbLine.type === 'compass-reveal'
    const isAuntReveal = sbLine.type === 'aunt-reveal'
    const isNotebookReveal = sbLine.type === 'notebook-reveal'
    const isKnotReveal = sbLine.type === 'knot-reveal'
    const isNotebookPage = sbLine.type === 'notebook-page'
    const isStrongboxReveal = sbLine.type === 'strongbox-reveal'
    const isShadowReveal = sbLine.type === 'shadow-reveal'
    const isPasswordLessonLength = sbLine.type === 'password-lesson-length'
    const isPasswordLessonRandom = sbLine.type === 'password-lesson-random'
    const isPasswordLessonReuse = sbLine.type === 'password-lesson-reuse'
    const isPasswordLessonDomino = sbLine.type === 'password-lesson-domino'
    const isPasswordLessonManager = sbLine.type === 'password-lesson-manager'
    const isPasswordLesson = isPasswordLessonLength || isPasswordLessonRandom || isPasswordLessonReuse || isPasswordLessonDomino || isPasswordLessonManager
    const isPasswordMinigameInstructions = sbLine.type === 'password-minigame-instructions'
    const isPasswordMinigame = sbLine.type === 'password-minigame'
    const isStrongboxSeal = sbLine.type === 'strongbox-seal'
    const isShadowManInfo = sbLine.type === 'shadow-man-info'
    // SAQ dialogue step flags
    const isSaqADialogue = isScamAdQuiz && saqAnswer === 'A' && saqStep === 1
    const isSaqBDialogue = isScamAdQuiz && saqAnswer === 'B' && saqStep >= 1 && saqStep <= 3
    const isSaqBSafeMove = isScamAdQuiz && saqAnswer === 'B' && saqStep === 4
    const isSaqCDialogue = isScamAdQuiz && saqAnswer === 'C' && (saqStep === 1 || saqStep === 2)
    const showSaqOverlay = isScamAdQuiz && !isSaqADialogue && !isSaqBDialogue && !isSaqBSafeMove && !isSaqCDialogue
    const inSaqDialogue = isSaqADialogue || isSaqBDialogue || isSaqCDialogue
    const saqDialogueLine = isSaqADialogue
      ? { speaker: '[YOUR NAME]', text: 'That is not quite right - real companies do advertise competitions online. But real competitions exist on the company\'s own verified website. The test is not whether the ad exists. The test is whether the competition exists on the real website when you search for it yourself.' }
      : isSaqBDialogue
      ? saqStep === 1
        ? { speaker: '[YOUR NAME]', text: 'If SeaGear Marine are running a competition, it will be on seagearmarine.com. You can find that yourself. You do not need the ad to take you there. Going directly to the real website bypasses the scam entirely - because you are in control of where you go.' }
        : saqStep === 2
        ? { speaker: 'CORAL', text: 'So the ad becomes pointless if I just go to the real site myself.' }
        : { speaker: '[YOUR NAME]', text: 'Exactly. The ad\'s power is in directing you. When you choose your own direction, it loses that power.' }
      : isSaqCDialogue
      ? saqStep === 1
        ? { speaker: 'CORAL', text: 'The message that nearly tricked me had perfect grammar and looked completely professional. Scammers know how to make things look right. Appearance is not a reliable test.' }
        : { speaker: '[YOUR NAME]', text: 'Coral is right - the quality of the design means nothing. The address and the independent search are the only reliable tests.' }
      : null
    const advanceSAQ = () => {
      if (!saqAnswer) return
      const pathLen = SAQ_PATH_LENGTHS[saqAnswer]
      if (saqStep >= pathLen - 1) {
        if (saqAnswer === 'B') { playClick(); setSeabrightLine(l => l + 1) }
        else { setSaqAnswer(null); setSaqStep(0) }
      } else { setSaqStep(s => s + 1) }
    }
    // Carol quiz (branching)
    const isCarolQuiz = sbLine.type === 'bram-quiz'
    const isBqADialogue = isCarolQuiz && bqAnswer === 'A' && (bqStep === 1 || bqStep === 2)
    const isBqBDialogue = isCarolQuiz && bqAnswer === 'B' && bqStep >= 1 && bqStep <= 3
    const isBqBSafeMove = isCarolQuiz && bqAnswer === 'B' && bqStep === 4
    const isBqCDialogue = isCarolQuiz && bqAnswer === 'C' && (bqStep === 1 || bqStep === 2)
    const showBqOverlay = isCarolQuiz && !isBqADialogue && !isBqBDialogue && !isBqBSafeMove && !isBqCDialogue
    const inBqDialogue = isBqADialogue || isBqBDialogue || isBqCDialogue
    const bqDialogueLine = isBqADialogue
      ? bqStep === 1
        ? { speaker: 'OLD FINN', text: 'That is not a helpful thing to say.' }
        : { speaker: '[YOUR NAME]', text: 'You are right. I am sorry, Coral. Age and experience do not protect you from scams - they are designed to work on everyone. What matters now is acting quickly.' }
      : isBqBDialogue
      ? bqStep === 1
        ? { speaker: 'CORAL', text: 'I know. I know I should have said something. I just thought - I am a grown woman, how do I explain that I fell for something like this?' }
        : bqStep === 2
        ? { speaker: '[YOUR NAME]', text: 'Because it was not stupidity. It was a trap set by professionals. And right now, someone has been in your account for three days changing things. Every hour you wait is another hour they have access. Telling someone today matters.' }
        : { speaker: 'CORAL', text: '...Alright. I will tell my parents.' }
      : isBqCDialogue
      ? bqStep === 1
        ? { speaker: 'CORAL', text: 'It is not too late. We can still lock the compromised account, change the password, and check what was changed. Three days makes it harder but not impossible.' }
        : { speaker: '[YOUR NAME]', text: 'Coral is right. Acting now is always better than not acting. Even if some damage has been done, stopping it from continuing is still worthwhile.' }
      : null
    const advanceBQ = () => {
      if (!bqAnswer) return
      const pathLen = BQ_PATH_LENGTHS[bqAnswer]
      if (bqStep >= pathLen - 1) {
        if (bqAnswer === 'B') { playClick(); setSeabrightLine(l => l + 1) }
        else { setBqAnswer(null); setBqStep(0) }
      } else { setBqStep(s => s + 1) }
    }
    // Privacy settings quiz (branching)
    const isPqADialogue = isPrivacyQuiz && pqAnswer === 'A' && pqStep === 1
    const isPqBDialogue = isPrivacyQuiz && pqAnswer === 'B' && (pqStep === 1 || pqStep === 2)
    const isPqCDialogue = isPrivacyQuiz && pqAnswer === 'C' && pqStep === 1
    const isPqCSafeMove = isPrivacyQuiz && pqAnswer === 'C' && pqStep === 2
    const showPqOverlay = isPrivacyQuiz && !isPqADialogue && !isPqBDialogue && !isPqCDialogue && !isPqCSafeMove
    const inPqDialogue = isPqADialogue || isPqBDialogue || isPqCDialogue
    const pqDialogueLine = isPqADialogue
      ? { speaker: 'ROSA', text: 'That is not the lesson. The lesson is not to go silent - it is to share deliberately. Priya should be able to post. She should just know what she is sharing and to whom.' }
      : isPqBDialogue
      ? pqStep === 1
        ? { speaker: '[YOUR NAME]', text: 'Making the account private is the right first step. But it is also worth thinking about what you post even to people you have approved - not everything needs to be shared with a hundred followers, even if you know them.' }
        : { speaker: 'ROSA', text: 'Good. Privacy settings are the lock on the door. But it is also worth thinking about what you put in the room.' }
      : isPqCDialogue
      ? { speaker: 'ROSA', text: 'Yes. The goal is deliberate sharing. You choose what goes where and who can see it. That is control - not silence.' }
      : null
    const advancePQ = () => {
      if (!pqAnswer) return
      const pathLen = PQ_PATH_LENGTHS[pqAnswer]
      if (pqStep >= pathLen - 1) {
        if (pqAnswer === 'C') { playClick(); setSeabrightLine(l => l + 1) }
        else { setPqAnswer(null); setPqStep(0) }
      } else { setPqStep(s => s + 1) }
    }
    // Security question quiz (branching)
    const isSqADialogue = isSecurityQuestionQuiz && sqAnswer === 'A' && (sqStep === 1 || sqStep === 2)
    const isSqBDialogue = isSecurityQuestionQuiz && sqAnswer === 'B' && (sqStep === 1 || sqStep === 2)
    const isSqCDialogue = isSecurityQuestionQuiz && sqAnswer === 'C' && sqStep === 1
    const isSqBSafeMove = isSecurityQuestionQuiz && sqAnswer === 'B' && sqStep === 3
    const showSqOverlay = isSecurityQuestionQuiz && !isSqADialogue && !isSqBDialogue && !isSqCDialogue && !isSqBSafeMove
    const inSqDialogue = isSqADialogue || isSqBDialogue || isSqCDialogue
    const sqDialogueLine = isSqADialogue
      ? sqStep === 1
        ? { speaker: 'ROSA', text: 'It was not a guess. They did not need to know the original password at all.' }
        : { speaker: '[YOUR NAME]', text: 'The \'forgot my password\' function is how they got in. You do not need the original password if you can answer the security questions. The questions were the door, not the password.' }
      : isSqBDialogue
      ? sqStep === 1
        ? { speaker: 'PRIYA', text: 'So they never needed my password. They just clicked \'forgot password\', answered the three questions using information from my profile, and got straight in?' }
        : { speaker: '[YOUR NAME]', text: 'Exactly. The password was never the weak point. The security questions were.' }
      : isSqCDialogue
      ? { speaker: 'ROSA', text: 'He does not need device access when the answers to three security questions are sitting publicly on the profile. The whole thing was done remotely, from the information Priya had already made visible.' }
      : null
    const advanceSQ = () => {
      if (!sqAnswer) return
      const pathLen = SQ_PATH_LENGTHS[sqAnswer]
      if (sqStep >= pathLen - 1) {
        if (sqAnswer === 'B') { playClick(); setSeabrightLine(l => l + 1) }
        else { setSqAnswer(null); setSqStep(0) }
      } else { setSqStep(s => s + 1) }
    }
    // Online trust quiz (branching, C is partial → also advances)
    const isOqADialogue = isOnlineTrustQuiz && oqAnswer === 'A' && oqStep === 1
    const isOqBDialogue = isOnlineTrustQuiz && oqAnswer === 'B' && oqStep === 1
    const isOqCDialogue = isOnlineTrustQuiz && oqAnswer === 'C' && oqStep === 1
    const isOqBSafeMove = isOnlineTrustQuiz && oqAnswer === 'B' && oqStep === 2
    const showOqOverlay = isOnlineTrustQuiz && !isOqADialogue && !isOqBDialogue && !isOqCDialogue && !isOqBSafeMove
    const inOqDialogue = isOqADialogue || isOqBDialogue || isOqCDialogue
    const oqDialogueLine = isOqADialogue
      ? { speaker: 'ROSA', text: 'Blocking without telling anyone means the discomfort goes away - but nobody knows it happened. If this person is approaching other children the same way, reporting it matters.' }
      : isOqBDialogue
      ? { speaker: '[YOUR NAME]', text: 'Tell a trusted adult first - not because something is definitely wrong, but because this is exactly the kind of situation where another perspective helps. You do not have to accuse anyone. You just share what happened and let someone who cares about you help you decide. If you are wrong about the person, the only cost is a conversation with your parent. That is a very good trade.' }
      : isOqCDialogue
      ? { speaker: 'ROSA', text: 'Staying on the current app is sensible. But it still means nobody who cares about Priya knows what happened - and it does not protect anyone else this person might be approaching. Telling a trusted adult is still the right first step.' }
      : null
    const advanceOQ = () => {
      if (!oqAnswer) return
      const pathLen = OQ_PATH_LENGTHS[oqAnswer]
      if (oqStep >= pathLen - 1) {
        if (oqAnswer === 'B' || oqAnswer === 'C') { playClick(); setSeabrightLine(l => l + 1) }
        else { setOqAnswer(null); setOqStep(0) }
      } else { setOqStep(s => s + 1) }
    }
    // Password fix order quiz (branching)
    const isFqADialogue = isPasswordFixQuiz && fqAnswer === 'A' && fqStep === 1
    const isFqBDialogue = isPasswordFixQuiz && fqAnswer === 'B' && fqStep === 1
    const isFqCDialogue = isPasswordFixQuiz && fqAnswer === 'C' && fqStep === 1
    const isFqBSafeMove = isPasswordFixQuiz && fqAnswer === 'B' && fqStep === 2
    const showFqOverlay = isPasswordFixQuiz && !isFqADialogue && !isFqBDialogue && !isFqCDialogue && !isFqBSafeMove
    const inFqDialogue = isFqADialogue || isFqBDialogue || isFqCDialogue
    const fqDialogueLine = isFqADialogue
      ? { speaker: 'ROSA', text: 'The email is the master key. If they have the email, they can reset every other account - including the gaming account she just changed. Email has to come first.' }
      : isFqBDialogue
      ? { speaker: '[YOUR NAME]', text: 'Email first because it controls everything. Once email is secured with a new, unique password, no other account can be reset without it. Then change everything else. Then get a password manager so this cannot happen again.' }
      : isFqCDialogue
      ? { speaker: 'ROSA', text: 'Setting up the password manager is smart - but if the attacker still has email access while you are doing it, they can reset accounts faster than you can change them. Email comes first.' }
      : null
    const advanceFQ = () => {
      if (!fqAnswer) return
      const pathLen = FQ_PATH_LENGTHS[fqAnswer]
      if (fqStep >= pathLen - 1) {
        if (fqAnswer === 'B' || fqAnswer === 'C') { playClick(); setSeabrightLine(l => l + 1) }
        else { setFqAnswer(null); setFqStep(0) }
      } else { setFqStep(s => s + 1) }
    }
    // Cyberbullying / bystander-perpetrator-victim quiz
    const isCyqADialogue = isCyberbullyingQuiz && cyqAnswer === 'A' && cyqStep === 1
    const isCyqBDialogue = isCyberbullyingQuiz && cyqAnswer === 'B' && (cyqStep === 1 || cyqStep === 2)
    const isCyqCDialogue = isCyberbullyingQuiz && cyqAnswer === 'C' && cyqStep === 1
    const isCyqBSafeMove = isCyberbullyingQuiz && cyqAnswer === 'B' && cyqStep === 3
    const showCyqOverlay = isCyberbullyingQuiz && !isCyqADialogue && !isCyqBDialogue && !isCyqCDialogue && !isCyqBSafeMove
    const inCyqDialogue = isCyqADialogue || isCyqBDialogue || isCyqCDialogue
    const cyqDialogueLine = isCyqADialogue
      ? { speaker: 'ROSA', text: 'That is not useful. And it is not accurate. People make choices that cause harm without meaning to cause harm - especially at this age, when the line between jokes and cruelty is not always clear and the group makes it feel normal. What matters is whether they understand the effect and what they choose next.' }
      : isCyqBDialogue
      ? cyqStep === 1
        ? { speaker: 'PRIYA', text: 'What do I do next?' }
        : { speaker: '[YOUR NAME]', text: 'You cannot undo what happened. But you can decide not to do it again. And you can be the person who speaks up in the next group where it starts. Not because you are brave - because you know what it costs the person on the other end. You know now. That changes what you can choose.' }
      : isCyqCDialogue
      ? { speaker: 'PRIYA', text: 'It always matters to the person it is about.' }
      : null
    const advanceCYQ = () => {
      if (!cyqAnswer) return
      const pathLen = CYQ_PATH_LENGTHS[cyqAnswer]
      if (cyqStep >= pathLen - 1) {
        if (cyqAnswer === 'B') { playClick(); setSeabrightLine(l => l + 1) }
        else { setCyqAnswer(null); setCyqStep(0) }
      } else { setCyqStep(s => s + 1) }
    }
    // Path A steps 1-2, B steps 1-3, and C steps 1-2 exit the quiz panel and render as dialogue bubbles
    const isQuizADialogue = isPhishingQuiz && sbQuizAnswer === 'A' && (sbQuizStep === 1 || sbQuizStep === 2)
    const isQuizBDialogue = isPhishingQuiz && sbQuizAnswer === 'B' && sbQuizStep >= 1 && sbQuizStep <= 3
    const isQuizCDialogue = isPhishingQuiz && sbQuizAnswer === 'C' && (sbQuizStep === 1 || sbQuizStep === 2)
    const isQuizAInfoCard = isPhishingQuiz && sbQuizAnswer === 'A' && sbQuizStep === 3
    const showQuizOverlay = isPhishingQuiz && !isQuizADialogue && !isQuizBDialogue && !isQuizCDialogue && !isQuizAInfoCard
    const inQuizDialogue = isQuizADialogue || isQuizBDialogue || isQuizCDialogue
    const quizDialogueLine = isQuizADialogue
      ? sbQuizStep === 1
        ? { speaker: 'OLD FINN', text: 'That is exactly what I did. The page looked completely real.' }
        : { speaker: '[YOUR NAME]', text: 'Right - so even when the page looks right, the address bar tells the truth. Always look at the address bar before typing anything.' }
      : isQuizBDialogue
      ? sbQuizStep === 1
        ? { speaker: '[YOUR NAME]', text: 'There it is. The real sender address is not the NMC. The real link does not go to the official website. Two checks, five seconds, and the whole trick falls apart.' }
        : sbQuizStep === 2
        ? { speaker: 'OLD FINN', text: 'If I had done that two days ago...' }
        : { speaker: '[YOUR NAME]', text: 'You know now. And knowing now means it will not work on you again.' }
      : isQuizCDialogue
      ? sbQuizStep === 1
        ? { speaker: '[YOUR NAME]', text: 'Deleting it is safe - but it does not teach you anything for next time. What if the next scam looks slightly different? If you practice checking the address and the link, you build a skill. Deleting without looking is safe once. Checking teaches you forever.' }
        : { speaker: 'OLD FINN', text: 'She said something like that too. That knowing why something is wrong is more valuable than just avoiding it.' }
      : null
    const sbInspectDone = sbInspected.sender && sbInspected.link
    const advanceSB = () => {
      if (isPhoneInspect && !sbInspectDone) return
      if (isUrlPreview && !urlRevealed) return
      if (seabrightLine >= SB_LINES_COUNT - 1) {
        goToChapter({ number: 'V', title: 'At the Edge of the Sky' }, 'observatory')
        return
      }
      const nextIdx = seabrightLine + 1
      if (nextIdx === 113) {
        playClick()
        goToChapter({ number: 'III', title: 'Into The Lighthouse' }, 'seabright-113')
        return
      }
      if (nextIdx === 176) {
        playClick()
        goToChapter({ number: 'IV', title: 'Echoes in the Sunshare Square' }, 'seabright-176')
        return
      }
      const nextLine = SB_LINES[nextIdx]
      const nextType = nextLine?.type
      if (nextType === 'phone-email' || nextType === 'phone-inspect' || nextType === 'phone-text' || nextType === 'public-profile') playPhoneBuzz()
      else if (nextType === 'email-redflags' || nextType === 'phishing-info' || nextType === 'feelings-info' || nextType === 'coral-redflags' || nextType === 'phishing-quiz' || nextType === 'coral-quiz' || nextType === 'scam-ad-quiz' || nextType === 'scammed-info' || nextType === 'scammed-steps' || nextType === 'bram-quiz') playCardIn()
      else playClick()
      setSeabrightLine(l => l + 1)
    }
    const handleUrlHoldStart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (urlRevealed) return
      if (e.pointerId != null) e.target.setPointerCapture(e.pointerId)
      setUrlHolding(true)
      urlHoldTimerRef.current = setTimeout(() => {
        setUrlRevealed(true)
        setUrlHolding(false)
        playReveal()
      }, 700)
    }
    const handleUrlHoldEnd = (e) => {
      e.stopPropagation()
      if (urlHoldTimerRef.current) {
        clearTimeout(urlHoldTimerRef.current)
        urlHoldTimerRef.current = null
      }
      setUrlHolding(false)
    }
    // Quiz path advance
    const advanceQuizStep = () => {
      if (!sbQuizAnswer) return
      if (sbQuizAnswer === 'B' && sbQuizStep === 0 && !(sbQuizBReveals.sender && sbQuizBReveals.link)) return
      const pathLen = SB_QUIZ_PATH_LENGTHS[sbQuizAnswer]
      if (sbQuizStep >= pathLen - 1) {
        if (sbQuizAnswer === 'B') {
          playClick()
          setSeabrightLine(l => l + 1)
        } else {
          // Wrong/partial answer - loop back to the question
          playCardIn()
          setSbQuizAnswer(null)
          setSbQuizStep(0)
        }
      } else {
        playClick()
        setSbQuizStep(s => s + 1)
      }
    }
    const isRealOrFake = sbLine.type === 'real-or-fake'
    // Coral quiz
    const isCoralQuiz = sbLine.type === 'coral-quiz'
    // A step 1: CORAL dialogue; B steps 1-2: [YOUR NAME]+CAROL dialogues; C step 1: [YOUR NAME] dialogue
    const isCqADialogue = isCoralQuiz && cqAnswer === 'A' && cqStep === 1
    const isCqBDialogue = isCoralQuiz && cqAnswer === 'B' && (cqStep === 1 || cqStep === 2)
    const isCqCDialogue = isCoralQuiz && cqAnswer === 'C' && cqStep === 1
    const isCqBRemember = isCoralQuiz && cqAnswer === 'B' && cqStep === 3
    const showCqOverlay = isCoralQuiz && !isCqADialogue && !isCqBDialogue && !isCqCDialogue && !isCqBRemember
    const inCqDialogue = isCqADialogue || isCqBDialogue || isCqCDialogue
    const cqDialogueLine = isCqADialogue
      ? { speaker: 'CORAL', text: 'That is what I nearly did. Responding to everything just in case is exactly what the scammers want. They only need one person out of a hundred to respond. The safer habit is to always verify through a channel you trust - not the one the message gives you.' }
      : isCqBDialogue
      ? cqStep === 1
        ? { speaker: '[YOUR NAME]', text: 'If you are ever genuinely worried that something is a real emergency, you call the coastguard yourself. On a number you already have saved or that you find on the official website. Not by replying to the message that told you there was an emergency. That way, if it is real, help is on the way. If it was fake, you have given them nothing.' }
        : { speaker: 'CORAL', text: '...That actually makes sense.' }
      : isCqCDialogue
      ? { speaker: '[YOUR NAME]', text: 'Asking an adult is always a good move - but it helps to understand why too, so you can make the call yourself when no adult is around. The rule is: verify the concern through a channel you found yourself, not one the message gave you.' }
      : null
    const advanceCQ = () => {
      if (!cqAnswer) return
      const pathLen = CQ_PATH_LENGTHS[cqAnswer]
      if (cqStep >= pathLen - 1) {
        if (cqAnswer === 'B') { playClick(); setSeabrightLine(l => l + 1) }
        else { playCardIn(); setCqAnswer(null); setCqStep(0) }
      } else {
        playClick()
        setCqStep(s => s + 1)
      }
    }
    // Quiz path B: hold-to-reveal sender
    const handleQBSenderStart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (sbQuizBReveals.sender) return
      if (e.pointerId != null) e.target.setPointerCapture(e.pointerId)
      setSbQuizBHolding(p => ({ ...p, sender: true }))
      sbQuizBSenderTimer.current = setTimeout(() => {
        setSbQuizBReveals(p => ({ ...p, sender: true }))
        setSbQuizBHolding(p => ({ ...p, sender: false }))
        playReveal()
      }, 700)
    }
    const handleQBSenderEnd = (e) => {
      e.stopPropagation()
      if (sbQuizBSenderTimer.current) { clearTimeout(sbQuizBSenderTimer.current); sbQuizBSenderTimer.current = null }
      setSbQuizBHolding(p => ({ ...p, sender: false }))
    }
    // Quiz path B: hold-to-reveal link
    const handleQBLinkStart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (sbQuizBReveals.link) return
      if (e.pointerId != null) e.target.setPointerCapture(e.pointerId)
      setSbQuizBHolding(p => ({ ...p, link: true }))
      sbQuizBLinkTimer.current = setTimeout(() => {
        setSbQuizBReveals(p => ({ ...p, link: true }))
        setSbQuizBHolding(p => ({ ...p, link: false }))
        playReveal()
      }, 700)
    }
    const handleQBLinkEnd = (e) => {
      e.stopPropagation()
      if (sbQuizBLinkTimer.current) { clearTimeout(sbQuizBLinkTimer.current); sbQuizBLinkTimer.current = null }
      setSbQuizBHolding(p => ({ ...p, link: false }))
    }
    const goBackSB = () => { playBack(); setSeabrightLine(l => Math.max(0, l - 1)) }
    // Rosa - present throughout Sunshare Square; expressions shift per section
    const rosaSectionActive = sbLine.bg === 'sunshare' && seabrightLine >= 177 && sbLine.type === 'dialogue'
    const rosaSpeaking = (rosaSectionActive && sbLine.type === 'dialogue' && (sbLine.speaker === 'ROSA' || sbLine.speaker === '???'))
      || (inPqDialogue && pqDialogueLine?.speaker === 'ROSA')
      || (inSqDialogue && sqDialogueLine?.speaker === 'ROSA')
      || (inOqDialogue && oqDialogueLine?.speaker === 'ROSA')
      || (inFqDialogue && fqDialogueLine?.speaker === 'ROSA')
      || (inCyqDialogue && cyqDialogueLine?.speaker === 'ROSA')
    const rosaImage = (() => {
      if (seabrightLine >= 183) return aunt2             // final directive - composed
      if (seabrightLine >= 181) return aunt2Thinking     // name reveal + contrast with Celia
      return aunt2Left                                   // arrival / mysterious ???
    })()
    const showPriya = (sbLine.type === 'dialogue' && sbLine.speaker === 'PRIYA')
      || (inSqDialogue && sqDialogueLine?.speaker === 'PRIYA')
      || (inCyqDialogue && cyqDialogueLine?.speaker === 'PRIYA')
    const priyaSectionActive = (
      (seabrightLine >= 184 && seabrightLine <= 195) ||
      (seabrightLine >= 204 && seabrightLine <= 290)
    ) && sbLine.type === 'dialogue'
    const priyaImage = sbLine.text?.includes('what happened') || sbLine.text?.includes('Someone else') || sbLine.text?.includes('normal things')
      ? priyaUnhappy
      : priyaHappy
    const showFinn = (sbLine.type === 'dialogue' && sbLine.speaker === 'OLD FINN')
      || (inQuizDialogue && quizDialogueLine?.speaker === 'OLD FINN')
      || (inCqDialogue && cqDialogueLine?.speaker === 'OLD FINN')
      || (inSaqDialogue && saqDialogueLine?.speaker === 'OLD FINN')
      || (inBqDialogue && bqDialogueLine?.speaker === 'OLD FINN')
    // Sections where Old Finn is physically present but not necessarily speaking (hidden during narration)
    const finnSectionActive = sbLine.type !== 'narrator' && (
      (seabrightLine >= 3 && seabrightLine <= 29)
      || (seabrightLine >= 44 && seabrightLine <= 52)
      || (seabrightLine >= 88 && seabrightLine <= 111)
    )
    // Coral stays visible (dimmed) during conversational lines; hidden during info cards, quiz overlays, and narration
    const CORAL_HIDDEN_TYPES = ['narrator', 'coral-redflags', 'coral-quiz',
      'tablet-popup', 'scam-ad-info', 'tablet-timer-reset', 'scam-ad-redflags',
      'scam-ad-quiz', 'scammed-info', 'scammed-steps']
    const coralSectionActive = (
      (seabrightLine >= 38 && seabrightLine <= 43)    // "URGENT in capitals" back-and-forth
      || (seabrightLine >= 51 && seabrightLine <= 88)  // tablet/scam/confession section
      || (seabrightLine === 89 && inBqDialogue)        // bram-quiz dialogue bubbles only (not overlay or safe-move card)
    ) && !CORAL_HIDDEN_TYPES.includes(sbLine.type)
    const showCoral = (sbLine.type === 'dialogue' && sbLine.speaker === 'CORAL')
      || (inQuizDialogue && quizDialogueLine?.speaker === 'CORAL')
      || (inCqDialogue && cqDialogueLine?.speaker === 'CORAL')
      || (inSaqDialogue && saqDialogueLine?.speaker === 'CORAL')
      || (inBqDialogue && bqDialogueLine?.speaker === 'CORAL')
    // Celia - present from lighthouse-door onwards; speaking lifts/brightens, silent dims
    const celiaSectionActive = sbLine.bg === 'lighthouse-door' || sbLine.bg === 'lighthouse-int'
    const celiaSpeaking = celiaSectionActive && !isAuntReveal && sbLine.type === 'dialogue' && sbLine.speaker === 'CELIA'
    const celiaImage = (() => {
      if (seabrightLine >= 171) return aunt3          // lighthouse door farewell (composed)
      if (seabrightLine >= 165) return aunt3Thinking // envelope + riddle section (lighter)
      if (seabrightLine >= 157) return aunt3         // Shadow Man discussion (serious/direct)
      if (seabrightLine >= 131) return aunt3Left     // looking at items / notebook
      if (seabrightLine === 130) return aunt3Upset   // handing over Mira's belongings
      if (seabrightLine >= 127) return aunt3Thinking // mysterious hint + narrator beats
      if (seabrightLine >= 125) return aunt3         // wry / amused about Mira
      if (seabrightLine >= 122) return aunt3Thinking // sisters discussion
      return sbLine.speaker === 'CELIA' ? aunt3Thinking : aunt3
    })()
    // Show Old Finn's phone in background during dialogues between phone-email and phishing-info
    const phoneFirstShown = SB_LINES.findIndex(l => l.type === 'phone-email')
    const phoneLastShown = SB_LINES.findIndex(l => l.type === 'phishing-info')
    const showPhoneBg = sbLine.type === 'dialogue' && seabrightLine > phoneFirstShown && seabrightLine < phoneLastShown
    // Show Coral's text message in background during dialogues after phone-text, up to (not including) the minigame
    const coralPhoneIdx = SB_LINES.findIndex(l => l.type === 'phone-text')
    const realOrFakeIdx = SB_LINES.findIndex(l => l.type === 'real-or-fake')
    const showCoralPhoneBg = sbLine.type === 'dialogue' && seabrightLine > coralPhoneIdx && seabrightLine < realOrFakeIdx
    const pastSBNarrator = SB_LINES
      .slice(0, seabrightLine)
      .map((l, i) => ({ ...l, origIdx: i }))
      .filter(l => l.type === 'narrator')
      .slice(-3)
    return (
      <div
        className="game-root seabright-root"
        style={{ backgroundImage: `url(${sbLine.bg === 'sunshare' ? sunshareSquare : sbLine.bg === 'lighthouse-int' ? lighthouseInt : sbLine.bg === 'lighthouse-door' ? lighthouseDoor : sbLine.bg === 'lighthouse' ? lighthouseExt : seabrightHarbour})` }}
      >
        <div className="seabright-stage" onClick={
          isNarrator ? advanceSB
          // Partial-UI overlays (phone/tablet don't cover the full stage - stage click acts as fallback)
          : (isPhoneEmail || isPhoneInspect || isPhoneText || isPublicProfile || isTabletPopup || (isTimerReset && timerResetPhase === 'reset')) ? advanceSB
          // Full-screen overlays (smishing-info-overlay is inset:0 and handles its own onClick -
          // do NOT duplicate here or the click fires the advance twice via event bubbling)
          : isSaqBSafeMove ? undefined
          : isBqBSafeMove ? undefined
          : isPqCSafeMove ? undefined
          : isSqBSafeMove ? undefined
          : isOqBSafeMove ? undefined
          : isFqBSafeMove ? undefined
          : isQuizAInfoCard ? advanceQuizStep
          : isCqBRemember ? advanceCQ
          : undefined
        } style={(showQuizOverlay || showCqOverlay || showSaqOverlay || showBqOverlay || showPqOverlay || showSqOverlay || showOqOverlay || showFqOverlay || showCyqOverlay) ? { cursor: 'default' } : undefined}>
          {/* Phone visible in background during post-email dialogues */}
          {showPhoneBg && (
            <div className="sb-phone-wrap sb-phone-wrap--bg">
              <div className="sb-phone-frame">
                <img src={phoneOrange} alt="" className="sb-phone-img" aria-hidden="true" />
                <div className="sb-phone-screen">
                  <div className="sb-email">
                    <div className="sb-email-header">EMAIL MESSAGE</div>
                    <div className="sb-email-from">
                      <span className="sb-email-label">From:</span> Seabright Harbour Authority<br />
                      <span className="sb-email-address">&lt;harbour.admin@seabright-port-renewal.com&gt;</span>
                    </div>
                    <div className="sb-email-body">
                      <span className="sb-email-urgent">URGENT:</span> Your harbour access registration expires in <strong>24 HOURS</strong>. You must verify your account immediately or your fishing licence will be suspended.
                    </div>
                    <div className="sb-email-link">
                      Click here to renew:<br />
                      <span className="sb-email-url">www.seabright-port-renewal.com/verify</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Coral's text message visible in background during her dialogues */}
          {showCoralPhoneBg && (
            <div className="sb-phone-wrap sb-phone-wrap--bg">
              <div className="sb-phone-frame">
                <img src={phoneOrange} alt="" className="sb-phone-img" aria-hidden="true" />
                <div className="sb-phone-screen">
                  <div className="sb-sms">
                    <div className="sb-sms-header">TEXT MESSAGE</div>
                    <div className="sb-sms-sender">COASTGUARD EMERGENCY SERVICES</div>
                    <div className="sb-sms-bubble">
                      <span className="sb-sms-urgent">URGENT SAFETY ALERT:</span> A vessel registered to your crew has triggered an emergency beacon. You must verify your crew identity <span className="sb-sms-key">CODE</span> within <span className="sb-sms-key">15 minutes</span> to authorise emergency response. Reply with your crew access code NOW. Failure to respond may delay rescue operations.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Old Finn character - stays visible (dimmed) when in scene but not speaking */}
          {(showFinn || finnSectionActive) && (
            <img src={oldFinn} alt="Old Finn" className={`seabright-finn${!showFinn ? ' seabright-finn--silent' : ''}`} />
          )}

          {/* Coral character - stays visible (dimmed) when in scene but not speaking */}
          {(showCoral || coralSectionActive) && (
            <img src={coralImg} alt="Coral" className={`seabright-coral${!showCoral ? ' seabright-coral--silent' : ''}`} />
          )}

          {/* Priya character - stays visible (dimmed) during dialogue scenes in her section */}
          {(showPriya || priyaSectionActive) && (
            <img src={priyaImage} alt="Priya" className={`seabright-priya${!showPriya ? ' seabright-priya--silent' : ''}`} />
          )}

          {/* Celia character - stays present throughout lighthouse door + interior, dims when silent */}
          {celiaSectionActive && !isAuntReveal && seabrightLine >= 118 && (
            <div className={`seabright-celia-wrap${celiaSpeaking ? ' seabright-celia-wrap--speaking' : ' seabright-celia-wrap--silent'}`}>
              <img src={celiaImage} alt="Celia" className="seabright-celia-img" />
            </div>
          )}

          {/* Rosa character - right side, present throughout Sunshare Square */}
          {rosaSectionActive && (
            <div className={`seabright-rosa-wrap${rosaSpeaking ? ' seabright-rosa-wrap--speaking' : ' seabright-rosa-wrap--silent'}`}>
              <img src={rosaImage} alt="Rosa" className="seabright-rosa-img" />
            </div>
          )}

          {/* Priya public profile - blue phone screen beside the bench */}
          {isPublicProfile && (
            <div className="sb-phone-wrap" onClick={advanceSB}>
              <div className="sb-phone-frame sb-phone-frame--blue">
                <img src={phoneBlue} alt="" className="sb-phone-img" aria-hidden="true" />
                <div className="sb-phone-screen sb-phone-screen--profile">
                  <div className="sb-profile">
                    <div className="sb-profile-kicker">PUBLIC PROFILE</div>
                    <div className="sb-profile-title">Priya</div>
                    <div className="sb-profile-subtitle">Public Profile (visible to anyone)</div>
                    <p className="sb-profile-warning">Everything below is visible to anyone on the internet.</p>
                    <div className="sb-profile-list">
                      <div><span>Name:</span> Priya</div>
                      <div><span>School:</span> Sunshare Academy (tagged in profile)</div>
                      <div><span>Bio:</span> Year 9 at Sunshare Academy. Football team captain. Loves art and horror films.</div>
                      <div><span>Recent post:</span> "Finally finished my art project!! My teacher Mrs Okafor is going to love it lol"</div>
                      <div><span>Recent post:</span> "Last day of term tomorrow then two weeks off!! Counting down"</div>
                      <div><span>Recent post:</span> "Anyone at Sunshare wanna come to the match on Saturday 2pm? Tag your friends!"</div>
                      <div><span>Recent photo:</span> Priya at a football pitch with her school badge visible on her kit.</div>
                      <div><span>Recent photo:</span> Priya outside her house, house number partially visible.</div>
                      <div><span>Location tag:</span> Sunshare Square on three recent posts.</div>
                      <div><span>Friend tagged:</span> "Thanks @JayJay12 for the lift home"</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-phone-hint">tap to continue</div>
            </div>
          )}

          {/* Security questions profile - same profile with security question answers highlighted */}
          {isSecurityQuestionsProfile && (
            <div className="sb-phone-wrap" onClick={advanceSB}>
              <div className="sb-phone-frame sb-phone-frame--blue">
                <img src={phoneBlue} alt="" className="sb-phone-img" aria-hidden="true" />
                <div className="sb-phone-screen sb-phone-screen--profile">
                  <div className="sb-profile">
                    <div className="sb-profile-kicker">PUBLIC PROFILE</div>
                    <div className="sb-profile-title">Priya</div>
                    <div className="sb-profile-subtitle">Public Profile (visible to anyone)</div>
                    <p className="sb-profile-warning">Everything below is visible to anyone on the internet.</p>
                    <div className="sb-profile-list">
                      <div className="sb-profile-row--flagged">
                        <span className="sb-profile-flag-label">SECURITY Q: favourite team</span>
                        <span>Bio:</span> Huge Arsenal fan. Minecraft and FIFA addict. @Sunshare_Academy Year 7.
                      </div>
                      <div className="sb-profile-row--flagged">
                        <span className="sb-profile-flag-label">SECURITY Q: primary school</span>
                        <span>Post:</span> "Miss my old primary school so much - Millbank Primary was the best"
                      </div>
                      <div className="sb-profile-row--flagged">
                        <span className="sb-profile-flag-label">SECURITY Q: first pet</span>
                        <span>Post:</span> "Happy birthday to my dog Rocket!! 4 years old today good boy"
                      </div>
                      <div><span>Post:</span> "Anyone else think Arsenal were robbed tonight???"</div>
                      <div><span>Post:</span> "New FIFA record broken!!! Username JayJay12 if anyone wants a match"</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-phone-hint">tap to continue</div>
            </div>
          )}

          {/* Public profile footprint analysis */}
          {isProfileFootprints && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags profile-footprints-grid">
                  <div className="smishing-flag-card profile-footprint-card">
                    <div className="smishing-flag-label">SCHOOL NAME</div>
                    <div className="smishing-flag-title">FOOTPRINT FOUND</div>
                    <p className="smishing-flag-body"><strong>Sunshare Academy</strong>, tagged in profile and mentioned in a post. Anyone who wants to impersonate Priya now knows where she goes to school. They can mention it casually in a fake message to make it sound real.</p>
                  </div>
                  <div className="smishing-flag-card profile-footprint-card">
                    <div className="smishing-flag-label">TEACHER'S NAME</div>
                    <div className="smishing-flag-title">FOOTPRINT FOUND</div>
                    <p className="smishing-flag-body"><strong>"My teacher Mrs Okafor"</strong> mentioned in a post. A stranger now knows the name of Priya's teacher. In a fake message pretending to be Priya, they could say "Mrs Okafor set us extra homework" and it would sound completely authentic.</p>
                  </div>
                  <div className="smishing-flag-card profile-footprint-card">
                    <div className="smishing-flag-label">ROUTINE</div>
                    <div className="smishing-flag-title">FOOTPRINT FOUND</div>
                    <p className="smishing-flag-body"><strong>"Last day of term tomorrow then two weeks off."</strong> Anyone following her feed knows exactly when Priya is on holiday, when she is at school, and when she is usually around or away.</p>
                  </div>
                  <div className="smishing-flag-card profile-footprint-card">
                    <div className="smishing-flag-label">LOCATION</div>
                    <div className="smishing-flag-title">FOOTPRINT FOUND</div>
                    <p className="smishing-flag-body"><strong>Location tags on three posts and the football match invite with time and place.</strong> A stranger now knows where Priya is most Saturday afternoons at 2pm. And where her home is, roughly, from the house number in the photo.</p>
                  </div>
                  <div className="smishing-flag-card profile-footprint-card profile-footprint-card--wide">
                    <div className="smishing-flag-label">FRIEND'S USERNAME</div>
                    <div className="smishing-flag-title">FOOTPRINT FOUND</div>
                    <p className="smishing-flag-body"><strong>"Thanks @JayJay12 for the lift home."</strong> This reveals the username of a close friend - a new target who can be approached with messages that seem to come from Priya.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Digital footprint explanation */}
          {isDigitalFootprintInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-section">
                  <h2 className="smishing-info-heading">WHAT IS A DIGITAL FOOTPRINT?</h2>
                  <p className="smishing-info-body">Your digital footprint is everything about you that can be found online. Every post, every tag, every photo background, every caption. Individually, most pieces feel harmless. A school badge. A street name. A teacher's name in a caption. But a patient person who collects those pieces builds a picture of your life that you never meant to give them.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide digital-footprint-card">
                    <div className="smishing-flag-label">THE PICTURE TEST</div>
                    <div className="smishing-flag-title">WHAT DOES THIS ADD UP TO?</div>
                    <p className="smishing-flag-body">Before posting anything, ask: what could a complete stranger learn from this if they put it together with everything else I have posted this week? Not just this post - the picture that builds up over time. A school badge in one photo, a routine mentioned in another, a location tag in a third. One by one they seem fine. Together they are a map.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Privacy settings quiz ───────────────────────────────────── */}
          {showPqOverlay && (
            <div className="quiz-overlay pq-overlay">
              <div className="quiz-panel pq-panel-sb">
                {!pqAnswer && (
                  <>
                    <div className="quiz-header">WHAT DO YOU DO?</div>
                    <p className="quiz-question">Priya asks: <strong>"Does this mean I should stop posting? I do not want to stop. It is how I stay connected with people."</strong></p>
                    <div className="quiz-options">
                      {[
                        { display: 'A', id: 'A', text: 'Yes - the safest option is to stop posting publicly entirely.' },
                        { display: 'B', id: 'B', text: 'No - but make the account private so only approved followers can see your posts.' },
                        { display: 'C', id: 'C', text: 'No - keep posting, but check your privacy settings so strangers cannot see your posts, and stop including details that build a map of your life.' },
                      ].map(({ display, id, text }) => (
                        <div key={display} className="quiz-option" onClick={e => { e.stopPropagation(); playOptionSelect(); id === 'C' ? playCorrect() : id === 'B' ? playPartial() : playWrong(); setPqAnswer(id) }}>
                          <span className="quiz-option-key">{display}</span>
                          <span className="quiz-option-text">{text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {pqAnswer === 'A' && pqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Rosa shakes her head gently.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advancePQ() }}>tap to continue</div>
                  </div>
                )}

                {pqAnswer === 'B' && pqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--partial">
                      <div className="quiz-verdict quiz-verdict--partial">~ CORRECT BUT INCOMPLETE</div>
                      <p className="quiz-narrator-beat">Rosa nods - but waits.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advancePQ() }}>tap to continue</div>
                  </div>
                )}

                {pqAnswer === 'C' && pqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--correct">
                      <div className="quiz-verdict">✓ CORRECT</div>
                      <p className="quiz-narrator-beat">Priya looks relieved.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advancePQ() }}>tap to continue</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {isPqCSafeMove && (
            <div className="smishing-info-overlay" onClick={advancePQ}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide digital-footprint-card">
                    <div className="smishing-flag-label">SAFE MOVE</div>
                    <div className="smishing-flag-title">PRIVACY SETTINGS AND DELIBERATE SHARING</div>
                    <p className="smishing-flag-body">Check that your accounts are set to private so only people you approve can see your posts. Then think about what you post even to your approved followers - not every detail needs to be shared. School name and teacher in the same post is more than either alone.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Security question info card ─────────────────────────────── */}
          {isSecurityQuestionInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags" style={{ flexDirection: 'column', gap: 12 }}>
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">SECURITY QUESTION AWARENESS</div>
                    <div className="smishing-flag-title">THE SECURITY QUESTION TRAP</div>
                    <p className="smishing-flag-body">Security questions ask for personal information - pet names, schools, birthdays, favourite things. These feel private. But for most people, these same details are visible somewhere on their public profiles. The answer to "what was your first pet's name" is not private information if you posted a birthday tribute to that pet last year. Treat security question answers like passwords - never use real information that could be found online.</p>
                  </div>
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">THE SAFE APPROACH</div>
                    <div className="smishing-flag-title">THE LIE IS THE PROTECTION</div>
                    <p className="smishing-flag-body">The safest way to answer security questions is to lie consistently. Your first pet is not whatever name you used - it is a random word only you know. Your primary school is not the one you tagged in photos - it is another random word. These fake answers cannot be found on your public profile because they are not true. Write them down somewhere safe - you will need them if you forget.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Security question quiz ───────────────────────────────────── */}
          {showSqOverlay && (
            <div className="quiz-overlay pq-overlay">
              <div className="quiz-panel pq-panel-sb">
                {!sqAnswer && (
                  <>
                    <div className="quiz-header">WHAT DO YOU DO?</div>
                    <p className="quiz-question">Priya asks: <strong>"But they also changed my password. How did they know my original password to log in the first time?"</strong></p>
                    <div className="quiz-options">
                      {[
                        { display: 'A', id: 'B', text: 'They used the security questions to reset the password without needing to know the original one. They never had to guess - they just told the platform they forgot the password and answered the questions.' },
                        { display: 'B', id: 'A', text: 'They probably guessed it - most gaming passwords are easy to guess.' },
                        { display: 'C', id: 'C', text: 'They must have had access to his device.' },
                      ].map(({ display, id, text }) => (
                        <div key={display} className="quiz-option" onClick={e => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : playWrong(); setSqAnswer(id) }}>
                          <span className="quiz-option-key">{display}</span>
                          <span className="quiz-option-text">{text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {sqAnswer === 'A' && sqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Rosa shakes her head.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceSQ() }}>tap to continue</div>
                  </div>
                )}
                {sqAnswer === 'B' && sqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--correct">
                      <div className="quiz-verdict">✓ CORRECT</div>
                      <p className="quiz-narrator-beat">Priya stares.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceSQ() }}>tap to continue</div>
                  </div>
                )}
                {sqAnswer === 'C' && sqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Rosa gestures at the profile on screen.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceSQ() }}>tap to continue</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {isSqBSafeMove && (
            <div className="smishing-info-overlay" onClick={advanceSQ}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">SAFE MOVE</div>
                    <div className="smishing-flag-title">TREAT SECURITY ANSWERS LIKE PASSWORDS</div>
                    <p className="smishing-flag-body">Security question answers should never be real personal information that could be found on your public profile. Use random words, fictitious answers, or treat them like a second password. Store them somewhere safe.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Secret-keeping info card ─────────────────────────────────── */}
          {isSecretKeepingInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">ONLINE SAFETY AWARENESS</div>
                    <div className="smishing-flag-title">THE SECRET-KEEPING REQUEST</div>
                    <p className="smishing-flag-body">When someone online asks you to keep your friendship, your conversations, or your contact details secret from your parents or trusted adults - that is a red flag. People with good intentions do not need secrecy. The request to hide things from the people who care about you is one of the clearest warning signs that something may be wrong, regardless of how friendly the person has seemed until now.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Verification info card ───────────────────────────────────── */}
          {isVerificationInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">ONLINE SAFETY AWARENESS</div>
                    <div className="smishing-flag-title">THE VERIFICATION QUESTIONS</div>
                    <p className="smishing-flag-body">Knowing someone's username, gaming stats, and favourite team is not the same as knowing who they are. Before trusting someone you met online with anything personal - your real name, your phone number, your school, your location - ask: can I verify anything about them through a route that does not go through them? Has anyone I trust in real life ever met or spoken to them? If both answers are no, treat them as a stranger regardless of how long you have been talking.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Online trust quiz ────────────────────────────────────────── */}
          {showOqOverlay && (
            <div className="quiz-overlay pq-overlay">
              <div className="quiz-panel pq-panel-sb">
                {!oqAnswer && (
                  <>
                    <div className="quiz-header">WHAT DO YOU DO?</div>
                    <p className="quiz-question">Priya asks: <strong>"What should I do? I do not want to accuse him of anything. What if he is genuinely just a nice person who uses a different app?"</strong></p>
                    <div className="quiz-options">
                      {[
                        { display: 'A', id: 'A', text: 'Ignore the message and block him - better to be safe.' },
                        { display: 'B', id: 'B', text: 'Tell a trusted adult - a parent or carer - about the message before doing anything else. Then decide together.' },
                        { display: 'C', id: 'C', text: 'Reply and stay on the current app, but do not give the phone number.' },
                      ].map(({ display, id, text }) => (
                        <div key={display} className="quiz-option" onClick={e => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : id === 'C' ? playPartial() : playWrong(); setOqAnswer(id) }}>
                          <span className="quiz-option-key">{display}</span>
                          <span className="quiz-option-text">{text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {oqAnswer === 'A' && oqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Rosa shakes her head.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceOQ() }}>tap to continue</div>
                  </div>
                )}
                {oqAnswer === 'B' && oqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--correct">
                      <div className="quiz-verdict">✓ CORRECT</div>
                      <p className="quiz-narrator-beat">Rosa nods once.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceOQ() }}>tap to continue</div>
                  </div>
                )}
                {oqAnswer === 'C' && oqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--partial">
                      <div className="quiz-verdict quiz-verdict--partial">~ PARTIALLY RIGHT</div>
                      <p className="quiz-narrator-beat">Rosa considers.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceOQ() }}>tap to continue</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {isOqBSafeMove && (
            <div className="smishing-info-overlay" onClick={advanceOQ}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">SAFE MOVE</div>
                    <div className="smishing-flag-title">TELL BEFORE YOU DECIDE</div>
                    <p className="smishing-flag-body">When someone online asks you to keep something secret from your parents or to move to a platform they do not know, tell a trusted adult before you respond. You do not need to be certain something is wrong. The request itself is enough reason to involve someone who cares about you.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Password fix order quiz ──────────────────────────────────── */}
          {showFqOverlay && (
            <div className="quiz-overlay pq-overlay">
              <div className="quiz-panel pq-panel-sb">
                {!fqAnswer && (
                  <>
                    <div className="quiz-header">WHAT DO YOU DO?</div>
                    <p className="quiz-question">Priya wants to start fixing everything right now. She asks: <strong>"What do I do first?"</strong> There are three things that need doing. In what order do you do them?</p>
                    <div className="quiz-options">
                      {[
                        { display: 'A', id: 'B', text: 'Secure the email first - because whoever has the email can reset everything else. Then change all other passwords. Then set up a password manager to manage them going forward.' },
                        { display: 'B', id: 'A', text: 'Change the gaming account password first, then email, then set up a password manager.' },
                        { display: 'C', id: 'C', text: 'Set up a password manager first, then change all passwords through it.' },
                      ].map(({ display, id, text }) => (
                        <div key={display} className="quiz-option" onClick={e => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : id === 'C' ? playPartial() : playWrong(); setFqAnswer(id) }}>
                          <span className="quiz-option-key">{display}</span>
                          <span className="quiz-option-text">{text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {fqAnswer === 'A' && fqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Rosa points at the email.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceFQ() }}>tap to continue</div>
                  </div>
                )}
                {fqAnswer === 'B' && fqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--correct">
                      <div className="quiz-verdict">✓ CORRECT</div>
                      <p className="quiz-narrator-beat">Priya nods.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceFQ() }}>tap to continue</div>
                  </div>
                )}
                {fqAnswer === 'C' && fqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--partial">
                      <div className="quiz-verdict quiz-verdict--partial">~ PARTIALLY RIGHT</div>
                      <p className="quiz-narrator-beat">Rosa approves but adds the email point.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceFQ() }}>tap to continue</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {isFqBSafeMove && (
            <div className="smishing-info-overlay" onClick={advanceFQ}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">SAFE MOVE</div>
                    <div className="smishing-flag-title">EMAIL FIRST, ALWAYS</div>
                    <p className="smishing-flag-body">Your email account is the master key to everything else online - because "forgot password" for almost every other service sends a reset link to your email. Secure your email with a strong, unique password before anything else. Then change everything else. Then use a password manager.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Online trust info card ───────────────────────────────────── */}
          {isOnlineTrustInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">ONLINE SAFETY AWARENESS</div>
                    <div className="smishing-flag-title">WHO TO TRUST ONLINE</div>
                    <p className="smishing-flag-body">Trust online builds the same way trust builds anywhere - slowly, verifiably, and never in secret. Someone you cannot verify, who asks for secrecy from the people who care about you, and who wants to move contact somewhere private, is asking you to give up the things that keep you safe. You are allowed to slow down. You are allowed to ask questions. You are always allowed to tell someone.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {isBystanderInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">CYBERBULLYING AWARENESS</div>
                    <div className="smishing-flag-title">THE BYSTANDER POSITION</div>
                    <p className="smishing-flag-body">A bystander is someone who sees harm happening and does not act. In cyberbullying, bystanders often outnumber both the person causing harm and the person experiencing it. Staying silent feels neutral - but silence in a group chat means the behaviour continues unchallenged, and the person being targeted sees the silence too. Doing nothing is still doing something.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {isVictimInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">CYBERBULLYING AWARENESS</div>
                    <div className="smishing-flag-title">THE VICTIM POSITION</div>
                    <p className="smishing-flag-body">When someone is the target of cyberbullying - mocking posts, fake messages, shared screenshots, exclusion from groups - they often feel completely alone, even when they are surrounded by people who saw it. One person speaking up - even quietly and privately - changes that. It does not fix everything. But it breaks the isolation.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Cyberbullying quiz ───────────────────────────────────────── */}
          {showCyqOverlay && (
            <div className="quiz-overlay pq-overlay">
              <div className="quiz-panel pq-panel-sb">
                {!cyqAnswer && (
                  <>
                    <div className="quiz-header">WHAT DO YOU SAY?</div>
                    <p className="quiz-question">Priya asks: <strong>"The people in the group - they were just going along with it. Does that mean it is not really their fault?"</strong></p>
                    <div className="quiz-options">
                      {[
                        { display: 'A', id: 'A', text: 'Going along with something harmful still makes you responsible. They chose to share it.' },
                        { display: 'B', id: 'C', text: 'If they did not think about it and did not mean any harm, they probably should not be judged too harshly.' },
                        { display: 'C', id: 'B', text: 'Going along with it is still a choice, even if they did not think of it that way. The effect on the person targeted is the same.' },
                      ].map(({ display, id, text }) => (
                        <div key={display} className="quiz-option" onClick={e => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : playWrong(); setCyqAnswer(id) }}>
                          <span className="quiz-option-key">{display}</span>
                          <span className="quiz-option-text">{text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {cyqAnswer === 'A' && cyqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Rosa speaks before you can.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceCYQ() }}>tap to continue</div>
                  </div>
                )}
                {cyqAnswer === 'B' && cyqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--correct">
                      <div className="quiz-verdict">✓ CORRECT</div>
                      <p className="quiz-narrator-beat">Priya looks at the floor.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceCYQ() }}>tap to continue</div>
                  </div>
                )}
                {cyqAnswer === 'C' && cyqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Rosa looks at you.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceCYQ() }}>tap to continue</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {isCyqBSafeMove && (
            <div className="smishing-info-overlay" onClick={advanceCYQ}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">CYBERBULLYING AWARENESS</div>
                    <div className="smishing-flag-title">THE PERPETRATOR POSITION</div>
                    <p className="smishing-flag-body">Most people who contribute to cyberbullying do not see themselves as bullies. They are going along with the group, laughing at something that seems minor, not thinking about the person on the other end of the screen. But every reaction, every share, every silence that reads as approval is a choice with a real effect on a real person. Understanding that is not about guilt. It is about what you choose the next time.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {isAllPositionsInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">SAFE MOVE</div>
                    <div className="smishing-flag-title">WHAT TO DO - ALL THREE POSITIONS</div>
                    <p className="smishing-flag-body"><strong>If you are targeted:</strong> tell a trusted adult, report the content, do not reply to provoke, keep evidence.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 8 }}><strong>If you are a bystander:</strong> you do not have to be loud - message the person privately, report the post, tell an adult, refuse to share or react.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 8 }}><strong>If you have contributed to harm:</strong> you cannot undo it, but you can stop, you can speak to a trusted adult, and you can choose differently next time.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Location pin demo - phone showing auto-added pin ─────────── */}
          {isLocationPinDemo && (
            <div className="sb-phone-wrap" onClick={advanceSB}>
              <div className="sb-phone-frame sb-phone-frame--blue">
                <img src={phoneBlue} alt="" className="sb-phone-img" aria-hidden="true" />
                <div className="sb-phone-screen sb-phone-screen--profile">
                  <div className="sb-profile">
                    <div className="sb-profile-kicker">COMMUNITY BOARD - ABOUT TO POST</div>
                    <div className="sb-profile-title">Photo Preview</div>
                    <div className="sb-profile-subtitle">Tap to share publicly</div>
                    <div className="sb-profile-list">
                      <div style={{ background: 'rgba(220,60,40,0.08)', border: '1px solid rgba(220,60,40,0.3)', padding: '8px 10px', borderRadius: 6 }}>
                        <span style={{ display: 'block', fontSize: 9, fontWeight: 900, color: '#c03020', letterSpacing: '0.06em', marginBottom: 4 }}>⚠ AUTO-ADDED BY APP</span>
                        <span style={{ color: '#1a5c8a', fontWeight: 800 }}>📍 Location:</span> Home - 14 Millbank Road, Seabright
                      </div>
                      <div><span>Caption:</span> "Lazy Sunday morning ☀️"</div>
                      <div style={{ padding: 0, overflow: 'hidden', borderRadius: 5 }}>
                        <img src={bedroomImg} alt="Bedroom window with street visible" style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-phone-hint" style={{ fontStyle: 'italic', opacity: 0.75 }}>Rosa taps the location pin - it appeared automatically when the photo was taken. Tap to continue.</div>
            </div>
          )}

          {/* ── Edit Before You Post minigame instructions ───────────────── */}
          {isEditBeforePostInstructions && (
            <div className="mg2-instructions-overlay" onClick={advanceSB}>
              <div className="mg2-instructions-panel picture-test-instructions-panel">
                <div className="mg2-instructions-header">
                  <div className="mg2-instructions-alert">✎</div>
                  <div className="mg2-instructions-title">EDIT BEFORE YOU POST</div>
                </div>
                <p className="mg2-instructions-body">
                  A stream of posts is coming through the community board - things people in Sunshare Square are about to share publicly. Each post has something in it that gives too much away.
                </p>
                <p className="mg2-instructions-body">
                  Your job is to <strong>edit</strong> each one before it goes live - removing just the risky detail and keeping the spirit of what the person wanted to share.
                </p>
                <div className="mg2-instructions-divider" />
                <div className="mg2-instructions-how-label">HOW TO PLAY</div>
                <p className="mg2-instructions-body">
                  Each post glows with a subtle highlight on the risky element. Tap the highlighted section to remove or blur it. You can replace details with something vaguer - for example, changing a specific school name to "school" or removing a house number from a photo.
                </p>
                <p className="mg2-instructions-body">
                  The goal is not to destroy the post - it is to share it safely. You have <strong>8 seconds</strong> per post before it automatically goes live unedited.
                </p>
                <div className="mg2-instructions-cta">TAP ANYWHERE TO BEGIN</div>
              </div>
            </div>
          )}

          {/* ── Picture Test minigame instructions ─────────────────────── */}
          {isPictureTestInstructions && (
            <div className="mg2-instructions-overlay" onClick={advanceSB}>
              <div className="mg2-instructions-panel picture-test-instructions-panel">
                <div className="mg2-instructions-header">
                  <div className="mg2-instructions-alert">□</div>
                  <div className="mg2-instructions-title">THE PICTURE TEST</div>
                </div>
                <p className="mg2-instructions-body">
                  A series of posts are queued to go live on Sunshare Square's public board. Some are fine. Some reveal too much. Some seem fine alone but are dangerous when you consider what the person has already posted.
                </p>
                <p className="mg2-instructions-body">
                  Your job is to <strong>APPROVE</strong> safe posts and <strong>EDIT</strong> or <strong>HOLD</strong> risky ones - then explain to the poster what they are revealing.
                </p>
                <div className="mg2-instructions-divider" />
                <div className="mg2-instructions-how-label">HOW TO PLAY</div>
                <p className="mg2-instructions-body">
                  Read each post and the poster's recent post history. Tap <strong>APPROVE</strong> if the post is safe to share publicly. Tap <strong>EDIT</strong> to remove the risky details. Tap <strong>HOLD</strong> if the post should stay private.
                </p>
                <p className="mg2-instructions-body">
                  After each decision, choose your explanation from three options - select the one that best describes the risk you spotted. Choosing the right explanation earns full points and the poster learns exactly what to watch for. You do not need to type anything - just read, decide, and explain.
                </p>
                <div className="mg2-instructions-cta">TAP ANYWHERE TO BEGIN</div>
              </div>
            </div>
          )}

          {/* Aunt / Celia reveal screen */}
          {isAuntReveal && (
            <div className="sb-aunt-reveal-overlay" onClick={advanceSB}>
              <img src={aunt3Thinking} alt="Celia" className="sb-aunt-reveal-img" />
              <div className="smishing-continue">tap to continue</div>
            </div>
          )}

          {/* Narrator lines */}
          {isNarrator && (
            <div className="narrator-overlay">
              <div className="narrator-lines">
                {pastSBNarrator.map((l, i) => {
                  const dist = pastSBNarrator.length - i
                  const side = l.origIdx % 2 === 0 ? 'left' : 'right'
                  return (
                    <p key={l.origIdx} className={`narrator-text narrator-text--past-${dist} narrator-text--${side}`}>
                      {l.text}
                    </p>
                  )
                })}
                {sbLine.text.split('\n\n').map((para, i) => (
                  <p key={i} className={`narrator-text narrator-text--current narrator-text--${seabrightLine % 2 === 0 ? 'left' : 'right'}`}>
                    {para}
                  </p>
                ))}
              </div>
              <div className="narrator-controls">
                <button className="narrator-back" aria-label="previous"
                  onClick={e => { e.stopPropagation(); goBackSB() }}>
                  <img src={backArrow} alt="back" />
                </button>
                <button className="narrator-next" aria-label="next"
                  onClick={e => { e.stopPropagation(); advanceSB() }}>
                  <img src={nextArrow} alt="next" />
                </button>
              </div>
            </div>
          )}

          {/* Dialogue bubble - anchored to bottom, never moves */}
          {((!isNarrator && !isPhoneEmail && !isPhoneInspect && !isUrlPreview && !isEmailRedflags && !isPhishingInfo && !isPhishingQuiz && !isPhoneText && !isPublicProfile && !isSecurityQuestionsProfile && !isSecurityQuestionInfo && !isSecurityQuestionQuiz && !isSecretKeepingInfo && !isVerificationInfo && !isOnlineTrustQuiz && !isOnlineTrustInfo && !isBystanderInfo && !isVictimInfo && !isCyberbullyingQuiz && !isAllPositionsInfo && !isPasswordFixQuiz && !isLocationPinDemo && !isEditBeforePostInstructions && !isEditBeforePostGame && !isProfileFootprints && !isDigitalFootprintInfo && !isPrivacyQuiz && !isPictureTestInstructions && !isPictureTestGame && !isFeelingsInfo && !isCoralRedflags && !isCoralQuiz && !isRealOrFake && !isTabletPopup && !isScamAdInfo && !isTimerReset && !isScamAdRedflags && !isScamAdQuiz && !isScammedInfo && !isScammedSteps && !isCarolQuiz && !isMg2Instructions && !isMinigame2 && !isCompassReveal && !isAuntReveal && !isNotebookReveal && !isKnotReveal && !isPrismReveal && !isPrismStored && !isDeepfakeInfo && !isShadowGlimpse && !isNotebookPage && !isStrongboxReveal && !isShadowReveal && !isPasswordLesson && !isPasswordMinigameInstructions && !isPasswordMinigame && !isStrongboxSeal && !isShadowManInfo)
           || inQuizDialogue || inCqDialogue || inSaqDialogue || inBqDialogue || inPqDialogue || inSqDialogue || inOqDialogue || inFqDialogue || inCyqDialogue) && (() => {
            const activeLine = inCyqDialogue ? cyqDialogueLine : inFqDialogue ? fqDialogueLine : inOqDialogue ? oqDialogueLine : inSqDialogue ? sqDialogueLine : inPqDialogue ? pqDialogueLine : inBqDialogue ? bqDialogueLine : inSaqDialogue ? saqDialogueLine : inCqDialogue ? cqDialogueLine : inQuizDialogue ? quizDialogueLine : sbLine
            const activeText = resolveName(activeLine.text)
            const activeSpeaker = resolveName(activeLine.speaker)
            const onAdvance = inPqDialogue ? advancePQ : inBqDialogue ? advanceBQ : inSaqDialogue ? advanceSAQ : inCqDialogue ? advanceCQ : inQuizDialogue ? advanceQuizStep : advanceSB
            const onBack = () => inPqDialogue ? setPqStep(s => Math.max(0, s - 1)) : inBqDialogue ? setBqStep(s => Math.max(0, s - 1)) : inSaqDialogue ? setSaqStep(s => Math.max(0, s - 1)) : inCqDialogue ? setCqStep(s => Math.max(0, s - 1)) : inQuizDialogue ? setSbQuizStep(s => Math.max(0, s - 1)) : goBackSB()
            return (
              <div className="seabright-bubble-anchor">
                <div className="bubble-tail-container observatory-bubble-wrap">
                  <div className="bubble">
                    <div className="nameplate">{activeSpeaker}</div>
                    <div className="bubble-inner" onClick={onAdvance}>
                      <div className="bubble-line">{activeText}</div>
                      <div className="dialogue-controls">
                        <button className="back-inline" aria-label="previous"
                          onClick={e => { e.stopPropagation(); onBack() }}>
                          <img src={backArrow} alt="back" />
                        </button>
                        <button className="next-btn" aria-label="next"
                          onClick={e => { e.stopPropagation(); onAdvance() }}>
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
            )
          })()}

          {/* Quiz path A step 3 - Address Bar Rule card */}
          {isQuizAInfoCard && (
            <div className="smishing-info-overlay" onClick={advanceQuizStep}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">THE RULE</div>
                    <div className="smishing-flag-title">THE ADDRESS BAR RULE</div>
                    <p className="smishing-flag-body">Before you type any login details or personal information on a website - stop and look at the address bar at the top of the screen. Does it match the real website you expected? Even if the page looks perfect, a wrong address means a fake site.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Phone email */}
          {isPhoneEmail && (
            <div className="sb-phone-wrap">
              <div className="sb-phone-frame">
                <img src={phoneOrange} alt="" className="sb-phone-img" aria-hidden="true" />
                <div className="sb-phone-screen">
                  <div className="sb-email">
                    <div className="sb-email-header">EMAIL MESSAGE</div>
                    <div className="sb-email-from">
                      <span className="sb-email-label">From:</span> Seabright Harbour Authority<br />
                      <span className="sb-email-address">&lt;harbour.admin@seabright-port-renewal.com&gt;</span>
                    </div>
                    <div className="sb-email-body">
                      <span className="sb-email-urgent">URGENT:</span> Your harbour access registration expires in <strong>24 HOURS</strong>. You must verify your account immediately or your fishing licence will be suspended.
                    </div>
                    <div className="sb-email-link">
                      Click here to renew:<br />
                      <span className="sb-email-url">www.seabright-port-renewal.com/verify</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-phone-hint">tap to continue</div>
            </div>
          )}

          {/* Phone inspect - same email with interactive magnifying glass hotspots */}
          {isPhoneInspect && (
            <div className="sb-phone-wrap" onClick={advanceSB}>
              <div className="sb-phone-frame">
                <img src={phoneOrange} alt="" className="sb-phone-img" aria-hidden="true" />
                <div className="sb-phone-screen">
                  <div className="sb-email">
                    <div className="sb-email-header">EMAIL MESSAGE</div>
                    <div className="sb-email-from">
                      <span className="sb-email-label">From:</span> Seabright Harbour Authority<br />
                      <div className={`sb-inspect-spot${sbInspected.sender ? ' sb-inspect-spot--revealed' : ''}`}>
                        <span className="sb-email-address">&lt;harbour.admin@seabright-port-renewal.com&gt;</span>
                        {!sbInspected.sender ? (
                          <button
                            className="sb-inspect-mag"
                            aria-label="Inspect sender address"
                            onClick={e => { e.stopPropagation(); playInspect(); setSbInspected(p => ({ ...p, sender: true })) }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <circle cx="10" cy="10" r="6" />
                              <line x1="14.5" y1="14.5" x2="20" y2="20" />
                            </svg>
                          </button>
                        ) : (
                          <div className="sb-inspect-callout">Display name ≠ real address - this domain is made up</div>
                        )}
                      </div>
                    </div>
                    <div className="sb-email-body">
                      <span className="sb-email-urgent">URGENT:</span> Your harbour access registration expires in <strong>24 HOURS</strong>. You must verify your account immediately or your fishing licence will be suspended.
                    </div>
                    <div className="sb-email-link">
                      Click here to renew:<br />
                      <div className={`sb-inspect-spot${sbInspected.link ? ' sb-inspect-spot--revealed' : ''}`}>
                        <span className="sb-email-url">www.seabright-port-renewal.com/verify</span>
                        {!sbInspected.link ? (
                          <button
                            className="sb-inspect-mag"
                            aria-label="Inspect link"
                            onClick={e => { e.stopPropagation(); playInspect(); setSbInspected(p => ({ ...p, link: true })) }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <circle cx="10" cy="10" r="6" />
                              <line x1="14.5" y1="14.5" x2="20" y2="20" />
                            </svg>
                          </button>
                        ) : (
                          <div className="sb-inspect-callout">Not an official domain - crafted to look real</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-phone-hint">
                {sbInspectDone ? 'tap to continue' : sbInspected.sender || sbInspected.link ? 'inspect the other spot' : 'inspect the email'}
              </div>
            </div>
          )}

          {/* URL preview - press-and-hold the link to reveal real destination */}
          {isUrlPreview && (
            <div className="sb-phone-wrap" onClick={urlRevealed ? advanceSB : undefined}>
              <div className="sb-phone-frame">
                <img src={phoneOrange} alt="" className="sb-phone-img" aria-hidden="true" />
                <div className="sb-phone-screen">
                  <div className="sb-email">
                    <div className="sb-email-header">EMAIL MESSAGE</div>
                    <div className="sb-email-from">
                      <span className="sb-email-label">From:</span> Seabright Harbour Authority<br />
                      <span className="sb-email-address">&lt;harbour.admin@seabright-port-renewal.com&gt;</span>
                    </div>
                    <div className="sb-email-body">
                      <span className="sb-email-urgent">URGENT:</span> Your harbour access registration expires in <strong>24 HOURS</strong>. You must verify your account immediately or your fishing licence will be suspended.
                    </div>
                    <div className="sb-email-link">
                      Click here to renew:<br />
                      <div className="sb-url-hold-wrap">
                        <span
                          className={`sb-email-url sb-url-holdable${urlHolding ? ' sb-url-holding' : ''}${urlRevealed ? ' sb-url-revealed' : ''}`}
                          onPointerDown={handleUrlHoldStart}
                          onPointerUp={handleUrlHoldEnd}
                          onPointerCancel={handleUrlHoldEnd}
                        >
                          www.seabright-port-renewal.com/verify
                        </span>
                        {urlHolding && (
                          <div className="sb-url-hold-bar">
                            <div className="sb-url-hold-bar-fill" />
                          </div>
                        )}
                        {urlRevealed && (
                          <div className="sb-url-preview-popup">
                            <div className="sb-url-preview-label">ACTUAL DESTINATION</div>
                            <div>
                              <span className="sb-url-preview-domain">seabright-port-renewal.com</span>
                              <span className="sb-url-preview-path">/steal-data</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-phone-hint">
                {urlRevealed ? 'tap to continue' : urlHolding ? 'holding…' : 'press and hold the link'}
              </div>
            </div>
          )}

          {/* Email red flags card */}
          {isEmailRedflags && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">FAKE SENDER ADDRESS</div>
                    <p className="smishing-flag-body">The display name looked official but the real email address - seabright-port-renewal.com - was not a real government or authority address. Real official addresses use .gov.us or the company's actual domain.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">URGENT DEADLINE</div>
                    <p className="smishing-flag-body">'Expires in 24 HOURS' - urgent deadlines are designed to make you panic and act without thinking. Real organisations give you plenty of time and send warning letters first.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">SUSPICIOUS LINK</div>
                    <p className="smishing-flag-body">The link went to the same unofficial domain as the fake sender address. Always check where a link actually leads before tapping it.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Phishing info card - same style as observatory smishing-info */}
          {isPhishingInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-section">
                  <h2 className="smishing-info-heading">WHAT IS PHISHING?</h2>
                  <p className="smishing-info-body">Phishing is when someone sends a fake message pretending to be from someone you trust - a school, a gaming platform, a delivery company - to trick you into clicking a link or giving away information. The name comes from fishing. They throw out a line and wait for someone to bite.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">THE TRICK</div>
                    <div className="smishing-flag-title">THE SENDER NAME TRICK</div>
                    <p className="smishing-flag-body">On any email, there are two things: the display name (what you see first) and the actual email address (the real identity). The display name can be anything - it costs nothing to fake. Always tap or hover on the sender name to see the real address underneath. That is the one that cannot lie as easily.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Phishing Quiz ──────────────────────────────────────── */}
          {showQuizOverlay && (
            <div className="quiz-overlay pq-overlay">
              <div className="quiz-panel pq-panel-sb">

                {/* ── No answer yet: question + choices ── */}
                {!sbQuizAnswer && (
                  <>
                    <div className="quiz-header">WHAT DO YOU DO?</div>
                    <p className="quiz-question">A new email arrives on Old Finn's phone while you are sitting there. Subject: <strong>'FINAL WARNING - Seabright Fishing Licence expires TODAY.'</strong> Sender name: <strong>'National Maritime Center (NMC) .'</strong> What do you do?</p>
                    <div className="quiz-options">
                      {[
                        { display: 'A', id: 'B', text: 'Press and hold the sender name to check the real email address, and press and hold the link to see where it goes before doing anything.' },
                        { display: 'B', id: 'A', text: 'Tap the link immediately - if the licence really expires today there is no time to waste.' },
                        { display: 'C', id: 'C', text: 'Delete it immediately - anything this urgent is definitely a scam.' },
                      ].map(({ display, id, text }) => (
                        <div key={display} className="quiz-option" onClick={e => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : id === 'A' ? playWrong() : playPartial(); setSbQuizAnswer(id) }}>
                          <span className="quiz-option-key">{display}</span>
                          <span className="quiz-option-text">{text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* ── Answer A - INCORRECT (step 0 only: fake login page) ── */}
                {/* Steps 1-2 are dialogue bubbles; step 3 is a full-screen card - both rendered outside this overlay */}
                {sbQuizAnswer === 'A' && sbQuizStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Old Finn watches as the fake page loads.</p>
                      <div className="sb-fake-browser">
                        <div className="sb-fake-browser-bar">
                          <span className="sb-fake-browser-lock">🔒</span>
                          <span className="sb-fake-browser-domain sb-fake-browser-domain--bad">nmc-licence-renewal.com</span>
                          <span className="sb-fake-browser-warn">⚠</span>
                        </div>
                        <div className="sb-fake-browser-page">
                          <div className="sb-fake-login-logo">NMC</div>
                          <div className="sb-fake-login-title">Sign in to your NMC account</div>
                          <div className="sb-fake-login-field"><div className="sb-fake-login-label">Licence ID</div><div className="sb-fake-login-input" /></div>
                          <div className="sb-fake-login-field"><div className="sb-fake-login-label">Password</div><div className="sb-fake-login-input" /></div>
                          <div className="sb-fake-login-btn">Sign in</div>
                        </div>
                      </div>
                      <p className="quiz-woman-says" style={{ marginTop: 10 }}>Address bar shows <strong style={{ color: 'rgba(200,40,30,0.9)' }}>nmc-licence-renewal.com</strong> - not <strong>nmc.gov</strong>. Even if the page looks official, the address gives it away.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={advanceQuizStep}>tap to continue</div>
                  </div>
                )}

                {/* ── Answer B - CORRECT (step 0 = holds; steps 1-3 = dialogue bubbles; step 4 = remember card) ── */}
                {sbQuizAnswer === 'B' && (sbQuizStep === 0 || sbQuizStep === 4) && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--correct">
                      <div className="quiz-verdict">✓ CORRECT</div>
                      {sbQuizStep === 0 && (
                        <>
                          <p className="quiz-narrator-beat">Old Finn watches as you check.</p>
                          <div className="pq-email-check">
                            <div className="pq-email-row"><span className="pq-email-label">From:</span><span className="pq-email-display"> National Maritime Center (NMC)</span></div>
                            <div className="pq-email-row">
                              <span className="pq-email-label">Address:</span>
                              <div className="sb-url-hold-wrap" style={{ display: 'inline-block', marginLeft: 4 }}>
                                <span className={`pq-holdable${sbQuizBHolding.sender ? ' sb-url-holding' : ''}${sbQuizBReveals.sender ? ' sb-url-revealed' : ''}`}
                                  onPointerDown={handleQBSenderStart} onPointerUp={handleQBSenderEnd} onPointerCancel={handleQBSenderEnd}
                                  onClick={e => e.stopPropagation()}>hold to reveal</span>
                                {sbQuizBHolding.sender && <div className="sb-url-hold-bar"><div className="sb-url-hold-bar-fill" /></div>}
                                {sbQuizBReveals.sender && <div className="sb-url-preview-popup"><div className="sb-url-preview-label">REAL SENDER ADDRESS</div><div><span className="sb-url-preview-domain">noreply@</span><span className="sb-url-preview-path">nmc-licence-renewal.com</span></div><div style={{ fontSize: '0.64rem', color: 'rgba(160,160,160,0.6)', marginTop: 2 }}>not nmc.gov</div></div>}
                              </div>
                            </div>
                            <div className="pq-email-row">
                              <span className="pq-email-label">Link:</span>
                              <div className="sb-url-hold-wrap" style={{ display: 'inline-block', marginLeft: 4 }}>
                                <span className={`pq-holdable${sbQuizBHolding.link ? ' sb-url-holding' : ''}${sbQuizBReveals.link ? ' sb-url-revealed' : ''}`}
                                  onPointerDown={handleQBLinkStart} onPointerUp={handleQBLinkEnd} onPointerCancel={handleQBLinkEnd}
                                  onClick={e => e.stopPropagation()}>hold to reveal</span>
                                {sbQuizBHolding.link && <div className="sb-url-hold-bar"><div className="sb-url-hold-bar-fill" /></div>}
                                {sbQuizBReveals.link && <div className="sb-url-preview-popup"><div className="sb-url-preview-label">ACTUAL DESTINATION</div><div><span className="sb-url-preview-path">nmc-licence-renewal.com</span><span className="sb-url-preview-domain">/verify</span></div><div style={{ fontSize: '0.64rem', color: 'rgba(160,160,160,0.6)', marginTop: 2 }}>same fake domain as the sender</div></div>}
                              </div>
                            </div>
                          </div>
                          <p className="quiz-woman-says" style={{ marginTop: 8, fontSize: '0.78rem', color: 'rgba(100,120,110,0.7)' }}>
                            {sbQuizBReveals.sender && sbQuizBReveals.link ? 'Both checks done - tap to continue.' : sbQuizBReveals.sender || sbQuizBReveals.link ? 'Now hold the other one.' : 'Hold each item to reveal the real details.'}
                          </p>
                        </>
                      )}
                      {sbQuizStep === 4 && (
                        <div className="quiz-remember">
                          <div className="quiz-remember-label">SAFE MOVE: CHECK BEFORE YOU TAP</div>
                          <p className="quiz-remember-body">Always press and hold on a sender name to see the real address, and press and hold on any link to see where it actually goes. Five seconds of checking can prevent hours of damage.</p>
                        </div>
                      )}
                    </div>
                    {(sbQuizStep === 4 || (sbQuizStep === 0 && sbQuizBReveals.sender && sbQuizBReveals.link)) && (
                      <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={advanceQuizStep}>tap to continue</div>
                    )}
                  </div>
                )}

                {/* ── Answer C - PARTIALLY RIGHT (step 0 only; steps 1-2 are dialogue bubbles) ── */}
                {sbQuizAnswer === 'C' && sbQuizStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--partial">
                      <div className="quiz-verdict quiz-verdict--partial">~ PARTIALLY RIGHT</div>
                      <p className="quiz-narrator-beat">Old Finn nods, but you think it through further.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={advanceQuizStep}>tap to continue</div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ── Coral's text message (phone-text) ─────────────────── */}
          {isPhoneText && (
            <div className="sb-phone-wrap" onClick={advanceSB}>
              <div className="sb-phone-frame">
                <img src={phoneOrange} alt="" className="sb-phone-img" aria-hidden="true" />
                <div className="sb-phone-screen">
                  <div className="sb-sms">
                    <div className="sb-sms-header">TEXT MESSAGE</div>
                    <div className="sb-sms-sender">COASTGUARD EMERGENCY SERVICES</div>
                    <div className="sb-sms-bubble">
                      <span className="sb-sms-urgent">URGENT SAFETY ALERT:</span> A vessel registered to your crew has triggered an emergency beacon. You must verify your crew identity <span className="sb-sms-key">CODE</span> within <span className="sb-sms-key">15 minutes</span> to authorise emergency response. Reply with your crew access code NOW. Failure to respond may delay rescue operations.
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-phone-hint">tap to continue</div>
            </div>
          )}

          {/* ── Community tablet popup ad ────────────────────────────── */}
          {isTabletPopup && (
            <div className="tablet-wrap" onClick={advanceSB}>
              <div className="tablet-frame">
                <div className="tablet-screen">
                  <div className="tablet-bg-content">
                    <span className="tablet-bg-label">SEABRIGHT WEATHER &amp; TIDES</span>
                    <span className="tablet-bg-row">Wind: 12 kn NW &nbsp;|&nbsp; Tide: High 14:22 &nbsp;|&nbsp; Swell: 0.8 m</span>
                  </div>
                  <div className="tablet-popup-overlay">
                    <div className="tablet-popup">
                      <div className="tablet-popup-banner">⭐ YOU HAVE BEEN SELECTED ⭐</div>
                      <div className="tablet-popup-rod">🎣</div>
                      <div className="tablet-popup-prize">WIN A PROFESSIONAL<br />FISHING ROD SET<br /><span className="tablet-popup-value">WORTH $350</span></div>
                      <div className="tablet-popup-claim">Claim your prize in the next 60 seconds!</div>
                      <div className="tablet-popup-timer">
                        {String(Math.floor(tabletCountdown / 60)).padStart(2, '0')}:{String(tabletCountdown % 60).padStart(2, '0')}
                      </div>
                      <div className="tablet-popup-cta">CLAIM NOW →</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-phone-hint">tap to continue</div>
            </div>
          )}

          {/* ── Three feelings + red flag cards ─────────────────────── */}
          {isCoralRedflags && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">UNDERSTANDING SCAMS</div>
                    <div className="smishing-flag-title">THE THREE FEELINGS SCAMMERS USE</div>
                    <p className="smishing-flag-body">Almost every scam message uses one or more of these three feelings to bypass your thinking.</p>
                    <div className="sb-feelings-list">
                      <div className="sb-feeling-row"><span className="sb-feeling-name">URGENCY</span> - you must act NOW or something bad will happen.</div>
                      <div className="sb-feeling-row"><span className="sb-feeling-name">FEAR</span> - something terrible is already happening or will happen to you.</div>
                      <div className="sb-feeling-row"><span className="sb-feeling-name">AUTHORITY</span> - this message is from someone official and powerful who you cannot question.</div>
                    </div>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}>When you feel any of these from a message - pause. Name the feeling. Then check.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG: URGENCY</div>
                    <div className="smishing-flag-title">'15 MINUTES'</div>
                    <p className="smishing-flag-body">Real emergencies do not have 15-minute reply windows sent by text. Real coastguard responses do not depend on a crew member texting back a code.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG: FEAR</div>
                    <div className="smishing-flag-title">'MAY DELAY RESCUE OPERATIONS'</div>
                    <p className="smishing-flag-body">This line is designed to make you feel personally responsible for a disaster if you do not respond. That guilt-and-fear combination is a classic scam technique.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG: AUTHORITY</div>
                    <div className="smishing-flag-title">'COASTGUARD EMERGENCY SERVICES'</div>
                    <p className="smishing-flag-body">Sender names can be set to anything. The real coastguard contacts harbour masters and boat captains through registered channels - not random crew members by text.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG: THE REQUEST</div>
                    <div className="smishing-flag-title">ASKING FOR A CODE</div>
                    <p className="smishing-flag-body">No real emergency service will ever ask you to reply to a text with an access code or login information. Ever. If a message asks for a code or password, that request is itself the red flag.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── How scam messages work on your feelings (info card) ── */}
          {isFeelingsInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">UNDERSTANDING SCAMS</div>
                    <div className="smishing-flag-title">HOW SCAM MESSAGES WORK ON YOUR FEELINGS</div>
                    <p className="smishing-flag-body">Scam messages are not just about words. They are about feelings. They are engineered to make you feel something so strongly - fear, panic, urgency - that you act before your brain has time to catch up.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}>The moment you feel that spike of panic from a message, that is your signal to <strong>slow down</strong>, not speed up.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Scam ad info card ───────────────────────────────────────── */}
          {isScamAdInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">WHAT IS A SCAM AD?</div>
                    <div className="smishing-flag-title">FAKE ADVERTISEMENTS ON REAL WEBSITES</div>
                    <p className="smishing-flag-body">Scam ads are fake advertisements designed to get you to click them. They appear on real websites - sometimes even good, trustworthy websites - because the website rents out advertising space and does not always control who buys it.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}>The website is not the danger. The ad sitting on it might be.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Tablet timer reset ───────────────────────────────────────── */}
          {isTimerReset && (
            <div className="tablet-wrap" onClick={timerResetPhase === 'reset' ? advanceSB : undefined}>
              <div className="tablet-frame">
                <div className="tablet-screen">
                  <div className="tablet-bg-content">
                    <span className="tablet-bg-label">SEABRIGHT WEATHER &amp; TIDES</span>
                    <span className="tablet-bg-row">Wind: 12 kn NW &nbsp;|&nbsp; Tide: High 14:22 &nbsp;|&nbsp; Swell: 0.8 m</span>
                  </div>
                  <div className="tablet-popup-overlay">
                    <div className={`tablet-popup${timerResetPhase === 'zero' ? ' tablet-popup--zero' : ''}`}>
                      <div className="tablet-popup-banner">
                        {timerResetPhase === 'reset' ? '🔄 NEW OPPORTUNITY 🔄' : '⭐ YOU HAVE BEEN SELECTED ⭐'}
                      </div>
                      <div className="tablet-popup-rod">🎣</div>
                      <div className="tablet-popup-prize">WIN A PROFESSIONAL<br />FISHING ROD SET<br /><span className="tablet-popup-value">WORTH $350</span></div>
                      <div className="tablet-popup-claim">
                        {timerResetPhase === 'zero' ? 'Prize expired. Resetting...' : 'Claim your prize in the next 60 seconds!'}
                      </div>
                      <div className={`tablet-popup-timer${timerResetPhase === 'zero' ? ' tablet-popup-timer--zero' : ''}`}>
                        {String(Math.floor(timerResetVal / 60)).padStart(2, '0')}:{String(timerResetVal % 60).padStart(2, '0')}
                      </div>
                      <div className="tablet-popup-cta">CLAIM NOW →</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sb-phone-hint" style={{ opacity: timerResetPhase === 'reset' ? 1 : 0 }}>tap to continue</div>
            </div>
          )}

          {/* ── Scam ad red flags ────────────────────────────────────────── */}
          {isScamAdRedflags && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG: FAKE COUNTDOWN TIMER</div>
                    <div className="smishing-flag-title">'CLAIM IN 60 SECONDS'</div>
                    <p className="smishing-flag-body">Countdown timers in ads almost always loop or reset. They exist to create panic, not to represent a real deadline. When you see a timer, add thirty seconds of thinking time instead of thirty seconds of panic.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG: YOU HAVE BEEN SELECTED</div>
                    <div className="smishing-flag-title">'WIN A PROFESSIONAL FISHING ROD SET'</div>
                    <p className="smishing-flag-body">You cannot win a competition you never entered. Ads that tell you that you have been selected, chosen, or that you are a winner are almost always fake.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG: WRONG WEBSITE ADDRESS</div>
                    <div className="smishing-flag-title">seabright-freegear-claims.co</div>
                    <p className="smishing-flag-body">The ad came from seabright-freegear-claims.co - not from any real fishing equipment retailer. Check the address bar before tapping anything.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Scam-ad quiz ─────────────────────────────────────────────── */}
          {showSaqOverlay && (
            <div className="quiz-overlay pq-overlay">
              <div className="quiz-panel pq-panel-sb">
                {!saqAnswer && (
                  <>
                    <div className="quiz-header">WHAT DO YOU DO?</div>
                    <p className="quiz-question">Coral asks: <strong>"But what if a real competition came up as an ad? How do I know the difference?"</strong></p>
                    <div className="quiz-options">
                      {[
                        { display: 'A', id: 'A', text: 'Real competitions never advertise online, so any online ad for a competition is automatically fake.' },
                        { display: 'B', id: 'B', text: 'Open a new browser tab and search for the company name directly. If the competition is real, it will exist on their actual official website.' },
                        { display: 'C', id: 'C', text: 'Check if the ad has good grammar and looks professional - real ads look better than fake ones.' },
                      ].map(({ display, id, text }) => (
                        <div key={display} className="quiz-option" onClick={e => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : playWrong(); setSaqAnswer(id) }}>
                          <span className="quiz-option-key">{display}</span>
                          <span className="quiz-option-text">{text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {saqAnswer === 'A' && saqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Coral frowns. Old Finn shakes his head slowly.</p>
                      <p className="quiz-woman-says">Real companies do advertise online - but real competitions also appear on their actual verified website. The test is not whether an ad exists. It is whether you can find the competition yourself on the real site.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceSAQ() }}>tap to continue</div>
                  </div>
                )}

                {saqAnswer === 'B' && saqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--correct">
                      <div className="quiz-verdict">✓ CORRECT</div>
                      <p className="quiz-narrator-beat">Coral's eyes widen slightly. Old Finn nods.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceSAQ() }}>tap to continue</div>
                  </div>
                )}

                {saqAnswer === 'C' && saqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Old Finn raises an eyebrow. Coral looks uncertain.</p>
                      <p className="quiz-woman-says">Scammers know how to make things look professional. Good grammar and a polished design are easy to fake. Appearance is not a reliable test.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceSAQ() }}>tap to continue</div>
                  </div>
                )}
              </div>
            </div>
          )}
          {isSaqBSafeMove && (
            <div className="smishing-info-overlay" onClick={advanceSAQ}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">SAFE MOVE</div>
                    <div className="smishing-flag-title">GO DIRECTLY TO THE SOURCE</div>
                    <p className="smishing-flag-body">If an ad claims to be from a company you know, close the ad and go to the company's real website yourself by typing their address into the browser. If the offer is real, it will be there. If it is not there, the ad was fake.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── What to do if scammed - intro card ─────────────────────── */}
          {isScammedInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">WHAT TO DO IF YOU THINK YOU HAVE BEEN SCAMMED</div>
                    <div className="smishing-flag-title">DO NOT BE EMBARRASSED. DO NOT WAIT.</div>
                    <p className="smishing-flag-body">If you clicked a link, replied to a message, or gave away any information - and then realised it might have been a scam - there are clear steps to take. The most important thing is: do not be embarrassed and do not wait. Speed matters.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── What to do if scammed - four steps card ─────────────────── */}
          {isScammedSteps && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">SAFE MOVE: STEP 1</div>
                    <div className="smishing-flag-title">TELL A TRUSTED ADULT IMMEDIATELY</div>
                    <p className="smishing-flag-body">Tell a parent, guardian, teacher, or another adult you trust - right away. Not tomorrow. Not after you have tried to fix it yourself. Now. They can help you check what happened and what needs to be done.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">SAFE MOVE: STEP 2</div>
                    <div className="smishing-flag-title">DO NOT ENGAGE WITH THE SCAMMER</div>
                    <p className="smishing-flag-body">Do not reply to the message. Do not call the number. Do not send any more information. Even replying to say "I know this is a scam" tells them your number or email address is active and being read. Silence is safer.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">SAFE MOVE: STEP 3</div>
                    <div className="smishing-flag-title">REPORT IT</div>
                    <p className="smishing-flag-body">Most apps and platforms have a Report button. Use it. On a phone, suspicious texts can be forwarded to 7726 (which spells SPAM). On email, use Report Phishing or Report Spam. Every report helps protect other people too.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">SAFE MOVE: STEP 4</div>
                    <div className="smishing-flag-title">BLOCK THE SENDER</div>
                    <p className="smishing-flag-body">Once you have reported it, block the number or email address. It will not stop them completely - they can create new addresses - but it removes this specific route to you.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Minigame 2 instructions ──────────────────────────────────── */}
          {isMg2Instructions && (
            <div className="mg2-instructions-overlay" onClick={advanceSB}>
              <div className="mg2-instructions-panel">
                <div className="mg2-instructions-header">
                  <div className="mg2-instructions-alert">⚠</div>
                  <div className="mg2-instructions-title">DANGER ON THE SCREEN</div>
                </div>
                <p className="mg2-instructions-body">
                  Pop-up ads and suspicious notifications are going to appear on the screen, fast. Some are real and harmless. Some are scam attempts. Your job is to <strong>CLOSE</strong> the dangerous ones before any of the fishermen can tap them - and <strong>LEAVE</strong> the real ones alone.
                </p>
                <p className="mg2-instructions-body">
                  Get it wrong and a fisherman taps the scam. Get it right and they stay safe.
                </p>
                <div className="mg2-instructions-divider" />
                <div className="mg2-instructions-how-label">HOW TO PLAY</div>
                <p className="mg2-instructions-body">
                  Scam pop-ups are highlighted with a subtle warning glow at the edges - but you have to look carefully. Check the sender address, the language, and the link before deciding. Speed increases with each round. Use everything you learned from Old Finn and Coral to make the right call quickly.
                </p>
                <div className="mg2-instructions-cta">TAP ANYWHERE TO BEGIN</div>
              </div>
            </div>
          )}

          {/* ── Compass reveal ───────────────────────────────────────────── */}
          {isCompassReveal && (
            <div className="compass-reveal-overlay" onClick={advanceSB}>
              <img src={compassImg} alt="Compass" className="compass-reveal-img" />
              <div className="compass-reveal-card">
                <div className="compass-reveal-label">ITEM RECEIVED</div>
                <div className="compass-reveal-name">THE BRASS COMPASS</div>
                <p className="compass-reveal-desc">A small brass compass in a worn leather case. The needle points steadily north.</p>
                <div className="compass-reveal-inscription">
                  <span className="compass-reveal-inscription-label">On the inside of the case lid, in Mira's small neat handwriting:</span>
                  <em className="compass-reveal-quote">'It always knows which way is true. So do you, if you trust it.'</em>
                </div>
                <p className="compass-reveal-note">This is the first of three items Mira has left for you to carry safely to her. Do not let anyone take it from you.</p>
              </div>
              <div className="smishing-continue">tap anywhere to continue</div>
            </div>
          )}

          {/* Notebook reveal */}
          {isNotebookReveal && (
            <div className="compass-reveal-overlay" onClick={advanceSB}>
              <div className="compass-reveal-card">
                <div className="compass-reveal-label">ITEM COLLECTED</div>
                <div className="compass-reveal-name">MIRA'S NOTEBOOK</div>
                <p className="compass-reveal-desc">A worn leather journal, filled cover to cover with Mira's small neat handwriting. Diagrams, observations, lessons, sketches of places. Several pages are bookmarked with folded corners.</p>
                <div className="compass-reveal-inscription">
                  <span className="compass-reveal-inscription-label">This is the notebook that was in the photograph. She has been carrying it everywhere.</span>
                  <em className="compass-reveal-quote">You can read one bookmarked page now - the others will unlock as you travel.</em>
                </div>
              </div>
              <div className="smishing-continue">tap anywhere to continue</div>
            </div>
          )}

          {/* Golden Knot reveal */}
          {isKnotReveal && (
            <div className="compass-reveal-overlay" onClick={advanceSB}>
              <img src={goldenKnotImg} alt="The Golden Knot" className="compass-reveal-img knot-reveal-img" />
              <div className="compass-reveal-card">
                <div className="compass-reveal-label">ITEM COLLECTED</div>
                <div className="compass-reveal-name">THE GOLDEN KNOT</div>
                <p className="compass-reveal-desc">A small solid object, perfectly formed, warm gold in colour. It feels heavier than it looks. There is no visible beginning and no visible end - it is a knot with no loose thread, no gap, no way in.</p>
                <div className="compass-reveal-inscription">
                  <span className="compass-reveal-inscription-label">Celia turns it once between her fingers before handing it over. She says nothing about it yet.</span>
                  <em className="compass-reveal-quote">But Mira has left a note about it in the notebook.</em>
                </div>
              </div>
              <div className="smishing-continue">tap anywhere to continue</div>
            </div>
          )}

          {/* Prism reveal - Mira's item 2 */}
          {isPrismReveal && (
            <div className="compass-reveal-overlay" onClick={advanceSB}>
              <img src={prismImg} alt="Glass Prism" className="compass-reveal-img prism-reveal-img" />
              <div className="compass-reveal-card">
                <div className="compass-reveal-label">ITEM COLLECTED: Mira's Prism - Item 3 of 3</div>
                <div className="compass-reveal-name prism-reveal-name">GLASS PRISM</div>
                <p className="compass-reveal-desc">A small glass prism, perfectly clear. Hold it up to the light and it splits the beam into every colour at once.</p>
                <div className="compass-reveal-inscription">
                  <span className="compass-reveal-inscription-label">On the flat base, in tiny engraved letters:</span>
                  <em className="compass-reveal-quote">'Everything visible has a source.'</em>
                </div>
                <p className="compass-reveal-note">This is the third of three items Mira has left for you to carry safely to her. It goes in the strongbox.</p>
              </div>
              <div className="smishing-continue">tap anywhere to continue</div>
            </div>
          )}

          {/* Prism stored in strongbox */}
          {isPrismStored && (
            <PrismStoreScene onComplete={advanceSB} />
          )}

          {/* Deepfake / AI-generated image safe move card */}
          {isDeepfakeInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel profile-footprints-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">SAFE MOVE</div>
                    <div className="smishing-flag-title">IF THIS HAPPENS TO YOU OR SOMEONE YOU KNOW</div>
                    <p className="smishing-flag-body"><strong>Tell a trusted adult immediately</strong> - a parent, carer, or teacher. Do not try to handle it alone.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 8 }}>Do not share or look at the images. Report them to the platform using the report function.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 8 }}>This is not the victim's fault. What was done is wrong and illegal, and there are people who can help.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Shadow glimpse - edge of square, scary blink */}
          {isShadowGlimpse && (
            <div className="sb-shadow-reveal sb-shadow-glimpse" onClick={e => { e.stopPropagation(); advanceSB() }}>
              <div className="sb-shadow-glitch-overlay" aria-hidden="true" />
              <img src={shadowFigure} alt="" className="sb-shadow-figure sb-shadow-figure--glimpse" aria-hidden="true" />
              <p className="sb-shadow-tap">tap to continue</p>
            </div>
          )}

          {/* Shadow Man reveal */}
          {isShadowReveal && (
            <div className="sb-shadow-reveal" onClick={e => { e.stopPropagation(); advanceSB() }}>
              <div className="sb-shadow-glitch-overlay" aria-hidden="true" />
              <img src={shadowFigure} alt="" className="sb-shadow-figure" aria-hidden="true" />
              <p className="sb-shadow-tap">tap to continue</p>
            </div>
          )}

          {/* Strongbox reveal */}
          {isStrongboxReveal && (
            <div className="sb-strongbox-reveal" onClick={e => { e.stopPropagation(); advanceSB() }}>
              <img src={strongboxClosed} alt="Strongbox" className="sb-strongbox-img" />
              <p className="sb-strongbox-hint">tap to examine</p>
            </div>
          )}

          {/* Password minigame - instructions */}
          {isPasswordMinigameInstructions && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">MINIGAME P1</div>
                    <div className="smishing-flag-title">SET THE STRONGBOX PASSWORD</div>
                    <p className="smishing-flag-body">The strongbox needs a password before you leave the lighthouse. Choose your passphrase carefully - it needs to be strong enough to keep the Shadow Man out. Mira's notebook page is open for reference.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}><strong>HOW TO PLAY:</strong> Type four or more random unrelated words to create your passphrase. The game will show you a strength meter as you type - watch it respond to length, not just complexity. Avoid words related to your name, your pets, your school, or things you like. The more random and unconnected the words, the better.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to begin</div>
              </div>
            </div>
          )}

          {/* Password minigame */}
          {isPasswordMinigame && (
            <StrongboxPasswordGame onComplete={() => { playClick(); setSeabrightLine(l => l + 1) }} />
          )}

          {/* Shadow Man info card */}
          {isShadowManInfo && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">HOW THE SHADOW MAN OPERATES</div>
                    <div className="smishing-flag-title">HE FOLLOWS GAPS</div>
                    <p className="smishing-flag-body">That is all he does - but it is enough. Weak passwords are gaps. Reused passwords are gaps. Personal information left publicly visible is a gap.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}>The work you do across this journey - setting strong passwords, protecting information, understanding how scams work - is the work of closing gaps. Every gap you close is one less route for him.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Strongbox seal scene */}
          {isStrongboxSeal && (
            <StrongboxSealScene onComplete={advanceSB} />
          )}

          {/* Password lesson - length */}
          {isPasswordLessonLength && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">PASSWORD LESSON</div>
                    <div className="smishing-flag-title">LENGTH BEATS COMPLEXITY</div>
                    <p className="smishing-flag-body">A short password full of symbols - like <strong>P@ssw0rd1</strong> - looks secure but is not. It is only 9 characters, and a computer can crack it quickly.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}>A passphrase of four random unrelated words - <strong>tiger-cloud-lamp-river</strong> - is 23 characters of pure randomness. Every extra character multiplies the difficulty enormously. That is why length is the most powerful tool you have.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Password lesson - random words */}
          {isPasswordLessonRandom && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">PASSWORD LESSON</div>
                    <div className="smishing-flag-title">WHY RANDOM WORDS?</div>
                    <p className="smishing-flag-body">The words must be random - not related to you, not a phrase you know, not your favourite things. <strong>'I love football'</strong> is guessable.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}><strong>'tiger cloud lamp river'</strong> is strong because it means nothing - there is no pattern to exploit, no personal information to guess from.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Password lesson - reuse */}
          {isPasswordLessonReuse && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">PASSWORD LESSON</div>
                    <div className="smishing-flag-title">THE REUSE PROBLEM</div>
                    <p className="smishing-flag-body">Using the same password across multiple accounts feels practical - one thing to remember. But it means that if any one of those accounts is compromised, every account with that password is now vulnerable.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}>An attacker who gets into your gaming account and finds your email address will immediately try that same password on your email. If it works, they have both. Then they try it on social media. Then on anything else you have accounts for.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Password lesson - domino */}
          {isPasswordLessonDomino && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">PASSWORD LESSON</div>
                    <div className="smishing-flag-title">THE DOMINO EFFECT</div>
                    <p className="smishing-flag-body">Password reuse turns one breach into many. This is called the domino effect. One password, one account compromised, and every account it was reused on falls in sequence.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}>The answer is not a more complicated password - it is a different password for every account.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Password lesson - manager */}
          {isPasswordLessonManager && (
            <div className="smishing-info-overlay" onClick={advanceSB}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">PASSWORD LESSON</div>
                    <div className="smishing-flag-title">HOW TO MANAGE MANY PASSWORDS</div>
                    <p className="smishing-flag-body">The solution to needing different passwords for everything is a password manager - a secure app that stores all your passwords and can generate long random ones for each account. You remember one strong master passphrase (like the one you set for the strongbox) and the password manager handles the rest.</p>
                    <p className="smishing-flag-body" style={{ marginTop: 10 }}>The one password you truly need to remember is the one that opens the manager.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* Notebook page */}
          {isNotebookPage && (
            <div className="nb-page-overlay" onClick={e => { e.stopPropagation(); advanceSB() }}>
              <div className="nb-page-card">
                <div className="nb-page-heading">{sbLine.heading}</div>
                <div className="nb-page-divider" />
                <div className="nb-page-body">
                  {sbLine.lines.map((l, i) =>
                    l === '' ? <br key={i} /> : <p key={i} className="nb-page-line">{l}</p>
                  )}
                </div>
              </div>
              <div className="smishing-continue">tap anywhere to continue</div>
            </div>
          )}

          {/* ── Carol quiz ────────────────────────────────────────────────── */}
          {showBqOverlay && (
            <div className="quiz-overlay pq-overlay">
              <div className="quiz-panel pq-panel-sb">
                {!bqAnswer && (
                  <>
                    <div className="quiz-header">WHAT DO YOU DO?</div>
                    <p className="quiz-question">Coral has just told you she clicked a suspicious link three days ago, gave her harbour login on the fake page, but has been too embarrassed to tell anyone because she is the most experienced fisher in the village and feels like she should have known better. What do you say?</p>
                    <div className="quiz-options">
                      {[
                        { display: 'A', id: 'B', text: 'These scams are engineered by professionals specifically to fool experienced people. Tell a trusted person right now - three days is already a long time to wait.' },
                        { display: 'B', id: 'A', text: 'She should have known better - she is old enough to recognise a scam.' },
                        { display: 'C', id: 'C', text: 'It is probably too late to do anything after three days, so she should just be more careful in future.' },
                      ].map(({ display, id, text }) => (
                        <div key={display} className="quiz-option" onClick={e => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : playWrong(); setBqAnswer(id) }}>
                          <span className="quiz-option-key">{display}</span>
                          <span className="quiz-option-text">{text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {bqAnswer === 'A' && bqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Old Finn looks at you sharply.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceBQ() }}>tap to continue</div>
                  </div>
                )}

                {bqAnswer === 'B' && bqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--correct">
                      <div className="quiz-verdict">✓ CORRECT</div>
                      <p className="quiz-narrator-beat">Coral sits down heavily on the harbour wall.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceBQ() }}>tap to continue</div>
                  </div>
                )}

                {bqAnswer === 'C' && bqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Coral shakes her head.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceBQ() }}>tap to continue</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {isBqBSafeMove && (
            <div className="smishing-info-overlay" onClick={advanceBQ}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card smishing-flag-card--wide">
                    <div className="smishing-flag-label">SAFE MOVE</div>
                    <div className="smishing-flag-title">NEVER TOO LATE TO TELL SOMEONE</div>
                    <p className="smishing-flag-body">Three days is not ideal, but it is far better than never. The damage from embarrassment that stops you asking for help is almost always worse than the damage the scam itself caused. Tell someone.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Coral Quiz ─────────────────────────────────────────────── */}
          {showCqOverlay && (
            <div className="quiz-overlay pq-overlay">
              <div className="quiz-panel pq-panel-sb">

                {/* No answer yet - question + options */}
                {!cqAnswer && (
                  <>
                    <div className="quiz-header">WHAT DO YOU DO?</div>
                    <p className="quiz-question">You are helping Coral explain this to three other fishermen who received similar messages. One of them crosses his arms and says: <strong>"But what if it HAD been real? What if I had ignored a real emergency?"</strong></p>
                    <div className="quiz-options">
                      {[
                        { display: 'A', id: 'A', text: 'He has a point - it is better to respond to everything just in case.' },
                        { display: 'B', id: 'B', text: 'Explain that the way to check a real emergency is to contact the coastguard yourself on their official number, not by replying to the message.' },
                        { display: 'C', id: 'C', text: 'Tell him that if he is not sure, he should ask an adult.' },
                      ].map(({ display, id, text }) => (
                        <div key={display} className="quiz-option" onClick={e => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : id === 'A' ? playWrong() : playPartial(); setCqAnswer(id) }}>
                          <span className="quiz-option-key">{display}</span>
                          <span className="quiz-option-text">{text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Answer A - INCORRECT (step 0 only; step 1 = CORAL dialogue bubble) */}
                {cqAnswer === 'A' && cqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--wrong">
                      <div className="quiz-verdict">✗ INCORRECT</div>
                      <p className="quiz-narrator-beat">Coral nods, satisfied at first, then uncertain. Old Finn shakes his head slowly.</p>
                      <p className="quiz-woman-says">Responding to everything just in case is exactly what scammers count on. They only need one person in a hundred to bite. There is a better approach.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceCQ() }}>tap to continue</div>
                  </div>
                )}

                {/* Answer B - CORRECT (step 0 = verdict; steps 1-2 = dialogue bubbles; step 3 = remember card) */}
                {cqAnswer === 'B' && (cqStep === 0 || cqStep === 3) && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--correct">
                      <div className="quiz-verdict">✓ CORRECT</div>
                      {cqStep === 0 && (
                        <p className="quiz-narrator-beat">Coral uncrosses her arms. Old Finn raises an eyebrow at her. She had not thought of it quite like that either.</p>
                      )}
                      {cqStep === 3 && (
                        <div className="quiz-remember">
                          <div className="quiz-remember-label">SAFE MOVE: VERIFY THROUGH YOUR OWN CHANNEL</div>
                          <p className="quiz-remember-body">If a message claims there is an emergency, do not use any contact details or links from that message. Find the official number yourself - from a website you know, a saved contact, or a printed card - and call that. If the emergency is real, you will reach them. If it was fake, you have given the scammer nothing.</p>
                        </div>
                      )}
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceCQ() }}>tap to continue</div>
                  </div>
                )}

                {/* Answer C - PARTIALLY RIGHT (step 0 only; step 1 = [YOUR NAME] dialogue bubble) */}
                {cqAnswer === 'C' && cqStep === 0 && (
                  <div className="quiz-result">
                    <div className="quiz-feedback quiz-feedback--partial">
                      <div className="quiz-verdict quiz-verdict--partial">~ PARTIALLY RIGHT</div>
                      <p className="quiz-narrator-beat">Coral nods slowly. Old Finn strokes his beard. She is not entirely convinced.</p>
                    </div>
                    <div className="smishing-continue" style={{ padding: '10px 22px', cursor: 'pointer' }} onClick={e => { e.stopPropagation(); advanceCQ() }}>tap to continue</div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* ── Coral quiz B step 3 - remember card (full-screen, like quiz A info card) ── */}
          {isCqBRemember && (
            <div className="smishing-info-overlay" onClick={advanceCQ}>
              <div className="smishing-info-panel">
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">SAFE MOVE</div>
                    <div className="smishing-flag-title">VERIFY THROUGH YOUR OWN CHANNEL</div>
                    <p className="smishing-flag-body">If a message claims there is an emergency, do not use any contact details or links from that message. Find the official number yourself - from a website you know, a saved contact, or a printed card - and call that. If the emergency is real, you will reach them. If it was fake, you have given the scammer nothing.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to continue</div>
              </div>
            </div>
          )}

          {/* ── Real or Fake minigame ────────────────────────────────── */}
          {isRealOrFake && (
            <RealOrFakeGame onComplete={advanceSB} />
          )}

          {isMinigame2 && (
            <PopupGame onComplete={advanceSB} />
          )}

          {isPictureTestGame && (
            <PictureTestGame onComplete={advanceSB} />
          )}

          {isEditBeforePostGame && (
            <EditBeforeYouPost onComplete={advanceSB} />
          )}

        </div>
      </div>
    )
  }

  // Home view
  if (view === 'landing') {
    const freshSaveLanding = (() => { try { return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null') || {} } catch { return {} } })()
    const freshViewLanding = freshSaveLanding.view
    const freshSafeViewLanding = ['story','story-classic','story-observatory','seabright','phish','analyzer','chest','start-name','start-reveal','start-opener','start-bedroom','outro','doorway','departure','name-entry'].includes(freshViewLanding) ? freshViewLanding : 'home'
    const hasSavedProgress = freshSafeViewLanding !== 'home'
    return (
      <div className="landing-root">
        <div className="landing-content">
          <h1 className="landing-title">When Mira Calls</h1>
          <p className="landing-sub">A digital mystery.</p>
          {hasSavedProgress && (
            <button
              className="landing-enter-btn landing-continue-btn"
              onClick={() => { playClick(); setView(freshSafeViewLanding) }}
            >
              Continue
            </button>
          )}
          <button
            className="landing-enter-btn"
            onClick={() => { playClick(); setView('home') }}
          >
            {hasSavedProgress ? 'Main Menu' : 'Enter'}
          </button>
        </div>
      </div>
    )
  }

  if (view === 'home') {
    // Read localStorage directly - bypass the _savedOnce cache which may be stale
    const freshSave = (() => { try { return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null') || {} } catch { return {} } })()
    const freshView = freshSave.view
    const freshAllowed = loadDemoModeFlag() || !['story-observatory', 'demo'].includes(freshView)
    const freshSafeView = ['story','story-classic','story-observatory','seabright','phish','analyzer','chest','start-name','start-reveal','start-opener','start-bedroom','outro','doorway','departure','name-entry'].includes(freshView) && freshAllowed ? freshView : 'home'
    const hasSaved = freshSafeView !== 'home'
    return (
      <div className="landing-root">
        <button
          className="home-mute-btn"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          onClick={() => setIsMuted(m => !m)}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
        <div className="home-bg-items" aria-hidden="true">
          <img src={compassImg}    className="home-bg-item home-bg-item--compass-1" alt="" />          {/* top-left */}
          <img src={prismImg}      className="home-bg-item home-bg-item--prism-1 home-bg-item--glow" alt="" />  {/* top-right */}
          <img src={goldenKnotImg} className="home-bg-item home-bg-item--knot-3"    alt="" />          {/* top-center */}
          <img src={compassImg}    className="home-bg-item home-bg-item--compass-3" alt="" />          {/* upper-mid-left */}
          <img src={prismImg}      className="home-bg-item home-bg-item--prism-2"   alt="" />          {/* mid-right */}
          <img src={goldenKnotImg} className="home-bg-item home-bg-item--knot-1 home-bg-item--glow" alt="" />   {/* mid-left */}
          <img src={compassImg}    className="home-bg-item home-bg-item--compass-2" alt="" />          {/* lower-right */}
          <img src={prismImg}      className="home-bg-item home-bg-item--prism-3"   alt="" />          {/* lower-mid-left */}
          <img src={goldenKnotImg} className="home-bg-item home-bg-item--knot-2 home-bg-item--glow" alt="" />   {/* bottom-center */}
          <img src={prismImg}      className="home-bg-item home-bg-item--prism-4"   alt="" />          {/* lower-right */}
        </div>
        <div className="landing-content">
          <img src={wmcLogoImg} alt="" className="home-wmc-logo" />
          <h1 className="landing-title">When Mira Calls</h1>
          <p className="landing-sub">A digital mystery.</p>

          {hasSaved && (
            <button
              className="landing-enter-btn landing-continue-btn"
              onClick={() => {
                playClick()
                setDemoMode(false)
                setDemoModeFlag(false)
                setShowDevConsole(false)
                // Restore full save state from localStorage so dev console jumps don't bleed in
                if (freshSave.playerName)         setPlayerName(freshSave.playerName)
                if (freshSave.seabrightLine != null) setSeabrightLine(freshSave.seabrightLine)
                if (freshSave.lineIndex != null)  setLineIndex(freshSave.lineIndex)
                if (freshSave.startBedroomLine != null) setStartBedroomLine(freshSave.startBedroomLine)
                // Reset showTitle: pre-bedroom views haven't shown the title card yet; everything after has
                const preTitleViews = ['start-name','start-reveal','start-opener','start-bedroom']
                setShowTitle(!preTitleViews.includes(freshSafeView))
                setView(freshSafeView)
              }}
            >
              CONTINUE
            </button>
          )}

          <button
            className="landing-enter-btn"
            onClick={() => {
              playClick()
              if (hasSaved) { setShowNewGameConfirm(true) }
              else { resetAudioForNewGame(); setStartBedroomLine(0); setPhotoZooming(false); setPhotoShook(false); setShowBedroomLetter(false); setIsFullPlaythrough(true); setDemoMode(false); setDemoModeFlag(false); setStartNameInput(''); setPlayerNameInput(''); setShowDevConsole(false); setView('start-name') }
            }}
          >
            NEW GAME
          </button>

          <button
            className="landing-enter-btn landing-dev-toggle"
            onClick={() => { playClick(); setShowGuides(true) }}
          >
            GUIDES
          </button>

          <button
            className="landing-enter-btn landing-dev-toggle landing-dev-toggle--chapters"
            onClick={() => { playClick(); setShowDevConsole(v => !v) }}
          >
            {showDevConsole ? '▲ CHAPTERS' : '▼ CHAPTERS'}
            <svg className="dev-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
          </button>

          {showDevConsole && (() => {
            const base = (fn) => () => {
              playClick(); setPlayerName('Dev'); setIsFullPlaythrough(false); setShowDevConsole(false); setDevExpandedChapter(null); fn()
            }
            // Chapter 1: intro → main flow (reset audio to beginning, but first save real-game position)
            const ch1 = (fn) => base(() => {
              if (mainGamePositionRef.current === null && mainAudioRef.current) {
                mainGamePositionRef.current = mainAudioRef.current.currentTime
              }
              resetAudioForNewGame()
              setPhotoZooming(false); setPhotoShook(false); setShowBedroomLetter(false)
              fn()
            })
            // Chapters 2–5 + minigames: jump straight into main at a chapter-specific offset
            const ch  = (offset) => (fn) => base(() => { startChapterAudio(offset); fn() })
            // Seabright nav helpers per chapter
            const sb1      = (line) => ch1(() => { setSeabrightLine(line); setView('seabright') })
            const sb2      = (line) => ch(54)(() => { setSeabrightLine(line); setView('seabright') })
            const sb3      = (line) => ch(343)(() => { setSeabrightLine(line); setView('seabright') })
            const sb4      = (line) => ch(690)(() => { setSeabrightLine(line); setView('seabright') })
            const obs      = (idx)  => ch(1240)(() => { setLineIndex(idx); setTypedLength(0); setIsObservatoryShaking(false); setView('story-observatory') })
            const toggleChapter = (ch) => setDevExpandedChapter(prev => prev === ch ? null : ch)
            const DEV_CHAPTERS = [
              {
                num: 'I', title: 'A Letter from Nowhere', img: bedroomImg,
                start: ch1(() => { setStartBedroomLine(0); goToChapter({ number: 'I', title: 'A Letter from Nowhere' }, 'start-bedroom') }),
                subs: [
                  { label: 'Bedroom — the letter arrives', fn: ch1(() => { setStartBedroomLine(0); setView('start-bedroom') }) },
                ]
              },
              {
                num: 'II', title: 'SeaBright Ahoy!', img: seabrightHarbour,
                start: ch(54)(() => goToChapter({ number: 'II', title: 'SeaBright Ahoy!' }, 'seabright-0')),
                subs: [
                  { label: 'Harbour arrival — meeting Old Finn', fn: sb2(0) },
                  { label: 'Old Finn\'s phishing email', fn: sb2(8) },
                  { label: 'Meeting Coral — smishing text', fn: sb2(28) },
                  { label: 'Real or Fake? minigame', fn: sb2(47) },
                  { label: 'Scam ad on the village computer', fn: sb2(53) },
                  { label: 'Spot the Scam Bot minigame', fn: sb2(94) },
                ]
              },
              {
                num: 'III', title: 'Into The Lighthouse', img: lighthouseInt,
                start: ch(343)(() => goToChapter({ number: 'III', title: 'Into The Lighthouse' }, 'seabright-113')),
                subs: [
                  { label: 'Cliff path to the lighthouse', fn: sb3(112) },
                  { label: 'At the lighthouse door — meeting Celia', fn: sb3(116) },
                  { label: 'Strongbox reveal', fn: sb3(137) },
                  { label: 'Password Challenge minigame', fn: sb3(153) },
                  { label: 'Leaving the lighthouse', fn: sb3(170) },
                ]
              },
              {
                num: 'IV', title: 'Echoes in the Sunshare Square', img: sunshareSquare,
                start: ch(690)(() => goToChapter({ number: 'IV', title: 'Echoes in the Sunshare Square' }, 'seabright-176')),
                subs: [
                  { label: 'Sunshare Square arrival', fn: sb4(176) },
                  { label: 'Priya\'s story — digital footprint', fn: sb4(188) },
                  { label: 'The Picture Test minigame', fn: sb4(199) },
                  { label: 'Password reuse lessons', fn: sb4(246) },
                  { label: 'Edit Before You Post minigame', fn: sb4(263) },
                  { label: 'Cyberbullying — Priya\'s phone', fn: sb4(268) },
                  { label: 'Deepfake — Amara\'s story', fn: sb4(297) },
                ]
              },
              {
                num: 'V', title: 'At the Edge of the Sky', img: observatoryExt,
                start: ch(1240)(() => goToChapter({ number: 'V', title: 'At the Edge of the Sky' }, 'observatory')),
                subs: [
                  { label: 'Observatory arrival',                     fn: obs(0)  },
                  { label: 'The two women appear',                    fn: obs(12) },
                  { label: 'Smishing screen',                         fn: obs(23) },
                  { label: 'Vishing screen',                          fn: obs(31) },
                  { label: 'MFA lesson',                              fn: obs(44) },
                  { label: 'The locked room',                         fn: obs(46) },
                  { label: 'The final game',                          fn: obs(68) },
                ]
              },
            ]
            return (
              <div className="landing-dev-console">
                <div className="landing-dev-group">
                  <span className="landing-dev-label">CHAPTERS</span>
                  {DEV_CHAPTERS.map(ch => (
                    <div key={ch.num} className="landing-dev-chapter">
                      <div className="landing-dev-chapter-row">
                        <button className="landing-dev-btn landing-dev-btn--chapter" onClick={ch.start}>
                          {ch.num} - {ch.title}
                        </button>
                        {ch.subs.length > 0 && (
                          <button className="landing-dev-expand" onClick={() => toggleChapter(ch.num)}>
                            {devExpandedChapter === ch.num ? '▲' : '▼'}
                          </button>
                        )}
                        {ch.img && <img className="dev-chapter-thumb" src={ch.img} alt={ch.title} />}
                      </div>
                      {devExpandedChapter === ch.num && (
                        <div className="landing-dev-subs">
                          {ch.subs.map(sub => (
                            <button key={sub.label} className="landing-dev-btn landing-dev-btn--sub" onClick={sub.fn}>
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="landing-dev-group">
                  <span className="landing-dev-label">MINIGAMES</span>
                  <button className="landing-dev-btn" onClick={sb2(47)}>Seabright: Real or Fake?</button>
                  <button className="landing-dev-btn" onClick={sb2(94)}>Seabright: Spot the Scam Bot</button>
                  <button className="landing-dev-btn" onClick={sb3(153)}>Lighthouse: Password Challenge</button>
                  <button className="landing-dev-btn" onClick={sb4(199)}>Sunshare: The Picture Test</button>
                  <button className="landing-dev-btn" onClick={sb4(263)}>Sunshare: Edit Before You Post</button>
                </div>
              </div>
            )
          })()}
        </div>

        {showNewGameConfirm && (
          <div className="ng-confirm-overlay" onClick={() => { playBack(); setShowNewGameConfirm(false) }}>
            <div className="ng-confirm-box" onClick={e => e.stopPropagation()}>
              <p className="ng-confirm-title">Start a new game?</p>
              <p className="ng-confirm-body">All your current progress will be lost and cannot be recovered.</p>
              <div className="ng-confirm-actions">
                <button
                  className="ng-confirm-btn ng-confirm-btn--confirm"
                  onClick={() => {
                    playClick()
                    clearProgress()
                    resetAudioForNewGame()
                    setStartBedroomLine(0)
                    setPhotoZooming(false)
                    setPhotoShook(false)
                    setShowBedroomLetter(false)
                    setShowNewGameConfirm(false)
                    setIsFullPlaythrough(true)
                    setDemoMode(false)
                    setDemoModeFlag(false)
                    setStartNameInput('')
                    setPlayerNameInput('')
                    setShowDevConsole(false)
                    setView('start-name')
                  }}
                >
                  Start New Game
                </button>
                <button
                  className="ng-confirm-btn ng-confirm-btn--cancel"
                  onClick={() => { playBack(); setShowNewGameConfirm(false) }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Demo / user-test flow ─────────────────────────────────────
  const goToDemoHome = () => { playBack(); setView(DEMO_ONLY ? 'demo-home' : 'home') }

  if (view === 'demo-home') {
    const hasSaved = (() => { try { return Boolean(JSON.parse(localStorage.getItem(DEMO_SAVE_KEY) || 'null')?.playerName) } catch { return false } })()
    return (
      <div className="demo-root demo-root--home">
        <div className="demo-panel demo-panel--home">
          <div className="demo-badge">USER TEST DEMO</div>
          <h1 className="demo-home-title">When Mira Calls</h1>
          <p className="demo-home-sub">A digital mystery.</p>
          <div className="demo-home-actions">
            <button
              className="demo-home-btn demo-home-btn--new"
              onClick={() => {
                playClick()
                clearDemoProgress()
                setDemoModeFlag(true)
                setDemoMode(true)
                setDemoStep('obs')
                setLineIndex(0)
                setPlayerName('')
                setPlayerNameInput('')
                setView('name-entry')
              }}
            >
              NEW GAME
            </button>
            {hasSaved && (
              <button
                className="demo-home-btn demo-home-btn--continue"
                onClick={() => {
                  let dp = null
                  try { dp = JSON.parse(localStorage.getItem(DEMO_SAVE_KEY) || 'null') } catch {}
                  if (!dp) return
                  playClick()
                  setPlayerName(dp.playerName ?? '')
                  setLineIndex(dp.lineIndex ?? 0)
                  setDemoStep(dp.demoStep ?? 'obs')
                  const safeView = ['story-observatory', 'demo'].includes(dp.view) ? dp.view : 'story-observatory'
                  setView(safeView)
                }}
              >
                CONTINUE
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (view === 'demo') {
    if (demoStep === 'context') {
      return (
        <div className="demo-root">
          <button className="demo-home-link" onClick={goToDemoHome}>⌂ Home</button>
          <div className="demo-panel">
            <div className="demo-badge">REAL OR FAKE? - MINIGAME</div>
            <h2 className="demo-heading">Now it is your turn.</h2>
            <p className="demo-body">
              You have just seen how the Shadow Man targeted the people of Seabright - phishing emails, fake domains, urgent language designed to panic rather than inform.
            </p>
            <p className="demo-body">
              Below are five messages - emails and texts - just like the ones the fishermen received. Your job is to decide: is each one real, or fake? Look at the sender address and the link. The name can be copied. The domain cannot be faked perfectly.
            </p>
            <button className="demo-start-btn" onClick={() => { playClick(); setDemoStep('game') }}>START MINIGAME →</button>
          </div>
        </div>
      )
    }
    if (demoStep === 'game') {
      return (
        <>
          <button className="demo-home-link demo-home-link--orf" onClick={goToDemoHome}>⌂ Home</button>
          <RealOrFakeGame onComplete={() => { playCardIn(); setDemoStep('thanks') }} />
        </>
      )
    }
    if (demoStep === 'thanks') {
      return (
        <div className="demo-root">
          <div className="demo-panel">
            <div className="demo-badge">USER TEST - COMPLETE</div>
            <h2 className="demo-heading">Thank you for playing.</h2>
            <p className="demo-body">
              Your time and feedback help us build a better experience for young people learning to stay safe online.
            </p>
            <p className="demo-body">
              If you have notes or observations, please share them with the team. Every detail helps.
            </p>
            <p className="demo-body demo-body--sig">- The When Mira Calls Team</p>
            <button className="demo-start-btn" onClick={() => { clearDemoProgress(); goToDemoHome() }}>← Back to Home</button>
          </div>
        </div>
      )
    }
  }

  // Phishing game view
  if (view === 'phish') {
    return (
      <div className="game-root">
        <div className="stage">
          {showGlobalBack && <button className="back-link" onClick={() => { playBack(); setView('home') }}>← Back</button>}
          <PhishGame onExit={() => setView('home')} />
        </div>
      </div>
    )
  }

  // Starting sequence - name entry
  if (view === 'start-name') {
    const confirm = () => {
      if (!startNameInput.trim()) return
      playClick()
      setStartName(startNameInput.trim())
      setPlayerName(startNameInput.trim())
      setView('start-reveal')
    }
    return (
      <div className="game-root start-name-root">
        <div className="start-name-screen">
          <p className="start-name-label">Every good adventure starts with a name.</p>
          <p className="start-name-sublabel">The whole world is about to know yours.</p>
          <input
            className="name-entry-input"
            type="text"
            placeholder="Enter your name"
            value={startNameInput}
            onChange={e => setStartNameInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') confirm() }}
            autoFocus
          />
          <button className="name-entry-btn" disabled={!startNameInput.trim()} onClick={confirm}>
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // Starting sequence - name reveal
  if (view === 'start-reveal') {
    return (
      <div className="game-root start-reveal-root" onClick={() => { playClick(); setStartBedroomLine(0); setView('start-opener') }}>
        <div className="start-reveal-screen">
          <p className="start-reveal-name">{startName}</p>
          <p className="start-reveal-hello">Hello, {startName}.</p>
          <p className="start-reveal-sub">Your adventure starts now.</p>
        </div>
      </div>
    )
  }

  // Starting sequence - atmospheric opener (black screen)
  if (view === 'start-opener') {
    return (
      <div className="game-root start-opener-root" onClick={() => { playClick(); setView('instructions') }}>
        <div className="start-opener-screen">
          <p className="start-opener-text">
            Somewhere, in a house full of maps and curiosities and one very large cat, a Saturday morning is about to get much more interesting than usual.
          </p>
        </div>
      </div>
    )
  }

  // Starting sequence - bedroom narration
  if (view === 'start-bedroom') {
    const atLast = startBedroomLine >= BEDROOM_LINES.length - 1
    const envelopeFromLine = BEDROOM_LINES.findIndex(l => l.showEnvelope)
    const choiceFromLine = BEDROOM_LINES.findIndex(l => l.isChoice)
    const showBedroomEnvelope = envelopeFromLine >= 0 && startBedroomLine >= envelopeFromLine && startBedroomLine <= choiceFromLine
    const currentLine = BEDROOM_LINES[startBedroomLine]
    const isBedroomDialogue = Boolean(currentLine.speaker)
    const isBedroomChoice = Boolean(currentLine.isChoice)
    const isWaitForLetter = Boolean(currentLine.waitForLetter)
    const isBedroomBlank = Boolean(currentLine.showBlank)
    const isPhotoScene = Boolean(currentLine.showPhotoScene)
    const photoPhase = currentLine.photoPhase || null
    const blockRootClick = isBedroomDialogue || isBedroomChoice || isWaitForLetter || isBedroomBlank || isPhotoScene

    // past narrator-only lines (no speaker, no choice), up to 3 shown faded
    const pastNarratorLines = BEDROOM_LINES
      .slice(0, startBedroomLine)
      .map((l, i) => ({ ...l, origIdx: i }))
      .filter(l => !l.speaker && !l.isChoice && !l.isSelectedChoice && !l.waitForLetter && l.text)
      .slice(-3)

    const advanceBedroom = () => {
      playClick()
      if (atLast) { isFullPlaythrough ? (setOutroLine(0), setView('outro')) : setView('home'); return }
      setPhotoShook(false)
      setShowTitle(false)
      setStartBedroomLine(l => {
        const next = l + 1
        if (BEDROOM_LINES[next]?.isSelectedChoice) return next + 1
        return next
      })
    }

    const goBackBedroom = () => {
      playBack()
      setPhotoShook(false)
      setPhotoZooming(false)
      setShowTitle(false)
      setStartBedroomLine(l => {
        const prev = Math.max(0, l - 1)
        if (BEDROOM_LINES[prev]?.isSelectedChoice) return Math.max(0, prev - 1)
        if (BEDROOM_LINES[prev]?.photoPhase === 'wait') return Math.max(0, prev - 1)
        return prev
      })
    }

    const closeLetter = () => {
      setShowBedroomLetter(false)
      if (isWaitForLetter) advanceBedroom()
      else playClick()
    }

    return (
      <div
        className="game-root start-bedroom-root"
        style={{ backgroundImage: `url(${bedroomImg})` }}
        onClick={blockRootClick ? undefined : advanceBedroom}
      >
        <div className={`start-bedroom-screen${isPhotoScene ? ' start-bedroom-screen--photo' : ''}`}>
          {/* Letter overlay */}
          {showBedroomLetter && (
            <div className="letter-backdrop" onClick={closeLetter}>
              <div className="letter-paper" onClick={e => e.stopPropagation()}>
                <div className="letter-body">
                  <p className="letter-salutation">Hello, {resolveName('[PLAYER NAME]')}.</p>
                  <p>I expect this is a bit of a surprise.</p>
                  <p>I am your Aunt Mira. I know - you probably had no idea you had one. That is not your fault. It is a long story, and I promise I will explain everything properly when you find me.</p>
                  <p>Which is the point of this letter: I need you to come and find me. It is important. More important than I can put in a letter.</p>
                  <p>I have not given you my address. That is deliberate - I cannot write it down right now. But I have left you a way to find me. You just need to look at something you have already seen.</p>
                  <p>Along the way, people will give you things that belong to me. Keep them safe. Every single one. Do not let anyone take them from you. I will need them when you arrive.</p>
                  <p>I am very much looking forward to finally meeting you properly.</p>
                  <div className="letter-sign-block">
                    <span className="letter-sign-dash">-</span>
                    <span className="letter-signature">Aunt Mira</span>
                  </div>
                  <p className="letter-ps"><span className="letter-ps-label">P.S.</span> Give Biscuit a scratch behind the ears from me. He will pretend not to enjoy it. He will enjoy it.</p>
                </div>
                <button className="letter-close" onClick={closeLetter} aria-label="close letter">
                  tap anywhere to close
                </button>
              </div>
            </div>
          )}

          {/* Envelope - appears when post is mentioned, tap to read letter */}
          <div
            className={`bedroom-envelope${showBedroomEnvelope ? ' bedroom-envelope--visible' : ''}`}
            onClick={showBedroomEnvelope ? (e) => { e.stopPropagation(); playCardIn(); setShowBedroomLetter(true) } : undefined}
            style={showBedroomEnvelope ? { pointerEvents: 'auto', cursor: 'pointer' } : undefined}
          >
            <div className="bedroom-envelope__flap" />
            <div className="bedroom-envelope__body">
              <div className="bedroom-envelope__address">
                <span className="bedroom-envelope__to">{resolveName('[YOUR NAME]')}</span>
                <span className="bedroom-envelope__line" />
                <span className="bedroom-envelope__line bedroom-envelope__line--short" />
              </div>
              <div className="bedroom-envelope__stamp">
                <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
                  <rect width="32" height="32" fill="#b8d4e8" rx="1" />
                  <rect y="22" width="32" height="10" fill="#4a7fa5" />
                  <rect x="13" y="8" width="6" height="14" fill="#f5f0e8" />
                  <rect x="13" y="10" width="6" height="2" fill="#c0392b" />
                  <rect x="13" y="14" width="6" height="2" fill="#c0392b" />
                  <rect x="13" y="18" width="6" height="2" fill="#c0392b" />
                  <rect x="12" y="5" width="8" height="4" fill="#e8c840" rx="1" />
                  <circle cx="16" cy="7" r="2" fill="#fff8c0" opacity="0.9" />
                  <rect x="11" y="22" width="10" height="2" fill="#d5cfc0" />
                </svg>
              </div>
            </div>
          </div>

          {isWaitForLetter && !showBedroomLetter && (
            <div className="bedroom-envelope-hint">tap the envelope to open it</div>
          )}

          {currentLine.showBookshelf && (
            <img
              src={bookshelUnselected}
              alt="bookshelf"
              className="bedroom-bookshelf"
              onMouseEnter={e => { e.currentTarget.src = bookshelfSelected }}
              onMouseLeave={e => { e.currentTarget.src = bookshelUnselected }}
              onClick={isBedroomBlank ? e => { e.stopPropagation(); advanceBedroom() } : undefined}
            />
          )}

          {/* Aunt Mira photograph scene */}
          {isPhotoScene && (
            <div
              className={`bedroom-photo-wrap${photoZooming ? ' bedroom-photo-wrap--zooming' : ''}`}
              onAnimationEnd={photoZooming ? e => { if (e.animationName === 'photo-cinematic-zoom') setShowTitle(true) } : undefined}
            >
              <img
                src={miraPhoto}
                alt="Aunt Mira photograph"
                className={`bedroom-photo${photoShook ? ' bedroom-photo--shake' : ''}`}
                onClick={photoPhase === 'wait' && !photoShook
                  ? e => { e.stopPropagation(); playReveal(); setPhotoShook(true) }
                  : photoPhase === 'zoomWait'
                  ? e => { e.stopPropagation(); playReveal(); setPhotoZooming(true) }
                  : undefined
                }
                onAnimationEnd={photoShook && photoPhase === 'wait'
                  ? e => { e.stopPropagation(); advanceBedroom() }
                  : undefined
                }
              />
              {photoPhase === 'wait' && !photoShook && (
                <div className="bedroom-photo-hint">tap the photograph</div>
              )}
              {photoPhase === 'zoomWait' && (
                <div className="bedroom-photo-hint">tap to continue</div>
              )}
            </div>
          )}

          {isBedroomChoice ? (
            <div className="quiz-overlay quiz-overlay--bedroom">
              <div className="quiz-panel">
                <div className="quiz-header">{currentLine.prompt}</div>
                <p className="quiz-question">{currentLine.sub}</p>
                <div className="quiz-options">
                  {currentLine.options.map((opt) => (
                    <div
                      key={opt.label}
                      className="quiz-option"
                      onClick={e => {
                        e.stopPropagation()
                        if (opt.path === 'blank') {
                          const blankIdx = BEDROOM_LINES.findIndex(l => l.showBlank)
                          setStartBedroomLine(blankIdx)
                        } else {
                          advanceBedroom()
                        }
                      }}
                    >
                      <span className="quiz-option-key">{opt.label}</span>
                      <span className="quiz-option-text">{opt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : isBedroomDialogue ? (
            <div className="bubble-tail-container observatory-bubble-wrap">
              <div className="bubble">
                <div className="nameplate">{resolveName(currentLine.speaker)}</div>
                <div className="bubble-inner" onClick={advanceBedroom}>
                  <div className="bubble-line">{resolveName(currentLine.text)}</div>
                  <div className="dialogue-controls">
                    <button className="back-inline" aria-label="previous"
                      onClick={e => { e.stopPropagation(); goBackBedroom() }}>
                      <img src={backArrow} alt="back" />
                    </button>
                    <button className="next-btn" aria-label="next"
                      onClick={e => { e.stopPropagation(); advanceBedroom() }}>
                      <img src={nextArrow} alt="next" />
                    </button>
                  </div>
                </div>
              </div>
              <svg className="bubble-tail" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" fill="rgba(18,18,18,0.86)">
                <path d="M 140 -16 Q 140 160  224 140 140 140  160 -16" />
              </svg>
            </div>
          ) : isWaitForLetter || isBedroomBlank || (isPhotoScene && !currentLine.text && !currentLine.speaker) ? null : (
          <div className="narrator-overlay">
            <div className="narrator-lines">
              {pastNarratorLines.map((lineObj, i) => {
                const dist = pastNarratorLines.length - i
                const sideClass = `narrator-text--${lineObj.origIdx % 2 === 0 ? 'left' : 'right'}`
                return (
                  <p key={lineObj.origIdx} className={`narrator-text narrator-text--past-${dist} ${sideClass}`}>
                    {resolveName(lineObj.text)}
                  </p>
                )
              })}
              <p className={`narrator-text narrator-text--current narrator-text--${startBedroomLine % 2 === 0 ? 'left' : 'right'}`}>
                {resolveName(currentLine.text)}
              </p>
            </div>
            <div className="narrator-controls">
              <button className="narrator-back" aria-label="previous"
                onClick={e => { e.stopPropagation(); goBackBedroom() }}>
                <img src={backArrow} alt="back" />
              </button>
              <button className="narrator-next" aria-label="next"
                onClick={e => { e.stopPropagation(); advanceBedroom() }}>
                <img src={nextArrow} alt="next" />
              </button>
            </div>
          </div>
          )}

          {/* CyberSafe title overlay - appears after photo fills screen */}
          {showTitle && (
            <div
              className="cybersafe-title-overlay"
              style={titleClickable ? { cursor: 'pointer' } : { cursor: 'default', pointerEvents: 'none' }}
              onClick={titleClickable ? () => setView('outro') : undefined}
            >
              <div className="cybersafe-title-vignette" />
              <div className="cybersafe-title-content">
                <h1 className="cybersafe-title-headline">When Mira Calls</h1>
                <h2 className="cybersafe-title-sub">a digital mystery</h2>
                <p className="cybersafe-title-tagline">Written, Drawn and Developed by students at UC Berkeley</p>
                {titleClickable && <div className="cybersafe-title-press">- tap to continue -</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Name entry screen (before observatory)
  if (view === 'name-entry') {
    return (
      <div className="game-root" style={{ background: '#080e1a' }}>
        {(DEMO_ONLY || demoMode) && <button className="demo-home-link" onClick={goToDemoHome}>⌂ Home</button>}
        <div className="name-entry-screen">
          <p className="name-entry-label">Before you begin - what is your name?</p>
          <input
            className="name-entry-input"
            type="text"
            placeholder="Enter your name"
            value={playerNameInput}
            onChange={e => setPlayerNameInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && playerNameInput.trim()) {
                playClick()
                setPlayerName(playerNameInput.trim())
                setLineIndex(0)
                setTypedLength(0)
                setIsObservatoryShaking(false)
                setView('story-observatory')
              }
            }}
            autoFocus
          />
          <button
            className="name-entry-btn"
            disabled={!playerNameInput.trim()}
            onClick={() => {
              playClick()
              setPlayerName(playerNameInput.trim())
              setLineIndex(0)
              setTypedLength(0)
              setIsObservatoryShaking(false)
              setView('story-observatory')
            }}
          >
            Begin →
          </button>
        </div>
      </div>
    )
  }

  // Text analyzer game view
  if (view === 'analyzer') {
    return (
      <div className="game-root">
        <div className="stage">
          {showGlobalBack && <button className="back-link" onClick={() => { playBack(); setView('home') }}>← Back</button>}
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
          {showGlobalBack && <button className="back-link" onClick={() => { playBack(); setView('home') }}>← Back</button>}
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
        {(DEMO_ONLY || demoMode) && <button className="demo-home-link" onClick={goToDemoHome}>⌂ Home</button>}
        <div className="obs-bg-fade" style={{ opacity: obsBgBlack ? 1 : 0 }} aria-hidden="true" />
        {showWhiteBackground && <div className="obs-white-overlay" aria-hidden="true" />}
        <div className={`stage observatory-stage ${isObservatoryShaking ? 'observatory-shaking' : ''}`}>
          <div className={`observatory-blackout ${observatoryLine?.blackout ? 'active' : ''}`} aria-hidden="true" />
          {hideObservatoryBubble && !showWhiteBackground && !showFinalGame && !showStrongboxScene && !showStrongboxCard && !showTrailRetreat && !showGameEnd && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 5, cursor: 'pointer' }} onClick={handleStoryNext} aria-label="tap to continue" />
          )}
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
                    <span className="smishing-title">SMISHING MESSAGE - INTERCEPTED</span>
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
                  <p className="smishing-info-body">Smishing is phishing by text message. Like email phishing, it uses fake senders and urgent language to trick you into clicking a link or giving away information. What makes smishing particularly dangerous is personalisation - when an attacker has gathered your personal information from public sources, they can make a fake text sound like it genuinely comes from someone or something that knows you. The text feels real because the details in it are real. But the request is always the red flag.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">REQUEST FOR YOUR PASSWORD BY TEXT</div>
                    <p className="smishing-flag-body">No school, gaming platform, bank, or organisation will ever ask for your password in a text message. Ever. A text asking for your password is a scam regardless of how official it looks or how much it already knows about you.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">URGENCY - ONE HOUR DEADLINE</div>
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
                <img src={consolScreenBlue} className="smishing-console-img" alt="" aria-hidden="true" />
                <div className="vishing-panel">
                  <div className="vishing-header">
                    <span className="vishing-rec" aria-hidden="true">⏺</span>
                    <span className="vishing-title">VISHING CALL - RECORDED</span>
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
                      'Good afternoon. I am calling from the National Cyber Safety Authority regarding a security concern associated with your child's online account. I have your child's details here - first name Priya, registered at Sunshare Academy. We have detected unauthorised access attempts and require a verification code to secure the account immediately. I will send a code to your registered number now - please read it back to me to complete the security process.'
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
                  <p className="smishing-info-body">Vishing is voice phishing - scam phone calls. They work the same way as smishing but use a real human voice, which adds authority and urgency that text cannot match. A real voice saying your name, your child's school, and a professional script feels more legitimate than any text. The key tactics are: authority (official-sounding name and title), personalisation (real details gathered in advance), and a manufactured process that ends with you handing over something valuable.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">ASKING FOR A CODE THEY JUST SENT</div>
                    <p className="smishing-flag-body">A caller who says 'I will send you a code - please read it back to me' is intercepting your authentication code. No legitimate organisation uses this process. The code you receive is for you to enter yourself - never to read to a caller.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label">RED FLAG</div>
                    <div className="smishing-flag-title">AUTHORITY PLUS URGENCY PLUS PERSONALISATION</div>
                    <p className="smishing-flag-body">When all three appear together - official title, genuine personal details, and time pressure - that combination should trigger maximum caution, not maximum trust. The sophistication of the attack does not make it legitimate.</p>
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
                  <p className="smishing-info-body">Multi-Factor Authentication - MFA, also called Two-Factor Authentication or 2FA - means using two different types of proof to verify your identity. Something you know (a password or passphrase) and something you have (a phone that receives a code, an app that generates one, or a physical key). Even if an attacker gets your password through phishing or a data breach, they cannot get in without the second factor. It is the most powerful single protection you can add to any account.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label mfa-label">MFA</div>
                    <div className="smishing-flag-title">THE THREE FACTORS</div>
                    <p className="smishing-flag-body">Authentication uses three possible factors: something you KNOW (password, passphrase, PIN), something you HAVE (phone, authenticator app, physical key), and something you ARE (fingerprint, face ID). MFA combines at least two of these. A password alone is one factor. A password plus a code sent to your phone is two factors. Two factors means an attacker needs both - which is exponentially harder to achieve.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label mfa-label">MFA</div>
                    <div className="smishing-flag-title">WHERE TO ENABLE IT</div>
                    <p className="smishing-flag-body">Most major platforms - email, gaming accounts, social media - offer MFA in their security settings. It adds a few seconds to logging in. It makes your account approximately ten times harder to compromise. Enable it on every account that offers it, starting with your email.</p>
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
                  <p className="smishing-info-body">Throughout your time in the Observatory, both women interacted with you. One of them is Aunt Mira. One of them is the Shadow Man's impostor. You have collected clues about their behaviour - things they said, things they did, and things they did not do. Now you must use everything you have learned across the entire journey to identify which one is real.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label finalgame-label">HOW TO PLAY</div>
                    <div className="smishing-flag-title">REVIEW THE EVIDENCE</div>
                    <p className="smishing-flag-body">You will be shown seven pieces of evidence collected from the Observatory. Work through each one carefully - you can review them in any order before making your final choice.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label finalgame-label">HOW TO PLAY</div>
                    <div className="smishing-flag-title">GETTING IT RIGHT MATTERS MORE THAN GETTING IT FAST</div>
                    <p className="smishing-flag-body">If you choose incorrectly, Mira will gently explain what you overlooked - then you try again. There is no penalty for looking again. Take your time.</p>
                  </div>
                </div>
                <div className="smishing-continue">tap anywhere to begin</div>
              </div>
            </div>
          )}
          {showFinalGame && <FinalGame onComplete={observatoryNext} />}
          {showKeypad && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <img src={keypadCardSlot} alt="" style={{ width: 'min(55vw, 420px)', objectFit: 'contain', filter: 'drop-shadow(0 0 24px rgba(80,140,255,0.35))' }} />
            </div>
          )}
          {showStrongboxCard && <StrongboxCardScene onComplete={observatoryNext} />}
          {showStrongboxScene && <StrongboxScene onComplete={observatoryNext} />}
          {showItemFocus && <ItemFocusOverlay item={showItemFocus} />}
          {showTrailRetreat && <TrailRetreat onClick={observatoryNext} />}
          {showGameEnd && (
            <div className="game-end-overlay" onClick={() => { playClick(); setShowGameEnd(false); setView('home') }}>
              <p className="game-end-text">THE END</p>
              <p className="game-end-sub">WHEN MIRA CALLS</p>
            </div>
          )}
          {showPermanenceInfo && (
            <div className="smishing-info-overlay" onClick={handleStoryNext}>
              <div className="smishing-info-panel permanence-info-panel">
                <div className="smishing-info-section">
                  <h2 className="smishing-info-heading">THE PERMANENCE OF THE INTERNET IN ACTION</h2>
                  <p className="smishing-info-body">The Shadow Man's file on the people of Sunshare Square is not built only from what they post today. It is built from everything they ever posted publicly - including things they deleted months or years ago. He collected those posts before they were removed, and they have been useful ever since. This is why the question to ask before posting is not 'can I delete this later?' It is 'am I comfortable with this existing permanently?' You control deletion. You do not control every copy.</p>
                </div>
                <div className="smishing-info-flags">
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label permanence-label">REMEMBER</div>
                    <div className="smishing-flag-title">YOU CONTROL DELETION. NOT EVERY COPY.</div>
                    <p className="smishing-flag-body">When you delete a post, you remove your copy. But anyone who saved it, screenshotted it, or cached it still has theirs. A post that existed publicly - even briefly - may have been collected by anyone, anywhere.</p>
                  </div>
                  <div className="smishing-flag-card">
                    <div className="smishing-flag-label permanence-label">REMEMBER</div>
                    <div className="smishing-flag-title">ASK THE RIGHT QUESTION BEFORE POSTING</div>
                    <p className="smishing-flag-body">The question is not 'can I delete this later?' - you can. The question is 'am I comfortable with this existing permanently, in someone else's copy, being used in ways I cannot predict?' Post accordingly.</p>
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
                  <p className="smishing-info-body">Social engineering is the art of manipulating people rather than systems. Instead of breaking through a firewall or cracking a code, a social engineer exploits human psychology - trust, fear, urgency, authority, helpfulness - to get people to hand over information or access voluntarily.</p>
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
                    <li>In this room, the Shadow Man used your emotional desire to find Aunt Mira to plant an impostor at the finish line</li>
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
              onClick={mfaQuizAnswer === 'B' ? handleStoryNext : mfaQuizAnswer ? () => { playBack(); setMfaQuizAnswer(null) } : undefined}
            >
              <div className="quiz-panel">
                <div className="quiz-header">WHAT DO YOU DO?</div>
                <p className="quiz-question">Jaylen asks: If I have MFA on, and someone calls me pretending to be from the gaming platform and asks me to read them my authentication code - what do I do?</p>

                {!mfaQuizAnswer ? (
                  <div className="quiz-options">
                    {[
                      { display: 'A', id: 'A', text: 'Read them the code - they verified they are from the platform and I have MFA enabled so it is safe.' },
                      { display: 'B', id: 'C', text: 'Ask them to verify who they are by giving me some account details first.' },
                      { display: 'C', id: 'B', text: 'Never read an authentication code to anyone over the phone. MFA codes are for you to enter yourself - not to share.' },
                    ].map(({ display, id, text }) => (
                      <div
                        key={display}
                        className="quiz-option"
                        onClick={(e) => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : playWrong(); setMfaQuizAnswer(id) }}
                      >
                        <span className="quiz-option-key">{display}</span>
                        <span className="quiz-option-text">{text}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="quiz-result">
                    {mfaQuizAnswer === 'A' && (
                      <div className="quiz-feedback quiz-feedback--wrong">
                        <div className="quiz-verdict">✗ INCORRECT</div>
                        <p className="quiz-woman-says">That is exactly what the caller wants. Having MFA enabled does not make it safe to share the code - it makes the code the target. No legitimate platform will ever call and ask you to read back a code. The code exists to authenticate you to the platform, not to a caller.</p>
                      </div>
                    )}
                    {mfaQuizAnswer === 'B' && (
                      <div className="quiz-feedback quiz-feedback--correct">
                        <div className="quiz-verdict">✓ CORRECT</div>
                        <p className="quiz-woman-says">MFA only protects you if you keep the second factor private. The moment you read that code to someone - even someone who seems completely legitimate - you have handed them the key. Authentication codes are generated for you to use, not to share. Hang up.</p>
                        <div className="quiz-remember">
                          <div className="quiz-remember-label">REMEMBER: AUTHENTICATION CODES ARE PRIVATE</div>
                          <p className="quiz-remember-body">An authentication code sent to your phone or generated by your app is a single-use key. The moment you share it, it can be used to access your account. No legitimate caller will ever ask for it.</p>
                        </div>
                      </div>
                    )}
                    {mfaQuizAnswer === 'C' && (
                      <div className="quiz-feedback quiz-feedback--wrong">
                        <div className="quiz-verdict">✗ INCORRECT</div>
                        <p className="quiz-woman-says">A skilled caller can answer basic account questions - they gathered that information before the call. Verifying their identity by asking questions does not protect you. The rule is simple: hang up and never share the code.</p>
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
              onClick={quizAnswer === 'B' ? handleStoryNext : quizAnswer ? () => { playBack(); setQuizAnswer(null) } : undefined}
            >
              <div className="quiz-panel">
                <div className="quiz-header">WHAT DO YOU DO?</div>
                <p className="quiz-question">The parent in this scenario is still on the phone with the caller. What should they do right now?</p>

                {!quizAnswer ? (
                  <div className="quiz-options">
                    {[
                      { display: 'A', id: 'B', text: 'End the call immediately. Then call the organisation directly on a number found independently - not one the caller provides. Do not enter any codes or click any links related to the call.' },
                      { display: 'B', id: 'A', text: 'Stay on the call and verify the caller\'s identity by asking questions.' },
                      { display: 'C', id: 'C', text: 'Ask the caller to hold while they check the code.' },
                    ].map(({ display, id, text }) => (
                      <div
                        key={display}
                        className="quiz-option"
                        onClick={(e) => { e.stopPropagation(); playOptionSelect(); id === 'B' ? playCorrect() : playWrong(); setQuizAnswer(id) }}
                      >
                        <span className="quiz-option-key">{display}</span>
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
                        <p className="quiz-woman-says">End the call. Then find the official number yourself - on the organisation's website, not from the caller. If it was real, calling the official number will confirm it and allow you to continue through a legitimate channel. If it was fake, you have given them nothing.</p>
                        <div className="quiz-remember">
                          <div className="quiz-remember-label">REMEMBER: HANG UP AND CALL BACK INDEPENDENTLY</div>
                          <p className="quiz-remember-body">If a phone call asks for codes, passwords, or personal information - hang up. Then find the official contact number yourself and call back through that. Never call a number the suspicious caller gave you.</p>
                        </div>
                      </div>
                    )}
                    {quizAnswer === 'C' && (
                      <div className="quiz-feedback quiz-feedback--wrong">
                        <div className="quiz-verdict">✗ INCORRECT</div>
                        <p className="quiz-woman-says">Putting a visher on hold does not protect you. They know you are uncertain - they use that. End the call completely and call back on an independent number.</p>
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
          <div className={`observatory-figures ${showObservatoryWomen ? 'visible' : ''}${miraMoment ? ' mira-moment' : ''}`} aria-hidden={!showObservatoryWomen}>
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
          {isPlayerLine ? (
            <div className="bubble-tail-container observatory-bubble-wrap" onClick={handleStoryNext}>
              <div className="bubble">
                <div className="nameplate">{playerName || '[YOUR NAME]'}</div>
                <div className="bubble-inner">
                  <div className="bubble-line">
                    {resolveName(activeStoryText)}
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
            <div className={`narrator-overlay${bgIsObsExterior ? ' narrator-overlay--exterior' : ''}`} onClick={handleStoryNext}>
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
                <div className="nameplate">{resolveName(observatoryLine.speaker)}</div>
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

      {isPlayerLine ? (
        <div className="bubble-tail-container" onClick={handleStoryNext}>
          <div className="bubble">
            <div className="nameplate">{playerName || '[YOUR NAME]'}</div>
            <div className="bubble-inner">
              <div className="bubble-line">
                {resolveName(activeStoryText)}
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
