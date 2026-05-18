import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || loading) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 900)
  }

  return (
    <section id="join" ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Aurora BG */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.18, 1], rotate: [0, 12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/3 -left-1/4 w-[80vw] h-[80vw] rounded-full opacity-[0.14]"
          style={{ background: 'radial-gradient(circle, #9D00FF 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], rotate: [0, -8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute -bottom-1/4 -right-1/6 w-[60vw] h-[60vw] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)' }}
        />
        {/* Lime glow behind card */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #CCFF00 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-electric-violet/10 border border-electric-violet/25 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-electric-violet animate-pulse" />
            <span className="text-electric-violet text-xs font-medium tracking-wider">Limited Beta — 500 spots</span>
          </div>

          <h2 className="font-heading font-extrabold text-5xl sm:text-6xl text-white mb-6 leading-[0.95] tracking-tight">
            Your next dare is
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #CCFF00 0%, #00E5FF 60%, #9D00FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 100%',
              }}
            >
              waiting.
            </span>
          </h2>
          <p className="text-subtle text-lg leading-relaxed max-w-md mx-auto">
            Join the Zada beta. Be among the first students to turn travel into a game worth playing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <label htmlFor="cta-email" className="sr-only">Email address</label>
              <input
                id="cta-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@student.eu"
                required
                className="flex-1 bg-s1 border border-s3/60 rounded-2xl px-5 py-3.5 text-white placeholder-muted text-sm focus:outline-none focus:border-acid-lime/40 focus:ring-1 focus:ring-acid-lime/20 transition-all duration-200 min-w-0"
              />
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.04, boxShadow: '0 0 35px rgba(204,255,0,0.4)' } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                className="bg-acid-lime text-near-black font-heading font-bold px-7 py-3.5 rounded-2xl text-sm cursor-pointer whitespace-nowrap transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex-shrink-0"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Joining...
                  </span>
                ) : 'Get Early Access'}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="max-w-md mx-auto bg-acid-lime/10 border border-acid-lime/30 rounded-2xl p-6 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="13" fill="#CCFF00" opacity="0.2"/>
                    <path d="M8 14l4 4 8-8" stroke="#CCFF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
                <span className="text-acid-lime font-heading font-bold text-lg">You're in.</span>
              </div>
              <p className="text-subtle text-sm">First dare drops when beta opens. Stay ready.</p>
            </motion.div>
          )}

          <p className="text-muted text-xs text-center mt-5">No spam. No pitch decks. Just dares.</p>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-s2/60"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {['#9D00FF', '#00E5FF', '#CCFF00', '#FF1744', '#00E676'].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-near-black flex items-center justify-center font-bold text-near-black text-xs"
                  style={{ background: c, zIndex: 5 - i }}
                >
                  {['A', 'L', 'S', 'M', 'R'][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">500+ students joined</p>
              <p className="text-muted text-xs">across 18 countries</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="#CCFF00">
                  <path d="M8 2l1.5 4h4l-3 2.5 1.5 4L8 10 4.5 12.5l1.5-4-3-2.5h4L8 2z"/>
                </svg>
              ))}
            </div>
            <p className="text-muted text-xs">4.9/5 on TestFlight</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
