import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { authenticateAdmin, createAdminSession, sessionCookie } from "@/lib/admin-auth";

async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    if (!authenticateAdmin(data.username, data.password)) {
      return json({ error: "Invalid username or password" }, { status: 401 });
    }

    const token = createAdminSession(data.username);
    return json(
      { success: true, user: { username: data.username, role: "admin" } },
      { status: 200, headers: { "Set-Cookie": sessionCookie(token) } },
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return json({ error: "Unable to sign in" }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/admin-login")({
  server: { handlers: { POST } },
});