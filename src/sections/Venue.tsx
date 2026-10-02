import { useMemo, useRef, useState } from 'react'
import { wedding } from '../config/wedding'
import { MapPin } from '../components/art/Ornaments'
import { Temple } from '../components/art/Temple'
import { GoldButton } from '../components/GoldButton'
import { Scallop } from '../components/art/Scallop'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'

const ROUTE = 'M-6 250 C 30 262, 40 292, 90 288 C 130 285, 150 296, 200 293'

export function Venue() {
  const root = useRef<HTMLElement>(null)
  const [showMap, setShowMap] = useState(false)
  const { venue } = wedding

  const stars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const r = (n: number) => {
          const x = Math.sin(i * 91.7 + n * 13.3) * 43758.5
          return x - Math.floor(x)
        }
        return { x: r(1) * 100, y: r(2) * 55, s: 1 + r(3) * 2, d: r(4) * 3 }
      }),
    [],
  )

  useGsap(root, () => {
    if (reducedMotion) return
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.vn-scene', start: 'top 80%', end: 'bottom 55%', scrub: 0.35 },
    })
    tl.fromTo('.vn-palace', { y: 60, autoAlpha: 0.2 }, { y: 0, autoAlpha: 1, duration: 0.4 }, 0)
      .fromTo('.vn-moon', { y: 50, x: -20 }, { y: 0, x: 0, duration: 1 }, 0)
      .to('.vn-path', { strokeDashoffset: 0, duration: 0.6 }, 0.15)
    gsap.from('.vn-pin', {
      y: -220,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'bounce.out',
      scrollTrigger: { trigger: '.vn-scene', start: 'top 45%', toggleActions: 'play none none reverse' },
    })
    gsap.from('.vn-card > *', {
      autoAlpha: 0,
      y: 26,
      stagger: 0.1,
      duration: 0.9,
      scrollTrigger: { trigger: '.vn-card', start: 'top 82%' },
    })
  })

  const embed = venue.embedQuery
    ? `https://www.google.com/maps?q=${encodeURIComponent(venue.embedQuery)}&output=embed`
    : ''

  return (
    <section
      ref={root}
      className="section grain px-5 pb-24 pt-20"
      style={{ background: 'linear-gradient(180deg, #041f1e 0%, #06302f 45%, #0b3f3c 70%, #2E060D 100%)' }}
      aria-label="Venue"
    >
      <Scallop color="#FBF1DA" className="absolute inset-x-0 top-0" />
      <div className="relative mx-auto max-w-xl text-center">
        <p className="font-display text-sm tracking-[0.3em] text-gold-light/80 sm:text-lg">THE VENUE</p>
        <h2 className="mt-3 font-script text-5xl sm:text-6xl">
          <span className="gold-foil">Where hearts meet</span>
        </h2>
        <p className="mt-2 font-hindi text-lg text-gold-light/80" lang="hi">
          विवाह स्थल
        </p>
      </div>

      {/* illustrated scene */}
      <div className="vn-scene relative mx-auto mt-8 aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-[28px] border border-gold/40 shadow-[0_30px_60px_-25px_rgba(0,0,0,.8)]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% 100%, #0E6F6B 0%, #06302f 50%, #031615 100%)' }} />
        {stars.map((s, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-gold-pale"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }}
            aria-hidden
          />
        ))}
        <div className="vn-moon absolute right-[12%] top-[10%] h-12 w-12 rounded-full shadow-[0_0_40px_rgba(255,241,184,.5)]" style={{ background: 'radial-gradient(circle at 35% 35%, #FFF8E7, #F3D98B 70%)' }} aria-hidden>
          <div className="absolute -right-1 -top-1 h-11 w-11 rounded-full" style={{ background: '#05201f' }} />
        </div>

        <Temple className="vn-palace absolute bottom-0 left-0 w-full" />
        {/* dotted route */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <mask id="vn-route-mask">
              <path className="vn-path draw" pathLength={1} d={ROUTE} fill="none" stroke="#fff" strokeWidth="10" />
            </mask>
          </defs>
          <path d={ROUTE} fill="none" stroke="#F4A300" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="0.1 9" mask="url(#vn-route-mask)" />
        </svg>
        <div className="vn-pin absolute left-1/2 top-[6%] -ml-6 w-12" aria-hidden>
          <span className="absolute left-1/2 top-[88%] -ml-6 h-4 w-12 animate-ping rounded-[50%] border-2 border-marigold/70 [animation-duration:2s]" />
          <MapPin className="float-y relative w-full drop-shadow-[0_10px_12px_rgba(0,0,0,.5)]" />
        </div>
      </div>

      {/* venue card */}
      <div className="vn-card relative mx-auto mt-10 max-w-xl text-center">
        <h3 className="font-display text-2xl font-bold leading-snug sm:text-3xl">
          <span className="gold-foil">{venue.name}</span>
        </h3>
        <p className="mx-auto mt-3 max-w-md font-serif text-base leading-relaxed text-ivory/85">{venue.address}</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GoldButton className="w-full max-w-[290px] sm:w-auto" href={venue.mapUrl} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            Get Directions
          </GoldButton>
          {embed && !showMap && (
            <button type="button" className="btn-ghost w-full max-w-[290px] text-gold-light sm:w-auto" onClick={() => setShowMap(true)}>
              Show map here
            </button>
          )}
        </div>
        {embed && showMap && (
          <iframe
            title={`Map of ${venue.name}`}
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-8 aspect-[4/3] w-full rounded-2xl border border-gold/40"
          />
        )}
      </div>
    </section>
  )
}
