import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ZadaSpirit from './ZadaSpirit'

const CHAT_MESSAGES = [
  { id: 1, user: 'Maya', text: 'what should we do??', delay: 0.2, side: 'left', avatar: '#00E5FF' },
  { id: 2, user: 'Nico', text: 'idk', delay: 0.8, side: 'right', avatar: '#00E5FF' },
  { id: 3, user: 'Maya', text: 'food?', delay: 1.4, side: 'left', avatar: '#00E5FF' },
  { id: 4, user: 'Nico', text: 'too far lol', delay: 1.9, side: 'right', avatar: '#00E5FF' },
  { id: 5, user: 'Soph', text: 'send something fun pleaseee', delay: 2.5, side: 'left', avatar: '#00E5FF' },
]

const POST_MESSAGES = [
  { id: 6, user: 'Maya', text: 'okay this is actually funny', delay: 0.4, side: 'left', avatar: '#00E5FF' },
  { id: 7, user: 'Nico', text: '2 min away!! let\'s go', delay: 0.9, side: 'right', avatar: '#00E5FF' },
  { id: 8, user: 'Soph', text: 'I\'m recording the proof 📲', delay: 1.5, side: 'left', avatar: '#00E5FF' },
]

const AVATARS = [
  { name: 'Maya', color: '#00E5FF', x: -28 },
  { name: 'Nico', color: '#00E5FF', x: 0 },
  { name: 'Soph', color: '#00E5FF', x: 28 },
]

function Avatar({ color, letter, size = 32 }: { color: string; letter: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `${color}25`,
        border: `2px solid ${color}60`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        fontSize: size * 0.38,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {letter}
    </div>
  )
}

function ChatBubble({ msg, shown }: { msg: (typeof CHAT_MESSAGES)[0]; shown: boolean }) {
  if (!shown) return null
  return (
    <motion.div
      className={`flex items-end gap-2 ${msg.side === 'right' ? 'flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: msg.side === 'left' ? -20 : 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Avatar color={msg.avatar} letter={msg.user[0]} />
      <div
        className="px-4 py-2.5 rounded-2xl max-w-[200px] font-body text-sm"
        style={{
          background: msg.side === 'left' ? 'rgba(37,32,53,0.8)' : `${msg.avatar}18`,
          border: `1px solid ${msg.side === 'left' ? 'rgba(37,32,53,0.6)' : msg.avatar + '35'}`,
          color: '#F2F0EF',
          borderRadius: msg.side === 'left'
            ? '4px 18px 18px 18px'
            : '18px 4px 18px 18px',
        }}
      >
        {msg.text}
      </div>
    </motion.div>
  )
}

export default function SocialChapter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [phase, setPhase] = useState<'pre' | 'quest' | 'post'>('pre')
  const [visiblePre, setVisiblePre] = useState<number[]>([])
  const [visiblePost, setVisiblePost] = useState<number[]>([])
  const [joined, setJoined] = useState(0)
  const [xp, setXp] = useState(0)

  useEffect(() => {
    if (!inView) return
    let i = 0
    const intervals: ReturnType<typeof setTimeout>[] = []
    CHAT_MESSAGES.forEach((msg) => {
      const t = setTimeout(() => {
        setVisiblePre((prev) => [...prev, msg.id])
        i++
        if (i === CHAT_MESSAGES.length) {
          setTimeout(() => {
            setPhase('quest')
            let j = 0
            const joinTimer = setInterval(() => {
              j++
              setJoined(j)
              if (j >= 3) clearInterval(joinTimer)
            }, 400)
            setTimeout(() => {
              setPhase('post')
              let p = 0
              POST_MESSAGES.forEach((pm) => {
                const pt = setTimeout(() => {
                  setVisiblePost((prev) => [...prev, pm.id])
                  p++
                }, pm.delay * 1000)
                intervals.push(pt)
              })
              let xpVal = 0
              const xpTimer = setInterval(() => {
                xpVal += 8
                setXp(xpVal)
                if (xpVal >= 200) clearInterval(xpTimer)
              }, 40)
              intervals.push(xpTimer as unknown as ReturnType<typeof setTimeout>)
            }, 2200)
          }, 600)
        }
      }, msg.delay * 1000)
      intervals.push(t)
    })
    return () => intervals.forEach(clearTimeout)
  }, [inView])

  return (
    <section
      id="social"
      ref={ref}
      className="relative py-28 px-4 overflow-hidden"
      aria-labelledby="social-heading"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-neon-cyan/30 to-transparent" aria-hidden="true" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.p
            className="font-body text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: '#00E5FF' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Chapter 02 — Social
          </motion.p>
          <motion.h2
            id="social-heading"
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{ color: '#F2F0EF' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            The best plans start with{' '}
            <span style={{ color: '#00E5FF' }}>
              "let's actually do it."
            </span>
          </motion.h2>
          <motion.p
            className="font-body text-lg max-w-lg mx-auto"
            style={{ color: 'rgba(242,240,239,0.55)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Zada turns group indecision into a shared mission.
          </motion.p>
        </div>

        {/* Chat interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Chat window */}
          <motion.div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(10,8,18,0.85)',
              border: '1px solid rgba(37,32,53,0.8)',
              backdropFilter: 'blur(20px)',
              minHeight: 440,
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {/* Chat header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: '1px solid rgba(37,32,53,0.8)' }}
            >
              <div className="flex">
                {AVATARS.map((a, i) => (
                  <div key={a.name} style={{ marginLeft: i > 0 ? -10 : 0, zIndex: 3 - i }}>
                    <Avatar color={a.color} letter={a.name[0]} size={28} />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-heading font-semibold text-sm" style={{ color: '#F2F0EF' }}>
                  Weekend squad
                </p>
                <p className="font-body text-xs" style={{ color: 'rgba(242,240,239,0.35)' }}>
                  {3} members · online
                </p>
              </div>
              <div className="ml-auto w-2 h-2 rounded-full" style={{ background: '#00E676' }} />
            </div>

            {/* Messages */}
            <div className="p-5 flex flex-col gap-3" style={{ minHeight: 340 }}>
              {CHAT_MESSAGES.map((msg) => (
                <ChatBubble key={msg.id} msg={msg} shown={visiblePre.includes(msg.id)} />
              ))}

              {/* Quest card drops into chat */}
              <AnimatePresence>
                {(phase === 'quest' || phase === 'post') && (
                  <motion.div
                    className="rounded-2xl p-4 my-2"
                    style={{
                      background: 'rgba(0,229,255,0.1)',
                      border: '1.5px solid rgba(0,229,255,0.35)',
                    }}
                    initial={{ opacity: 0, scale: 0.85, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ZadaSpirit size={28} color="#00E5FF" showSparkle={false} />
                      <span className="font-body text-xs font-semibold" style={{ color: '#00E5FF' }}>
                        Group Quest Unlocked
                      </span>
                    </div>
                    <p className="font-heading font-bold text-sm mb-1" style={{ color: '#F2F0EF' }}>
                      Ask a stranger for their favorite hidden spot nearby.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-body text-xs" style={{ color: 'rgba(0,229,255,0.7)' }}>2 min away</span>
                      <span className="font-body text-xs font-semibold" style={{ color: '#00E5FF' }}>+200 XP each</span>
                    </div>
                    {/* Joined counter */}
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex">
                        {AVATARS.slice(0, joined).map((a, i) => (
                          <motion.div
                            key={a.name}
                            style={{ marginLeft: i > 0 ? -8 : 0 }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: i * 0.15, duration: 0.3 }}
                          >
                            <Avatar color={a.color} letter={a.name[0]} size={22} />
                          </motion.div>
                        ))}
                      </div>
                      {joined > 0 && (
                        <motion.span
                          className="font-body text-xs"
                          style={{ color: 'rgba(242,240,239,0.5)' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {joined} joined
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Post-quest messages */}
              {phase === 'post' && POST_MESSAGES.map((msg) => (
                <ChatBubble key={msg.id} msg={msg} shown={visiblePost.includes(msg.id)} />
              ))}
            </div>
          </motion.div>

          {/* Right side — social proof */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {/* Shared XP bar */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'rgba(15,12,26,0.7)', border: '1px solid rgba(37,32,53,0.6)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-semibold text-sm" style={{ color: '#F2F0EF' }}>
                  Squad XP
                </span>
                <motion.span
                  className="font-heading font-bold text-lg tabular-nums"
                  style={{ color: '#00E5FF' }}
                >
                  {xp > 0 ? `+${xp}` : '0'}
                </motion.span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: 'rgba(37,32,53,0.8)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: '#00E5FF' }}
                  animate={{ width: `${Math.min((xp / 200) * 100, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Proof placeholder */}
            <div
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                background: 'rgba(15,12,26,0.7)',
                border: '1px solid rgba(37,32,53,0.6)',
              }}
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,229,255,0.15)', border: '1px solid rgba(0,229,255,0.3)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="6" width="18" height="14" rx="3" stroke="#00E5FF" strokeWidth="1.5"/>
                  <circle cx="12" cy="13" r="3.5" stroke="#00E5FF" strokeWidth="1.5"/>
                  <path d="M8 6V5a1 1 0 011-1h6a1 1 0 011 1v1" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-heading font-semibold text-sm mb-1" style={{ color: '#F2F0EF' }}>
                  Proof ready to upload
                </p>
                <p className="font-body text-xs" style={{ color: 'rgba(242,240,239,0.4)' }}>
                  Photo · Hidden Corner Quest · +80 XP bonus
                </p>
              </div>
            </div>

            {/* Badge unlock */}
            <AnimatePresence>
              {phase === 'post' && (
                <motion.div
                  className="rounded-2xl p-5 flex items-center gap-4"
                  style={{
                    background: 'rgba(0,229,255,0.08)',
                    border: '1px solid rgba(0,229,255,0.25)',
                  }}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(0,229,255,0.15)', border: '1px solid rgba(0,229,255,0.4)' }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M10 2L12 7H17L13 10.5L14.5 15.5L10 12.5L5.5 15.5L7 10.5L3 7H8Z" fill="#00E5FF"/>
                    </svg>
                  </motion.div>
                  <div>
                    <p className="font-heading font-bold text-sm" style={{ color: '#00E5FF' }}>
                      Social Spark unlocked
                    </p>
                    <p className="font-body text-xs" style={{ color: 'rgba(242,240,239,0.4)' }}>
                      First group quest completed together
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="font-body text-sm" style={{ color: 'rgba(242,240,239,0.3)' }}>
              It's not about the friend list. It's about getting off the couch together.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
