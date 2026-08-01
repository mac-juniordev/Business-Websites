import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Shield, Sparkles } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import SectionHeader from '../ui/SectionHeader'
import CTAButton from '../ui/CTAButton'

interface Dog {
  id: string
  name: string
  breed: string
  age: string
  gender: string
  price: number
  description: string
  temperament: string
  vaccination_status: string
  images: string[]
  status: string
}

export default function FeaturedDogs() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredDog, setHoveredDog] = useState<string | null>(null)

  useEffect(() => {
    fetchDogs()
  }, [])

  async function fetchDogs() {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .eq('status', 'Available')
        .limit(3)
        .order('created_at', { ascending: false })

      if (error) throw error
      setDogs(data || [])
    } catch (error) {
      console.error('Error fetching dogs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto" />
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-96 bg-gray-200 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Available Puppies"
          subtitle="Each puppy is raised with exceptional care and comes with comprehensive health guarantees"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {dogs.map((dog, index) => (
            <motion.div
              key={dog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onMouseEnter={() => setHoveredDog(dog.id)}
              onMouseLeave={() => setHoveredDog(null)}
              className="group relative bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={dog.images[0] || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'}
                  alt={dog.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredDog === dog.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    dog.status === 'Available' ? 'bg-forest text-white' :
                    dog.status === 'Reserved' ? 'bg-gold text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {dog.status}
                  </span>
                </div>

                {/* Hover Overlay - Desktop Only */}
                <div className={`absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent transition-opacity duration-300 hidden md:flex flex-col justify-end p-6 ${
                  hoveredDog === dog.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <p className="text-white text-sm leading-relaxed mb-3">{dog.description.substring(0, 120)}...</p>
                  <Link
                    to={`/dogs/${dog.id}`}
                    className="text-gold font-semibold text-sm hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    View Details →
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-forest font-bold">{dog.name}</h3>
                    <p className="text-charcoal/60 text-sm">{dog.breed}</p>
                  </div>
                  <p className="text-2xl font-bold text-gold">
                    ${dog.price.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-4 text-sm text-charcoal/70 mb-4">
                  <span>{dog.age}</span>
                  <span className="text-forest/30">|</span>
                  <span>{dog.gender}</span>
                </div>

                {/* Mobile Description (always visible) */}
                <div className="md:hidden">
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-3">
                    {dog.description.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/dogs/${dog.id}`}
                    className="text-forest font-semibold text-sm hover:text-gold transition-colors"
                  >
                    View Details →
                  </Link>
                </div>

                {/* Quick Info Icons */}
                <div className="flex gap-4 mt-4 pt-4 border-t border-forest/10">
                  <div className="flex items-center gap-1 text-xs text-charcoal/50">
                    <Heart className="w-3 h-3 text-gold" />
                    <span>{dog.temperament.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-charcoal/50">
                    <Shield className="w-3 h-3 text-forest" />
                    <span>Vaccinated</span>
                  </div>
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
          <CTAButton text="View All Available Dogs" to="/dogs" variant="primary" />
        </motion.div>
      </div>
    </section>
  )
}