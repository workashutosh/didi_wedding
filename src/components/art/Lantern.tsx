import { memo } from 'react'

/** hanging gold lantern (jhoomar) */
export const Lantern = memo(function Lantern({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 150" className={className} aria-hidden>
      <path d="M30 0 V40" stroke="#B8901F" strokeWidth="1.2" />
      <g fill="#D4AF37" stroke="#8C6A16" strokeWidth=".8">
        <path d="M18 46 C 18 40, 42 40, 42 46 Z" />
        <path d="M10 50 C 10 46, 50 46, 50 50 C 52 76, 44 92, 30 96 C 16 92, 8 76, 10 50 Z" />
      </g>
      <g fill="none" stroke="#8C6A16" strokeWidth=".8">
        <path d="M14 58 H46 M12 70 H48 M16 82 H44" />
        {[18, 26, 34, 42].map((x) => (
          <path key={x} d={`M${x} 52 C ${x - 1} 70, ${x} 84, ${30 + (x - 30) * 0.4} 94`} />
        ))}
      </g>
      <g fill="#FFF1B8">
        {[16, 24, 32, 40].map((x) => (
          <circle key={x} cx={x + 2} cy="64" r="1.6" />
        ))}
      </g>
      <path d="M30 96 V108" stroke="#B8901F" strokeWidth="1" />
      <g fill="#D4AF37">
        {[-12, -4, 4, 12].map((dx, i) => (
          <g key={dx}>
            <path d={`M${30 + dx} 100 V${118 + (i % 2) * 8}`} stroke="#B8901F" strokeWidth=".8" />
            <circle cx={30 + dx} cy={120 + (i % 2) * 8} r="2.4" />
          </g>
        ))}
        <path d="M24 108 L30 140 L36 108 Z" fill="#B3122E" stroke="#8C6A16" strokeWidth=".6" />
      </g>
    </svg>
  )
})
