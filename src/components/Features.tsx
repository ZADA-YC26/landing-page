import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3C7.477 3 3 7.477 3 13s4.477 10 10 10 10-4.477 10-10S18.523 3 13 3z" stroke="#CCFF00" strokeWidth="1.5" opacity="0.4"/>
        <path d="M13 3v5M3 13h5M23 13h-5M13 23v-5" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="13" cy="13" r="3" fill="#CCFF00"/>
      </svg>
    ),
    accent: '#CCFF00',
    tag: 'Location-aware',
    title: 'Dares built for where you are',
    desc: 'Zada reads your city and serves hyper-local challenges — underground bars, market barters, language dares. No two trips are the same.',
    span: 'col-span-1',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="8" width="20" height="14" rx="3" stroke="#00E5FF" strokeWidth="1.5"/>
        <circle cx="13" cy="15" r="3.5" stroke="#00E5FF" strokeWidth="1.5"/>
        <path d="M9 8V6a4 4 0 018 0v2" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="19.5" cy="10.5" r="1.5" fill="#00E5FF"/>
      </svg>
    ),
    accent: '#00E5FF',
    tag: 'Memory vault',
    title: 'Every proof shot becomes a memory',
    desc: 'Your dare completions auto-organize into a travel album. A real one. Not just a camera roll.',
    span: 'col-span-1',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3l2.5 7h7.5l-6 4.5 2.5 7.5L13 18l-6.5 4.5 2.5-7.5L3 10.5h7.5L13 3z" fill="#9D00FF" opacity="0.2" stroke="#9D00FF" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    accent: '#9D00FF',
    tag: 'Gamification',
    title: 'Six ranks. One epic arc.',
    desc: 'From Spark to Legend — every dare you complete earns XP. Your rank tells the story of where you\'ve been and how far you\'ve gone.',
    span: 'col-span-1',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M17 8a5 5 0 010 10M17 13H7" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="7" cy="13" r="4" stroke="#9D00FF" strokeWidth="1.5"/>
        <path d="M20 8c1.5 1 2.5 2.8 2.5 5s-1 4-2.5 5" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    accent: '#00E5FF',
    tag: 'Community',
    title: 'Find your dare crew',
    desc: 'Accept dare invites, compete on city leaderboards, and share your completed dares with your Erasmus network.',
    span: 'col-span-1',
  },
]

const bento = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="features" ref={ref} className="relative py-28 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 80% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-neon-cyan text-xs font-medium tracking-[0.2em] uppercase mb-4"
        >
          What Zada does
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold text-4xl sm:text-5xl text-center text-white mb-4 leading-tight"
        >
          Built for the students who
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #CCFF00, #00E5FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            want more from their trip.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-muted text-center max-w-lg mx-auto mb-14"
        >
          Four pillars that turn a semester into an adventure.
        </motion.p>

        <motion.div
          variants={bento}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={card}
              whileHover={{ y: -5, scale: 1.015 }}
              className="group relative bg-s1 border border-s3/40 rounded-2xl p-7 overflow-hidden cursor-default transition-all duration-300 hover:border-s3/70"
            >
              {/* Card glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse 80% 60% at 20% 20%, ${f.accent}10 0%, transparent 70%)` }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${f.accent}15`, border: `1px solid ${f.accent}30` }}
                  >
                    {f.icon}
                  </div>
                  <span
                    className="text-[11px] font-medium px-3 py-1 rounded-full"
                    style={{ background: `${f.accent}15`, color: f.accent }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-white text-xl mb-2 leading-snug">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
