'use client'

import { useState, useMemo } from 'react'
import { CatalogFilters } from '@/components/catalog/CatalogFilters'
import { ExerciseCard } from '@/components/catalog/ExerciseCard'
import type { CatalogExercise } from '@/components/catalog/ExerciseCard'

// ─── Static data (mirrors Supabase seed) ──────────────────────

type FilterBlock = { id: string; title: string }
type FilterTopic = { id: string; title: string; block: string }

const BLOCKS: FilterBlock[] = [
  { id: 'Физический базис',   title: 'Физический базис' },
  { id: 'Генерация контента', title: 'Генерация контента' },
]

const TOPICS: FilterTopic[] = [
  { id: 'Дыхание',             title: 'Дыхание',             block: 'Физический базис' },
  { id: 'Голос и артикуляция', title: 'Голос и артикуляция', block: 'Физический базис' },
  { id: 'Структура мысли',     title: 'Структура мысли',     block: 'Генерация контента' },
  { id: 'Импровизация',        title: 'Импровизация',        block: 'Генерация контента' },
]

const EXERCISES: CatalogExercise[] = [
  {
    id: '00000000-0000-0000-0000-000000000021',
    title: 'Квадратное дыхание',
    description: 'Вдох 4 сек → задержка 4 → выдох 4 → задержка 4. Снижает тревогу перед выступлением.',
    block: 'Физический базис',
    topic: 'Дыхание',
    animationType: 'breath',
    duration: 120,
  },
  {
    id: '00000000-0000-0000-0000-000000000022',
    title: 'Диафрагмальное дыхание',
    description: 'Положите руку на живот. На вдохе живот поднимается, грудь остаётся почти неподвижной.',
    block: 'Физический базис',
    topic: 'Дыхание',
    animationType: 'breath',
    duration: 90,
  },
  {
    id: '00000000-0000-0000-0000-000000000023',
    title: 'Скороговорки',
    description: 'Начинайте медленно и чётко, постепенно ускоряйтесь. Следите за артикуляцией каждого звука.',
    block: 'Физический базис',
    topic: 'Голос и артикуляция',
    animationType: 'articulation',
    duration: 60,
  },
  {
    id: '00000000-0000-0000-0000-000000000024',
    title: 'Интонационная лесенка',
    description: 'Произносите одну фразу с разными интонациями: утверждение, вопрос, удивление, разочарование.',
    block: 'Физический базис',
    topic: 'Голос и артикуляция',
    animationType: 'wave',
    duration: 90,
  },
  {
    id: '00000000-0000-0000-0000-000000000025',
    title: 'Метод PREP',
    description: 'Point → Reason → Example → Point. Структурируйте любую мысль за 30 секунд.',
    block: 'Генерация контента',
    topic: 'Структура мысли',
    animationType: 'typing',
    duration: 180,
  },
  {
    id: '00000000-0000-0000-0000-000000000026',
    title: 'Мозговой штурм за 2 минуты',
    description: 'Запишите максимум идей по теме. Без критики — любые мысли приветствуются.',
    block: 'Генерация контента',
    topic: 'Структура мысли',
    animationType: 'vocabulary',
    duration: 120,
  },
  {
    id: '00000000-0000-0000-0000-000000000027',
    title: 'Случайная тема',
    description: 'Система предложит тему. Говорите без остановки всё отведённое время — не молчите.',
    block: 'Генерация контента',
    topic: 'Импровизация',
    animationType: 'typing',
    duration: 120,
  },
  {
    id: '00000000-0000-0000-0000-000000000028',
    title: 'Да, и...',
    description: 'Каждое предложение начинается с «Да, и...» — продолжайте предыдущую мысль бесконечно.',
    block: 'Генерация контента',
    topic: 'Импровизация',
    animationType: 'vocabulary',
    duration: 150,
  },
]

// ─── Page ──────────────────────────────────────────────────────

export default function CatalogPage() {
  const [activeBlocks, setActiveBlocks] = useState<string[]>([])
  const [activeTopic, setActiveTopic] = useState<string | null>(null)
  const [filterKey, setFilterKey] = useState(0)

  const visibleTopics = useMemo(
    () => (activeBlocks.length > 0 ? TOPICS.filter(t => activeBlocks.includes(t.block)) : []),
    [activeBlocks]
  )

  const filtered = useMemo(() => {
    let list = EXERCISES
    if (activeBlocks.length > 0) list = list.filter(e => activeBlocks.includes(e.block))
    if (activeTopic) list = list.filter(e => e.topic === activeTopic)
    return list
  }, [activeBlocks, activeTopic])

  function toggleBlock(blockId: string) {
    setActiveBlocks(prev =>
      prev.includes(blockId) ? prev.filter(b => b !== blockId) : [...prev, blockId]
    )
    setActiveTopic(null)
    setFilterKey(k => k + 1)
  }

  function toggleTopic(topicId: string) {
    setActiveTopic(prev => (prev === topicId ? null : topicId))
    setFilterKey(k => k + 1)
  }

  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 24px 64px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      {/* Page heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h1
          style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Упражнения
        </h1>
      </div>

      {/* Filters */}
      <CatalogFilters
        blocks={BLOCKS}
        topics={TOPICS}
        activeBlocks={activeBlocks}
        activeTopic={activeTopic}
        visibleTopics={visibleTopics}
        onToggleBlock={toggleBlock}
        onToggleTopic={toggleTopic}
      />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          key={filterKey}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {filtered.map((exercise, i) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              animationDelay={i * 55}
            />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '80px 0',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '14px',
            letterSpacing: '0.03em',
          }}
        >
          Упражнения не найдены — попробуйте изменить фильтры
        </div>
      )}
    </div>
  )
}
