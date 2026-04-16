'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ExerciseWithRelations, ExerciseBlock, ExerciseTopic } from '@/types/exercise'

type Filters = {
  blockId?: string
  topicId?: string
}

export function useExercises(filters: Filters = {}) {
  const [exercises, setExercises] = useState<ExerciseWithRelations[]>([])
  const [blocks, setBlocks] = useState<ExerciseBlock[]>([])
  const [topics, setTopics] = useState<ExerciseTopic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()

      const [blocksRes, topicsRes] = await Promise.all([
        supabase.from('blocks').select('*').order('order_index'),
        supabase.from('topics').select('*').order('order_index'),
      ])

      if (blocksRes.error) { setError(blocksRes.error.message); setLoading(false); return }
      if (topicsRes.error) { setError(topicsRes.error.message); setLoading(false); return }

      setBlocks(blocksRes.data as ExerciseBlock[])
      setTopics(topicsRes.data as ExerciseTopic[])

      let query = supabase
        .from('exercises')
        .select(`*, topic:topics(*, block:blocks(*))`)
        .eq('is_active', true)
        .order('order_index')

      if (filters.topicId) {
        query = query.eq('topic_id', filters.topicId)
      } else if (filters.blockId) {
        const filteredTopics = (topicsRes.data as ExerciseTopic[])
          .filter(t => t.block_id === filters.blockId)
          .map(t => t.id)
        if (filteredTopics.length > 0) {
          query = query.in('topic_id', filteredTopics)
        }
      }

      const { data, error: exErr } = await query
      if (exErr) { setError(exErr.message) } else { setExercises(data as ExerciseWithRelations[]) }
      setLoading(false)
    }

    load()
  }, [filters.blockId, filters.topicId])

  return { exercises, blocks, topics, loading, error }
}
