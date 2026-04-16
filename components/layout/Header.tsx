import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export async function Header() {
  const supabase = await createClient()
  const [{ data: { user } }, { count }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from('exercises').select('*', { count: 'exact', head: true }).eq('is_active', true),
  ])

  const exerciseCount = count ?? 0

  return (
    <header style={{ borderBottom: '1px solid var(--border)' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          height: '56px',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
        }}
      >
        {/* Left — exercise count */}
        <span
          style={{
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            fontWeight: 400,
          }}
        >
          {exerciseCount} упражнений
        </span>

        {/* Center — logo */}
        <Link
          href="/"
          style={{
            fontSize: '18px',
            fontWeight: 300,
            letterSpacing: '0.15em',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            textTransform: 'uppercase',
          }}
        >
          Orator
        </Link>

        {/* Right — profile */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {user ? (
            <Link
              href="/account"
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  flexShrink: 0,
                }}
              >
                {user.email?.[0].toUpperCase() ?? 'U'}
              </span>
              <span className="hidden sm:inline">профиль →</span>
            </Link>
          ) : (
            <Link
              href="/login"
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                letterSpacing: '0.03em',
              }}
            >
              войти →
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
