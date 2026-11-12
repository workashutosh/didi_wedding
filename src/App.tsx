import { useEffect } from 'react'
import Experience from './Experience'
import { music } from './lib/audio'

export default function App() {
  // Browsers only allow audio after the guest interacts with the page,
  // so the music starts softly on their first tap, click or key press.
  useEffect(() => {
    const start = () => {
      if (music.state.available && !music.state.playing) music.play()
      events.forEach((e) => window.removeEventListener(e, start))
    }
    const events = ['pointerdown', 'keydown'] as const
    events.forEach((e) => window.addEventListener(e, start, { once: true }))
    return () => events.forEach((e) => window.removeEventListener(e, start))
  }, [])

  return <Experience opened />
}
