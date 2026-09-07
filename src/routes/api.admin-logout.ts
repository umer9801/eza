import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { expiredSessionCookie } from "@/lib/admin-auth";

async function POST() {
  return json({ success: true }, { headers: { "Set-Cookie": expiredSessionCookie() } });
}

export const Route = createFileRoute("/api/admin-logout")({
  server: { handlers: { POST } },
});