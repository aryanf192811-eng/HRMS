export interface SustainabilityMetrics {
  lateCheckIns: number;
  unpaidLeaveRatio: number;
  sickLeaveFreq: number;
  workStreak: number;
  attendanceRate: number;
}

export const calculateSustainabilityScore = (
  metrics: SustainabilityMetrics
): number => {
  let score = 100;

  // Deductions
  score -= metrics.lateCheckIns * 4;
  if (metrics.unpaidLeaveRatio > 0.1) score -= 10;
  if (metrics.sickLeaveFreq > 3) score -= 15;

  // Bonuses
  const streakBonus = Math.floor(metrics.workStreak / 5) * 2;
  score += streakBonus;

  // Attendance anchor
  if (metrics.attendanceRate < 90) {
    score -= 90 - metrics.attendanceRate;
  }

  return Math.min(Math.max(Math.round(score), 0), 100);
};
