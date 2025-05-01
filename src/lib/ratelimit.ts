import { Ratelimit, type Duration } from "@upstash/ratelimit";

import { redis } from "./redis";

const cache = new Map();

export const createRateLimiter = (requests: number, interval: Duration) => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, interval),
    ephemeralCache: cache,
    analytics: true,
  });
};

export const defaultRateLimiter = createRateLimiter(10, "10s");
