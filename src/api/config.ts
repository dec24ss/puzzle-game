// API配置
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3002';

export const API = {
  // 认证
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  
  // 游戏进度
  GET_PROGRESS: `${API_BASE_URL}/api/game/progress`,
  SAVE_PROGRESS: `${API_BASE_URL}/api/game/progress`,
  COMPLETE_LEVEL: `${API_BASE_URL}/api/game/complete`,
  
  // 排行榜
  LEADERBOARD_TOP100: `${API_BASE_URL}/api/leaderboard/top100`,
  GET_RANK: `${API_BASE_URL}/api/leaderboard/rank`,
};
