import { memo } from 'react'
import { useIds } from './geom'

/**
 * Marigold + mango-leaf toran (door garland).
 * The rope, swags and top row are one SVG; each hanging strand is its own
 * small SVG inside an HTML wrapper, so the sway animation runs on the GPU
 * compositor instead of repainting SVG every frame.
 */

interface Props {
  className?: string
  /** viewBox width — wider = more strands (defaults to fit the screen) */
  width?: number
  strands?: number
  sway?: boolean
}

const H = 150
const STRAND_W = 26

const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/** viewBox width so marigolds stay ~the same physical size on any screen */
const autoWidth = () => {
  const w = typeof window === 'undefined' ? 400 : window.innerWidth
  return Math.max(400, Math.round(w / (w < 640 ? 0.95 : 1.15)))
}

export const Toran = memo(function Toran({ className = '', width = autoWidth(), strands, sway = true }: Props) {
  strands ??= Math.max(7, Math.round(width / 46) | 1)
  const id = useIds('mo', 'my', 'lf', 'mari', 'mariY', 'leaf', 'bell')
  const gap = width / (strands - 1)
  const topFlowers = Math.round(width / 9)
  const swagStarts = Array.from({ length: strands - 1 }, (_, i) => i * gap)
  const strandXs = swagStarts.concat(width)

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${width} / ${H}` }} aria-hidden>
      <svg viewBox={`0 0 ${width} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <radialGradient id={id.mo} cx=".42" cy=".38" r=".7">
            <stop offset="0" stopColor="#FFD36B" />
            <stop offset=".55" stopColor="#F4A300" />
            <stop offset="1" stopColor="#C46A00" />
          </radialGradient>
          <radialGradient id={id.my} cx=".42" cy=".38" r=".7">
            <stop offset="0" stopColor="#FFF0A0" />
            <stop offset=".55" stopColor="#FFC93C" />
            <stop offset="1" stopColor="#D08A00" />
          </radialGradient>
          <linearGradient id={id.lf} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4F8F3A" />
            <stop offset="1" stopColor="#1F5326" />
          </linearGradient>
          <g id={id.mari}>
            <circle r="6.2" fill={`url(#${id.mo})`} />
            <circle r="5.6" fill="none" stroke="#B85C00" strokeWidth="1.6" strokeDasharray="1.1 1.3" opacity=".75" />
            <circle r="3.3" fill="none" stroke="#FFE08A" strokeWidth=".8" strokeDasharray=".8 1.2" opacity=".8" />
            <circle r="1.4" fill="#A0520A" />
          </g>
          <g id={id.mariY}>
            <circle r="5.6" fill={`url(#${id.my})`} />
            <circle r="5" fill="none" stroke="#C88400" strokeWidth="1.4" strokeDasharray="1 1.2" opacity=".75" />
            <circle r="1.3" fill="#B06A00" />
          </g>
          <g id={id.leaf}>
            <path d="M0 0 C 7 6, 8 18, 0 30 C -8 18, -7 6, 0 0 Z" fill={`url(#${id.lf})`} />
            <path d="M0 2 L 0 27" stroke="#A9CF7F" strokeWidth=".7" opacity=".7" />
          </g>
          <g id={id.bell}>
            <path d="M0 0 L0 4" stroke="#D4AF37" strokeWidth="1" />
            <path d="M-6 14 C -6 6, -3 4, 0 4 C 3 4, 6 6, 6 14 Z" fill="#D4AF37" stroke="#8C6A16" strokeWidth=".6" />
            <circle cy="15.5" r="1.6" fill="#8C6A16" />
          </g>
        </defs>

        <path d={`M0 8 H${width}`} stroke="#8C6A16" strokeWidth="1.4" />

        {/* swags between strands */}
        {swagStarts.map((x, i) => {
          const n = Math.max(5, Math.round(gap / 10))
          return (
            <g key={`s${i}`}>
              {[1, 2, 3].map((k) => {
                const t = k / 4
                return (
                  <use
                    key={k}
                    href={`#${id.leaf}`}
                    transform={`translate(${x + gap * t} ${10 + Math.sin(Math.PI * t) * 22}) rotate(${(t - 0.5) * -40}) scale(.7)`}
                  />
                )
              })}
              {Array.from({ length: n + 1 }, (_, k) => {
                const t = k / n
                return <use key={k} href={`#${k % 3 === 1 ? id.mariY : id.mari}`} x={x + gap * t} y={10 + Math.sin(Math.PI * t) * 26} />
              })}
            </g>
          )
        })}
      </svg>

      {/* hanging strands — HTML wrappers so the sway is composited */}
      {strandXs.map((x, i) => {
        const len = i % 2 === 0 ? 6 : 4
        const h = 30 + len * 11
        return (
          <div
            key={`h${i}`}
            className={sway ? 'sway-html' : undefined}
            style={{
              position: 'absolute',
              left: `${((x - STRAND_W / 2) / width) * 100}%`,
              top: `${(4 / H) * 100}%`,
              width: `${(STRAND_W / width) * 100}%`,
              height: `${(h / H) * 100}%`,
              animationDelay: sway ? `${-rnd(i) * 4}s` : undefined,
              animationDuration: sway ? `${4 + rnd(i + 9) * 2}s` : undefined,
            }}
          >
            <svg viewBox={`${-STRAND_W / 2} 4 ${STRAND_W} ${h}`} className="block h-full w-full overflow-visible">
              <path d={`M0 4 V${12 + len * 11}`} stroke="#8C6A16" strokeWidth=".8" />
              {Array.from({ length: len }, (_, k) => (
                <use key={k} href={`#${(k + i) % 2 ? id.mariY : id.mari}`} x={0} y={14 + k * 11} />
              ))}
              <use href={`#${id.leaf}`} transform={`translate(-2 ${10 + len * 11}) rotate(18) scale(.6)`} />
              <use href={`#${id.leaf}`} transform={`translate(2 ${10 + len * 11}) rotate(-18) scale(.6)`} />
              <use href={`#${id.bell}`} x={0} y={12 + len * 11} />
            </svg>
          </div>
        )
      })}

      {/* dense top row on top of everything */}
      <svg viewBox={`0 0 ${width} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        {Array.from({ length: topFlowers + 1 }, (_, k) => (
          <use key={`t${k}`} href={`#${k % 2 ? id.mariY : id.mari}`} x={(width / topFlowers) * k} y={7} />
        ))}
      </svg>
    </div>
  )
})
