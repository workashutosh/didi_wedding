// Tiny geometry helpers for procedurally generated ornaments.
import { useId } from 'react'

export type Cmd = [string, ...number[]]

const r2 = (n: number) => Math.round(n * 100) / 100

/** rotate an absolute-coordinate path (M/L/C/Q/Z only) around (cx, cy) */
export function rotatePath(cmds: Cmd[], deg: number, cx = 0, cy = 0): string {
  const a = (deg * Math.PI) / 180
  const c = Math.cos(a)
  const s = Math.sin(a)
  return cmds
    .map(([op, ...nums]) => {
      const out: number[] = []
      for (let i = 0; i < nums.length; i += 2) {
        const x = nums[i] - cx
        const y = nums[i + 1] - cy
        out.push(r2(cx + x * c - y * s), r2(cy + x * s + y * c))
      }
      return op + out.join(' ')
    })
    .join('')
}

/** n rotated copies of a petal, as one path string */
export const ring = (cmds: Cmd[], n: number, phase = 0) =>
  Array.from({ length: n }, (_, i) => rotatePath(cmds, phase + (360 / n) * i)).join('')

/** mirror an absolute path horizontally around x = axis */
export function mirrorX(cmds: Cmd[], axis: number): Cmd[] {
  return cmds.map(([op, ...nums]) => [op, ...nums.map((v, i) => (i % 2 === 0 ? r2(2 * axis - v) : v))] as Cmd)
}

export const toD = (cmds: Cmd[]) => cmds.map(([op, ...n]) => op + n.join(' ')).join('')

/** points on a circle */
export const circlePts = (n: number, r: number, phase = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((phase + (360 / n) * i - 90) * Math.PI) / 180
    return [r2(Math.cos(a) * r), r2(Math.sin(a) * r)] as const
  })

/** unique, stable gradient ids per component instance */
export function useIds<const K extends readonly string[]>(...keys: K) {
  const base = useId().replace(/:/g, '')
  return Object.fromEntries(keys.map((k) => [k, `${k}-${base}`])) as Record<K[number], string>
}

/** linear gold gradient in user space (safe for straight lines) */
export function GoldLinear({
  id,
  x1 = 0,
  y1 = 0,
  x2 = 0,
  y2 = 100,
  bright = false,
}: {
  id: string
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  bright?: boolean
}) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
      <stop offset="0" stopColor={bright ? '#FFF6D0' : '#F3D98B'} />
      <stop offset=".35" stopColor="#E8C967" />
      <stop offset=".55" stopColor="#D4AF37" />
      <stop offset=".8" stopColor={bright ? '#F3D98B' : '#B8901F'} />
      <stop offset="1" stopColor="#A37A1C" />
    </linearGradient>
  )
}
