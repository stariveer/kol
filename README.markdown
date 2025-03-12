# kol

项目描述：
我正在构建一个 Node.js + TypeScript 项目，目标是 抓取加密货币 KOL（Key Opinion Leaders）的帖子 并 降低噪声。我希望使用 成熟且主流的技术栈，减少调试成本，并确保代码风格统一、可维护性高。

⸻

技术栈：
• 运行环境: Node.js（最新 LTS 版本）
• 包管理器: pnpm
• 语言: TypeScript（严格模式）
• Web 爬虫: puppeteer / playwright（支持 headless 模式）
• HTTP 请求: axios / got（用于 API 请求）
• 数据存储: MongoDB（Mongoose ORM）或 PostgreSQL（Prisma ORM）
• 日志管理: winston / pino（高性能日志工具）

⸻

开发环境设置：

✅ 代码质量（静态分析 & 格式化）：
• ESLint（代码规范，集成 TypeScript）
• Prettier（代码格式化，配合 ESLint 使用）
• CommitLint（规范 Git 提交信息）
• Husky + lint-staged（在提交代码前进行代码检查和格式化）
• EditorConfig（保证不同 IDE 之间的代码风格一致）

✅ 代码组织：
• 单一职责原则（SRP）：模块化拆分代码，避免大文件
• 日志 & 错误处理：全局日志管理，确保爬取异常不会导致程序崩溃

✅ 测试 & 代码验证：
• Jest（单元测试框架）
• Vitest（更快的测试框架，可选）
• Mock Service Worker (MSW)（用于模拟 API 响应）

✅ CI/CD 集成（可选）：
• GitHub Actions（自动化代码检查、测试）
• ESLint + Prettier 检查（在 PR 时运行）
• Docker 化（后期可考虑）

⸻

目标： 1. 使用 pnpm 初始化 TypeScript 项目，配置 tsconfig.json（严格模式） 2. 安装 & 配置 ESLint、Prettier、CommitLint、Husky 3. 实现基础 Web 爬虫模块，支持 Twitter 4. 添加日志系统，确保爬取异常时有详细日志 5. 编写单元测试，保证核心逻辑的稳定性
