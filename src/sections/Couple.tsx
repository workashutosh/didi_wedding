import { useRef } from 'react'
import { wedding } from '../config/wedding'
import { Mandala } from '../components/art/Mandala'
import { Divider } from '../components/art/Ornaments'
import bellsL from '../assets/el2-bells-l.webp'
import bellsR from '../assets/el2-bells-r.webp'
import peacock from '../assets/el-peacock.webp'
import lotusPond from '../assets/el2-lotus-pond.webp'
import { fx, gsap, ScrollTrigger, useGsap } from '../lib/scroll'
import { Sparkles } from '../components/Sparkles'
import { reducedMotion } from '../lib/env'

export function Couple() {
  const root = useRef<HTMLElement>(null)
  const amp = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    if (reducedMotion) {
      gsap.from('.cp-fade', { autoAlpha: 0, duration: 1, stagger: 0.2, scrollTrigger: { trigger: root.current, start: 'top 60%' } })
      return
    }
    // Plays once, on its own, when the section comes into view — the page never
    // holds the guest's scroll, and the whole reveal takes about 3 seconds.
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        if (!amp.current) return
        const r = amp.current.getBoundingClientRect()
        if (r.bottom > 0 && r.top < innerHeight) fx.burst(r.left + r.width / 2, r.top + r.height / 2, 40, true)
      },
    })
    tl.fromTo('.cp-bells', { yPercent: -80 }, { yPercent: 0, duration: 1 }, 0)
      .fromTo('.cp-mandala', { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.6 }, 0)
      .fromTo('.cp-eyebrow', { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.2)
      .fromTo('.cp-arch-l', { xPercent: -30, y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.2)
      .fromTo('.cp-arch-r', { xPercent: 30, y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.3)
      .fromTo('.cp-name-l', { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7 }, 0.8)
      .fromTo('.cp-name-r', { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7 }, 0.9)
      .fromTo('.cp-sub', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 1.2)
      .to('.cp-arch-l, .cp-arch-r', { xPercent: 0, duration: 0.8, ease: 'power2.inOut' }, 1.5)
      .fromTo('.cp-amp', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.2)' }, 2.1)
      .fromTo('.cp-flash', { scale: 0.2, autoAlpha: 0 }, { scale: 1.6, autoAlpha: 1, duration: 0.25 }, 2.15)
      .to('.cp-flash', { autoAlpha: 0, scale: 2.2, duration: 0.4 }, 2.4)
      .fromTo('.cp-hindi', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 2.3)
      .fromTo('.cp-tag', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 2.5)
    ScrollTrigger.create({ trigger: root.current, start: 'top 65%', once: true, onEnter: () => tl.play() })
  })

  const { bride, groom } = wedding

  return (
    <section ref={root} className="section grain" aria-label={`${bride.full} and ${groom.full}`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(90% 60% at 50% 45%, #8a1a2b 0%, #5A0F1B 45%, #2E060D 100%)',
        }}
        aria-hidden
      />
      <div className="relative flex min-h-[100svh] py-16 flex-col items-center justify-center px-3">
        {/* temple bells across the top */}
        <img src={bellsL} alt="" aria-hidden className="cp-bells pointer-events-none absolute -left-[3%] top-0 w-[48vw] max-w-[330px] will-change-transform" loading="lazy" decoding="async" width={520} height={452} />
        <img src={bellsR} alt="" aria-hidden className="cp-bells pointer-events-none absolute -right-[3%] top-0 w-[48vw] max-w-[330px] will-change-transform" loading="lazy" decoding="async" width={520} height={451} />
        {/* back layer: rotating mandala */}
        <div className="cp-back pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <div className="cp-mandala w-[min(135vw,860px)] opacity-0 will-change-transform">
            <Mandala className="spin-slower h-auto w-full opacity-30" strokeWidth={0.6} />
          </div>
        </div>

        <p className="cp-eyebrow cp-fade relative mb-8 mt-[14vh] sm:mt-[10vh] font-display text-[0.8rem] tracking-[0.35em] text-gold-light sm:text-base">
          SHUBH VIVAH
        </p>

        <div className="relative flex w-full max-w-[760px] items-stretch justify-center">
          {/* left arch — bride */}
          <div className="cp-arch cp-arch-l cp-fade relative w-[46%] max-w-[320px]">
            <img src={peacock} alt="" aria-hidden className="pointer-events-none absolute -left-[10%] -top-[14%] z-10 w-[40%] max-w-[120px] -scale-x-100" loading="lazy" decoding="async" width={320} height={551} />
            <div className="rounded-t-[999px] rounded-b-[16px] p-[3px] shadow-[0_24px_50px_-20px_rgba(0,0,0,.7),0_0_40px_rgba(244,163,0,.18)]" style={{ background: 'linear-gradient(160deg, #F3D98B, #B8901F 35%, #FFF1B8 55%, #A37A1C 80%, #E8C967)' }}>
              <div className="paper relative flex aspect-[3/4.3] flex-col items-center justify-center overflow-hidden rounded-t-[999px] rounded-b-[13px] px-2 pt-[18%] text-center">
                <div className="pointer-events-none absolute inset-[6px] rounded-t-[999px] rounded-b-[9px] border border-gold/60" aria-hidden />
                <p className="font-hindi text-[0.8rem] text-gold-dark sm:text-base" lang="hi">वधू</p>
                <p className="cp-name-l font-script text-[clamp(2.3rem,11vw,4.8rem)] leading-[1.15] text-sindoor">
                  <span className="maroon-foil">{bride.first}</span>
                </p>
                <Divider className="cp-sub my-1 w-[70%]" />
                <p className="cp-sub font-serif text-[0.8rem] uppercase tracking-[0.14em] whitespace-nowrap text-maroon/85 sm:text-xs">{bride.full}</p>
              </div>
            </div>
          </div>

          {/* ampersand */}
          <div ref={amp} className="cp-amp cp-fade absolute -bottom-[1.4rem] left-1/2 sm:-bottom-8 z-10 -ml-[1.9rem] grid h-[3.8rem] w-[3.8rem] place-items-center sm:-ml-10 sm:h-20 sm:w-20">
            <div className="cp-flash absolute inset-[-60%] rounded-full opacity-0" style={{ background: 'radial-gradient(circle, rgba(255,241,184,.9), rgba(244,163,0,.35) 40%, transparent 70%)' }} aria-hidden />
            <div className="absolute inset-0 rounded-full border border-gold/70 bg-maroon-deep/90 shadow-[0_0_30px_rgba(244,163,0,.45)]" aria-hidden />
            <span className="relative -mt-1 font-serif text-[2.1rem] italic leading-none sm:text-5xl">
              <span className="gold-foil-static">&amp;</span>
            </span>
          </div>

          {/* right arch — groom */}
          <div className="cp-arch cp-arch-r cp-fade relative w-[46%] max-w-[320px]">
            <img src={peacock} alt="" aria-hidden className="pointer-events-none absolute -right-[10%] -top-[14%] z-10 w-[40%] max-w-[120px]" loading="lazy" decoding="async" width={320} height={551} />
            <div className="rounded-t-[999px] rounded-b-[16px] p-[3px] shadow-[0_24px_50px_-20px_rgba(0,0,0,.7),0_0_40px_rgba(244,163,0,.18)]" style={{ background: 'linear-gradient(160deg, #F3D98B, #B8901F 35%, #FFF1B8 55%, #A37A1C 80%, #E8C967)' }}>
              <div className="paper relative flex aspect-[3/4.3] flex-col items-center justify-center overflow-hidden rounded-t-[999px] rounded-b-[13px] px-2 pt-[18%] text-center">
                <div className="pointer-events-none absolute inset-[6px] rounded-t-[999px] rounded-b-[9px] border border-gold/60" aria-hidden />
                <p className="font-hindi text-[0.8rem] text-gold-dark sm:text-base" lang="hi">वर</p>
                <p className="cp-name-r font-script text-[clamp(2.3rem,11vw,4.8rem)] leading-[1.15] text-sindoor">
                  <span className="maroon-foil">{groom.first}</span>
                </p>
                <Divider className="cp-sub my-1 w-[70%]" />
                <p className="cp-sub font-serif text-[0.8rem] uppercase tracking-[0.14em] whitespace-nowrap text-maroon/85 sm:text-xs">{groom.full}</p>
              </div>
            </div>
          </div>

        </div>

        <Sparkles className="cp-tag absolute inset-x-[8%] top-[22%] h-[46%]" count={8} seed={5} />
        <p className="cp-hindi cp-fade relative mt-12 sm:mt-16 font-hindi text-[1.9rem] leading-none sm:text-5xl" lang="hi">
          <span className="gold-foil-static foil-glow">{bride.hindi}</span>
          <span className="mx-3 inline-block align-middle text-[0.6em] text-sindoor drop-shadow-[0_0_8px_rgba(179,18,46,.8)]">❤</span>
          <span className="gold-foil-static foil-glow">{groom.hindi}</span>
        </p>
        <p className="cp-tag cp-fade relative mt-4 font-serif text-sm italic text-ivory/90 sm:text-base">two souls · one sacred journey</p>

        {/* front parallax layer: lotus ponds */}
        <img src={lotusPond} alt="" aria-hidden className="cp-front-a pointer-events-none absolute bottom-[-3%] left-[-6%] w-[30vw] max-w-[200px]" loading="lazy" decoding="async" width={340} height={446} />
        <img src={lotusPond} alt="" aria-hidden className="cp-front-b pointer-events-none absolute bottom-[-1%] right-[-6%] w-[26vw] max-w-[180px] -scale-x-100" loading="lazy" decoding="async" width={340} height={446} />
      </div>
    </section>
  )
}
