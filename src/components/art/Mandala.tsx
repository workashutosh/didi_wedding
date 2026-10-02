import { memo } from 'react'
import { circlePts, ring, useIds, GoldLinear, type Cmd } from './geom'

// Petal shapes (pointing up, in a -100..100 box)
const outerSpike: Cmd[] = [['M', -7, -72], ['C', -6, -82, -3, -90, 0, -97], ['C', 3, -90, 6, -82, 7, -72]]
const outerScallop: Cmd[] = [['M', -11.6, -71], ['Q', 0, -84, 11.6, -71]]
const lotus: Cmd[] = [['M', 0, -44], ['C', 13, -50, 14, -60, 0, -68], ['C', -14, -60, -13, -50, 0, -44], ['Z']]
const lotusVein: Cmd[] = [['M', 0, -48], ['L', 0, -63]]
const tear: Cmd[] = [['M', 0, -24], ['C', 7, -29, 6, -36, 0, -41], ['C', -6, -36, -7, -29, 0, -24], ['Z']]
const leaf8: Cmd[] = [['M', 0, -7], ['C', 6, -10, 6, -16, 0, -21], ['C', -6, -16, -6, -10, 0, -7], ['Z']]
const paisleyRing: Cmd[] = [
  ['M', 0, -70],
  ['C', 10, -70, 14, -60, 8, -54],
  ['C', 4, -50, -2, -52, -1, -57],
  ['C', 0, -61, 5, -61, 5, -57],
]

/** many dots as ONE path (keeps the DOM small) */
const dot = (x: number, y: number, r: number) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`
const DOTS = [
  ...circlePts(48, 92.5).map(([x, y], i) => dot(x, y, i % 2 ? 0.9 : 1.5)),
  ...circlePts(24, 70, 7.5).map(([x, y]) => dot(x, y, 1.3)),
  ...circlePts(16, 43, 11.25).map(([x, y]) => dot(x, y, 1)),
  dot(0, 0, 2),
].join('')

interface Props {
  className?: string
  /** add .draw + pathLength for stroke draw-on animations */
  drawable?: boolean
  strokeWidth?: number
  /** subtle filled petals */
  filled?: boolean
  title?: string
}

/** Procedural 8-ring mandala. viewBox is -100..100. */
export const Mandala = memo(function Mandala({ className, drawable, strokeWidth = 0.8, filled = true, title }: Props) {
  const id = useIds('mg', 'mf')
  const d = drawable ? { className: 'draw', pathLength: 1 } : {}
  const s = `url(#${id.mg})`
  return (
    <svg
      viewBox="-100 -100 200 200"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <GoldLinear id={id.mg} x1={-100} y1={-100} x2={100} y2={100} bright />
        <radialGradient id={id.mf} cx="0" cy="0" r="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F4A300" stopOpacity=".35" />
          <stop offset=".55" stopColor="#D4AF37" stopOpacity=".12" />
          <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
      </defs>
      {filled && <circle r="96" fill={`url(#${id.mf})`} />}
      <g fill="none" stroke={s} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle r="98" {...d} />
        <path d={ring(outerSpike, 24)} {...d} />
        <path d={ring(outerScallop, 24, 7.5)} {...d} />
        <circle r="70" {...d} />
        <path d={ring(paisleyRing, 12, 15)} {...d} />
        <path d={ring(lotus, 16)} {...d} fill={filled ? 'rgba(212,175,55,.10)' : 'none'} />
        <path d={ring(lotusVein, 16)} {...d} />
        <circle r="42" strokeDasharray={drawable ? undefined : '1.5 3'} {...d} />
        <path d={ring(tear, 12, 15)} {...d} fill={filled ? 'rgba(244,163,0,.14)' : 'none'} />
        <circle r="22" {...d} />
        <path d={ring(leaf8, 8)} {...d} />
        <circle r="5" {...d} />
      </g>
      <path fill={s} d={DOTS} />
    </svg>
  )
})
