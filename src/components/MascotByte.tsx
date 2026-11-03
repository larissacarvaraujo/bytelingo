import React from 'react';

export type MascotMood = 'neutral' | 'happy' | 'thinking' | 'celebrating' | 'sad' | 'tutor';

interface MascotByteProps {
  mood?: MascotMood;
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const MascotByte: React.FC<MascotByteProps> = ({
  mood = 'neutral',
  message,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  const visorColor = {
    neutral: '#22c55e', // green
    happy: '#10b981', // emerald
    thinking: '#3b82f6', // blue
    celebrating: '#eab308', // gold/yellow
    sad: '#ef4444', // red
    tutor: '#8b5cf6', // purple
  }[mood];

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      {message && (
        <div className="relative mb-3 bg-white border-2 border-slate-200 text-slate-800 px-4 py-2 rounded-2xl shadow-sm text-sm font-semibold max-w-xs text-center animate-bounce duration-1000">
          {message}
          {/* Speech bubble pointer */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-slate-200 rotate-45" />
        </div>
      )}

      <div className={`relative ${sizeMap[size]} transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-md select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Owl Body (Duolingo round friendly shape) */}
          <ellipse cx="80" cy="85" rx="55" ry="60" fill="#22c55e" />
          {/* Belly feather patch */}
          <ellipse cx="80" cy="98" rx="35" ry="38" fill="#4ade80" />

          {/* Cyber Ears / Feathers */}
          <path d="M40 38 L62 55 L35 65 Z" fill="#16a34a" />
          <path d="M120 38 L98 55 L125 65 Z" fill="#16a34a" />

          {/* Cyber Visor / Giant Owl Eyes */}
          <rect
            x="32"
            y="52"
            width="96"
            height="46"
            rx="23"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="3"
          />

          {/* Visor Screen Glow */}
          <rect
            x="36"
            y="56"
            width="88"
            height="38"
            rx="19"
            fill="#020617"
          />

          {/* Left Eye Expression */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <path
              d="M 50 78 Q 62 64 74 78"
              stroke={visorColor}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'sad' ? (
            <path
              d="M 50 72 Q 62 82 74 72"
              stroke={visorColor}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'thinking' ? (
            <circle cx="62" cy="74" r="8" fill={visorColor} />
          ) : (
            <g>
              <ellipse cx="60" cy="74" rx="10" ry="12" fill={visorColor} />
              <circle cx="63" cy="70" r="3" fill="#ffffff" />
            </g>
          )}

          {/* Right Eye Expression */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <path
              d="M 86 78 Q 98 64 110 78"
              stroke={visorColor}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'sad' ? (
            <path
              d="M 86 72 Q 98 82 110 72"
              stroke={visorColor}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'thinking' ? (
            <circle cx="98" cy="74" r="8" fill={visorColor} />
          ) : (
            <g>
              <ellipse cx="100" cy="74" rx="10" ry="12" fill={visorColor} />
              <circle cx="103" cy="70" r="3" fill="#ffffff" />
            </g>
          )}

          {/* Beak / Nose (Friendly orange triangle) */}
          <polygon
            points="72,88 88,88 80,102"
            fill="#f97316"
            stroke="#ea580c"
            strokeWidth="1.5"
          />

          {/* Cute Owl Wings */}
          {mood === 'celebrating' ? (
            <>
              {/* Arms up high */}
              <path
                d="M 30 75 Q 10 50 20 35 Q 35 45 35 70"
                fill="#16a34a"
                stroke="#15803d"
                strokeWidth="2"
              />
              <path
                d="M 130 75 Q 150 50 140 35 Q 125 45 125 70"
                fill="#16a34a"
                stroke="#15803d"
                strokeWidth="2"
              />
            </>
          ) : (
            <>
              {/* Rested Wings on side */}
              <path
                d="M 28 80 Q 15 95 24 115 Q 35 110 35 90 Z"
                fill="#16a34a"
              />
              <path
                d="M 132 80 Q 145 95 136 115 Q 125 110 125 90 Z"
                fill="#16a34a"
              />
            </>
          )}

          {/* Feet (Orange claws) */}
          <ellipse cx="65" cy="144" rx="10" ry="6" fill="#f97316" />
          <ellipse cx="95" cy="144" rx="10" ry="6" fill="#f97316" />

          {/* Tech antenna on top */}
          <line x1="80" y1="26" x2="80" y2="40" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="80" cy="24" r="5" fill={visorColor} />
        </svg>
      </div>
    </div>
  );
};
