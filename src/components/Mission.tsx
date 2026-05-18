import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L17 10H25L19 15L21 22L14 18L7 22L9 15L3 10H11L14 3Z" fill="#CCFF00" opacity="0.9" />
      </svg>
    ),
    color: 'lime',
    title: 'Get Dared',
    desc: 'Random or location-based challenges appear as you travel. Every city has something unexpected waiting.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#00E5FF" strokeWidth="2" />
        <path d="M14 8v6l4 3" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    color: 'cyan',
    title: 'Do It Live',
    desc: 'Complete the dare, capture the moment. Real experiences, real connections, real fun.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="#9D00FF" strokeWidth="2" />
        <circle cx="14" cy="14" r="4" stroke="#9D00FF" strokeWidth="2" />
        <circle cx="20" cy="9" r="1.5" fill="#9D00FF" />
      </svg>
    ),
    color: 'violet',
    title: 'Share & Rank Up',
    desc: 'Your photos become memories. Your dares become achievements. Rise through 6 epic ranks.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

export default function Mission() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="mission" ref={ref} className="relative py-28 px-4">
      {/* Divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-neon-cyan text-xs font-medium tracking-[0.2em] uppercase mb-4"
        >
          What is Zada?
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-5xl font-bold text-center text-white mb-5 leading-tight"
        >
          Your Erasmus trip deserves
          <br />
          <span className="text-gradient-cyan">more than Instagram posts.</span>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-subtle text-center text-lg max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Zada is a travel gamification platform built for students abroad.
          We turn everyday moments into dares, dares into memories, and memories
          into a story worth telling.
        </motion.p>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative group bg-s1 border rounded-2xl p-7 cursor-default transition-all duration-300 overflow-hidden ${

                f.color === 'lime'
                  ? 'border-acid-lime/20 hover:border-acid-lime/40'
                  : f.color === 'cyan'
                  ? 'border-neon-cyan/20 hover:border-neon-cyan/40'
                  : 'border-electric-violet/20 hover:border-electric-violet/40'
              }`}
            >
              {/* Glow bg */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${
                  f.color === 'lime'
                    ? 'bg-card-glow-lime'
                    : f.color === 'cyan'
                    ? 'bg-card-glow-cyan'
                    : 'bg-card-glow-violet'
                }`}
              />
              <div className="relative z-10">
                <div className="mb-5 w-12 h-12 flex items-center justify-center rounded-xl bg-s2">
                  {f.icon}
                </div>
                <h3 className="font-heading font-bold text-white text-xl mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
