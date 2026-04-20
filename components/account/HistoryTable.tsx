'use client'

import { useState } from 'react'
import { useCompletion } from '@/lib/hooks/useCompletion'
import type { CompletionWithExercise } from '@/types/completion'

type SortKey = 'completed_at' | 'duration' | 'exercise' | 'block' | 'topic'
type SortDir = 'asc' | 'desc'

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}:${String(s).padStart(2, '0')}` : `0:${String(s).padStart(2, '0')}`
}

function sortCompletions(
  data: CompletionWithExercise[],
  key: SortKey,
  dir: SortDir
): CompletionWithExercise[] {
  return [...data].sort((a, b) => {
    let av: string | number, bv: string | number
    switch (key) {
      case 'completed_at': av = a.completed_at; bv = b.completed_at; break
      case 'duration':     av = a.duration;     bv = b.duration;     break
      case 'exercise':     av = a.exercise.title; bv = b.exercise.title; break
      case 'block':        av = a.exercise.topic.block.title; bv = b.exercise.topic.block.title; break
      case 'topic':        av = a.exercise.topic.title; bv = b.exercise.topic.title; break
    }
    if (av < bv) return dir === 'asc' ? -1 : 1
    if (av > bv) return dir === 'asc' ? 1 : -1
    return 0
  })
}

export function HistoryTable() {
  const { completions, loading } = useCompletion()
  const [sortKey, setSortKey] = useState<SortKey>('completed_at')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (col !== sortKey) return <span className="opacity-30">↕</span>
    return <span>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const ThBtn = ({ col, label }: { col: SortKey; label: string }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--color-text)] select-none whitespace-nowrap"
      onClick={() => handleSort(col)}
    >
      {label} <SortIcon col={col} />
    </th>
  )

  if (loading) {
    return <div className="h-48 animate-pulse rounded-xl bg-[var(--color-surface)]" />
  }

  if (completions.length === 0) {
    return (
      <p className="text-[var(--color-text-muted)] text-sm">
        Вы ещё не выполнили ни одного упражнения.
      </p>
    )
  }

  const sorted = sortCompletions(completions, sortKey, sortDir)

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="min-w-full divide-y divide-[var(--color-border)] text-sm">
        <thead className="bg-[var(--color-surface)]">
          <tr>
            <ThBtn col="completed_at" label="Дата" />
            <ThBtn col="exercise" label="Упражнение" />
            <ThBtn col="block" label="Блок" />
            <ThBtn col="topic" label="Тема" />
            <ThBtn col="duration" label="Время" />
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-bg)]">
          {sorted.map(c => (
            <tr key={c.id} className="hover:bg-[var(--color-surface)] transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-[var(--color-text-muted)]">
                {new Date(c.completed_at).toLocaleDateString('ru-RU', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </td>
              <td className="px-4 py-3 font-medium text-[var(--color-text)]">
                {c.exercise.title}
              </td>
              <td className="px-4 py-3 text-[var(--color-text-muted)]">
                {c.exercise.topic.block.title}
              </td>
              <td className="px-4 py-3 text-[var(--color-text-muted)]">
                {c.exercise.topic.title}
              </td>
              <td className="px-4 py-3 text-[var(--color-text-muted)]">
                {formatDuration(c.duration)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
