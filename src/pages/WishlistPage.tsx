import { motion } from 'motion/react'
import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import wishlist from '@/data/wishlist.json'
import { useAuth } from '@/hooks/useAuth'
import type { WishItem } from '@/types/wish'

export default function WishlistPage() {
  const { user } = useAuth()

  // derived data — sắp xếp theo mức độ phù hợp với người đang đăng nhập
  const items = useMemo(() => {
    const all = wishlist as WishItem[]
    const order = user?.wishlistOrder ?? []

    return [...all].sort((a, b) => {
      const indexA = order.indexOf(a.id)
      const indexB = order.indexOf(b.id)
      return (indexA === -1 ? order.length : indexA) - (indexB === -1 ? order.length : indexB)
    })
  }, [user])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-medium text-slate-700">Danh sách ước nguyện</h1>
        <p className="text-sm text-slate-500">Gợi ý được sắp xếp riêng cho {user?.displayName}</p>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl bg-white px-4 py-8 text-center text-sm text-slate-400 shadow-sm">
          Chưa có món quà nào trong danh sách.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-rose-50">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="size-full object-cover"
                />
                {index === 0 && (
                  <Badge className="absolute top-3 left-3 bg-rose-500">Phù hợp nhất</Badge>
                )}
              </div>

              <div className="space-y-1 px-4 py-3">
                <p className="text-sm font-medium text-slate-700">{item.title}</p>
                <p className="text-sm text-rose-500">{item.priceRange}</p>
                <p className="text-xs text-slate-500">{item.note}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}
