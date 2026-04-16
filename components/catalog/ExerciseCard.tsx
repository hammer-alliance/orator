'use client'

import Link from 'next/link'
import { BreathAnimation } from './animations/BreathAnimation'
import { WaveAnimation } from './animations/WaveAnimation'
import { ArticulationAnimation } from './animations/ArticulationAnimation'
import { VocabularyAnimation } from './animations/VocabularyAnimation'
import { TypingAnimation } from './animations/TypingAnimation'
import { AbstractAnimation } from './animations/AbstractAnimation'

export type AnimationType = 'breath' | 'wave' | 'articulation' | 'vocabulary' | 'typing' | 'abstract'

export type CatalogExercise = {
  id: string
  title: string
  description: string
  block: string
  topic: string
  animationType: AnimationType
  duration: number
}

type ExerciseCardProps = {
  exercise: CatalogExercise
  animationDelay?: number
}

const ANIMATION_MAP: Record<AnimationType, React.ComponentType> = {
  breath:       BreathAnimation,
  wave:         WaveAnimation,
  articulation: ArticulationAnimation,
  vocabulary:   VocabularyAnimation,
  typing:       TypingAnimation,
  abstract:     AbstractAnimation,
}

export function ExerciseCard({ exercise, animationDelay = 0 }: ExerciseCardProps) {
  const Animation = ANIMATION_MAP[exercise.animationType] ?? AbstractAnimation
  const durationMin = Math.ceil(exercise.duration / 60)

  return (
    <Link
      href={`/trainer/${exercise.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        animation: `orator-card-in 0.35s ease both`,
        animationDelay: `${animationDelay}ms`,
      }}
    >
      <style>{`
        @keyframes orator-card-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Animation area */}
      <div
        style={{
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg)',
        }}
      >
        <Animation />
      </div>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {/* Tags row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '2px 6px',
              fontWeight: 400,
            }}
          >
            {exercise.block}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', opacity: 0.5 }}>·</span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
            {exercise.topic}
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              fontWeight: 300,
            }}
          >
            {durationMin} мин
          </span>
        </div>

        {/* Title */}
        <p
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {exercise.title}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {exercise.description}
        </p>
      </div>
    </Link>
  )
}
