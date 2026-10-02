// Background music controller. The <audio> element is created inside the
// "Open Invitation" tap so iOS/Android treat playback as user-initiated.
import { wedding } from '../config/wedding'

type State = { available: boolean; playing: boolean }
let el: HTMLAudioElement | null = null
let state: State = { available: true, playing: false }
const subs = new Set<(s: State) => void>()
const set = (s: Partial<State>) => {
  state = { ...state, ...s }
  subs.forEach((f) => f(state))
}
let fadeRaf = 0

function fadeTo(target: number, ms = 1600) {
  if (!el) return
  cancelAnimationFrame(fadeRaf)
  const a = el
  const from = a.volume
  const t0 = performance.now()
  const step = (t: number) => {
    const k = Math.min(1, Math.max(0, (t - t0) / ms))
    a.volume = Math.min(1, Math.max(0, from + (target - from) * k))
    if (k < 1) fadeRaf = requestAnimationFrame(step)
    else if (target === 0) a.pause()
  }
  fadeRaf = requestAnimationFrame(step)
}

function ensure() {
  if (el) return el
  el = new Audio(wedding.music.src)
  el.loop = true
  el.preload = 'auto'
  el.volume = 0
  el.addEventListener('error', () => set({ available: false, playing: false }))
  el.addEventListener('playing', () => set({ playing: true }))
  el.addEventListener('pause', () => set({ playing: false }))
  return el
}

export const music = {
  /** must be called from a user gesture */
  play() {
    const a = ensure()
    const p = a.play()
    fadeTo(wedding.music.volume)
    p?.catch((err: DOMException) => {
      // missing / undecodable file (e.g. a host that answers with HTML) → hide the toggle
      if (err?.name === 'NotSupportedError' || a.error) set({ available: false, playing: false })
      else set({ playing: false }) // autoplay blocked: keep the button so the guest can tap it
    })
  },
  pause() {
    fadeTo(0, 700)
  },
  toggle() {
    if (state.playing) this.pause()
    else this.play()
  },
  /** gentle swell for the finale */
  swell(on: boolean) {
    if (el && state.playing) fadeTo(on ? Math.min(1, wedding.music.volume * 1.35) : wedding.music.volume, 2200)
  },
  get state() {
    return state
  },
  subscribe(f: (s: State) => void) {
    subs.add(f)
    return () => void subs.delete(f)
  },
}

// pause when the tab is hidden, resume when visible again
if (typeof document !== 'undefined') {
  let resume = false
  document.addEventListener('visibilitychange', () => {
    if (!el) return
    if (document.hidden) {
      resume = state.playing
      if (resume) el.pause()
    } else if (resume) {
      el.play().catch(() => {})
    }
  })
}
