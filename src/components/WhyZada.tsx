import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ZadaSpirit from './ZadaSpirit'
import GlowButton from './GlowButton'

const SIGNAL_CHIPS = [
  { text: 'zada?', color: '#CCFF00' },
  { text: 'say less', color: '#00E5FF' },
  { text: 'send it', color: '#9D00FF' },
  { text: 'we going?', color: '#CCFF00' },
  { text: 'quest nearby', color: '#00E5FF' },
  { text: 'follow the spark', color: '#9D00FF' },
]

const INIT_MESSAGES = [
  { id: 1, side: 'left', avatar: '#00E5FF', letter: 'M', text: 'zada?', delay: 300 },
  { id: 2, side: 'right', avatar: '#CCFF00', letter: 'N', text: 'yooo where', delay: 950 },
  { id: 3, side: 'left', avatar: '#9D00FF', letter: 'S', text: 'say less', delay: 1500 },
]

function PulseRings({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ borderColor: 'rgba(204,255,0,0.5)' }}
          initial={{ width: 60, height: 60, opacity: 0.9 }}
          animate={{ width: 340, height: 340, opacity: 0 }}
          transition={{ duration: 1.4, delay: i * 0.22, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function Avatar({ color, letter, size = 28 }: { color: string; letter: string; size?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size, height: size, borderRadius: '50%',
        background: `${color}20`, border: `1.5px solid ${color}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, fontSize: size * 0.38, fontFamily: 'Inter, sans-serif',
        fontWeight: 700, flexShrink: 0,
      }}
    >
      {letter}
    </div>
  )
}

function ChatBubble({
  msg,
}: {
  msg: { side: string; avatar: string; letter: string; text: string }
}) {
  const isLeft = msg.side === 'left'
  return (
    <motion.div
      className={`flex items-end gap-2 ${isLeft ? '' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: isLeft ? -16 : 16, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <Avatar color={msg.avatar} letter={msg.letter} size={26} />
      <div
        className="px-3.5 py-2 font-body text-sm"
        style={{
          background: isLeft ? 'rgba(37,32,53,0.85)' : `${msg.avatar}18`,
          border: `1px solid ${isLeft ? 'rgba(37,32,53,0.6)' : msg.avatar + '35'}`,
          borderRadius: isLeft ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
          color: '#F2F0EF',
          maxWidth: 180,
        }}
      >
        {msg.text}
      </div>
    </motion.div>
  )
}

export default function WhyZada() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [visibleInit, setVisibleInit] = useState<number[]>([])
  const [signalSent, setSignalSent] = useState(false)
  const [pulsing, setPulsing] = useState(false)
  const [showSayLess, setShowSayLess] = useState(false)
  const [questUnlocked, setQuestUnlocked] = useState(false)
  const [socialSpark, setSocialSpark] = useState(false)

  useEffect(() => {
    if (!inView) return
    INIT_MESSAGES.forEach((msg) => {
      const t = setTimeout(() => {
        setVisibleInit((prev) => [...prev, msg.id])
      }, msg.delay)
      return () => clearTimeout(t)
    })
  }, [inView])

  const sendSignal = () => {
    if (signalSent) return
    setSignalSent(true)
    setPulsing(true)
    setTimeout(() => setPulsing(false), 1600)
    setTimeout(() => setShowSayLess(true), 500)
    setTimeout(() => setQuestUnlocked(true), 1100)
    setTimeout(() => setSocialSpark(true), 1700)
  }

  return (
    <section
      id="why"
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="why-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(204,255,0,0.2), rgba(0,229,255,0.15), transparent)' }}
        aria-hidden="true"
      />

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute rounded-full"
          style={{
            top: '0%', left: '-10%',
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(204,255,0,0.07) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: '-10%', right: '-5%',
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(157,0,255,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Copy ── */}
          <div>
            <motion.p
              className="font-body text-xs font-semibold tracking-[0.22em] uppercase mb-6"
              style={{ color: 'rgba(242,240,239,0.3)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              The name
            </motion.p>

            <motion.h2
              id="why-heading"
              className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.08] tracking-tight mb-8"
              style={{ color: '#F2F0EF' }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              Say{' '}
              <span style={{ color: '#CCFF00' }}>
                Zada.
              </span>
              <br />
              Something starts.
            </motion.h2>

            <motion.p
              className="font-body text-lg leading-[1.75] mb-10"
              style={{ color: 'rgba(242,240,239,0.55)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Zada is the word before the plan becomes real.
              The spark in the chat. The push out the door.
              The tiny signal that turns "what now?" into{' '}
              <span style={{ color: '#F2F0EF', fontWeight: 500 }}>"let's go."</span>
            </motion.p>

            {/* Signal chips */}
            <motion.div
              className="flex flex-wrap gap-2 mb-10"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              aria-label="Words that describe Zada's energy"
            >
              {SIGNAL_CHIPS.map((chip, i) => (
                <motion.span
                  key={chip.text}
                  className="font-body text-xs font-semibold px-3.5 py-1.5 rounded-full"
                  style={{
                    background: `${chip.color}10`,
                    border: `1px solid ${chip.color}30`,
                    color: chip.color,
                    letterSpacing: '0.01em',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.55 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.08 }}
                >
                  {chip.text}
                </motion.span>
              ))}
            </motion.div>

            {/* Arabic Easter egg — extremely subtle */}
            <motion.p
              className="font-body text-xs select-none"
              style={{ color: 'rgba(242,240,239,0.12)', letterSpacing: '0.08em', direction: 'rtl', width: 'fit-content' }}
              lang="ar"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 1 }}
            >
              زادا
            </motion.p>
          </div>

          {/* ── RIGHT: Chat visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(10,8,18,0.9)',
                border: '1px solid rgba(37,32,53,0.8)',
                backdropFilter: 'blur(20px)',
                minHeight: 440,
              }}
            >
              {/* Faded ZADA wordmark behind chat */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                aria-hidden="true"
              >
                <span
                  className="font-heading font-extrabold"
                  style={{
                    fontSize: 'clamp(6rem, 18vw, 9rem)',
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(135deg, rgba(204,255,0,0.06) 0%, rgba(0,229,255,0.04) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    userSelect: 'none',
                  }}
                >
                  ZADA
                </span>
              </div>

              {/* Signal pulse rings — fires on click */}
              <PulseRings active={pulsing} />

              {/* Chat header */}
              <div
                className="flex items-center gap-3 px-5 py-4 relative z-10"
                style={{ borderBottom: '1px solid rgba(37,32,53,0.6)' }}
              >
                <div className="flex">
                  {[
                    { color: '#00E5FF', letter: 'M' },
                    { color: '#CCFF00', letter: 'N' },
                    { color: '#9D00FF', letter: 'S' },
                  ].map((a, i) => (
                    <div key={a.letter} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i }}>
                      <Avatar color={a.color} letter={a.letter} size={24} />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm" style={{ color: '#F2F0EF' }}>
                    weekend squad
                  </p>
                  <p className="font-body text-xs" style={{ color: 'rgba(242,240,239,0.3)' }}>
                    3 online
                  </p>
                </div>
                <motion.div
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ background: '#00E676' }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </div>

              {/* Messages */}
              <div className="relative z-10 px-5 py-5 flex flex-col gap-3" style={{ minHeight: 300 }}>

                {/* Initial auto-played messages */}
                {INIT_MESSAGES.map((msg) => (
                  visibleInit.includes(msg.id) && (
                    <ChatBubble key={msg.id} msg={msg} />
                  )
                ))}

                {/* Quest notification drops in after initial messages */}
                <AnimatePresence>
                  {visibleInit.includes(3) && (
                    <motion.div
                      className="rounded-2xl px-4 py-3 flex items-center gap-3"
                      style={{
                        background: 'rgba(204,255,0,0.08)',
                        border: '1px solid rgba(204,255,0,0.25)',
                      }}
                      initial={{ opacity: 0, scale: 0.88, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ZadaSpirit size={30} color="#CCFF00" showSparkle={false} />
                      <div>
                        <p className="font-body text-xs font-semibold" style={{ color: '#CCFF00' }}>
                          Quest nearby · 2 min away
                        </p>
                        <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(242,240,239,0.4)' }}>
                          3 friends joined · +150 XP
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Post-signal messages */}
                <AnimatePresence>
                  {showSayLess && (
                    <ChatBubble
                      msg={{ side: 'right', avatar: '#CCFF00', letter: 'N', text: 'say less' }}
                    />
                  )}
                </AnimatePresence>

                {/* Quest card unlocks */}
                <AnimatePresence>
                  {questUnlocked && (
                    <motion.div
                      className="rounded-2xl p-4"
                      style={{
                        background: 'rgba(157,0,255,0.1)',
                        border: '1.5px solid rgba(157,0,255,0.3)',
                      }}
                      initial={{ opacity: 0, y: 12, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-body text-xs font-semibold" style={{ color: '#9D00FF' }}>
                          Quest unlocked
                        </span>
                        <span className="font-heading font-bold text-xs" style={{ color: '#CCFF00' }}>
                          +100 XP
                        </span>
                      </div>
                      <p className="font-heading font-bold text-sm" style={{ color: '#F2F0EF' }}>
                        Wrong Turn Rule
                      </p>
                      <p className="font-body text-xs mt-1" style={{ color: 'rgba(242,240,239,0.4)' }}>
                        Take the next street you would normally ignore.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Social spark badge */}
                <AnimatePresence>
                  {socialSpark && (
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl self-center"
                      style={{
                        background: 'rgba(204,255,0,0.1)',
                        border: '1px solid rgba(204,255,0,0.3)',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5Z" fill="#CCFF00" />
                        </svg>
                      </motion.div>
                      <span className="font-body text-xs font-semibold" style={{ color: '#CCFF00' }}>
                        Social spark unlocked
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA row */}
              <div
                className="relative z-10 px-5 pb-5"
                style={{ borderTop: '1px solid rgba(37,32,53,0.5)', paddingTop: '1rem' }}
              >
                <GlowButton
                  variant={signalSent ? 'secondary' : 'primary'}
                  size="md"
                  onClick={sendSignal}
                  disabled={signalSent}
                  ariaLabel="Send the Zada signal"
                  className="w-full justify-center"
                >
                  {signalSent ? (
                    <>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#CCFF00' }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      Signal sent
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M1 7L13 1L7 13L6 8L1 7Z" fill="currentColor" />
                      </svg>
                      Send the signal
                    </>
                  )}
                </GlowButton>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
