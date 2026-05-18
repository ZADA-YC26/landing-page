import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Spontaneous', href: '#spontaneous' },
  { label: 'Social', href: '#social' },
  { label: 'Playful', href: '#playful' },
  { label: 'Evolution', href: '#evolution' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`w-full max-w-5xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-s1/80 backdrop-blur-2xl border border-s3/50 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'bg-s1/30 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* 3-column grid: logo | links | cta */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3">

          {/* Left: Logo */}
          <a href="#" className="flex items-center gap-2.5 cursor-pointer flex-shrink-0">
            <img src={`${import.meta.env.BASE_URL}zada-icon.svg`} alt="Zada" width={30} height={30} className="object-contain" style={{ filter: 'drop-shadow(0 0 6px rgba(204,255,0,0.5)) drop-shadow(0 0 12px rgba(204,255,0,0.2))' }} />
            <span className="font-heading font-bold text-white text-[17px] tracking-tight">Zada</span>
          </a>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center justify-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-subtle text-[13px] font-medium px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: CTA + burger */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.a
              href="#join"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:inline-flex items-center bg-acid-lime text-near-black text-[13px] font-heading font-bold px-4 py-2 rounded-xl cursor-pointer hover:brightness-110 transition-brightness duration-150 shadow-[0_0_20px_rgba(204,255,0,0.25)]"
            >
              Join Beta
            </motion.a>

            {/* Mobile burger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1.5 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-0.5 bg-subtle rounded-full origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-0.5 bg-subtle rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-0.5 bg-subtle rounded-full origin-center"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/5 md:hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-subtle text-sm font-medium px-3 py-2.5 rounded-xl hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#join"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 bg-acid-lime text-near-black text-sm font-bold px-4 py-2.5 rounded-xl text-center cursor-pointer font-heading"
                >
                  Join Beta
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
