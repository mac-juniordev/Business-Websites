import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function ContactPage() {
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
      setFormData({ name: '', email: '', phone: '', message: '', dogInterest: '' })
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Failed to send message. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
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
              Get in Touch
            </h1>
            <p className="text-cream/70 text-lg max-w-2xl mx-auto">
              We'd love to help you find your perfect companion. Reach out through any channel below.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-12 shadow-xl text-center">
              <div className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-serif text-forest font-bold mb-4">Message Sent Successfully!</h2>
              <p className="text-charcoal/70 mb-8">
                Thank you for reaching out to Noble Paws. We typically respond within 24 hours.
                In the meantime, feel free to browse our available puppies.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-forest text-white px-8 py-3 rounded-full font-semibold hover:bg-forest/90 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-serif text-forest font-bold mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1">Phone</p>
                      <p className="text-forest font-semibold group-hover:text-gold transition-colors">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/15551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1">WhatsApp</p>
                      <p className="text-forest font-semibold group-hover:text-green-600 transition-colors">
                        Chat with Us
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@noblepaws.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1">Email</p>
                      <p className="text-forest font-semibold group-hover:text-blue-600 transition-colors">
                        info@noblepaws.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1">Location</p>
                      <p className="text-forest font-semibold">Beverly Hills, CA 90210</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-charcoal/50 mb-1">Hours</p>
                      <p className="text-forest font-semibold">Mon-Sat: 9AM - 6PM</p>
                      <p className="text-xs text-charcoal/50">Sunday: By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gold/10 rounded-2xl p-8 border border-gold/20">
                <h3 className="text-lg font-semibold text-forest mb-3">Ready to Find Your Puppy?</h3>
                <p className="text-sm text-charcoal/60 mb-4">
                  Browse our available puppies and find your perfect companion today.
                </p>
                <a
                  href="/dogs"
                  className="inline-block bg-gold text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-gold/90 transition-colors"
                >
                  View Available Dogs
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-serif text-forest font-bold mb-2">Send us a Message</h3>
                <p className="text-charcoal/60 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                        <option value="Doberman Pinscher">Doberman Pinscher</option>
                        <option value="Bernese Mountain Dog">Bernese Mountain Dog</option>
                        <option value="Poodle (Standard)">Poodle (Standard)</option>
                        <option value="Other">Other / Not Sure</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-charcoal resize-none"
                      placeholder="Tell us about what you're looking for in a puppy..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-forest text-white py-4 rounded-full font-semibold hover:bg-forest/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}