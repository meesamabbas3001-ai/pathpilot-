import React, { useEffect, useState } from 'react';

export const PurpleVeilBackground: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none" aria-hidden="true">
      {/* Subtle clean background base */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/20 via-white to-white" />

      {/* Light-Purple Parda / Curtain / Veil Effect (CSS transform & opacity only, 0 filter cost for fast LCP) */}
      <div 
        className={`absolute -top-20 -left-20 right-0 h-[110%] opacity-30 sm:opacity-40 transition-all duration-1000 ${
          reducedMotion ? '' : 'animate-[pardaSway_30s_ease-in-out_infinite]'
        }`}
        style={{
          background: 'radial-gradient(ellipse at 40% 30%, rgba(192, 132, 252, 0.14) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 80%)'
        }}
      />

      <style>{`
        @keyframes pardaSway {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          50% {
            transform: translate(15px, 10px) scale(1.02);
          }
        }
      `}</style>
    </div>
  );
};
