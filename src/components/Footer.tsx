import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Ranks', href: '#ranks' },
  { label: 'Join Beta', href: '#join' },
]

const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Discord',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 12c0 .552-.224 1-.5 1S8 12.552 8 12s.224-1 .5-1 .5.448.5 1zm7 0c0 .552-.224 1-.5 1s-.5-.448-.5-1 .224-1 .5-1 .5.448.5 1z" fill="currentColor" />
        <path d="M8.5 17s1 1 3.5 1 3.5-1 3.5-1M7 7.5C8.5 6.5 10 6 12 6s3.5.5 5 1.5M5 17.5c.5.5 1.5 1 3 1.5l-.5 2s-3-1-4-3.5L4 9.5S6 7 8 6.5M19 17.5c-.5.5-1.5 1-3 1.5l.5 2s3-1 4-3.5L20.5 9.5S18.5 7 16.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-s2/50 px-4 pt-14 pb-8">
      {/* Subtle lime glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-acid-lime/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#" className="flex items-center gap-2.5 cursor-pointer mb-4">
              <img src={`${import.meta.env.BASE_URL}zada-icon.svg`} alt="Zada" width={28} height={28} className="object-contain" />
              <span className="font-heading font-bold text-white text-lg">Zada</span>
            </a>
            <p className="text-muted text-sm leading-relaxed">
              The travel gamification app for Erasmus students. Dare more.
              Explore deeper. Remember everything.
            </p>
            <div className="flex gap-2.5 mt-5">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={s.label}
                  className="w-9 h-9 bg-s2 border border-s3/50 rounded-xl flex items-center justify-center text-muted hover:text-white hover:border-s3 transition-all duration-200 cursor-pointer"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Navigate</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-muted text-sm hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Company</p>
            <ul className="flex flex-col gap-2.5">
              {['Blog', 'Press', 'Careers', 'Contact'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-muted text-sm hover:text-white transition-colors duration-200 cursor-pointer">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-s2/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">© 2025 Zada. Built with daring ambition.</p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Cookies'].map((l) => (
              <a key={l} href="#" className="text-muted text-xs hover:text-subtle transition-colors cursor-pointer">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
