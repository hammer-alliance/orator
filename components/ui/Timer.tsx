'use client'

import { useEffect, useRef, useState } from 'react'

type TimerProps = {
  durationSeconds: number
  running: boolean
  onComplete?: () => void
  size?: 'sm' | 'lg'
}

export function Timer({ durationSeconds, running, onComplete, size = 'lg' }: TimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setRemaining(durationSeconds)
  }, [durationSeconds])

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  useEffect(() => {
    if (remaining === 0 && running) {
      // Schedule onComplete for next tick to avoid React state update conflicts
      const timeoutId = setTimeout(() => {
        onComplete?.()
      }, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [remaining, running, onComplete])

  const progress = 1 - remaining / durationSeconds
  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60

  const isLarge = size === 'lg'
  const r = isLarge ? 54 : 36
  const cx = isLarge ? 60 : 40
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - progress)

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={cx * 2}
        height={cx * 2}
        className="-rotate-90"
        aria-label={`Осталось ${minutes}:${String(seconds).padStart(2, '0')}`}
      >
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={isLarge ? 6 : 4}
        />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={isLarge ? 6 : 4}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <span className={`font-mono font-semibold tabular-nums text-[var(--color-text)] ${isLarge ? 'text-4xl' : 'text-xl'}`}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  )
}
