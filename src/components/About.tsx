import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '72%', label: 'of Erasmus students feel their trip was "less than expected"', color: '#9D00FF' },
  { value: '1 in 3', label: 'say they spent most of their time in tourist-trap areas', color: '#00E5FF' },
  { value: '91%', label: 'say shared challenges made them feel more connected to their city', color: '#CCFF00' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-32 px-4">
      {/* vertical glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-electric-violet/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Problem */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-electric-violet text-xs font-medium tracking-[0.2em] uppercase mb-5"
            >
              The problem
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-6"
            >
              Erasmus is supposed
              <br />
              to be{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #9D00FF, #00E5FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                legendary.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-subtle text-lg leading-relaxed mb-6"
            >
              You flew across Europe, found a room you can barely afford, and now
              you're staring at your phone in a city full of stories you haven't
              touched yet. Sound familiar?
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="text-muted text-base leading-relaxed"
            >
              Travel doesn't have to be a series of check-ins. Zada gives you a
              reason to go, people to go with, and a story worth telling when you
              get back.
            </motion.p>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-col gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6 }}
                className="group flex items-center gap-5 bg-s1 border border-s3/50 rounded-2xl p-5 cursor-default transition-all duration-300 hover:border-s3"
              >
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center font-heading font-extrabold text-lg"
                  style={{
                    background: `${stat.color}15`,
                    color: stat.color,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  {stat.value}
                </div>
                <p className="text-subtle text-sm leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
