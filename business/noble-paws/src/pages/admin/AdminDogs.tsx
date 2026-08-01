import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Edit,
  Trash2,
  Dog,
  X,
  Save,
  Upload,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AdminLayout from '../../components/admin/AdminLayout'

interface Dog {
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
  status: string
}

export default function AdminDogs() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingDog, setEditingDog] = useState<Dog | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: 'Male',
    price: '',
    description: '',
    temperament: '',
    vaccination_status: '',
    status: 'Available',
    images: [] as string[],
  })
  const navigate = useNavigate()

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth')
    if (!isAuth) {
      navigate('/admin')
      return
    }
    fetchDogs()
  }, [])

  async function fetchDogs() {
    try {
      const { data, error } = await supabase
        .from('dogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setDogs(data || [])
    } catch (error) {
      console.error('Error fetching dogs:', error)
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      breed: '',
      age: '',
      gender: 'Male',
      price: '',
      description: '',
      temperament: '',
      vaccination_status: '',
      status: 'Available',
      images: [],
    })
    setEditingDog(null)
    setShowForm(false)
  }

  function editDog(dog: Dog) {
    setEditingDog(dog)
    setFormData({
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      gender: dog.gender,
      price: dog.price.toString(),
      description: dog.description || '',
      temperament: dog.temperament || '',
      vaccination_status: dog.vaccination_status || '',
      status: dog.status,
      images: dog.images || [],
    })
    setShowForm(true)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newImages: string[] = []

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `public/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('dog-images')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('dog-images')
          .getPublicUrl(filePath)

        newImages.push(publicUrl)
      }

      setFormData({
        ...formData,
        images: [...formData.images, ...newImages],
      })
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Failed to upload images')
    } finally {
      setUploading(false)
    }
  }

  function removeImage(index: number) {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const dogData = {
        name: formData.name,
        breed: formData.breed,
        age: formData.age,
        gender: formData.gender,
        price: parseFloat(formData.price),
        description: formData.description,
        temperament: formData.temperament,
        vaccination_status: formData.vaccination_status,
        images: formData.images,
        status: formData.status,
      }

      if (editingDog) {
        const { error } = await supabase
          .from('dogs')
          .update(dogData)
          .eq('id', editingDog.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('dogs')
          .insert([dogData])

        if (error) throw error
      }

      resetForm()
      fetchDogs()
    } catch (error) {
      console.error('Error saving dog:', error)
      alert('Failed to save dog')
    }
  }

  async function deleteDog(id: string) {
    if (!confirm('Are you sure you want to delete this dog?')) return

    try {
      const { error } = await supabase
        .from('dogs')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchDogs()
    } catch (error) {
      console.error('Error deleting dog:', error)
      alert('Failed to delete dog')
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-serif text-forest font-bold">Manage Dogs</h2>
            <p className="text-charcoal/50 text-sm mt-1">{dogs.length} dogs listed</p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="bg-forest text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-forest/90 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add New Dog
          </button>
        </div>

        {/* Dog Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/50 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto"
              onClick={(e) => { if (e.target === e.currentTarget) resetForm(); }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl mb-20"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-serif text-forest font-bold">
                    {editingDog ? 'Edit Dog' : 'Add New Dog'}
                  </h3>
                  <button onClick={resetForm} className="text-charcoal/40 hover:text-charcoal transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Name *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Breed *</label>
                      <input type="text" required value={formData.breed} onChange={(e) => setFormData({ ...formData, breed: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Age *</label>
                      <input type="text" required value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} placeholder="12 weeks" className="w-full px-3 py-2 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Gender *</label>
                      <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none text-sm">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Price *</label>
                      <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Status</label>
                      <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none text-sm">
                        <option value="Available">Available</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">Description</label>
                    <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none text-sm resize-none" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Temperament</label>
                      <input type="text" value={formData.temperament} onChange={(e) => setFormData({ ...formData, temperament: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">Vaccination Status</label>
                      <input type="text" value={formData.vaccination_status} onChange={(e) => setFormData({ ...formData, vaccination_status: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-forest/20 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Images</label>
                    <div className="flex flex-wrap gap-3 mb-3">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-cream rounded-lg cursor-pointer hover:bg-forest/5 transition-colors text-sm">
                      <Upload className="w-4 h-4" />
                      {uploading ? 'Uploading...' : 'Upload Images'}
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button type="submit" className="flex-1 bg-forest text-white py-3 rounded-lg font-semibold hover:bg-forest/90 transition-colors flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" />
                      {editingDog ? 'Update Dog' : 'Add Dog'}
                    </button>
                    <button type="button" onClick={resetForm} className="px-6 py-3 border border-forest/20 rounded-lg text-charcoal/70 hover:bg-cream transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dogs List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin mx-auto" />
          </div>
        ) : dogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <Dog className="w-16 h-16 text-charcoal/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-charcoal/50 mb-2">No dogs listed yet</h3>
            <p className="text-charcoal/40 text-sm mb-4">Add your first dog listing to get started</p>
            <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-forest text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-forest/90 transition-colors">
              Add First Dog
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogs.map((dog, index) => (
              <motion.div
                key={dog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={dog.images?.[0] || 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&q=80'}
                    alt={dog.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-forest">{dog.name}</h3>
                      <p className="text-xs text-charcoal/50">{dog.breed}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      dog.status === 'Available' ? 'bg-forest/10 text-forest' :
                      dog.status === 'Reserved' ? 'bg-gold/10 text-gold' :
                      'bg-red-50 text-red-500'
                    }`}>
                      {dog.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-charcoal/60 mb-4">
                    <span>{dog.age}</span>
                    <span>{dog.gender}</span>
                    <span className="font-semibold text-gold">${dog.price?.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => editDog(dog)} className="flex-1 bg-forest/10 text-forest py-2 rounded-lg text-sm font-medium hover:bg-forest/20 transition-colors flex items-center justify-center gap-1">
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button onClick={() => deleteDog(dog.id)} className="flex-1 bg-red-50 text-red-500 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}