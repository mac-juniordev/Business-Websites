import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-cream flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Custom Logo Animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mx-auto mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#C9A050', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#8B6914', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="#2D5A27" stroke="url(#goldGrad)" strokeWidth="3"/>
            <g transform="translate(50,50)">
              <ellipse cx="0" cy="12" rx="18" ry="16" fill="#FAF7F2"/>
              <ellipse cx="-18" cy="-8" rx="9" ry="11" fill="#FAF7F2" transform="rotate(-20,-18,-8)"/>
              <ellipse cx="0" cy="-18" rx="9" ry="11" fill="#FAF7F2"/>
              <ellipse cx="18" cy="-8" rx="9" ry="11" fill="#FAF7F2" transform="rotate(20,18,-8)"/>
              <path d="M-12,-20 L-10,-32 L-5,-25 L0,-35 L5,-25 L10,-32 L12,-20 Z" fill="url(#goldGrad)"/>
            </g>
          </svg>
        </motion.div>

        {/* Brand Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-serif text-forest font-bold mb-2"
        >
          Noble Paws
        </motion.h1>

        {/* Loading bar */}
        <motion.div 
          className="w-48 h-0.5 bg-gold/30 mx-auto mt-4 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gold rounded-full"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: '40%' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}