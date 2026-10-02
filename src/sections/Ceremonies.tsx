import { useRef } from 'react'
import { visibleEvents, wedding, type WeddingEvent } from '../config/wedding'
import { Ganesha } from '../components/art/Ganesha'
import { Divider } from '../components/art/Ornaments'
import { Lantern } from '../components/art/Lantern'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'
import lotusA from '../assets/el-lotus-a.webp'
import lotusB from '../assets/el-lotus-b.webp'
import peacock from '../assets/el-peacock.webp'
import shrinathji from '../assets/el-shrinathji.webp'
import flute from '../assets/el-flute.webp'
import shehnai from '../assets/el-shehnai.webp'
import sitar from '../assets/el-sitar.webp'

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

/** date parts in India time, regardless of the guest's timezone */
function parts(iso: string) {
  const d = new Date(new Date(iso).getTime() + 5.5 * 3600e3)
  return { day: String(d.getUTCDate()).padStart(2, '0'), mon: MONTHS[d.getUTCMonth()], year: d.getUTCFullYear(), wk: WEEKDAYS[d.getUTCDay()] }
}

function ArchCard({ e }: { e: WeddingEvent }) {
  const p = parts(e.start)
  return (
    <article className="ev-arch relative mx-auto w-[min(76vw,400px)] will-change-transform">
      {/* gold arch frame */}
      <div className="rounded-t-[999px] rounded-b-[18px] p-[3px] shadow-[0_30px_60px_-28px_rgba(90,15,27,.55)]" style={{ background: 'linear-gradient(160deg, #F3D98B, #B8901F 35%, #FFF1B8 55%, #A37A1C 80%, #E8C967)' }}>
        <div className="paper relative overflow-hidden rounded-t-[999px] rounded-b-[15px] px-4 pb-9 pt-[22%] text-center sm:px-6">
          <div className="pointer-events-none absolute inset-[7px] rounded-t-[999px] rounded-b-[11px] border border-gold/50" aria-hidden />
          <Ganesha className="mx-auto w-14 [filter:brightness(.62)_saturate(1.5)]" />
          <h3 className="mt-3 font-script text-[3.3rem] leading-none text-sindoor">{e.name}</h3>
          <p className="mt-1 font-hindi text-lg text-maroon/80" lang="hi">
            {e.hindi}
          </p>
          <p className="mx-auto mt-4 max-w-[17rem] font-serif text-[0.95rem] italic leading-relaxed text-maroon/80">{e.description}</p>

          {/* date row, like a printed card */}
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sindoor">
            <div className="border-y border-sindoor/60 py-1.5 font-serif text-[0.6rem] font-semibold tracking-[0.08em] sm:text-[0.7rem] sm:tracking-[0.18em]">{p.wk}</div>
            <div className="px-1 leading-none">
              <div className="font-serif text-xs tracking-[0.3em]">{p.mon}</div>
              <div className="font-display text-[2.6rem] font-bold leading-none">{p.day}</div>
              <div className="font-serif text-xs tracking-[0.3em]">{p.year}</div>
            </div>
            <div className="border-y border-sindoor/60 py-1.5 font-serif text-[0.6rem] font-semibold uppercase tracking-[0.06em] sm:text-[0.7rem] sm:tracking-[0.12em]">{e.timeLabel}</div>
          </div>

          <Divider className="mx-auto my-5 w-40" />
          <p className="font-serif text-[0.7rem] uppercase tracking-[0.22em] text-maroon/60">at</p>
          <p className="mt-1 font-display text-base font-bold text-maroon">{e.venue || wedding.venue.name}</p>
        </div>
      </div>
    </article>
  )
}

export function Ceremonies() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    gsap.from('.ev-head > *', { autoAlpha: 0, y: 24, stagger: 0.12, duration: 1, scrollTrigger: { trigger: '.ev-head', start: 'top 80%' } })
    if (reducedMotion) return
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: '.ev-stage', start: 'top 85%', end: 'center 50%', scrub: 0.35 },
    })
    tl.fromTo('.ev-arch', { y: 90, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.out', stagger: 0.1 }, 0)
      .fromTo('.ev-lotus-l', { xPercent: -60, rotate: -14, autoAlpha: 0 }, { xPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.out' }, 0.15)
      .fromTo('.ev-lotus-r', { xPercent: 60, rotate: 14, autoAlpha: 0 }, { xPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.out' }, 0.2)
      .fromTo('.ev-peacock-t', { x: 80, y: -40, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0.35)
      .fromTo('.ev-peacock-b', { x: -80, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0.45)
      .fromTo('.ev-lantern', { yPercent: -80 }, { yPercent: 0, duration: 0.5, ease: 'power2.out' }, 0)
    gsap.from('.ev-alcove', {
      y: 50,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'back.out(1.6)',
      scrollTrigger: { trigger: '.ev-band', start: 'top 88%' },
    })
  })

  const alcoves = [
    { src: shrinathji, alt: 'Shrinathji', w: 414, h: 573 },
    { src: flute, alt: 'Musician playing the flute', w: 238, h: 294 },
    { src: shehnai, alt: 'Musician playing the shehnai', w: 293, h: 304 },
    { src: sitar, alt: 'Musician playing the sitar', w: 270, h: 317 },
  ]

  return (
    <section ref={root} className="section relative overflow-hidden pb-0 pt-20" aria-label="Ceremonies" style={{ background: '#f3f7f7' }}>
      {/* soft lattice background */}
      <div className="lattice pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden style={{ background: 'radial-gradient(90% 60% at 50% 40%, rgba(255,248,231,.85), rgba(255,248,231,.2) 70%, transparent)' }} />

      <Lantern className="ev-lantern absolute left-[4%] top-0 w-10 sm:left-[10%] sm:w-14" />
      <Lantern className="ev-lantern absolute right-[4%] top-0 w-10 sm:right-[10%] sm:w-14" />

      <div className="ev-head relative mx-auto max-w-xl px-5 text-center">
        <p className="font-display text-sm tracking-[0.3em] text-gold-dark sm:text-lg">THE CELEBRATIONS</p>
        <h2 className="mt-2 font-script text-5xl text-sindoor sm:text-6xl">Ceremonies</h2>
        <p className="mt-1 font-hindi text-lg text-maroon/80" lang="hi">
          शुभ मुहूर्त
        </p>
      </div>

      <div className="ev-stage relative mx-auto mt-10 max-w-5xl px-6 pb-10">
        <img src={lotusA} alt="" aria-hidden className="ev-lotus-l pointer-events-none will-change-transform absolute -left-6 top-[30%] w-[30vw] max-w-[190px] origin-bottom sm:left-[6%]" loading="lazy" decoding="async" width={500} height={797} />
        <img src={lotusB} alt="" aria-hidden className="ev-lotus-r pointer-events-none will-change-transform absolute -right-6 top-[44%] w-[30vw] max-w-[190px] origin-bottom sm:right-[6%]" loading="lazy" decoding="async" width={537} height={756} />

        <div className={`relative mx-auto grid gap-12 ${visibleEvents.length > 1 ? 'max-w-4xl sm:grid-cols-2' : 'max-w-[400px] justify-items-center'}`}>
          {visibleEvents.map((e) => (
            <ArchCard key={e.id} e={e} />
          ))}
          <img src={peacock} alt="" aria-hidden className="ev-peacock-t pointer-events-none will-change-transform absolute -right-[9%] -top-[8%] w-[30%] max-w-[150px] sm:-right-[16%]" loading="lazy" decoding="async" width={464} height={799} />
          <img src={peacock} alt="" aria-hidden className="ev-peacock-b pointer-events-none will-change-transform absolute -bottom-[7%] -left-[8%] w-[27%] max-w-[140px] -scale-x-100 sm:-left-[16%]" loading="lazy" decoding="async" width={464} height={799} />
        </div>
      </div>

      {/* musicians in arched alcoves, under a marigold swag */}
      <div className="ev-band relative mt-4" style={{ background: 'linear-gradient(180deg, #ecd9b8, #d9bf93)' }}>
        <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="absolute inset-x-0 -top-3 h-6 w-full" aria-hidden>
          {Array.from({ length: 41 }, (_, i) => (
            <circle key={i} cx={i * 10} cy={10 + Math.sin(((i % 10) / 10) * Math.PI) * 8} r="4.2" fill={i % 3 === 1 ? '#E8455F' : i % 2 ? '#FFC93C' : '#F4A300'} />
          ))}
        </svg>
        <div className="mx-auto grid max-w-3xl grid-cols-4 gap-1.5 px-2 pb-3 pt-6 sm:gap-4">
          {alcoves.map((a) => (
            <div key={a.alt} className="ev-alcove relative flex aspect-[3/4.3] items-end justify-center overflow-hidden rounded-t-full border-2 border-[#b8956a] bg-[#fffaf0] shadow-[inset_0_8px_16px_rgba(140,106,22,.18)]">
              <span className="absolute left-1/2 top-[14%] h-[10%] w-px -translate-x-1/2 bg-gold/70" aria-hidden />
              <span className="absolute left-1/2 top-[23%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_8px_rgba(244,163,0,.7)]" aria-hidden />
              <img src={a.src} alt={a.alt} className="relative mb-1 w-[86%] object-contain" loading="lazy" decoding="async" width={a.w} height={a.h} />
            </div>
          ))}
        </div>
        <div className="h-3" style={{ background: 'repeating-linear-gradient(90deg, #b8956a 0 14px, #c9a77a 14px 28px)' }} aria-hidden />
      </div>
    </section>
  )
}
