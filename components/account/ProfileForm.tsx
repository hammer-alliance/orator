'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useProfile } from '@/lib/hooks/useProfile'

export function ProfileForm() {
  const { profile, loading, updateProfile } = useProfile()
  const [phone, setPhone] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  if (loading) {
    return <div className="h-32 animate-pulse rounded-xl bg-[var(--color-surface)]" />
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      await updateProfile({ phone: phone || null })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-[var(--color-text)]">
          Телефон
        </label>
        <input
          id="phone"
          type="tel"
          placeholder={profile?.phone ?? '+7 999 000 00 00'}
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" loading={saving}>
          Сохранить
        </Button>
        {saved && (
          <span className="text-sm text-green-600 dark:text-green-400">Сохранено ✓</span>
        )}
      </div>

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-muted)]">
        <p>
          <span className="font-medium text-[var(--color-text)]">Подписка: </span>
          {profile?.has_subscription ? 'Активна' : 'Бесплатный тариф'}
        </p>
        <p className="mt-1">
          <span className="font-medium text-[var(--color-text)]">Аккаунт создан: </span>
          {profile?.created_at
            ? new Date(profile.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
            : '—'}
        </p>
      </div>
    </form>
  )
}
