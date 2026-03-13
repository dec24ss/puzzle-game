# 拼图小游戏后端API

## 📦 安装依赖

```bash
npm install
```

## 🚀 启动服务器

### 开发模式
```bash
npm run dev
```

### 生产模式
```bash
npm run build
npm start
```

服务器默认运行在 `http://localhost:3001`

## 📋 API 文档

### 1. 登录/注册

**POST** `/api/auth/login`

**请求体：**
```json
{
  "openid": "用户OpenID",
  "nickname": "玩家昵称（可选）"
}
```

**响应：**
```json
{
  "user": {
    "openid": "用户OpenID",
    "nickname": "玩家昵称",
    "created_at": "2024-03-13T..."
  },
  "isNew": true/false
}
```

---

### 2. 获取游戏进度

**GET** `/api/game/progress?openid=用户OpenID`

**响应：**
```json
{
  "openid": "用户OpenID",
  "current_level": 5,
  "highest_level": 4,
  "total_time": 120000,
  "updated_at": "2024-03-13T..."
}
```

---

### 3. 保存游戏进度

**POST** `/api/game/progress`

**请求体：**
```json
{
  "openid": "用户OpenID",
  "current_level": 5,
  "total_time": 120000
}
```

**响应：**
```json
{
  "success": true
}
```

---

### 4. 完成关卡

**POST** `/api/game/complete`

**请求体：**
```json
{
  "openid": "用户OpenID",
  "level": 4,
  "time_spent": 30000
}
```

**响应：**
```json
{
  "success": true,
  "current_level": 5
}
```

---

### 5. 排行榜TOP100

**GET** `/api/leaderboard/top100`

**响应：**
```json
{
  "leaderboard": [
    {
      "id": 1,
      "openid": "用户OpenID",
      "nickname": "玩家昵称",
      "score": 400,
      "completed_levels": 4,
      "created_at": "2024-03-13T..."
    }
  ]
}
```

---

### 6. 用户排名

**GET** `/api/leaderboard/rank?openid=用户OpenID`

**响应：**
```json
{
  "rank": 5
}
```

---

## 🗄️ 数据库结构

### users 表
| 字段 | 类型 | 说明 |
|------|------|------|
| openid | TEXT | 用户OpenID（主键） |
| nickname | TEXT | 用户昵称 |
| created_at | DATETIME | 创建时间 |

### game_progress 表
| 字段 | 类型 | 说明 |
|------|------|------|
| openid | TEXT | 用户OpenID（主键） |
| current_level | INTEGER | 当前关卡 |
| highest_level | INTEGER | 最高关卡 |
| total_time | INTEGER | 总游戏时间（毫秒） |
| updated_at | DATETIME | 更新时间 |

### leaderboard 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | ID（主键） |
| openid | TEXT | 用户OpenID（外键） |
| nickname | TEXT | 用户昵称 |
| score | INTEGER | 分数 |
| completed_levels | INTEGER | 完成关卡数 |
| created_at | DATETIME | 创建时间 |

---

## 🏗️ 技术栈

- Node.js
- Express
- SQLite3
- TypeScript
- CORS

---

## 🔒 部署建议

### Vercel / Render

1. 将代码推送到GitHub
2. 连接到Vercel/Render
3. 配置环境变量 `PORT=3001`
4. 自动部署

### 本地服务器

使用PM2守护进程：
```bash
npm install -g pm2
pm2 start dist/server.js --name puzzle-backend
pm2 save
pm2 startup
```

---

## 📝 注意事项

1. 数据库文件 `database.db` 会自动创建
2. 排名按分数降序，相同分数按创建时间升序
3. 每完成一关加100分
4. 所有时间单位为毫秒
