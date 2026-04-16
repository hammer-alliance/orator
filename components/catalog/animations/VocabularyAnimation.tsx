const LETTERS = ['С', 'Л', 'О', 'В', 'О']

export function VocabularyAnimation() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes orator-letter-appear {
          0%, 20%  { opacity: 0; transform: translateY(6px); }
          40%, 80% { opacity: 1; transform: translateY(0); }
          95%, 100% { opacity: 0; transform: translateY(-4px); }
        }
        ${LETTERS.map((_, i) => `
        .ol-letter-${i} {
          animation: orator-letter-appear 3.5s ease-in-out infinite;
          animation-delay: ${i * 0.35}s;
        }`).join('')}
      `}</style>
      {LETTERS.map((letter, i) => (
        <text
          key={i}
          x={22 + i * 24}
          y="70"
          className={`ol-letter-${i}`}
          fill="var(--text-primary)"
          fontSize="28"
          fontFamily="var(--font-main), sans-serif"
          fontWeight="300"
          letterSpacing="2"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        >
          {letter}
        </text>
      ))}
      {/* Underline that extends */}
      <line x1="22" y1="78" x2="138" y2="78" stroke="var(--text-primary)" strokeWidth="1" opacity="0.2" />
    </svg>
  )
}
