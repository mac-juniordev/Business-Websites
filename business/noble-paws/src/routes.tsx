import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminRoute from './components/admin/AdminRoute'
import HomePage from './pages/public/HomePage'
import DogsPage from './pages/public/DogsPage'
import DogDetailPage from './pages/public/DogDetailPage'
import BreedsPage from './pages/public/BreedsPage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDogs from './pages/admin/AdminDogs'
import AdminMessages from './pages/admin/AdminMessages'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="dogs" element={<DogsPage />} />
        <Route path="dogs/:id" element={<DogDetailPage />} />
        <Route path="breeds" element={<BreedsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Admin Routes - Protected */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dogs"
        element={
          <AdminRoute>
            <AdminDogs />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/messages"
        element={
          <AdminRoute>
            <AdminMessages />
          </AdminRoute>
        }
      />
    </Routes>
  )
}