import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ZadaSpirit from './ZadaSpirit'

const STEPS = [
  {
    id: 1,
    label: 'Open Zada',
    sub: 'Quest nearby',
    color: '#CCFF00',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="5" y="2" width="12" height="18" rx="3" stroke="#CCFF00" strokeWidth="1.5" opacity="0.5" />
        <rect x="7" y="6" width="8" height="5" rx="1.5" fill="#CCFF00" opacity="0.3" stroke="#CCFF00" strokeWidth="0.8" />
        <circle cx="11" cy="16" r="1.5" fill="#CCFF00" />
      </svg>
    ),
  },
  {
    id: 2,
    label: 'Choose a quest',
    sub: 'Pick mission',
    color: '#CCFF00',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 11l5 5L18 6" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="9" stroke="#CCFF00" strokeWidth="1.5" opacity="0.3" />
      </svg>
    ),
  },
  {
    id: 3,
    label: 'Complete IRL',
    sub: 'Go outside',
    color: '#CCFF00',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="4" fill="#CCFF00" opacity="0.6" />
        <path d="M11 4V2M11 20v-2M4 11H2M20 11h-2M6.34 6.34L4.93 4.93M17.07 17.07l-1.41-1.41M6.34 15.66L4.93 17.07M17.07 4.93l-1.41 1.41" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 4,
    label: 'Upload proof',
    sub: 'Proof uploaded',
    color: '#CCFF00',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="18" height="14" rx="3" stroke="#CCFF00" strokeWidth="1.5" opacity="0.5" />
        <circle cx="11" cy="12" r="3" stroke="#CCFF00" strokeWidth="1.5" />
        <path d="M8 5V4a1 1 0 011-1h4a1 1 0 011 1v1" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="8" r="1.5" fill="#CCFF00" />
      </svg>
    ),
  },
  {
    id: 5,
    label: 'Earn XP',
    sub: '+250 XP',
    color: '#CCFF00',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2L13.5 8L20 9L15.5 13.5L17 20L11 17L5 20L6.5 13.5L2 9L8.5 8Z" fill="#CCFF00" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: 6,
    label: 'Evolve',
    sub: 'Rank unlocked',
    color: '#CCFF00',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 4L13 9H18.5L14 12.5L15.5 18L11 15.5L6.5 18L8 12.5L3.5 9H9Z" stroke="#CCFF00" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="11" cy="11" r="2.5" fill="#CCFF00" opacity="0.5" />
      </svg>
    ),
  },
]

export default function CoreLoop() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [xpCount, setXpCount] = useState(0)
  const [badgeUnlocked, setBadgeUnlocked] = useState(false)

  const handleStep = (id: number) => {
    setActiveStep(id)
    if (id === 5) {
      let v = 0
      const t = setInterval(() => {
        v += 12
        setXpCount(v)
        if (v >= 250) { clearInterval(t); setBadgeUnlocked(true) }
      }, 30)
    } else {
      setXpCount(0)
      setBadgeUnlocked(false)
    }
  }

  return (
    <section
      id="loop"
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="loop-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(204,255,0,0.25), transparent)' }} aria-hidden="true" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="font-body text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: 'rgba(242,240,239,0.35)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            The loop
          </motion.p>
          <motion.h2
            id="loop-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl mb-4"
            style={{ color: '#F2F0EF' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Open.{' '}
            <span style={{ color: '#CCFF00' }}>Quest.</span>{' '}
            <span style={{ color: '#00E5FF' }}>Prove.</span>{' '}
            <span style={{ color: '#9D00FF' }}>Evolve.</span>
          </motion.h2>
          <motion.p
            className="font-body text-base"
            style={{ color: 'rgba(242,240,239,0.4)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Hover a step to explore. The spirit moves with you.
          </motion.p>
        </div>

        {/* Loop nodes */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute top-8 left-0 right-0 h-px hidden md:block"
            style={{ top: '2rem', left: '8%', right: '8%' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-full h-px"
              style={{ background: '#CCFF00' }}
            />
            {/* Moving spirit along the line */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: activeStep ? `${((activeStep - 1) / 5) * 100}%` : '0%' }}
              animate={{ left: activeStep ? `${((activeStep - 1) / 5) * 100}%` : ['0%', '100%', '0%'] }}
              transition={activeStep ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] } : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ZadaSpirit size={36} color="#CCFF00" floatDelay={0} showSparkle={false} />
            </motion.div>
          </motion.div>

          {/* Step nodes */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-2">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center gap-3 cursor-pointer"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.55 }}
                onMouseEnter={() => handleStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
                role="button"
                tabIndex={0}
                aria-label={`Loop step ${step.id}: ${step.label}`}
                onFocus={() => handleStep(step.id)}
                onBlur={() => setActiveStep(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleStep(step.id)
                }}
              >
                {/* Node circle */}
                <motion.div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: activeStep === step.id ? `${step.color}20` : 'rgba(15,12,26,0.9)',
                    border: `2px solid ${activeStep === step.id ? step.color : step.color + '35'}`,
                    transition: 'all 0.25s ease',
                  }}
                  whileHover={{
                    boxShadow: `0 0 24px ${step.color}40`,
                    scale: 1.1,
                  }}
                >
                  {step.icon}
                  {/* Number badge */}
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-heading font-bold text-xs"
                    style={{
                      background: activeStep === step.id ? step.color : 'rgba(37,32,53,0.9)',
                      color: activeStep === step.id ? '#05030A' : step.color,
                      border: `1px solid ${step.color}60`,
                    }}
                  >
                    {step.id}
                  </span>
                </motion.div>

                {/* Label */}
                <div className="text-center">
                  <p
                    className="font-heading font-bold text-xs leading-tight"
                    style={{ color: activeStep === step.id ? step.color : '#F2F0EF' }}
                  >
                    {step.label}
                  </p>
                  <AnimatePresence>
                    {activeStep === step.id && (
                      <motion.p
                        className="font-body text-xs mt-0.5"
                        style={{ color: `${step.color}90` }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {step.id === 5 ? `+${xpCount}` : step.sub}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Badge unlock */}
        <AnimatePresence>
          {badgeUnlocked && (
            <motion.div
              className="mt-10 flex items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="px-6 py-3 rounded-2xl flex items-center gap-3 font-heading font-bold text-base"
                style={{
                  background: 'rgba(204,255,0,0.12)',
                  border: '1.5px solid rgba(204,255,0,0.4)',
                  color: '#CCFF00',
                }}
                animate={{ boxShadow: ['0 0 20px rgba(204,255,0,0.2)', '0 0 40px rgba(204,255,0,0.4)', '0 0 20px rgba(204,255,0,0.2)'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M9 1L11 6.5H17L12.5 10L14 16L9 13L4 16L5.5 10L1 6.5H7Z" fill="#CCFF00" />
                </svg>
                Rank unlocked — Scout
              </motion.div>
              <ZadaSpirit size={40} color="#CCFF00" showSparkle />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
