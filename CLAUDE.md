# Orator — сервис развития коммуникаций

## Стек
- Next.js 14, App Router, TypeScript strict mode
- Prisma + PostgreSQL (Vercel Postgres)
- Tailwind CSS, Framer Motion
- Zod для валидации

## Соглашения
- Компоненты — PascalCase
- Файлы — kebab-case
- Хуки начинаются с use
- API ошибки всегда: { error: string, code: string }
- Все строки интерфейса на русском языке

## Архитектура упражнений
- Каждое упражнение: конфиг в БД + компонент в /components/exercises/
- Новый тип упражнения = новый компонент + новая запись в enum
- Общая логика только через useExercise()

## Что не делать
- Не использовать Redux
- Не писать CSS вручную — только Tailwind
- Не делать fetch на клиенте если данные нужны для SEO
