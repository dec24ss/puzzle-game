#!/bin/bash

# API测试脚本

echo "🧪 测试拼图游戏后端API..."
echo ""

API_BASE="http://localhost:3002"

# 1. 测试健康检查
echo "1️⃣ 测试健康检查..."
curl -s "$API_BASE/health" | jq '.'
echo ""

# 2. 测试登录
echo "2️⃣ 测试登录/注册..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"openid":"test_user_001","nickname":"测试玩家"}')

echo "$LOGIN_RESPONSE" | jq '.'
echo ""

# 3. 测试获取游戏进度
echo "3️⃣ 测试获取游戏进度..."
curl -s "$API_BASE/api/game/progress?openid=test_user_001" | jq '.'
echo ""

# 4. 测试保存游戏进度
echo "4️⃣ 测试保存游戏进度..."
curl -s -X POST "$API_BASE/api/game/progress" \
  -H "Content-Type: application/json" \
  -d '{"openid":"test_user_001","current_level":3,"total_time":120000}' | jq '.'
echo ""

# 5. 测试完成关卡
echo "5️⃣ 测试完成关卡..."
curl -s -X POST "$API_BASE/api/game/complete" \
  -H "Content-Type: application/json" \
  -d '{"openid":"test_user_001","level":3,"time_spent":30000}' | jq '.'
echo ""

# 6. 测试排行榜
echo "6️⃣ 测试排行榜TOP100..."
curl -s "$API_BASE/api/leaderboard/top100" | jq '.'
echo ""

echo "✅ API测试完成！"
