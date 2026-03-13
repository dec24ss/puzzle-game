import { create } from 'zustand';
import { leaderboardApi } from '../api';

interface LeaderboardEntry {
  id: number;
  openid: string;
  nickname: string;
  score: number;
  completed_levels: number;
  created_at: string;
}

interface LeaderboardStore {
  leaderboard: LeaderboardEntry[];
  userRank: number | null;
  isLoading: boolean;
  error: string | null;

  loadTop100: () => Promise<void>;
  loadUserRank: (openid: string) => Promise<void>;
  clearError: () => void;
}

export const useLeaderboardStore = create<LeaderboardStore>((set) => ({
  leaderboard: [],
  userRank: null,
  isLoading: false,
  error: null,

  // 加载排行榜TOP100
  loadTop100: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await leaderboardApi.getTop100();
      set({
        leaderboard: response.leaderboard || [],
        isLoading: false,
      });
    } catch (error: any) {
      console.error('Load leaderboard error:', error);
      set({
        error: error.message || '加载排行榜失败',
        isLoading: false,
        leaderboard: [],
      });
    }
  },

  // 加载用户排名
  loadUserRank: async (openid: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await leaderboardApi.getRank(openid);
      set({
        userRank: response.rank,
        isLoading: false,
      });
    } catch (error: any) {
      console.error('Load user rank error:', error);
      set({
        userRank: null,
        isLoading: false,
      });
    }
  },

  // 清除错误
  clearError: () => {
    set({ error: null });
  },
}));
