type BadgeProps = {
  label: string
  variant?: 'block' | 'topic' | 'neutral'
  className?: string
}

const variantClasses = {
  block: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  topic: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  neutral: 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
}

export function Badge({ label, variant = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {label}
    </span>
  )
}
