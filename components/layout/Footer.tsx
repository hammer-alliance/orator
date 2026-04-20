import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '24px',
          minHeight: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}
        className="sm:flex-row"
      >
        <Link
          href="/privacy"
          style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
        >
          Политика конфиденциальности
        </Link>
        <span>Made with love ♡ in 2026</span>
        <span>© Orator</span>
      </div>
    </footer>
  )
}
