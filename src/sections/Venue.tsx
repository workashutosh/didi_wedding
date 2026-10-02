import { useRef, useState } from 'react'
import { wedding } from '../config/wedding'
import { Divider, MapPin } from '../components/art/Ornaments'
import { Mandap } from '../components/art/Mandap'
import { Lantern } from '../components/art/Lantern'
import lotusA from '../assets/el-lotus-a.webp'
import lotusB from '../assets/el-lotus-b.webp'
import peacock from '../assets/el-peacock.webp'
import { Sparkles } from '../components/Sparkles'
import cowL from '../assets/el-cow-l.webp'
import cowR from '../assets/el-cow-r.webp'
import { GoldButton } from '../components/GoldButton'
import { Scallop } from '../components/art/Scallop'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'

export function Venue() {
  const root = useRef<HTMLElement>(null)
  const [showMap, setShowMap] = useState(false)
  const { venue } = wedding

  useGsap(root, () => {
    if (reducedMotion) return
    // the mandap assembles itself as it scrolls into view
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.vn-arch', start: 'top 85%', end: 'center 45%', scrub: 0.35 },
    })
    tl.fromTo('.vn-sun', { y: 70, scale: 0.7 }, { y: 0, scale: 1, duration: 1 }, 0)
      .fromTo('.md-land', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.25 }, 0)
      .fromTo('.md-base', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.2 }, 0.08)
      .fromTo('.md-pillars-back, .md-pillars', { scaleY: 0, svgOrigin: '200 292' }, { scaleY: 1, duration: 0.25, stagger: 0.05, ease: 'power2.out' }, 0.18)
      .fromTo('.md-roof', { y: -120, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power3.out' }, 0.38)
      .fromTo('.md-flowers circle', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.15, stagger: 0.004, ease: 'back.out(3)' }, 0.58)
      .fromTo('.md-garlands', { y: -30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.2, ease: 'power2.out' }, 0.62)
      .fromTo('.md-plant', { scale: 0.3, autoAlpha: 0, transformOrigin: '50% 100%' }, { scale: 1, autoAlpha: 1, duration: 0.25, stagger: 0.05 }, 0.5)
      .fromTo('.md-fire', { scale: 0, autoAlpha: 0, svgOrigin: '200 284' }, { scale: 1, autoAlpha: 1, duration: 0.14, ease: 'back.out(2)' }, 0.78)
      .fromTo('.md-beds', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.8)
      .fromTo('.vn-cow', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.06 }, 0.82)
      .fromTo('.vn-lotus-l', { xPercent: -50, rotate: -12, autoAlpha: 0 }, { xPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.4 }, 0.1)
      .fromTo('.vn-lotus-r', { xPercent: 50, rotate: 12, autoAlpha: 0 }, { xPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.4 }, 0.15)
      .fromTo('.vn-peacock', { x: 70, y: -30, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.35 }, 0.5)
      .fromTo('.vn-lantern', { yPercent: -70 }, { yPercent: 0, duration: 0.5 }, 0)
    gsap.from('.vn-pin', {
      y: -220,
      autoAlpha: 0,
      duration: 1.2,
      ease: 'bounce.out',
      scrollTrigger: { trigger: '.vn-scene', start: 'top 35%', toggleActions: 'play none none reverse' },
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
      className="section px-5 pb-24 pt-20"
      style={{ background: '#f3f7f7' }}
      aria-label="Venue"
    >
      <div className="lattice pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden style={{ background: 'radial-gradient(90% 60% at 50% 45%, rgba(255,248,231,.9), rgba(255,248,231,.25) 70%, transparent)' }} />
      <Lantern className="vn-lantern absolute left-[4%] top-4 w-10 sm:left-[10%] sm:w-14" />
      <Lantern className="vn-lantern absolute right-[4%] top-4 w-10 sm:right-[10%] sm:w-14" />
      <Scallop color="#b8956a" className="absolute inset-x-0 top-0" />
      <div className="relative mx-auto max-w-xl text-center">
        <p className="font-display text-sm tracking-[0.3em] text-gold-dark sm:text-lg">THE VENUE</p>
        <h2 className="mt-2 font-script text-5xl text-sindoor sm:text-6xl">Where hearts meet</h2>
        <p className="mt-1 font-hindi text-lg text-maroon/80" lang="hi">
          विवाह स्थल
        </p>
      </div>

      {/* illustrated scene inside a gold arch, flanked by lotuses + a peacock */}
      <div className="vn-arch relative mx-auto mt-10 w-[min(84vw,520px)]">
        <img src={lotusA} alt="" aria-hidden className="vn-lotus-l pointer-events-none will-change-transform absolute -left-[22%] top-[34%] w-[34%] max-w-[180px] origin-bottom" loading="lazy" decoding="async" width={500} height={797} />
        <img src={lotusB} alt="" aria-hidden className="vn-lotus-r pointer-events-none will-change-transform absolute -right-[22%] top-[46%] w-[34%] max-w-[180px] origin-bottom" loading="lazy" decoding="async" width={537} height={756} />
        <div className="rounded-t-[999px] rounded-b-[20px] p-[3px] shadow-[0_30px_60px_-28px_rgba(90,15,27,.55)]" style={{ background: 'linear-gradient(160deg, #F3D98B, #B8901F 35%, #FFF1B8 55%, #A37A1C 80%, #E8C967)' }}>
      <div className="vn-scene relative aspect-[400/470] w-full overflow-hidden rounded-t-[999px] rounded-b-[17px]">
        {/* golden-hour sky */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #fbe3bd 0%, #f8cf98 38%, #f2ad7e 62%, #e58f78 78%)' }} />
        <div
          className="vn-sun absolute left-1/2 top-[52%] h-[46%] w-[46%] -translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, #fff6d6, rgba(255,214,140,.85) 30%, rgba(255,190,120,.25) 60%, transparent)' }}
          aria-hidden
        />
        {/* birds */}
        <svg viewBox="0 0 400 335" className="absolute inset-0 h-full w-full" aria-hidden>
          <g fill="none" stroke="#7a3a2a" strokeWidth="1.3" strokeLinecap="round" opacity=".55" className="float-y">
            <path d="M52 62 q 5 -5 10 0 q 5 -5 10 0" />
            <path d="M80 48 q 4 -4 8 0 q 4 -4 8 0" />
            <path d="M318 70 q 5 -5 10 0 q 5 -5 10 0" />
            <path d="M342 54 q 4 -4 8 0 q 4 -4 8 0" />
          </g>
        </svg>
        <Mandap className="absolute bottom-0 left-[3%] h-auto w-[94%]" />
        {/* Pichwai cows grazing on the lawn */}
        <img src={cowL} alt="" aria-hidden className="vn-cow absolute bottom-[1%] left-[1%] w-[22%]" loading="lazy" decoding="async" width={818} height={749} />
        <img src={cowR} alt="" aria-hidden className="vn-cow absolute bottom-[1%] right-[1%] w-[22%]" loading="lazy" decoding="async" width={819} height={749} />
        <Sparkles className="absolute inset-x-[20%] top-[4%] h-[40%]" count={5} seed={3} />
        <div className="vn-pin absolute left-1/2 top-[13%] -ml-5 w-10" aria-hidden>
          <span className="absolute left-1/2 top-[88%] -ml-5 h-3 w-10 animate-ping rounded-[50%] border-2 border-sindoor/60 [animation-duration:2s]" />
          <MapPin className="float-y relative w-full drop-shadow-[0_8px_10px_rgba(90,15,27,.45)]" />
        </div>
        <div className="pointer-events-none absolute inset-[6px] rounded-t-[999px] rounded-b-[12px] border border-[#fff1b8]/70" aria-hidden />
      </div>
        </div>
        <img src={peacock} alt="" aria-hidden className="vn-peacock pointer-events-none will-change-transform absolute -right-[10%] top-[6%] w-[28%] max-w-[150px]" loading="lazy" decoding="async" width={464} height={799} />
      </div>

      {/* venue card */}
      <div className="vn-card relative mx-auto mt-10 max-w-xl text-center">
        <h3 className="font-display text-2xl font-bold leading-snug text-maroon sm:text-3xl">{venue.name}</h3>
        <Divider className="mx-auto my-3 w-44" />
        <p className="mx-auto max-w-md font-serif text-base leading-relaxed text-maroon/80">{venue.address}</p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GoldButton className="w-full max-w-[290px] sm:w-auto" href={venue.mapUrl} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            Get Directions
          </GoldButton>
          {embed && !showMap && (
            <button type="button" className="btn-ghost w-full max-w-[290px] text-maroon sm:w-auto" onClick={() => setShowMap(true)}>
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
