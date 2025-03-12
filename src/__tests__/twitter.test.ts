import { TwitterKOLScraper } from '../scraper/twitter';
import winston from 'winston';

describe('TwitterKOLScraper', () => {
  let scraper: TwitterKOLScraper;
  let logger: winston.Logger;

  beforeEach(() => {
    logger = winston.createLogger({
      transports: [new winston.transports.Console()],
      silent: true, // 测试时禁用日志输出
    });
    scraper = new TwitterKOLScraper({ logger });
  });

  it('should create scraper instance', () => {
    expect(scraper).toBeInstanceOf(TwitterKOLScraper);
  });

  it('should handle errors when fetching tweets', async () => {
    await expect(scraper.fetchUserTweets('')).rejects.toThrow();
  });

  it('should handle errors when fetching profile', async () => {
    await expect(scraper.fetchUserProfile('')).rejects.toThrow();
  });
});
