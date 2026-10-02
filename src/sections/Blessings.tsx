import { useRef } from 'react'
import { wedding } from '../config/wedding'
import { Toran } from '../components/art/Toran'
import { Divider, Kalash } from '../components/art/Ornaments'
import { Elephant } from '../components/art/Elephant'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'
import { Words } from '../lib/split'

export function Blessings() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    if (reducedMotion) return
    gsap.from('.bl-word', {
      autoAlpha: 0,
      y: 30,
      rotateX: -50,
      stagger: 0.08,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.bl-head', start: 'top 78%' },
    })
    gsap.from('.bl-sub', { autoAlpha: 0, y: 16, stagger: 0.15, duration: 0.9, scrollTrigger: { trigger: '.bl-head', start: 'top 70%' } })
    // elephants walk in to honour the couple
    const walk = { trigger: '.bl-procession', start: 'top 92%', end: 'center 60%', scrub: 0.35 }
    gsap.fromTo('.bl-ele-l', { xPercent: -120, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: 'power2.out', scrollTrigger: walk })
    gsap.fromTo('.bl-ele-r', { xPercent: 120, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, ease: 'power2.out', scrollTrigger: walk })
    gsap.fromTo('.bl-kalash', { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: 'back.out(2)', scrollTrigger: walk })
    gsap.utils.toArray<HTMLElement>('.bl-family').forEach((el) => {
      gsap.from(el.querySelectorAll('.bl-fade'), {
        autoAlpha: 0,
        y: 20,
        stagger: 0.09,
        duration: 0.9,
        scrollTrigger: { trigger: el, start: 'top 82%' },
      })
    })
    // toran gently drops in
    gsap.from('.bl-toran', { yPercent: -60, duration: 1.4, ease: 'elastic.out(1, 0.55)', scrollTrigger: { trigger: root.current, start: 'top 70%' } })
  })

  const { blessings, families, hosts } = wedding

  return (
    <section ref={root} className="section silk grain px-5 pb-24 pt-44 sm:pt-56" aria-label="Blessings and family">
      <div className="jaali absolute inset-0 opacity-50" aria-hidden />
      <div className="bl-toran absolute inset-x-0 top-0" aria-hidden>
        <Toran className="block h-auto w-full" />
      </div>

      <div className="bl-head relative mx-auto max-w-3xl text-center [perspective:600px]">
        <h2 className="font-hindi text-[1.75rem] leading-snug [text-wrap:balance] sm:text-[2.6rem]" lang="hi">
          <span className="foil-glow inline-block">
            <Words text={blessings.hindi} className="bl-word gold-foil-static" />
          </span>
        </h2>
        <p className="bl-sub mt-4 font-serif text-lg italic text-gold-light/90">“{blessings.roman}”</p>
        <p className="bl-sub mt-1 font-serif text-xs uppercase tracking-[0.3em] text-ivory/70">{blessings.english}</p>
      </div>

      <div className="bl-procession relative mx-auto mt-10 flex max-w-3xl items-end justify-center gap-1" aria-hidden>
        <Elephant className="bl-ele-l w-[40%] max-w-[300px]" />
        <Kalash className="bl-kalash mb-1 w-[15%] max-w-[90px]" />
        <Elephant className="bl-ele-r w-[40%] max-w-[300px] -scale-x-100" />
      </div>
      <Divider className="mx-auto mt-2 w-64" />

      <div className="relative mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
        {families.map((f) => (
          <div key={f.title} className="bl-family relative rounded-[24px] border border-gold/40 bg-maroon-deep/50 px-6 py-8 text-center">
            <p className="bl-fade font-hindi text-xl text-marigold" lang="hi">
              {f.hindi}
            </p>
            <h3 className="bl-fade mt-1 font-display text-lg font-bold tracking-wider">
              <span className="gold-foil-static">{f.title}</span>
            </h3>
            <ul className="mt-4 space-y-2 font-serif text-[0.98rem] text-ivory/90">
              {f.members.map((m) => (
                <li key={m} className="bl-fade">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="relative mx-auto mt-10 max-w-xl text-center font-serif text-sm italic text-gold-light/80">
        With warm regards — {hosts}
      </p>
    </section>
  )
}
