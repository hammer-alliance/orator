'use client'

import type { OperativeParam } from '@/types/exercise'

type ParamControlProps = {
  param: OperativeParam
  onChange: (key: string, value: number) => void
}

export function ParamControl({ param, onChange }: ParamControlProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <label className="font-medium text-[var(--color-text)]">{param.label}</label>
        <span className="font-mono text-[var(--color-accent)]">
          {param.value}{param.unit ? ` ${param.unit}` : ''}
        </span>
      </div>

      {param.type === 'slider' ? (
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--color-text-muted)] w-6 text-right">{param.min}</span>
          <input
            type="range"
            min={param.min}
            max={param.max}
            step={param.step}
            value={param.value}
            onChange={e => onChange(param.key, Number(e.target.value))}
            className="flex-1 h-2 rounded-full accent-[var(--color-accent)] cursor-pointer"
          />
          <span className="text-xs text-[var(--color-text-muted)] w-6">{param.max}</span>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange(param.key, Math.max(param.min, param.value - param.step))}
            disabled={param.value <= param.min}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-lg font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] disabled:opacity-40 transition-colors"
          >
            −
          </button>
          <span className="min-w-[3rem] text-center font-mono text-[var(--color-text)]">
            {param.value}{param.unit ? ` ${param.unit}` : ''}
          </span>
          <button
            type="button"
            onClick={() => onChange(param.key, Math.min(param.max, param.value + param.step))}
            disabled={param.value >= param.max}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-lg font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)] disabled:opacity-40 transition-colors"
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}
