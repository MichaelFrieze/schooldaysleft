import { Ratelimit, type Duration } from "@upstash/ratelimit";

import { redis } from "./redis";

export const createRateLimiter = (requests: number, interval: Duration) => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, interval),
  });
};

export const defaultRateLimiter = createRateLimiter(20, "10s");
