import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface CTAButtonProps {
  text: string
  to?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'gold'
  icon?: boolean
}

export default function CTAButton({ text, to, onClick, variant = 'primary', icon = true }: CTAButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wider uppercase transition-all duration-300"
  
  const variants = {
    primary: "bg-forest text-white hover:bg-forest/90 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-forest border-2 border-forest hover:bg-forest hover:text-white",
    gold: "bg-gold text-white hover:bg-gold/90 shadow-lg hover:shadow-xl"
  }

  const buttonContent = (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {text}
      {icon && <ArrowRight className="w-4 h-4" />}
    </motion.span>
  )

  if (to) {
    return <Link to={to}>{buttonContent}</Link>
  }

  return <button onClick={onClick}>{buttonContent}</button>
}