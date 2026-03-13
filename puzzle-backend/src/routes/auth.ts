import express from 'express';
import { db } from '../database';
import type { LoginRequest } from '../models/types';

const router = express.Router();

// 登录/注册
router.post('/login', (req, res) => {
  const { openid, nickname }: LoginRequest = req.body;

  if (!openid) {
    return res.status(400).json({ error: 'OpenID is required' });
  }

  db.get('SELECT * FROM users WHERE openid = ?', [openid], (err, row: any) => {
    if (err) {
      console.error('Error querying user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (row) {
      // 用户已存在，返回用户信息
      return res.json({ user: row, isNew: false });
    }

    // 新用户，创建用户记录
    const userNickname = nickname || `玩家${openid.substring(0, 8)}`;
    
    db.run(
      'INSERT INTO users (openid, nickname) VALUES (?, ?)',
      [openid, userNickname],
      function(err) {
        if (err) {
          console.error('Error creating user:', err);
          return res.status(500).json({ error: 'Failed to create user' });
        }

        // 初始化游戏进度
        db.run(
          'INSERT INTO game_progress (openid, current_level, highest_level) VALUES (?, 1, 0)',
          [openid],
          function(err) {
            if (err) {
              console.error('Error initializing progress:', err);
            }

            // 初始化排行榜记录
            db.run(
              'INSERT INTO leaderboard (openid, nickname, score, completed_levels) VALUES (?, ?, 0, 0)',
              [openid, userNickname],
              function(err) {
                if (err) {
                  console.error('Error initializing leaderboard:', err);
                }

                res.json({
                  user: {
                    openid,
                    nickname: userNickname,
                    created_at: new Date().toISOString()
                  },
                  isNew: true
                });
              }
            );
          }
        );
      }
    );
  });
});

export default router;
