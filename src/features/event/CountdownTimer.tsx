import type { TimeLeft } from '@/types/countdown'

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: 'days', label: 'ngày' },
  { key: 'hours', label: 'giờ' },
  { key: 'minutes', label: 'phút' },
  { key: 'seconds', label: 'giây' },
]

export default function CountdownTimer({ timeLeft }: { timeLeft: TimeLeft }) {
  return (
    <div className="flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2 md:gap-x-6">
      {UNITS.map(({ key, label }) => (
        <div key={key} className="flex items-baseline gap-1.5">
          <span className="text-4xl font-semibold text-rose-500 tabular-nums md:text-6xl">
            {String(timeLeft[key]).padStart(2, '0')}
          </span>
          <span className="text-sm text-slate-500 md:text-lg">{label}</span>
        </div>
      ))}
    </div>
  )
}
