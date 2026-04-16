import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { InstructionPanel } from '@/components/trainer/InstructionPanel'
import type { ExerciseWithRelations } from '@/types/exercise'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function TrainerPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('exercises')
    .select('*, topic:topics(*, block:blocks(*))')
    .eq('id', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) notFound()

  const exercise = data as ExerciseWithRelations

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <InstructionPanel exercise={exercise} />
    </div>
  )
}
