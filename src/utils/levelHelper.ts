export interface LevelTier {
  level: number;
  minXp: number;
  nextXp: number;
  title: string;
  badgeIcon: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  perk: string;
}

export interface UserLevelInfo {
  level: number;
  title: string;
  badgeIcon: string;
  color: string;
  borderColor: string;
  bgGradient: string;
  perk: string;
  currentLevelBaseXp: number;
  nextLevelXp: number;
  xpIntoCurrentLevel: number;
  xpNeededForNextLevel: number;
  progressPercent: number; // 0 to 100
  xpRemaining: number;
  totalXp: number;
}

/**
 * Curated milestone levels with developer titles and rewards
 */
export const PREDEFINED_LEVELS: LevelTier[] = [
  {
    level: 1,
    minXp: 0,
    nextXp: 100,
    title: 'Aprendiz de Sintaxe',
    badgeIcon: '🐣',
    color: '#10b981', // emerald
    borderColor: 'border-emerald-500',
    bgGradient: 'from-emerald-500 to-teal-600',
    perk: 'Acesso liberado a todas as trilhas básicas de programação',
  },
  {
    level: 2,
    minXp: 100,
    nextXp: 250,
    title: 'Explorador de Algoritmos',
    badgeIcon: '⚡',
    color: '#06b6d4', // cyan
    borderColor: 'border-cyan-500',
    bgGradient: 'from-cyan-500 to-blue-600',
    perk: 'Desbloqueio de temas globais & atalhos no Playground',
  },
  {
    level: 3,
    minXp: 250,
    nextXp: 450,
    title: 'Desenvolvedor Júnior',
    badgeIcon: '💻',
    color: '#3b82f6', // blue
    borderColor: 'border-blue-500',
    bgGradient: 'from-blue-500 to-indigo-600',
    perk: 'Bônus de +5 cristais ao concluir lições com 100% de precisão',
  },
  {
    level: 4,
    minXp: 450,
    nextXp: 700,
    title: 'Arquiteto de Funções',
    badgeIcon: '🛠️',
    color: '#8b5cf6', // purple
    borderColor: 'border-purple-500',
    bgGradient: 'from-purple-500 to-violet-600',
    perk: 'Execução de scripts multithread e sem limite no Sandbox',
  },
  {
    level: 5,
    minXp: 700,
    nextXp: 1000,
    title: 'Engenheiro de Dados',
    badgeIcon: '💾',
    color: '#ec4899', // pink
    borderColor: 'border-pink-500',
    bgGradient: 'from-pink-500 to-rose-600',
    perk: 'Emblema dourado de destaque na Liga do Ranking',
  },
  {
    level: 6,
    minXp: 1000,
    nextXp: 1400,
    title: 'Mestre dos Loops',
    badgeIcon: '🔄',
    color: '#f97316', // orange
    borderColor: 'border-orange-500',
    bgGradient: 'from-orange-500 to-amber-600',
    perk: 'Proteção contra perda de ofensiva estendida para 48h',
  },
  {
    level: 7,
    minXp: 1400,
    nextXp: 1900,
    title: 'Hacker Full-Stack',
    badgeIcon: '🚀',
    color: '#eab308', // yellow
    borderColor: 'border-amber-500',
    bgGradient: 'from-amber-500 to-orange-600',
    perk: 'Desafios avançados de estruturas de dados e Rust liberados',
  },
  {
    level: 8,
    minXp: 1900,
    nextXp: 2500,
    title: 'Arquiteto de Sistemas',
    badgeIcon: '🛡️',
    color: '#14b8a6', // teal
    borderColor: 'border-teal-500',
    bgGradient: 'from-teal-500 to-emerald-600',
    perk: 'Dobro de XP ativo por 30 minutos adicionais ao praticar',
  },
  {
    level: 9,
    minXp: 2500,
    nextXp: 3200,
    title: 'Mago dos Ponteiros',
    badgeIcon: '🔮',
    color: '#a855f7', // purple
    borderColor: 'border-fuchsia-500',
    bgGradient: 'from-fuchsia-500 to-purple-600',
    perk: 'Título honorário de Mago dos Ponteiros no perfil público',
  },
  {
    level: 10,
    minXp: 3200,
    nextXp: 4000,
    title: 'Lenda Carcará Tech',
    badgeIcon: '🦅',
    color: '#f59e0b', // amber gold
    borderColor: 'border-yellow-400',
    bgGradient: 'from-yellow-400 via-amber-500 to-orange-500',
    perk: 'Aura radiante dourada e Carcará Mestre permanente no aplicativo',
  },
];

/**
 * Calculates complete user level progression information based on total XP.
 */
export function getUserLevelInfo(rawXp: number): UserLevelInfo {
  const totalXp = Math.max(0, Math.floor(rawXp || 0));

  // Check if XP falls within predefined tiers
  for (let i = 0; i < PREDEFINED_LEVELS.length; i++) {
    const tier = PREDEFINED_LEVELS[i];
    if (totalXp >= tier.minXp && totalXp < tier.nextXp) {
      const currentLevelBaseXp = tier.minXp;
      const nextLevelXp = tier.nextXp;
      const xpIntoCurrentLevel = totalXp - currentLevelBaseXp;
      const xpNeededForNextLevel = nextLevelXp - currentLevelBaseXp;
      const progressPercent = Math.min(
        100,
        Math.max(0, Math.round((xpIntoCurrentLevel / xpNeededForNextLevel) * 100))
      );
      const xpRemaining = nextLevelXp - totalXp;

      return {
        level: tier.level,
        title: tier.title,
        badgeIcon: tier.badgeIcon,
        color: tier.color,
        borderColor: tier.borderColor,
        bgGradient: tier.bgGradient,
        perk: tier.perk,
        currentLevelBaseXp,
        nextLevelXp,
        xpIntoCurrentLevel,
        xpNeededForNextLevel,
        progressPercent,
        xpRemaining,
        totalXp,
      };
    }
  }

  // If XP exceeds highest predefined tier (>= 4000 XP)
  // Dynamic formula for Level 11+: every level requires 800 XP
  const overflowXp = totalXp - 4000;
  const extraLevels = Math.floor(overflowXp / 800);
  const currentLevel = 10 + 1 + extraLevels;
  const currentLevelBaseXp = 4000 + extraLevels * 800;
  const nextLevelXp = currentLevelBaseXp + 800;
  const xpIntoCurrentLevel = totalXp - currentLevelBaseXp;
  const xpNeededForNextLevel = 800;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((xpIntoCurrentLevel / xpNeededForNextLevel) * 100))
  );
  const xpRemaining = nextLevelXp - totalXp;

  return {
    level: currentLevel,
    title: `Lenda Carcará Nível ${currentLevel}`,
    badgeIcon: '🦅',
    color: '#f59e0b',
    borderColor: 'border-yellow-400',
    bgGradient: 'from-amber-400 via-orange-500 to-rose-500',
    perk: `Status lendário supremo com +${currentLevel * 5}% de prestígio`,
    currentLevelBaseXp,
    nextLevelXp,
    xpIntoCurrentLevel,
    xpNeededForNextLevel,
    progressPercent,
    xpRemaining,
    totalXp,
  };
}

/**
 * Returns all level tiers for roadmap and visualization
 */
export function getAllLevelTiers(): LevelTier[] {
  return PREDEFINED_LEVELS;
}

/**
 * Determines whether adding new XP caused the user to level up.
 */
export function checkHasLeveledUp(oldXp: number, newXp: number): {
  leveledUp: boolean;
  oldLevel: number;
  newLevel: number;
  newLevelInfo: UserLevelInfo;
} {
  const oldInfo = getUserLevelInfo(oldXp);
  const newInfo = getUserLevelInfo(newXp);
  const leveledUp = newInfo.level > oldInfo.level;

  return {
    leveledUp,
    oldLevel: oldInfo.level,
    newLevel: newInfo.level,
    newLevelInfo: newInfo,
  };
}
