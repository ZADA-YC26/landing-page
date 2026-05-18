import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const CATEGORIES = ['All', 'Social', 'Explorer', 'Food', 'Creative', 'Cultural']

const dares = [
  {
    category: 'Social',
    difficulty: 'Medium',
    xp: 150,
    color: '#00E5FF',
    title: 'Local Name Drop',
    desc: 'Ask 3 strangers to teach you a word in their dialect. Use all three in the same sentence.',
    badge: '🗣',
  },
  {
    category: 'Explorer',
    difficulty: 'Hard',
    xp: 300,
    color: '#9D00FF',
    title: 'Hidden Staircase',
    desc: 'Find a staircase in the city that leads somewhere unexpected. No Google — ask a local.',
    badge: '🗺',
  },
  {
    category: 'Food',
    difficulty: 'Easy',
    xp: 100,
    color: '#CCFF00',
    title: 'Blind Order',
    desc: 'Walk into a local restaurant and point at a random item on the menu. Eat it. No swaps.',
    badge: '🍽',
  },
  {
    category: 'Creative',
    difficulty: 'Medium',
    xp: 200,
    color: '#9D00FF',
    title: 'Shadow Portrait',
    desc: 'Photograph your shadow in 5 different recognizable landmarks of the city.',
    badge: '📸',
  },
  {
    category: 'Cultural',
    difficulty: 'Medium',
    xp: 180,
    color: '#00E5FF',
    title: 'Market Barter',
    desc: 'At a local market, try to negotiate the price of something — in the local language. Even badly.',
    badge: '🏪',
  },
  {
    category: 'Social',
    difficulty: 'Hard',
    xp: 280,
    color: '#CCFF00',
    title: 'Invitation Accepted',
    desc: 'Accept the first spontaneous social invitation you receive in the city today.',
    badge: '🤝',
  },
]

const difficultyColors: Record<string, string> = {
  Easy: 'text-sem-success',
  Medium: 'text-sem-warning',
  Hard: 'text-sem-danger',
}

export default function DareFeed() {
  const [active, setActive] = useState('All')
  const [flipped, setFlipped] = useState<string | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = active === 'All' ? dares : dares.filter((d) => d.category === active)

  return (
    <section id="dares" ref={ref} className="relative py-28 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 20% 60%, rgba(0,229,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-neon-cyan text-xs font-medium tracking-[0.2em] uppercase mb-4"
        >
          The Dares
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-5xl font-bold text-center text-white mb-5 leading-tight"
        >
          50+ challenges. Zero
          <br />
          <span className="text-gradient-cyan">excuses to stay in.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-muted text-center mb-10 max-w-lg mx-auto"
        >
          Flip a card to reveal the dare. Hover for XP reward.
        </motion.p>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                active === cat
                  ? 'bg-acid-lime text-near-black'
                  : 'bg-s2 text-muted hover:text-white border border-s3/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Dare cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((dare, i) => (
              <motion.div
                key={dare.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{ perspective: 1000 }}
                className="cursor-pointer"
                onClick={() => setFlipped(flipped === dare.title ? null : dare.title)}
              >
                <motion.div
                  animate={{ rotateY: flipped === dare.title ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div
                    className="bg-s1 border border-s3/50 rounded-2xl p-6 h-48 flex flex-col justify-between hover:border-opacity-80 transition-all duration-300 group"
                    style={{ backfaceVisibility: 'hidden', borderColor: `${dare.color}30` }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${dare.color}60`)}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${dare.color}30`)}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: `${dare.color}20`, color: dare.color }}
                      >
                        {dare.category}
                      </span>
                      <div className="text-right">
                        <span className={`text-xs font-medium ${difficultyColors[dare.difficulty]}`}>
                          {dare.difficulty}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-lg mb-1">{dare.title}</h3>
                      <p className="text-muted text-xs">Tap to reveal dare →</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-subtle">+{dare.xp} XP</span>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                        style={{ background: `${dare.color}20` }}
                      >
                        {dare.badge}
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 bg-s2 rounded-2xl p-6 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: `${dare.color}50`,
                    }}
                  >
                    <div
                      className="text-xs font-medium px-2.5 py-1 rounded-full self-start"
                      style={{ background: `${dare.color}20`, color: dare.color }}
                    >
                      Dare Revealed
                    </div>
                    <p className="text-white text-sm leading-relaxed font-medium">{dare.desc}</p>
                    <div className="flex items-center gap-2">
                      <span style={{ color: dare.color }} className="font-heading font-bold text-sm">
                        +{dare.xp} XP
                      </span>
                      <span className="text-muted text-xs">on completion</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
