// Device / preference flags, evaluated once at startup.
const mq = (q: string) => typeof window !== 'undefined' && window.matchMedia(q).matches

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
const nav = (typeof navigator !== 'undefined' ? navigator : {}) as Nav

export const reducedMotion = mq('(prefers-reduced-motion: reduce)')
export const isTouch = mq('(pointer: coarse)')
export const isSmall = mq('(max-width: 640px)')

/** Rough low-end detection: few cores, little memory, or data-saver on */
export const lowEnd =
  (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 3 || !!nav.connection?.saveData

/** Particle budget multiplier */
export const fxBudget = reducedMotion ? 0 : lowEnd ? 0.45 : isSmall ? 0.7 : 1

export const haptic = (ms = 12) => {
  try {
    if (!reducedMotion) navigator.vibrate?.(ms)
  } catch {
    /* unsupported */
  }
}
