import { CalendarDays, MapPin, Shirt } from 'lucide-react'
import { EVENT_CONFIG } from '@/features/event/eventConfig'
import { useAuth } from '@/hooks/useAuth'

const DETAILS = [
  {
    icon: CalendarDays,
    label: 'Thời gian',
    value: `${EVENT_CONFIG.startTime} • ${EVENT_CONFIG.displayDate}`,
  },
  { icon: MapPin, label: 'Địa điểm', value: `${EVENT_CONFIG.venue}, ${EVENT_CONFIG.address}` },
  { icon: Shirt, label: 'Dress code', value: EVENT_CONFIG.dressCode },
]

export default function InvitationCard() {
  const { user } = useAuth()

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
      <p className="text-center text-sm text-slate-500">Thân mời</p>
      <p className="mt-1 text-center text-lg font-semibold text-rose-500">{user?.displayName}</p>
      <p className="mt-1 text-center text-sm text-slate-500">
        đến dự tiệc sinh nhật {EVENT_CONFIG.hostName}
      </p>

      <dl className="mt-5 space-y-3">
        {DETAILS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex gap-3">
            <Icon className="mt-0.5 size-4 shrink-0 text-rose-400" />
            <div className="min-w-0">
              <dt className="text-xs text-slate-400">{label}</dt>
              <dd className="text-sm text-slate-700">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}
