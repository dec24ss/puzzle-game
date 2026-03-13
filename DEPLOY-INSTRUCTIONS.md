# 🚀 拼图游戏 - 快速部署指南

## 📋 部署步骤

### 第1步：创建 GitHub 仓库（5分钟）

1. 访问 https://github.com
2. 登录你的账户
3. 点击右上角 "+" → "New repository"
4. 仓库名：`puzzle-game`
5. 设置为：Public
6. 勾选 "Initialize this repository with a README"
7. 点击 "Create repository"

### 第2步：上传代码（3分钟）

1. 在新仓库页面点击 "uploading an existing file"
2. 拖拽这些文件/文件夹：
   - `src/` 文件夹
   - `puzzle-backend/` 文件夹
   - `render.yaml` 文件
   - `.gitignore` 文件
3. 在 "Commit changes" 输入：`feat: 添加拼图游戏`
4. 点击 "Commit changes"

### 第3步：部署到 Render（5分钟）

1. 访问 https://dashboard.render.com
2. 注册/登录账户
3. 点击 "New +" → "Web Service"
4. 点击 "Connect" 连接你的 GitHub
5. 选择 `puzzle-game` 仓库
6. 配置：

   **名称：** `puzzle-backend`
   
   **环境：** `Node`
   
   **根目录：** `puzzle-backend`
   
   **构建命令：**
   ```
   npm install && npm run build
   ```
   
   **启动命令：**
   ```
   node dist/server.js
   ```
   
   **实例类型：** 选择 **Free**

7. 点击 "Create Web Service"
8. 等待 2-3 分钟完成部署

9. 复制部署地址，例如：
   ```
   https://puzzle-backend-xyz123.onrender.com
   ```

### 第4步：获取免费域名（10分钟）

1. 访问 https://www.freenom.com
2. 点击 "Get a Free Domain"
3. 搜索 `puzzle-game`
4. 选择免费后缀：`.tk` 或 `.ml`
5. 选择完整域名，例如：`puzzle-game.tk`
6. 点击 "Continue to Registration"
7. 填写信息并注册
8. 验证邮箱

### 第5步：配置 DNS（5分钟）

1. 登录 https://my.freenom.com
2. 点击 "My Domains"
3. 找到你的域名 → "Manage Freenom DNS"
4. 添加记录：
   - **Name:** `@`
   - **Type:** `CNAME`
   - **TTL:** `3600`
   - **Target:** 你的 Render 地址（例如：puzzle-backend-xyz123.onrender.com）
5. 点击 "Save Changes"
6. 等待 5-10 分钟生效

### 第6步：更新前端 API 地址（2分钟）

编辑 `src/api/config.ts`：
```typescript
// 改为你的域名
export const API_BASE_URL = 'https://puzzle-game.tk';
```

然后重新上传到 GitHub。

### 第7步：构建小程序（2分钟）

```bash
npm run build:weapp
```

### 第8步：发布小程序（10分钟）

1. 打开微信开发者工具
2. 导入项目，选择 `dist` 目录
3. 点击 "上传"
4. 填写版本号：`3.0.0`
5. 填写备注：`迁移到自建后端`
6. 点击 "上传"

7. 访问 https://mp.weixin.qq.com
8. 进入 "管理" → "版本管理"
9. 提交审核
10. 审核通过后发布

### 第9步：设置定时监控（3分钟）

1. 访问 https://uptimerobot.com
2. 注册账户
3. 点击 "Add New Monitor"
4. 配置：
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** Puzzle Backend
   - **URL:** https://puzzle-game.tk/health
   - **Monitoring Interval:** 5 minutes
5. 点击 "Create Monitor"

---

## ✅ 完成！

你的游戏已部署！总成本：**¥0**

---

## 📊 费用明细

| 项目 | 服务 | 价格 |
|------|------|------|
| 后端 | Render（免费版） | ¥0/月 |
| 域名 | Freenom | ¥0/年 |
| 监控 | Uptime Robot | ¥0/月 |
| 代码 | GitHub | ¥0 |
| 小程序 | 微信 | ¥0 |

**总计：¥0** 🎉

---

## 🧪 测试 API

部署完成后，测试：

```bash
# 测试健康检查
curl https://puzzle-game.tk/health

# 应该返回：
{"status":"ok","timestamp":"..."}
```

---

## 🎮 开始玩吧！

下载小程序，享受游戏！
