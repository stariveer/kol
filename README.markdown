# KOL 数据采集项目

## 项目描述

这是一个基于 Node.js + TypeScript 的项目，用于抓取加密货币 KOL（Key Opinion Leaders）的社交媒体帖子并进行数据处理。项目采用主流技术栈，确保代码质量和可维护性。

## 技术栈

- **运行环境**: Node.js（最新 LTS 版本）
- **包管理器**: pnpm
- **开发语言**: TypeScript（严格模式）
- **数据抓取**: @the-convocation/twitter-scraper（Twitter 数据抓取）
- **HTTP 请求**: axios（API 请求）
- **日志管理**: winston（高性能日志工具）

## 项目配置

### 1. 环境准备

```bash
# 安装 pnpm（如果未安装）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 2. 开发环境配置

项目使用以下工具确保代码质量：

- **ESLint**: 代码规范检查
- **Prettier**: 代码格式化
- **CommitLint**: Git 提交信息规范
- **Husky**: Git Hooks 管理
- **Jest**: 单元测试框架

### 3. 项目结构

```
src/
  ├── scraper/         # 数据抓取模块
  │   └── twitter.ts   # Twitter 数据抓取实现
  ├── __tests__/       # 测试文件目录
  └── index.ts         # 项目入口文件
```

## 使用指南

### Twitter 数据抓取

```typescript
import { TwitterKOLScraper } from './scraper/twitter';
import winston from 'winston';

// 创建日志记录器
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

// 初始化爬虫
const scraper = new TwitterKOLScraper({
  logger,
  maxTweets: 100, // 可选：设置最大抓取推文数量
});

// 抓取用户推文
async function fetchTweets(username: string) {
  const tweets = await scraper.fetchUserTweets(username);
  console.log(`获取到 ${tweets.length} 条推文`);
}

// 抓取用户资料
async function fetchProfile(username: string) {
  const profile = await scraper.fetchUserProfile(username);
  console.log('用户资料：', profile);
}
```

## 开发命令

```bash
# 运行测试
pnpm test

# 代码检查
pnpm run lint

# 代码格式化
pnpm run format
```

## 注意事项

1. 请遵守 Twitter 的使用条款和 API 限制
2. 建议适当设置抓取间隔，避免频繁请求
3. 确保日志配置正确，以便追踪问题

## 许可证

ISC License
