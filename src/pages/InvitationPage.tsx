import { Sparkles } from 'lucide-react'
import CountdownTimer from '@/features/event/CountdownTimer'
import { EVENT_CONFIG } from '@/features/event/eventConfig'
import { useCountdown } from '@/hooks/useCountdown'

export default function InvitationPage() {
  const { timeLeft, isFinished } = useCountdown(EVENT_CONFIG.date)

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-medium text-slate-700">Invitation</h1>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50 px-5 py-10 text-center shadow-sm md:px-10 md:py-14">
        <Sparkles className="absolute top-6 right-6 size-6 text-rose-200" />

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
      </section>
    </div>
  )
}
