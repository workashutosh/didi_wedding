import { memo } from 'react'
import { useIds } from './geom'

/** Ornamental scalloped fringe (a lace border between sections). */
export const Scallop = memo(function Scallop({ color, className = '', flip = false }: { color: string; className?: string; flip?: boolean }) {
  const id = useIds('sc')
  return (
    <svg className={`pointer-events-none block h-[20px] w-full ${flip ? '-scale-y-100' : ''} ${className}`} aria-hidden>
      <defs>
        <pattern id={id.sc} width="30" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 0 H30 V3 C 30 14, 22 17, 15 17 C 8 17, 0 14, 0 3 Z" fill={color} />
          <path d="M0 3 C 0 14, 8 17, 15 17 C 22 17, 30 14, 30 3" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
          <circle cx="15" cy="9" r="1.6" fill="#D4AF37" />
          <circle cx="0" cy="3" r="1.4" fill="#D4AF37" />
          <circle cx="30" cy="3" r="1.4" fill="#D4AF37" />
        </pattern>
      </defs>
      <rect width="100%" height="20" fill={`url(#${id.sc})`} />
    </svg>
  )
})
