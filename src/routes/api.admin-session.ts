import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { getAdminSession } from "@/lib/admin-auth";

async function GET({ request }: { request: Request }) {
  const session = getAdminSession(request);
  return session
    ? json({ authenticated: true, user: { username: session.sub, role: session.role } })
    : json({ authenticated: false }, { status: 401 });
}

export const Route = createFileRoute("/api/admin-session")({
  server: { handlers: { GET } },
});