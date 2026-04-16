'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ParamControl } from './ParamControl'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { ExerciseWithRelations, OperativeParam } from '@/types/exercise'

type InstructionPanelProps = {
  exercise: ExerciseWithRelations
}

function parseParams(defaultParams: unknown): OperativeParam[] {
  if (!defaultParams || typeof defaultParams !== 'object' || Array.isArray(defaultParams)) return []
  const record = defaultParams as Record<string, unknown>
  const PARAM_META: Record<string, Omit<OperativeParam, 'key' | 'value'>> = {
    rounds:              { label: 'Раундов',          type: 'stepper', min: 1, max: 10, step: 1 },
    phase_duration:      { label: 'Длительность фазы', type: 'stepper', min: 2, max: 10, step: 1, unit: 'сек' },
    inhale:              { label: 'Вдох',              type: 'stepper', min: 2, max: 10, step: 1, unit: 'сек' },
    exhale:              { label: 'Выдох',             type: 'stepper', min: 2, max: 10, step: 1, unit: 'сек' },
    speed_levels:        { label: 'Уровней скорости',  type: 'stepper', min: 1, max: 5,  step: 1 },
    repetitions:         { label: 'Повторений',        type: 'stepper', min: 1, max: 20, step: 1 },
    phrases:             { label: 'Фраз',              type: 'stepper', min: 1, max: 10, step: 1 },
    text_length:         { label: 'Длина текста',      type: 'slider',  min: 20, max: 200, step: 10, unit: 'слов' },
    timer_per_point:     { label: 'Время на пункт',    type: 'stepper', min: 10, max: 120, step: 10, unit: 'сек' },
    min_ideas:           { label: 'Минимум идей',      type: 'stepper', min: 5, max: 30, step: 5 },
    min_words_per_minute:{ label: 'Слов в минуту',     type: 'slider',  min: 40, max: 200, step: 10 },
    sentences:           { label: 'Предложений',       type: 'stepper', min: 5, max: 20, step: 1 },
  }

  return Object.entries(record)
    .filter(([key]) => key in PARAM_META && typeof record[key] === 'number')
    .map(([key, value]) => ({
      key,
      value: value as number,
      ...PARAM_META[key],
    }))
}

export function InstructionPanel({ exercise }: InstructionPanelProps) {
  const router = useRouter()
  const [params, setParams] = useState<OperativeParam[]>(parseParams(exercise.default_params))
  const [duration, setDuration] = useState(exercise.default_duration)

  function handleParamChange(key: string, value: number) {
    setParams(prev => prev.map(p => p.key === key ? { ...p, value } : p))
  }

  function handleStart() {
    const queryParams = new URLSearchParams()
    queryParams.set('duration', String(duration))
    params.forEach(p => queryParams.set(p.key, String(p.value)))
    router.push(`/trainer/${exercise.id}/exercise?${queryParams.toString()}`)
  }

  const durationMin = Math.floor(duration / 60)
  const durationSec = duration % 60

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge label={exercise.topic.block.title} variant="block" />
          <Badge label={exercise.topic.title} variant="topic" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">{exercise.title}</h1>
        <p className="text-base text-[var(--color-text-muted)] leading-relaxed">{exercise.instruction}</p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col gap-5">
        <h2 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
          Параметры
        </h2>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-[var(--color-text)]">Длительность</span>
            <span className="font-mono text-[var(--color-accent)]">
              {durationMin > 0 ? `${durationMin} мин ` : ''}{durationSec > 0 ? `${durationSec} сек` : ''}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--color-text-muted)] w-6 text-right">30с</span>
            <input
              type="range"
              min={30}
              max={600}
              step={30}
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              className="flex-1 h-2 rounded-full accent-[var(--color-accent)] cursor-pointer"
            />
            <span className="text-xs text-[var(--color-text-muted)] w-8">10мин</span>
          </div>
        </div>

        {params.map(param => (
          <ParamControl key={param.key} param={param} onChange={handleParamChange} />
        ))}
      </div>

      <Button size="lg" onClick={handleStart} className="w-full">
        Начать упражнение
      </Button>
    </div>
  )
}
