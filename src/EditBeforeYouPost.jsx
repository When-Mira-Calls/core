import React, { useState, useEffect } from 'react'
import { playCorrect, playWrong, playClick, playOptionSelect } from './sounds'

const SPEED_SECS = { normal: 10, fast: 7, fastest: 5 }

const POSTS = [
  {
    id: 1, speed: 'normal', verdict: 'edit', sender: 'JamieC_gaming',
    hasPhoto: 'gaming',
    riskyBlock: {
      id: 'diary',
      content: 'Diary on desk: SUNSHARE ACADEMY — Jamie Chen',
      editText: '[diary blurred]',
      why: [
        { id: 'A', text: 'It shows your full name and school to anyone who sees the photo', correct: true },
        { id: 'B', text: 'School items should not appear in gaming photos', correct: false },
      ],
    },
    caption: 'Finally got it all set up!! 🎮🔥',
    feedback: 'The gaming setup is great to share. The name and school on the diary cover are not.',
  },
  {
    id: 2, speed: 'normal', verdict: 'edit', sender: 'sunny_sq',
    captionParts: [
      { id: 's2a', text: 'Mum just booked our holiday!! Two weeks in Spain ' },
      {
        id: 'dates', risky: true, text: 'from the 14th July', editText: '',
        why: [
          { id: 'A', text: 'Specific dates tell anyone exactly when your house is empty', correct: true },
          { id: 'B', text: 'Holiday destinations should not be posted publicly', correct: false },
        ],
      },
      { id: 's2b', text: '— nobody break into our house lol 🏖️' },
    ],
    feedback: 'A joke about burglary is still a burglary invitation. The dates tell anyone exactly when the house is unoccupied.',
  },
  {
    id: 3, speed: 'normal', verdict: 'edit', sender: 'maya_ss',
    hasPhoto: 'selfie',
    riskyBlock: {
      id: 'badge',
      content: 'School badge on blazer: SUNSHARE ACADEMY',
      editText: '[badge blurred]',
      why: [
        { id: 'A', text: 'A school badge tells strangers exactly which school you attend', correct: true },
        { id: 'B', text: 'School uniform photos should not be posted online', correct: false },
      ],
    },
    caption: 'Last day before summer!!! 🎉☀️',
    feedback: 'The happiness is entirely preserved without the badge. The badge pins your school to any stranger who sees it.',
  },
  {
    id: 4, speed: 'normal', verdict: 'edit', sender: 'kai_match',
    captionParts: [
      { id: 's4a', text: 'Walking home from the match — anyone near ' },
      {
        id: 'road', risky: true, text: 'the north end of Riverside Road', editText: 'me',
        why: [
          { id: 'A', text: 'Naming your exact location tells strangers where to find you right now', correct: true },
          { id: 'B', text: 'You should not post about sports matches', correct: false },
        ],
      },
      { id: 's4b', text: ' want to meet up? ⚽' },
    ],
    feedback: '"Anyone near me?" works just as well. The excitement stays; your location does not need to go with it.',
  },
  {
    id: 5, speed: 'normal', verdict: 'approve', sender: 'cat_lover99',
    hasPhoto: 'cat',
    caption: 'Happy 3rd birthday to my cat Marmite!! She is the best thing in my life 🐱❤️',
    approveWhy: [
      { id: 'A', text: 'No location, no school, no personal detail — celebrating your cat harms no one', correct: true },
      { id: 'B', text: 'Pet posts are always safe because animals cannot identify where you live', correct: false },
    ],
    feedback: 'This is the way. Celebrate your cat freely. No location, no school, no identifying information.',
  },
  {
    id: 6, speed: 'fast', verdict: 'edit', sender: 'music_fan_sq',
    captionParts: [
      { id: 's6a', text: 'Just found out I passed my music exam!!! ' },
      {
        id: 'teacher', risky: true, text: 'My teacher Miss Chen', editText: 'My teacher',
        why: [
          { id: 'A', text: "Your achievement does not require publishing your teacher's name", correct: true },
          { id: 'B', text: 'Exam results should not be posted publicly', correct: false },
        ],
      },
      { id: 's6b', text: ' told me in front of the whole class 🎵🎉' },
    ],
    feedback: "The joy of passing stays completely intact. Your teacher's name is not yours to broadcast.",
  },
  {
    id: 7, speed: 'fastest', verdict: 'edit', sender: 'b_day_crew',
    hasPhoto: 'party',
    caption: '🎂🎉 Best night!!',
    location: {
      id: 'loc7',
      content: '14 Millbank Road, Seabright (auto-filled)',
      why: [
        { id: 'A', text: 'The app auto-added your home address — anyone can now see where you live', correct: true },
        { id: 'B', text: 'Location tags should always be removed from birthday posts', correct: false },
      ],
    },
    feedback: 'The photo is lovely. The home address was added automatically by the app — most people never notice it.',
  },
  {
    id: 8, speed: 'fast', verdict: 'edit', sender: 'g_chat_user',
    caption: 'can you believe this lol 😭',
    screenshot: {
      id: 'screencap',
      chatSender: 'Rex_M',
      content: 'honestly I was so embarrassed at the thing yesterday I wanted to disappear 😭',
      why: [
        { id: 'A', text: "Private conversations belong to everyone in them — posting without permission is harm", correct: true },
        { id: 'B', text: 'Screenshots should never be shared on any social platform', correct: false },
      ],
    },
    feedback: "Private conversations belong to everyone in them. Posting Rex's words without permission is harm — even if it seems funny.",
    note: "You do not own other people's words.",
  },
  {
    id: 9, speed: 'fastest', verdict: 'edit', sender: 'priya_sq',
    hasPhoto: 'friends',
    captionParts: [
      { id: 's9a', text: 'Best night ever with ' },
      {
        id: 'name', risky: true, text: 'Aisha Patel', editText: 'my friend',
        why: [
          { id: 'A', text: "You are publishing someone else's full name without asking them", correct: true },
          { id: 'B', text: 'Full names should never appear in any public post', correct: false },
        ],
      },
      { id: 's9b', text: '!! 🎂✨' },
    ],
    location: {
      id: 'loc9',
      content: '22 Cranfield Avenue (auto-filled)',
      why: [
        { id: 'A', text: "This is someone else's home address — the app added it and it is not yours to share", correct: true },
        { id: 'B', text: 'Auto-filled locations are always inaccurate and should be removed', correct: false },
      ],
    },
    feedback: 'This photo includes someone else. Their name and location are their information too.',
    note: "Did you ask before posting? You do not own someone else's face, name, and location.",
  },
]

/* ── Helpers ──────────────────────────────────────────────────────── */
function getRiskyIds(post) {
  const ids = []
  if (post.riskyBlock) ids.push(post.riskyBlock.id)
  if (post.captionParts) post.captionParts.filter(p => p.risky).forEach(p => ids.push(p.id))
  if (post.location) ids.push(post.location.id)
  if (post.screenshot) ids.push(post.screenshot.id)
  return ids
}

function getWhy(post, id) {
  if (post.riskyBlock?.id === id) return post.riskyBlock.why
  const cp = post.captionParts?.find(p => p.id === id)
  if (cp?.why) return cp.why
  if (post.location?.id === id) return post.location.why
  if (post.screenshot?.id === id) return post.screenshot.why
  return []
}

/* ── SVG Illustrations ────────────────────────────────────────────── */
function GamingIllustration() {
  return (
    <svg viewBox="0 0 280 130" className="ebp-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="gi-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1f4d" />
          <stop offset="100%" stopColor="#040e28" />
        </linearGradient>
        <radialGradient id="gi-rgb" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="rgba(100,60,255,0.5)" />
          <stop offset="40%" stopColor="rgba(0,200,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,40,140,0.2)" />
        </radialGradient>
      </defs>
      <rect width="280" height="130" fill="#070b12" />
      <rect x="0" y="90" width="280" height="40" fill="#0f0a04" />
      <rect x="0" y="90" width="280" height="3" fill="#2a1808" />
      {/* Monitor */}
      <rect x="52" y="10" width="176" height="80" rx="5" fill="#151515" />
      <rect x="57" y="14" width="166" height="66" rx="3" fill="url(#gi-screen)" />
      {/* Game on screen */}
      <rect x="57" y="56" width="166" height="24" fill="rgba(20,80,40,0.45)" />
      <circle cx="140" cy="48" r="8" fill="rgba(60,200,240,0.85)" />
      <rect x="94" y="36" width="5" height="24" fill="rgba(255,160,20,0.7)" />
      <rect x="168" y="28" width="5" height="32" fill="rgba(255,60,60,0.7)" />
      <rect x="57" y="14" width="166" height="66" rx="3" fill="url(#gi-rgb)" opacity="0.10" />
      {/* Stand */}
      <rect x="127" y="90" width="26" height="9" rx="2" fill="#1a1a1a" />
      <rect x="112" y="98" width="56" height="4" rx="2" fill="#242424" />
      {/* Keyboard */}
      <rect x="65" y="100" width="126" height="16" rx="3" fill="#181818" />
      <rect x="65" y="100" width="126" height="5" rx="2" fill="url(#gi-rgb)" opacity="0.55" />
      {[0, 1, 2].map(row =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(col => (
          <rect key={`${row}-${col}`} x={68 + col * 11} y={103 + row * 4} width={9} height={2.5} rx={0.4} fill="rgba(255,255,255,0.05)" />
        ))
      )}
      {/* Mouse */}
      <rect x="205" y="100" width="22" height="16" rx="6" fill="#1d1d1d" />
      <line x1="216" y1="100" x2="216" y2="108" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      {/* Diary */}
      <rect x="220" y="68" width="46" height="28" rx="2" fill="#7a1212" />
      <rect x="220" y="68" width="5" height="28" fill="#5a0e0e" />
      <rect x="223" y="72" width="40" height="3" fill="rgba(255,255,255,0.18)" />
      <text x="225" y="79" fontSize="4.2" fill="rgba(255,255,255,0.92)" fontFamily="'Courier New',monospace" fontWeight="700">SUNSHARE ACADEMY</text>
      <text x="225" y="86" fontSize="3.8" fill="rgba(255,255,255,0.65)" fontFamily="'Courier New',monospace">Jamie Chen</text>
      {/* Ambient glow */}
      <ellipse cx="128" cy="120" rx="60" ry="7" fill="url(#gi-rgb)" opacity="0.3" />
    </svg>
  )
}

function SelfieIllustration() {
  return (
    <svg viewBox="0 0 280 130" className="ebp-illustration" aria-hidden="true">
      <defs>
        <radialGradient id="si-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fffaf4" />
          <stop offset="100%" stopColor="#f5e8d0" />
        </radialGradient>
      </defs>
      <rect width="280" height="130" fill="url(#si-bg)" />
      {/* Sun */}
      <circle cx="238" cy="24" r="15" fill="#FFD700" opacity="0.85" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <line key={i}
          x1={238 + 16 * Math.cos(a * Math.PI / 180)} y1={24 + 16 * Math.sin(a * Math.PI / 180)}
          x2={238 + 24 * Math.cos(a * Math.PI / 180)} y2={24 + 24 * Math.sin(a * Math.PI / 180)}
          stroke="#FFD700" strokeWidth="2" opacity="0.6" />
      ))}
      {/* Confetti */}
      {[[32, 22, '#ff6b6b', 20], [62, 12, '#4fc3f7', -15], [250, 52, '#81c784', 30], [220, 10, '#f48fb1', -10]].map(([x, y, c, r], i) => (
        <rect key={i} x={x} y={y} width={8} height={4} rx={1} fill={c} transform={`rotate(${r} ${x} ${y})`} opacity={0.75} />
      ))}
      {/* Hair */}
      <ellipse cx="140" cy="22" rx="32" ry="16" fill="#2d1a0a" />
      <rect x="108" y="18" width="64" height="16" fill="#2d1a0a" />
      {/* Head */}
      <circle cx="140" cy="48" r="28" fill="#e8b88a" />
      <circle cx="131" cy="44" r="3.5" fill="#2d1a0a" />
      <circle cx="149" cy="44" r="3.5" fill="#2d1a0a" />
      <circle cx="132" cy="43" r="1.2" fill="white" />
      <circle cx="150" cy="43" r="1.2" fill="white" />
      <path d="M 130,52 Q 140,60 150,52" stroke="#5a3020" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Body / blazer */}
      <path d="M 96,76 L 74,130 L 206,130 L 184,76 Q 140,68 96,76 Z" fill="#1a2c4e" />
      <path d="M 122,76 L 140,90 L 158,76" stroke="white" strokeWidth="2" fill="none" />
      <path d="M 140,80 L 134,108 L 140,103 L 146,108 L 140,80" fill="#8b1a1a" />
      {/* School badge */}
      <rect x="156" y="84" width="26" height="24" rx="3" fill="#c8a020" />
      <rect x="158" y="86" width="22" height="16" rx="2" fill="#1a2c4e" />
      <text x="161" y="93" fontSize="3.2" fill="white" fontFamily="'Courier New',monospace" fontWeight="700">SUNSHARE</text>
      <text x="162" y="98" fontSize="3.2" fill="white" fontFamily="'Courier New',monospace" fontWeight="700">ACADEMY</text>
      <rect x="158" y="102" width="22" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
    </svg>
  )
}

function CatIllustration() {
  return (
    <svg viewBox="0 0 280 130" className="ebp-illustration" aria-hidden="true">
      <defs>
        <radialGradient id="ci-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#fffbe6" />
          <stop offset="100%" stopColor="#fde8a0" />
        </radialGradient>
      </defs>
      <rect width="280" height="130" fill="url(#ci-bg)" />
      {[[28, 15, '#ff6b6b', 25], [55, 30, '#4fc3f7', -10], [222, 18, '#81c784', 15], [248, 45, '#ffb347', -20], [18, 60, '#ce93d8', 30], [260, 12, '#f48fb1', -5], [198, 95, '#4fc3f7', 20], [38, 102, '#ffb347', -15]].map(([x, y, c, r], i) => (
        <rect key={i} x={x} y={y} width={8} height={4} rx={1} fill={c} transform={`rotate(${r} ${x} ${y})`} opacity={0.75} />
      ))}
      {/* Party hat */}
      <polygon points="140,6 116,44 164,44" fill="#ff6b6b" />
      <line x1="116" y1="44" x2="164" y2="44" stroke="#ffb347" strokeWidth="4" />
      <circle cx="140" cy="6" r="3" fill="#ffd700" />
      {/* Cat head */}
      <circle cx="140" cy="72" r="26" fill="#e8a060" />
      {/* Ears */}
      <polygon points="116,54 107,30 130,50" fill="#e8a060" />
      <polygon points="164,54 173,30 150,50" fill="#e8a060" />
      <polygon points="116,52 110,35 128,49" fill="#f4b0a0" />
      <polygon points="164,52 170,35 152,49" fill="#f4b0a0" />
      {/* Eyes */}
      <ellipse cx="130" cy="68" rx="5" ry="6" fill="#2d5010" />
      <ellipse cx="150" cy="68" rx="5" ry="6" fill="#2d5010" />
      <ellipse cx="130" cy="68" rx="2" ry="5" fill="#111" />
      <ellipse cx="150" cy="68" rx="2" ry="5" fill="#111" />
      <circle cx="132" cy="66" r="1.5" fill="white" />
      <circle cx="152" cy="66" r="1.5" fill="white" />
      {/* Nose & mouth */}
      <polygon points="140,76 137,80 143,80" fill="#d4608a" />
      <path d="M 137,80 Q 133,86 129,82" stroke="#b44870" strokeWidth="1.5" fill="none" />
      <path d="M 143,80 Q 147,86 151,82" stroke="#b44870" strokeWidth="1.5" fill="none" />
      {/* Whiskers */}
      <line x1="112" y1="74" x2="130" y2="76" stroke="rgba(80,40,10,0.5)" strokeWidth="1.2" />
      <line x1="112" y1="78" x2="130" y2="78" stroke="rgba(80,40,10,0.5)" strokeWidth="1.2" />
      <line x1="150" y1="76" x2="168" y2="74" stroke="rgba(80,40,10,0.5)" strokeWidth="1.2" />
      <line x1="150" y1="78" x2="168" y2="78" stroke="rgba(80,40,10,0.5)" strokeWidth="1.2" />
      {/* Birthday cake */}
      <rect x="198" y="88" width="56" height="32" rx="4" fill="#f9e0f0" />
      <rect x="198" y="80" width="56" height="14" rx="4" fill="#f4b0d0" />
      <rect x="198" y="88" width="56" height="6" fill="#f4b0d0" />
      {[208, 220, 232, 244].map(x => (
        <path key={x} d={`M ${x},80 Q ${x + 2},88 ${x},92`} stroke="white" strokeWidth="4" fill="none" opacity="0.6" />
      ))}
      {[212, 223, 234].map(x => (
        <g key={x}>
          <rect x={x} y={70} width={5} height={11} rx={1} fill="#ff6b6b" />
          <ellipse cx={x + 2.5} cy={69} rx={3} ry={4} fill="#ffdb58" opacity="0.9" />
        </g>
      ))}
      <text x="208" y="108" fontSize="11" fill="#d4608a" fontFamily="sans-serif" fontWeight="900">3rd</text>
      {/* Balloons */}
      <ellipse cx="46" cy="55" rx="18" ry="22" fill="#ff6b6b" opacity="0.85" />
      <path d="M 46,77 Q 44,85 46,90" stroke="#cc5555" strokeWidth="1.5" fill="none" />
      <ellipse cx="234" cy="45" rx="16" ry="20" fill="#4fc3f7" opacity="0.85" />
      <path d="M 234,65 Q 232,73 234,78" stroke="#3399cc" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function PartyIllustration() {
  return (
    <svg viewBox="0 0 280 130" className="ebp-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="pi-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a0c40" />
          <stop offset="100%" stopColor="#18052a" />
        </linearGradient>
      </defs>
      <rect width="280" height="130" fill="url(#pi-bg)" />
      {/* String lights */}
      <path d="M 0,22 Q 35,30 70,22 Q 105,14 140,22 Q 175,30 210,22 Q 245,14 280,22" stroke="rgba(255,220,100,0.35)" strokeWidth="1" fill="none" />
      {[18, 60, 102, 140, 178, 218, 258].map((x, i) => (
        <circle key={i} cx={x} cy={22 + (i % 2) * 8} r={4} fill="#ffd700" opacity={0.78} />
      ))}
      {/* Balloons */}
      <ellipse cx="40" cy="56" rx="17" ry="21" fill="#ff6b6b" opacity="0.9" />
      <path d="M 40,77 Q 38,86 40,92" stroke="#cc5555" strokeWidth="1.5" fill="none" />
      <ellipse cx="74" cy="46" rx="15" ry="19" fill="#4fc3f7" opacity="0.9" />
      <path d="M 74,65 Q 72,74 74,80" stroke="#3399cc" strokeWidth="1.5" fill="none" />
      <ellipse cx="240" cy="52" rx="17" ry="21" fill="#81c784" opacity="0.9" />
      <path d="M 240,73 Q 238,82 240,88" stroke="#558855" strokeWidth="1.5" fill="none" />
      <ellipse cx="208" cy="42" rx="13" ry="17" fill="#f48fb1" opacity="0.9" />
      <path d="M 208,59 Q 206,68 208,74" stroke="#c06080" strokeWidth="1.5" fill="none" />
      {/* Table */}
      <rect x="58" y="96" width="164" height="5" rx="2" fill="#3a1c08" />
      <rect x="68" y="101" width="10" height="29" rx="2" fill="#2e1606" />
      <rect x="202" y="101" width="10" height="29" rx="2" fill="#2e1606" />
      {/* Cake */}
      <rect x="106" y="74" width="68" height="26" rx="4" fill="#f9e0f4" />
      <rect x="106" y="66" width="68" height="14" rx="4" fill="#f4b0d8" />
      <rect x="106" y="74" width="68" height="6" fill="#f4b0d8" />
      {[116, 128, 140, 152, 164].map((x, k) => (
        <g key={x}>
          <rect x={x} y={57} width={4} height={10} rx={1} fill={['#ff6b6b', '#4fc3f7', '#ffd700', '#81c784', '#f48fb1'][k]} />
          <ellipse cx={x + 2} cy={56} rx={2.5} ry={3.5} fill="#ffdb58" opacity="0.9" />
        </g>
      ))}
      {[112, 124, 136, 148, 160].map(x => (
        <ellipse key={x} cx={x} cy={66} rx={5} ry={3} fill="white" opacity={0.65} />
      ))}
      {/* People */}
      <circle cx="100" cy="80" r="12" fill="#b8785a" />
      <rect x="86" y="92" width="28" height="38" rx="3" fill="#263080" />
      <circle cx="176" cy="82" r="11" fill="#8b5a3a" />
      <rect x="163" y="93" width="26" height="37" rx="3" fill="#5a1860" />
      {/* Confetti */}
      {[[28, 102, '#ff6b6b', 20], [252, 98, '#4fc3f7', -15], [33, 42, '#ffd700', 35], [248, 78, '#81c784', -25]].map(([x, y, c, r], i) => (
        <rect key={i} x={x} y={y} width={7} height={3} rx={1} fill={c} transform={`rotate(${r} ${x} ${y})`} opacity={0.75} />
      ))}
    </svg>
  )
}

function FriendsIllustration() {
  return (
    <svg viewBox="0 0 280 130" className="ebp-illustration" aria-hidden="true">
      <defs>
        <linearGradient id="fi-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#281238" />
          <stop offset="100%" stopColor="#160820" />
        </linearGradient>
      </defs>
      <rect width="280" height="130" fill="url(#fi-bg)" />
      {/* String lights */}
      <path d="M 0,18 Q 42,28 84,18 Q 126,8 168,18 Q 210,28 252,18 Q 266,14 280,18" stroke="rgba(255,210,80,0.32)" strokeWidth="1" fill="none" />
      {[14, 58, 100, 142, 182, 224, 262].map((x, i) => (
        <circle key={i} cx={x} cy={18 + (i % 2) * 9} r={3.5} fill="#ffc840" opacity={0.7} />
      ))}
      {/* Balloons */}
      <ellipse cx="36" cy="54" rx="16" ry="20" fill="#ff6b6b" opacity="0.85" />
      <path d="M 36,74 Q 34,82 36,88" stroke="#cc5555" strokeWidth="1.5" fill="none" />
      <ellipse cx="248" cy="50" rx="15" ry="19" fill="#4fc3f7" opacity="0.85" />
      <path d="M 248,69 Q 246,77 248,83" stroke="#3399cc" strokeWidth="1.5" fill="none" />
      {/* Confetti */}
      {[[22, 88, '#ffd700', 20], [255, 96, '#81c784', -15], [20, 108, '#f48fb1', 35], [258, 82, '#ffb347', -25]].map(([x, y, c, r], i) => (
        <rect key={i} x={x} y={y} width={7} height={3} rx={1} fill={c} transform={`rotate(${r} ${x} ${y})`} opacity={0.7} />
      ))}
      {/* Person 1 */}
      <path d="M 80,52 Q 84,32 108,30 Q 132,32 136,52" fill="#3d2210" />
      <rect x="80" y="46" width="8" height="20" rx="4" fill="#3d2210" />
      <circle cx="108" cy="64" r="24" fill="#c4845a" />
      <circle cx="100" cy="60" r="3" fill="#3d2210" />
      <circle cx="116" cy="60" r="3" fill="#3d2210" />
      <path d="M 100,68 Q 108,76 116,68" stroke="#5a3020" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 76,88 L 64,130 L 152,130 L 140,88 Q 108,80 76,88 Z" fill="#d4506a" />
      {/* Person 2 */}
      <ellipse cx="176" cy="44" rx="24" ry="14" fill="#1a1010" />
      <rect x="152" y="40" width="48" height="16" fill="#1a1010" />
      <circle cx="176" cy="64" r="22" fill="#8b5a30" />
      <circle cx="168" cy="60" r="2.5" fill="#3d2210" />
      <circle cx="184" cy="60" r="2.5" fill="#3d2210" />
      <path d="M 168,68 Q 176,76 184,68" stroke="#5a3020" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 146,86 L 134,130 L 218,130 L 206,86 Q 176,78 146,86 Z" fill="#6040a0" />
      {/* Sparkles */}
      {[[218, 42, '#ffd700'], [54, 40, '#ff6b6b'], [200, 102, '#4fc3f7']].map(([x, y, c], i) => (
        <g key={i}>
          <line x1={x} y1={y - 7} x2={x} y2={y + 7} stroke={c} strokeWidth="1.5" opacity="0.55" />
          <line x1={x - 7} y1={y} x2={x + 7} y2={y} stroke={c} strokeWidth="1.5" opacity="0.55" />
        </g>
      ))}
    </svg>
  )
}

function PostIllustration({ type }) {
  switch (type) {
    case 'gaming':  return <GamingIllustration />
    case 'selfie':  return <SelfieIllustration />
    case 'cat':     return <CatIllustration />
    case 'party':   return <PartyIllustration />
    case 'friends': return <FriendsIllustration />
    default:        return null
  }
}

/* ── Main component ───────────────────────────────────────────────── */
export default function EditBeforeYouPost({ onComplete }) {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('reading') // reading | why | approve-why | result | done
  const [edited, setEdited] = useState({})
  const [pendingWhy, setPendingWhy] = useState(null)
  const [wrongWhy, setWrongWhy] = useState(false)
  const [safeFlash, setSafeFlash] = useState(null)
  const [action, setAction] = useState(null)
  const [results, setResults] = useState([])
  const [timeLeft, setTimeLeft] = useState(SPEED_SECS.normal)

  const post = POSTS[idx]
  const riskyIds = getRiskyIds(post)
  const total = SPEED_SECS[post.speed]

  useEffect(() => {
    setPhase('reading')
    setEdited({})
    setAction(null)
    setPendingWhy(null)
    setWrongWhy(false)
    setSafeFlash(null)
    setTimeLeft(total)
  }, [idx, total])

  // Timer only ticks during 'reading'
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

  // Auto-complete when all risky elements correctly identified
  useEffect(() => {
    if (phase !== 'reading') return
    if (riskyIds.length === 0 || !riskyIds.every(id => edited[id])) return
    setAction('edit')
    setResults(r => [...r, true])
    setPhase('result')
    playCorrect()
  }, [edited, phase, riskyIds])

  const clickElement = (id) => {
    if (phase !== 'reading') return
    if (edited[id]) return
    if (riskyIds.includes(id)) {
      setPendingWhy(id)
      setPhase('why')
      playOptionSelect()
    } else {
      setSafeFlash(id)
      setTimeout(() => setSafeFlash(s => s === id ? null : s), 900)
    }
  }

  const pickWhy = (answerId) => {
    const correct = getWhy(post, pendingWhy).find(o => o.id === answerId)?.correct
    if (correct) {
      setEdited(e => ({ ...e, [pendingWhy]: true }))
      setPendingWhy(null)
      setPhase('reading')
      playCorrect()
    } else {
      setWrongWhy(true)
      playWrong()
      setTimeout(() => { setWrongWhy(false); setPendingWhy(null); setPhase('reading') }, 800)
    }
  }

  const handleApprove = () => {
    if (phase !== 'reading') return
    if (post.verdict !== 'approve') {
      setAction('approve')
      setResults(r => [...r, false])
      setPhase('result')
      playWrong()
    } else if (post.approveWhy) {
      setPhase('approve-why')
      playOptionSelect()
    } else {
      setAction('approve')
      setResults(r => [...r, true])
      setPhase('result')
      playCorrect()
    }
  }

  const pickApproveWhy = (answerId) => {
    const correct = post.approveWhy.find(o => o.id === answerId)?.correct
    if (correct) {
      setAction('approve')
      setResults(r => [...r, true])
      setPhase('result')
      playCorrect()
    } else {
      setWrongWhy(true)
      playWrong()
      setTimeout(() => { setWrongWhy(false); setPhase('reading') }, 800)
    }
  }

  const handleNext = () => {
    playClick()
    if (idx >= POSTS.length - 1) setPhase('done')
    else setIdx(i => i + 1)
  }

  const correct = action === 'edit' || (action === 'approve' && post.verdict === 'approve')
  const showWhyPanel = phase === 'why' || phase === 'approve-why'
  const whyOptions = phase === 'why' ? getWhy(post, pendingWhy) : (post.approveWhy || [])
  const whyLabel = phase === 'approve-why' ? 'WHY IS THIS SAFE TO APPROVE?' : 'WHY IS THIS A PROBLEM?'

  // ── Done screen ──────────────────────────────────────────────────
  if (phase === 'done') {
    const score = results.filter(Boolean).length
    const canContinue = score >= 7
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
                <div key={p.id} className={`ebp-score-card${results[i] ? ' ebp-score-card--ok' : ' ebp-score-card--bad'}`} style={{ animationDelay: `${0.18 + i * 0.08}s` }}>
                  <span className="ebp-score-card-icon">{results[i] ? '✓' : '✗'}</span>
                  <span className="ebp-score-card-name">@{p.sender}</span>
                  <span className="ebp-score-card-verdict">{p.verdict.toUpperCase()}</span>
                </div>
              ))}
            </div>
            {canContinue
              ? <button className="ebp-btn ebp-btn--continue" onClick={() => { playClick(); onComplete() }}>CONTINUE →</button>
              : <button className="ebp-btn ebp-btn--retry" onClick={reset}>TRY AGAIN ↺</button>
            }
          </div>
        </div>
      </div>
    )
  }

  // ── Game screen ──────────────────────────────────────────────────
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
              <span key={i} className={`ebp-pip${i < idx ? ' ebp-pip--done' : i === idx ? ' ebp-pip--active' : ''}`} />
            ))}
          </div>
          <span className="ebp-hud-count">{idx + 1} / {POSTS.length}</span>
        </div>

        {/* Timer bar — frozen during WHY phases */}
        <div className="ebp-timer-track">
          <div
            className={`ebp-timer-fill ebp-timer-fill--${post.speed}`}
            style={{ width: phase === 'result' ? '0%' : `${(timeLeft / total) * 100}%`, transition: phase === 'reading' ? 'width 0.05s linear' : 'none' }}
          />
        </div>

        {/* Scrollable content area */}
        <div className="ebp-content">

          {/* Post card */}
          <div className={`ebp-card${phase === 'result' ? (correct ? ' ebp-card--ok' : ' ebp-card--bad') : ''}`}>

            {post.speed !== 'normal' && phase === 'reading' && (
              <div className={`ebp-speed-badge ebp-speed-badge--${post.speed}`}>
                {post.speed === 'fastest' ? '⚡⚡ FASTEST' : '⚡ FAST'}
              </div>
            )}

            {phase === 'result' && (
              <div className={`ebp-stamp${correct ? '' : ' ebp-stamp--bad'}`}>
                {action === 'timeout' ? 'POSTED UNEDITED' : action === 'approve' ? (correct ? 'APPROVED ✓' : 'SHOULD EDIT') : 'EDITED ✓'}
              </div>
            )}

            {/* Illustration */}
            {post.hasPhoto && <PostIllustration type={post.hasPhoto} />}

            {/* Sender row */}
            <div className="ebp-post-header">
              <div className="ebp-avatar">{post.sender[0].toUpperCase()}</div>
              <span className="ebp-sender">@{post.sender}</span>
            </div>

            {/* Risky block (element visible in photo) */}
            {post.riskyBlock && (
              edited[post.riskyBlock.id]
                ? <div className="ebp-edited-block">{post.riskyBlock.editText}</div>
                : <div
                    className={`ebp-risky-block${pendingWhy === post.riskyBlock.id ? ' ebp-risky-block--pending' : ''}`}
                    onClick={() => clickElement(post.riskyBlock.id)}
                  >
                    {post.riskyBlock.content}
                  </div>
            )}

            {/* Screenshot (chat bubble style) */}
            {post.screenshot && (
              edited[post.screenshot.id]
                ? <div className="ebp-screenshot-removed">[screenshot removed]</div>
                : <div
                    className={`ebp-screenshot-block${pendingWhy === post.screenshot.id ? ' ebp-screenshot-block--pending' : ''}`}
                    onClick={() => clickElement(post.screenshot.id)}
                  >
                    <div className="ebp-chat-meta">[Private group chat]</div>
                    <div className="ebp-chat-bubble">
                      <span className="ebp-chat-sender">{post.screenshot.chatSender}</span>
                      <span className="ebp-chat-content">{post.screenshot.content}</span>
                    </div>
                  </div>
            )}

            {/* Caption */}
            {post.captionParts ? (
              <p className="ebp-caption">
                {post.captionParts.map((part, i) => {
                  if (edited[part.id]) {
                    return part.editText
                      ? <span key={i} className="ebp-edited-inline">{part.editText}</span>
                      : null
                  }
                  if (part.risky) {
                    return (
                      <span
                        key={i}
                        className={`ebp-risky-inline${pendingWhy === part.id ? ' ebp-risky-inline--pending' : ''}`}
                        onClick={() => clickElement(part.id)}
                      >
                        {part.text}
                      </span>
                    )
                  }
                  return (
                    <span
                      key={i}
                      className={`ebp-safe-part${safeFlash === part.id ? ' ebp-safe-part--flash' : ''}`}
                      onClick={() => clickElement(part.id)}
                    >
                      {part.text}
                      {safeFlash === part.id && <span className="ebp-safe-toast">✓ fine</span>}
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
                : <div
                    className={`ebp-location-tag${pendingWhy === post.location.id ? ' ebp-location-tag--pending' : ''}`}
                    onClick={() => clickElement(post.location.id)}
                  >
                    📍 {post.location.content}
                  </div>
            )}
          </div>

          {/* WHY panel — replaces action row when active */}
          {showWhyPanel && (
            <div className={`ebp-why-panel${wrongWhy ? ' ebp-why-panel--wrong' : ''}${phase === 'approve-why' ? ' ebp-why-panel--approve' : ''}`}>
              <div className="ebp-why-label">{whyLabel}</div>
              <div className="ebp-why-options">
                {whyOptions.map(opt => (
                  <button
                    key={opt.id}
                    className="ebp-why-btn"
                    onClick={() => phase === 'why' ? pickWhy(opt.id) : pickApproveWhy(opt.id)}
                  >
                    <span className="ebp-why-key">{opt.id}</span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

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

        </div>{/* end ebp-content */}

        {/* Approve button — only shown during reading */}
        {phase === 'reading' && (
          <div className="ebp-actions">
            <p className="ebp-action-hint">tap anything in the post that looks risky</p>
            <button className="ebp-btn ebp-btn--approve" onClick={handleApprove}>✓ APPROVE AS-IS</button>
          </div>
        )}

      </div>
    </div>
  )
}
