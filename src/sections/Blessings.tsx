import { useRef } from 'react'
import { wedding } from '../config/wedding'
import { Divider } from '../components/art/Ornaments'
import bellsL from '../assets/el2-bells-l.webp'
import bellsR from '../assets/el2-bells-r.webp'
import doli from '../assets/el2-doli.webp'
import umbrella from '../assets/el2-umbrella.webp'
import lotusPond from '../assets/el2-lotus-pond.webp'
import lotusStem from '../assets/el2-lotus-stem.webp'
import gathbandhan from '../assets/el2-gathbandhan.webp'
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
    gsap.fromTo('.bl-doli', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'power2.out', scrollTrigger: walk })
    gsap.utils.toArray<HTMLElement>('.bl-family').forEach((el) => {
      gsap.from(el.querySelectorAll('.bl-fade'), {
        autoAlpha: 0,
        y: 20,
        stagger: 0.09,
        duration: 0.9,
        scrollTrigger: { trigger: el, start: 'top 82%' },
      })
    })
    // bells drop in and keep swinging gently
    gsap.from('.bl-bells', { yPercent: -70, duration: 1.4, ease: 'elastic.out(1, 0.55)', scrollTrigger: { trigger: root.current, start: 'top 75%' } })
    gsap.to('.bl-bells', { rotate: 2.5, transformOrigin: '50% 0%', duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.7 })
    const tie = { trigger: '.bl-knot', start: 'top 95%', end: 'center 65%', scrub: 0.35 }
    gsap.fromTo('.bl-knot', { scale: 0.5, autoAlpha: 0, rotate: -8 }, { scale: 1, autoAlpha: 1, rotate: 0, ease: 'back.out(2)', scrollTrigger: tie })
    gsap.fromTo('.bl-pond', { xPercent: -50, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, scrollTrigger: tie })
    gsap.fromTo('.bl-stem', { xPercent: 50, autoAlpha: 0, rotate: 10 }, { xPercent: 0, autoAlpha: 1, rotate: 0, scrollTrigger: tie })
  })

  const { blessings, families, hosts } = wedding

  return (
    <section ref={root} className="section relative px-5 pb-24 pt-[min(42vw,230px)]" style={{ background: '#f3f7f7' }} aria-label="Blessings and family">
      <div className="lattice pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="pointer-events-none absolute inset-0" aria-hidden style={{ background: 'radial-gradient(90% 60% at 50% 40%, rgba(255,248,231,.92), rgba(255,248,231,.25) 70%, transparent)' }} />

      {/* temple bells hanging from marigold garlands */}
      <img src={bellsL} alt="" aria-hidden className="bl-bells pointer-events-none absolute -left-[4%] top-0 w-[56vw] max-w-[380px] will-change-transform" loading="lazy" decoding="async" width={520} height={452} />
      <img src={bellsR} alt="" aria-hidden className="bl-bells pointer-events-none absolute -right-[4%] top-0 w-[56vw] max-w-[380px] will-change-transform" loading="lazy" decoding="async" width={520} height={451} />

      <div className="bl-head relative mx-auto max-w-3xl text-center [perspective:600px]">
        <h2 className="font-hindi text-[1.75rem] leading-snug text-sindoor [text-wrap:balance] sm:text-[2.6rem]" lang="hi">
          <Words text={blessings.hindi} className="bl-word" />
        </h2>
        <p className="bl-sub mt-3 font-script text-3xl text-maroon sm:text-4xl">“{blessings.roman}”</p>
        <p className="bl-sub mt-1 font-serif text-xs uppercase tracking-[0.3em] text-gold-dark">{blessings.english}</p>
      </div>

      {/* royal procession: elephant · doli under the chhatri · elephant */}
      <div className="bl-procession relative mx-auto mt-10 flex max-w-3xl items-end justify-center" aria-hidden>
        <Elephant className="bl-ele-l relative z-10 -mr-[4%] w-[34%] max-w-[250px]" />
        <div className="bl-doli relative w-[36%] max-w-[260px]">
          <img src={umbrella} alt="" className="absolute -top-[62%] left-1/2 w-[70%] -translate-x-1/2" loading="lazy" decoding="async" width={360} height={331} />
          <img src={doli} alt="" className="relative w-full" loading="lazy" decoding="async" width={560} height={302} />
        </div>
        <Elephant className="bl-ele-r relative z-10 -ml-[4%] w-[34%] max-w-[250px] -scale-x-100" />
      </div>
      <Divider className="mx-auto mt-4 w-64" />

      {/* families in gold arches, tied together by the gathbandhan */}
      <div className="relative mx-auto mt-12 max-w-4xl">
        <img src={lotusPond} alt="" aria-hidden className="bl-pond pointer-events-none absolute -left-[10%] bottom-[4%] z-10 w-[30vw] max-w-[190px] will-change-transform sm:-left-[14%]" loading="lazy" decoding="async" width={340} height={446} />
        <img src={lotusStem} alt="" aria-hidden className="bl-stem pointer-events-none absolute -right-[6%] bottom-[6%] z-10 w-[18vw] max-w-[110px] will-change-transform sm:-right-[10%]" loading="lazy" decoding="async" width={240} height={544} />
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
          {families.map((f) => (
            <div key={f.title} className="bl-family relative mx-auto w-[min(80vw,360px)]">
              <div className="rounded-t-[999px] rounded-b-[18px] p-[3px] shadow-[0_26px_50px_-26px_rgba(90,15,27,.5)]" style={{ background: 'linear-gradient(160deg, #F3D98B, #B8901F 35%, #FFF1B8 55%, #A37A1C 80%, #E8C967)' }}>
                <div className="paper relative overflow-hidden rounded-t-[999px] rounded-b-[15px] px-6 pb-8 pt-[26%] text-center">
                  <div className="pointer-events-none absolute inset-[7px] rounded-t-[999px] rounded-b-[11px] border border-gold/50" aria-hidden />
                  <p className="bl-fade font-hindi text-xl text-sindoor" lang="hi">
                    {f.hindi}
                  </p>
                  <h3 className="bl-fade mt-1 font-script text-[2.6rem] leading-tight text-maroon">{f.title}</h3>
                  <Divider className="bl-fade mx-auto my-3 w-36" />
                  <ul className="space-y-2 font-serif text-[0.98rem] text-maroon/85">
                    {f.members.map((m) => (
                      <li key={m} className="bl-fade">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <img src={gathbandhan} alt="" aria-hidden className="bl-knot pointer-events-none relative z-20 mx-auto -mt-6 w-[min(70vw,360px)] will-change-transform sm:-mt-10" loading="lazy" decoding="async" width={560} height={301} />
      </div>

      <p className="relative z-20 mx-auto mt-14 max-w-xl text-center font-serif text-base italic text-maroon/80 sm:mt-8">With warm regards — {hosts}</p>
    </section>
  )
}
