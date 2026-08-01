import { Gift, Heart, MailOpen, Users } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { PATHS } from '@/routes/paths'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { to: PATHS.invitation, label: 'Invitation', icon: MailOpen },
  { to: PATHS.guests, label: 'Guest List', icon: Users },
  { to: PATHS.wishlist, label: 'Wish List', icon: Gift },
]

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-rose-50/40">
      <aside className="flex w-20 flex-col items-center gap-6 border-r bg-white py-6">
        <Heart className="size-6 fill-rose-400 text-rose-400" />
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                cn(
                  'flex w-16 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] text-slate-500 transition-colors hover:bg-rose-50',
                  isActive && 'bg-rose-100 font-medium text-rose-500',
                )
              }
            >
              <Icon className="size-5" />
              <span className="text-center leading-tight">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 px-6 py-6">
        <Outlet />
      </main>
    </div>
  )
}
