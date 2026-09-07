import jwt from "jsonwebtoken";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

type AdminClaims = {
  sub: string;
  role: "admin";
};

function getAuthConfig() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_JWT_SECRET;

  if (!username || !password || !secret) {
    throw new Error("Admin authentication environment variables are not configured");
  }

  return { username, password, secret };
}

function getCookie(request: Request, name: string): string | undefined {
  const cookies = request.headers.get("cookie")?.split(";") ?? [];
  const cookie = cookies.find((value) => value.trim().startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.trim().slice(name.length + 1)) : undefined;
}

export function authenticateAdmin(username: unknown, password: unknown): boolean {
  const config = getAuthConfig();
  return username === config.username && password === config.password;
}

export function createAdminSession(username: string): string {
  const { secret } = getAuthConfig();
  return jwt.sign({ sub: username, role: "admin" } satisfies AdminClaims, secret, {
    expiresIn: SESSION_TTL_SECONDS,
  });
}

export function getAdminSession(request: Request): AdminClaims | null {
  const token = getCookie(request, COOKIE_NAME);
  if (!token) return null;

  try {
    const { secret } = getAuthConfig();
    const claims = jwt.verify(token, secret) as Partial<AdminClaims>;
    return claims.sub && claims.role === "admin"
      ? { sub: claims.sub, role: "admin" }
      : null;
  } catch {
    return null;
  }
}

export function sessionCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}${secure}`;
}

export function expiredSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function unauthorizedResponse(): Response {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}