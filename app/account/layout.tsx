import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const NAV_ITEMS = [
  { href: '/account',              label: 'Профиль' },
  { href: '/account/history',      label: 'История' },
  { href: '/account/subscription', label: 'Подписка' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <nav className="mb-6 flex gap-1 border-b border-[var(--color-border)]">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors border-b-2 border-transparent hover:border-[var(--color-accent)] -mb-px"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </main>
      <Footer />
    </>
  )
}
