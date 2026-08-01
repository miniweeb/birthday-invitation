import timeline from '@/data/timeline.json'
import type { TimelineItem } from '@/types/timeline'

export default function EventTimeline() {
  const items = timeline as TimelineItem[]

  if (items.length === 0) {
    return <p className="text-sm text-slate-400">Lịch trình đang được cập nhật.</p>
  }

  return (
    <ol className="relative space-y-3 border-l border-rose-200 pl-5">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute top-3 -left-[27px] size-2.5 rounded-full bg-rose-300 ring-4 ring-rose-50" />
          <div className="flex items-start gap-3 rounded-xl bg-white px-3 py-2.5 shadow-sm">
            <span className="text-sm font-semibold text-rose-500 tabular-nums">{item.time}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-700">{item.title}</p>
              <p className="text-xs text-slate-500">{item.description}</p>
            </div>
            <span aria-hidden className="text-lg">
              {item.emoji}
            </span>
          </div>
        </li>
      ))}
    </ol>
  )
}
