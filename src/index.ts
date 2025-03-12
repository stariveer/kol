import { TwitterKOLScraper } from './scraper/twitter';
import winston from 'winston';

// 配置日志记录器
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

// 初始化爬虫实例
const scraper = new TwitterKOLScraper({
  logger,
  maxTweets: 10, // 设置较小的数值用于测试
  maxRetries: 3, // 设置最大重试次数
});

// 示例：抓取指定用户的推文
async function main() {
  try {
    const username = 'elonmusk'; // 示例用户

    // 抓取用户资料
    console.log('正在获取用户资料...');
    const profile = await scraper.fetchUserProfile(username);
    console.log('用户资料：', JSON.stringify(profile, null, 2));

    // 抓取用户推文
    console.log('\n正在获取用户推文...');
    const tweets = await scraper.fetchUserTweets(username);
    console.log('推文数据：', JSON.stringify(tweets, null, 2));
  } catch (error) {
    console.error('发生错误：', error instanceof Error ? error.message : String(error));
  }
}

// 运行示例
main();
