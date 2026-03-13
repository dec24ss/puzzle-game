import { create } from 'zustand';
import Taro from '@tarojs/taro';
import { authApi, gameApi } from '../api';

interface UserInfo {
  openid?: string;
  nickname?: string;
  avatar?: string;
  created_at?: string;
}

interface GameProgress {
  current_level: number;
  highest_level: number;
  total_time: number;
  updated_at: string;
}

interface UserStore {
  userInfo: UserInfo | null;
  isLoggedIn: boolean;
  gameProgress: GameProgress | null;
  isLoading: boolean;

  // 方法
  login: (nickname?: string) => Promise<void>;
  logout: () => void;
  loadProgress: () => Promise<void>;
  saveProgress: (currentLevel: number, totalTime: number) => Promise<void>;
  completeLevel: (level: number, timeSpent: number) => Promise<void>;
  getCurrentLevel: () => number;
  getHighestLevel: () => number;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userInfo: null,
  isLoggedIn: false,
  gameProgress: null,
  isLoading: false,

  // 登录
  login: async (nickname?: string) => {
    set({ isLoading: true });

    try {
      // 生成或获取OpenID（微信小程序）
      let openid = Taro.getStorageSync('openid');
      
      if (!openid) {
        const res = await Taro.login();
        openid = res.code; // 使用code作为临时openid，实际应该调用后端获取真实openid
        Taro.setStorageSync('openid', openid);
      }

      // 调用后端登录API
      const response = await authApi.login(openid, nickname);
      
      set({
        userInfo: {
          openid: response.user.openid,
          nickname: response.user.nickname,
          created_at: response.user.created_at,
        },
        isLoggedIn: true,
        isLoading: false,
      });

      // 加载游戏进度
      await get().loadProgress();
    } catch (error) {
      console.error('Login error:', error);
      
      // 如果后端不可用，使用本地存储作为降级方案
      const localOpenid = Taro.getStorageSync('openid') || `local_${Date.now()}`;
      set({
        userInfo: {
          openid: localOpenid,
          nickname: nickname || `玩家${localOpenid.substring(0, 8)}`,
        },
        isLoggedIn: true,
        isLoading: false,
      });

      // 加载本地进度
      get().loadProgress();
    }
  },

  // 登出
  logout: () => {
    set({
      userInfo: null,
      isLoggedIn: false,
      gameProgress: null,
    });
    Taro.removeStorageSync('openid');
  },

  // 加载游戏进度
  loadProgress: async () => {
    const { userInfo } = get();
    if (!userInfo?.openid) return;

    try {
      const progress = await gameApi.getProgress(userInfo.openid);
      set({ gameProgress: progress });

      // 同时保存到本地作为缓存
      Taro.setStorageSync('gameProgress', progress);
    } catch (error) {
      console.error('Load progress error:', error);
      
      // 从本地存储读取
      const localProgress = Taro.getStorageSync('gameProgress');
      if (localProgress) {
        set({ gameProgress: localProgress });
      }
    }
  },

  // 保存游戏进度
  saveProgress: async (currentLevel: number, totalTime: number) => {
    const { userInfo } = get();
    if (!userInfo?.openid) return;

    const progress = {
      current_level: currentLevel,
      highest_level: get().getHighestLevel(),
      total_time: totalTime,
      updated_at: new Date().toISOString(),
    };

    try {
      await gameApi.saveProgress(userInfo.openid, currentLevel, totalTime);
      set({ gameProgress: progress });

      // 保存到本地缓存
      Taro.setStorageSync('gameProgress', progress);
    } catch (error) {
      console.error('Save progress error:', error);
      
      // 保存到本地存储
      Taro.setStorageSync('gameProgress', progress);
    }
  },

  // 完成关卡
  completeLevel: async (level: number, timeSpent: number) => {
    const { userInfo, gameProgress } = get();
    if (!userInfo?.openid) return;

    try {
      const result = await gameApi.completeLevel(userInfo.openid, level, timeSpent);
      
      const newProgress = {
        ...gameProgress,
        current_level: result.current_level,
        highest_level: Math.max(gameProgress?.highest_level || 0, level),
        updated_at: new Date().toISOString(),
      };
      
      set({ gameProgress: newProgress });
      Taro.setStorageSync('gameProgress', newProgress);
    } catch (error) {
      console.error('Complete level error:', error);
      
      // 更新本地存储
      const newProgress = {
        ...gameProgress,
        highest_level: Math.max(gameProgress?.highest_level || 0, level),
        updated_at: new Date().toISOString(),
      };
      
      set({ gameProgress: newProgress });
      Taro.setStorageSync('gameProgress', newProgress);
    }
  },

  // 获取当前关卡
  getCurrentLevel: () => {
    const { gameProgress } = get();
    return gameProgress?.current_level || 1;
  },

  // 获取最高关卡
  getHighestLevel: () => {
    const { gameProgress } = get();
    return gameProgress?.highest_level || 0;
  },
}));
