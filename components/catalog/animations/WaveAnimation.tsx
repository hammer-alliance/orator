export function WaveAnimation() {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg"
         className="w-full h-full" style={{ overflow: 'hidden' }}>
      <style>{`
        @keyframes orator-wave-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-80px); }
        }
        @keyframes orator-wave-scroll2 {
          from { transform: translateX(-20px); }
          to   { transform: translateX(-100px); }
        }
        .ow-line1 {
          animation: orator-wave-scroll 3s linear infinite;
        }
        .ow-line2 {
          animation: orator-wave-scroll2 4.5s linear infinite;
          opacity: 0.35;
        }
        .ow-line3 {
          animation: orator-wave-scroll 6s linear infinite;
          opacity: 0.15;
        }
      `}</style>
      {/* Main wave — 4 periods so translation by -80 loops seamlessly */}
      <path
        className="ow-line1"
        d="M -80,60 C -60,35 -20,85 0,60 C 20,35 60,85 80,60 C 100,35 140,85 160,60 C 180,35 220,85 240,60"
        stroke="var(--text-primary)"
        strokeWidth="1.5"
      />
      {/* Slightly offset secondary wave for depth */}
      <path
        className="ow-line2"
        d="M -80,60 C -60,28 -20,92 0,60 C 20,28 60,92 80,60 C 100,28 140,92 160,60 C 180,28 220,92 240,60"
        stroke="var(--text-primary)"
        strokeWidth="1"
      />
      {/* Third wave, widest amplitude */}
      <path
        className="ow-line3"
        d="M -80,60 C -60,20 -20,100 0,60 C 20,20 60,100 80,60 C 100,20 140,100 160,60 C 180,20 220,100 240,60"
        stroke="var(--text-primary)"
        strokeWidth="1"
      />
    </svg>
  )
}
