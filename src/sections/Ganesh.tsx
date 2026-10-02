import { useEffect, useRef } from 'react'
import { wedding } from '../config/wedding'
import { Ganesha } from '../components/art/Ganesha'
import { Diya } from '../components/art/Ornaments'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'
import { Words } from '../lib/split'

const DIYAS = 5

export function Ganesh({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null)

  // Scroll-scrubbed: shloka reveals word by word, diyas light one by one
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
    gsap.set('.shloka .sw', { autoAlpha: 0, y: 14 })
    gsap.set('.gn-diya .diya-light', { opacity: 0 })
    gsap.set('.gn-diya', { y: 10, autoAlpha: 0.55 })

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root.current,
        start: 'top top',
        end: '+=150%',
        scrub: 0.35,
        pin: true,
        anticipatePin: 1,
      },
    })
    tl.to('.gn-hint', { autoAlpha: 0, duration: 0.1 }, 0)
      .to('.gn-art', { scale: 0.86, y: -10, duration: 1, ease: 'power1.inOut' }, 0)
      .to('.shloka-0 .sw', { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.25, ease: 'power2.out' }, 0.05)
      .to('.shloka-1 .sw', { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.25, ease: 'power2.out' }, '>-0.05')
      .to('.gn-diya', { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.2 }, 0.45)
      .to('.gn-diya .diya-light', { opacity: 1, stagger: 0.12, duration: 0.14 }, 0.5)
      .to('.gn-glow', { opacity: 1, scale: 1.15, duration: 0.6 }, 0.5)
      .to({}, { duration: 0.25 })
  })

  // Time-based intro once the doors open
  useEffect(() => {
    if (!opened || reducedMotion || !root.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.85 })
      tl.to('.g-halo', { autoAlpha: 1, scale: 1, duration: 2.4, ease: 'expo.out' })
        .to('.g-lines .draw', { strokeDashoffset: 0, duration: 1.1, stagger: 0.055, ease: 'power2.inOut' }, 0.15)
        .to('.g-lines path[fill]', { fillOpacity: 0.9, duration: 0.6, stagger: 0.05 }, '-=0.6')
        .to('.g-tilak', { scale: 1, duration: 0.7, ease: 'back.out(3)' }, '-=0.4')
        .to('.gn-title', { autoAlpha: 1, y: 0, duration: 1.4, ease: 'expo.out' }, '-=0.5')
        .fromTo('.gn-title', { scale: 0.86 }, { scale: 1, duration: 2.2, ease: 'expo.out' }, '<')
        .to('.gn-hint', { autoAlpha: 1, y: 0, duration: 0.8 }, '-=1')
    }, root)
    return () => ctx.revert()
  }, [opened])

  return (
    <section ref={root} className="section silk grain" aria-label="Shri Ganesh invocation">
      <div className="jaali absolute inset-0 opacity-60" aria-hidden />
      <div className="pin-wrap relative flex flex-col items-center justify-center px-5 pb-[6svh] pt-[8svh] text-center">
        <div
          className="gn-glow pointer-events-none absolute left-1/2 top-[38%] h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(244,163,0,.28), rgba(179,18,46,.12) 45%, transparent 70%)' }}
          aria-hidden
        />
        <div className="gn-art relative will-change-transform w-[min(70vw,42svh,400px)]">
          <Ganesha className="h-auto w-full" drawable />
        </div>

        <h2 className="gn-title mt-1 font-hindi text-[1.65rem] leading-tight sm:text-4xl">
          <span className="gold-foil foil-glow">{wedding.invocation.title}</span>
        </h2>

        <div className="shloka mt-4 space-y-1.5 font-hindi text-[1.02rem] leading-relaxed text-gold-light/95 sm:text-xl">
          {wedding.invocation.shloka.map((line, i) => (
            <p key={i} className={`shloka-${i} text-glow`}>
              <Words text={line} className="sw" />
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

        <div className="gn-hint absolute bottom-[max(18px,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[0.68rem] uppercase tracking-[0.3em] text-gold-light/75">
          Scroll
          <svg viewBox="0 0 20 30" width="16" height="24" aria-hidden className="float-y">
            <rect x="1" y="1" width="18" height="28" rx="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="10" cy="9" r="2.4" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  )
}
