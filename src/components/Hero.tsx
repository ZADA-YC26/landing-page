import { useRef, useEffect, lazy, Suspense } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const HeroScene = lazy(() => import('./HeroScene'))

const HEADLINE_WORDS = ['Stop', 'touring.', 'Start', 'daring.']

const CITIES = [
  'Barcelona', 'Amsterdam', 'Prague', 'Lisbon', 'Berlin', 'Vienna',
  'Budapest', 'Athens', 'Dubrovnik', 'Porto', 'Florence', 'Stockholm',
  'Copenhagen', 'Warsaw', 'Krakow', 'Valencia', 'Seville', 'Bologna',
]

const DARE_CARD = {
  title: 'Blind Order',
  category: 'Food',
  xp: '+100 XP',
  desc: 'Point at a random item on the menu. No swaps.',
  color: '#CCFF00',
}

const RANK_CARD = {
  name: 'Explorer',
  xp: '1,820 XP',
  progress: 52,
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 30, stiffness: 60 }
  const blobX = useSpring(useTransform(mouseX, [0, 1], [-40, 40]), springConfig)
  const blobY = useSpring(useTransform(mouseY, [0, 1], [-30, 30]), springConfig)
  const blobX2 = useSpring(useTransform(mouseX, [0, 1], [30, -30]), springConfig)
  const blobY2 = useSpring(useTransform(mouseY, [0, 1], [20, -20]), springConfig)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseX.set((e.clientX - rect.left) / rect.width)
      mouseY.set((e.clientY - rect.top) / rect.height)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  }
  const wordVariants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(12px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.75, ease: 'easeOut' as const },
    },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-0 px-4"
    >
      {/* ── Aurora mesh background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08051a] via-near-black to-near-black" />

        {/* Blob 1 — cyan */}
        <motion.div
          className="absolute rounded-full animate-blob"
          style={{
            width: 700, height: 700,
            top: '-15%', left: '-10%',
            background: 'radial-gradient(circle, rgba(0,229,255,0.22) 0%, transparent 65%)',
            x: blobX, y: blobY,
            filter: 'blur(40px)',
          }}
        />
        {/* Blob 2 — violet */}
        <motion.div
          className="absolute rounded-full animate-blob"
          style={{
            width: 600, height: 600,
            bottom: '-10%', right: '-5%',
            background: 'radial-gradient(circle, rgba(157,0,255,0.28) 0%, transparent 65%)',
            x: blobX2, y: blobY2,
            filter: 'blur(40px)',
            animationDelay: '3s',
          }}
        />
        {/* Blob 3 — lime accent */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            top: '40%', left: '35%',
            background: 'radial-gradient(circle, rgba(204,255,0,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_0%,rgba(5,3,10,0.6)_100%)]" />
      </div>

      {/* ── Floating particles ── */}
      <Particles />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">

          {/* Left: Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-s2/70 backdrop-blur border border-neon-cyan/20 rounded-full px-4 py-1.5 mb-8 shadow-[0_0_20px_rgba(0,229,255,0.1)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-acid-lime" />
              </span>
              <span className="text-subtle text-xs font-medium tracking-wide">
                Now live for Erasmus students
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-heading font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-[-0.03em] text-white mb-7"
              aria-label="Stop touring. Start daring."
            >
              {HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={word + i}
                  variants={wordVariants}
                  className={`inline-block mr-[0.25em] ${i === 3
                      ? 'bg-gradient-to-r from-acid-lime via-neon-cyan to-electric-violet bg-clip-text text-transparent animate-shimmer'
                      : i === 1
                        ? 'text-white/30'
                        : 'text-white'
                    }`}
                  style={i === 3 ? { backgroundSize: '300% 100%' } : {}}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="text-subtle text-lg sm:text-xl max-w-md leading-relaxed mb-10"
            >
              Zada is the travel gamification app turning your semester abroad
              into the most legendary story of your life — one dare at a time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="#join"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(204,255,0,0.45)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-acid-lime text-near-black text-sm font-heading font-bold px-7 py-3.5 rounded-2xl cursor-pointer transition-all duration-200"
              >
                <img src={`${import.meta.env.BASE_URL}favicon.png`} alt="" width={18} height={18} className="object-contain" />
                Get Early Access
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-subtle text-sm font-medium px-7 py-3.5 rounded-2xl cursor-pointer hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-200 backdrop-blur"
              >
                See how it works
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex items-center gap-6 mt-12 pt-8 border-t border-white/8"
            >
              {[
                { value: '500+', label: 'Beta users' },
                { value: '18', label: 'Countries' },
                { value: '50+', label: 'Dare types' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-heading font-bold text-2xl text-white leading-none">{value}</span>
                  <span className="text-muted text-xs mt-1">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D scene */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="relative hidden lg:block"
            style={{ height: 540 }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(204,255,0,0.08) 0%, rgba(157,0,255,0.06) 50%, transparent 80%)' }}
            />

            {/* Canvas */}
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-acid-lime/30 border-t-acid-lime animate-spin" />
              </div>
            }>
              <HeroScene />
            </Suspense>

            {/* Floating dare card — overlaid on canvas */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[6%] right-[-4%] w-48 bg-s1/90 backdrop-blur-xl border border-acid-lime/25 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-none"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-medium bg-acid-lime/20 text-acid-lime px-2 py-0.5 rounded-full">{DARE_CARD.category}</span>
                <span className="text-[10px] font-bold text-acid-lime">{DARE_CARD.xp}</span>
              </div>
              <p className="text-white text-sm font-heading font-semibold mb-1">{DARE_CARD.title}</p>
              <p className="text-muted text-[11px] leading-snug">{DARE_CARD.desc}</p>
            </motion.div>

            {/* Floating rank card — overlaid on canvas */}
            <motion.div
              initial={{ opacity: 0, x: -40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-[14%] left-[-6%] w-44 bg-s1/90 backdrop-blur-xl border border-electric-violet/25 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-none"
            >
              <p className="text-[10px] text-muted mb-1">Current Rank</p>
              <p className="text-white font-heading font-bold text-base">{RANK_CARD.name}</p>
              <p className="text-neon-cyan text-[11px] mb-2">{RANK_CARD.xp}</p>
              <div className="w-full h-1.5 bg-s3 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-electric-violet"
                  initial={{ width: 0 }}
                  animate={{ width: `${RANK_CARD.progress}%` }}
                  transition={{ delay: 2.2, duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              <p className="text-muted text-[10px] mt-1">{RANK_CARD.progress}% to Adventurer</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── City ticker ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 border-t border-white/5">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...CITIES, ...CITIES].map((city, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6">
              <span className="text-muted text-xs tracking-widest uppercase">{city}</span>
              <span className="w-1 h-1 rounded-full bg-acid-lime/40 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Particles() {
  const dots = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 1,
    dur: Math.random() * 5 + 4,
    delay: Math.random() * 4,
    color: ['#00E5FF', '#9D00FF', '#CCFF00'][i % 3],
  }))
  return (
    <div className="absolute inset-0 pointer-events-none">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{ left: d.x, top: d.y, width: d.size, height: d.size, background: d.color, opacity: 0.3 }}
          animate={{ y: [0, -28, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
