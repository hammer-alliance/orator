export type Profile = {
  id: string
  phone: string | null
  has_subscription: boolean
  created_at: string
}

export type Subscription = {
  type: 'free' | 'premium'
  label: string
  features: string[]
  price: string | null
}

export const SUBSCRIPTION_PLANS: Subscription[] = [
  {
    type: 'free',
    label: 'Бесплатно',
    price: null,
    features: [
      'Доступ к базовым упражнениям',
      'До 5 упражнений в день',
      'История за последние 7 дней',
    ],
  },
  {
    type: 'premium',
    label: 'Подписка',
    price: '299 ₽ / мес',
    features: [
      'Все упражнения без ограничений',
      'Неограниченное количество в день',
      'Полная история прохождений',
      'Расширенная статистика',
      'Новые упражнения первыми',
    ],
  },
]
