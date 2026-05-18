import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const springX = useSpring(x, { damping: 28, stiffness: 120, mass: 0.6 })
  const springY = useSpring(y, { damping: 28, stiffness: 120, mass: 0.6 })
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced.current) return

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[9] hidden md:block"
      style={{
        left: springX,
        top: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 420,
        height: 420,
        background: 'radial-gradient(circle, rgba(0,229,255,0.055) 0%, rgba(157,0,255,0.03) 40%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(2px)',
      }}
      aria-hidden="true"
    />
  )
}
