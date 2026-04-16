export type ExerciseBlock = {
  id: string
  title: string
  description: string | null
  order_index: number
}

export type ExerciseTopic = {
  id: string
  block_id: string
  title: string
  description: string | null
  order_index: number
}

export type Exercise = {
  id: string
  topic_id: string
  title: string
  instruction: string
  animation_type: string | null
  default_duration: number
  default_params: Record<string, unknown>
  is_active: boolean
  order_index: number
}

export type ExerciseWithRelations = Exercise & {
  topic: ExerciseTopic & {
    block: ExerciseBlock
  }
}

export type OperativeParam = {
  key: string
  label: string
  type: 'slider' | 'stepper'
  min: number
  max: number
  step: number
  value: number
  unit?: string
}
