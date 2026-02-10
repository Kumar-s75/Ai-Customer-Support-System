import type { Context, Next } from "hono";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60_000; 
const MAX_REQUESTS = 20; 

const store = new Map<string, RateLimitEntry>();

export async function rateLimitMiddleware(
  c: Context,
  next: Next
) {
  const ip =
    c.req.header("x-forwarded-for") ??
    c.req.header("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || entry.resetAt < now) {
    store.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return next();
  }

  if (entry.count >= MAX_REQUESTS) {
    return c.json(
      {
        error: "Too many requests. Please slow down.",
      },
      429
    );
  }

  entry.count += 1;
  store.set(ip, entry);

  return next();
}
