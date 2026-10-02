import { useRef } from 'react'
import { wedding } from '../config/wedding'
import { Corner, Divider, Kalash, Paisley } from '../components/art/Ornaments'
import { Mandala } from '../components/art/Mandala'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'

export function Invitation() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, () => {
    if (reducedMotion) return
    gsap.set('.inv-line', { autoAlpha: 0, y: 40 })
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: root.current, start: 'top 92%', end: 'center 55%', scrub: 0.35 },
    })
    tl.to('.inv-kalash .draw', { strokeDashoffset: 0, duration: 0.5 }, 0)
      .fromTo('.inv-kalash', { scale: 0.7, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4 }, 0)
      .to('.inv-line', { autoAlpha: 1, y: 0, stagger: 0.18, duration: 0.4 }, 0.15)
      .to('.inv-divider .draw', { strokeDashoffset: 0, duration: 0.5 }, 0.3)
      .to('.inv-corner .draw', { strokeDashoffset: 0, duration: 0.8 }, 0)

    // paisleys drift (parallax)
    gsap.fromTo(
      '.inv-paisley',
      { y: 60 },
      { y: -60, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
    )
  })

  return (
    <section ref={root} className="section silk grain flex items-center justify-center px-6 py-24" aria-label="Invitation">
      {/* ornamental frame */}
      <div className="pointer-events-none absolute inset-4 sm:inset-8" aria-hidden>
        <Corner className="inv-corner absolute left-0 top-0 w-16 sm:w-24" drawable />
        <Corner className="inv-corner absolute right-0 top-0 w-16 -scale-x-100 sm:w-24" drawable />
        <Corner className="inv-corner absolute bottom-0 left-0 w-16 -scale-y-100 sm:w-24" drawable />
        <Corner className="inv-corner absolute bottom-0 right-0 w-16 -scale-100 sm:w-24" drawable />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <Mandala className="spin-slower w-[min(140vw,900px)] opacity-[0.13]" filled={false} />
      </div>
      <Paisley className="inv-paisley absolute left-[4%] top-[30%] w-8 opacity-40 sm:w-12" />
      <Paisley className="inv-paisley absolute right-[4%] top-[58%] w-8 -scale-x-100 opacity-40 sm:w-12" />

      <div className="relative mx-auto max-w-xl text-center">
        <Kalash className="inv-kalash mx-auto mb-6 w-20 sm:w-24" drawable />
        <p className="inv-line font-serif text-lg italic text-gold-light sm:text-2xl">{wedding.invitation.blessingLine},</p>
        <Divider className="inv-divider inv-line mx-auto my-6 w-56 sm:w-72" drawable />
        <p className="inv-line font-serif text-[1.55rem] font-semibold leading-snug sm:text-4xl">
          <span className="gold-foil">{wedding.hosts}</span>
        </p>
        <p className="inv-line mt-6 font-serif text-lg italic text-ivory/90 sm:text-2xl">{wedding.invitation.inviteLine}</p>
        <div className="inv-line mx-auto mt-8 h-14 w-px bg-gradient-to-b from-gold to-transparent" aria-hidden />
      </div>
    </section>
  )
}
