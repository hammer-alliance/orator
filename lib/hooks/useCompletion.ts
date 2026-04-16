'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { CompletionWithExercise } from '@/types/completion'

export function useCompletion() {
  const [completions, setCompletions] = useState<CompletionWithExercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data, error: err } = await supabase
        .from('completions')
        .select(`*, exercise:exercises(id, title, topic:topics(id, title, block:blocks(id, title)))`)
        .order('completed_at', { ascending: false })

      if (err) { setError(err.message) } else { setCompletions(data as CompletionWithExercise[]) }
      setLoading(false)
    }

    load()
  }, [])

  const saveCompletion = useCallback(async (
    exerciseId: string,
    duration: number,
    params: Record<string, unknown>
  ) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Не авторизован')

    const { error: err } = await supabase.from('completions').insert({
      user_id: user.id,
      exercise_id: exerciseId,
      duration,
      params,
    })

    if (err) throw new Error(err.message)
  }, [])

  return { completions, loading, error, saveCompletion }
}
