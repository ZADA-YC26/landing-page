import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ZadaSpirit from './ZadaSpirit'

const UI_CARDS = [
  {
    title: 'Quest nearby',
    subtitle: '3 available right now',
    color: '#CCFF00',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="#CCFF00" strokeWidth="1.5" opacity="0.4" />
        <circle cx="10" cy="10" r="3" fill="#CCFF00" />
        <path d="M10 3V1M10 19v-2M3 10H1M19 10h-2" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    badge: null,
    detail: '2 min away',
  },
  {
    title: 'Pick your mood',
    subtitle: 'Solo · Group · Time',
    color: '#CCFF00',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="#CCFF00" strokeWidth="1.5" opacity="0.4" />
        <path d="M7 12s1 2 3 2 3-2 3-2" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="7.5" cy="8.5" r="1.2" fill="#CCFF00" />
        <circle cx="12.5" cy="8.5" r="1.2" fill="#CCFF00" />
      </svg>
    ),
    badge: null,
    detail: 'Filters active',
  },
  {
    title: 'Upload proof',
    subtitle: 'Photo or short video',
    color: '#CCFF00',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="5" width="16" height="12" rx="3" stroke="#CCFF00" strokeWidth="1.5" opacity="0.5" />
        <circle cx="10" cy="11" r="3" stroke="#CCFF00" strokeWidth="1.5" />
        <path d="M7 5V4a1 1 0 011-1h4a1 1 0 011 1v1" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    badge: null,
    detail: 'Proof uploaded',
  },
  {
    title: 'Rank unlocked',
    subtitle: 'Explorer · 2,400 XP',
    color: '#CCFF00',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L12.5 7.5L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7.5Z" fill="#CCFF00" />
      </svg>
    ),
    badge: 'New',
    detail: '+320 XP earned',
  },
]

export default function ProductReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="product"
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="product-heading"
    >
      {/* Dramatic separator */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(204,255,0,0.3), transparent)' }} aria-hidden="true" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(204,255,0,0.07) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            className="font-body text-xs font-semibold tracking-[0.22em] uppercase mb-6"
            style={{ color: 'rgba(242,240,239,0.3)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
          >
            The reveal
          </motion.p>
          <motion.h2
            id="product-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ color: '#F2F0EF' }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            So what is{' '}
            <span style={{ color: '#CCFF00' }}>
              Zada?
            </span>
          </motion.h2>

          {/* Companion + tagline */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ZadaSpirit size={60} color="#CCFF00" floatDelay={0.5} />
            <div className="text-left">
              <p className="font-heading font-bold text-2xl md:text-3xl" style={{ color: '#F2F0EF' }}>
                Your travel spirit.
              </p>
              <p className="font-body text-sm" style={{ color: 'rgba(242,240,239,0.45)' }}>
                Always nearby. Never boring.
              </p>
            </div>
          </motion.div>

          <motion.p
            className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
            style={{ color: 'rgba(242,240,239,0.65)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            Open the app and Zada gives you nearby real-life quests based on where you are, how much time you have, and who you're with.
          </motion.p>

          <motion.p
            className="font-heading font-bold text-2xl"
            style={{ color: '#CCFF00' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            Less planning. More doing.
          </motion.p>
        </div>

        {/* UI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {UI_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              className="relative rounded-2xl p-4 flex flex-col gap-3"
              style={{
                background: 'rgba(15,12,26,0.8)',
                border: `1.5px solid ${card.color}25`,
                backdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                borderColor: `${card.color}55`,
                boxShadow: `0 0 24px ${card.color}20`,
                scale: 1.02,
              }}
            >
              {card.badge && (
                <span
                  className="absolute -top-2 -right-2 font-body text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: card.color, color: '#05030A' }}
                >
                  {card.badge}
                </span>
              )}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
              >
                {card.icon}
              </div>
              <div>
                <p className="font-heading font-bold text-sm mb-0.5" style={{ color: '#F2F0EF' }}>
                  {card.title}
                </p>
                <p className="font-body text-xs" style={{ color: 'rgba(242,240,239,0.4)' }}>
                  {card.subtitle}
                </p>
              </div>
              <div
                className="mt-auto text-xs font-body px-2.5 py-1 rounded-full self-start"
                style={{ background: `${card.color}15`, color: card.color }}
              >
                {card.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
