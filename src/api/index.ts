import { API } from './config';

// 通用请求方法
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// GET请求
export function get<T>(url: string): Promise<T> {
  return request<T>(url, { method: 'GET' });
}

// POST请求
export function post<T>(url: string, data: any): Promise<T> {
  return request<T>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// 认证API
export const authApi = {
  login: (openid: string, nickname?: string) => {
    return post(API.LOGIN, { openid, nickname });
  },
};

// 游戏进度API
export const gameApi = {
  getProgress: (openid: string) => {
    return get(`${API.GET_PROGRESS}?openid=${openid}`);
  },

  saveProgress: (openid: string, currentLevel: number, totalTime: number) => {
    return post(API.SAVE_PROGRESS, { openid, current_level: currentLevel, total_time: totalTime });
  },

  completeLevel: (openid: string, level: number, timeSpent: number) => {
    return post(API.COMPLETE_LEVEL, { openid, level, time_spent: timeSpent });
  },
};

// 排行榜API
export const leaderboardApi = {
  getTop100: () => {
    return get(API.LEADERBOARD_TOP100);
  },

  getRank: (openid: string) => {
    return get(`${API.GET_RANK}?openid=${openid}`);
  },
};
