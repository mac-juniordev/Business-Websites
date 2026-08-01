export interface Dog {
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
  status: 'Available' | 'Reserved' | 'Sold'
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  review: string
  dog_name: string
  image?: string
}

export const breeds = [
  {
    name: 'Golden Retriever',
    description: 'Intelligent, friendly, and devoted family companions known for their patience and gentle nature.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80',
    characteristics: ['Family-friendly', 'Intelligent', 'Active', 'Gentle'],
  },
  {
    name: 'German Shepherd',
    description: 'Loyal, courageous, and versatile working dogs excelling in protection and companionship.',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600&q=80',
    characteristics: ['Loyal', 'Intelligent', 'Protective', 'Trainable'],
  },
  {
    name: 'Cavalier King Charles Spaniel',
    description: 'Affectionate, gentle toy spaniels perfect for families and companionship.',
    image: 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=600&q=80',
    characteristics: ['Affectionate', 'Gentle', 'Adaptable', 'Friendly'],
  },
  {
    name: 'Labrador Retriever',
    description: 'America\'s favorite breed - friendly, active, and outgoing companions.',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=600&q=80',
    characteristics: ['Friendly', 'Active', 'Outgoing', 'Even-tempered'],
  },
  {
    name: 'French Bulldog',
    description: 'Playful, adaptable companions with distinctive bat ears and charming personalities.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80',
    characteristics: ['Playful', 'Adaptable', 'Alert', 'Affectionate'],
  },
  {
    name: 'Doberman Pinscher',
    description: 'Noble, intelligent guardians with unwavering loyalty to their families.',
    image: 'https://images.unsplash.com/photo-1587025977822-9e7cd1ae33ce?w=600&q=80',
    characteristics: ['Loyal', 'Intelligent', 'Alert', 'Fearless'],
  },
]

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    location: 'Los Angeles, CA',
    review: 'We welcomed Luna into our family six months ago, and she has been an absolute joy. The breeding quality is evident in her temperament and health. Noble Paws provided exceptional guidance throughout the entire process.',
    dog_name: 'Golden Retriever',
  },
  {
    id: '2',
    name: 'James Anderson',
    location: 'San Francisco, CA',
    review: 'Our German Shepherd Max exceeded all expectations. The health clearances and socialization he received made the transition seamless. Professional, caring, and truly dedicated breeders.',
    dog_name: 'German Shepherd',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    location: 'San Diego, CA',
    review: 'Bella, our Cavalier, is the sweetest companion we could have hoped for. The health testing and guarantees gave us complete peace of mind. I recommend Noble Paws to everyone.',
    dog_name: 'Cavalier King Charles Spaniel',
  },
]