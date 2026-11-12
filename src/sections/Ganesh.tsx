import { useEffect, useRef } from 'react'
import { wedding } from '../config/wedding'
import { Ganesha } from '../components/art/Ganesha'
import { Diya } from '../components/art/Ornaments'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'

const DIYAS = 5

export function Ganesh({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null)

  // One gentle, time-based intro as the page loads — no scroll-locking.
  useGsap(root, () => {
    if (reducedMotion) {
      gsap.set('.g-lines .draw', { strokeDashoffset: 0 })
      gsap.set('.gn-diya .diya-light', { opacity: 1 })
      return
    }
    gsap.set('.gn-title, .gn-hint', { autoAlpha: 0, y: 18 })
    gsap.set('.g-halo', { autoAlpha: 0, scale: 0.55, transformOrigin: '50% 46%' })
    gsap.set('.g-tilak', { scale: 0, transformOrigin: '50% 50%' })
    gsap.set('.g-lines path[fill]', { fillOpacity: 0 })
    gsap.set('.shloka p', { autoAlpha: 0, y: 14 })
    gsap.set('.gn-diya .diya-light', { opacity: 0 })
    gsap.set('.gn-diya', { y: 10, autoAlpha: 0.55 })
    // the scroll hint disappears as soon as the guest starts scrolling
    gsap.to('.gn-hint', { autoAlpha: 0, scrollTrigger: { trigger: root.current, start: 'top -40', toggleActions: 'play none none reverse' } })
  })

  useEffect(() => {
    if (!opened || reducedMotion || !root.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.to('.g-halo', { autoAlpha: 1, scale: 1, duration: 2, ease: 'expo.out' })
        .to('.g-lines .draw', { strokeDashoffset: 0, duration: 0.8, stagger: 0.03, ease: 'power2.inOut' }, 0.1)
        .to('.g-lines path[fill]', { fillOpacity: 0.9, duration: 0.5, stagger: 0.04 }, '-=0.5')
        .to('.g-tilak', { scale: 1, duration: 0.6, ease: 'back.out(3)' }, '-=0.4')
        .to('.gn-title', { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out' }, '-=0.4')
        .to('.shloka p', { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.3, ease: 'power2.out' }, '-=0.5')
        .to('.gn-diya', { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.4 }, '-=0.4')
        .to('.gn-diya .diya-light', { opacity: 1, stagger: 0.15, duration: 0.3 }, '<0.1')
        .to('.gn-hint', { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.2')
    }, root)
    return () => ctx.revert()
  }, [opened])

  return (
    <section ref={root} className="section silk grain" aria-label="Shri Ganesh invocation">
      <div className="jaali absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-[6svh] pt-[8svh] text-center">
        <div
          className="gn-glow pointer-events-none absolute left-1/2 top-[38%] h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(244,163,0,.28), rgba(179,18,46,.12) 45%, transparent 70%)' }}
          aria-hidden
        />
        <div
          className="gn-rays spin-slow pointer-events-none absolute left-1/2 top-[34%] h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 opacity-60"
          style={{
            background: 'repeating-conic-gradient(from 0deg, rgba(255,214,120,.16) 0deg 4deg, transparent 4deg 15deg)',
            WebkitMaskImage: 'radial-gradient(closest-side, #000 8%, transparent 62%)',
            maskImage: 'radial-gradient(closest-side, #000 8%, transparent 62%)',
          }}
          aria-hidden
        />
        <div className="gn-art relative will-change-transform w-[min(70vw,42svh,400px)]">
          <Ganesha className="h-auto w-full" drawable />
        </div>

        <h2 className="gn-title mt-1 font-hindi text-[1.65rem] leading-tight sm:text-4xl">
          <span className="gold-foil foil-glow">{wedding.invocation.title}</span>
        </h2>

        <div className="shloka mt-4 space-y-2 font-hindi text-[1.22rem] leading-relaxed text-[#FFE9A8] sm:text-2xl">
          {wedding.invocation.shloka.map((line, i) => (
            <p key={i} className={`shloka-${i} text-glow`}>
              {line}
            </p>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-center gap-3 sm:gap-6" aria-hidden>
          {Array.from({ length: DIYAS }, (_, i) => (
            <div key={i} className="gn-diya" style={{ marginBottom: Math.abs(i - 2) * -6 }}>
              <Diya className="h-14 w-12 sm:h-16 sm:w-14" />
            </div>
          ))}
        </div>

        <div className="gn-hint absolute bottom-[max(16px,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-0.5 text-center text-gold-light">
          <span className="font-hindi text-base" lang="hi">
            नीचे देखें
          </span>
          <span className="font-serif text-xs uppercase tracking-[0.2em] opacity-90">Scroll down</span>
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden className="float-y mt-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  )
}
