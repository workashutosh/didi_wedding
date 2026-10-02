import { memo } from 'react'
import type { EventIcon as IconName } from '../../config/wedding'
import { useIds, GoldLinear } from './geom'

const beads = (cx: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const t = (i / (n - 1)) * Math.PI
    return [cx - 15 * Math.cos(t), 16 + 40 * Math.sin(t)] as const
  })

function Varmala({ g }: { g: string }) {
  const left = beads(30, 15)
  const right = beads(50, 15)
  const bead = (x: number, y: number, i: number, k: string) => (
    <g key={k} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
      <circle r="3.6" fill={i % 3 === 1 ? '#B3122E' : i % 3 === 2 ? '#FFC93C' : '#F4A300'} />
      <circle r="3" fill="none" stroke="#8a3d00" strokeWidth=".9" strokeDasharray=".8 .9" opacity=".6" />
    </g>
  )
  return (
    <>
      <path d="M15 16 C 15 74, 45 74, 45 16" fill="none" stroke={g} strokeWidth=".8" />
      <path d="M35 16 C 35 74, 65 74, 65 16" fill="none" stroke={g} strokeWidth=".8" />
      {left.map(([x, y], i) => bead(x, y, i, `l${i}`))}
      {right.map(([x, y], i) => bead(x, y, i + 1, `r${i}`))}
      {/* tassels */}
      <path d="M30 56 l-3 10 h6 z M50 56 l-3 10 h6 z" fill={g} />
      <circle cx="30" cy="56" r="2.6" fill={g} />
      <circle cx="50" cy="56" r="2.6" fill={g} />
      <path d="M40 4 C 36 0, 30 2, 32 7 C 33 10, 38 12, 40 15 C 42 12, 47 10, 48 7 C 50 2, 44 0, 40 4 Z" fill="#B3122E" stroke={g} strokeWidth=".8" />
    </>
  )
}

function Haldi({ g }: { g: string }) {
  return (
    <>
      <path d="M20 30 C 6 22, 6 10, 12 6 C 18 14, 22 22, 20 30 Z" fill="#3E7D33" />
      <path d="M60 30 C 74 22, 74 10, 68 6 C 62 14, 58 22, 60 30 Z" fill="#3E7D33" />
      <path d="M18 36 C 24 26, 56 26, 62 36 Z" fill="#FFC21A" />
      <circle cx="32" cy="31" r="2" fill="#FFE27A" />
      <circle cx="46" cy="30" r="1.6" fill="#FFE27A" />
      <path d="M10 36 H70 C 68 56, 56 66, 40 66 C 24 66, 12 56, 10 36 Z" fill={g} />
      <path d="M16 46 Q40 54 64 46" fill="none" stroke="#5A0F1B" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M30 66 L28 72 H52 L50 66" fill={g} />
    </>
  )
}

function Mehendi({ g }: { g: string }) {
  return (
    <>
      <path d="M14 66 L44 18 C 48 14, 56 18, 56 24 L 22 72 Z" fill="#2F6B2A" stroke={g} strokeWidth="1" />
      <path d="M44 18 L52 8 L58 14 L56 24" fill={g} />
      <path d="M22 60 C 28 56, 30 50, 36 48 M28 52 C 32 48, 36 44, 40 38" stroke="#C9E39A" strokeWidth="1" fill="none" />
      <path d="M50 70 C 38 68, 36 54, 46 48 C 52 44, 58 46, 62 40 C 66 50, 66 60, 60 66 C 57 69, 53 70, 50 70 Z" fill="none" stroke="#8A3B12" strokeWidth="1.6" />
      <circle cx="52" cy="58" r="4" fill="none" stroke="#8A3B12" strokeWidth="1.2" />
      <circle cx="52" cy="58" r="1.4" fill="#8A3B12" />
    </>
  )
}

function Sangeet({ g }: { g: string }) {
  return (
    <>
      <path d="M14 28 C 10 36, 10 48, 14 56 H 58 C 62 48, 62 36, 58 28 Z" fill="#B3122E" stroke={g} strokeWidth="1.2" />
      <ellipse cx="14" cy="42" rx="5" ry="14" fill="#FFF8E7" stroke={g} strokeWidth="1.2" />
      <ellipse cx="58" cy="42" rx="5" ry="14" fill="#F3D98B" stroke={g} strokeWidth="1.2" />
      <path d="M16 30 L24 54 L32 30 L40 54 L48 30 L56 54" fill="none" stroke={g} strokeWidth="1" />
      <path d="M62 8 V22 M62 8 L72 6 V18" stroke={g} strokeWidth="1.6" fill="none" />
      <circle cx="59.5" cy="22" r="3" fill={g} />
      <circle cx="69.5" cy="18" r="3" fill={g} />
      <path d="M10 10 V20" stroke={g} strokeWidth="1.4" />
      <circle cx="7.6" cy="20" r="2.6" fill={g} />
    </>
  )
}

function Pheras({ g }: { g: string }) {
  return (
    <>
      <path d="M40 10 C 48 22, 52 30, 48 40 C 46 46, 34 46, 32 40 C 28 30, 32 22, 40 10 Z" fill="#F47A00" />
      <path d="M40 22 C 44 30, 45 35, 40 42 C 35 35, 36 30, 40 22 Z" fill="#FFE27A" />
      <path d="M14 44 H66 L60 54 H20 Z" fill={g} />
      <path d="M20 54 H60 L54 66 H26 Z" fill="#B3122E" stroke={g} strokeWidth="1" />
      <path d="M26 66 H54 L50 72 H30 Z" fill={g} />
    </>
  )
}

function Reception({ g }: { g: string }) {
  return (
    <>
      <path d="M40 8 L46 30 L68 30 L50 44 L57 66 L40 52 L23 66 L30 44 L12 30 L34 30 Z" fill="none" stroke={g} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="40" cy="38" r="6" fill="#B3122E" stroke={g} />
    </>
  )
}

const MAP = { varmala: Varmala, haldi: Haldi, mehendi: Mehendi, sangeet: Sangeet, pheras: Pheras, reception: Reception }

export const EventIcon = memo(function EventIcon({ name, className }: { name: IconName; className?: string }) {
  const id = useIds('ei')
  const Comp = MAP[name] ?? Reception
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <defs>
        <GoldLinear id={id.ei} x1={0} y1={0} x2={80} y2={80} bright />
      </defs>
      <Comp g={`url(#${id.ei})`} />
    </svg>
  )
})
