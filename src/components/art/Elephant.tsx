import { memo } from 'react'
import { useIds, GoldLinear } from './geom'

/**
 * Royal Indian elephant (gaj), side view facing right, trunk raised in
 * blessing. Decorated with jhool (saddle cloth), mukhpatti (head ornament),
 * neck bells and anklets. viewBox 0 0 230 170.
 */

// scalloped hem for the jhool
const hem = (() => {
  let d = 'M66 104'
  const n = 8
  for (let i = 0; i < n; i++) {
    const x0 = 66 + (i * 74) / n
    const x1 = 66 + ((i + 1) * 74) / n
    d += ` Q ${(x0 + x1) / 2} 114, ${x1} 104`
  }
  return d
})()

export const Elephant = memo(function Elephant({ className }: { className?: string }) {
  const id = useIds('eg', 'eb', 'ebd', 'ej', 'ejr')
  const gold = `url(#${id.eg})`
  return (
    <svg viewBox="0 0 230 170" className={className} aria-hidden>
      <defs>
        <GoldLinear id={id.eg} x1={40} y1={20} x2={200} y2={160} bright />
        <linearGradient id={id.eb} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9c97a3" />
          <stop offset=".55" stopColor="#77727f" />
          <stop offset="1" stopColor="#4f4b57" />
        </linearGradient>
        <linearGradient id={id.ebd} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6c6774" />
          <stop offset="1" stopColor="#3d3a44" />
        </linearGradient>
        <linearGradient id={id.ej} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B3122E" />
          <stop offset="1" stopColor="#7a0b1f" />
        </linearGradient>
        <linearGradient id={id.ejr} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0E6F6B" />
          <stop offset="1" stopColor="#084845" />
        </linearGradient>
      </defs>

      {/* far legs (in shadow) */}
      <path d="M126 112 L127 154 Q127 158 123 158 H113 Q109 158 110 154 L111 112 Z" fill={`url(#${id.ebd})`} />
      <path d="M92 112 L93 154 Q93 158 89 158 H79 Q75 158 76 154 L77 112 Z" fill={`url(#${id.ebd})`} />

      {/* tail */}
      <path d="M46 66 C 38 76, 38 92, 34 104" fill="none" stroke="#4f4b57" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M34 104 c -3 3 -4 8 -1 10 c 2 -1 4 -5 3 -10 z" fill="#3d3a44" />

      {/* body, head and raised trunk */}
      <path
        d="M50 60
           C 62 38, 92 30, 120 36
           C 134 39, 142 42, 148 40
           C 156 26, 178 22, 190 32
           C 199 40, 201 52, 199 64
           C 202 78, 206 92, 212 100
           C 217 92, 218 80, 214 70
           C 211 64, 213 58, 219 58
           C 225 59, 227 68, 224 76
           C 220 92, 214 110, 204 116
           C 197 120, 191 114, 188 104
           C 186 98, 184 94, 180 92
           C 176 96, 172 98, 168 100
           L 170 154 Q 170 159 165 159 H 152 Q 147 159 148 154
           L 148 120
           C 128 126, 100 126, 82 120
           L 82 154 Q 82 159 77 159 H 64 Q 59 159 60 154
           L 58 114
           C 48 106, 42 84, 50 60 Z"
        fill={`url(#${id.eb})`}
        stroke="#3d3a44"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* trunk wrinkles */}
      <g fill="none" stroke="#4f4b57" strokeWidth=".9" strokeLinecap="round" opacity=".8">
        <path d="M200 72 q 4 -1 6 -4 M202 80 q 4 0 7 -4 M205 88 q 4 0 7 -4 M209 96 q 3 0 5 -4" />
      </g>
      {/* toenails */}
      <g fill="#e9e3d6">
        <path d="M152 159 a3 2.4 0 0 1 6 0 z M159 159 a3 2.4 0 0 1 6 0 z" />
        <path d="M64 159 a3 2.4 0 0 1 6 0 z M71 159 a3 2.4 0 0 1 6 0 z" />
      </g>

      {/* ear */}
      <path
        d="M152 44 C 138 50, 134 74, 140 92 C 146 104, 162 104, 168 92 C 174 78, 170 54, 152 44 Z"
        fill="#86818f"
        stroke="#3d3a44"
        strokeWidth="1"
      />
      <path d="M150 54 C 142 64, 142 82, 148 92" fill="none" stroke="#5f5a68" strokeWidth="1" />

      {/* jhool (saddle cloth) */}
      <path
        d={`M66 40 C 88 30, 120 30, 140 40 L 140 104 L 66 104 Z`}
        fill={`url(#${id.ej})`}
        stroke={gold}
        strokeWidth="1.6"
      />
      <path d={hem} fill={`url(#${id.ej})`} stroke={gold} strokeWidth="1.2" />
      <path d="M72 46 C 90 38, 116 38, 134 46 L 134 98 L 72 98 Z" fill="none" stroke={gold} strokeWidth=".7" strokeDasharray="2 2" />
      <rect x="66" y="58" width="74" height="9" fill={`url(#${id.ejr})`} stroke={gold} strokeWidth=".6" />
      <g fill={gold}>
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={70 + i * 8.3} cy="62.5" r="1.4" />
        ))}
      </g>
      {/* central medallion */}
      <circle cx="103" cy="82" r="10" fill={`url(#${id.ejr})`} stroke={gold} strokeWidth="1.2" />
      <path d="M103 74 C 107 78, 107 86, 103 90 C 99 86, 99 78, 103 74 Z M95 82 C 99 78, 107 78, 111 82 C 107 86, 99 86, 95 82 Z" fill={gold} opacity=".9" />
      <circle cx="103" cy="82" r="2" fill="#B3122E" />
      {/* tassels on the hem */}
      <g fill={gold}>
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${66 + i * 9.25} 104 l -1.6 7 h 3.2 z`} />
        ))}
      </g>
      {/* saddle cushion */}
      <path d="M78 36 C 92 24, 114 24, 128 36 C 112 32, 94 32, 78 36 Z" fill="#F4A300" stroke={gold} strokeWidth=".8" />

      {/* mukhpatti (head ornament) */}
      <path d="M164 30 C 176 26, 190 30, 196 42 L 202 70 C 198 76, 192 76, 190 70 Z" fill={gold} stroke="#8C6A16" strokeWidth=".6" />
      <circle cx="184" cy="40" r="2.6" fill="#B3122E" stroke="#FFF1B8" strokeWidth=".6" />
      <circle cx="192" cy="52" r="2" fill="#0E6F6B" stroke="#FFF1B8" strokeWidth=".5" />
      <circle cx="197" cy="64" r="1.8" fill="#B3122E" stroke="#FFF1B8" strokeWidth=".5" />
      <path d="M176 32 C 172 40, 172 48, 176 54" fill="none" stroke="#8C6A16" strokeWidth=".6" />

      {/* eye */}
      <path d="M176 54 C 178 51, 183 51, 185 54 C 183 56, 178 56, 176 54 Z" fill="#2a1a12" />
      <path d="M175 51 C 178 48, 183 48, 186 51" fill="none" stroke="#3d3a44" strokeWidth=".8" />

      {/* tusk */}
      <path d="M186 96 C 192 108, 202 112, 212 108 C 202 106, 194 100, 190 92 Z" fill="#fbf6ea" stroke="#c9b98f" strokeWidth=".6" />

      {/* neck rope with bells */}
      <path d="M146 44 C 150 64, 156 84, 164 98" fill="none" stroke={gold} strokeWidth="2" />
      <g fill={gold}>
        <path d="M150 64 c -3 0 -4 4 -4 7 h 8 c 0 -3 -1 -7 -4 -7 z" />
        <path d="M156 82 c -3 0 -4 4 -4 7 h 8 c 0 -3 -1 -7 -4 -7 z" />
      </g>

      {/* anklets */}
      <g stroke={gold} strokeWidth="2.2">
        <path d="M60 144 H82 M148 144 H170" />
      </g>
      <g fill="#B3122E">
        <circle cx="66" cy="144" r="1.3" />
        <circle cx="76" cy="144" r="1.3" />
        <circle cx="154" cy="144" r="1.3" />
        <circle cx="164" cy="144" r="1.3" />
      </g>
    </svg>
  )
})
