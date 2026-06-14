export interface UserProfile {
  name: string;
  age: number;
  height: number;
  initialWeight: number;
  targetWeight: number;
  blocker: string;
  hasTimerPreference?: boolean;
}

export type SelectedPlan = "standard" | "vip_monthly" | "vip_yearly";

export interface WeightLog {
  date: string;
  weight: number;
}

export interface DayTask {
  id: string;
  dayIndex: number; // 1 to 90
  text: string;
  type: "metabolic" | "fasting" | "mindset" | "habits" | "booster";
  completed: boolean;
}

export interface CommunityPost {
  id: string;
  userName: string;
  avatarColor: string;
  timeAgo: string;
  content: string;
  likes: number;
  commentsCount: number;
  isLikedByUser?: boolean;
}

export interface RankingItem {
  id: string;
  rank: number;
  name: string;
  weightLost: number;
  waistLost: number;
  points: number;
  isUser?: boolean;
}
