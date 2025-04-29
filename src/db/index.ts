import { drizzle } from "drizzle-orm/neon-http";
import { upstashCache } from "drizzle-orm/cache/upstash";

import * as schema from "./schema";
import { env } from "@/env";

export const db = drizzle(env.DATABASE_URL, {
  schema,
  cache: upstashCache({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  }),
});
