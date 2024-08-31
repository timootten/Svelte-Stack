export class RetryLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }>;
  private readonly maxAttempts: number;
  private readonly timeWindowSeconds: number;
  private cleanupInterval: NodeJS.Timer | null;

  constructor({
    maxAttempts = 5,
    retryInterval = 60,
    cleanupInterval = 60
  }: {
    maxAttempts: number, retryInterval: number, cleanupInterval?: number
  }) {
    this.attempts = new Map();
    this.maxAttempts = maxAttempts;
    this.timeWindowSeconds = retryInterval;
    this.cleanupInterval = null;
    this.startAutoCleanup(cleanupInterval);
  }

  private async cleanup(): Promise<void> {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [ip, data] of this.attempts.entries()) {
      if (now - data.lastAttempt > this.timeWindowSeconds * 1000) {
        expiredKeys.push(ip);
      }
    }

    expiredKeys.forEach(context => this.attempts.delete(context));
  }

  private startAutoCleanup(intervalSeconds: number): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.cleanupInterval = setInterval(() => {
      this.cleanup().catch(error => console.error('Error during cleanup:', error));
    }, intervalSeconds * 1000);
  }

  public stopAutoCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  public check(context: string): { isLimited: boolean; retryAfter: number } {
    const now = Date.now();
    const attempt = this.attempts.get(context);

    if (!attempt) {
      return { isLimited: false, retryAfter: 0 };
    }

    const elapsedTime = now - attempt.lastAttempt;
    const isLimited = attempt.count >= this.maxAttempts;

    if (isLimited && elapsedTime < this.timeWindowSeconds * 1000) {
      const retryAfter = Math.ceil((this.timeWindowSeconds * 1000 - elapsedTime) / 1000);
      return { isLimited: true, retryAfter };
    }

    return { isLimited: false, retryAfter: 0 };
  }

  public limit(context: string): void {
    const now = Date.now();
    const attempt = this.attempts.get(context);

    if (attempt) {
      const elapsedTime = now - attempt.lastAttempt;
      if (elapsedTime >= this.timeWindowSeconds * 1000) {
        attempt.count = 1; // Reset count after the time window
      } else {
        attempt.count++;
      }
      attempt.lastAttempt = now;
    } else {
      this.attempts.set(context, { count: 1, lastAttempt: now });
    }
  }

  public checkAndLimit(context: string): { isLimited: boolean; retryAfter: number } {
    const result = this.check(context);
    if (!result.isLimited) {
      this.limit(context);
    }
    return result;
  }
}

