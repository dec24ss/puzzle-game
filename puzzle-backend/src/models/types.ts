// 数据库类型定义
export interface User {
  openid: string;
  nickname: string;
  created_at: string;
}

export interface GameProgress {
  openid: string;
  current_level: number;
  highest_level: number;
  total_time: number;
  updated_at: string;
}

export interface LeaderboardEntry {
  id: number;
  openid: string;
  nickname: string;
  score: number;
  completed_levels: number;
  created_at: string;
}

export interface LoginRequest {
  openid: string;
  nickname?: string;
}

export interface SaveProgressRequest {
  openid: string;
  current_level: number;
  total_time: number;
}

export interface CompleteLevelRequest {
  openid: string;
  level: number;
  time_spent: number;
}
