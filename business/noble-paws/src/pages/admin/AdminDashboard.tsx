import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Dog,
  MessageSquare,
  Users,
  TrendingUp,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDogs: 0,
    availableDogs: 0,
    unreadMessages: 0,
    totalMessages: 0,
  })
  const [recentMessages, setRecentMessages] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      navigate('/admin')
      return
    }
    fetchStats()
    fetchRecentMessages()
  }, [])

  async function fetchStats() {
    try {
      const { data: dogs } = await supabase.from('dogs').select('*')
      const { data: messages } = await supabase.from('messages').select('*')
      setStats({
        totalDogs: dogs?.length || 0,
        availableDogs: dogs?.filter((d: any) => d.status === 'Available').length || 0,
        unreadMessages: messages?.filter((m: any) => !m.is_read).length || 0,
        totalMessages: messages?.length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  async function fetchRecentMessages() {
    try {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      setRecentMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const statCards = [
    { icon: Dog, label: 'Total Dogs', value: stats.totalDogs, color: 'bg-forest/10 text-forest', link: '/admin/dogs' },
    { icon: TrendingUp, label: 'Available', value: stats.availableDogs, color: 'bg-gold/10 text-gold', link: '/admin/dogs' },
    { icon: MessageSquare, label: 'Unread Messages', value: stats.unreadMessages, color: 'bg-blue-50 text-blue-600', link: '/admin/messages' },
    { icon: Users, label: 'Total Messages', value: stats.totalMessages, color: 'bg-purple-50 text-purple-600', link: '/admin/messages' },
  ]

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-forest font-bold">Dashboard</h2>
            <p className="text-charcoal/50 text-sm mt-1">Welcome back to your admin panel</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Link to={stat.link} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all block group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-charcoal/20 group-hover:text-forest transition-colors" />
                  </div>
                  <p className="text-3xl font-bold text-forest mb-1">{stat.value}</p>
                  <p className="text-sm text-charcoal/50">{stat.label}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-lg font-semibold text-forest mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/admin/dogs" className="flex items-center gap-3 p-4 bg-cream rounded-xl hover:bg-forest/5 transition-colors group">
                  <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-forest" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-forest">Add New Dog</p>
                    <p className="text-xs text-charcoal/50">Create a new dog listing</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-charcoal/20 group-hover:text-forest" />
                </Link>
                <Link to="/admin/messages" className="flex items-center gap-3 p-4 bg-cream rounded-xl hover:bg-forest/5 transition-colors group">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-forest">View Messages</p>
                    <p className="text-xs text-charcoal/50">Check customer inquiries</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-charcoal/20 group-hover:text-forest" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-forest">Recent Messages</h3>
                <Link to="/admin/messages" className="text-sm text-gold hover:text-forest transition-colors">View All</Link>
              </div>
              {recentMessages.length === 0 ? (
                <p className="text-center text-charcoal/40 py-8">No messages yet</p>
              ) : (
                <div className="space-y-3">
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className={`p-4 rounded-xl ${!msg.is_read ? 'bg-forest/5 border border-forest/10' : 'bg-cream'}`}>
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm font-medium text-forest">{msg.name}</p>
                        <span className="text-xs text-charcoal/40">{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-charcoal/60 truncate">{msg.message}</p>
                      {!msg.is_read && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full">New</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  )
}