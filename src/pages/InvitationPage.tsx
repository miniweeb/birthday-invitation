import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import CountdownTimer from '@/features/event/CountdownTimer'
import EventTimeline from '@/features/event/EventTimeline'
import InvitationCard from '@/features/event/InvitationCard'
import { EVENT_CONFIG } from '@/features/event/eventConfig'
import { useCountdown } from '@/hooks/useCountdown'
import { cn } from '@/lib/utils'

export default function InvitationPage() {
  const { timeLeft, isFinished } = useCountdown(EVENT_CONFIG.date)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-medium text-slate-700">Invitation</h1>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50 px-5 py-10 text-center shadow-sm md:px-10 md:py-14">
        {isFinished ? (
          <>
            <h2 className="text-2xl font-semibold text-rose-500 md:text-4xl">
              Hôm nay là ngày rồi! 🎉
            </h2>
            <p className="mt-3 text-sm text-slate-500">Hẹn gặp bạn tại bữa tiệc nhé.</p>
          </>
        ) : (
          <>
            <h2 className="mb-6 text-xl font-medium text-slate-700 md:text-3xl">
              Đếm ngược đến sinh nhật {EVENT_CONFIG.title}!
            </h2>
            <CountdownTimer timeLeft={timeLeft} />
            <p className="mt-6 text-sm text-slate-500">Sắp đến rồi! Đừng quên lưu lịch nhé.</p>
          </>
        )}

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-8">
          <CollapsibleTrigger asChild>
            <Button className="bg-rose-500 hover:bg-rose-600">
              Mở Thiệp mời &amp; Lịch trình
              <ChevronDown
                className={cn('ml-1 size-4 transition-transform', isOpen && 'rotate-180')}
              />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-6 grid gap-4 text-left md:grid-cols-2">
            <InvitationCard />
            <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-5">
              <h3 className="mb-4 text-sm font-medium text-slate-700">Timeline</h3>
              <EventTimeline />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </section>
    </div>
  )
}
