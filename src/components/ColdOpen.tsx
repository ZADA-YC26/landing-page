import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import ZadaSpirit from './ZadaSpirit'
import GlowButton from './GlowButton'

const WHISPERS = [
  { text: 'quest nearby', x: '8%', y: '28%', color: '#CCFF00', delay: 1.4 },
  { text: '2 min away', x: '72%', y: '22%', color: '#CCFF00', delay: 1.9 },
  { text: 'bring a friend', x: '14%', y: '64%', color: '#CCFF00', delay: 2.3 },
  { text: '+150 XP', x: '78%', y: '58%', color: '#CCFF00', delay: 2.7 },
  { text: 'proof required', x: '60%', y: '78%', color: '#CCFF00', delay: 3.1 },
  { text: 'rank up', x: '5%', y: '82%', color: '#CCFF00', delay: 3.5 },
]

const HEADLINE = ['Your', 'next', 'story', 'is', 'already', 'nearby.']

function CityGrid() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <defs>
        <radialGradient id="grid-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#0F0C1A" stopOpacity="0" />
          <stop offset="100%" stopColor="#05030A" stopOpacity="1" />
        </radialGradient>

        {/* Glow line gradient */}
        <linearGradient id="route-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CCFF00" stopOpacity="0" />
          <stop offset="40%" stopColor="#CCFF00" stopOpacity="1" />
          <stop offset="70%" stopColor="#CCFF00" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.3" />
        </linearGradient>

        <filter id="glow-line" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base grid lines — horizontal */}
      {Array.from({ length: 16 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0" y1={i * 60} x2="1440" y2={i * 60}
          stroke="#1A1628" strokeWidth="1"
        />
      ))}
      {/* Base grid lines — vertical */}
      {Array.from({ length: 25 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 60} y1="0" x2={i * 60} y2="900"
          stroke="#1A1628" strokeWidth="1"
        />
      ))}

      {/* Neon accent grid lines */}
      <line x1="0" y1="300" x2="1440" y2="300" stroke="#CCFF00" strokeWidth="0.5" opacity="0.2" />
      <line x1="0" y1="600" x2="1440" y2="600" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />
      <line x1="480" y1="0" x2="480" y2="900" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />
      <line x1="960" y1="0" x2="960" y2="900" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />

      {/* Grid intersection dots */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 13 }).map((_, col) => (
          <circle
            key={`d${row}-${col}`}
            cx={col * 120 + 60}
            cy={row * 120 + 60}
            r="1.5"
            fill="#252035"
          />
        ))
      )}

      {/* Glowing intersection nodes */}
      <circle cx="360" cy="300" r="4" fill="#CCFF00" opacity="0.7" filter="url(#glow-line)" />
      <circle cx="720" cy="450" r="5" fill="#CCFF00" opacity="0.6" filter="url(#glow-line)" />
      <circle cx="900" cy="180" r="3.5" fill="#CCFF00" opacity="0.5" filter="url(#glow-line)" />
      <circle cx="1080" cy="540" r="3" fill="#CCFF00" opacity="0.4" filter="url(#glow-line)" />

      {/* Animated route path */}
      <motion.path
        d="M 360 300 Q 480 240 600 300 Q 680 345 720 450 Q 760 540 840 480 Q 900 420 900 360"
        stroke="url(#route-grad)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        filter="url(#glow-line)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Route pulse dot */}
      <motion.circle
        r="6"
        fill="#CCFF00"
        filter="url(#glow-line)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.8, 1] }}
        transition={{ duration: 1, delay: 4.2 }}
        style={{ offsetPath: "path('M 360 300 Q 480 240 600 300 Q 680 345 720 450 Q 760 540 840 480 Q 900 420 900 360')" } as React.CSSProperties}
      />

      {/* Radial fade overlay */}
      <rect x="0" y="0" width="1440" height="900" fill="url(#grid-fade)" />
    </svg>
  )
}

export default function ColdOpen() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { scrollY } = useScroll()

  const spiritY = useTransform(scrollY, [0, 600], [0, -80])
  const gridY = useTransform(scrollY, [0, 600], [0, -40])
  const textY = useTransform(scrollY, [0, 400], [0, -30])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { damping: 30, stiffness: 80 })

  const [mounted, setMounted] = useState(false)
  const prefersReduced = useRef(false)

  useEffect(() => {
    setMounted(true)
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!el || prefersReduced.current) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.015)
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.012)
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => el.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Zada — Follow the spark"
    >
      {/* City grid background — parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: gridY, x: springX }}>
        <CityGrid />
      </motion.div>

      {/* Ambient orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '10%', left: '5%',
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(157,0,255,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: '5%', right: '5%',
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Floating UI Whispers */}
      <AnimatePresence>
        {mounted && WHISPERS.map((w) => (
          <motion.div
            key={w.text}
            className="absolute hidden md:flex items-center gap-2 z-20 pointer-events-none"
            style={{ left: w.x, top: w.y }}
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: w.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="px-3 py-1.5 rounded-full text-xs font-semibold font-body"
              style={{
                background: `${w.color}15`,
                border: `1px solid ${w.color}40`,
                color: w.color,
                backdropFilter: 'blur(8px)',
                letterSpacing: '0.02em',
              }}
              animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3.5 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: w.delay + 0.5 }}
            >
              {w.text}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto"
        style={{ y: textY }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-xs font-semibold font-body tracking-[0.22em] uppercase mb-8"
          style={{ color: '#CCFF00' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Quest nearby
        </motion.p>

        {/* Headline — word-by-word reveal */}
        <h1
          className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-8"
          style={{ color: '#F2F0EF' }}
        >
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word + i}
              className="inline-block mr-[0.25em] last:mr-0"
              style={word === 'nearby.' ? {
                color: '#CCFF00',
              } : {}}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Supporting copy */}
        <motion.p
          className="font-body text-lg md:text-xl max-w-xl leading-relaxed mb-4"
          style={{ color: 'rgba(242,240,239,0.65)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          Zada turns ordinary city moments into spontaneous real-life quests.
        </motion.p>

        <motion.p
          className="font-body text-sm font-medium mb-12"
          style={{ color: 'rgba(242,240,239,0.38)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.35, duration: 0.6 }}
        >
          Don't just visit the city. Play it.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <GlowButton variant="primary" size="lg" href="#join" ariaLabel="Join the Zada waitlist">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2L10 6L14 7L11 10L11.5 14L8 12L4.5 14L5 10L2 7L6 6Z" fill="currentColor" />
            </svg>
            Follow the spark
          </GlowButton>
          <GlowButton variant="secondary" size="lg" href="#spontaneous">
            See what it feels like
          </GlowButton>
        </motion.div>

        {/* XP hint */}
        <motion.p
          className="font-body text-xs mt-8"
          style={{ color: 'rgba(242,240,239,0.25)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          No download needed to explore — scroll to play
        </motion.p>
      </motion.div>

      {/* ZadaSpirit floating — parallax */}
      <motion.div
        className="absolute z-20 pointer-events-none"
        style={{ right: '8%', top: '35%', y: spiritY, x: springX }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <ZadaSpirit size={80} color="#CCFF00" floatDelay={0.2} />
        {/* Spirit glow halo */}
        <div
          className="absolute -inset-8 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.12) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="w-px h-12 rounded-full"
          style={{ background: 'linear-gradient(180deg, rgba(204,255,0,0.6), transparent)' }}
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="font-body text-xs" style={{ color: 'rgba(242,240,239,0.3)', letterSpacing: '0.15em' }}>
          scroll
        </span>
      </motion.div>
    </section>
  )
}
