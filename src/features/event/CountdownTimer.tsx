import { AnimatePresence, motion } from 'motion/react'
import type { TimeLeft } from '@/types/countdown'

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: 'days', label: 'ngày' },
  { key: 'hours', label: 'giờ' },
  { key: 'minutes', label: 'phút' },
  { key: 'seconds', label: 'giây' },
]

export default function CountdownTimer({ timeLeft }: { timeLeft: TimeLeft }) {
  return (
    <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2 sm:gap-x-5 md:gap-x-7">
      {UNITS.map(({ key, label }) => {
        const value = String(timeLeft[key]).padStart(2, '0')

        return (
          <div key={key} className="flex items-baseline gap-1.5">
            <span className="relative inline-block overflow-hidden text-3xl font-semibold text-rose-500 tabular-nums sm:text-4xl md:text-6xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={value}
                  initial={{ y: '-60%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '60%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="inline-block"
                >
                  {value}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-xs text-slate-500 sm:text-sm md:text-lg">{label}</span>
          </div>
        )
      })}
    </div>
  )
}
