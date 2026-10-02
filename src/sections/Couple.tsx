import { useRef } from 'react'
import { wedding } from '../config/wedding'
import { Jharokha } from '../components/art/Jharokha'
import { Mandala } from '../components/art/Mandala'
import { Lotus, Paisley } from '../components/art/Ornaments'
import { fx, gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'

export function Couple() {
  const root = useRef<HTMLElement>(null)
  const amp = useRef<HTMLDivElement>(null)

  useGsap(root, () => {
    if (reducedMotion) {
      gsap.from('.cp-fade', { autoAlpha: 0, duration: 1, stagger: 0.2, scrollTrigger: { trigger: root.current, start: 'top 60%' } })
      return
    }
    let burstDone = false

    // Each property has exactly ONE owning timeline, so fast flings can't
    // leave two scrubbed timelines fighting over the same value.
    gsap.set('.cp-arch-l', { xPercent: -38 })
    gsap.set('.cp-arch-r', { xPercent: 38 })

    // pre-roll: the stage assembles while the section scrolls into view
    const pre = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: root.current, start: 'top 88%', end: 'top top', scrub: 0.35 },
    })
    pre
      .fromTo('.cp-mandala', { scale: 0.4, autoAlpha: 0, rotate: -50 }, { scale: 0.85, autoAlpha: 1, rotate: 0, duration: 1 }, 0)
      .fromTo('.cp-eyebrow', { autoAlpha: 0, y: -24 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.5)
      .fromTo('.cp-arch-l', { y: 160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 0.2)
      .fromTo('.cp-arch-r', { y: 160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 0.3)
      .to('.cp-arch .draw', { strokeDashoffset: 0, duration: 0.8, ease: 'power1.inOut' }, 0.2)

    const tl = gsap.timeline({
      defaults: { ease: 'none', immediateRender: false },
      scrollTrigger: {
        trigger: root.current,
        start: 'top top',
        end: '+=200%',
        scrub: 0.35,
        pin: true,
        anticipatePin: 1,
      },
    })
    gsap.set('.cp-name-l, .cp-name-r, .cp-sub, .cp-amp, .cp-hindi, .cp-tag', { autoAlpha: 0 })

    // names glide in from opposite edges
    tl.fromTo('.cp-name-l', { x: '-70vw', autoAlpha: 0, rotate: -8 }, { x: 0, autoAlpha: 1, rotate: 0, duration: 0.28, ease: 'power3.out' }, 0)
      .fromTo('.cp-name-r', { x: '70vw', autoAlpha: 0, rotate: 8 }, { x: 0, autoAlpha: 1, rotate: 0, duration: 0.28, ease: 'power3.out' }, 0.05)
      .fromTo('.cp-sub', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.26)
      // …and meet in the centre
      .fromTo('.cp-arch-l', { xPercent: -38 }, { xPercent: 0, duration: 0.24, ease: 'power2.inOut' }, 0.36)
      .fromTo('.cp-arch-r', { xPercent: 38 }, { xPercent: 0, duration: 0.24, ease: 'power2.inOut' }, 0.36)
      .fromTo('.cp-back', { scale: 1 }, { scale: 1.25, duration: 0.5 }, 0.36)
      .fromTo('.cp-amp', { scale: 0, rotate: -120, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.14, ease: 'back.out(2.2)' }, 0.56)
      .fromTo('.cp-flash', { scale: 0.2, autoAlpha: 0 }, { scale: 1.6, autoAlpha: 1, duration: 0.08 }, 0.58)
      .to('.cp-flash', { autoAlpha: 0, scale: 2.2, duration: 0.12 }, 0.66)
      .call(
        () => {
          if (burstDone || !amp.current) return
          burstDone = true
          const r = amp.current.getBoundingClientRect()
          fx.burst(r.left + r.width / 2, r.top + r.height / 2, 46, true)
        },
        [],
        0.6,
      )
      .fromTo('.cp-hindi', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0.7)
      .fromTo('.cp-tag', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.78)
      .to({}, { duration: 0.14 })

    // parallax layers across the whole pinned span
    tl.fromTo('.cp-back', { y: 40 }, { y: -40, duration: tl.duration() }, 0)
    tl.fromTo('.cp-front-a', { y: 90 }, { y: -90, duration: tl.duration() }, 0)
    tl.fromTo('.cp-front-b', { y: 140 }, { y: -60, duration: tl.duration() }, 0)
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
      <div className="pin-wrap relative flex flex-col items-center justify-center px-3">
        {/* back layer: rotating mandala */}
        <div className="cp-back pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
          <div className="cp-mandala w-[min(135vw,860px)] opacity-0 will-change-transform">
            <Mandala className="spin-slower h-auto w-full opacity-55" strokeWidth={0.6} />
          </div>
        </div>

        <p className="cp-eyebrow cp-fade relative mb-3 font-display text-[0.8rem] tracking-[0.35em] text-gold-light sm:text-base">
          SHUBH VIVAH
        </p>

        <div className="relative flex w-full max-w-[760px] items-stretch justify-center">
          {/* left arch — bride */}
          <div className="cp-arch cp-arch-l cp-fade relative w-[47%] max-w-[330px]">
            <Jharokha className="h-auto w-full" drawable inner="rgba(28,3,7,.55)" />
            <div className="absolute inset-x-[14%] bottom-[16%] top-[38%] flex flex-col items-center justify-center text-center">
              <p className="cp-name-l font-script text-[clamp(2.4rem,11.5vw,5.2rem)] leading-[1.15]">
                <span className="gold-foil foil-anim">{bride.first}</span>
              </p>
              <p className="cp-sub mt-1 font-serif text-[0.6rem] uppercase tracking-[0.16em] whitespace-nowrap text-gold-light/80 sm:text-xs">{bride.full}</p>
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
          <div className="cp-arch cp-arch-r cp-fade relative w-[47%] max-w-[330px]">
            <Jharokha className="h-auto w-full" drawable inner="rgba(28,3,7,.55)" />
            <div className="absolute inset-x-[14%] bottom-[16%] top-[38%] flex flex-col items-center justify-center text-center">
              <p className="cp-name-r font-script text-[clamp(2.4rem,11.5vw,5.2rem)] leading-[1.15]">
                <span className="gold-foil foil-anim">{groom.first}</span>
              </p>
              <p className="cp-sub mt-1 font-serif text-[0.6rem] uppercase tracking-[0.16em] whitespace-nowrap text-gold-light/80 sm:text-xs">{groom.full}</p>
            </div>
          </div>
        </div>

        <p className="cp-hindi cp-fade relative mt-12 sm:mt-16 font-hindi text-[1.9rem] leading-none sm:text-5xl" lang="hi">
          <span className="gold-foil-static foil-glow">{bride.hindi}</span>
          <span className="mx-3 inline-block align-middle text-[0.6em] text-sindoor drop-shadow-[0_0_8px_rgba(179,18,46,.8)]">❤</span>
          <span className="gold-foil-static foil-glow">{groom.hindi}</span>
        </p>
        <p className="cp-tag cp-fade relative mt-4 font-serif text-sm italic text-ivory/80 sm:text-base">two souls · one sacred journey</p>

        {/* front parallax layer */}
        <Lotus className="cp-front-a pointer-events-none absolute bottom-[-2%] left-[-8%] w-28 opacity-60 sm:w-40" />
        <Lotus className="cp-front-b pointer-events-none absolute bottom-[2%] right-[-9%] w-24 opacity-50 sm:w-36" />
        <Paisley className="cp-front-b pointer-events-none absolute left-[6%] top-[14%] w-7 opacity-50" />
        <Paisley className="cp-front-a pointer-events-none absolute right-[7%] top-[22%] w-6 -scale-x-100 opacity-50" />
      </div>
    </section>
  )
}
