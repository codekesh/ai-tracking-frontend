export interface UserSummary {
  email: string;
  name: string;
}

export interface DietSummary {
  todayCalories: number;
  goal: number;
  entriesCount: number;
}

export interface StreakSummary {
  diet: number;
}

export interface DashboardResponse {
  user: UserSummary;
  diet: DietSummary;
  streaks: StreakSummary;
  aiSuggestions: string[];
}