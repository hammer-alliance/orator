const WORDS = ['Да,', 'и...', 'ещё', 'и...']

export function TypingAnimation() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes orator-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes orator-word-0 {
          0%, 5%   { opacity: 0; }
          15%, 85% { opacity: 1; }
          95%, 100% { opacity: 0; }
        }
        @keyframes orator-word-1 {
          0%, 22%  { opacity: 0; }
          32%, 85% { opacity: 1; }
          95%, 100% { opacity: 0; }
        }
        @keyframes orator-word-2 {
          0%, 42%  { opacity: 0; }
          52%, 85% { opacity: 1; }
          95%, 100% { opacity: 0; }
        }
        @keyframes orator-word-3 {
          0%, 60%  { opacity: 0; }
          70%, 85% { opacity: 1; }
          95%, 100% { opacity: 0; }
        }
        .ot-cursor {
          animation: orator-cursor-blink 0.9s step-end infinite;
        }
        .ot-word-0 { animation: orator-word-0 4s ease-in-out infinite; }
        .ot-word-1 { animation: orator-word-1 4s ease-in-out infinite; }
        .ot-word-2 { animation: orator-word-2 4s ease-in-out infinite; }
        .ot-word-3 { animation: orator-word-3 4s ease-in-out infinite; }
      `}</style>

      {/* Horizontal line — "paper" */}
      <line x1="20" y1="76" x2="140" y2="76" stroke="var(--text-primary)" strokeWidth="0.5" opacity="0.2" />

      {/* Words that appear */}
      <text x="20" y="70" fill="var(--text-primary)" fontSize="20"
            fontFamily="var(--font-main), sans-serif" fontWeight="300"
            className="ot-word-0">
        {WORDS[0]}
      </text>
      <text x="56" y="70" fill="var(--text-primary)" fontSize="20"
            fontFamily="var(--font-main), sans-serif" fontWeight="300"
            className="ot-word-1">
        {WORDS[1]}
      </text>
      <text x="94" y="70" fill="var(--text-primary)" fontSize="20"
            fontFamily="var(--font-main), sans-serif" fontWeight="300"
            className="ot-word-2">
        {WORDS[2]}
      </text>
      <text x="122" y="70" fill="var(--text-primary)" fontSize="14"
            fontFamily="var(--font-main), sans-serif" fontWeight="300"
            className="ot-word-3">
        {WORDS[3]}
      </text>

      {/* Blinking cursor */}
      <rect x="136" y="52" width="2" height="20" fill="var(--text-primary)" className="ot-cursor" />
    </svg>
  )
}
