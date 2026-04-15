// Auto-generated types matching Orator database schema

export type Block = {
  id: string
  title: string
  description: string | null
  order_index: number
}

export type Topic = {
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

export type Recommendation = {
  id: string
  title: string
  body: string
  url: string | null
  image_url: string | null
  exercise_id: string | null
}

export type Profile = {
  id: string
  phone: string | null
  has_subscription: boolean
  created_at: string
}

export type Completion = {
  id: string
  user_id: string
  exercise_id: string
  duration: number
  params: Record<string, unknown>
  completed_at: string
}

// ─── Supabase generic Database type ───────────────────────────

export type Database = {
  public: {
    Tables: {
      blocks: {
        Row: Block
        Insert: Omit<Block, 'id'> & { id?: string }
        Update: Partial<Omit<Block, 'id'>>
      }
      topics: {
        Row: Topic
        Insert: Omit<Topic, 'id'> & { id?: string }
        Update: Partial<Omit<Topic, 'id'>>
      }
      exercises: {
        Row: Exercise
        Insert: Omit<Exercise, 'id'> & { id?: string }
        Update: Partial<Omit<Exercise, 'id'>>
      }
      recommendations: {
        Row: Recommendation
        Insert: Omit<Recommendation, 'id'> & { id?: string }
        Update: Partial<Omit<Recommendation, 'id'>>
      }
      profiles: {
        Row: Profile
        Insert: Pick<Profile, 'id'> & Partial<Omit<Profile, 'id'>>
        Update: Partial<Omit<Profile, 'id'>>
      }
      completions: {
        Row: Completion
        Insert: Omit<Completion, 'id' | 'completed_at'> & { id?: string; completed_at?: string }
        Update: Partial<Omit<Completion, 'id'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
