import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const links = [
    { path: '/', label: 'Home' },
    { path: '/dogs', label: 'Available Dogs' },
    { path: '/breeds', label: 'Breeds' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-forest/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 100 100" className="flex-shrink-0">
              <circle cx="50" cy="50" r="48" fill="#2D5A27" stroke="#C9A050" strokeWidth="3"/>
              <g transform="translate(50,50)">
                <ellipse cx="0" cy="12" rx="18" ry="16" fill="#FAF7F2"/>
                <ellipse cx="-18" cy="-8" rx="9" ry="11" fill="#FAF7F2" transform="rotate(-20,-18,-8)"/>
                <ellipse cx="0" cy="-18" rx="9" ry="11" fill="#FAF7F2"/>
                <ellipse cx="18" cy="-8" rx="9" ry="11" fill="#FAF7F2" transform="rotate(20,18,-8)"/>
                <path d="M-12,-20 L-10,-32 L-5,-25 L0,-35 L5,-25 L10,-32 L12,-20 Z" fill="#C9A050"/>
              </g>
            </svg>
            <span className="text-2xl font-serif text-forest font-bold tracking-wide">
              Noble Paws
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-colors duration-300 relative group ${
                  location.pathname === link.path
                    ? 'text-forest font-semibold'
                    : 'text-charcoal/70 hover:text-forest'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full ${
                  location.pathname === link.path ? 'w-full' : ''
                }`} />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-forest hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-forest/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'bg-forest/10 text-forest font-semibold'
                        : 'text-charcoal/70 hover:bg-cream hover:text-forest'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}