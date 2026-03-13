# ⚡ 快速部署清单（按顺序操作）

## 准备工作

- [ ] 已下载打包文件：`puzzle-game-deploy.tar.gz`
- [ ] 已解压到本地目录
- [ ] 准备好 GitHub 账户
- [ ] 准备好邮箱（用于域名注册）

---

## 第1步：创建 GitHub 仓库（5分钟）

1. 访问：https://github.com
2. 登录账户
3. 点击 "+" → "New repository"
4. 名称：`puzzle-game`
5. Public ✅
6. Initialize with README ✅
7. 点击 "Create"

---

## 第2步：上传代码（3分钟）

1. 在新仓库页面点击 "uploading an existing file"
2. 上传：
   - `src/` 文件夹
   - `puzzle-backend/` 文件夹
   - `render.yaml` 文件
3. Commit message: `feat: 添加拼图游戏`
4. 点击 "Commit changes"

---

## 第3步：部署到 Render（5分钟）

1. 访问：https://dashboard.render.com
2. 注册/登录
3. 点击 "New +" → "Web Service"
4. Connect GitHub → 选择 `puzzle-game`
5. 配置：
   - 根目录：`puzzle-backend`
   - 构建：`npm install && npm run build`
   - 启动：`node dist/server.js`
   - 类型：**Free**
6. 点击 "Create"
7. 复制地址（如：`https://puzzle-backend-xyz.onrender.com`）

---

## 第4步：注册免费域名（10分钟）

1. 访问：https://www.freenom.com
2. 点击 "Get a Free Domain"
3. 搜索：`puzzle-game`
4. 选择后缀（推荐：`.tk`）
5. 完成注册
6. 验证邮箱

---

## 第5步：配置 DNS（5分钟）

1. 访问：https://my.freenom.com
2. 找到你的域名 → "Manage Freenom DNS"
3. 添加记录：
   - Name: `@`
   - Type: `CNAME`
   - Target: 你的 Render 地址
4. 保存
5. 等待 5-10 分钟

---

## 第6步：更新 API 地址（2分钟）

1. 在 GitHub 打开 `src/api/config.ts`
2. 修改为：`export const API_BASE_URL = 'https://puzzle-game.tk';`
3. Commit changes

---

## 第7步：构建小程序（2分钟）

```bash
npm install
npm run build:weapp
```

---

## 第8步：发布小程序（10分钟）

1. 微信开发者工具打开 `dist`
2. 上传代码
3. 版本号：`3.0.0`
4. 提交审核
5. 发布

---

## 第9步：设置监控（3分钟，可选）

1. 访问：https://uptimerobot.com
2. 注册账户
3. 添加 Monitor
4. URL: `https://puzzle-game.tk/health`
5. 间隔：5 分钟

---

## ✅ 完成！

**总成本：¥0** 🎉
**总时间：约 40 分钟**
