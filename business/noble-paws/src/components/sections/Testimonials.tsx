import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'Los Angeles, CA',
    review: 'We welcomed Luna into our family six months ago, and she has been an absolute joy. The breeding quality is evident in her temperament, health, and beauty. Noble Paws provided exceptional guidance throughout the entire process and continues to check in on us.',
    dog: 'Golden Retriever',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    name: 'James Anderson',
    location: 'San Francisco, CA',
    review: 'Our German Shepherd Max exceeded all expectations. The health clearances, socialization, and training foundation he received made the transition seamless. Professional, caring, and truly dedicated to their dogs.',
    dog: 'German Shepherd',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Emily Rodriguez',
    location: 'San Diego, CA',
    review: 'Bella, our Cavalier, is the sweetest companion we could have hoped for. The comprehensive health testing and guarantees gave us complete peace of mind. I recommend Noble Paws to everyone looking for a quality puppy.',
    dog: 'Cavalier King Charles Spaniel',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Happy Families"
          subtitle="Hear from families who have welcomed a Noble Paws puppy into their lives"
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-gold/20 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Review */}
              <p className="text-charcoal/70 text-sm leading-relaxed mb-6">
                "{testimonial.review}"
              </p>

              {/* Dog Info */}
              <p className="text-xs text-gold font-semibold mb-4">
                {testimonial.dog}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-forest/10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-forest">{testimonial.name}</p>
                  <p className="text-xs text-charcoal/50">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}