/**
 * Best-effort in-memory rate limit. Serverless deployments run multiple
 * isolated instances, so this doesn't guarantee a hard global cap — it's a
 * cheap deterrent against a single bot hammering the endpoint, not a
 * substitute for a shared store (e.g. Redis) if abuse becomes a real problem.
 */
const hits = new Map<string, number[]>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}
