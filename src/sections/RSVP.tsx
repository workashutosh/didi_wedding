import { useRef } from 'react'
import { wedding } from '../config/wedding'
import { Corner, Divider, Diya } from '../components/art/Ornaments'
import { GoldButton } from '../components/GoldButton'
import { gsap, useGsap } from '../lib/scroll'
import { reducedMotion } from '../lib/env'

const digits = (s: string) => s.replace(/[^\d]/g, '')

export function RSVP() {
  const root = useRef<HTMLElement>(null)
  const { rsvp } = wedding
  const wa = `https://wa.me/${digits(rsvp.whatsapp)}?text=${encodeURIComponent(rsvp.message)}`
  const tel = `tel:${rsvp.phone.replace(/[^\d+]/g, '')}`

  useGsap(root, () => {
    if (reducedMotion) return
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.rs-card', start: 'top 78%' } })
    tl.from('.rs-card', { autoAlpha: 0, y: 60, scale: 0.94, duration: 1.2, ease: 'expo.out' })
      .from('.rs-card .rs-fade', { autoAlpha: 0, y: 18, stagger: 0.1, duration: 0.8 }, 0.3)
      .to('.rs-card .draw', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.2)
  })

  return (
    <section ref={root} className="section flex items-center justify-center px-5 py-24" style={{ background: 'radial-gradient(100% 70% at 50% 50%, #5A0F1B, #2E060D)' }} aria-label="RSVP">
      <div className="jaali absolute inset-0 opacity-70" aria-hidden />
      <div className="rs-card paper grain relative w-full max-w-lg overflow-hidden rounded-[28px] px-7 py-12 text-center shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] sm:px-12">
        <div className="pointer-events-none absolute inset-3 rounded-[20px] border-2 border-maroon/70" aria-hidden />
        <div className="pointer-events-none absolute inset-[18px] rounded-[16px] border border-gold/70" aria-hidden />
        <Corner className="absolute left-5 top-5 w-12" drawable />
        <Corner className="absolute right-5 top-5 w-12 -scale-x-100" drawable />
        <Corner className="absolute bottom-5 left-5 w-12 -scale-y-100" drawable />
        <Corner className="absolute bottom-5 right-5 w-12 -scale-100" drawable />

        <Diya className="rs-fade mx-auto h-14 w-12" />
        <p className="rs-fade mt-3 font-display text-sm tracking-[0.3em] text-gold-dark">KINDLY RSVP</p>
        <h2 className="rs-fade mt-2 font-script text-5xl leading-tight text-sindoor sm:text-6xl">Will you join us?</h2>
        <Divider className="rs-fade mx-auto my-5 w-48" />
        <p className="rs-fade font-serif text-base leading-relaxed text-maroon/85">
          Your blessings would make our celebration complete. Please let us know you’re coming.
        </p>
        {rsvp.respondBy && <p className="rs-fade mt-2 font-serif text-sm italic text-maroon/70">{rsvp.respondBy}</p>}

        <div className="rs-fade mt-8 flex flex-col items-center gap-3">
          <GoldButton className="w-full max-w-[300px]" href={wa} target="_blank" rel="noopener" aria-label={`RSVP on WhatsApp to ${rsvp.contactName}`}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
            </svg>
            RSVP on WhatsApp
          </GoldButton>
          <GoldButton variant="ghost" className="w-full max-w-[300px] text-maroon" href={tel} aria-label={`Call ${rsvp.contactName}`}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
            </svg>
            Call to RSVP
          </GoldButton>
        </div>
        <p className="rs-fade mt-5 font-serif text-sm text-maroon/70">
          {rsvp.contactName} · {rsvp.phone}
        </p>
      </div>
    </section>
  )
}
