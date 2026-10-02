import { memo } from 'react'

/** Twinkling four-point gold glints (HTML + CSS → GPU-composited). */
export const Sparkles = memo(function Sparkles({ className = '', count = 6, seed = 1 }: { className?: string; count?: number; seed?: number }) {
  const rnd = (i: number) => {
    const x = Math.sin((i + seed * 17) * 78.233 + 12.9898) * 43758.5453
    return x - Math.floor(x)
  }
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <svg width="0" height="0" className="absolute">
        <defs>
          <radialGradient id="glint-glow">
            <stop offset="0" stopColor="#FFD678" stopOpacity=".9" />
            <stop offset="1" stopColor="#FFD678" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {Array.from({ length: count }, (_, i) => {
        const size = 10 + rnd(i + 3) * 16
        return (
          <svg
            key={i}
            viewBox="-10 -10 20 20"
            className="glint absolute"
            style={{
              left: `${6 + rnd(i) * 88}%`,
              top: `${6 + rnd(i + 7) * 80}%`,
              width: size,
              height: size,
              animationDelay: `${rnd(i + 11) * 4}s`,
              animationDuration: `${2.8 + rnd(i + 5) * 2.4}s`,
            }}
          >
            <circle r="9" fill="url(#glint-glow)" />
            <path d="M0 -10 C 1 -2, 2 -1, 10 0 C 2 1, 1 2, 0 10 C -1 2, -2 1, -10 0 C -2 -1, -1 -2, 0 -10 Z" fill="#FFF6D0" />
            <circle r="2.2" fill="#fff" />
          </svg>
        )
      })}
    </div>
  )
})
