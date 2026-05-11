import React from 'react'

function PCGCover() {
  return (
    <div className="pcg-cover">
      <p className="pcg-cover-label">For parents and carers · When Mira Calls</p>
      <h1 className="pcg-cover-title">
        <span className="pcg-cover-line1">Things worth</span>
        <span className="pcg-cover-line2">talking about</span>
      </h1>
      <p className="pcg-cover-body">Your child has just been on a journey. They crossed three worlds, helped a fishing village recover from a wave of scams, figured out how a gaming account was taken over, spotted a trap at the finish line, and found an aunt they never knew they had.</p>
      <p className="pcg-cover-body">They learned a great deal. These questions help it stick.</p>
      <p className="pcg-cover-note">You do not need to be a technology expert to use this guide. Your child has the knowledge. These questions invite them to share it. Your job is to listen and be curious, not to teach.</p>
    </div>
  )
}

function PCGSection({ label, title, teal, children }) {
  return (
    <div className="pcg-section">
      <p className="pcg-section-label">{label}</p>
      <h2 className="pcg-section-head">{title}</h2>
      <hr className={`pcg-section-rule${teal ? ' pcg-section-rule--teal' : ''}`} />
      {children}
    </div>
  )
}

function WhatHappened({ label = 'What happened in this world', children }) {
  return (
    <div className="pcg-what-happened">
      <p className="pcg-what-happened-label">{label}</p>
      {children}
    </div>
  )
}

function QB({ question, note }) {
  return (
    <div className="pcg-question-block">
      <p className="pcg-question-text">{question}</p>
      {note && <p className="pcg-question-note" dangerouslySetInnerHTML={{ __html: note }} />}
    </div>
  )
}

function QRule() {
  return <hr className="pcg-q-rule" />
}

function ForParent({ children }) {
  return (
    <div className="pcg-for-parent">
      <p className="pcg-for-parent-label">For the parent</p>
      <p>{children}</p>
    </div>
  )
}

function TimingBox({ children }) {
  return <div className="pcg-timing-box">{children}</div>
}

function NavyCallout({ children }) {
  return (
    <div className="pcg-navy-callout">
      <p>{children}</p>
    </div>
  )
}

function Step({ num, title, text }) {
  return (
    <div className="pcg-step">
      <div className="pcg-step-num">{num}</div>
      <div className="pcg-step-body">
        <p className="pcg-step-title">{title}</p>
        <p className="pcg-step-text" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  )
}

function ColCard({ variant, title, items }) {
  return (
    <div className={`pcg-col-card pcg-col-card--${variant}`}>
      <p className="pcg-col-card-title">{title}</p>
      <ul>
        {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
      </ul>
    </div>
  )
}

function ResourceCard({ name, children }) {
  return (
    <div className="pcg-resource-card">
      <p className="pcg-resource-card-name">{name}</p>
      <p className="pcg-resource-card-detail">{children}</p>
    </div>
  )
}

function PCGClosing() {
  return (
    <div className="pcg-closing">
      <hr className="pcg-closing-rule" />
      <div className="pcg-closing-quote">"The knot holds not by its complexity, but by its <span className="pcg-closing-amber">length</span>, and its commitment to itself."</div>
      <p>The game ends with that line, and it is not just about passwords. It is about the whole journey. Every lesson, every world, every choice held because your child stayed with it. That persistence is the skill. Not the information. Not the rules. The habit of pausing.</p>
      <p>The conversations in this guide are one more layer of that. Each time your child explains something back to you, even imperfectly, the understanding deepens.</p>
      <p>You do not need to know the answers. You just need to be curious about theirs.</p>
      <div className="pcg-footer">
        <span className="pcg-footer-name">When Mira Calls</span>
        <span className="pcg-footer-sep">·</span>
        <span className="pcg-footer-age">Ages 11–13</span>
      </div>
    </div>
  )
}

export default function GuidesOverlay({ onClose }) {
  return (
    <div className="guides-overlay">
      <div className="guides-panel">
        <div className="guides-header">
          <span className="guides-header-title">Parent &amp; Carer Guide</span>
          <div className="guides-header-actions">
            <button
              className="guides-pdf-btn"
              onClick={() => window.open('/parent-guide.html', '_blank')}
              title="Download as PDF"
            >
              ↓ PDF
            </button>
            <button className="guides-close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="guides-body">

          <PCGCover />

          <PCGSection label="Before you begin" title="How to have the conversation">
            <p className="pcg-prose">There is no right answer to any of these questions. The point is not to test your child. It is to give them the chance to explain what they understood, and to let you know what landed. Some conversations will be long. Some will be a single sentence. Both are fine.</p>
            <div className="pcg-two-col">
              <ColCard variant="good" title="What works well" items={[
                'Ask one question and then <b>wait</b>. Silence after a question is not awkward. It is thinking.',
                'Say <b>"I hadn\'t thought of it that way"</b> when they explain something well. It tells them their understanding has value.',
                'Ask follow-up questions like <b>"What made you think that?"</b> or <b>"What would you do differently?"</b>',
                'Let them <b>be the expert</b>. They played the game. You did not. The curiosity you bring is genuine.',
                'If they say something surprising, <b>stay with it</b> rather than moving on. The interesting thing is usually one question deeper.',
              ]} />
              <ColCard variant="bad" title="What tends to close things down" items={[
                'Starting with <b>"did you know..."</b> signals a lecture rather than a conversation.',
                'Asking about <b>your child specifically</b> too early. Start with the game characters first.',
                'Rushing to the lesson before they have finished explaining what happened in the story.',
                'Saying <b>"that\'s obvious"</b> or "you should have known that already." They are learning. So, quietly, are you.',
                'Asking <b>multiple questions at once</b>. One at a time. Always.',
              ]} />
            </div>
            <TimingBox>The best moment for this conversation is shortly after they have played: in the car on the way home, over dinner, before bed. Not immediately after (let them breathe), and not a week later (the details will have faded). The sweet spot is within a day or two.</TimingBox>
          </PCGSection>

          <PCGSection label="World 1" title="Seabright: The Fishing Village" teal>
            <WhatHappened>
              <p>A fishing village has been paralyzed by scam messages. Emails pretending to be from the Harbor Authority, fake delivery texts, and scam advertisements designed to create false urgency, all targeting login details and personal information. Your child worked through what happened with each fisherman, figured out how they were fooled, and helped the village understand what to watch for. Old Finn admitted he was embarrassed. Bram had waited three days to tell anyone. <strong>The boats were moving again by the end.</strong></p>
            </WhatHappened>
            <QB
              question='"Old Finn said he was embarrassed, that they are not stupid people, but they still fell for it. Why do you think that happened?"'
              note='This gets at the heart of the phishing lesson without using the word phishing. They should be able to explain urgency, fear, and the fake sender address. Let them work through it. <b>Do not supply the answer.</b>'
            />
            <QRule />
            <QB
              question={`"Coral pulled you aside to admit she had clicked a link the day before but hadn't told anyone. What was stopping her, and what did the player say that made it easier for her to speak up?"`}
              note='This is about embarrassment and fear preventing action. Coral spotted something was wrong and closed the page immediately, but still stayed quiet for nearly a day. The conversation can lead toward: what would make it easier for you to tell me if something like that happened to you? <b>Let them answer before you do.</b>'
            />
            <QRule />
            <QB
              question='"If a message arrived on your phone right now saying your account would be closed in two hours unless you replied, what would you do?"'
              note='This brings it home. They know the answer. Saying it out loud makes it more likely to become instinct. If they say <em>"check it first"</em>, <b>ask how, specifically.</b>'
            />
            <ForParent>Scam messages are deliberately designed to trigger urgency and fear, because those feelings bypass careful thinking. That is not a weakness in the people who fall for them. It is the design. <strong>Anyone can be caught off-guard.</strong> The protection is the habit of pausing before acting, however urgent the message feels.</ForParent>
          </PCGSection>

          <PCGSection label="Between Worlds" title="The Lighthouse Bridge: Aunt Celia" teal>
            <WhatHappened label="What happened here">
              <p>At the top of the cliff, your child knocked on the lighthouse door. A woman opened it, and for a moment, they thought they had found Aunt Mira. They had not. It was Celia, one of Mira's sisters. Warm, funny, slightly chaotic. She gave your child the Golden Knot, a small gold object with no visible beginning or end, and a lesson about passwords.</p>
              <p>A knot holds not by its complexity, but by its length and its commitment to itself. Then the lighthouse beam swept the cliff path below, and for two seconds, something stood there watching.</p>
            </WhatHappened>
            <QB
              question={"\"Why is 'tiger cloud lamp river' a stronger password than 'Pa$$w0rd1'? What did Aunt Celia explain about the knot?\""}
              note='Let them explain the passphrase logic back to you. The maths is simple: more characters multiplies the difficulty enormously. If they can explain it in their own words, it has landed. If they struggle, ask: <b>which is longer?</b>'
            />
            <QRule />
            <QB
              question='"Aunt Celia said the Shadow Man follows gaps: weak passwords, unlocked boxes, things left unprotected. What gaps do you think you might have?"'
              note="Not an accusation. Genuine curiosity. They may mention reused passwords, an account they have not updated, or a password that is their pet's name. <b>Whatever they say, take it seriously without panicking.</b>"
            />
            <ForParent>The most common passwords are still <strong>123456, password, and qwerty</strong>. The game teaches that a passphrase, four or more random unrelated words, is both stronger and easier to remember than a short complex password. Consider trying this together: create a passphrase for a shared account and see how it feels to use.</ForParent>
          </PCGSection>

          <PCGSection label="World 2" title="Sunshare Square: Aunt Rosa" teal>
            <WhatHappened>
              <p>Sunshare Square is built around sharing, but something has gone wrong. Priya's gaming account was taken over using answers to her security questions, answers that were sitting publicly on her own profile. Her friends received fake messages written in her voice. Your child traced the trail piece by piece: a school badge in a photo, a teacher's name in a caption, a weekly routine revealed in a post, until the full picture became visible.</p>
              <p>Priya also showed the player a message from someone she had only ever spoken to online, who was asking her to move the conversation to a different app and not tell her parents. Later in the same world, Priya turned her phone face-down when the player approached. When she showed the screen, it was a group chat where a classmate was being mocked. Priya was in the group. She had not reacted. She had not left.</p>
            </WhatHappened>
            <QB
              question={"\"Priya said 'I just thought I was posting normal things.' What did a stranger actually learn from her profile without her realising?\""}
              note="They should be able to list: her school, her teacher's name, her weekly routine, her friend's username, roughly where she lived. The lesson is that individual details seem harmless. <b>It is the combination that builds the picture.</b> Then, gently: is there anything like that on yours?"
            />
            <QRule />
            <QB
              question='"Priya was asked to move her online gaming chat to an app her parents had never heard of, and to keep it secret from them. Why was that request itself the red flag, before anything else had happened?"'
              note='The lesson: genuine friendships do not require secrecy from the people who care about you. <b>The request to hide things is the signal, not what comes after it.</b> Ask: what would you do if that happened to you?'
            />
            <QRule />
            <QB
              question='"Priya turned her phone face-down when the player approached. When she showed the screen, it was a group chat mocking a classmate. She was in the group. She had not reacted, but she had not left. What did the game say about that position?"'
              note='This is the bystander question. Staying in the group and saying nothing is still a choice. The person being mocked can see who is there and who is silent. <b>Give it space. Do not rush to the moral.</b>'
            />
            <QRule />
            <QB
              question={"\"Mira's notebook said: 'The better question is never Can I delete this? The better question is Am I comfortable with this existing permanently?' What do you think that means in practice?\""}
              note='This one can become a genuine conversation about what they post and why. <b>Not a rule. A habit of thought.</b> What would they apply it to? What has gone through that test so far?'
            />
            <ForParent>When someone asks a young person to keep an online friendship secret from parents, it is one of the clearest warning signs of grooming, regardless of how genuine the person has seemed until then. <strong>Teach your child that you will never be angry at them for telling you</strong>, and that the worst outcome of telling you is a conversation. The worst outcome of not telling you is almost always worse.</ForParent>
          </PCGSection>

          <PCGSection label="World 3" title="The Observatory: Aunt Mira" teal>
            <WhatHappened label="What happened here">
              <p>At the top of the hill, two identical women waited. Both had Aunt Mira's face. Both said the same thing. One was the real Mira. One was a trap. Your child had to use everything they had learned across the whole journey to tell them apart.</p>
              <p>The impostor kept creating urgency: "we are running out of time, give me the items now." She claimed authority: "you have to trust me; I am your aunt." She knew things she should not have known. The real Mira waited. She taught without performing. She never once asked for the items. And when your child had worked it all out, <strong>she said: "You made it." Not surprised. Certain, the way she always was.</strong></p>
            </WhatHappened>
            <QB
              question='"How did you figure out which one was really Aunt Mira? What gave the impostor away?"'
              note='This is the most important question in the guide. The answer is the entire game compressed into one conversation. They should be able to name urgency, authority, pressure to bypass thinking, and something the impostor knew that she should not have known. <b>Let them take their time.</b>'
            />
            <QRule />
            <QB
              question='"The game called it social engineering: the pattern behind every attack across the whole journey. What did it mean?"'
              note='Manipulating feelings rather than breaking systems. Urgency. Fear. Authority. Manufactured trust. Ask where else they have seen this pattern: in a game, in a group chat, in something that happened to a friend. <b>It may appear in unexpected places.</b>'
            />
            <QRule />
            <QB
              question='"At the end, Mira said she needed someone who would learn along the way, not just arrive with the right answers. What do you think she meant by that?"'
              note='Mira tells the player: "You were ready without knowing you were ready." The question is about what kind of learning the journey demanded, not memorising rules, but building a way of thinking. <b>This is worth sitting with.</b>'
            />
            <ForParent>Social engineering, manipulating people rather than systems, is behind the majority of successful cyberattacks on individuals and organisations. The tactics are always the same: <strong>urgency, authority, fear, trust, and secrecy.</strong> A child who can name those tactics in a game will recognise them in real life. That is the whole point of this journey.</ForParent>
          </PCGSection>

          <PCGSection label="For parents and carers" title="If something worrying comes up">
            <p className="pcg-prose">The game touches on real situations. Occasionally, a conversation started by these questions will lead your child to mention something that has actually happened to them, or to a friend. If that happens:</p>
            <NavyCallout>Stay calm. <span className="pcg-amber">Listen first.</span> Thank them for telling you. It takes real courage to say something. The response that matters most in the first thirty seconds is not information or advice. It is making them feel heard and safe.</NavyCallout>
            <div className="pcg-steps">
              <Step num={1} title="Ask them to show you" text="If they received a message, saw something, or have evidence of what happened, ask if they are comfortable showing you. <b>Reflect and research the best course of action.</b>" />
              <Step num={2} title="Report it on the platform" text="Most platforms have a report function. Use it. On a mobile phone, suspicious texts can be forwarded to your carrier's spam reporting number to help block similar messages." />
              <Step num={3} title="Contact support if needed" text="If the situation involves contact from a stranger, financial loss, threats, or images shared without consent, contact your local non-emergency police line or one of the organisations listed below." />
              <Step num={4} title="Remind them it is not their fault" text='"Telling me was exactly the right thing to do. None of this is your fault. It is never too late to tell someone." Say those words, in that order. They matter.' />
            </div>
            <p className="pcg-resources-title">Specialist support organisations</p>
            <div className="pcg-resource-grid">
              <ResourceCard name="NCMEC CyberTipline">
                Report online child exploitation or grooming: 1-800-843-5678 or <a href="https://report.cybertip.org" target="_blank" rel="noreferrer">report.cybertip.org</a>
              </ResourceCard>
              <ResourceCard name="Crisis Text Line">
                Free confidential support for young people: text HOME to 741741
              </ResourceCard>
              <ResourceCard name="Childhelp National Child Abuse Hotline">
                Report child abuse, get support: 1-800-422-4453 or <a href="https://www.childhelphotline.org" target="_blank" rel="noreferrer">childhelphotline.org</a>
              </ResourceCard>
              <ResourceCard name="FTC ReportFraud">
                Report financial fraud, scams, and cybercrime: <a href="https://reportfraud.ftc.gov" target="_blank" rel="noreferrer">ReportFraud.ftc.gov</a>
              </ResourceCard>
            </div>
            <p className="pcg-resources-note">Resources listed are for the US. If you are outside the US, search for your national equivalent.</p>
          </PCGSection>

          <PCGClosing />

        </div>
      </div>
    </div>
  )
}
