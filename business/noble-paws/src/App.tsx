import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import LoadingScreen from './components/ui/LoadingScreen'
import AppRoutes from './routes'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App