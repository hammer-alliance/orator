import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ExerciseShell } from '@/components/trainer/ExerciseShell'

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string>>
}

export default async function ExercisePage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const sp = await searchParams

  const duration = Number(sp.duration) || 120

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('exercises')
    .select('id, title')
    .eq('id', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) notFound()

  const params_obj: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(sp)) {
    if (key !== 'duration') {
      const num = Number(value)
      params_obj[key] = isNaN(num) ? value : num
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <ExerciseShell
        exerciseId={data.id}
        exerciseTitle={data.title}
        duration={duration}
        params={params_obj}
      />
    </div>
  )
}
