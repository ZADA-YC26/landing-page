import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: "I did a dare that made me walk into a random coffee shop and chat with whoever was sitting alone. I ended up spending the afternoon with a retired architect who showed me parts of Lisbon I never would have found.",
    name: 'Amelia R.',
    role: 'Erasmus student, Lisbon 2024',
    rank: 'Adventurer',
    rankColor: '#9D00FF',
    xp: '4,200 XP',
    avatar: '#9D00FF',
  },
  {
    quote: "Zada basically forced me to talk to people. I was shy and just wanted to see museums. Three dares in, I was doing karaoke with locals in Prague at 2am. I'm not joking.",
    name: 'Luca M.',
    role: 'Erasmus student, Prague 2024',
    rank: 'TrailBlazer',
    rankColor: '#CCFF00',
    xp: '9,800 XP',
    avatar: '#CCFF00',
  },
  {
    quote: "The memory vault alone is worth it. Every picture has a story attached to it now — the dare, the context, the XP. I look back at it and actually remember what it felt like to be there.",
    name: 'Sofia N.',
    role: 'Erasmus student, Barcelona 2025',
    rank: 'Explorer',
    rankColor: '#00E5FF',
    xp: '2,100 XP',
    avatar: '#00E5FF',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" ref={ref} className="relative py-28 px-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(157,0,255,0.06) 0%, transparent 70%)' }}
      />
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-electric-violet text-xs font-medium tracking-[0.2em] uppercase mb-4"
        >
          Real stories
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold text-4xl sm:text-5xl text-center text-white mb-14 leading-tight"
        >
          The dare that{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #9D00FF, #00E5FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            changed the trip.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
        >
          {/* Quote area */}
          <div className="relative min-h-[220px] mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-s1 border border-s3/50 rounded-3xl p-8 md:p-10"
              >
                {/* Quote mark */}
                <div
                  className="font-heading font-extrabold text-7xl leading-none mb-4 select-none"
                  style={{ color: testimonials[active].rankColor, opacity: 0.25 }}
                >
                  "
                </div>
                <p className="text-white text-xl md:text-2xl leading-relaxed font-medium mb-8">
                  {testimonials[active].quote}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-near-black text-sm"
                      style={{ background: testimonials[active].avatar }}
                    >
                      {testimonials[active].name[0]}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{testimonials[active].name}</p>
                      <p className="text-muted text-xs">{testimonials[active].role}</p>
                    </div>
                  </div>
                  <div
                    className="text-right text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: `${testimonials[active].rankColor}18`, color: testimonials[active].rankColor }}
                  >
                    {testimonials[active].rank} · {testimonials[active].xp}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selector dots */}
          <div className="flex items-center justify-center gap-4">
            {testimonials.map((t, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer transition-all duration-300"
                aria-label={`View ${t.name}'s story`}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: i === active ? 28 : 8,
                    height: 8,
                    background: i === active ? t.rankColor : '#252035',
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
