import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { visibleEvents, wedding } from '../config/wedding'
import { googleCalendarUrl } from '../lib/calendar'
import { Corner, Divider } from '../components/art/Ornaments'
import { Scallop } from '../components/art/Scallop'
import { GoldButton } from '../components/GoldButton'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'

const TARGET = new Date(wedding.weddingDate.iso).getTime()

function remaining() {
  const ms = Math.max(0, TARGET - Date.now())
  return {
    done: ms === 0,
    units: [
      { label: 'Days', hindi: 'दिन', v: Math.floor(ms / 864e5) },
      { label: 'Hours', hindi: 'घंटे', v: Math.floor(ms / 36e5) % 24 },
      { label: 'Minutes', hindi: 'मिनट', v: Math.floor(ms / 6e4) % 60 },
      { label: 'Seconds', hindi: 'सेकंड', v: Math.floor(ms / 1e3) % 60 },
    ],
  }
}

/** a single rolling digit */
function Digit({ d }: { d: string }) {
  return (
    <span className="relative inline-block h-[1.1em] w-[0.62em] overflow-hidden align-bottom">
      <AnimatePresence initial={false} mode="popLayout">
        <m.span
          key={d}
          className="absolute inset-0 text-center"
          initial={reducedMotion ? false : { y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          {d}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

function UnitFrame({ v, label, hindi }: { v: number; label: string; hindi: string }) {
  const digits = String(v).padStart(2, '0').split('')
  return (
    <div className="cd-unit relative flex flex-col items-center">
      <div className="relative grid aspect-[4/5] w-[19vw] max-w-[110px] place-items-center">
        {/* mini jharokha frame */}
        <svg viewBox="0 0 80 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <path
            d="M6 98 V40 C 6 22, 24 10, 40 3 C 56 10, 74 22, 74 40 V98 Z"
            fill="#5A0F1B"
            stroke="#D4AF37"
            strokeWidth="1.6"
          />
          <path d="M11 93 V42 C 11 27, 26 16, 40 10 C 54 16, 69 27, 69 42 V93 Z" fill="none" stroke="#F3D98B" strokeWidth=".6" strokeDasharray="1.4 2" />
          <circle cx="40" cy="20" r="2" fill="#F4A300" />
        </svg>
        <span className="relative mt-[22%] font-serif text-[clamp(1.5rem,7.5vw,2.6rem)] font-semibold tabular-nums leading-none text-gold-light">
          {digits.map((d, i) => (
            <Digit key={digits.length - i} d={d} />
          ))}
        </span>
      </div>
      <span className="mt-2 font-serif text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-maroon sm:text-xs">{label}</span>
      <span className="font-hindi text-[0.7rem] text-sindoor/80" lang="hi">
        {hindi}
      </span>
    </div>
  )
}

function Countdown() {
  const [t, setT] = useState(remaining)
  useEffect(() => {
    const id = window.setInterval(() => setT(remaining()), 1000)
    return () => window.clearInterval(id)
  }, [])
  if (t.done)
    return (
      <p className="font-script text-4xl text-sindoor" role="status">
        The celebrations have begun!
      </p>
    )
  return (
    <div className="flex justify-center gap-[2.5vw] sm:gap-5" role="timer" aria-label={`${t.units[0].v} days to go`}>
      {t.units.map((u) => (
        <UnitFrame key={u.label} {...u} />
      ))}
    </div>
  )
}

export function SaveTheDate() {
  const root = useRef<HTMLElement>(null)
  const main = visibleEvents.find((e) => e.id === 'varmala') ?? visibleEvents[0]
  const [dd, mm, yyyy] = wedding.weddingDate.numeric

  useGsap(root, () => {
    if (reducedMotion) return
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 62%', toggleActions: 'play none none reverse' } })
    tl.from('.sd-eyebrow', { autoAlpha: 0, y: 20, duration: 0.8 })
      .from('.sd-char', { yPercent: 110, duration: 1.1, stagger: 0.06, ease: 'expo.out' }, 0.1)
      .from('.sd-dot', { scale: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(3)' }, 0.5)
      .from('.sd-week', { autoAlpha: 0, y: 16, duration: 0.9 }, 0.7)
      .to('.sd-divider .draw', { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0.7)
      .from('.cd-unit', { autoAlpha: 0, y: 30, rotateX: -60, transformOrigin: '50% 100%', duration: 0.9, stagger: 0.1 }, 0.9)
      .from('.sd-btn', { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.1 }, 1.2)
    gsap.to('.sd-corner .draw', { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
  })

  const chars = (s: string) =>
    s.split('').map((c, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <span className="sd-char maroon-foil inline-block">{c}</span>
      </span>
    ))

  return (
    <section ref={root} className="section paper grain flex items-center justify-center px-5 py-24" aria-label="Save the date">
      <Scallop color="#2E060D" className="absolute inset-x-0 top-0" />
      <div className="pointer-events-none absolute inset-3 top-7 border border-gold/50 sm:inset-6 sm:top-8" aria-hidden />
      <div className="pointer-events-none absolute inset-5 top-9 border border-gold/30 sm:inset-8 sm:top-10" aria-hidden />
      <Corner className="sd-corner absolute left-5 top-9 w-14 sm:left-8 sm:top-10 sm:w-20" drawable />
      <Corner className="sd-corner absolute right-5 top-9 w-14 -scale-x-100 sm:right-8 sm:top-10 sm:w-20" drawable />
      <Corner className="sd-corner absolute bottom-5 left-5 w-14 -scale-y-100 sm:bottom-8 sm:left-8 sm:w-20" drawable />
      <Corner className="sd-corner absolute bottom-5 right-5 w-14 -scale-100 sm:bottom-8 sm:right-8 sm:w-20" drawable />

      <div className="relative w-full max-w-2xl text-center">
        <p className="sd-eyebrow font-display text-sm tracking-[0.3em] text-gold-dark sm:text-lg">SAVE THE DATE</p>

        <h2 className="mt-5 font-serif text-[clamp(2.6rem,13.5vw,6.5rem)] font-semibold leading-none tracking-tight text-maroon" aria-label={wedding.weddingDate.long}>
          {chars(dd)}
          <span className="sd-dot mx-[0.12em] inline-block text-[0.5em] align-middle text-marigold">◆</span>
          {chars(mm)}
          <span className="sd-dot mx-[0.12em] inline-block text-[0.5em] align-middle text-marigold">◆</span>
          {chars(yyyy)}
        </h2>

        <p className="sd-week mt-3 font-script text-4xl text-sindoor sm:text-5xl">{wedding.weddingDate.weekday}</p>
        <p className="sd-week mt-1 font-hindi text-lg text-maroon/80" lang="hi">
          {wedding.weddingDate.hindi}
        </p>

        <Divider className="sd-divider mx-auto my-8 w-60" drawable />

        <Countdown />

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {main && (
            <GoldButton className="sd-btn w-full max-w-[290px] sm:w-auto" href={googleCalendarUrl(wedding, main)} target="_blank" rel="noopener">
              <CalIcon /> Google Calendar
            </GoldButton>
          )}
          <GoldButton variant="ghost" className="sd-btn w-full max-w-[290px] text-maroon sm:w-auto" href="/wedding.ics">
            <CalIcon /> Apple / Outlook (.ics)
          </GoldButton>
        </div>
      </div>
    </section>
  )
}

function CalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
      <path d="M12 13.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2L9.1 15.6l2-.3z" fill="currentColor" stroke="none" />
    </svg>
  )
}
