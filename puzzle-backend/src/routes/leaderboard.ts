import express from 'express';
import { db } from '../database';

const router = express.Router();

// 获取排行榜TOP100
router.get('/top100', (req, res) => {
  db.all(
    `SELECT l.*, u.nickname, u.created_at
     FROM leaderboard l
     LEFT JOIN users u ON l.openid = u.openid
     ORDER BY l.score DESC, l.created_at ASC
     LIMIT 100`,
    [],
    (err, rows: any[]) => {
      if (err) {
        console.error('Error querying leaderboard:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({ leaderboard: rows || [] });
    }
  );
});

// 获取用户在排行榜中的排名
router.get('/rank', (req, res) => {
  const openid = req.query.openid as string;

  if (!openid) {
    return res.status(400).json({ error: 'OpenID is required' });
  }

  db.get(
    `SELECT COUNT(*) as rank FROM leaderboard WHERE score > (
      SELECT score FROM leaderboard WHERE openid = ?
    )`,
    [openid],
    (err, row: any) => {
      if (err) {
        console.error('Error querying rank:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      const rank = (row?.rank || 0) + 1;
      res.json({ rank });
    }
  );
});

export default router;
