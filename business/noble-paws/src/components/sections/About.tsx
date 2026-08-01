import { motion } from 'framer-motion'
import { Crown, Heart, Shield, Award } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'

const values = [
  {
    icon: Heart,
    title: 'Raised with Love',
    description: 'Every puppy is raised in our family home with 24/7 care and socialization from day one.',
  },
  {
    icon: Shield,
    title: 'Health First',
    description: 'Comprehensive health testing, vaccinations, and lifetime support for every family.',
  },
  {
    icon: Crown,
    title: 'Champion Lines',
    description: 'We breed from champion bloodlines with exceptional conformation and temperament.',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Our comprehensive 2-year health guarantee gives you complete peace of mind.',
  },
]

export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&q=80"
                alt="Our breeding facility"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 bg-gold text-white p-6 rounded-2xl shadow-xl">
              <p className="text-3xl font-bold">10+</p>
              <p className="text-sm">Years Experience</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader
              title="Our Story"
              subtitle="A legacy of breeding excellence and unconditional love"
              centered={false}
            />

            <p className="text-charcoal/70 leading-relaxed mb-6">
              Founded in 2010, Noble Paws began with a simple mission: to breed exceptional dogs 
              that bring joy, companionship, and love to families. What started as a passion for 
              one breed has grown into a respected breeding program known for quality, health, and temperament.
            </p>
            <p className="text-charcoal/70 leading-relaxed mb-8">
              We believe that every puppy deserves the best start in life. That's why we invest 
              in comprehensive health testing, early socialization, and raising each puppy in a 
              loving home environment. Our commitment doesn't end when you take your puppy home - 
              we provide lifetime support to every family.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((value) => (
                <div key={value.title} className="bg-cream rounded-xl p-4">
                  <value.icon className="w-5 h-5 text-gold mb-2" />
                  <h4 className="text-sm font-semibold text-forest mb-1">{value.title}</h4>
                  <p className="text-xs text-charcoal/60">{value.description}</p>
                </div>
              ))}
            </div>

            <CTAButton text="Learn More About Us" to="/about" variant="primary" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}