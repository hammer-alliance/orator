import { ExerciseCard } from './ExerciseCard'
import type { ExerciseWithRelations } from '@/types/exercise'

type CatalogGridProps = {
  exercises: ExerciseWithRelations[]
}

export function CatalogGrid({ exercises }: CatalogGridProps) {
  if (exercises.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[var(--color-text-muted)]">
        <p className="text-lg font-medium">Упражнения не найдены</p>
        <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {exercises.map(exercise => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}
