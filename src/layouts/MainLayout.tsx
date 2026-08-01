import { Gift, Heart, LogOut, MailOpen, Users } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { PATHS } from '@/routes/paths'

const NAV_ITEMS = [
  { to: PATHS.invitation, label: 'Invitation', icon: MailOpen },
  { to: PATHS.guests, label: 'Guest List', icon: Users },
  { to: PATHS.wishlist, label: 'Wish List', icon: Gift },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] text-slate-500 transition-colors hover:bg-rose-50 md:w-16 md:flex-none',
    isActive && 'bg-rose-100 font-medium text-rose-500',
  )

export default function MainLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-rose-50/40 md:flex-row">
      <aside className="hidden md:flex md:w-20 md:flex-col md:items-center md:gap-6 md:border-r md:bg-white md:py-6">
        <Heart className="size-6 fill-rose-400 text-rose-400" />

        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end className={linkClass}>
              <Icon className="size-5" />
              <span className="text-center leading-tight">{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex w-16 cursor-pointer flex-col items-center gap-1 rounded-xl py-2 text-[10px] text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
        >
          <LogOut className="size-5" />
          <span>Đăng xuất</span>
        </button>
      </aside>

      <header className="flex items-center justify-between border-b bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <Heart className="size-5 fill-rose-400 text-rose-400" />
          <span className="text-sm font-medium">{user?.displayName}</span>
        </div>
        <button onClick={logout} className="cursor-pointer text-slate-400 hover:text-rose-500">
          <LogOut className="size-5" />
        </button>
      </header>

      <main className="flex-1 px-4 py-4 pb-24 md:px-6 md:py-6 md:pb-6">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 flex gap-1 border-t bg-white px-2 py-2 md:hidden">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end className={linkClass}>
            <Icon className="size-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
