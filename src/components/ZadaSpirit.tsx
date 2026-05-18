import { motion } from 'framer-motion'

interface ZadaSpiritProps {
  size?: number
  color?: string
  className?: string
  floatDelay?: number
  showSparkle?: boolean
}

export default function ZadaSpirit({
  size = 64,
  color = '#00E5FF',
  className = '',
  floatDelay = 0,
  showSparkle: _showSparkle,
}: ZadaSpiritProps) {
  return (
    <motion.div
      className={`relative select-none flex-shrink-0 ${className}`}
      style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      animate={{ y: [0, -10, -4, -12, 0], rotate: [0, 1.5, -1, 2, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
      aria-hidden="true"
    >
      {/* Outer bloom — blurred, wide */}
      <div
        style={{
          position: 'absolute',
          inset: '-55%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}1A 0%, transparent 65%)`,
          filter: 'blur(10px)',
          pointerEvents: 'none',
        }}
      />
      {/* Inner halo — tight, vivid core */}
      <div
        style={{
          position: 'absolute',
          inset: '-22%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}28 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Icon with 3-layer drop-shadow */}
      <img
        src="/zada-icon.svg"
        alt=""
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          display: 'block',
          position: 'relative',
          zIndex: 1,
          filter: `drop-shadow(0 0 ${Math.round(size * 0.1)}px ${color}) drop-shadow(0 0 ${Math.round(size * 0.22)}px ${color}A0) drop-shadow(0 0 ${Math.round(size * 0.44)}px ${color}40)`,
        }}
      />
    </motion.div>
  )
}
