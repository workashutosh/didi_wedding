import { useRef } from 'react'
import { wedding } from '../config/wedding'
import brideHand from '../assets/hand-bride.webp'
import groomHand from '../assets/hand-groom.webp'
import groomThumb from '../assets/hand-groom-thumb.webp'
import { Mandala } from '../components/art/Mandala'
import { Divider } from '../components/art/Ornaments'
import { Scallop } from '../components/art/Scallop'
import { Sparkles } from '../components/Sparkles'
import { fx, gsap, ScrollTrigger, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'

/** Hasta milap — the hands glide in and clasp as you scroll. */
export function HastaMilap() {
  const root = useRef<HTMLElement>(null)
  const hands = useRef<HTMLDivElement>(null)
  const { hastaMilap: t } = wedding

  useGsap(root, () => {
    if (reducedMotion) return
    const stageW = () => (root.current?.querySelector('.hm-stage') as HTMLElement | null)?.offsetWidth ?? 600
    // plays once, on its own, when the hands come into view (no scroll-locking)
    gsap.set('.hm-head > *, .hm-vow, .hm-glow, .hm-ring', { autoAlpha: 0 })
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        if (!hands.current) return
        const r = hands.current.getBoundingClientRect()
        if (r.bottom > 0 && r.top < innerHeight) fx.burst(r.left + r.width * 0.57, r.top + r.height * 0.42, 36, true)
      },
    })
    tl.to('.hm-head > *', { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.6 }, 0)
      .fromTo('.hd-groom', { x: () => stageW() * 0.36 }, { x: 0, duration: 1.6 }, 0.2)
      .fromTo('.hd-bride', { x: () => -stageW() * 0.4, y: () => -stageW() * 0.05, rotate: -4, transformOrigin: '0% 50%' }, { x: 0, y: 0, rotate: 0, duration: 1.6 }, 0.25)
      .fromTo('.hm-glow', { scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.6 }, 1.7)
      .fromTo('.hm-ring', { scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' }, 1.75)
      .fromTo('.hm-vow', { y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.6 }, 2)
    ScrollTrigger.create({ trigger: '.hm-stage', start: 'top 80%', once: true, onEnter: () => tl.play() })
    gsap.to('.hm-mandala', { rotate: 40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } })
  })

  return (
    <section ref={root} className="section paper grain" aria-label="Hasta milap — joined hands">
      <Scallop color="#2E060D" className="absolute inset-x-0 top-0 z-10" />
      <div className="relative flex min-h-[100svh] py-16 flex-col items-center justify-center px-4 text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <Mandala className="hm-mandala w-[min(130vw,880px)] opacity-[0.16] will-change-transform" filled={false} />
        </div>

        <div className="hm-head relative">
          <p className="font-display text-xs tracking-[0.34em] text-gold-dark sm:text-base">{t.eyebrow}</p>
          <p className="mt-1 font-hindi text-lg text-sindoor" lang="hi">
            {t.hindi}
          </p>
          <h2 className="mt-2 font-script text-[clamp(2.6rem,11vw,4.6rem)] leading-[1.05] text-maroon">
            <span className="maroon-foil">{t.title}</span>
          </h2>
        </div>

        <div ref={hands} className="relative my-6 w-[min(125vw,860px)] sm:my-10">
          <div
            className="hm-glow pointer-events-none absolute left-[58%] top-1/2 h-[150%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(244,163,0,.38), rgba(244,163,0,.12) 55%, transparent)' }}
            aria-hidden
          />
          <div className="hm-ring pointer-events-none absolute left-[58%] top-1/2 aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/60" aria-hidden>
            <div className="absolute inset-[7%] rounded-full border border-dashed border-gold/50" />
          </div>
          {/* composition measured on a 1150×380 stage: her fingertips slip under his thumb into his palm */}
          <div
            className="hm-stage relative aspect-[1150/380] w-full"
            style={{
              WebkitMaskImage: 'linear-gradient(90deg, transparent 2%, #000 13%, #000 88%, transparent 99%)',
              maskImage: 'linear-gradient(90deg, transparent 2%, #000 13%, #000 88%, transparent 99%)',
            }}
          >
            <img
              src={groomHand}
              alt="The groom's hand, palm open"
              className="hd-groom absolute left-[46.96%] top-[15.79%] w-[52.43%] select-none"
              draggable={false}
              width={603}
              height={302}
              loading="lazy"
              decoding="async"
            />
            <img
              src={brideHand}
              alt="The bride's hennaed hand with red chooda"
              className="hd-bride absolute left-[6.78%] top-[6.84%] w-[55.48%] select-none"
              draggable={false}
              width={638}
              height={215}
              loading="lazy"
              decoding="async"
            />
            <img
              src={groomThumb}
              alt=""
              aria-hidden
              className="hd-groom absolute left-[55.65%] top-[31.05%] w-[10.96%] select-none"
              draggable={false}
              width={126}
              height={68}
              loading="lazy"
              decoding="async"
            />
          </div>
          <Sparkles className="absolute inset-0" count={7} />
        </div>

        <div className="relative max-w-xl">
          <p className="hm-vow font-hindi text-xl leading-relaxed text-maroon sm:text-2xl" lang="hi">
            {t.vowHindi}
          </p>
          <Divider className="hm-vow mx-auto my-3 w-48" />
          <p className="hm-vow font-serif text-base italic text-maroon/80 sm:text-lg">{t.vowEnglish}</p>
        </div>
      </div>
    </section>
  )
}
