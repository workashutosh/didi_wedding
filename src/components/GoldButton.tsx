import { m, type HTMLMotionProps } from 'framer-motion'
import { haptic } from '../lib/env'

type Props = HTMLMotionProps<'a'> & { variant?: 'gold' | 'ghost' }

/** Link-button with a tactile press: squish + haptic tick + shine */
export function GoldButton({ variant = 'gold', className = '', onClick, children, ...rest }: Props) {
  return (
    <m.a
      {...rest}
      className={`${variant === 'gold' ? 'btn-gold' : 'btn-ghost'} ${className}`}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.94, y: 1 }}
      transition={{ type: 'spring', stiffness: 520, damping: 22 }}
      onClick={(e) => {
        haptic(14)
        onClick?.(e)
      }}
    >
      {children}
    </m.a>
  )
}
