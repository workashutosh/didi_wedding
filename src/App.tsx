import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Opening } from './sections/Opening'
import { music } from './lib/audio'
import { reducedMotion } from './lib/env'

// Everything behind the doors is a separate chunk: fetched when the browser is
// idle, and mounted once the doors have swung past 90° and the screen is filled
// with light — so the (compositor-driven) door swing is never disturbed.
const loadExperience = () => import('./Experience')
const Experience = lazy(loadExperience)

const whenIdle = (fn: () => void) => {
  const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback
  if (ric) ric(fn, { timeout: 2500 })
  else setTimeout(fn, 1200)
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [doorsGone, setDoorsGone] = useState(false)

  useEffect(() => {
    const prefetch = () => whenIdle(() => void loadExperience())
    if (document.readyState === 'complete') prefetch()
    else window.addEventListener('load', prefetch, { once: true })
    // any touch on the cover is a strong hint the guest is about to open it
    window.addEventListener('pointerdown', () => void loadExperience(), { once: true })
  }, [])

  // Called synchronously inside the tap → audio is user-initiated (iOS-safe)
  const handleOpen = useCallback(() => {
    music.play()
    document.documentElement.classList.remove('is-locked')
    setOpened(true)
    setTimeout(() => setMounted(true), reducedMotion ? 0 : 1250)
  }, [])

  return (
    <>
      {mounted && (
        <Suspense fallback={null}>
          <Experience opened={opened} />
        </Suspense>
      )}
      {!doorsGone && <Opening onOpen={handleOpen} onDone={() => setDoorsGone(true)} />}
    </>
  )
}
