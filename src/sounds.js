// Procedural sound engine - Web Audio API only, no asset files.
// All functions are safe to call before any user gesture: AudioContext
// is created lazily on first call and resumed if suspended.

let _ctx = null

function ac() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (_ctx.state === 'suspended') _ctx.resume()
  return _ctx
}

function out(volume = 0.2) {
  const g = ac().createGain()
  g.gain.value = volume
  g.connect(ac().destination)
  return g
}

// ── Soft UI click - dialogue advance, button press ────────────────────────
export function playClick() {
  const c = ac(), t = c.currentTime
  const osc = c.createOscillator()
  const g = out(0)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(1100, t)
  osc.frequency.exponentialRampToValueAtTime(380, t + 0.055)
  g.gain.setValueAtTime(0.18, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.065)
  osc.connect(g)
  osc.start(t); osc.stop(t + 0.07)
}

// ── Slightly lower click - back navigation ────────────────────────────────
export function playBack() {
  const c = ac(), t = c.currentTime
  const osc = c.createOscillator()
  const g = out(0)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(500, t)
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.07)
  g.gain.setValueAtTime(0.13, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08)
  osc.connect(g)
  osc.start(t); osc.stop(t + 0.09)
}

// ── Ascending chime - correct quiz answer (C5–E5–G5) ─────────────────────
export function playCorrect() {
  const c = ac()
  ;[523.25, 659.25, 783.99].forEach((freq, i) => {
    const t = c.currentTime + i * 0.115
    const osc = c.createOscillator()
    const g = out(0)
    osc.type = 'sine'
    osc.frequency.value = freq
    g.gain.setValueAtTime(0.22, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26)
    osc.connect(g)
    osc.start(t); osc.stop(t + 0.29)
  })
}

// ── Descending sawtooth - wrong answer ────────────────────────────────────
export function playWrong() {
  const c = ac(), t = c.currentTime
  const osc = c.createOscillator()
  const g = out(0)
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(210, t)
  osc.frequency.exponentialRampToValueAtTime(55, t + 0.28)
  g.gain.setValueAtTime(0.14, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.32)
  osc.connect(g)
  osc.start(t); osc.stop(t + 0.35)
}

// ── Two-tone neutral - partial answer (A4 then G4) ────────────────────────
export function playPartial() {
  const c = ac()
  ;[440, 392].forEach((freq, i) => {
    const t = c.currentTime + i * 0.11
    const osc = c.createOscillator()
    const g = out(0)
    osc.type = 'sine'
    osc.frequency.value = freq
    g.gain.setValueAtTime(0.16, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
    osc.connect(g)
    osc.start(t); osc.stop(t + 0.22)
  })
}

// ── Ascending frequency sweep - hold complete / inspect reveal ────────────
export function playReveal() {
  const c = ac(), t = c.currentTime
  const osc = c.createOscillator()
  const g = out(0)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(280, t)
  osc.frequency.exponentialRampToValueAtTime(1400, t + 0.2)
  g.gain.setValueAtTime(0.17, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24)
  osc.connect(g)
  osc.start(t); osc.stop(t + 0.26)
}

// ── Low thud - info card / overlay slides in ─────────────────────────────
export function playCardIn() {
  const c = ac(), t = c.currentTime
  const osc = c.createOscillator()
  const g = out(0)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(110, t)
  osc.frequency.exponentialRampToValueAtTime(38, t + 0.16)
  g.gain.setValueAtTime(0.28, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
  osc.connect(g)
  osc.start(t); osc.stop(t + 0.22)
}

// ── Three short square-wave pulses - phone buzz / SMS notification ─────────
export function playPhoneBuzz() {
  const c = ac()
  for (let i = 0; i < 3; i++) {
    const t = c.currentTime + i * 0.09
    const osc = c.createOscillator()
    const g = out(0)
    osc.type = 'square'
    osc.frequency.value = 100
    g.gain.setValueAtTime(0.18, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)
    osc.connect(g)
    osc.start(t); osc.stop(t + 0.08)
  }
}

// ── Magnifying-glass inspect click - subtle high tick ────────────────────
export function playInspect() {
  const c = ac(), t = c.currentTime
  const osc = c.createOscillator()
  const g = out(0)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(2200, t)
  osc.frequency.exponentialRampToValueAtTime(800, t + 0.04)
  g.gain.setValueAtTime(0.12, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
  osc.connect(g)
  osc.start(t); osc.stop(t + 0.06)
}

// ── Selecting a quiz option - neutral mid tick ────────────────────────────
export function playOptionSelect() {
  const c = ac(), t = c.currentTime
  const osc = c.createOscillator()
  const g = out(0)
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(660, t)
  osc.frequency.exponentialRampToValueAtTime(330, t + 0.07)
  g.gain.setValueAtTime(0.15, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
  osc.connect(g)
  osc.start(t); osc.stop(t + 0.1)
}
