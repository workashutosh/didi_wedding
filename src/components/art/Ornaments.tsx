import { memo } from 'react'
import { useIds, GoldLinear } from './geom'

type P = { className?: string; drawable?: boolean }
const dr = (on?: boolean) => (on ? { className: 'draw', pathLength: 1 } : {})

/* ───────────────────────── Diya ───────────────────────── */
export const Diya = memo(function Diya({ className = '', lit = true }: { className?: string; lit?: boolean }) {
  const id = useIds('db', 'df')
  return (
    <div className={`${/\b(absolute|fixed)\b/.test(className) ? '' : 'relative '}${className}`} style={{ aspectRatio: '60 / 72' }} aria-hidden>
      <div className="diya-light absolute inset-0" style={{ opacity: lit ? 1 : 0 }}>
        <div
          className="diya-glow absolute rounded-full"
          style={{ left: '-20%', top: '-14%', width: '140%', height: '100%', background: 'radial-gradient(closest-side, rgba(255,201,74,.7), rgba(244,163,0,.25) 45%, transparent)' }}
        />
        <div className="flame-html absolute" style={{ left: '35%', top: '12%', width: '30%', height: '40%' }}>
          <svg viewBox="21 9 18 29" className="block h-full w-full overflow-visible">
            <defs>
              <radialGradient id={id.df} cx=".5" cy=".75" r=".75">
                <stop offset="0" stopColor="#FFFBE6" />
                <stop offset=".35" stopColor="#FFD54A" />
                <stop offset=".75" stopColor="#F47A00" />
                <stop offset="1" stopColor="#B3122E" stopOpacity=".6" />
              </radialGradient>
            </defs>
            <path d="M30 10 C 34 19, 38 26, 35 33 C 33.5 37, 26.5 37, 25 33 C 22 26, 26 19, 30 10 Z" fill={`url(#${id.df})`} />
            <path d="M30 22 C 32 27, 32.5 31, 30 34 C 27.5 31, 28 27, 30 22 Z" fill="#FFFDF0" opacity=".85" />
          </svg>
        </div>
      </div>
      <svg viewBox="0 0 60 72" className="relative block h-full w-full">
        <defs>
          <linearGradient id={id.db} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F3D98B" />
            <stop offset=".45" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#7A5510" />
          </linearGradient>
        </defs>
        <path d="M30 34 V38" stroke="#5A0F1B" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5 40 C 8 55, 22 58, 30 58 C 38 58, 52 55, 55 40 C 46 44, 14 44, 5 40 Z" fill={`url(#${id.db})`} />
        <ellipse cx="30" cy="40" rx="25" ry="4" fill="#5A0F1B" stroke="#F3D98B" strokeWidth=".8" />
        <path d="M12 47 Q30 53 48 47" fill="none" stroke="#5A0F1B" strokeWidth=".8" strokeDasharray="1.5 2.5" />
        <path d="M22 57 L19 64 H41 L38 57" fill={`url(#${id.db})`} />
        <ellipse cx="30" cy="64.5" rx="13" ry="2.2" fill="#8C6A16" />
      </svg>
    </div>
  )
})

/* ───────────────────────── Kalash ───────────────────────── */
export const Kalash = memo(function Kalash({ className, drawable }: P) {
  const id = useIds('kg', 'kp', 'kl', 'kc')
  return (
    <svg viewBox="0 0 100 124" className={className} aria-hidden>
      <defs>
        <GoldLinear id={id.kg} x1={0} y1={0} x2={100} y2={124} bright />
        <linearGradient id={id.kp} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8C6A16" />
          <stop offset=".3" stopColor="#F3D98B" />
          <stop offset=".55" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#7A5510" />
        </linearGradient>
        <linearGradient id={id.kl} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5C9E44" />
          <stop offset="1" stopColor="#1F5326" />
        </linearGradient>
        <radialGradient id={id.kc} cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#C98A4B" />
          <stop offset="1" stopColor="#6B3F17" />
        </radialGradient>
      </defs>
      {/* mango leaves */}
      <g fill={`url(#${id.kl})`}>
        <path d="M50 46 C 34 40, 20 40, 8 50 C 22 52, 36 52, 50 46 Z" />
        <path d="M50 46 C 66 40, 80 40, 92 50 C 78 52, 64 52, 50 46 Z" />
        <path d="M50 44 C 38 34, 26 28, 14 32 C 24 40, 38 44, 50 44 Z" />
        <path d="M50 44 C 62 34, 74 28, 86 32 C 76 40, 62 44, 50 44 Z" />
      </g>
      {/* coconut */}
      <ellipse cx="50" cy="30" rx="12" ry="15" fill={`url(#${id.kc})`} />
      <path d="M50 15 C 46 10, 44 8, 40 7 M50 15 C 54 10, 56 8, 60 7 M50 15 V6" stroke="#6B3F17" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M41 36 Q50 40 59 36" stroke="#B3122E" strokeWidth="2" fill="none" />
      {/* pot */}
      <path d="M36 50 L64 50 L68 60 C 88 70, 90 102, 66 114 L34 114 C 10 102, 12 70, 32 60 Z" fill={`url(#${id.kp})`} />
      <ellipse cx="50" cy="50" rx="17" ry="3.5" fill="#D4AF37" stroke="#7A5510" strokeWidth=".8" />
      <g fill="none" stroke="#5A0F1B" strokeWidth="1" opacity=".8">
        <path d="M24 74 Q50 82 76 74" />
        <path d="M20 96 Q50 104 80 96" />
        <path d="M50 80 C 56 84, 56 92, 50 94 C 44 92, 44 84, 50 80 Z" fill="#B3122E" stroke="none" />
      </g>
      <g fill="#5A0F1B">
        {[30, 38, 46, 54, 62, 70].map((x) => (
          <circle key={x} cx={x} cy={x === 30 || x === 70 ? 84 : 87} r="1.1" />
        ))}
      </g>
      <path d="M34 114 L32 120 H68 L66 114" fill={`url(#${id.kp})`} />
      {drawable && (
        <path
          d="M36 50 L64 50 L68 60 C 88 70, 90 102, 66 114 L34 114 C 10 102, 12 70, 32 60 Z"
          fill="none"
          stroke={`url(#${id.kg})`}
          {...dr(true)}
        />
      )}
    </svg>
  )
})

/* ───────────────────────── Lotus ───────────────────────── */
export const Lotus = memo(function Lotus({ className }: { className?: string }) {
  const id = useIds('lp', 'lg')
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden>
      <defs>
        <linearGradient id={id.lp} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD1DA" />
          <stop offset=".6" stopColor="#E86A86" />
          <stop offset="1" stopColor="#B3122E" />
        </linearGradient>
        <GoldLinear id={id.lg} x1={0} y1={0} x2={120} y2={70} />
      </defs>
      <g stroke={`url(#${id.lg})`} strokeWidth=".8" fill={`url(#${id.lp})`}>
        <path d="M60 64 C 30 66, 8 56, 2 40 C 22 38, 44 48, 60 64 Z" />
        <path d="M60 64 C 90 66, 112 56, 118 40 C 98 38, 76 48, 60 64 Z" />
        <path d="M60 64 C 38 56, 24 38, 26 18 C 44 26, 56 42, 60 64 Z" />
        <path d="M60 64 C 82 56, 96 38, 94 18 C 76 26, 64 42, 60 64 Z" />
        <path d="M60 64 C 46 48, 46 22, 60 4 C 74 22, 74 48, 60 64 Z" />
      </g>
    </svg>
  )
})

/* ───────────────────────── Divider ───────────────────────── */
export const Divider = memo(function Divider({ className, drawable }: P) {
  const id = useIds('dvg')
  const g = `url(#${id.dvg})`
  return (
    <svg viewBox="0 0 300 28" className={className} aria-hidden>
      <defs>
        <GoldLinear id={id.dvg} x1={0} y1={0} x2={300} y2={0} bright />
      </defs>
      <g fill="none" stroke={g} strokeWidth="1" strokeLinecap="round">
        <path d="M10 14 H112" {...dr(drawable)} />
        <path d="M188 14 H290" {...dr(drawable)} />
        <path d="M112 14 C 118 4, 128 4, 130 10 C 131 14, 126 16, 124 13" {...dr(drawable)} />
        <path d="M188 14 C 182 4, 172 4, 170 10 C 169 14, 174 16, 176 13" {...dr(drawable)} />
        <path d="M112 14 C 118 24, 128 24, 130 18 C 131 14, 126 12, 124 15" {...dr(drawable)} />
        <path d="M188 14 C 182 24, 172 24, 170 18 C 169 14, 174 12, 176 15" {...dr(drawable)} />
      </g>
      <g fill={g}>
        <path d="M150 2 L158 14 L150 26 L142 14 Z" />
        <circle cx="137" cy="14" r="2" />
        <circle cx="163" cy="14" r="2" />
        <circle cx="6" cy="14" r="1.6" />
        <circle cx="294" cy="14" r="1.6" />
      </g>
      <path d="M150 7 L154 14 L150 21 L146 14 Z" fill="#B3122E" />
    </svg>
  )
})

/* ───────────────────────── Corner flourish (top-left) ───────────────────────── */
export const Corner = memo(function Corner({ className, drawable }: P) {
  const id = useIds('cg')
  const g = `url(#${id.cg})`
  return (
    <svg viewBox="0 0 90 90" className={className} aria-hidden>
      <defs>
        <GoldLinear id={id.cg} x1={0} y1={0} x2={90} y2={90} bright />
      </defs>
      <g fill="none" stroke={g} strokeWidth="1.1" strokeLinecap="round">
        <path d="M4 86 V4 H86" {...dr(drawable)} />
        <path d="M10 80 V10 H80" strokeWidth=".6" {...dr(drawable)} />
        <path d="M10 46 C 26 46, 30 30, 22 22 C 16 16, 8 22, 12 28 C 15 32, 20 30, 20 26" {...dr(drawable)} />
        <path d="M46 10 C 46 26, 30 30, 22 22" {...dr(drawable)} />
        <path d="M22 22 C 34 34, 40 50, 36 62 M22 22 C 34 34, 50 40, 62 36" {...dr(drawable)} />
      </g>
      <g fill={g}>
        <circle cx="4" cy="4" r="3" />
        <path d="M36 62 c -3 4 -2 8 0 10 c 2 -2 3 -6 0 -10z M62 36 c 4 -3 8 -2 10 0 c -2 2 -6 3 -10 0z" />
      </g>
    </svg>
  )
})

/* ───────────────────────── Paisley ───────────────────────── */
export const Paisley = memo(function Paisley({ className }: { className?: string }) {
  const id = useIds('pg')
  const g = `url(#${id.pg})`
  return (
    <svg viewBox="0 0 60 90" className={className} aria-hidden>
      <defs>
        <GoldLinear id={id.pg} x1={0} y1={0} x2={60} y2={90} bright />
      </defs>
      <g fill="none" stroke={g} strokeWidth="1.2" strokeLinecap="round">
        <path d="M30 86 C 6 80, 2 50, 16 32 C 26 20, 40 18, 46 8 C 50 22, 56 36, 54 54 C 52 74, 44 86, 30 86 Z" />
        <path d="M30 76 C 14 72, 12 52, 22 40 C 30 32, 40 30, 44 24 C 46 36, 48 46, 46 58 C 44 70, 38 76, 30 76 Z" />
        <circle cx="32" cy="58" r="7" />
      </g>
      <circle cx="32" cy="58" r="2.5" fill="#B3122E" />
      <g fill={g}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const a = (i / 6) * Math.PI * 1.4 + 2.2
          return <circle key={i} cx={30 + Math.cos(a) * 27} cy={52 + Math.sin(a) * 30} r="1.3" />
        })}
      </g>
    </svg>
  )
})

/* ───────────────────────── Map pin ───────────────────────── */
export const MapPin = memo(function MapPin({ className }: { className?: string }) {
  const id = useIds('mpg', 'mpr')
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden>
      <defs>
        <GoldLinear id={id.mpg} x1={0} y1={0} x2={60} y2={80} bright />
        <radialGradient id={id.mpr} cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#E0304F" />
          <stop offset="1" stopColor="#7A0A1E" />
        </radialGradient>
      </defs>
      <path
        d="M30 78 C 22 62, 4 46, 4 28 C 4 13, 16 2, 30 2 C 44 2, 56 13, 56 28 C 56 46, 38 62, 30 78 Z"
        fill={`url(#${id.mpr})`}
        stroke={`url(#${id.mpg})`}
        strokeWidth="2.5"
      />
      <circle cx="30" cy="28" r="15" fill="#FFF8E7" stroke={`url(#${id.mpg})`} strokeWidth="1.5" />
      <g fill="#B3122E" stroke="#D4AF37" strokeWidth=".5">
        <path d="M30 37 C 26 33, 26 24, 30 19 C 34 24, 34 33, 30 37 Z" />
        <path d="M30 37 C 24 36, 20 31, 20 27 C 25 27, 29 31, 30 37 Z" />
        <path d="M30 37 C 36 36, 40 31, 40 27 C 35 27, 31 31, 30 37 Z" />
      </g>
    </svg>
  )
})

/* ───────────────────────── Wax seal ───────────────────────── */
export const WaxSeal = memo(function WaxSeal({ className, a, b }: { className?: string; a: string; b: string }) {
  const id = useIds('ws', 'wg')
  const blob = Array.from({ length: 36 }, (_, i) => {
    const t = (i / 36) * Math.PI * 2
    const r = 56 + Math.sin(t * 5) * 1.8 + Math.sin(t * 11 + 1) * 1.4 + Math.sin(t * 3 + 2) * 1.2
    return `${i ? 'L' : 'M'}${(60 + Math.cos(t) * r).toFixed(1)} ${(60 + Math.sin(t) * r).toFixed(1)}`
  }).join(' ')
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <radialGradient id={id.ws} cx=".38" cy=".32" r=".75">
          <stop offset="0" stopColor="#E3364F" />
          <stop offset=".55" stopColor="#B3122E" />
          <stop offset="1" stopColor="#6E0718" />
        </radialGradient>
        <GoldLinear id={id.wg} x1={20} y1={20} x2={100} y2={100} bright />
      </defs>
      <path d={blob + 'Z'} fill={`url(#${id.ws})`} />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#6E0718" strokeWidth="3" opacity=".6" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#F06A80" strokeWidth=".8" opacity=".5" />
      <circle cx="60" cy="60" r="38" fill="none" stroke={`url(#${id.wg})`} strokeWidth=".8" strokeDasharray="1 2.2" />
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontStyle="italic"
        fontSize="34"
        fill={`url(#${id.wg})`}
        stroke="#6E0718"
        strokeWidth=".4"
      >
        {a}
        <tspan fontSize="16" dy="-10" fontFamily="serif">
          {' ♥ '}
        </tspan>
        <tspan dy="10">{b}</tspan>
      </text>
    </svg>
  )
})
