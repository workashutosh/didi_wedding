import { memo } from 'react'
import { useIds } from './geom'

/**
 * Vivah mandap on the lawns at golden hour: carved sandstone pillars, chhajja,
 * domed chhatri canopy with kalash, marigold swags & strands, flowers on the
 * cornice, red-carpeted platform with havan kund, banana plants and flower beds.
 * Parts carry classes (.md-*) so the scene can be assembled on scroll.
 * viewBox 0 0 400 330.
 */

const rnd = (i: number) => {
  const x = Math.sin(i * 91.3 + 7.1) * 43758.5453
  return x - Math.floor(x)
}
const FLOWER = ['#F4A300', '#FFC93C', '#E8455F', '#F47A00', '#FF8FA3', '#FFD36B']

/** carved pillar centred on x, from top y0 to base y1 */
function Pillar({ x, y0, y1, w, wood, dark }: { x: number; y0: number; y1: number; w: number; wood: string; dark: string }) {
  const h = y1 - y0
  const rings = [0.22, 0.5, 0.78]
  return (
    <g>
      {/* capital bracket */}
      <path d={`M${x - w * 1.1} ${y0} H${x + w * 1.1} L${x + w * 0.62} ${y0 + 10} H${x - w * 0.62} Z`} fill={wood} stroke={dark} strokeWidth=".6" />
      {/* shaft */}
      <rect x={x - w / 2} y={y0 + 10} width={w} height={h - 26} fill={wood} stroke={dark} strokeWidth=".6" />
      <rect x={x - w / 2 + w * 0.32} y={y0 + 12} width={w * 0.14} height={h - 30} fill="#fff3d6" opacity=".35" />
      {rings.map((t) => {
        const y = y0 + 10 + (h - 26) * t
        return (
          <g key={t}>
            <rect x={x - w * 0.7} y={y - 3} width={w * 1.4} height={6} rx="2" fill={wood} stroke={dark} strokeWidth=".6" />
            <path d={`M${x - w * 0.7} ${y} H${x + w * 0.7}`} stroke="#D4AF37" strokeWidth=".8" />
          </g>
        )
      })}
      {/* vase-shaped base */}
      <path d={`M${x - w / 2} ${y1 - 16} C ${x - w} ${y1 - 12}, ${x - w} ${y1 - 6}, ${x - w * 0.9} ${y1} H${x + w * 0.9} C ${x + w} ${y1 - 6}, ${x + w} ${y1 - 12}, ${x + w / 2} ${y1 - 16} Z`} fill={wood} stroke={dark} strokeWidth=".6" />
    </g>
  )
}

function BananaPlant({ x, flip = false }: { x: number; flip?: boolean }) {
  const s = flip ? -1 : 1
  const leaf = (ang: number, len: number, i: number) => {
    const a = (ang * Math.PI) / 180
    const ex = x + Math.cos(a) * len * s
    const ey = 250 - Math.sin(a) * len + (ang < 50 || ang > 130 ? 14 : 0) // outer leaves droop
    const mx = x + Math.cos(a) * len * 0.5 * s
    const my = 250 - Math.sin(a) * len * 0.5
    const nx = -Math.sin(a) * 17 * s
    const ny = -Math.cos(a) * 17
    return (
      <g key={i}>
        <path d={`M${x} 250 Q ${mx + nx} ${my + ny}, ${ex} ${ey} Q ${mx - nx * 0.4} ${my - ny * 0.4}, ${x} 250 Z`} fill={i % 2 ? '#4f8f3a' : '#3f7a2e'} />
        <path d={`M${x} 250 Q ${mx} ${my}, ${ex} ${ey}`} fill="none" stroke="#b9d98a" strokeWidth="1" />
        <path d={`M${x} 250 Q ${mx + nx * 0.5} ${my + ny * 0.5}, ${ex} ${ey}`} fill="none" stroke="#2f6324" strokeWidth=".5" strokeDasharray="1 3" opacity=".6" />
      </g>
    )
  }
  return (
    <g className="md-plant">
      <path d={`M${x - 6} 300 L${x - 4} 250 L${x + 4} 250 L${x + 6} 300 Z`} fill="#7d9a45" />
      <path d={`M${x - 2} 298 L${x - 1} 252`} stroke="#a8c070" strokeWidth="1" />
      {[
        [36, 58],
        [146, 58],
        [66, 70],
        [116, 70],
        [92, 80],
      ].map(([ang, len], i) => leaf(ang, len, i))}
    </g>
  )
}

export const Mandap = memo(function Mandap({ className }: { className?: string }) {
  const id = useIds('mw', 'mwd', 'mdome', 'mcarp', 'mlawn', 'mfire', 'mhill', 'mglow')
  const wood = `url(#${id.mw})`
  const woodD = `url(#${id.mwd})`
  const dark = '#6b3313'

  // marigold swag between two x positions under the beam
  const swag = (x0: number, x1: number, y: number, depth: number, k: number) =>
    Array.from({ length: 11 }, (_, i) => {
      const t = i / 10
      return (
        <circle
          key={`${k}-${i}`}
          cx={x0 + (x1 - x0) * t}
          cy={y + Math.sin(Math.PI * t) * depth}
          r="3.1"
          fill={i % 3 === 1 ? '#E8455F' : i % 2 ? '#FFC93C' : '#F4A300'}
        />
      )
    })
  const strand = (x: number, y0: number, n: number, k: number) =>
    Array.from({ length: n }, (_, i) => (
      <circle key={`${k}-${i}`} cx={x} cy={y0 + i * 6.2} r="2.9" fill={i % 4 === 3 ? '#E8455F' : i % 2 ? '#FFC93C' : '#F4A300'} />
    ))

  return (
    <svg viewBox="0 0 400 330" className={className} aria-hidden preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={id.mw} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9a4f22" />
          <stop offset=".45" stopColor="#d98e4f" />
          <stop offset=".6" stopColor="#e8a565" />
          <stop offset="1" stopColor="#8f4519" />
        </linearGradient>
        <linearGradient id={id.mwd} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c47a3e" />
          <stop offset="1" stopColor="#8a4318" />
        </linearGradient>
        <linearGradient id={id.mdome} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a2582a" />
          <stop offset=".4" stopColor="#efb173" />
          <stop offset=".55" stopColor="#f6c48a" />
          <stop offset="1" stopColor="#9a4f22" />
        </linearGradient>
        <linearGradient id={id.mcarp} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8203c" />
          <stop offset="1" stopColor="#8e0b22" />
        </linearGradient>
        <linearGradient id={id.mlawn} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fa64e" />
          <stop offset="1" stopColor="#4b7a2e" />
        </linearGradient>
        <linearGradient id={id.mhill} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8aa77a" />
          <stop offset="1" stopColor="#6f8f5c" />
        </linearGradient>
        <radialGradient id={id.mfire} cx=".5" cy=".8" r=".8">
          <stop offset="0" stopColor="#FFF6C8" />
          <stop offset=".4" stopColor="#FFC93C" />
          <stop offset="1" stopColor="#F47A00" />
        </radialGradient>
        <radialGradient id={id.mglow} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FFE3A0" stopOpacity=".7" />
          <stop offset="1" stopColor="#FFE3A0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* distant tree line + lawn */}
      <g className="md-land">
        <path d="M0 236 C 30 222, 52 230, 74 220 C 96 210, 118 226, 140 218 C 170 208, 200 222, 232 214 C 262 206, 290 224, 318 216 C 346 208, 372 222, 400 214 V260 H0 Z" fill={`url(#${id.mhill})`} opacity=".85" />
        <path d="M0 258 H400 V330 H0 Z" fill={`url(#${id.mlawn})`} />
      </g>

      <BananaPlant x={36} />
      <BananaPlant x={364} flip />

      {/* platform with red carpet */}
      <g className="md-base">
        <path d="M58 300 H342 L352 318 H48 Z" fill={woodD} stroke={dark} strokeWidth=".6" />
        <path d="M48 318 H352 V326 H48 Z" fill="#7a3a14" />
        <path d="M70 288 H330 L342 300 H58 Z" fill={`url(#${id.mcarp})`} />
        <path d="M74 291 H326" stroke="#D4AF37" strokeWidth=".8" strokeDasharray="3 2" />
        {/* rangoli circle on carpet */}
        <ellipse cx="200" cy="295" rx="34" ry="4.5" fill="none" stroke="#FFC93C" strokeWidth="1" />
      </g>

      {/* back pillars (smaller, darker) */}
      <g className="md-pillars-back" opacity=".85">
        <Pillar x={146} y0={136} y1={290} w={11} wood={woodD} dark={dark} />
        <Pillar x={254} y0={136} y1={290} w={11} wood={woodD} dark={dark} />
      </g>

      {/* havan kund + sacred fire */}
      <g className="md-fire">
        <ellipse cx="200" cy="272" rx="40" ry="16" fill={`url(#${id.mglow})`} />
        <path d="M184 278 H216 L212 286 H188 Z" fill="#a85a26" stroke={dark} strokeWidth=".6" />
        <path d="M188 272 H212 L210 278 H190 Z" fill="#c47a3e" stroke={dark} strokeWidth=".6" />
        <path className="md-flame" d="M200 248 C 206 258, 210 264, 206 271 C 204 274, 196 274, 194 271 C 190 264, 194 258, 200 248 Z" fill={`url(#${id.mfire})`} />
        {/* two seats */}
        <rect x="160" y="276" width="18" height="8" rx="2" fill="#B3122E" stroke="#D4AF37" strokeWidth=".6" />
        <rect x="222" y="276" width="18" height="8" rx="2" fill="#B3122E" stroke="#D4AF37" strokeWidth=".6" />
      </g>

      {/* front pillars */}
      <g className="md-pillars">
        <Pillar x={88} y0={130} y1={292} w={16} wood={wood} dark={dark} />
        <Pillar x={312} y0={130} y1={292} w={16} wood={wood} dark={dark} />
      </g>

      {/* beam + chhajja + carved frieze */}
      <g className="md-roof">
        <path d="M60 118 H340 L352 130 H48 Z" fill={woodD} stroke={dark} strokeWidth=".6" />
        <rect x="66" y="104" width="268" height="14" fill={wood} stroke={dark} strokeWidth=".6" />
        <g fill="none" stroke="#6b3313" strokeWidth=".7">
          {Array.from({ length: 22 }, (_, i) => (
            <path key={i} d={`M${70 + i * 12} 116 V110 C ${70 + i * 12} 106, ${76 + i * 12} 106, ${76 + i * 12} 110 V116`} />
          ))}
        </g>
        <path d="M66 104 H334" stroke="#D4AF37" strokeWidth="1" />
        {/* upper cornice */}
        <path d="M80 104 H320 L330 96 H70 Z" fill={woodD} stroke={dark} strokeWidth=".6" />
        {/* drum */}
        <rect x="128" y="80" width="144" height="16" fill={wood} stroke={dark} strokeWidth=".6" />
        <g fill="#6b3313">
          {Array.from({ length: 11 }, (_, i) => (
            <rect key={i} x={133 + i * 12.5} y="84" width="5" height="9" rx="2.5" />
          ))}
        </g>
        <path d="M120 80 H280 L272 74 H128 Z" fill={woodD} stroke={dark} strokeWidth=".6" />
        {/* dome */}
        <path d="M136 74 C 132 52, 160 36, 184 30 C 192 26, 196 20, 200 12 C 204 20, 208 26, 216 30 C 240 36, 268 52, 264 74 Z" fill={`url(#${id.mdome})`} stroke={dark} strokeWidth=".7" />
        <g fill="none" stroke="#8a4318" strokeWidth=".7" opacity=".7">
          <path d="M150 74 C 150 56, 172 42, 200 36 C 228 42, 250 56, 250 74" />
          <path d="M170 74 C 172 58, 186 46, 200 42 C 214 46, 228 58, 230 74" />
          <path d="M200 14 V74" />
        </g>
        {/* kalash finial */}
        <path d="M195 12 C 193 6, 207 6, 205 12 Z M197 6 C 197 2, 203 2, 203 6 Z" fill="#D4AF37" />
        <circle cx="200" cy="0.5" r="2" fill="#D4AF37" />
        {/* corner mini-chhatris */}
        {[78, 322].map((cx) => (
          <g key={cx}>
            <rect x={cx - 9} y="88" width="18" height="8" fill={wood} stroke={dark} strokeWidth=".5" />
            <path d={`M${cx - 11} 88 C ${cx - 11} 78, ${cx} 72, ${cx} 66 C ${cx} 72, ${cx + 11} 78, ${cx + 11} 88 Z`} fill={`url(#${id.mdome})`} stroke={dark} strokeWidth=".5" />
            <circle cx={cx} cy="64" r="1.8" fill="#D4AF37" />
          </g>
        ))}
      </g>

      {/* flowers along the cornice */}
      <g className="md-flowers">
        {Array.from({ length: 34 }, (_, i) => {
          const x = 52 + i * 8.9
          return <circle key={i} cx={x} cy={128 - rnd(i) * 3} r={3.6 + rnd(i + 3) * 1.6} fill={FLOWER[i % FLOWER.length]} />
        })}
        {Array.from({ length: 16 }, (_, i) => (
          <circle key={`d${i}`} cx={132 + i * 9.1} cy={77 - rnd(i + 40) * 2} r={3 + rnd(i + 9) * 1.2} fill={FLOWER[(i + 2) % FLOWER.length]} />
        ))}
      </g>

      {/* marigold swags & hanging strands */}
      <g className="md-garlands">
        {swag(96, 200, 132, 18, 1)}
        {swag(200, 304, 132, 18, 2)}
        {strand(96, 134, 22, 3)}
        {strand(304, 134, 22, 4)}
        {strand(146, 140, 14, 5)}
        {strand(254, 140, 14, 6)}
        <circle cx="200" cy="134" r="5" fill="#B3122E" stroke="#D4AF37" strokeWidth=".8" />
      </g>

      {/* flower beds in front */}
      <g className="md-beds">
        {Array.from({ length: 30 }, (_, i) => {
          const x = 4 + i * 13.5 + rnd(i + 70) * 5
          const y = 318 + rnd(i + 90) * 9
          if (x > 44 && x < 356 && y < 327) return null
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={5 + rnd(i) * 2} fill={FLOWER[(i * 5) % FLOWER.length]} />
              <circle cx={x} cy={y} r="1.6" fill="#8a3d00" opacity=".6" />
            </g>
          )
        })}
      </g>
    </svg>
  )
})
