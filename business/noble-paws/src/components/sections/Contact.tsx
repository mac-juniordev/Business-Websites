import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { supabase } from '../../lib/supabase'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    dogInterest: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            dog_interest: formData.dogInterest || null,
          },
        ])

      if (supabaseError) throw supabaseError

      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Failed to send message. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section className="py-20 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-12 max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-serif text-forest font-bold mb-4">Message Sent!</h3>
            <p className="text-charcoal/70 mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-forest font-semibold hover:text-gold transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-forest" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get in Touch"
          subtitle="We'd love to help you find your perfect companion"
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-serif text-white font-bold mb-4">
                Let's Talk
              </h3>
              <p className="text-cream/70 leading-relaxed">
                Whether you're ready to welcome a puppy or just have questions, 
                we're here to help. Reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="tel:+15551234567"
                className="flex items-center gap-4 text-cream/80 hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-cream/50">Call Us</p>
                  <p className="text-white font-semibold">+1 (555) 123-4567</p>
                </div>
              </a>

              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-cream/80 hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                  <MessageCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-cream/50">WhatsApp</p>
                  <p className="text-white font-semibold">Chat with Us</p>
                </div>
              </a>

              <a
                href="mailto:info@noblepaws.com"
                className="flex items-center gap-4 text-cream/80 hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-cream/50">Email</p>
                  <p className="text-white font-semibold">info@noblepaws.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-cream/80">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-cream/50">Visit Us</p>
                  <p className="text-white font-semibold">Beverly Hills, CA 90210</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
              <h4 className="text-lg font-serif text-forest font-bold mb-6">Send us a Message</h4>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-charcoal"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-charcoal"
                    placeholder="john@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-charcoal"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Interested In
                  </label>
                  <select
                    value={formData.dogInterest}
                    onChange={(e) => setFormData({ ...formData, dogInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-charcoal"
                  >
                    <option value="">Select a breed (optional)</option>
                    <option value="Golden Retriever">Golden Retriever</option>
                    <option value="German Shepherd">German Shepherd</option>
                    <option value="Cavalier King Charles Spaniel">Cavalier King Charles Spaniel</option>
                    <option value="Labrador Retriever">Labrador Retriever</option>
                    <option value="French Bulldog">French Bulldog</option>
                    <option value="Other">Other / Not Sure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-charcoal resize-none"
                    placeholder="Tell us about what you're looking for..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-forest text-white py-3 rounded-lg font-semibold hover:bg-forest/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}