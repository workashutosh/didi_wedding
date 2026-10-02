import { useRef } from 'react'
import { visibleEvents, wedding, type WeddingEvent } from '../config/wedding'
import { EventIcon } from '../components/art/EventIcons'
import { Corner, Divider } from '../components/art/Ornaments'
import { Mandala } from '../components/art/Mandala'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'

function Card({ e, featured }: { e: WeddingEvent; featured: boolean }) {
  return (
    <div className={`ev-card relative mx-auto w-full ${featured ? 'max-w-[360px]' : 'max-w-[330px]'} [perspective:1200px]`}>
      <div className="ev-inner relative aspect-[3/4.1] w-full [transform-style:preserve-3d]">
        {/* back (seen first) */}
        <div
          className="absolute inset-0 grid place-items-center overflow-hidden rounded-[22px] border border-gold/60 silk [-webkit-backface-visibility:hidden] [backface-visibility:hidden] [transform:rotateY(180deg)]"
          aria-hidden
        >
          <div className="absolute inset-3 rounded-[16px] border border-gold/40" />
          <Mandala className="w-[78%] opacity-80" />
          <p className="absolute bottom-7 font-hindi text-lg text-gold-light">॥ शुभ ॥</p>
        </div>

        {/* front */}
        <article className="paper absolute inset-0 flex flex-col items-center overflow-hidden rounded-[22px] border-2 border-maroon/80 px-6 pb-6 pt-7 text-center shadow-[0_25px_50px_-20px_rgba(90,15,27,.55)] [-webkit-backface-visibility:hidden] [backface-visibility:hidden]">
          <div className="pointer-events-none absolute inset-2 rounded-[16px] border border-gold/70" aria-hidden />
          <Corner className="absolute left-3 top-3 w-10" />
          <Corner className="absolute right-3 top-3 w-10 -scale-x-100" />
          <Corner className="absolute bottom-3 left-3 w-10 -scale-y-100" />
          <Corner className="absolute bottom-3 right-3 w-10 -scale-100" />

          <div className="ev-icon relative grid h-24 w-24 place-items-center rounded-full bg-maroon shadow-[inset_0_0_0_2px_#D4AF37,inset_0_0_0_6px_#5A0F1B,inset_0_0_0_7px_rgba(212,175,55,.6)]">
            <EventIcon name={e.icon} className="h-16 w-16" />
          </div>
          <h3 className="mt-4 font-display text-[1.9rem] font-bold leading-none">
            <span className="maroon-foil">{e.name}</span>
          </h3>
          <p className="mt-1 font-hindi text-xl text-sindoor" lang="hi">
            {e.hindi}
          </p>
          <Divider className="my-3 w-40" />
          <p className="font-serif text-[0.95rem] font-semibold text-maroon">{e.dateLabel}</p>
          <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-1.5 font-serif text-sm font-semibold tracking-wide text-gold-light">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" />
            </svg>
            {e.timeLabel}
          </p>
          <p className="mt-3 font-serif text-[0.92rem] italic leading-relaxed text-maroon/80">{e.description}</p>
          <p className="mt-auto pt-2 font-serif text-[0.7rem] uppercase tracking-[0.18em] text-gold-dark">
            {e.venue || wedding.venue.name}
          </p>
        </article>
      </div>
    </div>
  )
}

export function Ceremonies() {
  const root = useRef<HTMLElement>(null)
  const featured = visibleEvents.length === 1

  useGsap(root, () => {
    gsap.from('.ev-head > *', {
      autoAlpha: 0,
      y: 24,
      stagger: 0.12,
      duration: 1,
      scrollTrigger: { trigger: '.ev-head', start: 'top 80%' },
    })
    if (reducedMotion) return
    gsap.utils.toArray<HTMLElement>('.ev-card').forEach((card, i) => {
      const inner = card.querySelector('.ev-inner')
      gsap.fromTo(
        inner,
        { rotateY: -180, rotateX: 8, y: 60, scale: 0.88 },
        {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          scale: 1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: card, start: `top ${92 - (i % 2) * 4}%`, end: 'center 58%', scrub: 0.35 },
        },
      )
      gsap.from(card.querySelector('.ev-icon'), {
        scale: 0.4,
        rotate: -90,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: card, start: 'center 70%', end: 'center 50%', scrub: 0.35 },
      })
    })
  })

  return (
    <section ref={root} className="section paper grain px-5 pb-28 pt-20" aria-label="Ceremonies">
      <div className="ev-head relative mx-auto max-w-xl text-center">
        <p className="font-display text-sm tracking-[0.3em] text-gold-dark sm:text-lg">THE CELEBRATIONS</p>
        <h2 className="mt-3 font-script text-5xl text-sindoor sm:text-6xl">Ceremonies</h2>
        <p className="mt-2 font-hindi text-lg text-maroon/80" lang="hi">
          शुभ मुहूर्त
        </p>
      </div>
      <div className={`relative mx-auto mt-12 grid max-w-5xl gap-10 ${featured ? '' : 'sm:grid-cols-2 lg:gap-14'}`}>
        {visibleEvents.map((e) => (
          <Card key={e.id} e={e} featured={featured} />
        ))}
      </div>
    </section>
  )
}
