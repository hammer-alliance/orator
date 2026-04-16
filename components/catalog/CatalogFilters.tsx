'use client'

type FilterBlock = { id: string; title: string }
type FilterTopic = { id: string; title: string; block: string }

type CatalogFiltersProps = {
  blocks: FilterBlock[]
  topics: FilterTopic[]
  activeBlocks: string[]
  activeTopic: string | null
  visibleTopics: FilterTopic[]
  onToggleBlock: (blockId: string) => void
  onToggleTopic: (topicId: string) => void
}

const tagBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '5px 12px',
  fontSize: '12px',
  letterSpacing: '0.04em',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background 0.15s ease, color 0.15s ease, border 0.15s ease',
  whiteSpace: 'nowrap',
  fontFamily: 'var(--font-main), sans-serif',
}

const tagActive: React.CSSProperties = {
  background: 'var(--text-primary)',
  color: 'var(--bg)',
  border: '1px solid var(--text-primary)',
}

const tagInactive: React.CSSProperties = {
  color: 'var(--text-secondary)',
  border: '1px solid var(--border)',
  background: 'transparent',
}

export function CatalogFilters({
  blocks,
  activeBlocks,
  activeTopic,
  visibleTopics,
  onToggleBlock,
  onToggleTopic,
}: CatalogFiltersProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Block filters */}
      <div
        className="no-scrollbar"
        style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}
      >
        {blocks.map(block => {
          const isActive = activeBlocks.includes(block.id)
          return (
            <button
              key={block.id}
              onClick={() => onToggleBlock(block.id)}
              style={{ ...tagBase, ...(isActive ? tagActive : tagInactive) }}
            >
              {block.title}
            </button>
          )
        })}
      </div>

      {/* Topic filters — shown only when blocks are selected */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '2px',
          maxHeight: visibleTopics.length > 0 ? '48px' : '0',
          opacity: visibleTopics.length > 0 ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.2s ease, opacity 0.2s ease',
        }}
      >
        {visibleTopics.map(topic => {
          const isActive = activeTopic === topic.id
          return (
            <button
              key={topic.id}
              onClick={() => onToggleTopic(topic.id)}
              style={{
                ...tagBase,
                fontSize: '11px',
                ...(isActive ? tagActive : tagInactive),
              }}
            >
              {topic.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
