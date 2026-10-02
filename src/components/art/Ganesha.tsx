import { memo } from 'react'
import { useIds, GoldLinear, ring, type Cmd } from './geom'

/**
 * Original line-art Shri Ganesha (stylised head with mukut, ears, curling
 * trunk, tilak, on a lotus). Every stroke is a separate path with
 * pathLength=1 so it can be drawn on in sequence.
 * viewBox 0 0 200 240.
 */

// Strokes in drawing order
const STROKES: { d: string; w?: number; fill?: boolean }[] = [
  // ── mukut (crown) ──
  { d: 'M70 80 C 82 71, 118 71, 130 80', w: 1.6 },
  { d: 'M72 73 C 84 65, 116 65, 128 73' },
  { d: 'M74 73 L 79 50 C 86 49, 90 44, 92 37 C 95 30, 98 22, 100 13 C 102 22, 105 30, 108 37 C 110 44, 114 49, 121 50 L 126 73', w: 1.5 },
  { d: 'M79 50 C 92 46, 108 46, 121 50' },
  { d: 'M84 61 C 94 57, 106 57, 116 61' },
  { d: 'M100 51 C 104 54, 104 60, 100 64 C 96 60, 96 54, 100 51 Z', fill: true },
  { d: 'M92 37 C 97 40, 103 40, 108 37' },
  { d: 'M100 8 m -2.4 0 a 2.4 2.4 0 1 0 4.8 0 a 2.4 2.4 0 1 0 -4.8 0', fill: true },
  { d: 'M72 78 C 66 80, 64 86, 66 92 M66 92 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0' },
  { d: 'M128 78 C 134 80, 136 86, 134 92 M134 92 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0' },
  { d: 'M82 66 C 86 62, 90 62, 92 66 M108 66 C 110 62, 114 62, 118 66' },
  // ── ears ──
  { d: 'M71 82 C 52 68, 24 76, 22 104 C 20 128, 36 148, 58 146 C 66 145, 71 140, 74 132', w: 1.6 },
  { d: 'M129 82 C 148 68, 176 76, 178 104 C 180 128, 164 148, 142 146 C 134 145, 129 140, 126 132', w: 1.6 },
  { d: 'M67 92 C 52 84, 34 94, 34 110 C 34 126, 46 136, 60 134' },
  { d: 'M133 92 C 148 84, 166 94, 166 110 C 166 126, 154 136, 140 134' },
  { d: 'M44 104 C 47 100, 52 100, 54 104 M42 116 C 46 112, 52 112, 54 116 M46 126 C 50 122, 55 122, 57 126' },
  { d: 'M156 104 C 153 100, 148 100, 146 104 M158 116 C 154 112, 148 112, 146 116 M154 126 C 150 122, 145 122, 143 126' },
  // ── face: brows, eyes, tilak ──
  { d: 'M78 92 C 83 87, 90 87, 94 90' },
  { d: 'M122 92 C 117 87, 110 87, 106 90' },
  { d: 'M80 100 C 84 95, 91 95, 94 100 C 90 103, 84 103, 80 100 Z' },
  { d: 'M120 100 C 116 95, 109 95, 106 100 C 110 103, 116 103, 120 100 Z' },
  { d: 'M87.5 99.5 m -1.8 0 a 1.8 1.8 0 1 0 3.6 0 a 1.8 1.8 0 1 0 -3.6 0', fill: true },
  { d: 'M112.5 99.5 m -1.8 0 a 1.8 1.8 0 1 0 3.6 0 a 1.8 1.8 0 1 0 -3.6 0', fill: true },
  { d: 'M95 79 C 96 86, 98 90, 100 92 C 102 90, 104 86, 105 79' },
  // ── trunk ──
  { d: 'M90 104 C 88 128, 90 150, 101 166 C 110 179, 124 184, 134 176 C 142 169, 138 156, 128 158 C 122 159, 121 167, 127 168', w: 1.7 },
  { d: 'M110 104 C 111 124, 112 140, 117 151 C 120 157, 124 160, 128 158', w: 1.7 },
  { d: 'M91 118 C 97 122, 104 122, 110.5 118 M91 130 C 97 134, 105 134, 111.5 130 M93 142 C 99 146, 107 146, 113.5 141.5 M98 154 C 104 157, 110 156, 116 151' },
  // ── tusks & cheeks ──
  { d: 'M88.6 130 C 81 137, 75 147, 72 160 C 78 152, 83 146, 88.8 141', w: 1.3 },
  { d: 'M113 134 C 118 137, 121 141, 122 146 C 118 144, 115 141, 113.5 139' },
  { d: 'M74 132 C 78 128, 83 124, 88.4 122' },
  { d: 'M126 132 C 122 128, 117 125, 111.6 124' },
  // ── lotus seat ──
  { d: 'M100 228 C 86 222, 82 208, 86 196 C 94 204, 98 214, 100 228 C 102 214, 106 204, 114 196 C 118 208, 114 222, 100 228 Z', w: 1.3 },
  { d: 'M100 228 C 82 230, 66 222, 58 208 C 72 206, 86 214, 100 228 C 114 214, 128 206, 142 208 C 134 222, 118 230, 100 228 Z' },
  { d: 'M100 228 C 78 236, 54 232, 40 220 C 58 214, 80 220, 100 228 C 120 220, 142 214, 160 220 C 146 232, 122 236, 100 228 Z' },
  { d: 'M40 236 C 80 232, 120 232, 160 236' },
]

const RAY: Cmd[] = [['M', -3.5, -84], ['C', -2, -90, -1, -94, 0, -99], ['C', 1, -94, 2, -90, 3.5, -84]]
const HALO_RAYS = ring(RAY, 36)

export const Ganesha = memo(function Ganesha({ className, drawable }: { className?: string; drawable?: boolean }) {
  const id = useIds('gg')
  const d = drawable ? { pathLength: 1 } : {}
  return (
    <div className={`relative ${className ?? ''}`} style={{ aspectRatio: '200 / 240' }} role="img" aria-label="Line drawing of Shri Ganesha">
      {/* halo (prabhamandal) — rotating rays on a composited HTML layer */}
      <div className="g-halo absolute inset-0" aria-hidden>
        <div
          className="absolute rounded-full"
          style={{ left: '-4%', top: '0%', width: '108%', height: '90%', background: 'radial-gradient(closest-side, rgba(244,163,0,.38), rgba(212,175,55,.12) 50%, transparent)' }}
        />
        <div className="spin-slow absolute" style={{ left: '0.5%', top: '5.4%', width: '99%', height: '82.5%' }}>
          <svg viewBox="-100 -100 200 200" className="block h-full w-full" fill="none" stroke="#E8C967" strokeWidth=".6" opacity=".7">
            <path d={HALO_RAYS} />
            <circle r="82" strokeDasharray="1 3" />
          </svg>
        </div>
      </div>

      <svg viewBox="0 0 200 240" className="relative block h-full w-full" aria-hidden>
        <defs>
          <GoldLinear id={id.gg} x1={20} y1={0} x2={180} y2={240} bright />
        </defs>
        <g
          className="g-lines"
          fill="none"
          stroke={`url(#${id.gg})`}
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {STROKES.map((s, i) => (
            <path
              key={i}
              d={s.d}
              strokeWidth={s.w}
              className={drawable ? 'draw' : undefined}
              {...d}
              fill={s.fill ? `url(#${id.gg})` : undefined}
              fillOpacity={s.fill ? 0.9 : undefined}
            />
          ))}
        </g>
        {/* sindoor tilak dot */}
        <circle className="g-tilak" cx="100" cy="85" r="2.3" fill="#B3122E" stroke="#F3D98B" strokeWidth=".5" />
      </svg>
    </div>
  )
})
