import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'
import CTAButton from '../ui/CTAButton'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&q=80"
          alt="Premium Golden Retriever"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Brand Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm px-4 py-2 rounded-full border border-gold/30 mb-6"
          >
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">Premium Breeding Since 2010</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-white font-bold mb-6 leading-tight"
          >
            Where Exceptional
            <br />
            <span className="text-gold">Companions</span> Begin
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-cream/90 mb-8 leading-relaxed"
          >
            We breed with purpose, raise with love, and match with care. 
            Each Noble Paws puppy represents the finest in health, temperament, 
            and conformation from champion bloodlines.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <CTAButton text="View Available Dogs" to="/dogs" variant="gold" />
            <CTAButton text="Contact Us" to="/contact" variant="secondary" />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex gap-8 mt-12 pt-8 border-t border-white/20"
          >
            {[
              { value: '10+', label: 'Years Experience' },
              { value: '100%', label: 'Health Guarantee' },
              { value: '500+', label: 'Happy Families' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-gold">{stat.value}</p>
                <p className="text-sm text-cream/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gold/50 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-3 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}