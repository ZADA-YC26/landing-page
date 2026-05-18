import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const RANKS = [
  {
    id: 1,
    name: 'Spark',
    meaning: 'The journey begins. The city is waiting.',
    xpRange: '0 – 500 XP',
    color: '#5E566E',
    spiritDots: 1,
    spiritGlow: false,
    perks: ['First quest unlocked', 'City explorer mode'],
  },
  {
    id: 2,
    name: 'Scout',
    meaning: 'First steps taken. You are no longer a tourist.',
    xpRange: '500 – 1,500 XP',
    color: '#00E5FF',
    spiritDots: 2,
    spiritGlow: false,
    perks: ['Social quests unlocked', '+20% XP on group quests'],
  },
  {
    id: 3,
    name: 'Explorer',
    meaning: 'You know the city a little better now.',
    xpRange: '1,500 – 4,000 XP',
    color: '#9D00FF',
    spiritDots: 3,
    spiritGlow: true,
    perks: ['City guides unlocked', 'Group quest leader'],
  },
  {
    id: 4,
    name: 'Adventurer',
    meaning: 'Quests completed. Legends in the making.',
    xpRange: '4,000 – 9,000 XP',
    color: '#CCFF00',
    spiritDots: 4,
    spiritGlow: true,
    perks: ['Exclusive city quests', 'Companion visual upgrade'],
  },
  {
    id: 5,
    name: 'Trailblazer',
    meaning: 'You lead the way. Others follow your route.',
    xpRange: '9,000 – 20,000 XP',
    color: '#00E5FF',
    spiritDots: 5,
    spiritGlow: true,
    perks: ['Community quest creation', 'Trailblazer badge'],
  },
  {
    id: 6,
    name: 'Legend',
    meaning: 'A true city legend. Your story inspires others.',
    xpRange: '20,000+ XP',
    color: '#CCFF00',
    spiritDots: 6,
    spiritGlow: true,
    perks: ['Legend status', 'City story featured', 'Unlimited quests'],
  },
]

function RankSpirit({ rank, size = 52 }: { rank: (typeof RANKS)[0]; size?: number }) {
  const { color, id, spiritGlow, spiritDots } = rank
  const g1 = Math.round(size * 0.1)
  const g2 = Math.round(size * 0.22)
  const g3 = Math.round(size * 0.44)

  const baseFilter = id === 1
    ? `grayscale(55%) brightness(0.55) drop-shadow(0 0 ${g1}px ${color}60)`
    : spiritGlow
      ? `drop-shadow(0 0 ${g1}px ${color}) drop-shadow(0 0 ${g2}px ${color}90) drop-shadow(0 0 ${g3}px ${color}40)`
      : `drop-shadow(0 0 ${g1}px ${color}90) drop-shadow(0 0 ${g2}px ${color}45)`

  const haloOuter = id === 1 ? '0A' : spiritGlow ? '20' : '10'
  const haloInner = id === 1 ? '06' : spiritGlow ? '2A' : '14'

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Outer bloom */}
      <div style={{
        position: 'absolute',
        inset: '-55%',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}${haloOuter} 0%, transparent 65%)`,
        filter: 'blur(8px)',
        pointerEvents: 'none',
      }} />
      {/* Inner core glow */}
      {spiritGlow && (
        <div style={{
          position: 'absolute',
          inset: '-18%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color}${haloInner} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
      )}

      {/* The Zada icon */}
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
          filter: id === 6 ? undefined : baseFilter,
          animation: id === 6 ? 'legend-pulse 3s ease-in-out infinite' : undefined,
        }}
      />

      {/* Sparkle dots — upper right quadrant, scales with rank */}
      {spiritDots >= 2 && (
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 2 }}
          aria-hidden="true"
        >
          {spiritDots >= 2 && <circle cx={size * 0.86} cy={size * 0.02} r={2.4} fill={color} opacity="0.82" />}
          {spiritDots >= 3 && <circle cx={size * 1.08} cy={size * 0.22} r={1.8} fill={color} opacity="0.65" />}
          {spiritDots >= 4 && <circle cx={size * 0.96} cy={size * 0.46} r={1.5} fill={color} opacity="0.55" />}
          {spiritDots >= 5 && <circle cx={size * 1.14} cy={size * 0.06} r={1.2} fill={color} opacity="0.72" />}
          {spiritDots >= 6 && <circle cx={size * 1.06} cy={size * 0.65} r={1.0} fill={color} opacity="0.45" />}
        </svg>
      )}

      {/* Crown for Legend */}
      {id === 6 && (
        <svg
          viewBox="0 0 36 20"
          width={size * 0.72}
          height={size * 0.44}
          style={{
            position: 'absolute',
            top: `${-size * 0.32}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 3,
            overflow: 'visible',
          }}
          aria-hidden="true"
        >
          <path
            d="M2 18 L8 5 L18 10 L28 5 L34 18 Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill={`${color}18`}
            filter={`drop-shadow(0 0 3px ${color})`}
          />
          <circle cx="2"  cy="18" r="2"   fill={color} />
          <circle cx="18" cy="10" r="2"   fill={color} />
          <circle cx="34" cy="18" r="2"   fill={color} />
          <circle cx="8"  cy="5"  r="1.4" fill={color} opacity="0.8" />
          <circle cx="28" cy="5"  r="1.4" fill={color} opacity="0.8" />
        </svg>
      )}

      {/* Aura ring for Trailblazer + Legend */}
      {id >= 5 && (
        <div style={{
          position: 'absolute',
          inset: id === 6 ? '-7px' : '-3px',
          borderRadius: '50%',
          border: `1px solid ${color}${id === 6 ? '45' : '28'}`,
          pointerEvents: 'none',
        }} />
      )}
    </div>
  )
}

export default function CompanionEvolution() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="evolution"
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="evolution-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(157,0,255,0.25), rgba(204,255,0,0.15), transparent)' }} aria-hidden="true" />

      <div
        className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(157,0,255,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="font-body text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: '#CCFF00' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Companion evolution
          </motion.p>
          <motion.h2
            id="evolution-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl mb-6"
            style={{ color: '#F2F0EF' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            A companion that grows{' '}
            <span style={{ color: '#CCFF00' }}>with your story.</span>
          </motion.h2>
          <motion.p
            className="font-body text-lg max-w-xl mx-auto mb-2"
            style={{ color: 'rgba(242,240,239,0.55)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Zada appears when quests are near, celebrates your progress, and evolves as you explore.
          </motion.p>
          <motion.p
            className="font-body text-sm"
            style={{ color: 'rgba(242,240,239,0.3)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Not a score. A trace of where you dared to go.
          </motion.p>
        </div>

        {/* Rank cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {RANKS.map((rank, i) => (
            <motion.div
              key={rank.id}
              role="button"
              tabIndex={0}
              aria-label={`Rank ${rank.id}: ${rank.name}`}
              className="relative rounded-2xl p-4 flex flex-col items-center gap-3 cursor-pointer outline-none focus-visible:ring-2"
              style={{
                background: active === rank.id ? `${rank.color}10` : 'rgba(15,12,26,0.8)',
                border: `1.5px solid ${active === rank.id ? rank.color + '55' : rank.color + '20'}`,
                transition: 'all 0.25s ease',
              }}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                scale: 1.04,
                boxShadow: `0 0 28px ${rank.color}28`,
              }}
              onMouseEnter={() => setActive(rank.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(rank.id)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(active === rank.id ? null : rank.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActive(active === rank.id ? null : rank.id)
              }}
            >
              {/* Rank number */}
              <span
                className="absolute top-2 left-3 font-heading font-bold text-xs"
                style={{ color: `${rank.color}70` }}
              >
                0{rank.id}
              </span>

              {/* Spirit */}
              <motion.div
                className="mt-2"
                animate={active === rank.id ? { y: [-2, -8, -2] } : {}}
                transition={{ duration: 1.5, repeat: active === rank.id ? Infinity : 0, ease: 'easeInOut' }}
              >
                <RankSpirit rank={rank} size={50} />
              </motion.div>

              {/* Name */}
              <div className="text-center">
                <p
                  className="font-heading font-bold text-sm"
                  style={{ color: active === rank.id ? rank.color : '#F2F0EF' }}
                >
                  {rank.name}
                </p>
                <AnimatePresence>
                  {active === rank.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2"
                    >
                      <p className="font-body text-xs leading-snug" style={{ color: 'rgba(242,240,239,0.55)' }}>
                        {rank.meaning}
                      </p>
                      <p className="font-body text-xs mt-1.5" style={{ color: `${rank.color}80` }}>
                        {rank.xpRange}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active rank detail panel */}
        <AnimatePresence mode="wait">
          {active && (() => {
            const rank = RANKS.find((r) => r.id === active)!
            return (
              <motion.div
                key={active}
                className="mt-6 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
                style={{
                  background: `${rank.color}08`,
                  border: `1px solid ${rank.color}25`,
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-5 md:col-span-2">
                  <div className="flex-shrink-0">
                    <RankSpirit rank={rank} size={80} />
                  </div>
                  <div>
                    <span className="font-body text-xs" style={{ color: `${rank.color}80` }}>
                      Rank {rank.id} of 6
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl mb-1" style={{ color: rank.color }}>
                      {rank.name}
                    </h3>
                    <p className="font-body text-sm" style={{ color: 'rgba(242,240,239,0.6)' }}>
                      {rank.meaning}
                    </p>
                    <p className="font-body text-xs mt-1" style={{ color: 'rgba(242,240,239,0.3)' }}>
                      {rank.xpRange}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <p className="font-body text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(242,240,239,0.3)' }}>
                    Unlocks
                  </p>
                  {rank.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: rank.color }} />
                      <span className="font-body text-sm" style={{ color: 'rgba(242,240,239,0.6)' }}>
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        {/* Evolution progression bar */}
        <motion.div
          className="mt-8 flex items-center gap-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          aria-hidden="true"
        >
          {RANKS.map((rank, i) => (
            <div key={rank.id} className="flex-1 flex items-center">
              <div
                className="h-0.5 flex-1"
                style={{
                  background: i < (active ? active - 1 : 0)
                    ? rank.color
                    : 'rgba(37,32,53,0.8)',
                  transition: 'background 0.4s ease',
                }}
              />
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: active && active >= rank.id ? rank.color : 'rgba(37,32,53,0.8)',
                  boxShadow: active && active >= rank.id ? `0 0 8px ${rank.color}80` : 'none',
                  transition: 'all 0.4s ease',
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
