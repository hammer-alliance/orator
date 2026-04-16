export function ArticulationAnimation() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <style>{`
        @keyframes orator-mouth-open {
          0%, 100% { transform: translateY(0); }
          40%, 60%  { transform: translateY(-10px); }
        }
        @keyframes orator-mouth-close {
          0%, 100% { transform: translateY(0); }
          40%, 60%  { transform: translateY(10px); }
        }
        @keyframes orator-mouth-fade {
          0%, 100% { opacity: 0.3; }
          40%, 60%  { opacity: 1; }
        }
        .oa-upper {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: orator-mouth-open 2.2s ease-in-out infinite;
        }
        .oa-lower {
          transform-box: fill-box;
          transform-origin: center top;
          animation: orator-mouth-close 2.2s ease-in-out infinite;
        }
        .oa-inner {
          animation: orator-mouth-fade 2.2s ease-in-out infinite;
        }
        /* teeth dots */
        @keyframes orator-teeth {
          0%, 100% { transform: scaleX(1); }
          40%, 60%  { transform: scaleX(1.15); }
        }
        .oa-teeth {
          transform-box: fill-box;
          transform-origin: center;
          animation: orator-teeth 2.2s ease-in-out infinite;
        }
      `}</style>

      {/* Upper lip */}
      <path
        className="oa-upper"
        d="M 45,55 Q 80,42 115,55"
        stroke="var(--text-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Lower lip */}
      <path
        className="oa-lower"
        d="M 45,65 Q 80,78 115,65"
        stroke="var(--text-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner mouth fill — ellipse */}
      <ellipse
        className="oa-inner"
        cx="80" cy="60" rx="30" ry="5"
        fill="var(--text-primary)"
      />
      {/* Corner dots */}
      <circle cx="45" cy="60" r="2" fill="var(--text-primary)" opacity="0.5" />
      <circle cx="115" cy="60" r="2" fill="var(--text-primary)" opacity="0.5" />
    </svg>
  )
}
