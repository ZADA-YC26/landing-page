import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    accent: '#CCFF00',
    title: 'Open Zada in your city',
    desc: 'The app reads your location and queues up dares made for where you are — from the hidden staircases to the markets only locals know.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="10" y="5" width="20" height="30" rx="4" stroke="#CCFF00" strokeWidth="1.5" opacity="0.4"/>
        <rect x="13" y="11" width="14" height="10" rx="2" fill="#CCFF00" opacity="0.2" stroke="#CCFF00" strokeWidth="1"/>
        <circle cx="20" cy="28" r="2.5" fill="#CCFF00"/>
        <path d="M17 5h6" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    accent: '#00E5FF',
    title: 'Accept the dare',
    desc: 'Choose your level — Easy, Medium, or Hard. Each dare has a unique XP reward. Harder dares unlock faster rank-ups and exclusive city achievements.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M8 20l8 8L32 12" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="16" stroke="#00E5FF" strokeWidth="1.5" opacity="0.2"/>
      </svg>
    ),
  },
  {
    number: '03',
    accent: '#9D00FF',
    title: 'Capture proof & earn XP',
    desc: 'Take the photo or video. Submit it. XP lands instantly. Your rank climbs. Your memory vault grows with a story attached to every shot.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="5" y="12" width="30" height="22" rx="4" stroke="#9D00FF" strokeWidth="1.5"/>
        <circle cx="20" cy="23" r="6" stroke="#9D00FF" strokeWidth="1.5"/>
        <path d="M14 12l2.5-5h7L26 12" stroke="#9D00FF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="30" cy="16" r="2" fill="#9D00FF"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} className="relative py-28 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(157,0,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-acid-lime text-xs font-medium tracking-[0.2em] uppercase mb-4"
        >
          How it works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold text-4xl sm:text-5xl text-center text-white mb-16 leading-tight"
        >
          Three moves. Infinite
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #CCFF00, #00E5FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            stories.
          </span>
        </motion.h2>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-14 left-[calc(16.6%+2rem)] right-[calc(16.6%+2rem)] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="w-full h-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #CCFF00 0%, #00E5FF 50%, #9D00FF 100%)',
                opacity: 0.3,
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.2 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="relative w-24 h-24 rounded-2xl mb-5 flex items-center justify-center z-10"
                  style={{
                    background: `${step.accent}12`,
                    border: `1px solid ${step.accent}30`,
                    boxShadow: `0 0 30px ${step.accent}10`,
                  }}
                >
                  {step.icon}
                  {/* Step number */}
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-heading font-bold"
                    style={{ background: step.accent, color: '#05030A' }}
                  >
                    {i + 1}
                  </span>
                </motion.div>

                <h3 className="font-heading font-bold text-white text-xl mb-3 leading-snug">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed max-w-[260px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 mx-auto max-w-2xl border border-s3/40 rounded-3xl p-8 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(15,12,26,0.8) 0%, rgba(26,22,40,0.6) 100%)' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,229,255,0.06)_0%,transparent_60%)]" />
          <p className="relative text-white text-xl font-medium leading-relaxed italic">
            "Three dares into Lisbon, I realised I was actually{' '}
            <span className="text-neon-cyan not-italic font-semibold">living there</span> — not just visiting."
          </p>
          <p className="relative text-acid-lime text-sm font-medium mt-4">— Amelia R., Erasmus 2024</p>
        </motion.div>
      </div>
    </section>
  )
}
