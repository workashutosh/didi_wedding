import { memo } from 'react'
import { useIds } from './geom'

/**
 * Nagara-style Hindu temple at night (front view): curvilinear shikhara with
 * amalaka, kalash and saffron flag, flanking urushringa towers, two mandapas
 * with stepped roofs, a lit garbhagriha doorway and a row of diyas on the plinth.
 * viewBox 0 -24 400 194 (ground at y≈150).
 */

const r = (n: number) => Math.round(n * 10) / 10

/** curvilinear tower between baseY and topY, half-widths wBase → wTop, centred on cx */
function shikhara(cx: number, baseY: number, topY: number, wBase: number, wTop: number) {
  // convex 'beehive' profile: stays wide, then curves in towards the amalaka
  const L = (t: number) => cx - (wTop + (wBase - wTop) * Math.pow(1 - Math.pow(t, 2.1), 0.75))
  const yAt = (t: number) => baseY - (baseY - topY) * t
  const pts = Array.from({ length: 9 }, (_, i) => i / 8)
  const left = pts.map((t) => `${r(L(t))} ${r(yAt(t))}`)
  const right = pts
    .slice()
    .reverse()
    .map((t) => `${r(2 * cx - L(t))} ${r(yAt(t))}`)
  const outline = `M${left.join(' L')} Q ${cx} ${topY - (wTop * 0.6)}, ${right.join(' L')} Z`
  // horizontal tiers (bhumi) + vertical ribs
  const tiers = Array.from({ length: 6 }, (_, i) => {
    const t = (i + 1) / 7
    return `M${r(L(t))} ${r(yAt(t))} H${r(2 * cx - L(t))}`
  }).join('')
  const ribs = [0.33, 0.66].map((f) => {
    const a = pts.map((t) => `${r(L(t) + (cx - L(t)) * f)} ${r(yAt(t))}`)
    const b = pts.map((t) => `${r(2 * cx - L(t) - (cx - L(t)) * f)} ${r(yAt(t))}`)
    return `M${a.join(' L')} M${b.join(' L')}`
  }).join('')
  return { outline, detail: tiers + ribs }
}

const MAIN = shikhara(200, 98, 20, 34, 11)
const SIDE_L = shikhara(160, 104, 52, 18, 6)
const SIDE_R = shikhara(240, 104, 52, 18, 6)

/** stepped pyramidal mandapa roof */
const roof = (x0: number, x1: number, base: number) => {
  const w = x1 - x0
  let d = ''
  for (let i = 0; i < 4; i++) {
    const inset = (w * 0.1) * i
    const y = base - i * 7
    d += `M${r(x0 + inset - 3)} ${y} L${r(x1 - inset + 3)} ${y} L${r(x1 - inset - 3)} ${y - 7} L${r(x0 + inset + 3)} ${y - 7} Z`
  }
  return d
}

const arch = (x: number, y: number, w: number, h: number) =>
  `M${x} ${y + h} V${y + w * 0.55} C ${x} ${y + 1}, ${x + w / 2} ${y - 2}, ${x + w / 2} ${y - 3} C ${x + w / 2} ${y - 2}, ${x + w} ${y + 1}, ${x + w} ${y + w * 0.55} V${y + h} Z`

export const Temple = memo(function Temple({ className }: { className?: string }) {
  const id = useIds('tf', 'tl', 'tg')
  const fill = `url(#${id.tf})`
  const line = '#D4AF37'
  return (
    <svg viewBox="0 -24 400 194" className={className} aria-hidden preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={id.tf} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#123a38" />
          <stop offset="1" stopColor="#061a19" />
        </linearGradient>
        <radialGradient id={id.tl} cx=".5" cy=".7" r=".7">
          <stop offset="0" stopColor="#FFE9A8" />
          <stop offset=".5" stopColor="#F4A300" />
          <stop offset="1" stopColor="#C46A00" />
        </radialGradient>
        <radialGradient id={id.tg} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FFC94A" stopOpacity=".55" />
          <stop offset="1" stopColor="#FFC94A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground */}
      <rect x="0" y="150" width="400" height="20" fill="#041312" />

      <g fill={fill} stroke={line} strokeOpacity=".45" strokeWidth=".7" strokeLinejoin="round">
        {/* corner chhatris */}
        {[40, 360].map((cx) => (
          <g key={cx}>
            <rect x={cx - 9} y="112" width="18" height="38" />
            <path d={`M${cx - 13} 112 H${cx + 13} L${cx + 10} 106 H${cx - 10} Z`} />
            <path d={`M${cx - 10} 106 C ${cx - 10} 94, ${cx} 90, ${cx} 84 C ${cx} 90, ${cx + 10} 94, ${cx + 10} 106 Z`} />
          </g>
        ))}
        {/* plinth (jagati) + steps */}
        <path d="M54 136 H346 V150 H54 Z" />
        <path d="M182 136 H218 L224 150 H176 Z" />
        {/* mandapas */}
        <rect x="76" y="108" width="80" height="28" />
        <rect x="244" y="108" width="80" height="28" />
        <path d={roof(76, 156, 108)} />
        <path d={roof(244, 324, 108)} />
        {/* side towers, then main shikhara */}
        <path d={SIDE_L.outline} />
        <path d={SIDE_R.outline} />
        <rect x="164" y="98" width="72" height="38" />
        <path d={MAIN.outline} />
      </g>

      {/* tower detailing */}
      <g fill="none" stroke={line} strokeOpacity=".2" strokeWidth=".55">
        <path d={MAIN.detail} />
        <path d={SIDE_L.detail} />
        <path d={SIDE_R.detail} />
        {/* mandapa pillars */}
        {[84, 100, 116, 132, 148, 252, 268, 284, 300, 316].map((x) => (
          <path key={x} d={`M${x} 112 V136`} />
        ))}
      </g>

      {/* amalaka, kalash, flag */}
      <ellipse cx="200" cy="17" rx="15" ry="4.5" fill="#123a38" stroke={line} strokeWidth=".9" />
      <path d="M194 12 C 194 6, 206 6, 206 12 Z" fill={line} />
      <path d="M197 6 C 197 2, 203 2, 203 6 Z M200 2 V-4" fill={line} stroke={line} strokeWidth=".8" />
      <path d="M200 -4 V-22" stroke={line} strokeWidth="1" />
      <path d="M200 -22 C 210 -20, 214 -16, 222 -17 C 214 -12, 208 -14, 200 -12 Z" fill="#F47A00" />
      {/* mini kalash on side towers & mandapas */}
      <g fill={line}>
        <path d="M156 50 C 156 46, 164 46, 164 50 Z M236 50 C 236 46, 244 46, 244 50 Z" />
        <circle cx="116" cy="81" r="2.6" />
        <circle cx="284" cy="81" r="2.6" />
        <circle cx="40" cy="83" r="1.8" />
        <circle cx="360" cy="83" r="1.8" />
      </g>

      {/* lit garbhagriha door + glow */}
      <ellipse cx="200" cy="124" rx="34" ry="22" fill={`url(#${id.tg})`} />
      <path d={arch(188, 108, 24, 28)} fill={`url(#${id.tl})`} />
      <path d={arch(184, 104, 32, 32)} fill="none" stroke={line} strokeWidth=".9" />
      {/* toran over the door */}
      <path d="M182 104 Q 191 110, 200 104 Q 209 110, 218 104" fill="none" stroke="#F4A300" strokeWidth="2" strokeDasharray="1.6 1.4" />

      {/* lit mandapa windows */}
      <g fill={`url(#${id.tl})`}>
        {[90, 110, 130, 258, 278, 298].map((x) => (
          <path key={x} d={arch(x, 116, 10, 12)} opacity={x === 110 || x === 278 ? 0.65 : 1} />
        ))}
      </g>

      {/* diyas along the plinth */}
      <g>
        {Array.from({ length: 13 }, (_, i) => 66 + i * 22.3).filter((x) => x < 172 || x > 228).map((x) => (
          <g key={x}>
            <circle cx={x} cy="134" r="5" fill={`url(#${id.tg})`} />
            <path d={`M${x} 129.5 c 1.6 2 1.8 3.4 0 4.6 c -1.8 -1.2 -1.6 -2.6 0 -4.6 z`} fill="#FFD54A" />
            <path d={`M${x - 3} 135 h6 l-1 1.6 h-4 z`} fill={line} />
          </g>
        ))}
      </g>
    </svg>
  )
})
