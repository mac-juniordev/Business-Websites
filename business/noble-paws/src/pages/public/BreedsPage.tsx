import { motion } from 'framer-motion'
import { Heart, Star, Shield, Zap, Crown } from 'lucide-react'
// import SectionHeader from '../../components/ui/SectionHeader'

const breeds = [
  {
    name: 'Golden Retriever',
    description: 'Intelligent, friendly, and devoted family companions. Golden Retrievers are known for their patience, gentle nature with children, and eagerness to please. They excel as family dogs, service animals, and in dog sports.',
    longDescription: 'Our Golden Retrievers come from champion bloodlines with excellent health clearances including hip, elbow, heart, and eye certifications. Each puppy is raised in our family home with extensive socialization.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
    characteristics: [
      { icon: Heart, text: 'Family-Friendly' },
      { icon: Star, text: 'Intelligent' },
      { icon: Zap, text: 'Active' },
      { icon: Shield, text: 'Gentle' },
    ],
    health: ['Hip & Elbow OFA', 'Cardiac Evaluation', 'Eye Examination', 'Genetic Testing'],
  },
  {
    name: 'German Shepherd',
    description: 'Loyal, courageous, and versatile working dogs. German Shepherds excel in protection, service work, and as devoted family companions. They are highly intelligent and form strong bonds with their families.',
    longDescription: 'Our German Shepherds are from working and show lines with excellent hip scores and working titles. We focus on breeding dogs with stable temperaments and strong nerves.',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80',
    characteristics: [
      { icon: Shield, text: 'Loyal' },
      { icon: Star, text: 'Intelligent' },
      { icon: Zap, text: 'Protective' },
      { icon: Heart, text: 'Trainable' },
    ],
    health: ['Hip & Elbow OFA', 'DM Testing', 'Cardiac Evaluation', 'Temperament Test'],
  },
  {
    name: 'Cavalier King Charles Spaniel',
    description: 'Affectionate, gentle toy spaniels perfect for families, seniors, and apartment living. Cavaliers are known for their sweet expressions and loving nature.',
    longDescription: 'Our Cavaliers undergo comprehensive health testing including MRI screening for Syringomyelia, cardiac evaluation, and genetic testing. We prioritize health and temperament above all.',
    image: 'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=800&q=80',
    characteristics: [
      { icon: Heart, text: 'Affectionate' },
      { icon: Shield, text: 'Gentle' },
      { icon: Star, text: 'Adaptable' },
      { icon: Zap, text: 'Friendly' },
    ],
    health: ['MRI Screening', 'Cardiac Evaluation', 'Eye Examination', 'Patella Evaluation'],
  },
  {
    name: 'Labrador Retriever',
    description: 'America\'s favorite breed for good reason. Labs are friendly, active, and outgoing companions with unmatched versatility as family dogs, hunting partners, and service animals.',
    longDescription: 'Our Labrador Retrievers come from exceptional hunting and show lines. We focus on producing dogs with excellent structure, trainability, and the classic Lab temperament.',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=800&q=80',
    characteristics: [
      { icon: Heart, text: 'Friendly' },
      { icon: Zap, text: 'Active' },
      { icon: Star, text: 'Outgoing' },
      { icon: Shield, text: 'Even-tempered' },
    ],
    health: ['Hip & Elbow OFA', 'Eye Examination', 'EIC Testing', 'Cardiac Evaluation'],
  },
  {
    name: 'French Bulldog',
    description: 'Playful, adaptable companions with distinctive bat ears and charming personalities. Frenchies are excellent apartment dogs with minimal exercise needs.',
    longDescription: 'We breed French Bulldogs with a focus on health and proper structure. Our dogs are specifically selected for open nares and proper palate formation to ensure easy breathing.',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80',
    characteristics: [
      { icon: Heart, text: 'Playful' },
      { icon: Star, text: 'Adaptable' },
      { icon: Shield, text: 'Alert' },
      { icon: Zap, text: 'Affectionate' },
    ],
    health: ['BOAS Testing', 'Spine Evaluation', 'Cardiac Evaluation', 'Patella Evaluation'],
  },
  {
    name: 'Doberman Pinscher',
    description: 'Noble, intelligent guardians with unwavering loyalty to their families. Dobermans are elegant athletes that combine protection with affection.',
    longDescription: 'Our Dobermans are from European working lines with extensive health testing. We focus on producing dogs with stable temperaments, strong nerves, and excellent conformation.',
    image: 'https://images.unsplash.com/photo-1587025977822-9e7cd1ae33ce?w=800&q=80',
    characteristics: [
      { icon: Shield, text: 'Loyal' },
      { icon: Star, text: 'Intelligent' },
      { icon: Zap, text: 'Alert' },
      { icon: Heart, text: 'Fearless' },
    ],
    health: ['DCM Genetic Testing', 'vWD Testing', 'Hip & Elbow OFA', 'Holter Monitoring'],
  },
]

export default function BreedsPage() {
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
              Our Premium Breeds
            </h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              We specialize in select breeds, ensuring each puppy meets the highest standards
            </p>
          </motion.div>
        </div>
      </div>

      {/* Breeds List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-16">
          {breeds.map((breed, index) => (
            <motion.div
              key={breed.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-5 h-5 text-gold" />
                  <h2 className="text-3xl font-serif text-forest font-bold">{breed.name}</h2>
                </div>
                
                <p className="text-charcoal/70 leading-relaxed mb-6">
                  {breed.longDescription}
                </p>

                {/* Characteristics */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {breed.characteristics.map((char) => (
                    <div key={char.text} className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm">
                      <char.icon className="w-4 h-4 text-gold" />
                      <span className="text-sm text-charcoal/70">{char.text}</span>
                    </div>
                  ))}
                </div>

                {/* Health Testing */}
                <div>
                  <h4 className="text-sm font-semibold text-forest mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Health Testing Protocol
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {breed.health.map((test) => (
                      <span
                        key={test}
                        className="px-3 py-1 bg-forest/10 text-forest text-xs rounded-full font-medium"
                      >
                        {test}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}