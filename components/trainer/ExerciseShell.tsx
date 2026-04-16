'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Timer } from '@/components/ui/Timer'
import { Button } from '@/components/ui/Button'
import { useCompletion } from '@/lib/hooks/useCompletion'

type ExerciseShellProps = {
  exerciseId: string
  exerciseTitle: string
  duration: number
  params: Record<string, unknown>
}

type Phase = 'ready' | 'running' | 'paused' | 'done'

export function ExerciseShell({ exerciseId, exerciseTitle, duration, params }: ExerciseShellProps) {
  const router = useRouter()
  const { saveCompletion } = useCompletion()
  const [phase, setPhase] = useState<Phase>('ready')
  const [saving, setSaving] = useState(false)

  const handleComplete = useCallback(async () => {
    setPhase('done')
    setSaving(true)
    try {
      await saveCompletion(exerciseId, duration, params)
    } catch {
      // не авторизован — просто переходим дальше
    } finally {
      setSaving(false)
      const query = new URLSearchParams({ duration: String(duration), ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) })
      router.push(`/trainer/${exerciseId}/complete?${query.toString()}`)
    }
  }, [exerciseId, duration, params, saveCompletion, router])

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-12 max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold text-[var(--color-text)]">{exerciseTitle}</h2>

      <Timer
        durationSeconds={duration}
        running={phase === 'running'}
        onComplete={handleComplete}
        size="lg"
      />

      <div className="flex gap-3">
        {phase === 'ready' && (
          <Button size="lg" onClick={() => setPhase('running')}>
            Начать
          </Button>
        )}

        {phase === 'running' && (
          <>
            <Button variant="secondary" onClick={() => setPhase('paused')}>
              Пауза
            </Button>
            <Button variant="danger" onClick={handleComplete} loading={saving}>
              Завершить
            </Button>
          </>
        )}

        {phase === 'paused' && (
          <>
            <Button onClick={() => setPhase('running')}>
              Продолжить
            </Button>
            <Button variant="danger" onClick={handleComplete} loading={saving}>
              Завершить
            </Button>
          </>
        )}

        {phase === 'done' && (
          <Button loading={saving}>
            Сохранение...
          </Button>
        )}
      </div>
    </div>
  )
}
