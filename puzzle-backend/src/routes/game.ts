import express from 'express';
import { db } from '../database';
import type { SaveProgressRequest, CompleteLevelRequest } from '../models/types';

const router = express.Router();

// 获取游戏进度
router.get('/progress', (req, res) => {
  const openid = req.query.openid as string;

  if (!openid) {
    return res.status(400).json({ error: 'OpenID is required' });
  }

  db.get(
    'SELECT * FROM game_progress WHERE openid = ?',
    [openid],
    (err, row: any) => {
      if (err) {
        console.error('Error querying progress:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!row) {
        return res.json({
          current_level: 1,
          highest_level: 0,
          total_time: 0
        });
      }

      res.json(row);
    }
  );
});

// 保存游戏进度
router.post('/progress', (req, res) => {
  const { openid, current_level, total_time }: SaveProgressRequest = req.body;

  if (!openid) {
    return res.status(400).json({ error: 'OpenID is required' });
  }

  db.run(
    `INSERT INTO game_progress (openid, current_level, total_time, highest_level)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(openid) DO UPDATE SET
       current_level = ?,
       total_time = total_time + ?,
       highest_level = MAX(highest_level, ?),
       updated_at = CURRENT_TIMESTAMP`,
    [openid, current_level, total_time, current_level, current_level, total_time, current_level],
    function(err) {
      if (err) {
        console.error('Error saving progress:', err);
        return res.status(500).json({ error: 'Failed to save progress' });
      }

      res.json({ success: true });
    }
  );
});

// 完成关卡
router.post('/complete', (req, res) => {
  const { openid, level, time_spent }: CompleteLevelRequest = req.body;

  if (!openid || !level) {
    return res.status(400).json({ error: 'OpenID and level are required' });
  }

  // 更新游戏进度
  db.run(
    `UPDATE game_progress
     SET highest_level = MAX(highest_level, ?),
         current_level = current_level + 1,
         total_time = total_time + ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE openid = ?`,
    [level, time_spent || 0, openid],
    function(err) {
      if (err) {
        console.error('Error updating progress:', err);
        return res.status(500).json({ error: 'Failed to update progress' });
      }

      // 更新排行榜
      db.run(
        `UPDATE leaderboard
         SET completed_levels = completed_levels + 1,
             score = score + ?
         WHERE openid = ?`,
        [100, openid], // 每完成一关加100分
        function(err) {
          if (err) {
            console.error('Error updating leaderboard:', err);
            return res.status(500).json({ error: 'Failed to update leaderboard' });
          }

          res.json({ success: true, current_level: level + 1 });
        }
      );
    }
  );
});

export default router;
