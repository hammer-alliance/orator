export function BreathAnimation() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes orator-breath-outer {
          0%, 100% { transform: scale(0.65); opacity: 0.3; }
          50%       { transform: scale(1.0);  opacity: 1;   }
        }
        @keyframes orator-breath-inner {
          0%, 100% { transform: scale(0.8);  opacity: 0.8; }
          50%       { transform: scale(1.15); opacity: 0.4; }
        }
        .ob-outer {
          transform-box: fill-box;
          transform-origin: center;
          animation: orator-breath-outer 5s ease-in-out infinite;
        }
        .ob-inner {
          transform-box: fill-box;
          transform-origin: center;
          animation: orator-breath-inner 5s ease-in-out infinite;
        }
        .ob-dot {
          transform-box: fill-box;
          transform-origin: center;
          animation: orator-breath-outer 5s ease-in-out infinite;
          animation-delay: -1s;
        }
      `}</style>
      <circle cx="80" cy="60" r="40" className="ob-outer" stroke="var(--text-primary)" strokeWidth="1" />
      <circle cx="80" cy="60" r="22" className="ob-inner" stroke="var(--text-primary)" strokeWidth="1.5" />
      <circle cx="80" cy="60" r="4"  className="ob-dot"   fill="var(--text-primary)" />
    </svg>
  )
}
