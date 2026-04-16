import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CompletionStats } from '@/components/trainer/CompletionStats'

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string>>
}

export default async function CompletePage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const sp = await searchParams

  const duration = Number(sp.duration) || 120

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('exercises')
    .select('id, title')
    .eq('id', slug)
    .single<{ id: string; title: string }>()

  if (error || !data) notFound()

  const exercise = data as { id: string; title: string }

  const exerciseParams: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(sp)) {
    if (key !== 'duration') {
      const num = Number(value)
      exerciseParams[key] = isNaN(num) ? value : num
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <CompletionStats
        exerciseId={exercise.id}
        exerciseTitle={exercise.title}
        duration={duration}
        params={exerciseParams}
      />
    </div>
  )
}
