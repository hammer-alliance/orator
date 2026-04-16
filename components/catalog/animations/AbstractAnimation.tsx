// Dot grid with wave-like opacity pulse — default fallback animation

const COLS = 7
const ROWS = 4
const dots = Array.from({ length: ROWS * COLS }, (_, i) => ({
  cx: 16 + (i % COLS) * 20,
  cy: 20 + Math.floor(i / COLS) * 25,
  delay: ((i % COLS) + Math.floor(i / COLS)) * 0.18,
}))

export function AbstractAnimation() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes orator-dot-pulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50%       { opacity: 0.9;  transform: scale(1.5); }
        }
        .oa-dot {
          transform-box: fill-box;
          transform-origin: center;
          animation: orator-dot-pulse 2.4s ease-in-out infinite;
        }
      `}</style>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.cx}
          cy={d.cy}
          r="2.5"
          fill="var(--text-primary)"
          className="oa-dot"
          style={{ animationDelay: `${d.delay}s` }}
        />
      ))}
    </svg>
  )
}
