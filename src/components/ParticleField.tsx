import { useEffect, useRef } from 'react'
import { fxBudget, isSmall, reducedMotion } from '../lib/env'

/**
 * One fixed canvas for the whole page: falling marigold / rose petals and
 * rising gold dust. Petals drift with scroll velocity (parallax + spin).
 * Sprites are pre-rendered once, so each frame is just drawImage calls.
 */

type Petal = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vr: number
  flip: number
  vf: number
  s: number
  depth: number
  sprite: number
  phase: number
  burst?: boolean
}
type Dust = { x: number; y: number; vy: number; s: number; phase: number; tw: number; depth: number }

const PETAL_COLORS: [string, string][] = [
  ['#FFD36B', '#F4A300'],
  ['#FFC03A', '#E07B00'],
  ['#FF8FA3', '#B3122E'],
  ['#FFE9A8', '#F4A300'],
  ['#E8455F', '#8E0B22'],
]

function makePetal([c1, c2]: [string, string]) {
  const c = document.createElement('canvas')
  c.width = 40
  c.height = 52
  const g = c.getContext('2d')!
  const grad = g.createLinearGradient(0, 0, 40, 52)
  grad.addColorStop(0, c1)
  grad.addColorStop(1, c2)
  g.fillStyle = grad
  g.beginPath()
  g.moveTo(20, 50)
  g.bezierCurveTo(2, 38, 2, 12, 12, 4)
  g.quadraticCurveTo(20, -2, 28, 4)
  g.bezierCurveTo(38, 12, 38, 38, 20, 50)
  g.fill()
  g.strokeStyle = 'rgba(255,255,255,.35)'
  g.lineWidth = 1.2
  g.beginPath()
  g.moveTo(20, 46)
  g.quadraticCurveTo(18, 26, 20, 8)
  g.stroke()
  return c
}

function makeDust() {
  const c = document.createElement('canvas')
  c.width = c.height = 32
  const g = c.getContext('2d')!
  const r = g.createRadialGradient(16, 16, 0, 16, 16, 16)
  r.addColorStop(0, 'rgba(255,248,214,1)')
  r.addColorStop(0.25, 'rgba(243,217,139,.85)')
  r.addColorStop(0.6, 'rgba(212,175,55,.25)')
  r.addColorStop(1, 'rgba(212,175,55,0)')
  g.fillStyle = r
  g.fillRect(0, 0, 32, 32)
  return c
}

export function ParticleField({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active || reducedMotion || fxBudget === 0) return
    const canvas = ref.current!
    const ctx = canvas.getContext('2d', { alpha: true })!
    const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.25 : 1.5)
    let W = 0
    let H = 0
    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
    }
    resize()

    const petalSprites = PETAL_COLORS.map(makePetal)
    const dustSprite = makeDust()
    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const newPetal = (top = false): Petal => {
      const depth = rand(0.5, 1.2)
      return {
        x: rand(-20, W + 20),
        y: top ? rand(-H * 0.3, -20) : rand(-20, H),
        vx: rand(-0.25, 0.25),
        vy: rand(0.35, 0.8) * depth,
        rot: rand(0, Math.PI * 2),
        vr: rand(-0.025, 0.025),
        flip: rand(0, Math.PI * 2),
        vf: rand(0.015, 0.045),
        s: rand(0.3, 0.55) * depth,
        depth,
        sprite: (Math.random() * petalSprites.length) | 0,
        phase: rand(0, 1000),
      }
    }
    const newDust = (anywhere = true): Dust => ({
      x: rand(0, W),
      y: anywhere ? rand(0, H) : H + 10,
      vy: rand(0.1, 0.4),
      s: rand(0.25, 0.7),
      phase: rand(0, Math.PI * 2),
      tw: rand(0.001, 0.003),
      depth: rand(0.3, 1),
    })

    const petals: Petal[] = Array.from({ length: Math.round(18 * fxBudget) }, () => newPetal())
    const dust: Dust[] = Array.from({ length: Math.round(30 * fxBudget) }, () => newDust())
    let extra: Petal[] = []

    const onBurst = (e: Event) => {
      const { x, y, count, gold } = (e as CustomEvent).detail
      const n = Math.round(count * Math.max(0.5, fxBudget))
      for (let i = 0; i < n; i++) {
        const p = newPetal()
        const a = rand(0, Math.PI * 2)
        const sp = rand(3, 10)
        p.x = x
        p.y = y
        p.vx = Math.cos(a) * sp
        p.vy = Math.sin(a) * sp - 3
        p.vr = rand(-0.15, 0.15)
        p.s = rand(0.35, 0.7)
        if (gold) p.sprite = Math.random() < 0.6 ? 0 : 3
        p.burst = true
        extra.push(p)
      }
    }
    const onShower = (e: Event) => {
      const n = Math.round((e as CustomEvent).detail.count * Math.max(0.5, fxBudget))
      for (let i = 0; i < n; i++) {
        const p = newPetal(true)
        p.vy = rand(1.4, 3)
        p.burst = true
        extra.push(p)
      }
    }
    window.addEventListener('fx:burst', onBurst)
    window.addEventListener('fx:shower', onShower)
    window.addEventListener('resize', resize)

    let raf = 0
    let last = performance.now()
    let lastScroll = window.scrollY
    let sv = 0 // smoothed scroll velocity (px / frame)

    const drawPetal = (p: Petal) => {
      const sx = Math.cos(p.flip)
      const c = Math.cos(p.rot)
      const s = Math.sin(p.rot)
      const k = p.s * dpr
      // rotate → scale(x by flip) → translate, in one setTransform
      ctx.setTransform(c * sx * k, s * sx * k, -s * k, c * k, p.x * dpr, p.y * dpr)
      ctx.drawImage(petalSprites[p.sprite], -20, -26)
    }

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(3, (now - last) / 16.667)
      last = now
      const y = window.scrollY
      sv += (y - lastScroll - sv) * 0.18
      lastScroll = y
      const spin = 1 + Math.min(6, Math.abs(sv) * 0.12)

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // gold dust (additive glow)
      ctx.globalCompositeOperation = 'lighter'
      for (const d of dust) {
        d.y -= (d.vy + sv * 0.25 * d.depth) * dt
        d.x += Math.sin(now * 0.0006 + d.phase) * 0.15 * dt
        if (d.y < -12) Object.assign(d, newDust(false))
        if (d.y > H + 14) d.y = -10
        ctx.globalAlpha = 0.25 + 0.75 * Math.abs(Math.sin(now * d.tw + d.phase))
        const sz = 32 * d.s * dpr
        ctx.drawImage(dustSprite, d.x * dpr - sz / 2, d.y * dpr - sz / 2, sz, sz)
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 0.85

      for (const p of petals) {
        p.x += (p.vx + Math.sin(now * 0.0011 + p.phase) * 0.45) * dt
        p.y += (p.vy - sv * 0.35 * p.depth) * dt
        p.rot += p.vr * spin * dt
        p.flip += p.vf * spin * dt
        if (p.y > H + 40) Object.assign(p, newPetal(true))
        if (p.y < -80) {
          p.y = H + 30
          p.x = rand(0, W)
        }
        if (p.x < -40) p.x = W + 30
        if (p.x > W + 40) p.x = -30
        drawPetal(p)
      }

      ctx.globalAlpha = 1
      for (const p of extra) {
        p.vx *= 0.985
        p.vy = p.vy * 0.985 + 0.09
        p.x += (p.vx + Math.sin(now * 0.002 + p.phase) * 0.3) * dt
        p.y += p.vy * dt
        p.rot += p.vr * dt
        p.flip += p.vf * 2 * dt
        drawPetal(p)
      }
      if (extra.length) extra = extra.filter((p) => p.y < H + 60)
    }

    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(frame)
    // the doors have just opened: a burst of petals from the doorway
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('fx:burst', { detail: { x: W / 2, y: H * 0.42, count: 70, gold: false } }))
    }, 250)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('fx:burst', onBurst)
      window.removeEventListener('fx:shower', onShower)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [active])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-20 h-full w-full" aria-hidden />
}
