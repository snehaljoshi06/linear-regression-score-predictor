import React from 'react';

export const UpperGeometricGraphic: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 w-72 sm:w-96 md:w-[480px] h-72 sm:h-96 md:h-[480px] pointer-events-none overflow-hidden select-none opacity-90 z-0">
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle grid pattern matching poster */}
          <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#271428" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
          {/* Noise/Texture gradient for the dark blue circle */}
          <linearGradient id="blue-sphere" x1="150" y1="50" x2="400" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E325C" />
            <stop offset="50%" stopColor="#253D6E" />
            <stop offset="100%" stopColor="#182849" />
          </linearGradient>
        </defs>

        {/* Background Grid square */}
        <rect x="220" y="40" width="240" height="240" fill="url(#grid-pattern)" stroke="#271428" strokeOpacity="0.12" strokeWidth="0.8" />

        {/* Concentric Geometric Arc Rings */}
        <circle cx="280" cy="180" r="140" stroke="#271428" strokeWidth="0.75" strokeOpacity="0.35" />
        <circle cx="280" cy="180" r="180" stroke="#271428" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="3,3" />
        <circle cx="280" cy="180" r="90" stroke="#271428" strokeWidth="0.75" strokeOpacity="0.35" />

        {/* Semicircle Textured Blue Fan */}
        <path
          d="M 280 180 L 140 180 A 140 140 0 0 1 420 180 Z"
          fill="url(#blue-sphere)"
          opacity="0.88"
        />

        {/* Fine crosshairs */}
        <line x1="280" y1="20" x2="280" y2="340" stroke="#271428" strokeWidth="0.6" strokeOpacity="0.3" />
        <line x1="120" y1="180" x2="440" y2="180" stroke="#271428" strokeWidth="0.6" strokeOpacity="0.3" />

        {/* Dynamic Royal Blue Diagonal Ray slicing through layout */}
        <line
          x1="500"
          y1="80"
          x2="0"
          y2="360"
          stroke="#2C55D4"
          strokeWidth="2.5"
          strokeOpacity="0.85"
        />
        {/* Accent dot on the line */}
        <circle cx="460" cy="102" r="4.5" fill="#2C55D4" />
      </svg>
    </div>
  );
};

export const LowerGeometricGraphic: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-3 select-none">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
          {/* Subtle Outer Ring */}
          <circle cx="60" cy="60" r="50" stroke="#271428" strokeWidth="0.75" strokeOpacity="0.35" />

          {/* Left Textured Blue Semicircle */}
          <path
            d="M 60 10 A 50 50 0 0 0 60 110 Z"
            fill="#3B5984"
            opacity="0.85"
          />

          {/* Plum Circle on lower right */}
          <circle cx="72" cy="72" r="18" fill="#271428" />

          {/* Quadrant fine arc */}
          <path
            d="M 60 60 L 110 60 A 50 50 0 0 1 60 110 Z"
            fill="#271428"
            fillOpacity="0.12"
          />

          {/* Crosshair lines */}
          <line x1="60" y1="5" x2="60" y2="115" stroke="#271428" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="5" y1="60" x2="115" y2="60" stroke="#271428" strokeWidth="0.5" strokeOpacity="0.4" />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-[#271428] uppercase leading-tight">
          From<br />
          Data<br />
          To<br />
          Decisions
        </span>
      </div>
    </div>
  );
};
