export type Language = 'logic' | 'python' | 'javascript' | 'rust' | 'java';

export type ExerciseType =
  | 'theory'
  | 'blocks'
  | 'code_editor'
  | 'predict_output'
  | 'spot_bug'
  | 'match_pairs'
  | 'fill_blank';

export interface TestCase {
  inputDescription: string;
  expectedOutput: string;
  assertionCode?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  instruction: string;
  language: Language;
  theoryContent?: {
    summary: string;
    keyPoints: string[];
    codeSnippet?: string;
    proTip?: string;
  };
  codeSnippet?: string;
  options?: string[];
  correctAnswer?: string | string[] | number;
  explanation: string;
  starterCode?: string;
  solutionCode?: string;
  testCases?: TestCase[];
  bugLineIndex?: number;
  codeLines?: string[];
  pairMatches?: { left: string; right: string }[];
  tokenBlocks?: string[];
  orderedSolution?: string[];
  hint: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  trackId: Language;
  title: string;
  description: string;
  xpReward: number;
  gemReward: number;
  icon: string;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  trackId: Language;
  color: string;
  lessons: Lesson[];
  badgeReward: {
    title: string;
    icon: string;
  };
}

export interface Track {
  id: Language;
  name: string;
  icon: string;
  color: string;
  accentColor: string;
  tagline: string;
  units: Unit[];
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  rewardGems: number;
  completed: boolean;
}

export interface DayActivity {
  date: string;
  dayLabel: string;
  dayNumber: number;
  completed: boolean;
  frozen?: boolean;
  xpEarned: number;
  isToday?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type ThemeMode = 'light' | 'dark';

export interface NotificationPreferences {
  enabled: boolean;
  time: string; // "HH:mm", e.g. "20:00"
  sound: boolean;
  lastNotifiedDate?: string; // "YYYY-MM-DD"
}

export interface UserProfile {
  studentName?: string;
  theme?: ThemeMode;
  notificationPreferences?: NotificationPreferences;
  hearts: number;
  maxHearts: number;
  gems: number;
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedLessonIds: string[];
  activeTrack: Language;
  dailyQuests: DailyQuest[];
  streakActivity: DayActivity[];
  longestStreak: number;
  totalDaysActive: number;
  inventory: {
    streakFreeze: number;
    doubleXpMinutesLeft: number;
  };
  league: 'Bronze' | 'Prata' | 'Ouro' | 'Safira' | 'Diamante';
}

