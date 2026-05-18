import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ZadaSpirit from './ZadaSpirit'

const HUD_TAGS = [
  { id: 't1', label: 'hidden corner', x: '12%', y: '22%', color: '#9D00FF', quest: { title: 'Secret View Quest', desc: 'Find the spot locals never share with tourists.', xp: '+200 XP' } },
  { id: 't2', label: 'local snack', x: '58%', y: '15%', color: '#9D00FF', quest: { title: 'Taste the City', desc: 'Order the cheapest thing on the chalkboard menu.', xp: '+90 XP' } },
  { id: 't3', label: 'sunset angle', x: '80%', y: '40%', color: '#9D00FF', quest: { title: 'Golden Hour Shot', desc: 'Photograph the light at its exact peak. No filters.', xp: '+180 XP' } },
  { id: 't4', label: 'stranger tip', x: '25%', y: '65%', color: '#9D00FF', quest: { title: 'Ask a Local', desc: 'Get a recommendation from someone who lives here. Use it.', xp: '+150 XP' } },
  { id: 't5', label: 'proof moment', x: '68%', y: '72%', color: '#9D00FF', quest: { title: 'Album Cover Quest', desc: 'Take a photo that looks like it belongs on a music cover.', xp: '+150 XP' } },
  { id: 't6', label: 'XP reward', x: '40%', y: '45%', color: '#9D00FF', quest: { title: 'The Lost Route', desc: 'Walk a street you\'ve never noticed before. Document it.', xp: '+120 XP' } },
]

function CityBackground() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="street-v" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A1628" stopOpacity="0" />
          <stop offset="50%" stopColor="#1A1628" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1A1628" stopOpacity="0" />
        </linearGradient>
        <filter id="hud-glow" x="-40%" y="-100%" width="180%" height="300%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Abstract street blocks */}
      <rect x="50" y="60" width="120" height="80" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />
      <rect x="200" y="40" width="80" height="110" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />
      <rect x="320" y="70" width="140" height="70" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />
      <rect x="500" y="50" width="90" height="100" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />
      <rect x="620" y="40" width="60" height="90" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />
      <rect x="50" y="200" width="100" height="90" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />
      <rect x="190" y="210" width="140" height="70" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />
      <rect x="380" y="200" width="110" height="90" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />
      <rect x="530" y="215" width="80" height="60" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />
      <rect x="640" y="200" width="50" height="80" rx="4" fill="#0F0C1A" stroke="#1A1628" strokeWidth="1" />

      {/* Streets */}
      <rect x="0" y="160" width="700" height="24" fill="#0A0814" stroke="#1A1628" strokeWidth="0.5" />
      <rect x="170" y="0" width="20" height="420" fill="#0A0814" stroke="#1A1628" strokeWidth="0.5" />
      <rect x="490" y="0" width="18" height="420" fill="#0A0814" stroke="#1A1628" strokeWidth="0.5" />

      {/* Street dashes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={i * 90 + 20} y="170" width="50" height="4" rx="2" fill="#252035" />
      ))}

      {/* Route connecting tags */}
      <motion.path
        d="M 84 92 Q 170 172 260 182 Q 380 195 476 300 Q 560 360 700 380"
        stroke="#9D00FF"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 4"
        strokeLinecap="round"
        opacity="0.3"
        filter="url(#hud-glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Vertical fade overlay */}
      <rect x="0" y="0" width="700" height="420" fill="url(#street-v)" />
    </svg>
  )
}

export default function PlayfulChapter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [badgeBurst, setBadgeBurst] = useState(false)

  const activeQuest = HUD_TAGS.find((t) => t.id === activeTag)

  const handleTag = (id: string) => {
    setActiveTag(activeTag === id ? null : id)
    setBadgeBurst(false)
    setTimeout(() => setBadgeBurst(true), 200)
  }

  return (
    <section
      id="playful"
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="playful-heading"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-acid-lime/30 to-transparent" aria-hidden="true" />

      {/* Ambient */}
      <div
        className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(157,0,255,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            className="font-body text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: '#9D00FF' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Chapter 03 — Playful
          </motion.p>
          <motion.h2
            id="playful-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ color: '#F2F0EF' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            The city has{' '}
            <span style={{ color: '#9D00FF' }}>
              side quests.
            </span>
          </motion.h2>
          <motion.p
            className="font-body text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(242,240,239,0.55)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A street becomes a challenge. A snack becomes a trophy. A wrong turn becomes part of the story.
          </motion.p>
        </div>

        {/* City HUD scene */}
        <motion.div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: '#07051080',
            border: '1px solid rgba(37,32,53,0.7)',
            minHeight: 380,
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          aria-label="Interactive city map with quest tags"
        >
          <CityBackground />

          {/* HUD instruction */}
          <div className="absolute top-4 left-4 z-20">
            <span
              className="font-body text-xs px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(5,3,10,0.8)', border: '1px solid rgba(37,32,53,0.8)', color: 'rgba(242,240,239,0.4)' }}
            >
              Tap a tag to reveal quest
            </span>
          </div>

          {/* ZadaSpirit floating around */}
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{ top: '30%', left: '45%' }}
            animate={{
              x: activeTag ? [0, 20, 0] : [0, 10, -10, 0],
              y: activeTag ? [0, -15, 0] : [0, -8, 4, 0],
            }}
            transition={{ duration: activeTag ? 0.8 : 6, ease: 'easeInOut', repeat: activeTag ? 0 : Infinity }}
          >
            <ZadaSpirit size={48} color="#9D00FF" floatDelay={0} />
          </motion.div>

          {/* HUD Tags */}
          {HUD_TAGS.map((tag, i) => (
            <motion.button
              key={tag.id}
              className="absolute z-20 cursor-pointer"
              style={{ left: tag.x, top: tag.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => handleTag(tag.id)}
              aria-label={`Quest tag: ${tag.label}`}
              aria-expanded={activeTag === tag.id}
            >
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: activeTag === tag.id ? `${tag.color}20` : 'rgba(5,3,10,0.75)',
                  border: `1px solid ${activeTag === tag.id ? tag.color + '60' : tag.color + '35'}`,
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
              >
                {/* Pulse dot */}
                <motion.div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: tag.color }}
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.8 + i * 0.3, repeat: Infinity }}
                />
                <span className="font-body text-xs font-semibold" style={{ color: tag.color }}>
                  {tag.label}
                </span>
              </motion.div>
            </motion.button>
          ))}

          {/* XP counter */}
          <div className="absolute bottom-4 left-4 z-20">
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full font-heading font-bold text-sm"
              style={{
                background: 'rgba(5,3,10,0.85)',
                border: '1px solid rgba(157,0,255,0.25)',
                color: '#9D00FF',
              }}
              animate={badgeBurst ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5Z" fill="#9D00FF" />
              </svg>
              {activeTag ? HUD_TAGS.find((t) => t.id === activeTag)?.quest.xp ?? '+XP' : 'XP available'}
            </motion.div>
          </div>
        </motion.div>

        {/* Active quest card */}
        <AnimatePresence mode="wait">
          {activeQuest && (
            <motion.div
              key={activeTag}
              className="mt-6 rounded-2xl p-5 flex items-start gap-4"
              style={{
                background: `${activeQuest.color}10`,
                border: `1.5px solid ${activeQuest.color}35`,
                backdropFilter: 'blur(12px)',
              }}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ZadaSpirit size={44} color={activeQuest.color} showSparkle floatDelay={0} />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-body text-xs px-2 py-0.5 rounded-full" style={{ background: `${activeQuest.color}20`, color: activeQuest.color }}>
                    Quest nearby
                  </span>
                  <span className="font-heading font-bold text-sm" style={{ color: activeQuest.color }}>
                    {activeQuest.quest.xp}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-1" style={{ color: '#F2F0EF' }}>
                  {activeQuest.quest.title}
                </h3>
                <p className="font-body text-sm" style={{ color: 'rgba(242,240,239,0.55)' }}>
                  {activeQuest.quest.desc}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
