import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Dog,
  MessageSquare,
  LogOut,
  Home,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Bell,
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    localStorage.removeItem('adminAuth')
    navigate('/admin')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Dog, label: 'Manage Dogs', path: '/admin/dogs' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
  ]

  const currentPage = menuItems.find(item => item.path === location.pathname)

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-charcoal/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? '80px' : '280px' }}
        className={`fixed lg:sticky top-0 z-50 h-screen bg-forest text-white flex flex-col transition-all duration-300 ${
          mobileOpen ? 'left-0' : '-left-full lg:left-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-cream/10">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                  <Dog className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-serif text-lg font-bold text-white">Noble Paws</h1>
                  <p className="text-xs text-cream/50">Admin Panel</p>
                </div>
              </motion.div>
            )}
            {collapsed && (
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center mx-auto">
                <Dog className="w-5 h-5 text-white" />
              </div>
            )}
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-cream/70 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                  isActive
                    ? 'bg-gold text-white shadow-lg'
                    : 'text-cream/70 hover:bg-cream/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium">
                    {item.label}
                  </motion.span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-charcoal text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-cream/10 space-y-2">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-cream/70 hover:bg-cream/10 hover:text-white transition-all ${collapsed ? 'justify-center' : ''}`}
          >
            <Home className="w-5 h-5" />
            {!collapsed && <span className="text-sm">View Website</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all w-full ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-4 top-20 w-8 h-8 bg-gold text-white rounded-full items-center justify-center shadow-lg hover:bg-gold/90 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-forest/10 sticky top-0 z-30">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left: Mobile menu + Page title */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden text-forest hover:text-gold transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-lg font-semibold text-forest">
                    {currentPage?.label || 'Admin'}
                  </h2>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                <button className="p-2 text-charcoal/50 hover:text-forest transition-colors relative">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="h-8 w-px bg-forest/10" />
                <Link
                  to="/"
                  className="hidden sm:flex items-center gap-1 text-sm text-charcoal/50 hover:text-forest transition-colors"
                >
                  <Home className="w-4 h-4" />
                  View Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}