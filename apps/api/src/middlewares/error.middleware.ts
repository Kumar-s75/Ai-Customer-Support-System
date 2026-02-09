import type { Context, Next } from "hono";

export async function errorMiddleware(c: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    console.error("Unhandled error:", error);

    return c.json(
      {
        error: "Internal Server Error",
      },
      500
    );
  }
}
