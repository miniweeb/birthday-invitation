import { useEffect, useState } from 'react'
import type { TimeLeft } from '@/types/countdown'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(target.getTime() - Date.now(), 0)

  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
  }
}

export function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target))

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), SECOND)
    return () => clearInterval(timer)
  }, [target])

  const isFinished =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0

  return { timeLeft, isFinished }
}
