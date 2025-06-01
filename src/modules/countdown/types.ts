import type { countdowns } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type Countdown = InferSelectModel<typeof countdowns>;
