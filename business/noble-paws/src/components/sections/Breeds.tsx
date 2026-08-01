import { motion } from 'framer-motion'
import { Star, Heart, Shield, Zap } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'

const popularBreeds = [
  {
    name: 'Golden Retriever',
    description: 'Intelligent, friendly, and devoted family companions known for their patience and gentle nature with children.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
    characteristics: [
      { icon: Heart, text: 'Family-Friendly' },
      { icon: Star, text: 'Intelligent' },
      { icon: Zap, text: 'Active' },
      { icon: Shield, text: 'Gentle' },
    ],
  },
  {
    name: 'German Shepherd',
    description: 'Loyal, courageous, and versatile working dogs excelling in protection, service, and family companionship.',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80',
    characteristics: [
      { icon: Shield, text: 'Loyal' },
      { icon: Star, text: 'Intelligent' },
      { icon: Zap, text: 'Protective' },
      { icon: Heart, text: 'Trainable' },
    ],
  },
  {
    name: 'Cavalier King Charles',
    description: 'Affectionate, gentle toy spaniels perfect for families, seniors, and those seeking a devoted companion.',
    image: 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=600&q=80',
    characteristics: [
      { icon: Heart, text: 'Affectionate' },
      { icon: Shield, text: 'Gentle' },
      { icon: Star, text: 'Adaptable' },
      { icon: Zap, text: 'Friendly' },
    ],
  },
  {
    name: 'Labrador Retriever',
    description: 'America\'s favorite breed - friendly, active, and outgoing companions with unmatched versatility.',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=600&q=80',
    characteristics: [
      { icon: Heart, text: 'Friendly' },
      { icon: Zap, text: 'Active' },
      { icon: Star, text: 'Outgoing' },
      { icon: Shield, text: 'Even-tempered' },
    ],
  },
]

export default function Breeds() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Premium Breeds"
          subtitle="We specialize in select breeds, ensuring each puppy meets the highest standards of health and temperament"
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {popularBreeds.map((breed, index) => (
            <motion.div
              key={breed.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
            >
              {/* Breed Image */}
              <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
                <img
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Breed Info */}
              <div className="md:w-3/5 p-6">
                <h3 className="text-xl font-serif text-forest font-bold mb-2">
                  {breed.name}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed mb-4">
                  {breed.description}
                </p>

                {/* Characteristics */}
                <div className="grid grid-cols-2 gap-2">
                  {breed.characteristics.map((char) => (
                    <div key={char.text} className="flex items-center gap-2 text-xs text-charcoal/70">
                      <char.icon className="w-3 h-3 text-gold" />
                      <span>{char.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <CTAButton text="Explore All Breeds" to="/breeds" variant="primary" />
        </motion.div>
      </div>
    </section>
  )
}