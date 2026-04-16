import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from '@/components/account/ProfileForm'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <div>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Профиль</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">{user?.email}</p>
      </div>
      <ProfileForm />
    </div>
  )
}
