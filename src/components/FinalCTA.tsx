import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ZadaSpirit from './ZadaSpirit'
import GlowButton from './GlowButton'

function RouteAnimation() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="cta-route" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#CCFF00" stopOpacity="0" />
          <stop offset="30%" stopColor="#CCFF00" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.5" />
          <stop offset="85%" stopColor="#9D00FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9D00FF" stopOpacity="0" />
        </linearGradient>
        <filter id="cta-glow" x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 55} x2="1200" y2={i * 55} stroke="#1A1628" strokeWidth="0.8" />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="500" stroke="#1A1628" strokeWidth="0.8" />
      ))}

      {/* Route pulse */}
      <motion.path
        d="M 100 400 Q 250 300 400 250 Q 550 200 650 250 Q 750 300 850 230 Q 950 160 1100 200"
        stroke="url(#cta-route)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        filter="url(#cta-glow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Glowing nodes */}
      <circle cx="400" cy="250" r="5" fill="#CCFF00" opacity="0.7" filter="url(#cta-glow)" />
      <circle cx="650" cy="250" r="4" fill="#00E5FF" opacity="0.6" filter="url(#cta-glow)" />
      <circle cx="850" cy="230" r="4.5" fill="#9D00FF" opacity="0.6" filter="url(#cta-glow)" />

      {/* Radial fade */}
      <defs>
        <radialGradient id="cta-fade" cx="50%" cy="50%" r="50%">
          <stop offset="40%" stopColor="#05030A" stopOpacity="0" />
          <stop offset="100%" stopColor="#05030A" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="1200" height="500" fill="url(#cta-fade)" />
    </svg>
  )
}

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fakeQuest, setFakeQuest] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <section
      id="join"
      ref={ref}
      className="relative py-32 px-4 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Route animation background */}
      <RouteAnimation />

      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(204,255,0,0.3), rgba(0,229,255,0.3), transparent)' }} aria-hidden="true" />

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '-20%', left: '10%',
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(204,255,0,0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: '-10%', right: '5%',
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(157,0,255,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* ZadaSpirit over city */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <ZadaSpirit size={80} color="#CCFF00" floatDelay={0} />
            <motion.div
              className="absolute -inset-6 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(204,255,0,0.15) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          id="cta-heading"
          className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6"
          style={{ color: '#F2F0EF' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Follow the{' '}
          <span style={{
            color: '#CCFF00',
          }}>
            spark.
          </span>
        </motion.h2>

        <motion.p
          className="font-body text-xl mb-12"
          style={{ color: 'rgba(242,240,239,0.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Your next memory might be two minutes away.
        </motion.p>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
                exit={{ opacity: 0, y: -10 }}
              >
                <label htmlFor="waitlist-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-xl font-body text-sm outline-none"
                  style={{
                    background: 'rgba(15,12,26,0.8)',
                    border: '1.5px solid rgba(37,32,53,0.8)',
                    color: '#F2F0EF',
                    letterSpacing: '-0.01em',
                  }}
                  aria-required="true"
                />
                <GlowButton
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  ariaLabel="Join Zada waitlist"
                >
                  {loading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid #05030A', borderTopColor: 'transparent', borderRadius: '50%' }}
                    />
                  ) : 'Join waitlist'}
                </GlowButton>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl max-w-md mx-auto mb-6 font-body text-sm font-semibold"
                style={{
                  background: 'rgba(204,255,0,0.1)',
                  border: '1.5px solid rgba(204,255,0,0.3)',
                  color: '#CCFF00',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8l4 4L13 4" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                Spark received. See you out there.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Fake quest CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          <button
            onClick={() => setFakeQuest(!fakeQuest)}
            className="font-body text-sm cursor-pointer border-none bg-transparent"
            style={{ color: 'rgba(242,240,239,0.35)', textDecoration: 'underline', textDecorationStyle: 'dashed', textUnderlineOffset: 4 }}
            aria-expanded={fakeQuest}
            aria-controls="fake-quest"
          >
            or start a fake quest
          </button>

          <AnimatePresence>
            {fakeQuest && (
              <motion.div
                id="fake-quest"
                className="mt-6 max-w-sm mx-auto rounded-2xl p-5"
                style={{
                  background: 'rgba(15,12,26,0.9)',
                  border: '1.5px solid rgba(204,255,0,0.35)',
                  backdropFilter: 'blur(16px)',
                }}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#CCFF00' }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="font-body text-xs font-semibold" style={{ color: '#CCFF00' }}>
                    Quest nearby
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2" style={{ color: '#F2F0EF' }}>
                  Send this to one friend you would explore with.
                </h3>
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <span className="font-body text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(204,255,0,0.12)', color: '#CCFF00' }}>
                    +50 XP
                  </span>
                  <span className="font-body text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(157,0,255,0.12)', color: '#9D00FF' }}>
                    Social spark
                  </span>
                  <span className="font-body text-xs" style={{ color: 'rgba(242,240,239,0.3)' }}>
                    Proof optional
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="font-body text-xs mt-10"
          style={{ color: 'rgba(242,240,239,0.2)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
        >
          Early access. No spam. Just quests.
        </motion.p>
      </div>
    </section>
  )
}
