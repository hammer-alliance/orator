import { HistoryTable } from '@/components/account/HistoryTable'

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-[var(--color-text)]">История прохождений</h1>
      <HistoryTable />
    </div>
  )
}
