const WINDOW_MS = 15 * 60 * 1_000;
const MAX_SUBMISSIONS_PER_WINDOW = 10;
const MAX_BODY_BYTES = 50_000;

const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request, scope: string): string {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return `${scope}:${forwardedFor || request.headers.get("x-real-ip") || "unknown"}`;
}

export function guardSubmission(request: Request, scope: string): Response | null {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Request body is too large" }, { status: 413 });
  }

  const now = Date.now();
  const key = getClientKey(request, scope);
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  if (current.count >= MAX_SUBMISSIONS_PER_WINDOW) {
    return Response.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((current.resetAt - now) / 1_000)) } },
    );
  }

  current.count += 1;
  return null;
}