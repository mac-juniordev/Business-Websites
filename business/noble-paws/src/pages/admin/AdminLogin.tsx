import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, LogIn } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase
        .from('admin')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single()

      if (error || !data) {
        throw new Error('Invalid credentials')
      }

      // Store admin session
      localStorage.setItem('adminAuth', 'true')
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-forest rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-2xl font-serif text-forest font-bold">Noble Paws Admin</h1>
          <p className="text-charcoal/50 text-sm mt-1">Sign in to manage your kennel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-charcoal"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all text-charcoal"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest text-white py-3 rounded-lg font-semibold hover:bg-forest/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-forest/10 text-center">
            <p className="text-xs text-charcoal/40">
              Default credentials: admin / admin123
            </p>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-charcoal/50 hover:text-forest transition-colors"
          >
            ← Back to Website
          </a>
        </div>
      </motion.div>
    </div>
  )
}