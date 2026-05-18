import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MEMORIES = [
  {
    id: 'm1',
    quest: 'Sunset Sprint',
    location: 'Lisbon, PT',
    xp: '+250 XP',
    date: 'May 2',
    friends: ['M', 'N'],
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0.04) 100%)',
  },
  {
    id: 'm2',
    quest: '€5 Taste Test',
    location: 'Porto, PT',
    xp: '+120 XP',
    date: 'Apr 28',
    friends: ['S'],
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.04) 100%)',
  },
  {
    id: 'm3',
    quest: 'Hidden Corner',
    location: 'Barcelona, ES',
    xp: '+200 XP',
    date: 'Apr 20',
    friends: ['M', 'S', 'L'],
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0.03) 100%)',
  },
  {
    id: 'm4',
    quest: 'Stranger Tip',
    location: 'Amsterdam, NL',
    xp: '+150 XP',
    date: 'Apr 14',
    friends: ['N'],
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.04) 100%)',
  },
  {
    id: 'm5',
    quest: 'Album Cover Shot',
    location: 'Prague, CZ',
    xp: '+180 XP',
    date: 'Apr 8',
    friends: ['M', 'L'],
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.03) 100%)',
  },
  {
    id: 'm6',
    quest: 'Wrong Turn Rule',
    location: 'Berlin, DE',
    xp: '+100 XP',
    date: 'Mar 30',
    friends: ['S', 'N', 'M'],
    color: '#00E5FF',
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.10) 0%, rgba(0,229,255,0.03) 100%)',
  },
]

function MemoryCard({ mem, index }: { mem: (typeof MEMORIES)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: mem.gradient,
        border: `1px solid ${mem.color}25`,
        minHeight: 180,
      }}
      initial={{ opacity: 0, y: 30, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025, borderColor: `${mem.color}55` }}
    >
      {/* Proof image placeholder */}
      <div
        className="h-24 w-full relative overflow-hidden"
        style={{ background: `${mem.color}08` }}
        aria-label={`Proof photo for ${mem.quest}`}
      >
        {/* Abstract proof visual */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 96" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id={`proof-${mem.id}`} cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor={mem.color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={mem.color} stopOpacity="0.02" />
            </radialGradient>
          </defs>
          <rect width="300" height="96" fill={`url(#proof-${mem.id})`} />
          {/* Abstract shapes — city silhouette */}
          <rect x="20" y="40" width="30" height="56" rx="2" fill={mem.color} opacity="0.07" />
          <rect x="60" y="30" width="20" height="66" rx="2" fill={mem.color} opacity="0.07" />
          <rect x="90" y="50" width="40" height="46" rx="2" fill={mem.color} opacity="0.05" />
          <rect x="145" y="35" width="25" height="61" rx="2" fill={mem.color} opacity="0.06" />
          <rect x="185" y="45" width="35" height="51" rx="2" fill={mem.color} opacity="0.05" />
          <rect x="235" y="25" width="20" height="71" rx="2" fill={mem.color} opacity="0.07" />
          <rect x="265" y="55" width="25" height="41" rx="2" fill={mem.color} opacity="0.04" />
        </svg>

        {/* Camera icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(5,3,10,0.6)', border: `1px solid ${mem.color}40` }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="1" y="4" width="14" height="10" rx="2" stroke={mem.color} strokeWidth="1.2" opacity="0.8" />
              <circle cx="8" cy="9" r="2.5" stroke={mem.color} strokeWidth="1.2" opacity="0.8" />
              <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke={mem.color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Proof uploaded chip */}
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded-full font-body text-xs font-semibold"
          style={{ background: 'rgba(5,3,10,0.75)', color: mem.color, border: `1px solid ${mem.color}40` }}
        >
          proof uploaded
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <p className="font-heading font-bold text-sm" style={{ color: '#F2F0EF' }}>
            {mem.quest}
          </p>
          <span className="font-heading font-bold text-xs" style={{ color: mem.color }}>
            {mem.xp}
          </span>
        </div>
        <p className="font-body text-xs mb-3" style={{ color: 'rgba(242,240,239,0.4)' }}>
          {mem.location} · {mem.date}
        </p>
        <div className="flex items-center gap-2">
          {/* Friend avatars */}
          <div className="flex">
            {mem.friends.map((f, i) => (
              <div
                key={i}
                style={{
                  marginLeft: i > 0 ? -6 : 0,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: `${mem.color}25`,
                  border: `1.5px solid ${mem.color}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: 'Inter, sans-serif',
                  color: mem.color,
                  zIndex: mem.friends.length - i,
                }}
              >
                {f}
              </div>
            ))}
          </div>
          {mem.friends.length > 0 && (
            <span className="font-body text-xs" style={{ color: 'rgba(242,240,239,0.3)' }}>
              {mem.friends.length} there
            </span>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 20px ${mem.color}15` }}
      />
    </motion.div>
  )
}

export default function ProofMemoryTrail() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="memories"
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="memory-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)' }} aria-hidden="true" />

      <div
        className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="font-body text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: '#00E5FF' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
          >
            Memory trail
          </motion.p>
          <motion.h2
            id="memory-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl mb-6"
            style={{ color: '#F2F0EF' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            Proof you{' '}
            <span style={{ color: '#00E5FF' }}>
              actually lived it.
            </span>
          </motion.h2>
          <motion.p
            className="font-body text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(242,240,239,0.55)' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Every quest ends with a small piece of evidence. Over time, your map becomes a memory trail.
          </motion.p>
        </div>

        {/* Route connector line */}
        <motion.div
          className="relative mb-8 overflow-hidden h-px"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="h-full w-full"
            style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }}
          />
        </motion.div>

        {/* Memory grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MEMORIES.map((mem, i) => (
            <MemoryCard key={mem.id} mem={mem} index={i} />
          ))}
        </div>

        <motion.p
          className="text-center font-body text-sm mt-10"
          style={{ color: 'rgba(242,240,239,0.25)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Your trail grows with every quest you finish.
        </motion.p>
      </div>
    </section>
  )
}
