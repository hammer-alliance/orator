import type { Json } from './database'

export type Completion = {
  id: string
  user_id: string
  exercise_id: string
  duration: number
  params: Json
  completed_at: string
}

export type CompletionWithExercise = Completion & {
  exercise: {
    id: string
    title: string
    topic: {
      id: string
      title: string
      block: {
        id: string
        title: string
      }
    }
  }
}

export type CompletionStats = {
  total_completions: number
  total_duration_seconds: number
  last_completed_at: string | null
}
