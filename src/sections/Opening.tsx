import { useEffect, useRef, useState } from 'react'
import { wedding } from '../config/wedding'
import { Toran } from '../components/art/Toran'
import { Mandala } from '../components/art/Mandala'
import { WaxSeal } from '../components/art/Ornaments'
import { haptic, reducedMotion } from '../lib/env'
import './opening.css'

/** Arched top-panel ornament for each door leaf */
function DoorArch() {
  return (
    <svg viewBox="0 0 100 120" className="door-arch" aria-hidden preserveAspectRatio="xMidYMid meet">
      <g fill="none" stroke="#D4AF37" strokeLinecap="round">
        <path d="M8 118 V60 C 8 30, 34 14, 50 4 C 66 14, 92 30, 92 60 V118" strokeWidth="1.4" />
        <path d="M16 118 V62 C 16 38, 36 24, 50 14 C 64 24, 84 38, 84 62 V118" strokeWidth=".7" strokeOpacity=".7" />
        <path d="M50 30 C 58 40, 60 48, 50 58 C 40 48, 42 40, 50 30 Z" strokeWidth="1" />
        <path d="M50 58 V96 M38 76 C 44 72, 56 72, 62 76 M30 92 C 40 86, 60 86, 70 92" strokeWidth=".8" />
        <circle cx="50" cy="104" r="5" strokeWidth=".9" />
      </g>
      <circle cx="50" cy="44" r="3" fill="#B3122E" />
    </svg>
  )
}

function Door({ side }: { side: 'l' | 'r' }) {
  return (
    <div className={`door door-${side}`} aria-hidden>
      <div className="door-face">
        <div className="door-frame">
          <DoorArch />
          <div className="door-studs" />
          <DoorArch />
        </div>
        <div className="door-medallion">
          <Mandala className="w-full h-full" strokeWidth={1} />
        </div>
        <div className="door-ring" />
        <div className="door-seal">
          <WaxSeal className="w-full h-full" a={wedding.bride.initial} b={wedding.groom.initial} />
        </div>
      </div>
    </div>
  )
}

export function Opening({ onOpen, onDone }: { onOpen: () => void; onDone: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'fading'>('closed')
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // focus the CTA for keyboard users without scrolling
    btn.current?.focus({ preventScroll: true })
  }, [])

  const open = () => {
    if (phase !== 'closed') return
    haptic(25)
    setPhase('opening')
    onOpen()
    // explicit phases (no long transition-delays): swing → fade → unmount
    window.setTimeout(() => setPhase('fading'), reducedMotion ? 50 : 1750)
    window.setTimeout(onDone, reducedMotion ? 800 : 2800)
  }

  const { bride, groom, weddingDate } = wedding

  return (
    <div className={`opening is-${phase === 'closed' ? 'closed' : 'opening'} ${phase === 'fading' ? 'is-fading' : ''}`} role="dialog" aria-modal="true" aria-label="Wedding invitation">
      <div className="op-light" aria-hidden />
      <div className="op-stage">
        <div className="op-wall op-wall-l" aria-hidden />
        <div className="op-doorway">
          <Door side="l" />
          <Door side="r" />
        </div>
        <div className="op-wall op-wall-r" aria-hidden />
      </div>

      <div className="op-toran" aria-hidden>
        <Toran className="block h-auto w-full sm:!hidden" width={420} />
        <Toran className="!hidden h-auto w-full sm:!block" width={1250} />
      </div>

      <div className="op-content">
        <header className="op-title">
          <p className="font-hindi text-gold-light text-lg tracking-wide text-glow">॥ शुभ विवाह ॥</p>
          <h1 className="font-script text-[3.4rem] leading-none sm:text-7xl mt-2">
            <span className="gold-foil foil-anim">
              {bride.first} <span className="font-serif text-[0.55em] italic">&amp;</span> {groom.first}
            </span>
          </h1>
          <p className="mt-3 font-serif text-[0.8rem] uppercase tracking-[0.32em] text-gold-light/90">
            {weddingDate.weekday} · {weddingDate.long.replace('th ', ' ')}
          </p>
        </header>

        <button type="button" className="op-seal-btn" onClick={open} tabIndex={-1} aria-hidden="true">
          <span className="op-seal-ring" aria-hidden />
        </button>

        <div className="op-cta">
          <button ref={btn} type="button" className="btn-gold op-open" onClick={open}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path d="M12 3c2 3 3.5 5 3.5 7.5A3.5 3.5 0 0 1 12 14a3.5 3.5 0 0 1-3.5-3.5C8.5 8 10 6 12 3Z" fill="#B3122E" />
              <path d="M4 15c2 4 14 4 16 0-4 1.6-12 1.6-16 0Z" fill="#5A0F1B" />
            </svg>
            Open Invitation
          </button>
          <p className="mt-3 text-[0.72rem] tracking-[0.2em] uppercase text-gold-light/70">Tap to open · sound on 🔊</p>
        </div>
      </div>
    </div>
  )
}
