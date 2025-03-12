import { Scraper, SearchMode, Tweet } from '@the-convocation/twitter-scraper';
import { Logger } from 'winston';

export interface TwitterScraperConfig {
  logger: Logger;
  maxTweets?: number;
  maxRetries?: number;
}

export interface TweetData {
  id: string;
  text: string;
  time: string;
  likes: number;
  retweets: number;
  replies: number;
  url: string;
}

export class TwitterKOLScraper {
  private scraper: Scraper;
  private logger: Logger;
  private maxTweets: number;
  private maxRetries: number;

  constructor(config: TwitterScraperConfig) {
    this.scraper = new Scraper();
    this.logger = config.logger;
    this.maxTweets = config.maxTweets || 100;
    this.maxRetries = config.maxRetries || 3;
  }

  private async withRetry<T>(operation: () => Promise<T>, errorMessage: string): Promise<T> {
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (attempt < this.maxRetries) {
          const delay = Math.min(1000 * attempt, 5000);
          this.logger.warn(`${errorMessage} 尝试第 ${attempt} 次失败，${delay}ms 后重试...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    throw lastError;
  }

  async fetchUserTweets(username: string, startTime?: Date): Promise<TweetData[]> {
    if (!username) {
      throw new Error('用户名为必填项');
    }

    try {
      this.logger.info(`开始抓取用户 ${username} 的推文`);
      const tweets: TweetData[] = [];
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const filterStartTime = startTime || oneWeekAgo;

      for await (const tweet of this.scraper.getTweets(username, SearchMode.Latest)) {
        if (!tweet.timestamp) continue;

        const tweetDate = new Date(tweet.timestamp * 1000);
        if (tweetDate < filterStartTime) break;

        tweets.push({
          id: tweet.id || '',
          text: tweet.text || '',
          time: new Date(tweet.timestamp * 1000).toISOString(),
          likes: tweet.likes || 0,
          retweets: tweet.retweets || 0,
          replies: tweet.replies || 0,
          url: `https://x.com/${username}/status/${tweet.id}`,
        });

        if (tweets.length >= this.maxTweets) break;
      }

      this.logger.info(`成功抓取 ${tweets.length} 条推文`);
      return tweets;
    } catch (error) {
      this.logger.error(`抓取推文失败: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  async fetchUserProfile(username: string): Promise<any> {
    return this.withRetry(async () => {
      this.logger.info(`开始抓取用户 ${username} 的个人资料`);
      const profile = await this.scraper.getProfile(username);
      this.logger.info('个人资料抓取成功');
      return profile;
    }, `抓取用户 ${username} 的个人资料失败`);
  }
}
