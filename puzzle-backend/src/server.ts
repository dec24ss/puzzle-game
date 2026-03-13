import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import gameRouter from './routes/game';
import leaderboardRouter from './routes/leaderboard';

const app = express();
const PORT = process.env.PORT || 3002;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/api/auth', authRouter);
app.use('/api/game', gameRouter);
app.use('/api/leaderboard', leaderboardRouter);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🎮 拼图游戏后端API运行在 http://localhost:${PORT}`);
  console.log(`📊 健康检查: http://localhost:${PORT}/health`);
  console.log(`📋 API文档:`);
  console.log(`  POST /api/auth/login - 登录/注册`);
  console.log(`  GET  /api/game/progress - 获取游戏进度`);
  console.log(`  POST /api/game/progress - 保存游戏进度`);
  console.log(`  POST /api/game/complete - 完成关卡`);
  console.log(`  GET  /api/leaderboard/top100 - 排行榜TOP100`);
  console.log(`  GET  /api/leaderboard/rank - 用户排名`);
});

export default app;
