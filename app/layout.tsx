import type { Metadata } from 'next'
import { Anonymous_Pro } from 'next/font/google'
import './globals.css'

const anonPro = Anonymous_Pro({
  variable: '--font-main',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Orator — развитие навыков коммуникации',
  description: 'Интерактивные упражнения для развития ораторского мастерства',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${anonPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  )
}
