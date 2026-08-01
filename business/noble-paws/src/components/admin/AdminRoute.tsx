import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface AdminRouteProps {
  children: ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    setIsAuth(auth === 'true')
  }, [])

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-forest/30 border-t-forest rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuth) {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}