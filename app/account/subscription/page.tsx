import { createClient } from '@/lib/supabase/server'
import { SubscriptionCard } from '@/components/account/SubscriptionCard'
import type { Profile } from '@/types/user'

export default async function SubscriptionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile: Profile | null = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data as Profile | null
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Подписка</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Выберите тариф, который подходит вам
        </p>
      </div>
      <SubscriptionCard profile={profile} />
    </div>
  )
}
