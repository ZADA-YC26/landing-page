import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const ranks = [
  {
    name: 'Spark',
    level: 1,
    xpRequired: 0,
    xpMax: 500,
    color: '#A09BBF',
    gradientFrom: '#6B6680',
    gradientTo: '#A09BBF',
    desc: 'Every legend starts with a spark. Your first dare awaits.',
    perks: ['First dare unlocked', 'City explorer mode'],
    icon: SparkIcon,
  },
  {
    name: 'Scout',
    level: 2,
    xpRequired: 500,
    xpMax: 1500,
    color: '#00E5FF',
    gradientFrom: '#0088aa',
    gradientTo: '#00E5FF',
    desc: 'You\'re finding your footing. The real adventure is just beginning.',
    perks: ['Social dares unlocked', '+20% XP bonus'],
    icon: ScoutIcon,
  },
  {
    name: 'Explorer',
    level: 3,
    xpRequired: 1500,
    xpMax: 3500,
    color: '#38BDF8',
    gradientFrom: '#00E5FF',
    gradientTo: '#9D00FF',
    desc: 'You go beyond the tourist trail. Cities bend to your curiosity.',
    perks: ['Hidden spots mode', 'Custom dare sets'],
    icon: ExplorerIcon,
  },
  {
    name: 'Adventurer',
    level: 4,
    xpRequired: 3500,
    xpMax: 7000,
    color: '#9D00FF',
    gradientFrom: '#7700CC',
    gradientTo: '#9D00FF',
    desc: 'Comfort zones are a distant memory. You live for the story.',
    perks: ['Challenge creation', 'Leaderboard access'],
    icon: AdventurerIcon,
  },
  {
    name: 'TrailBlazer',
    level: 5,
    xpRequired: 7000,
    xpMax: 15000,
    color: '#CCFF00',
    gradientFrom: '#88AA00',
    gradientTo: '#CCFF00',
    desc: 'You don\'t follow paths. You make them. Others call it inspiration.',
    perks: ['Monthly dare drops', 'Beta features access'],
    icon: TrailBlazerIcon,
  },
  {
    name: 'Legend',
    level: 6,
    xpRequired: 15000,
    xpMax: 15000,
    color: '#FFD700',
    gradientFrom: '#CCFF00',
    gradientTo: '#FFD700',
    desc: 'The rarest tier. Your Erasmus story will outlive the degree.',
    perks: ['Hall of Fame', 'Lifetime membership', 'IRL events'],
    icon: LegendIcon,
  },
]

export default function RankSystem() {
  const [activeRank, setActiveRank] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const rank = ranks[activeRank]

  return (
    <section id="ranks" ref={ref} className="relative py-28 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 70% 50%, ${rank.color}08 0%, transparent 70%)`,
          transition: 'background 0.5s ease',
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-electric-violet text-xs font-medium tracking-[0.2em] uppercase mb-4"
        >
          Rank System
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-5xl font-bold text-center text-white mb-5 leading-tight"
        >
          Six ranks. One journey.
          <br />
          <span className="text-gradient-lime">Become a Legend.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-muted text-center mb-14 max-w-lg mx-auto"
        >
          Every dare completed earns XP. Every XP brings you closer to the top.
        </motion.p>

        {/* Rank selector row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex gap-3 justify-center flex-wrap mb-10"
        >
          {ranks.map((r, i) => {
            const IconComp = r.icon
            return (
              <motion.button
                key={r.name}
                onClick={() => setActiveRank(i)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeRank === i
                    ? 'border-opacity-70 bg-s2'
                    : 'border-s3/30 hover:border-s3/60 bg-s1/50'
                }`}
                style={activeRank === i ? { borderColor: `${r.color}70` } : {}}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: activeRank === i
                      ? `linear-gradient(135deg, ${r.gradientFrom}30, ${r.gradientTo}20)`
                      : 'transparent',
                  }}
                >
                  <IconComp color={activeRank === i ? r.color : '#6B6680'} size={28} />
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: activeRank === i ? r.color : '#6B6680' }}
                >
                  {r.name}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Active rank detail */}
        <motion.div
          key={activeRank}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-s1 border rounded-3xl p-8 md:p-10"
          style={{ borderColor: `${rank.color}30` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: icon + info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${rank.gradientFrom}30, ${rank.gradientTo}20)`,
                    border: `1px solid ${rank.color}40`,
                  }}
                >
                  <rank.icon color={rank.color} size={44} />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-widest uppercase" style={{ color: rank.color }}>
                    Level {rank.level}
                  </p>
                  <h3 className="font-heading font-bold text-white text-3xl">{rank.name}</h3>
                </div>
              </div>
              <p className="text-subtle leading-relaxed mb-6">{rank.desc}</p>
              <div className="flex flex-col gap-2">
                {rank.perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 4" stroke={rank.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-subtle text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: XP bar + progress */}
            <div>
              <div className="bg-s2 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-muted text-sm">XP Required</span>
                  <span className="font-heading font-bold text-white">
                    {rank.xpRequired === 0 ? 'Starting' : `${rank.xpRequired.toLocaleString()} XP`}
                  </span>
                </div>

                {/* XP bar */}
                <div className="w-full h-3 bg-near-black rounded-full overflow-hidden mb-6">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: rank.xpRequired === 0 ? '5%' : `${(rank.level / 6) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${rank.gradientFrom}, ${rank.gradientTo})`,
                      boxShadow: `0 0 10px ${rank.color}60`,
                    }}
                  />
                </div>

                {/* Rank progression mini */}
                <div className="flex justify-between items-center">
                  {ranks.map((r, i) => (
                    <div
                      key={r.name}
                      className="flex flex-col items-center gap-1 cursor-pointer"
                      onClick={() => setActiveRank(i)}
                    >
                      <div
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          background: i <= activeRank ? rank.color : '#252035',
                          transform: i === activeRank ? 'scale(1.8)' : 'scale(1)',
                        }}
                      />
                      <span className="text-[10px] text-muted hidden sm:block">{r.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-s3/40">
                  <p className="text-muted text-xs text-center">
                    {rank.level < 6
                      ? `Complete ${Math.round((ranks[rank.level].xpRequired - rank.xpRequired) / 50)} more dares to reach ${ranks[rank.level].name}`
                      : 'You\'ve reached the highest rank. True Legend status.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* Rank SVG Icons */
function SparkIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4l2.5 7.5H26l-6 4.5 2.5 7.5L16 19l-6.5 4.5 2.5-7.5-6-4.5h7.5L16 4z" fill={color} opacity="0.9" />
    </svg>
  )
}

function ScoutIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="16" cy="16" r="4" fill={color} />
      <line x1="16" y1="4" x2="16" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="24" x2="16" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="16" x2="8" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="16" x2="28" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ExplorerIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 5C10 5 5 10 5 16s5 11 11 11 11-5 11-11S22 5 16 5z" stroke={color} strokeWidth="1.5" />
      <path d="M20 12l-5 3-3 5 5-3 3-5z" fill={color} />
      <circle cx="16" cy="16" r="1.5" fill={color} />
    </svg>
  )
}

function AdventurerIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M6 26l10-20 10 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 22h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 18l3-8 3 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function TrailBlazerIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M18 5l-7 12h6l-5 10 14-14h-7L18 5z" fill={color} />
    </svg>
  )
}

function LegendIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 4l2.5 6 6.5.5-5 4.5 1.5 6.5L16 18l-5.5 3.5 1.5-6.5-5-4.5 6.5-.5L16 4z" fill={color} />
      <path d="M10 24h12v2a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2z" stroke={color} strokeWidth="1.5" fill={`${color}30`} />
      <rect x="8" y="22" width="16" height="2" rx="1" fill={color} />
    </svg>
  )
}
