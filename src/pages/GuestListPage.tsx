import { Heart, House, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import guests from '@/data/guests.json'
import type { Guest } from '@/types/guest'

const RELATIONSHIP_STYLE: Record<string, { icon: typeof Heart; bg: string; text: string }> = {
  'Gia đình': { icon: House, bg: 'bg-amber-100', text: 'text-amber-600' },
  'Người yêu': { icon: Heart, bg: 'bg-rose-100', text: 'text-rose-500' },
  'Bạn bè': { icon: Sparkles, bg: 'bg-sky-100', text: 'text-sky-600' },
}

const FALLBACK = { icon: Sparkles, bg: 'bg-slate-100', text: 'text-slate-500' }

export default function GuestListPage() {
  const items = guests as Guest[]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-medium text-slate-700">Danh sách khách mời</h1>
        <p className="text-sm text-slate-500">{items.length} người sẽ có mặt</p>
      </div>

      <ul className="grid gap-3 md:grid-cols-2">
        {items.map((guest, index) => {
          const style = RELATIONSHIP_STYLE[guest.relationship] ?? FALLBACK
          const Icon = style.icon

          return (
            <motion.li
              key={guest.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="flex items-start gap-3 rounded-2xl border border-rose-100 bg-white px-4 py-3 shadow-sm"
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-full ${style.bg}`}
              >
                <Icon className={`size-5 ${style.text}`} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-slate-700">{guest.name}</p>
                  <Badge variant="secondary" className={`${style.bg} ${style.text}`}>
                    {guest.relationship}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">{guest.note}</p>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
