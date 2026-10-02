// Floating UI chrome: music toggle, garland scroll-progress, cursor glow / tap ripple.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { music } from '../lib/audio'
import { gsap, ScrollTrigger } from '../lib/scroll'
import { haptic, isTouch, reducedMotion } from '../lib/env'

/* ───────────────────────── Music toggle ───────────────────────── */
export function MusicToggle({ visible }: { visible: boolean }) {
  const [s, setS] = useState(music.state)
  useEffect(() => music.subscribe(setS), [])
  const show = visible && s.available
  return (
    <AnimatePresence>
      {show && (
        <m.button
          key="music"
          type="button"
          onClick={() => {
            haptic()
            music.toggle()
          }}
          aria-label={s.playing ? 'Pause music' : 'Play music'}
          aria-pressed={s.playing}
          initial={{ opacity: 0, scale: 0.6, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 18 }}
          whileTap={{ scale: 0.86 }}
          whileHover={{ scale: 1.08 }}
          className="fixed right-[max(14px,env(safe-area-inset-right))] top-[max(14px,env(safe-area-inset-top))] z-50 grid h-12 w-12 place-items-center rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #FFF1B8, #D4AF37 55%, #8C6A16)',
            boxShadow: '0 6px 18px -4px rgba(0,0,0,.55), 0 0 0 1px rgba(255,241,184,.5) inset, 0 0 22px rgba(244,163,0,.35)',
          }}
        >
          {s.playing && <span className="absolute inset-0 animate-ping rounded-full border border-gold-light/60 [animation-duration:2.4s]" />}
          {s.playing ? (
            <span className="flex h-[16px] items-end gap-[3px]" aria-hidden>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="eq-bar h-full w-[3px] rounded-full bg-maroon-deep" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden className="text-maroon-deep">
              <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V6l10-2v12" />
                <circle cx="6.5" cy="18" r="2.5" fill="currentColor" />
                <circle cx="16.5" cy="16" r="2.5" fill="currentColor" />
                <path d="M3 3l18 18" />
              </g>
            </svg>
          )}
        </m.button>
      )}
    </AnimatePresence>
  )
}

/* ───────────────────────── Garland scroll progress ───────────────────────── */
export function ScrollProgress({ visible }: { visible: boolean }) {
  const fill = useRef<HTMLDivElement>(null)
  const head = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const setFill = gsap.quickSetter(fill.current, 'scaleY')
    const setHead = gsap.quickSetter(head.current, 'y', 'px')
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const h = track.current?.offsetHeight ?? 0
        setFill(self.progress)
        setHead(self.progress * h)
      },
    })
    return () => st.kill()
  }, [])
  return (
    <div
      ref={track}
      aria-hidden
      className="pointer-events-none fixed left-[max(8px,env(safe-area-inset-left))] top-[18vh] z-40 h-[64vh] w-[3px] transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* thread with marigold beads */}
      <div className="absolute inset-0 rounded-full bg-gold/15" />
      <div
        className="absolute inset-0 rounded-full"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(244,163,0,.55) 1.6px, transparent 2.2px)', backgroundSize: '3px 14px' }}
      />
      <div
        ref={fill}
        className="absolute inset-0 origin-top rounded-full"
        style={{ transform: 'scaleY(0)', background: 'linear-gradient(180deg,#F3D98B,#F4A300 60%,#B3122E)' }}
      />
      <div ref={head} className="absolute -left-[7px] -top-[14px] h-[18px] w-[17px]">
        <svg viewBox="0 0 20 22" className="h-full w-full overflow-visible">
          <circle cx="10" cy="7" r="9" fill="rgba(244,163,0,.35)" />
          <path className="flame" d="M10 1c2 3 3 5 2.2 7.4-.4 1.2-4 1.2-4.4 0C7 6 8 4 10 1Z" fill="#FFD54A" />
          <path d="M2 11c1.5 7 14.5 7 16 0-4 1.6-12 1.6-16 0Z" fill="#D4AF37" />
        </svg>
      </div>
    </div>
  )
}

/* ───────────────────────── Cursor glow (desktop) + tap ripple (touch) ───────────────────────── */
export function PointerFX() {
  const glow = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (reducedMotion) return
    if (!isTouch && glow.current) {
      const xTo = gsap.quickTo(glow.current, 'x', { duration: 0.6, ease: 'power3' })
      const yTo = gsap.quickTo(glow.current, 'y', { duration: 0.6, ease: 'power3' })
      const move = (e: PointerEvent) => {
        xTo(e.clientX)
        yTo(e.clientY)
        glow.current!.style.opacity = '1'
      }
      window.addEventListener('pointermove', move, { passive: true })
      return () => window.removeEventListener('pointermove', move)
    }
    const tap = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      const d = document.createElement('span')
      d.className = 'tap-ripple'
      d.style.left = `${e.clientX}px`
      d.style.top = `${e.clientY}px`
      document.body.appendChild(d)
      d.animate(
        [
          { transform: 'translate(-50%,-50%) scale(.2)', opacity: 0.9 },
          { transform: 'translate(-50%,-50%) scale(1)', opacity: 0 },
        ],
        { duration: 650, easing: 'cubic-bezier(.2,.7,.3,1)' },
      ).onfinish = () => d.remove()
    }
    window.addEventListener('pointerdown', tap, { passive: true })
    return () => window.removeEventListener('pointerdown', tap)
  }, [])
  if (isTouch) return null
  return (
    <div
      ref={glow}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[45] -ml-[120px] -mt-[120px] h-[240px] w-[240px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background: 'radial-gradient(circle, rgba(255,214,120,.22) 0%, rgba(244,163,0,.08) 40%, transparent 70%)',
      }}
    />
  )
}
