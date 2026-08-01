import { motion } from 'motion/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import guests from '@/data/guests.json'
import type { Guest } from '@/types/guest'

export default function GuestListPage() {
  const items = guests as Guest[]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-medium text-slate-700">Danh sách khách mời</h1>
        <p className="text-sm text-slate-500">{items.length} người sẽ có mặt</p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl bg-white px-4 py-8 text-center text-sm text-slate-400 shadow-sm">
          Chưa có khách mời nào.
        </p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((guest, index) => (
            <motion.li
              key={guest.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="flex items-start gap-3 rounded-2xl border border-rose-100 bg-white px-4 py-3 shadow-sm"
            >
              <Avatar className="size-11">
                <AvatarImage src={guest.avatar} alt={guest.name} />
                <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-slate-700">{guest.name}</p>
                  <Badge variant="secondary" className="bg-rose-50 text-rose-500">
                    {guest.relationship}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-slate-500">{guest.note}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}
