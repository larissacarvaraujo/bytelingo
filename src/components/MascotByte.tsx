import React from 'react';
import { motion } from 'motion/react';

export type MascotMood = 'neutral' | 'happy' | 'thinking' | 'celebrating' | 'sad' | 'tutor';
export type MascotAnimation = 'idle' | 'celebration' | 'none';

interface MascotByteProps {
  mood?: MascotMood;
  message?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animation?: MascotAnimation;
  className?: string;
}

export const MascotByte: React.FC<MascotByteProps> = ({
  mood = 'neutral',
  message,
  size = 'md',
  animation = 'idle',
  className = '',
}) => {
  const sizeMap = {
    xs: 'w-10 h-10',
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  const visorColor = {
    neutral: '#10b981', // emerald
    happy: '#22c55e', // green
    thinking: '#38bdf8', // sky blue
    celebrating: '#f59e0b', // amber gold
    sad: '#ef4444', // red
    tutor: '#a855f7', // purple
  }[mood];

  // Animation variants
  const isCelebration = animation === 'celebration' || mood === 'celebrating';
  const isIdle = animation === 'idle' && !isCelebration;

  const bodyAnimation = isCelebration
    ? {
        y: [0, -8, 0, -4, 0],
        scale: [1, 1.05, 1, 1.02, 1],
        transition: {
          repeat: Infinity,
          duration: 0.9,
          ease: 'easeInOut' as const,
        },
      }
    : isIdle
    ? {
        y: [0, -6, 0],
        transition: {
          repeat: Infinity,
          duration: 2.4,
          ease: 'easeInOut' as const,
        },
      }
    : {};

  const leftWingAnimation = isCelebration
    ? {
        rotate: [0, -38, 12, -38, 0],
        transition: {
          repeat: Infinity,
          duration: 0.7,
          ease: 'easeInOut' as const,
        },
      }
    : isIdle
    ? {
        rotate: [0, -5, 0],
        transition: {
          repeat: Infinity,
          duration: 2.4,
          ease: 'easeInOut' as const,
        },
      }
    : {};

  const rightWingAnimation = isCelebration
    ? {
        rotate: [0, 38, -12, 38, 0],
        transition: {
          repeat: Infinity,
          duration: 0.7,
          ease: 'easeInOut' as const,
        },
      }
    : isIdle
    ? {
        rotate: [0, 5, 0],
        transition: {
          repeat: Infinity,
          duration: 2.4,
          ease: 'easeInOut' as const,
        },
      }
    : {};

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {message && (
        <div className="relative mb-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 px-4 py-2 rounded-2xl shadow-sm text-sm font-bold max-w-xs text-center animate-bounce duration-1000">
          {message}
          {/* Speech bubble pointer */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-slate-800 border-r-2 border-b-2 border-slate-200 dark:border-slate-700 rotate-45" />
        </div>
      )}

      <motion.div
        className={`relative ${sizeMap[size]} transition-transform duration-300 hover:scale-105`}
        animate={bodyAnimation}
      >
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-md select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tail Feathers (dark slate with white base band, iconic of Carcará) */}
          <path d="M 68 128 L 74 152 L 86 152 L 92 128 Z" fill="#0f172a" />
          <path d="M 72 138 L 76 148 L 84 148 L 88 138 Z" fill="#f8fafc" />

          {/* Left Wing (Animated) */}
          <motion.g
            style={{ transformOrigin: '38px 80px' }}
            animate={leftWingAnimation}
          >
            {/* Wing Base */}
            <path
              d="M 38 78 C 18 84 8 104 14 124 C 24 122 34 116 42 104 Z"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            {/* Wing Feather Layer */}
            <path
              d="M 28 88 C 15 96 12 110 18 122 C 24 118 32 112 36 102 Z"
              fill="#334155"
            />
            {/* Flight feather tips */}
            <path d="M 14 124 Q 18 130 24 122" stroke="#f8fafc" strokeWidth="2" />
          </motion.g>

          {/* Right Wing (Animated) */}
          <motion.g
            style={{ transformOrigin: '122px 80px' }}
            animate={rightWingAnimation}
          >
            {/* Wing Base */}
            <path
              d="M 122 78 C 142 84 152 104 146 124 C 136 122 126 116 118 104 Z"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
            {/* Wing Feather Layer */}
            <path
              d="M 132 88 C 145 96 148 110 142 122 C 136 118 128 112 124 102 Z"
              fill="#334155"
            />
            {/* Flight feather tips */}
            <path d="M 146 124 Q 142 130 136 122" stroke="#f8fafc" strokeWidth="2" />
          </motion.g>

          {/* Main Carcará Body (Warm robust falcon torso) */}
          <ellipse cx="80" cy="90" rx="44" ry="50" fill="#1e293b" />

          {/* Carcará Cream Chest & Neck (with signature barring) */}
          <ellipse cx="80" cy="96" rx="30" ry="36" fill="#fef08a" />
          {/* Delicate feather bars */}
          <path d="M 64 88 Q 80 92 96 88" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          <path d="M 62 98 Q 80 103 98 98" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          <path d="M 66 108 Q 80 112 94 108" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          <path d="M 70 118 Q 80 121 90 118" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />

          {/* Carcará Head / Crown (Broad ivory-cream face) */}
          <circle cx="80" cy="58" r="32" fill="#fef9c3" />

          {/* Signature Black Carcará Crest (Penacho imponente do Carcará) */}
          {/* Back plume feathers flaring dynamically */}
          <path
            d="M 52 38 C 38 24 22 20 14 26 C 26 32 34 38 42 46 C 24 36 12 40 8 48 C 22 50 32 54 40 60 C 26 58 18 64 16 72 C 30 68 40 66 48 68 Z"
            fill="#0f172a"
          />
          {/* Crown top cap */}
          <path
            d="M 48 38 C 60 22 76 20 90 22 C 104 24 116 32 120 42 C 110 32 94 28 80 28 C 65 28 54 32 48 38 Z"
            fill="#0f172a"
          />
          {/* Top spiky crest feathers */}
          <path d="M 68 24 C 60 10 46 8 38 14 C 50 18 58 24 64 32 Z" fill="#1e293b" />
          <path d="M 82 23 C 78 8 68 6 60 10 C 70 16 76 22 80 30 Z" fill="#0f172a" />

          {/* Orange/Reddish Orbital Facial Patch (Bare skin in front of the eyes) */}
          <ellipse cx="62" cy="62" rx="14" ry="10" fill="#f97316" opacity="0.85" />
          <ellipse cx="98" cy="62" rx="14" ry="10" fill="#f97316" opacity="0.85" />

          {/* High-Tech Byte Visor (Cyber-Falcon integration) */}
          <rect
            x="38"
            y="48"
            width="84"
            height="32"
            rx="16"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="2.5"
          />
          <rect
            x="42"
            y="52"
            width="76"
            height="24"
            rx="12"
            fill="#020617"
          />

          {/* Left Eye Expression */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <path
              d="M 52 68 Q 62 56 72 68"
              stroke={visorColor}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'sad' ? (
            <path
              d="M 52 64 Q 62 74 72 64"
              stroke={visorColor}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'thinking' ? (
            <circle cx="62" cy="64" r="6" fill={visorColor} />
          ) : (
            <g>
              <ellipse cx="62" cy="64" rx="8" ry="9" fill={visorColor} />
              <circle cx="65" cy="61" r="2.5" fill="#ffffff" />
            </g>
          )}

          {/* Right Eye Expression */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <path
              d="M 88 68 Q 98 56 108 68"
              stroke={visorColor}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'sad' ? (
            <path
              d="M 88 64 Q 98 74 108 64"
              stroke={visorColor}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          ) : mood === 'thinking' ? (
            <circle cx="98" cy="64" r="6" fill={visorColor} />
          ) : (
            <g>
              <ellipse cx="98" cy="64" rx="8" ry="9" fill={visorColor} />
              <circle cx="101" cy="61" r="2.5" fill="#ffffff" />
            </g>
          )}

          {/* Powerful Hooked Raptor Beak (Carcará's curved bill) */}
          {/* Orange/Yellow Base Ceroma */}
          <polygon
            points="70,72 90,72 80,82"
            fill="#f59e0b"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          {/* Hooked Raptor Tip curving sharply down */}
          <path
            d="M 72 75 C 74 88 78 96 80 102 C 82 96 86 88 88 75 Z"
            fill="#334155"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          <path d="M 80 94 Q 78 100 80 102 Q 82 100 80 94" fill="#0f172a" />

          {/* Golden Falcon Talons / Claws */}
          <ellipse cx="66" cy="140" rx="9" ry="5" fill="#f59e0b" />
          <ellipse cx="94" cy="140" rx="9" ry="5" fill="#f59e0b" />
          <path d="M 58 141 Q 62 145 66 142" stroke="#b45309" strokeWidth="1.5" />
          <path d="M 86 141 Q 90 145 94 142" stroke="#b45309" strokeWidth="1.5" />

          {/* Tech antenna on top */}
          <line x1="80" y1="20" x2="80" y2="10" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy="8" r="4" fill={visorColor} />
        </svg>
      </motion.div>
    </div>
  );
};

/**
 * Compact, lightweight Carcará mascot icon specifically tailored for buttons, headers, and badges.
 */
export const CarcaraIcon: React.FC<{
  size?: number | string;
  animation?: MascotAnimation;
  className?: string;
  mood?: MascotMood;
}> = ({ size = 28, animation = 'idle', className = '', mood = 'neutral' }) => {
  const isCelebration = animation === 'celebration';
  const isIdle = animation === 'idle';

  const bodyAnim = isCelebration
    ? {
        y: [0, -4, 0, -2, 0],
        scale: [1, 1.08, 1, 1.03, 1],
        transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' as const },
      }
    : isIdle
    ? {
        y: [0, -3, 0],
        transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' as const },
      }
    : {};

  const leftWingAnim = isCelebration
    ? {
        rotate: [0, -35, 10, -35, 0],
        transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' as const },
      }
    : isIdle
    ? {
        rotate: [0, -4, 0],
        transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' as const },
      }
    : {};

  const rightWingAnim = isCelebration
    ? {
        rotate: [0, 35, -10, 35, 0],
        transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' as const },
      }
    : isIdle
    ? {
        rotate: [0, 4, 0],
        transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' as const },
      }
    : {};

  const eyeColor = {
    neutral: '#10b981',
    happy: '#22c55e',
    thinking: '#38bdf8',
    celebrating: '#f59e0b',
    sad: '#ef4444',
    tutor: '#c084fc',
  }[mood];

  return (
    <motion.div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      animate={bodyAnim}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full drop-shadow-xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tail */}
        <path d="M 72 130 L 76 150 L 84 150 L 88 130 Z" fill="#0f172a" />
        <path d="M 74 138 L 77 146 L 83 146 L 86 138 Z" fill="#f8fafc" />

        {/* Left Wing */}
        <motion.g
          style={{ transformOrigin: '38px 80px' }}
          animate={leftWingAnim}
        >
          <path
            d="M 38 78 C 18 84 8 104 14 124 C 24 122 34 116 42 104 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="1.5"
          />
          <path d="M 28 88 C 15 96 12 110 18 122 C 24 118 32 112 36 102 Z" fill="#334155" />
        </motion.g>

        {/* Right Wing */}
        <motion.g
          style={{ transformOrigin: '122px 80px' }}
          animate={rightWingAnim}
        >
          <path
            d="M 122 78 C 142 84 152 104 146 124 C 136 122 126 116 118 104 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="1.5"
          />
          <path d="M 132 88 C 145 96 148 110 142 122 C 136 118 128 112 124 102 Z" fill="#334155" />
        </motion.g>

        {/* Torso */}
        <ellipse cx="80" cy="90" rx="44" ry="50" fill="#1e293b" />
        <ellipse cx="80" cy="96" rx="28" ry="34" fill="#fef08a" />
        <path d="M 64 92 Q 80 96 96 92" stroke="#78350f" strokeWidth="1.8" opacity="0.6" />
        <path d="M 66 104 Q 80 108 94 104" stroke="#78350f" strokeWidth="1.8" opacity="0.6" />

        {/* Head */}
        <circle cx="80" cy="58" r="32" fill="#fef9c3" />

        {/* Signature Carcará Crest */}
        <path
          d="M 52 38 C 38 24 22 20 14 26 C 26 32 34 38 42 46 C 24 36 12 40 8 48 C 22 50 32 54 40 60 C 26 58 18 64 16 72 C 30 68 40 66 48 68 Z"
          fill="#0f172a"
        />
        <path
          d="M 48 38 C 60 22 76 20 90 22 C 104 24 116 32 120 42 C 110 32 94 28 80 28 C 65 28 54 32 48 38 Z"
          fill="#0f172a"
        />
        <path d="M 68 24 C 60 10 46 8 38 14 C 50 18 58 24 64 32 Z" fill="#1e293b" />

        {/* Facial skin patch */}
        <ellipse cx="62" cy="62" rx="14" ry="10" fill="#f97316" opacity="0.85" />
        <ellipse cx="98" cy="62" rx="14" ry="10" fill="#f97316" opacity="0.85" />

        {/* Cyber Visor */}
        <rect x="38" y="48" width="84" height="32" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
        <rect x="42" y="52" width="76" height="24" rx="12" fill="#020617" />

        {/* Eyes */}
        {mood === 'happy' || mood === 'celebrating' ? (
          <>
            <path d="M 52 68 Q 62 56 72 68" stroke={eyeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 88 68 Q 98 56 108 68" stroke={eyeColor} strokeWidth="4" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <ellipse cx="62" cy="64" rx="7" ry="8" fill={eyeColor} />
            <circle cx="64" cy="61" r="2.2" fill="#ffffff" />
            <ellipse cx="98" cy="64" rx="7" ry="8" fill={eyeColor} />
            <circle cx="100" cy="61" r="2.2" fill="#ffffff" />
          </>
        )}

        {/* Hooked Beak */}
        <polygon points="70,72 90,72 80,82" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
        <path d="M 72 75 C 74 88 78 96 80 102 C 82 96 86 88 88 75 Z" fill="#334155" stroke="#1e293b" strokeWidth="1.2" />

        {/* Antenna */}
        <line x1="80" y1="20" x2="80" y2="10" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="80" cy="8" r="4" fill={eyeColor} />
      </svg>
    </motion.div>
  );
};
