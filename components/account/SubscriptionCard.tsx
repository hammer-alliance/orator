import { Button } from '@/components/ui/Button'
import { SUBSCRIPTION_PLANS } from '@/types/user'
import type { Profile } from '@/types/user'

type SubscriptionCardProps = {
  profile: Profile | null
}

export function SubscriptionCard({ profile }: SubscriptionCardProps) {
  const activePlan = profile?.has_subscription ? 'premium' : 'free'

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl">
      {SUBSCRIPTION_PLANS.map(plan => {
        const isActive = plan.type === activePlan
        return (
          <div
            key={plan.type}
            className={`flex flex-col gap-4 rounded-xl border p-5 transition-colors ${
              isActive
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                : 'border-[var(--color-border)] bg-[var(--color-surface)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[var(--color-text)]">{plan.label}</h3>
              {isActive && (
                <span className="rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-xs font-medium text-white">
                  Текущий
                </span>
              )}
            </div>

            <p className="text-lg font-bold text-[var(--color-text)]">
              {plan.price ?? 'Бесплатно'}
            </p>

            <ul className="flex flex-col gap-1.5">
              {plan.features.map(feature => (
                <li key={feature} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                  <span className="mt-0.5 text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {plan.type === 'premium' && !profile?.has_subscription && (
              <Button
                className="mt-auto"
                disabled
                title="Оплата будет доступна в ближайшее время"
              >
                {/* TODO: СБП / Карта Мир */}
                Оплатить
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}
