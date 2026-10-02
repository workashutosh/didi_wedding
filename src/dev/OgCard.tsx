// Renders the 1200×630 link-preview card and the app icons (captured by scripts/generate-og.mjs)
import { createRoot } from 'react-dom/client'
import '../styles/fonts.css'
import '../styles/index.css'
import { wedding } from '../config/wedding'
import { Mandala } from '../components/art/Mandala'
import { Toran } from '../components/art/Toran'
import { Ganesha } from '../components/art/Ganesha'
import { Corner, Divider, Diya } from '../components/art/Ornaments'

const mode = new URLSearchParams(location.search).get('mode') ?? 'og'
const { bride, groom, weddingDate } = wedding

function Og() {
  return (
    <div className="silk relative h-[630px] w-[1200px] overflow-hidden">
      <div className="jaali absolute inset-0 opacity-70" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 70% at 50% 55%, rgba(244,163,0,.25), transparent 70%)' }} />
      <Mandala className="absolute left-1/2 top-1/2 w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-35" strokeWidth={0.5} />
      <div className="absolute inset-x-0 top-0"><Toran className="block h-auto w-full" width={1100} sway={false} /></div>
      <div className="absolute inset-[18px] border-2 border-gold/70" />
      <div className="absolute inset-[26px] border border-gold/40" />
      <Corner className="absolute bottom-[26px] left-[26px] w-24 -scale-y-100" />
      <Corner className="absolute bottom-[26px] right-[26px] w-24 -scale-100" />
      <Diya className="absolute bottom-10 left-24 w-16" />
      <Diya className="absolute bottom-10 right-24 w-16" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 text-center">
        <Ganesha className="w-20" />
        <p className="font-hindi text-2xl text-gold-light">॥ शुभ विवाह ॥</p>
        <h1 className="mt-1 font-script text-[132px] leading-[1.1]">
          <span className="gold-foil-static">{bride.first}</span>
          <span className="mx-5 font-serif text-[40px] italic text-gold-light align-middle">weds</span>
          <span className="gold-foil-static">{groom.first}</span>
        </h1>
        <Divider className="my-2 w-80" />
        <p className="font-display text-[30px] font-bold tracking-[0.12em] text-gold-light">{weddingDate.weekday} · 9 December 2026</p>
        <p className="mt-2 font-serif text-[22px] italic text-ivory/85">You are cordially invited</p>
      </div>
    </div>
  )
}

function Icon({ size }: { size: number }) {
  return (
    <div className="relative grid place-items-center overflow-hidden" style={{ width: size, height: size, background: 'radial-gradient(circle at 50% 40%, #8a1a2b, #5A0F1B 60%, #2E060D)' }}>
      <Mandala className="absolute inset-[-10%] opacity-50" strokeWidth={1.2} />
      <span className="relative font-script leading-none" style={{ fontSize: size * 0.42 }}>
        <span className="gold-foil-static">{bride.initial}</span>
        <span className="text-sindoor" style={{ fontSize: size * 0.2 }}>❤</span>
        <span className="gold-foil-static">{groom.initial}</span>
      </span>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(mode === 'og' ? <Og /> : <Icon size={Number(mode)} />)
