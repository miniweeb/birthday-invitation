import { Route, Routes } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import GuestListPage from '@/pages/GuestListPage'
import InvitationPage from '@/pages/InvitationPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import WishlistPage from '@/pages/WishlistPage'
import { PATHS } from '@/routes/paths'
import ProtectedRoute from '@/routes/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.login} element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path={PATHS.invitation} element={<InvitationPage />} />
          <Route path={PATHS.guests} element={<GuestListPage />} />
          <Route path={PATHS.wishlist} element={<WishlistPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
