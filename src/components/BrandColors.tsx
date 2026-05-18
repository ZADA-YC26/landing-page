import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const coreColors = [
  { name: 'Near Black', hex: '#05030A', role: 'Base / Background', textColor: 'text-subtle', bg: 'bg-near-black', border: true },
  { name: 'Neon Cyan', hex: '#00E5FF', role: 'Primary Accent', textColor: 'text-near-black', bg: 'bg-neon-cyan' },
  { name: 'Electric Violet', hex: '#9D00FF', role: 'Secondary Accent', textColor: 'text-white', bg: 'bg-electric-violet' },
  { name: 'Acid Lime', hex: '#CCFF00', role: 'Highlight / CTA', textColor: 'text-near-black', bg: 'bg-acid-lime' },
]

const semanticColors = [
  { name: 'Success', hex: '#00E676', role: 'Positive actions' },
  { name: 'Warning', hex: '#FFEA00', role: 'Caution states' },
  { name: 'Error', hex: '#FF1744', role: 'Destructive actions' },
  { name: 'Info', hex: '#00E5FF', role: 'Informational' },
]

const surfaceColors = [
  { name: 'Base', hex: '#05030A' },
  { name: 'Surface 1', hex: '#0F0C1A' },
  { name: 'Surface 2', hex: '#1A1628' },
  { name: 'Surface 3', hex: '#252035' },
  { name: 'Muted Text', hex: '#6B6680' },
  { name: 'Subtle Text', hex: '#A09BBF' },
]

export default function BrandColors() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <section id="brand-colors" ref={ref} className="relative py-28 px-4 border-t border-s2/50">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-acid-lime text-xs font-medium tracking-[0.2em] uppercase mb-4"
        >
          Brand Identity
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-5xl font-700 text-center text-white mb-5 leading-tight"
        >
          Colors that feel like
          <br />
          <span className="text-gradient-lime">adventure at night.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-muted text-center mb-14"
        >
          Click any swatch to copy the hex value.
        </motion.p>

        {/* Core palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="mb-10"
        >
          <p className="text-subtle text-xs tracking-widest uppercase mb-4">Core Palette</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coreColors.map((c) => (
              <motion.div
                key={c.hex}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => copy(c.hex)}
                className="cursor-pointer group rounded-2xl overflow-hidden"
              >
                <div
                  className="h-32 w-full flex items-center justify-center relative"
                  style={{ backgroundColor: c.hex, border: c.border ? '1px solid #252035' : 'none' }}
                >
                  {copied === c.hex ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-white/20 rounded-full p-2"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10l4 4 8-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-full p-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.5" />
                        <path d="M3 11V4a1 1 0 011-1h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="bg-s1 p-3 border-t border-s3/30">
                  <p className="text-white text-sm font-medium">{c.name}</p>
                  <p className="text-muted text-xs mt-0.5">{c.role}</p>
                  <p className="text-subtle text-xs font-mono mt-1">{c.hex}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Semantic + Surface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <p className="text-subtle text-xs tracking-widest uppercase mb-4">Semantic Colors</p>
            <div className="flex flex-col gap-3">
              {semanticColors.map((c) => (
                <motion.div
                  key={c.hex}
                  whileHover={{ x: 4 }}
                  onClick={() => copy(c.hex)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{c.name}</p>
                    <p className="text-muted text-xs">{c.role}</p>
                  </div>
                  <span className="text-subtle text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">{c.hex}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.55 }}
          >
            <p className="text-subtle text-xs tracking-widest uppercase mb-4">Surface Variants</p>
            <div className="flex flex-col gap-2">
              {surfaceColors.map((c) => (
                <motion.div
                  key={c.hex}
                  whileHover={{ x: 4 }}
                  onClick={() => copy(c.hex)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex-shrink-0 border border-s3/40"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{c.name}</p>
                  </div>
                  <span className="text-subtle text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">{c.hex}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Typography sample */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-s1 border border-s3/40 rounded-3xl p-8"
        >
          <p className="text-subtle text-xs tracking-widest uppercase mb-6">Typography</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-muted text-xs mb-2">Space Grotesk — Headings</p>
              <p className="font-heading text-4xl font-700 text-white leading-tight">Dare to Explore</p>
              <p className="font-heading text-xl font-500 text-subtle mt-1">Bold. Geometric. Confident.</p>
            </div>
            <div>
              <p className="text-muted text-xs mb-2">Inter — Body</p>
              <p className="font-body text-base text-subtle leading-relaxed">
                Zada turns your Erasmus journey into a game — dares, challenges, and memories to share with people who get it.
              </p>
              <p className="font-body text-sm text-muted mt-2">Readable. Approachable. Clean.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
