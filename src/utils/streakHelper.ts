import { DayActivity } from '../types';

/**
 * Returns formatted 7-day activity (Sun-Sat or last 7 days ending today)
 * with accurate dates, day labels in Portuguese, and activity state.
 */
export function getWeeklyStreakActivity(streakDays: number = 3): DayActivity[] {
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = new Date();
  const currentDayIndex = today.getDay(); // 0 (Sun) to 6 (Sat)
  
  // Calculate start of current week (Sunday)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - currentDayIndex);

  const week: DayActivity[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);

    const isToday = i === currentDayIndex;
    const isPast = i < currentDayIndex;
    
    // In our gamified state, user has a streak active ending today
    // If streakDays = 3, today and 2 previous days are completed
    const daysAgo = currentDayIndex - i;
    const isCompleted = isToday ? true : isPast && daysAgo < streakDays;
    // Let's add a frozen day if they had a break earlier
    const isFrozen = isPast && daysAgo === streakDays;

    const dateStr = d.toISOString().split('T')[0];

    week.push({
      date: dateStr,
      dayLabel: daysOfWeek[i],
      dayNumber: d.getDate(),
      completed: isCompleted,
      frozen: isFrozen,
      xpEarned: isCompleted ? (isToday ? 35 : 50) : 0,
      isToday,
    });
  }

  return week;
}

/**
 * Returns 30-day activity map for monthly consistency visualization
 */
export interface MonthlyHeatmapDay {
  date: string;
  dayOfMonth: number;
  level: 0 | 1 | 2 | 3; // 0 = rest/none, 1 = light, 2 = medium, 3 = high
  completed: boolean;
  frozen?: boolean;
  isToday: boolean;
  xp: number;
}

export function getMonthlyHeatmap(streakDays: number = 3): MonthlyHeatmapDay[] {
  const today = new Date();
  const days: MonthlyHeatmapDay[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const isToday = i === 0;

    let completed = false;
    let frozen = false;
    let xp = 0;
    let level: 0 | 1 | 2 | 3 = 0;

    if (i < streakDays) {
      completed = true;
      xp = isToday ? 35 : (i % 2 === 0 ? 60 : 45);
      level = xp >= 50 ? 3 : 2;
    } else if (i === streakDays && streakDays > 2) {
      frozen = true;
      level = 1;
    } else if (i > streakDays && (i % 3 === 0 || i % 5 === 0)) {
      // Historical past days active
      completed = true;
      xp = 40;
      level = 2;
    }

    days.push({
      date: dateStr,
      dayOfMonth: d.getDate(),
      level,
      completed,
      frozen,
      isToday,
      xp,
    });
  }

  return days;
}
