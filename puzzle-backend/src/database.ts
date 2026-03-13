import sqlite3 from 'sqlite3';

const dbPath = './database.db';

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initTables();
  }
});

function initTables() {
  // 用户表
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      openid TEXT PRIMARY KEY,
      nickname TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 游戏进度表
  db.run(`
    CREATE TABLE IF NOT EXISTS game_progress (
      openid TEXT PRIMARY KEY,
      current_level INTEGER DEFAULT 1,
      highest_level INTEGER DEFAULT 0,
      total_time INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 排行榜表
  db.run(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      openid TEXT,
      nickname TEXT,
      score INTEGER DEFAULT 0,
      completed_levels INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (openid) REFERENCES users(openid)
    )
  `);

  console.log('Database tables initialized');
}

export default db;
