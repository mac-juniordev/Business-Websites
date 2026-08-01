import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}>
        <Crown className="w-6 h-6 text-gold" />
        <h2 className="text-3xl md:text-4xl font-serif text-forest font-bold">
          {title}
        </h2>
        <Crown className="w-6 h-6 text-gold" />
      </div>
      {subtitle && (
        <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}