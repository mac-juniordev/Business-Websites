import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Phone,
  Mail,
  Dog,
  CheckCircle,
  Circle,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'

interface Message {
  id: string
  name: string
  email: string
  phone: string
  message: string
  dog_interest: string
  created_at: string
  is_read: boolean
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      navigate('/admin')
      return
    }
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  async function markAsRead(id: string) {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id)

      if (error) throw error
      fetchMessages()
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-forest font-bold">Messages</h2>
          <p className="text-charcoal/50 text-sm mt-1">{messages.length} total messages</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-1">
            {loading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin mx-auto" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <MessageSquare className="w-12 h-12 text-charcoal/20 mx-auto mb-3" />
                <p className="text-charcoal/40 text-sm">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {messages.map((msg) => (
                  <motion.button
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => {
                      setSelectedMessage(msg)
                      if (!msg.is_read) markAsRead(msg.id)
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedMessage?.id === msg.id
                        ? 'bg-forest text-white shadow-lg'
                        : msg.is_read
                        ? 'bg-white hover:bg-cream'
                        : 'bg-white border-2 border-gold/30 hover:bg-cream'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className={`text-sm font-semibold ${selectedMessage?.id === msg.id ? 'text-white' : 'text-forest'}`}>
                        {msg.name}
                      </span>
                      {!msg.is_read && (
                        <Circle className="w-3 h-3 fill-gold text-gold" />
                      )}
                    </div>
                    <p className={`text-xs truncate ${selectedMessage?.id === msg.id ? 'text-cream/70' : 'text-charcoal/50'}`}>
                      {msg.message}
                    </p>
                    <p className={`text-xs mt-2 ${selectedMessage?.id === msg.id ? 'text-cream/50' : 'text-charcoal/30'}`}>
                      {new Date(msg.created_at).toLocaleDateString()}
                    </p>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center">
                      <span className="text-forest font-bold text-lg">
                        {selectedMessage.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-forest">{selectedMessage.name}</h3>
                      <p className="text-sm text-charcoal/50">
                        {new Date(selectedMessage.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {!selectedMessage.is_read && (
                    <button
                      onClick={() => markAsRead(selectedMessage.id)}
                      className="flex items-center gap-1 text-sm text-forest hover:text-gold transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as read
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6 p-4 bg-cream rounded-xl">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-forest" />
                    <div>
                      <p className="text-xs text-charcoal/50">Phone</p>
                      <a href={`tel:${selectedMessage.phone}`} className="text-sm font-medium text-forest hover:text-gold transition-colors">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  </div>
                  {selectedMessage.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-forest" />
                      <div>
                        <p className="text-xs text-charcoal/50">Email</p>
                        <a href={`mailto:${selectedMessage.email}`} className="text-sm font-medium text-forest hover:text-gold transition-colors">
                          {selectedMessage.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {selectedMessage.dog_interest && (
                    <div className="flex items-center gap-2">
                      <Dog className="w-4 h-4 text-forest" />
                      <div>
                        <p className="text-xs text-charcoal/50">Interested In</p>
                        <p className="text-sm font-medium text-forest">{selectedMessage.dog_interest}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-forest mb-3">Message</h4>
                  <p className="text-charcoal/70 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-forest/10 flex gap-3">
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="flex-1 bg-forest text-white py-3 rounded-lg font-semibold text-sm hover:bg-forest/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call Back
                  </a>
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center bg-white rounded-2xl p-12 shadow-lg min-h-[400px]">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-charcoal/10 mx-auto mb-4" />
                  <p className="text-charcoal/40">Select a message to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}