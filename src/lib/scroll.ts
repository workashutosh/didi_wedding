import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useLayoutEffect, type RefObject } from 'react'
import { reducedMotion } from './env'

gsap.registerPlugin(ScrollTrigger)
// mobile URL-bar show/hide must not re-layout pinned sections
ScrollTrigger.config({ ignoreMobileResize: true })
gsap.defaults({ ease: 'power3.out' })

export { gsap, ScrollTrigger }

let lenis: Lenis | null = null
export const getLenis = () => lenis

/** Lenis smooth wheel scrolling (touch stays native for best mobile feel). */
export function startSmoothScroll() {
  if (reducedMotion || lenis) return () => {}
  lenis = new Lenis({
    lerp: 0.14,
    smoothWheel: true,
    wheelMultiplier: 1,
  })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { duration: 2.4 })
  else window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
}

/** gsap.context bound to a section ref; reverted on unmount */
export function useGsap(scope: RefObject<HTMLElement | null>, fn: () => void, deps: unknown[] = []) {
  useLayoutEffect(() => {
    if (!scope.current) return
    const ctx = gsap.context(fn, scope.current)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** fire a global visual effect (handled by <ParticleField/>) */
export const fx = {
  burst(x: number, y: number, count = 40, gold = false) {
    window.dispatchEvent(new CustomEvent('fx:burst', { detail: { x, y, count, gold } }))
  },
  shower(count = 60) {
    window.dispatchEvent(new CustomEvent('fx:shower', { detail: { count } }))
  },
}
