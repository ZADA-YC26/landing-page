import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ZadaSpirit from './ZadaSpirit'

const SITUATION = [
  { label: 'time left', value: '47 min', color: '#CCFF00' },
  { label: 'zone', value: 'Old Town', color: '#CCFF00' },
  { label: 'mood', value: 'restless', color: '#CCFF00' },
  { label: 'sunset', value: 'soon', color: '#CCFF00' },
]

const QUESTS = [
  {
    id: 'q1',
    title: 'Chase the Last Light',
    desc: 'Reach a sunset spot before the sky changes.',
    xp: '+250 XP',
    color: '#CCFF00',
    tag: 'Solo',
    difficulty: 'Medium',
  },
  {
    id: 'q2',
    title: 'The €5 Taste Test',
    desc: 'Find a snack none of you have tried before.',
    xp: '+120 XP',
    color: '#CCFF00',
    tag: 'Group',
    difficulty: 'Easy',
  },
  {
    id: 'q3',
    title: 'Wrong Turn Rule',
    desc: 'Take the next street you would normally ignore.',
    xp: '+100 XP',
    color: '#CCFF00',
    tag: 'Solo',
    difficulty: 'Easy',
  },
]

function QuestCard({
  quest,
  index,
  selected,
  onSelect,
}: {
  quest: (typeof QUESTS)[0]
  index: number
  selected: boolean
  onSelect: () => void
}) {
  const [tilted, setTilted] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    setTilted({ x, y })
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`Quest: ${quest.title}`}
      className="relative rounded-2xl p-5 cursor-pointer outline-none focus-visible:ring-2"
      style={{
        background: selected
          ? `${quest.color}18`
          : 'rgba(15,12,26,0.8)',
        border: `1.5px solid ${selected ? quest.color + '60' : 'rgba(37,32,53,0.8)'}`,
        backdropFilter: 'blur(12px)',
        transformStyle: 'preserve-3d',
        perspective: '600px',
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.6 + index * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotateX: tilted.y, rotateY: tilted.x, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTilted({ x: 0, y: 0 })}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? onSelect() : null}
    >
      {/* Glow border on selection */}
      {selected && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: `0 0 24px ${quest.color}40, 0 0 48px ${quest.color}15` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="flex items-start justify-between mb-3">
        <span
          className="text-xs font-semibold font-body px-2.5 py-1 rounded-full"
          style={{ background: `${quest.color}20`, color: quest.color }}
        >
          {quest.tag}
        </span>
        <motion.span
          className="font-heading font-bold text-sm"
          style={{ color: quest.color }}
          animate={selected ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          {quest.xp}
        </motion.span>
      </div>

      <h3 className="font-heading font-bold text-lg mb-2" style={{ color: '#F2F0EF' }}>
        {quest.title}
      </h3>
      <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(242,240,239,0.55)' }}>
        {quest.desc}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs font-body" style={{ color: 'rgba(242,240,239,0.3)' }}>
          {quest.difficulty}
        </span>
        <AnimatePresence>
          {selected && (
            <motion.span
              className="text-xs font-semibold font-body px-2.5 py-1 rounded-full"
              style={{ background: '#05030A', border: `1px solid ${quest.color}50`, color: quest.color }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              Quest started
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Companion spark on selection */}
      {selected && (
        <motion.div
          className="absolute -top-4 -right-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <ZadaSpirit size={36} color={quest.color} showSparkle={false} />
        </motion.div>
      )}
    </motion.div>
  )
}

let timerInterval: ReturnType<typeof setInterval>

export default function SpontaneousChapter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null)
  const [seconds, setSeconds] = useState(47 * 60)
  const [shuffleKey, setShuffleKey] = useState(0)

  useEffect(() => {
    if (!inView) return
    timerInterval = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(timerInterval)
  }, [inView])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  const shuffle = () => {
    setShuffleKey((k) => k + 1)
    setSelectedQuest(null)
  }

  return (
    <section
      id="spontaneous"
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="spontaneous-heading"
    >
      {/* Section separator glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-electric-violet/40 to-transparent" aria-hidden="true" />

      {/* Background ambient */}
      <div
        className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            className="font-body text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: '#CCFF00' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Chapter 01 — Spontaneous
          </motion.p>
          <motion.h2
            id="spontaneous-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ color: '#F2F0EF' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            No plan.{' '}
            <span style={{ color: '#CCFF00' }}>
              Just a pulse.
            </span>
          </motion.h2>
          <motion.p
            className="font-body text-lg max-w-lg mx-auto"
            style={{ color: 'rgba(242,240,239,0.55)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Zada appears in the moment between "what now?" and "let's go."
          </motion.p>
        </div>

        {/* Live moment scenario */}
        <motion.div
          className="rounded-3xl p-6 md:p-8 mb-8"
          style={{
            background: 'rgba(15,12,26,0.7)',
            border: '1px solid rgba(37,32,53,0.8)',
            backdropFilter: 'blur(16px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="flex flex-wrap gap-3 mb-6">
            {SITUATION.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: `${s.color}12`, border: `1px solid ${s.color}30` }}
              >
                <span className="font-body text-xs" style={{ color: 'rgba(242,240,239,0.4)' }}>{s.label}</span>
                <span className="font-heading font-bold text-sm" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}

            {/* Live timer */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(204,255,0,0.08)', border: '1px solid rgba(204,255,0,0.25)' }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#CCFF00' }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="font-heading font-bold text-sm tabular-nums" style={{ color: '#CCFF00' }}>
                {mm}:{ss}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <p className="font-heading font-semibold text-base" style={{ color: '#F2F0EF' }}>
              Zada found 3 quests for right now.
            </p>
            <button
              onClick={shuffle}
              aria-label="Shuffle quests"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold font-body cursor-pointer transition-all duration-200"
              style={{
                background: 'rgba(204,255,0,0.12)',
                border: '1px solid rgba(204,255,0,0.3)',
                color: '#CCFF00',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4C2 4 3 2 6 2C8.5 2 10 4 10 4M10 4L8 2M10 4L8 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 8C10 8 9 10 6 10C3.5 10 2 8 2 8M2 8L4 10M2 8L4 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Shuffle
            </button>
          </div>

          {/* Animated route line between quests */}
          <motion.div
            className="w-full h-px mb-6 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(204,255,0,0.3), rgba(204,255,0,0.3), transparent)' }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Quest cards */}
          <div key={shuffleKey} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {QUESTS.map((quest, i) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                index={i}
                selected={selectedQuest === quest.id}
                onSelect={() => setSelectedQuest(selectedQuest === quest.id ? null : quest.id)}
              />
            ))}
          </div>

          {/* XP chip appears when quest selected */}
          <AnimatePresence>
            {selectedQuest && (
              <motion.div
                className="mt-6 flex items-center gap-3 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <div
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-semibold"
                  style={{ background: 'rgba(204,255,0,0.12)', border: '1px solid rgba(204,255,0,0.3)', color: '#CCFF00' }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#CCFF00' }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                  Quest activated — go outside
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          className="text-center font-body text-sm"
          style={{ color: 'rgba(242,240,239,0.3)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Less planning. More doing.
        </motion.p>
      </div>
    </section>
  )
}
