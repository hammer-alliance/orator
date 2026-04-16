import Link from 'next/link'
import { Button } from '@/components/ui/Button'

type CompletionStatsProps = {
  exerciseId: string
  exerciseTitle: string
  duration: number
  params: Record<string, string | number | boolean | null>
}

export function CompletionStats({ exerciseId, exerciseTitle, duration, params }: CompletionStatsProps) {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60

  const durationLabel = [
    minutes > 0 ? `${minutes} мин` : null,
    seconds > 0 ? `${seconds} сек` : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="flex flex-col items-center gap-8 max-w-md mx-auto text-center py-12">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-4xl">
        ✓
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Упражнение выполнено!</h1>
        <p className="text-[var(--color-text-muted)]">{exerciseTitle}</p>
      </div>

      <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
        <div className="flex items-center justify-between px-5 py-3 text-sm">
          <span className="text-[var(--color-text-muted)]">Длительность</span>
          <span className="font-medium text-[var(--color-text)]">{durationLabel}</span>
        </div>
        {Object.entries(params)
          .filter(([, v]) => typeof v === 'number' || typeof v === 'boolean')
          .map(([key, value]) => (
            <div key={key} className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-[var(--color-text-muted)] capitalize">{key.replace(/_/g, ' ')}</span>
              <span className="font-medium text-[var(--color-text)]">{String(value)}</span>
            </div>
          ))}
      </div>

      <div className="flex gap-3 w-full">
        <Link href={`/trainer/${exerciseId}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            Повторить
          </Button>
        </Link>
        <Link href="/" className="flex-1">
          <Button className="w-full">
            В каталог
          </Button>
        </Link>
      </div>
    </div>
  )
}
