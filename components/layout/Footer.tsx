import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}
      >
        <Link
          href="/privacy"
          style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
        >
          Политика конфиденциальности
        </Link>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>made with love in 2026</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>© Orator</span>
      </div>
    </footer>
  )
}
