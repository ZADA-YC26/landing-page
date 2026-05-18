import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface GlowButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  href?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit'
  disabled?: boolean
  ariaLabel?: string
}

export default function GlowButton({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
  size = 'md',
  type = 'button',
  disabled = false,
  ariaLabel,
}: GlowButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 20, stiffness: 200 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 200 })

  const rotateX = useTransform(springY, [-30, 30], [4, -4])
  const rotateY = useTransform(springX, [-50, 50], [-6, 6])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
  }

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: '#CCFF00',
      color: '#05030A',
      fontWeight: 700,
    },
    secondary: {
      background: 'transparent',
      color: '#F2F0EF',
      border: '1.5px solid rgba(242,240,239,0.2)',
      fontWeight: 600,
    },
    ghost: {
      background: 'transparent',
      color: '#00E5FF',
      fontWeight: 600,
    },
  }

  const glowStyles: Record<string, { boxShadow: string; scale?: number }> = {
    primary: {
      boxShadow: '0 0 24px rgba(204,255,0,0.35), 0 0 48px rgba(204,255,0,0.12)',
    },
    secondary: {
      boxShadow: '0 0 20px rgba(242,240,239,0.1)',
    },
    ghost: {
      boxShadow: '0 0 20px rgba(0,229,255,0.2)',
    },
  }

  const baseStyle: React.CSSProperties = {
    ...variantStyles[variant],
    borderRadius: 10,
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '-0.01em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    whiteSpace: 'nowrap',
    position: 'relative',
    overflow: 'hidden',
    transition: 'box-shadow 200ms ease',
    userSelect: 'none',
  }

  const sharedProps = {
    onClick: disabled ? undefined : onClick,
    'aria-label': ariaLabel,
    'aria-disabled': disabled,
  }

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 400 }}
    >
      <motion.button
        type={type}
        style={baseStyle}
        className={`${sizeClasses[size]} ${className}`}
        whileHover={disabled ? {} : {
          ...glowStyles[variant],
          scale: variant === 'primary' ? 1.04 : 1.02,
        }}
        whileTap={disabled ? {} : { scale: 0.96 }}
        transition={{ duration: 0.18 }}
        {...sharedProps}
      >
        {/* Shimmer overlay for primary */}
        {variant === 'primary' && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite',
              borderRadius: 'inherit',
            }}
          />
        )}
        <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>{children}</span>
      </motion.button>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', display: 'inline-block' }}>
        {inner}
      </a>
    )
  }

  return inner
}
