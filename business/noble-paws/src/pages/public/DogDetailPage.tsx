import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart,
  Shield,
  Syringe,
  Calendar,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

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

export default function DogDetailPage() {
  const { id } = useParams()
  const [dog, setDog] = useState<Dog | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (id) fetchDog()
  }, [id])

  async function fetchDog() {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setDog(data)
    } catch (error) {
      console.error('Error fetching dog:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-48" />
                <div className="h-6 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!dog) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-forest font-bold mb-4">Dog Not Found</h2>
          <Link to="/dogs" className="text-gold hover:text-forest transition-colors">
            ← Back to Available Dogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/dogs"
          className="inline-flex items-center gap-2 text-charcoal/60 hover:text-forest transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Available Dogs</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl mb-4">
              <img
                src={dog.images[selectedImage] || dog.images[0]}
                alt={dog.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {dog.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {dog.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-gold' : 'border-transparent hover:border-forest/30'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${dog.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Dog Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Status Badge */}
            <div className="mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider ${
                dog.status === 'Available' ? 'bg-forest text-white' :
                dog.status === 'Reserved' ? 'bg-gold text-white' :
                'bg-red-500 text-white'
              }`}>
                {dog.status}
              </span>
            </div>

            {/* Name & Breed */}
            <h1 className="text-4xl md:text-5xl font-serif text-forest font-bold mb-2">
              {dog.name}
            </h1>
            <p className="text-xl text-charcoal/60 mb-6">{dog.breed}</p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Calendar className="w-5 h-5 text-gold mb-2" />
                <p className="text-xs text-charcoal/50">Age</p>
                <p className="text-lg font-semibold text-forest">{dog.age}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Heart className="w-5 h-5 text-gold mb-2" />
                <p className="text-xs text-charcoal/50">Gender</p>
                <p className="text-lg font-semibold text-forest">{dog.gender}</p>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gold/10 rounded-2xl p-6 mb-8 border border-gold/20">
              <p className="text-sm text-gold/80 mb-1">Investment</p>
              <p className="text-4xl font-bold text-gold">
                ${dog.price?.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-forest mb-3">About {dog.name}</h3>
              <p className="text-charcoal/70 leading-relaxed">{dog.description}</p>
            </div>

            {/* Temperament */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-forest mb-3">Temperament</h3>
              <p className="text-charcoal/70">{dog.temperament}</p>
            </div>

            {/* Health Information */}
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h3 className="text-lg font-semibold text-forest mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-forest" />
                Health Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-charcoal/70">
                  <Syringe className="w-4 h-4 text-forest" />
                  <span>{dog.vaccination_status}</span>
                </div>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-forest mb-3">Interested? Get in Touch</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:+15551234567`}
                  className="flex-1 bg-forest text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-forest/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/15551234567?text=I'm interested in ${dog.name} the ${dog.breed}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
              <Link
                to={`/contact`}
                className="block text-center bg-gold text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gold/90 transition-colors"
              >
                <Mail className="w-4 h-4 inline mr-2" />
                Send Message
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}