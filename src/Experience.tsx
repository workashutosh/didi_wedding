import { useEffect } from 'react'
import { domAnimation, LazyMotion } from 'framer-motion'
import { ScrollTrigger, getLenis, startSmoothScroll } from './lib/scroll'
import { reducedMotion } from './lib/env'
import { ParticleField } from './components/ParticleField'
import { MusicToggle, PointerFX, ScrollProgress } from './components/Chrome'
import { Ganesh } from './sections/Ganesh'
import { Invitation } from './sections/Invitation'
import { Couple } from './sections/Couple'
import { HastaMilap } from './sections/HastaMilap'
import { SaveTheDate } from './sections/SaveTheDate'
import { Ceremonies } from './sections/Ceremonies'
import { Venue } from './sections/Venue'
import { Blessings } from './sections/Blessings'
import { RSVP } from './sections/RSVP'
import { Closing } from './sections/Closing'

export default function Experience({ opened }: { opened: boolean }) {
  // smooth scroll lives for the whole session; paused until the doors open
  useEffect(() => {
    const stop = startSmoothScroll()
    getLenis()?.stop()
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    if (reducedMotion) document.documentElement.classList.add('reduce-motion')
    return () => {
      stop()
      window.removeEventListener('load', refresh)
    }
  }, [])

  useEffect(() => {
    if (!opened) return
    window.scrollTo(0, 0)
    getLenis()?.start()
    ScrollTrigger.refresh()
  }, [opened])

  return (
    <LazyMotion features={domAnimation} strict>
      <a href="#rsvp" className="sr-only-focusable fixed left-3 top-3 z-[80] rounded bg-ivory px-3 py-2 text-maroon">
        Skip to RSVP
      </a>
      <div className="grain-fixed" aria-hidden />
      <div className="vignette" aria-hidden />
      <ParticleField active={opened} />
      <ScrollProgress visible={opened} />
      <MusicToggle visible={opened} />
      <PointerFX />

      <main className="relative">
        <Ganesh opened={opened} />
        <Invitation />
        <Couple />
        <HastaMilap />
        <SaveTheDate />
        <Ceremonies />
        <Venue />
        <Blessings />
        <div id="rsvp">
          <RSVP />
        </div>
        <Closing />
      </main>
    </LazyMotion>
  )
}
