import { memo, useMemo } from 'react'
import { useIds, GoldLinear } from './geom'

/**
 * Rajasthani jharokha (cusped / multifoil arch window).
 * viewBox 0 0 200 300. The opening is generated procedurally from a
 * pointed arch with `lobes` cusps.
 */

const r2 = (n: number) => Math.round(n * 100) / 100

function cuspedArch(left: number, right: number, spring: number, apex: number, lobes: number, bottom: number) {
  const mid = (left + right) / 2
  // quadratic pointed-arch half: P0 (left, spring) → ctrl (left, apex + k) → P2 (mid, apex)
  const half = (t: number) => {
    const p0 = [left, spring]
    const p1 = [left + 2, apex + (spring - apex) * 0.12]
    const p2 = [mid, apex]
    const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0]
    const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1]
    return [x, y]
  }
  const n = lobes
  const pts: number[][] = []
  for (let i = 0; i <= n; i++) pts.push(half(i / n))
  for (let i = n - 1; i >= 0; i--) {
    const [x, y] = pts[i]
    pts.push([2 * mid - x, y])
  }
  let d = `M${left} ${bottom} L${left} ${spring}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x, y] = pts[i]
    const chord = Math.hypot(x - x0, y - y0)
    d += ` A${r2(chord * 0.62)} ${r2(chord * 0.62)} 0 0 1 ${r2(x)} ${r2(y)}`
  }
  d += ` L${right} ${bottom}`
  return d
}

interface Props {
  className?: string
  drawable?: boolean
  /** fill colour inside the opening */
  inner?: string
  lobes?: number
  bell?: boolean
}

export const Jharokha = memo(function Jharokha({ className, drawable, inner = 'none', lobes = 4, bell = true }: Props) {
  const id = useIds('jg', 'jf')
  const opening = useMemo(() => cuspedArch(34, 166, 128, 46, lobes, 278), [lobes])
  const innerLine = useMemo(() => cuspedArch(40, 160, 132, 54, lobes, 278), [lobes])
  const dd = drawable ? { className: 'draw', pathLength: 1 } : {}
  const g = `url(#${id.jg})`

  return (
    <svg viewBox="0 -8 200 308" className={className} aria-hidden>
      <defs>
        <GoldLinear id={id.jg} x1={0} y1={0} x2={200} y2={300} bright />
        <linearGradient id={id.jf} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D4AF37" stopOpacity=".22" />
          <stop offset="1" stopColor="#D4AF37" stopOpacity=".04" />
        </linearGradient>
      </defs>

      {/* opening fill */}
      <path d={`${opening} Z`} fill={inner} />

      <g fill="none" stroke={g} strokeLinecap="round" strokeLinejoin="round">
        {/* outer frame with dome */}
        <path
          d="M14 296 L14 124 C 14 64, 60 30, 100 16 C 140 30, 186 64, 186 124 L186 296"
          strokeWidth="1.6"
          {...dd}
        />
        <path d="M22 296 L22 126 C 22 72, 64 40, 100 26 C 136 40, 178 72, 178 126 L178 296" strokeWidth=".8" {...dd} />
        {/* cusped opening */}
        <path d={opening} strokeWidth="1.5" {...dd} />
        <path d={innerLine} strokeWidth=".6" strokeDasharray={drawable ? undefined : '1 2.4'} {...dd} />
        {/* pillar capitals */}
        <path d="M14 124 H34 M14 130 H34 M10 296 H190 M10 290 H190" strokeWidth="1" {...dd} />
        <path d="M18 140 C 26 136, 30 140, 30 146 C 30 152, 22 152, 22 146" strokeWidth=".8" {...dd} />
        <path d="M182 140 C 174 136, 170 140, 170 146 C 170 152, 178 152, 178 146" strokeWidth=".8" {...dd} />
        {/* pillar fluting */}
        <path d="M24 160 V280 M28 160 V280 M176 160 V280 M172 160 V280" strokeWidth=".5" opacity=".7" {...dd} />
        {/* chhatri finial */}
        <path d="M86 18 C 88 8, 112 8, 114 18 M100 6 V-2 M95 6 C 95 2, 105 2, 105 6" strokeWidth="1" {...dd} />
      </g>

      {/* spandrel ornaments */}
      <g fill={g} opacity=".9">
        <circle cx="100" cy="2" r="2.2" />
        <path d="M40 66 C 46 56, 58 52, 64 56 C 58 58, 52 64, 50 72 C 47 70, 43 68, 40 66Z" />
        <path d="M160 66 C 154 56, 142 52, 136 56 C 142 58, 148 64, 150 72 C 153 70, 157 68, 160 66Z" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={30 + i * 28} cy="292.5" r="1.2" />
        ))}
      </g>

      {/* hanging bell at the apex */}
      {bell && (
        <g className="sway" style={{ animationDuration: '5s' }}>
          <path d="M100 46 V62" stroke={g} strokeWidth=".7" />
          <path d="M94 72 C 94 64, 97 62, 100 62 C 103 62, 106 64, 106 72 Z" fill={g} />
          <circle cx="100" cy="74" r="1.4" fill={g} />
        </g>
      )}
    </svg>
  )
})
