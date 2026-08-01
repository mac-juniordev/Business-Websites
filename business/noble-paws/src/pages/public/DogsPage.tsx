import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Shield, Search, Filter } from 'lucide-react'
import { supabase } from '../../lib/supabase'
// import SectionHeader from '../../components/ui/SectionHeader'

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

export default function DogsPage() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredDog, setHoveredDog] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchDogs()
  }, [])

  async function fetchDogs() {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDogs(data || [])
    } catch (error) {
      console.error('Error fetching dogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDogs = dogs.filter(dog => {
    const matchesFilter = filter === 'all' || dog.status === filter
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto" />
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">
              Available Puppies
            </h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              Each puppy is raised with exceptional care, health testing, and socialization
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-charcoal"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'Available', 'Reserved', 'Sold'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === status
                      ? 'bg-forest text-white'
                      : 'bg-cream text-charcoal/70 hover:bg-forest/10'
                  }`}
                >
                  {status === 'all' ? 'All' : status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dogs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredDogs.length === 0 ? (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-charcoal/50">No dogs found</h3>
            <p className="text-charcoal/40 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDogs.map((dog, index) => (
              <motion.div
                key={dog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredDog(dog.id)}
                onMouseLeave={() => setHoveredDog(null)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={dog.images[0] || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80'}
                    alt={dog.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredDog === dog.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      dog.status === 'Available' ? 'bg-forest text-white' :
                      dog.status === 'Reserved' ? 'bg-gold text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {dog.status}
                    </span>
                  </div>

                  {/* Desktop Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent transition-opacity duration-300 hidden md:flex flex-col justify-end p-6 ${
                    hoveredDog === dog.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <p className="text-white text-sm leading-relaxed mb-3">
                      {dog.description?.substring(0, 120)}...
                    </p>
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
                      ${dog.price?.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-4 text-sm text-charcoal/70 mb-4">
                    <span>{dog.age}</span>
                    <span className="text-forest/30">|</span>
                    <span>{dog.gender}</span>
                  </div>

                  {/* Mobile Description */}
                  <div className="md:hidden mb-4">
                    <p className="text-sm text-charcoal/60 leading-relaxed">
                      {dog.description?.substring(0, 100)}...
                    </p>
                    <Link
                      to={`/dogs/${dog.id}`}
                      className="text-forest font-semibold text-sm hover:text-gold transition-colors mt-2 inline-block"
                    >
                      View Details →
                    </Link>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-forest/10">
                    <div className="flex items-center gap-1 text-xs text-charcoal/50">
                      <Heart className="w-3 h-3 text-gold" />
                      <span>{dog.temperament?.split(',')[0]}</span>
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
        )}
      </div>
    </div>
  )
}