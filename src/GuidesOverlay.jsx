import React, { useState } from 'react'

function Section({ eyebrow, title, children }) {
  return (
    <div className="guide-section">
      {eyebrow && <p className="guide-eyebrow">{eyebrow}</p>}
      {title && <h2 className="guide-h2">{title}</h2>}
      <div className="guide-rule" />
      {children}
    </div>
  )
}

function WorldStrip({ emoji, world, subtitle, color }) {
  return (
    <div className="guide-world-strip" style={{ borderLeftColor: color }}>
      <span className="guide-world-emoji">{emoji}</span>
      <div>
        <p className="guide-world-title">{world}</p>
        <p className="guide-world-sub">{subtitle}</p>
      </div>
    </div>
  )
}

function DQ({ num, q, note, color }) {
  return (
    <div className="guide-dq">
      <div className="guide-dq-num" style={{ background: color }}>{num}</div>
      <div>
        <p className="guide-dq-q">"{q}"</p>
        {note && <p className="guide-dq-note">{note}</p>}
      </div>
    </div>
  )
}

function InfoCard({ icon, title, body, accent }) {
  return (
    <div className="guide-info-card" style={{ borderTopColor: accent }}>
      {icon && <span className="guide-info-icon">{icon}</span>}
      <p className="guide-info-title">{title}</p>
      <p className="guide-info-body">{body}</p>
    </div>
  )
}

function TimingRow({ time, title, body }) {
  return (
    <div className="guide-time-row">
      <div className="guide-time-badge">{time}</div>
      <div>
        <p className="guide-time-title">{title}</p>
        <p className="guide-time-body">{body}</p>
      </div>
    </div>
  )
}

function SensNote({ children }) {
  return <div className="guide-sens-flag"><p className="guide-sens-label">Sensitivity note</p><p className="guide-sens-body">{children}</p></div>
}

function Activity({ num, title, chips, body }) {
  return (
    <div className="guide-activity">
      <p className="guide-activity-num">Activity {num}</p>
      <p className="guide-activity-title">{title}</p>
      <div className="guide-activity-chips">{chips.map(c => <span key={c} className="guide-activity-chip">{c}</span>)}</div>
      <p className="guide-activity-body">{body}</p>
    </div>
  )
}

function SafeStep({ num, title, body }) {
  return (
    <div className="guide-safe-step">
      <div className="guide-safe-num">{num}</div>
      <div><p className="guide-safe-title">{title}</p><p className="guide-safe-body">{body}</p></div>
    </div>
  )
}

// ── EDUCATOR GUIDE ───────────────────────────────────────────────────

function EducatorGuide() {
  const SEABRIGHT   = '#3a5a9a'
  const LIGHTHOUSE  = '#a07020'
  const SUNSHARE    = '#2a7a6a'
  const OBSERVATORY = '#7a4aaa'
  const AMBER       = '#ffd84d'

  return (
    <div className="guide-content">

      {/* Cover */}
      <div className="guide-cover">
        <div className="guide-cover-eyebrow">Educator Guide · When Mira Calls</div>
        <h1 className="guide-cover-title">For teachers, <em>facilitators</em> and youth workers</h1>
        <p className="guide-cover-sub">Everything you need to use <strong>When Mira Calls</strong> in a classroom, youth group, or after-school setting — without needing to be a cybersecurity expert. The game does the teaching. This guide helps you get the most from it.</p>
        <div className="guide-cover-stats">
          <div className="guide-stat"><div className="guide-stat-num">11–13</div><div className="guide-stat-label">Target age range</div></div>
          <div className="guide-stat"><div className="guide-stat-num">3–5h</div><div className="guide-stat-label">Total play time</div></div>
          <div className="guide-stat"><div className="guide-stat-num">9</div><div className="guide-stat-label">Online safety skills</div></div>
          <div className="guide-stat"><div className="guide-stat-num">15</div><div className="guide-stat-label">Badges earned</div></div>
        </div>
      </div>

      {/* Section 1 */}
      <Section eyebrow="Section 1" title="About the game">
        <p className="guide-body" style={{ marginBottom: 16 }}>When Mira Calls is a narrative adventure game for ages 11–13. A child receives a letter from an aunt they never knew they had. She is missing and needs their help. What follows is a journey across three worlds — a fishing village, a busy town square, and a hilltop observatory — each in quiet crisis. At every stop the child figures out what went wrong and why. The cybersecurity lessons arrive through the story, not as interruptions to it.</p>
        <div className="guide-three-col" style={{ marginBottom: 20 }}>
          <InfoCard icon="🎮" title="Format" body="Browser-based adventure game. No download, no account, no personal data collected. Progress saves locally on the device. Works on tablets, laptops, and desktop computers." accent={AMBER} />
          <InfoCard icon="⏱" title="Time" body="Each world takes 45–90 minutes. Full game is 3–5 hours. Individual worlds work as standalone sessions." accent={AMBER} />
          <InfoCard icon="👥" title="Group size" body="Individual, pairs, small groups of 3–4, or whole class on a shared screen. Each model has different advantages — see Section 2." accent={AMBER} />
        </div>
        <p className="guide-eyebrow" style={{ marginBottom: 10 }}>Topics covered</p>
        <div className="guide-two-col">
          <div>
            <p className="guide-body" style={{ marginBottom: 7 }}><strong>World 0 — Home:</strong> Tutorial only. No lesson content.</p>
            <p className="guide-body" style={{ marginBottom: 7 }}><strong>World 1 — Seabright:</strong> Phishing, red flags, scam ads, responding to scams.</p>
            <p className="guide-body" style={{ marginBottom: 7 }}><strong>Lighthouse Bridge:</strong> Password strength, passphrases, the strongbox mechanic.</p>
            <p className="guide-body"><strong>World 2 — Sunshare Square:</strong> Digital footprint, internet permanence, online trust and grooming warning signs, cyberbullying (all three positions), relational sharing, AI nonconsensual imagery (signpost), password hygiene and reuse.</p>
          </div>
          <div>
            <p className="guide-body" style={{ marginBottom: 7 }}><strong>World 3 — Observatory:</strong> Smishing, vishing, MFA, social engineering, the final synthesis test.</p>
            <p className="guide-body" style={{ marginBottom: 7 }}><strong>Sensitive content:</strong> Cyberbullying including the perpetrator position; online grooming warning signs; AI-generated nonconsensual imagery (brief signpost only). See Section 8 for safeguarding guidance.</p>
            <p className="guide-body"><strong>Not covered in depth:</strong> Radicalisation and extremism (named as a pattern only); financial fraud beyond email and ad scams; explicit sexual content of any kind.</p>
          </div>
        </div>
      </Section>

      {/* Section 2 */}
      <Section eyebrow="Section 2" title="How to use it">
        <p className="guide-body" style={{ marginBottom: 20 }}>The game is built on one principle that matters for facilitation: <strong>lessons land best when they arrive through experience, not instruction.</strong> The game delivers lessons through character stories and choices. Your role is to create space for reflection after play — not to pre-teach the content before it.</p>
        <p className="guide-eyebrow" style={{ marginBottom: 12 }}>Three models of use</p>
        <div className="guide-three-col" style={{ marginBottom: 20 }}>
          <InfoCard title="Individual play" body="Each child plays on their own device at their own pace. Follow with structured discussion or the reflection tool (Section 7). Works as homework between sessions if devices are available." accent={SEABRIGHT} />
          <InfoCard title="Paired or small group" body="Two to four children share a device and discuss choices together as they play. Disagreements are productive. Best model for deepening understanding." accent={SUNSHARE} />
          <InfoCard title="Whole class, shared screen" body="One device projected to the class. Pause at each decision point for group discussion before continuing. Time-intensive but high-impact." accent={AMBER} />
        </div>
        <div className="guide-highlight-box">
          <p className="guide-body"><strong>The most important facilitation principle — bookend, do not interrupt.</strong> Resist pausing mid-scene to deliver the lesson. The scene is the lesson. Pausing breaks the emotional momentum that makes it stick. Let students play through a complete scene or world, then discuss. Every question in Section 5 is designed to be asked after play, not during it.</p>
        </div>
        <p className="guide-eyebrow" style={{ marginTop: 20, marginBottom: 10 }}>Five-minute activator — run before World 1</p>
        <div className="guide-teal-box">
          <p className="guide-body" style={{ marginBottom: 8 }}><strong>The stranger question:</strong> Ask students to think of three things they would not tell a stranger who walked up to them on the street. Name them. Then ask: are any of those things currently visible on your public social media profile to anyone who searches for you?</p>
          <p className="guide-small">Takes five minutes, no devices needed. Creates the cognitive frame that makes World 2 land. Do not extend — leave it open and let the game close it.</p>
        </div>
      </Section>

      {/* Section 3 */}
      <Section eyebrow="Section 3" title="Timing and session planning">
        <TimingRow time="15–20 min" title="World 0 — Home (Tutorial)" body="Movement, inventory, inspecting objects, choices, saving. No lesson content. Can be skipped for confident players. Do not skip for less confident players — the tutorial builds the confidence that makes the rest accessible." />
        <TimingRow time="50–70 min" title="World 1 — Seabright" body="6 scenes + 2 minigames + 6 badges. Complete arc, satisfying resolution. Recommended as the first full session. Minigame 1 (Real or Fake?): 8–12 min. Minigame 2 (Danger on the Screen): 6–10 min." />
        <TimingRow time="25–35 min" title="The Lighthouse Bridge" body="4 scenes + 1 passphrase minigame. Usually played as the end of the Seabright session or the start of Sunshare Square. The passphrase set here carries through to the Observatory. Remind students to remember their passphrase." />
        <TimingRow time="70–90 min" title="World 2 — Sunshare Square" body="9 scenes + 2 minigames + 4 badges. The longest world, the most emotionally complex material. Allow extra discussion time after this world. Consider splitting across two sessions." />
        <TimingRow time="55–75 min" title="World 3 — The Observatory" body="7 scenes + 1 final minigame + 4 badges. The final minigame (Who Is the Real Aunt Mira?) requires synthesis across all worlds — allow 10–15 minutes. Do not split across sessions — the emotional payoff of the reunion requires the twin reveal to be fresh." />
        <div className="guide-note-box" style={{ marginTop: 16 }}>
          <p className="guide-small"><strong>Total:</strong> 3–5 hours of gameplay. A four-session programme — one per world, combining Lighthouse with Seabright — works well within a typical school half-term unit. Each world can also stand alone.</p>
        </div>
      </Section>

      {/* Section 4 */}
      <Section eyebrow="Section 4" title="Curriculum links">
        <p className="guide-body" style={{ marginBottom: 16 }}>The table below maps the game's content to key curriculum frameworks. Links are indicative — specific references vary by institution and national framework.</p>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr><th>Framework</th><th>Relevant strand</th><th>Game content</th></tr>
            </thead>
            <tbody>
              <tr><td>PSHE (UK)</td><td>Online safety and harms; managing personal information; recognising risky situations</td><td>All worlds. Specifically: Seabright (recognising scams), Sunshare Square (digital footprint, grooming signs, cyberbullying), Observatory (social engineering pattern)</td></tr>
              <tr><td>RSE / RSHE</td><td>Online relationships; consent; sharing images; seeking help</td><td>Sunshare Square: relational sharing (Posts 8 & 9), AI nonconsensual imagery (Amara's story), cyberbullying three positions, online trust and grooming warning signs</td></tr>
              <tr><td>Computing KS3</td><td>Digital literacy; cybersecurity; responsible use of technology</td><td>All worlds. Specifically: password strength and passphrases (Lighthouse), phishing mechanics (Seabright), MFA (Observatory), digital footprint (Sunshare Square)</td></tr>
              <tr><td>SMSC</td><td>Social development; moral understanding; cultural awareness of digital life</td><td>Cyberbullying scene — bystander, victim, perpetrator positions. Jaylen's admission. Social engineering as a named moral pattern.</td></tr>
              <tr><td>UK Online Safety Education Framework</td><td>Managing online information; privacy and security; online relationships; online reputation; online bullying</td><td>Comprehensive coverage across all worlds. Strongest alignment: online relationships (Sunshare Square), online bullying, managing information, privacy and security.</td></tr>
              <tr><td>Safeguarding context</td><td>Children's awareness of grooming; identifying and reporting concerning online contact</td><td>Sunshare Square Scene 3.5: secrecy as a red flag, platform migration as warning sign, tell-before-you-decide.</td></tr>
              <tr><td>ISTE Standards</td><td>Digital citizen: rights and responsibilities in digital environments</td><td>Digital footprint, internet permanence, relational sharing, cyberbullying three positions, password security, MFA.</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Section 5a */}
      <div className="guide-section">
        <WorldStrip emoji="⚓" world="World 1 — Seabright" subtitle="Discussion guide · Section 5a" color={SEABRIGHT} />
        <div className="guide-snapshot">A fishing village paralysed by scam messages. Emails pretending to be from the Harbour Authority, fake delivery texts, an official-sounding phone call, fake ads on the village tablet. Accounts drained, boats grounded. <strong>Key emotional moment:</strong> Bram waited three days to tell anyone because he was embarrassed. Old Finn says: "We are not stupid people."</div>
        <div className="guide-outcome-tags"><span>Phishing Spotter</span><span>Red Flag Detective</span><span>Message Detective</span><span>Countdown Buster</span><span>First Responder</span></div>
        <p className="guide-eyebrow" style={{ margin: '16px 0 12px', color: SEABRIGHT }}>After playing — discussion questions</p>
        <div className="guide-dq-list">
          <DQ num={1} color={SEABRIGHT} q="Old Finn said they are not stupid people — but they still fell for it. Why do smart people get caught by scams?" note="Key insight: scams are designed by professionals to trigger urgency and fear, which bypass careful thinking. This is not a character flaw. Paired discussion first, then share with the group." />
          <DQ num={2} color={SEABRIGHT} q="Bram waited three days before telling anyone. What did the delay cost him — and why do you think he waited?" note="Opens the conversation about shame as a barrier to reporting. Key principle: telling someone quickly is always better than waiting, even if waiting feels safer." />
          <DQ num={3} color={SEABRIGHT} q="What are the four steps to take if you think you have been scammed — and why does the order matter?" note="Tell someone → do not engage → report → block. The order matters because telling a trusted adult first means an adult can help with the next steps. Ask for the order before supplying it." />
          <DQ num={4} color={SEABRIGHT} q="If a message arrived on your phone right now saying your account would be closed in two hours — walk me through exactly what you would do." note="Brings it into their real life. Expected: pause, check the sender address independently, do not click the link, verify through the real website or app. If they say 'I would just check it' — ask how, specifically." />
        </div>
        <SensNote>Some students may have personal experience of a family member being scammed. The shame framing in Bram's story may resonate more than expected. If a student discloses that financial harm has occurred to a child or family, follow your school's safeguarding protocol.</SensNote>
      </div>

      {/* Section 5b */}
      <div className="guide-section">
        <WorldStrip emoji="🔦" world="The Lighthouse Bridge" subtitle="Discussion guide · Section 5b" color={LIGHTHOUSE} />
        <div className="guide-snapshot">At the top of the cliff the child knocks on the lighthouse door. A woman opens it — she has Aunt Mira's face. She is not Mira. She is Celia. She gives the child the Golden Knot, Mira's Notebook, and the Strongbox. <strong>Key metaphor:</strong> "A knot holds not by its complexity, but by its length and its commitment to itself."</div>
        <div className="guide-outcome-tags"><span>Password strength understood</span><span>Passphrase set and memorised</span><span>Shadow Man introduced</span></div>
        <p className="guide-eyebrow" style={{ margin: '16px 0 12px', color: LIGHTHOUSE }}>After playing — discussion questions</p>
        <div className="guide-dq-list">
          <DQ num={1} color={LIGHTHOUSE} q="Why is 'tiger cloud lamp river' a stronger password than 'Pa$$w0rd1'? Explain it to someone who has never heard of passphrases." note="Ask them to explain it peer-to-peer, not to you. The answer: 23 characters vs 9, length multiplies difficulty enormously, no predictable pattern. If they struggle, ask: which is longer?" />
          <DQ num={2} color={LIGHTHOUSE} q="Celia said the Shadow Man follows gaps — weak passwords, unlocked boxes, things left unprotected. What gaps might exist in your own digital life right now?" note="Expect answers about reused passwords, easy-to-guess passwords, accounts not updated. Do not shame specific answers — the point is awareness, not confession." />
        </div>
        <div className="guide-teal-box" style={{ marginTop: 16 }}>
          <p className="guide-eyebrow" style={{ marginBottom: 8 }}>Follow-up activity</p>
          <p className="guide-body"><strong>Passphrase challenge:</strong> Give students two minutes to create a passphrase of four or more random, unrelated words — nothing connected to their name, pets, school, or interests. Then ask: how would you remember it? This surfaces the practical challenge and opens the password manager conversation without requiring a full lesson.</p>
        </div>
      </div>

      {/* Section 5c */}
      <div className="guide-section">
        <WorldStrip emoji="📱" world="World 2 — Sunshare Square" subtitle="Discussion guide · Section 5c" color={SUNSHARE} />
        <div className="guide-snapshot">Sunshare Square is built around sharing — everything open, everything visible. Jaylen's gaming account taken over via security questions answered from his public posts. Priya impersonated using her profile information. Soren asked to keep an online friendship secret. And Amara, quietly on a bench — AI-generated fake images of her, shared around her school. <strong>This is the most emotionally dense world. Build in discussion time after it.</strong></div>
        <div className="guide-outcome-tags"><span>Footprint Tracker</span><span>Deliberate Sharer</span><span>Password Hygienist</span><span>Safe Editor</span></div>
        <p className="guide-eyebrow" style={{ margin: '16px 0 12px', color: SUNSHARE }}>After playing — discussion questions</p>
        <div className="guide-dq-list">
          <DQ num={1} color={SUNSHARE} q="What could a stranger learn about Priya from her public profile — without her realising she had shared any of it?" note="School name, teacher's name, weekly routine, friend's username, rough home location. Key insight: it is the combination, not any single post. Then: is there anything like that on yours?" />
          <DQ num={2} color={SUNSHARE} q="Soren was asked to keep an online friendship secret and move to an unknown app. Why is the secrecy request the red flag — even before anything else happened?" note="Genuine relationships do not require hiding from the people who care about you. The request to be secret is itself the signal. Ask: what would you do? Who would you tell?" />
          <DQ num={3} color={SUNSHARE} q="Maya had been in the group for three days without saying anything. The game said that was a choice. Do you agree — and what were her options?" note="The bystander position. Silence is read as approval by the person being targeted. Expect disagreement — some students will argue Maya was protecting herself. That is a productive disagreement to have." />
          <DQ num={4} color={SUNSHARE} q="Jaylen admitted he had laughed at content in a group chat last year. He did not see himself as a bully. What does that tell us about how online harm works?" note="Most harm is not done by people who identify as bullies — it is done by people who did not think about the person on the other end. Give this question space. Do not rush to the moral." />
        </div>
        <SensNote><strong>Cyberbullying (Scene 4.5):</strong> Students may identify strongly with one of the three positions. Allow space without putting individuals on the spot. If a student discloses current bullying, follow your school's anti-bullying and safeguarding protocols.<br /><br /><strong>Online grooming warning signs (Scene 3.5):</strong> The secrecy and platform migration scenario may prompt a student to disclose a concerning online contact. Treat as a potential safeguarding matter — thank the student, do not probe further, involve the DSL immediately.<br /><br /><strong>AI-generated nonconsensual imagery (Scene 5):</strong> Introduced briefly through Amara. If a student discloses that this has happened to them or someone they know, this is a serious safeguarding matter. Do not manage it in the classroom — involve the DSL immediately.</SensNote>
      </div>

      {/* Section 5d */}
      <div className="guide-section">
        <WorldStrip emoji="🔭" world="World 3 — The Observatory" subtitle="Discussion guide · Section 5d" color={OBSERVATORY} />
        <div className="guide-snapshot">Two identical women wait at the top of the hill. Both have Aunt Mira's face. Both say the same thing. One is real. One is a trap. The child explores the Observatory — learning smishing, vishing, and MFA — while watching both women interact differently with each discovery. The impostor creates urgency. The real Mira waits. <strong>The answer is in the behaviour, not the face.</strong></div>
        <div className="guide-outcome-tags"><span>Smishing Spotter</span><span>Vishing Spotter</span><span>Second Lock (MFA)</span><span>Social Engineer Spotter</span></div>
        <p className="guide-eyebrow" style={{ margin: '16px 0 12px', color: OBSERVATORY }}>After playing — discussion questions</p>
        <div className="guide-dq-list">
          <DQ num={1} color={OBSERVATORY} q="How did you work out which one was really Aunt Mira? What were the specific signals that told you the other one was the impostor?" note="This is the synthesis question — it contains the whole game. Expected: urgency, authority, pressure to skip thinking, knowledge she should not have had. Do not supply the answer." />
          <DQ num={2} color={OBSERVATORY} q="The game called it social engineering. What does that mean — and where else might you see those same tactics used?" note="Manipulating feelings rather than breaking systems. Ask where else the pattern appears — in advertising, peer pressure, group dynamics, online recruitment. It extends far beyond scams." />
          <DQ num={3} color={OBSERVATORY} q="Why does two-factor authentication make an account so much harder to access — even if someone knows your password?" note="Something you know AND something you have. Practical follow-up: which of your accounts have two-factor on? How would you turn it on for your email?" />
          <DQ num={4} color={OBSERVATORY} q="Mira said: 'He doesn't stop existing — but he stops mattering to the people who know what you know now.' What did she mean?" note="The risks do not disappear. Knowledge changes the relationship to them. Allow it to land quietly — do not rush to a follow-up question." />
        </div>
      </div>

      {/* Section 6 */}
      <Section eyebrow="Section 6" title="Follow-up activities">
        <p className="guide-body" style={{ marginBottom: 16 }}>Four offline activities that extend the learning without a screen. Each works as a standalone lesson, homework task, or end-of-unit activity.</p>
        <div className="guide-activity-list">
          <Activity num={1} title="The Profile Audit" chips={['20–30 min', 'Pairs or small groups', 'Connects to: Sunshare Square']} body="Create a fictional social media profile for a made-up 12-year-old. Give them a name, a school, a few posts, a profile photo description. Swap with another group and answer: what does a stranger now know? What could they use, and how? The fictional character protects students from feeling personally exposed while making the lesson concrete." />
          <Activity num={2} title="Spot the Red Flag" chips={['15–20 min', 'Individual or pairs', 'Connects to: Seabright, Observatory']} body="Give students five written messages — a mix of real and fake. Identify the red flags in each fake one. Then ask: which was hardest to spot, and why? The hardest ones are always the most personalised. Lesson: sophistication is not legitimacy." />
          <Activity num={3} title="Three Positions — One Scenario" chips={['25–35 min', 'Groups of 3', 'Connects to: Sunshare Square Scene 4.5']} body="Give each group a written cyberbullying scenario. Each person takes one position — targeted, bystander, contributor. Each writes three sentences: what they are feeling, what they are thinking, what they could do differently. The perpetrator position is the most important to give space to — it is the one most likely to change actual behaviour." />
          <Activity num={4} title="A Letter to a Younger Sibling" chips={['20–30 min', 'Individual', 'Connects to: all worlds']} body="Write a short letter to a fictional 9-year-old sibling about to get their first phone. Explain one thing learned from the game — in language a 9-year-old would understand. No jargon. No lists. Just one thing, explained clearly. If they can explain it simply, they understand it deeply. This is the best assessment of understanding in this guide." />
        </div>
      </Section>

      {/* Section 7 */}
      <Section eyebrow="Section 7" title="Before and after reflection tool">
        <p className="guide-body" style={{ marginBottom: 16 }}>Not a test. Completed by the student before playing and again after. The shift in responses is evidence of learning. <strong>Reassure students there are no wrong answers</strong> — this is about what they think, not what they know.</p>
        <div className="guide-reflect-tool">
          <div className="guide-reflect-q"><span className="guide-reflect-label">Q1</span><p className="guide-reflect-text">A text message arrives saying your account will be closed in one hour unless you reply. What do you do?</p></div>
          <div className="guide-reflect-q"><span className="guide-reflect-label">Q2</span><p className="guide-reflect-text">How confident do you feel spotting a fake email or text message? <em>(1 = not at all, 5 = very confident)</em></p></div>
          <div className="guide-reflect-q"><span className="guide-reflect-label">Q3</span><p className="guide-reflect-text">Someone you have been gaming with online for three weeks asks you to move your chat to an app your parents have not heard of, and to keep it secret. What do you do?</p></div>
          <div className="guide-reflect-q"><span className="guide-reflect-label">Q4</span><p className="guide-reflect-text">You see a mocking post about a classmate being shared around a group chat. You did not post anything yourself. Do you do anything? What?</p></div>
          <div className="guide-reflect-q"><span className="guide-reflect-label">Q5</span><p className="guide-reflect-text">What is one thing you would tell a younger child about being safe online?</p></div>
        </div>
        <p className="guide-small" style={{ marginTop: 12 }}>Print one per student. Complete before the first session and after the final session. Keep the before copy. Q2 uses a scale for easy tracking. Q1, Q3, Q4, and Q5 are open — look for increased specificity, more options named, and a shift from passive to active responses over time.</p>
      </Section>

      {/* Section 8 */}
      <Section eyebrow="Section 8" title="Safeguarding and disclosure protocol">
        <p className="guide-body" style={{ marginBottom: 20 }}>When Mira Calls addresses topics that may prompt a student to disclose something that has happened to them or someone they know. This is not a risk — it is often a positive outcome of the game creating a safe context to talk. What matters is how the disclosure is handled.</p>
        <p className="guide-eyebrow" style={{ marginBottom: 12, color: '#c04828' }}>Potential disclosure triggers by world</p>
        <div className="guide-trigger-list" style={{ marginBottom: 24 }}>
          <div className="guide-trigger"><span className="guide-trigger-tag">Seabright</span><p className="guide-small">Financial scam affecting the student or family. <strong>Action:</strong> acknowledge, do not probe, refer to DSL if financial harm to a child or family is involved.</p></div>
          <div className="guide-trigger"><span className="guide-trigger-tag">Sunshare Sq.</span><p className="guide-small">Current cyberbullying targeting (any position). Concerning online contact involving secrecy or platform migration. AI-generated harmful imagery. <strong>Action:</strong> treat any disclosure from this world as a potential safeguarding matter; involve the DSL promptly.</p></div>
          <div className="guide-trigger"><span className="guide-trigger-tag">Observatory</span><p className="guide-small">Recognition of social engineering patterns in an existing real relationship or online contact. <strong>Action:</strong> if a student identifies a real relationship matching the pattern, do not dismiss. Take details and involve the DSL.</p></div>
        </div>
        <p className="guide-eyebrow" style={{ marginBottom: 14 }}>If a student discloses during a session</p>
        <div className="guide-safe-steps">
          <SafeStep num={1} title="Stay calm and listen" body='Do not show alarm. Say: "Thank you for telling me. You did the right thing." Do not ask probing questions or seek more detail than the student volunteers.' />
          <SafeStep num={2} title="Do not promise confidentiality" body='You may need to share what the student has told you with the designated safeguarding lead. Be honest: "I will need to share this with someone who can help, but I will do that carefully."' />
          <SafeStep num={3} title="Do not investigate" body='Your role is to receive, record, and refer — not to investigate. Ask only: "Can you tell me a little more about what happened?" Do not press for detail.' />
          <SafeStep num={4} title="Record and refer promptly" body="Write down what was said as close to verbatim as possible using the student's own words. Include time and date. Refer to your Designated Safeguarding Lead the same day." />
        </div>
        <div className="guide-coral-box" style={{ marginTop: 20 }}>
          <p className="guide-small"><strong>Important:</strong> This guide does not replace your institution's safeguarding policy. All disclosures must be handled in accordance with your school or organisation's procedures and the relevant national framework. If you are unsure, contact your DSL immediately rather than waiting.</p>
        </div>
      </Section>

      {/* Closing */}
      <div className="guide-closing">
        <div className="guide-rule" />
        <p className="guide-closing-quote">"He doesn't stop existing. But he stops <em>mattering</em> — to the people who know what you know now."</p>
        <p className="guide-closing-body">That is what Aunt Mira says at the end of the journey. The risks of the online world do not disappear when the game ends. But a child who can name the tactics — urgency, fear, authority, secrecy, manufactured belonging — is fundamentally more resilient than one who cannot.</p>
        <p className="guide-closing-body"><strong>Your role is not to be the expert.</strong> The game is the expert. Your role is to create the space in which what the child learned can become something they own — a habit of thought, a reflex of caution, a confidence that they can figure it out.</p>
        <p className="guide-closing-body">If a student leaves your sessions with one thing, let it be this: <strong>when something feels wrong online, telling someone is always the right call.</strong></p>
      </div>
    </div>
  )
}

// ── CONVERSATION GUIDE ───────────────────────────────────────────────

function ConversationGuide() {
  const SEABRIGHT   = '#3a5a9a'
  const LIGHTHOUSE  = '#a07020'
  const SUNSHARE    = '#2a7a6a'
  const OBSERVATORY = '#7a4aaa'

  function CQ({ color, q, note }) {
    return (
      <div className="guide-dq">
        <div className="guide-dq-num" style={{ background: color }}>?</div>
        <div>
          <p className="guide-dq-q">{q}</p>
          {note && <p className="guide-dq-note">{note}</p>}
        </div>
      </div>
    )
  }

  function DYK({ body }) {
    return (
      <div className="guide-dyk">
        <span className="guide-dyk-icon">💡</span>
        <div>
          <p className="guide-eyebrow" style={{ marginBottom: 4 }}>For the parent</p>
          <p className="guide-small">{body}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="guide-content">

      {/* Cover */}
      <div className="guide-cover">
        <div className="guide-cover-eyebrow">For parents and carers · When Mira Calls</div>
        <h1 className="guide-cover-title">Things worth <em>talking about</em></h1>
        <p className="guide-cover-sub">Your child has just been on a journey. They crossed three worlds, helped a fishing village recover from a wave of scams, figured out how a gaming account was taken over, spotted a trap at the finish line, and found an aunt they never knew they had. <strong>They learned a great deal.</strong> These questions help it stick.</p>
        <div className="guide-cover-note">
          You do not need to be a technology expert to use this guide. Your child has the knowledge — these questions invite them to share it. Your job is to listen and be curious, not to teach.
        </div>
      </div>

      {/* How to have the conversation */}
      <Section eyebrow="Before you begin" title="How to have the conversation">
        <p className="guide-body" style={{ marginBottom: 20 }}>There is no right answer to any of these questions. The point is not to test your child — it is to give them the chance to explain what they understood, and to let you know what landed. Some conversations will be long. Some will be a single sentence. Both are fine.</p>
        <div className="guide-two-col" style={{ gap: 16 }}>
          <div className="guide-tip-card guide-tip-card--do">
            <p className="guide-tip-label" style={{ color: '#2a7a6a' }}>What works well</p>
            <ul className="guide-tip-list">
              <li>Ask one question and then <strong>wait</strong>. Silence after a question is not awkward — it is thinking.</li>
              <li>Say <strong>"I hadn't thought of it that way"</strong> when they explain something well.</li>
              <li>Ask follow-up questions like <strong>"what made you think that?"</strong> or <strong>"what would you do differently?"</strong></li>
              <li>Let them <strong>be the expert</strong>. They played the game. You did not.</li>
              <li>If they say something surprising, <strong>stay with it</strong> rather than moving on.</li>
            </ul>
          </div>
          <div className="guide-tip-card guide-tip-card--dont">
            <p className="guide-tip-label" style={{ color: '#c04828' }}>What tends to close things down</p>
            <ul className="guide-tip-list">
              <li>Starting with <strong>"did you know..."</strong> — it signals a lecture rather than a conversation.</li>
              <li>Asking about <strong>your child specifically</strong> too early. Start with the game characters.</li>
              <li><strong>Rushing to the lesson</strong> before they have finished explaining what happened.</li>
              <li>Saying <strong>"that's obvious"</strong> or "you should have known that already."</li>
              <li>Asking <strong>multiple questions at once</strong>. One at a time. Always.</li>
            </ul>
          </div>
        </div>
        <div className="guide-highlight-box" style={{ marginTop: 20 }}>
          <p className="guide-body" style={{ fontStyle: 'italic' }}>The best moment for this conversation is <strong>shortly after they have played</strong> — in the car on the way home, over dinner, before bed. Not immediately after (let them breathe), and not a week later (the details will have faded). The sweet spot is within a day or two.</p>
        </div>
      </Section>

      {/* World 1 */}
      <div className="guide-section">
        <div className="guide-world-strip" style={{ borderLeftColor: SEABRIGHT }}>
          <span className="guide-world-emoji">⚓</span>
          <div>
            <p className="guide-world-title">World 1 — Seabright, the Fishing Village</p>
            <p className="guide-world-sub">Conversation guide</p>
          </div>
        </div>
        <div className="guide-snapshot">A fishing village has been paralysed by scam messages. Emails pretending to be from the Harbour Authority, fake delivery texts, an official-sounding phone call — all designed to steal login details and money. Your child worked through what happened with each fisherman, figured out how they were fooled, and helped the village understand what to watch for. Old Finn admitted he was embarrassed. Bram had waited three days to tell anyone. <strong>The boats were moving again by the end.</strong></div>
        <div className="guide-dq-list">
          <CQ color={SEABRIGHT} q='"Old Finn said he was embarrassed — that they are not stupid people, but they still fell for it. Why do you think that happened?"' note="This gets at the core of the phishing lesson without using the word phishing. They should be able to explain urgency, fear, and the fake sender address. Let them work through it. Do not supply the answer." />
          <CQ color={SEABRIGHT} q='"Bram waited three days before telling anyone what had happened. Why do you think he did that — and what did the delay cost him?"' note='Bram said: "I am a grown man. How do I explain that I fell for something like this?" This is about shame preventing action. The conversation can go toward: what would you do if something like that happened to you?' />
          <CQ color={SEABRIGHT} q='"If a message arrived on your phone right now that said your account would be closed in two hours unless you replied — what would you do?"' note='This brings it home. They know the answer. This gives them the chance to say it out loud, which makes it more likely to become instinct. If they say "check it first" — ask how, specifically.' />
        </div>
        <DYK body="Scam messages are deliberately designed to trigger urgency and fear — because those feelings bypass careful thinking. That is not a weakness in the people who fall for them. It is the design. Anyone can be caught off-guard. The protection is the habit of pausing before acting, however urgent the message feels." />
      </div>

      {/* Lighthouse */}
      <div className="guide-section">
        <div className="guide-world-strip" style={{ borderLeftColor: LIGHTHOUSE }}>
          <span className="guide-world-emoji">🔦</span>
          <div>
            <p className="guide-world-title">The Lighthouse Bridge — Aunt Celia</p>
            <p className="guide-world-sub">Between worlds</p>
          </div>
        </div>
        <div className="guide-snapshot">At the top of the cliff, your child knocked on the lighthouse door. A woman opened it — and for a moment, they thought they had found Aunt Mira. They had not. It was Celia, one of Mira's sisters. Warm, funny, slightly chaotic. She gave your child the Golden Knot — a small gold object with no visible beginning or end — and a lesson about passwords. <strong>A knot holds not by its complexity, but by its length and its commitment to itself.</strong></div>
        <div className="guide-dq-list">
          <CQ color={LIGHTHOUSE} q={"\"Why is 'tiger cloud lamp river' a stronger password than 'Pa$$w0rd1'? What did Celia explain about the knot?\""} note="Let them explain the passphrase logic back to you. The maths is simple: more characters multiplies the difficulty enormously. If they can explain it in their own words, it has landed. If they struggle, ask: which is longer?" />
          <CQ color={LIGHTHOUSE} q='"Celia said the Shadow Man follows gaps — weak passwords, unlocked boxes, things left unprotected. What gaps do you think you might have?"' note="Not an accusation — genuine curiosity. They may mention reused passwords, an account they have not updated in a while, or a password that is their pet's name. Whatever they say, take it seriously without panicking." />
        </div>
        <DYK body="The most common passwords are still 123456, password, and qwerty. The game teaches that a passphrase — four or more random unrelated words — is both stronger and easier to remember than a short complex password. Consider trying this together: create a passphrase for a shared account and see how it feels to use." />
      </div>

      {/* Sunshare */}
      <div className="guide-section">
        <div className="guide-world-strip" style={{ borderLeftColor: SUNSHARE }}>
          <span className="guide-world-emoji">📱</span>
          <div>
            <p className="guide-world-title">World 2 — Sunshare Square, Aunt Rosa</p>
            <p className="guide-world-sub">Conversation guide</p>
          </div>
        </div>
        <div className="guide-snapshot">Sunshare Square is built around sharing — but something has gone wrong. Jaylen's gaming account was taken over using information from his own public posts. Priya's friends received fake messages written in her voice. Your child traced the trail piece by piece. They also met Soren, who was asked to keep an online friendship secret from his parents, and learned why that request itself was the warning sign. And they sat with Maya, Priya, and Jaylen as all three positions in a cyberbullying situation became clear.</div>
        <div className="guide-dq-list">
          <CQ color={SUNSHARE} q={"\"Priya said 'I just thought I was posting normal things.' What did a stranger actually learn from her profile without her realising?\""} note="They should be able to list: her school, her teacher's name, her weekly routine, her friend's username, roughly where she lived. The lesson is that individual details seem harmless — it is the combination that builds the picture. Then, gently: is there anything like that on yours?" />
          <CQ color={SUNSHARE} q={"\"Soren was asked to move his gaming chat to an app his parents hadn't heard of, and to keep it secret. Why was that the red flag — even before anything else happened?\""} note="The lesson: genuine friendships do not require secrecy from the people who care about you. The request to hide things is the signal, not what comes after it. Ask: what would you do if that happened to you?" />
          <CQ color={SUNSHARE} q='"Jaylen admitted he had been in a group chat where someone was being mocked. He laughed at some of it. What did he say when he looked back on it?"' note="He said he did not think it was that bad at the time. He is thinking about it differently now. This is the perpetrator position — not a villain, just someone who did not think about the person at the other end. Give this question space. Do not rush to the moral." />
          <CQ color={SUNSHARE} q={"\"Mira's notebook said: 'The better question is never Can I delete this? The better question is Am I comfortable with this existing permanently?' What do you think that means in practice?\""} note="This one can become a genuine conversation about what they post and why. Not a rule — a habit of thought. What would they apply it to? What has gone by that test so far?" />
        </div>
        <DYK body="When someone asks a young person to keep an online friendship secret from parents, it is one of the clearest warning signs of grooming — regardless of how genuine the person has seemed. Teach your child that you will never be angry at them for telling you, and that the worst outcome of telling you is a conversation. The worst outcome of not telling you is almost always worse." />
      </div>

      {/* Observatory */}
      <div className="guide-section">
        <div className="guide-world-strip" style={{ borderLeftColor: OBSERVATORY }}>
          <span className="guide-world-emoji">🔭</span>
          <div>
            <p className="guide-world-title">World 3 — The Observatory, Aunt Mira</p>
            <p className="guide-world-sub">Conversation guide</p>
          </div>
        </div>
        <div className="guide-snapshot">At the top of the hill, two identical women waited. Both had Aunt Mira's face. Both said the same thing. One was the real Mira. One was a trap. Your child had to use everything they had learned across the whole journey to tell them apart. The impostor kept creating urgency. The real Mira waited. She taught without performing. She never once asked for the items. And when your child had worked it all out, <strong>she said: "You made it."</strong></div>
        <div className="guide-dq-list">
          <CQ color={OBSERVATORY} q='"How did you figure out which one was really Aunt Mira? What gave the impostor away?"' note="This is the most important question in the guide. The answer is the entire game compressed into one conversation. They should be able to name urgency, authority, pressure to bypass thinking, and something she knew that she should not have known. Let them take their time." />
          <CQ color={OBSERVATORY} q='"The game called it social engineering — the pattern behind every attack across the whole journey. What did it mean?"' note="Manipulating feelings rather than breaking systems. Urgency. Fear. Authority. Manufactured trust. Ask where else they have seen this pattern — in a game, in a group chat, in something that happened to a friend." />
          <CQ color={OBSERVATORY} q={"\"Mira said: 'He doesn't stop existing — but he stops mattering to the people who know what you know now.' What do you think she meant?\""} note="The Shadow Man — or whoever he represents in real life — does not disappear. But knowledge changes the relationship. This is worth sitting with. It is the emotional close of the whole game." />
        </div>
        <DYK body="Social engineering — manipulating people rather than systems — is behind the majority of successful cyberattacks on individuals and organisations. The tactics are always the same: urgency, authority, fear, trust, and secrecy. A child who can name those tactics in a game will recognise them in real life. That is the whole point of this journey." />
      </div>

      {/* If something comes up */}
      <Section eyebrow="For parents and carers" title="If something worrying comes up">
        <p className="guide-body" style={{ marginBottom: 20 }}>The game touches on real situations. Occasionally, a conversation started by these questions will lead your child to mention something that has actually happened to them — or to a friend. If that happens:</p>
        <div className="guide-closing-box" style={{ marginBottom: 24 }}>
          <p style={{ fontStyle: 'italic' }}>Stay calm. <em style={{ color: '#ffd84d', fontStyle: 'normal' }}>Listen first.</em> Thank them for telling you. It takes real courage to say something. The response that matters most in the first thirty seconds is not information or advice — it is making them feel heard and safe.</p>
        </div>
        <div className="guide-safe-steps">
          <SafeStep num={1} title="Ask them to show you" body="If they received a message, saw something, or have evidence of what happened — ask if they are comfortable showing you. Reflect and research the best course of action." />
          <SafeStep num={2} title="Report it on the platform" body="Most platforms have a report function. Use it. On a mobile phone, suspicious texts can be forwarded to 7726 (SPAM) — this works on most US carriers and helps block similar messages." />
          <SafeStep num={3} title="Contact support if needed" body="If the situation involves contact from a stranger, financial loss, threats, or images shared without consent — contact your local non-emergency police line or one of the specialist organisations below." />
          <SafeStep num={4} title="Remind them it is not their fault" body='"Telling me was exactly the right thing to do. None of this is your fault. It is never too late to tell someone." Say those words, in that order. They matter.' />
        </div>
        <div style={{ marginTop: 24 }}>
          <p className="guide-eyebrow" style={{ marginBottom: 12 }}>Specialist support organisations</p>
          <div className="guide-helpline-grid">
            <div className="guide-helpline-card"><p className="guide-helpline-name">NCMEC CyberTipline</p><p className="guide-helpline-desc">Report online child exploitation or grooming: 1-800-843-5678 or cybertip.org</p></div>
            <div className="guide-helpline-card"><p className="guide-helpline-name">Crisis Text Line</p><p className="guide-helpline-desc">Free confidential support for young people: text HOME to 741741</p></div>
            <div className="guide-helpline-card"><p className="guide-helpline-name">Childhelp National Child Abuse Hotline</p><p className="guide-helpline-desc">Report child abuse, get support: 1-800-422-4453 or childhelphotline.org</p></div>
            <div className="guide-helpline-card"><p className="guide-helpline-name">FTC ReportFraud</p><p className="guide-helpline-desc">Report financial fraud, scams, and cybercrime: ReportFraud.ftc.gov</p></div>
          </div>
          <p className="guide-small" style={{ marginTop: 10, fontStyle: 'italic' }}>Resources and contact details listed are for the US. If you are outside the US, search for your national equivalent.</p>
        </div>
      </Section>

      {/* Closing */}
      <div className="guide-closing">
        <div className="guide-rule" />
        <p className="guide-closing-quote">"The knot holds not by its complexity — but by its <em>length</em>, and its commitment to itself."</p>
        <p className="guide-closing-attr">— Aunt Mira, When Mira Calls</p>
        <p className="guide-closing-body">The game ends with that line — and it is not just about passwords. It is about the whole journey. Every lesson, every world, every choice held because your child stayed with it. That persistence is the skill. Not the information. Not the rules. The <strong>habit of pausing, checking, and thinking before acting</strong> — built across a story they actually wanted to follow.</p>
        <p className="guide-closing-body">The conversations in this guide are one more layer of that. Each time your child explains something back to you — even imperfectly — the understanding deepens. You do not need to know the answers. <strong>You just need to be curious about theirs.</strong></p>
      </div>
    </div>
  )
}

// ── MAIN OVERLAY ─────────────────────────────────────────────────────

export default function GuidesOverlay({ onClose }) {
  const [tab, setTab] = useState('educator')

  return (
    <div className="guides-overlay">
      <div className="guides-panel">
        <div className="guides-header">
          <div className="guides-tabs">
            <button
              className={`guides-tab${tab === 'educator' ? ' guides-tab--active' : ''}`}
              onClick={() => setTab('educator')}
            >
              Educator Guide
            </button>
            <button
              className={`guides-tab${tab === 'conversation' ? ' guides-tab--active' : ''}`}
              onClick={() => setTab('conversation')}
            >
              Conversation Guide
            </button>
          </div>
          <button className="guides-close" onClick={onClose}>✕</button>
        </div>
        <div className="guides-body">
          {tab === 'educator' ? <EducatorGuide /> : <ConversationGuide />}
        </div>
      </div>
    </div>
  )
}
