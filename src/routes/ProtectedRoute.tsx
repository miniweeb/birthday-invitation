import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { PATHS } from '@/routes/paths'

export default function ProtectedRoute() {
  const { status } = useAuth()
  const location = useLocation()

  if (status === 'unauthenticated') {
    return <Navigate to={PATHS.login} state={{ from: location }} replace />
  }

  return <Outlet />
}
