import { json } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/models";
import { getAdminSession, unauthorizedResponse } from "@/lib/admin-auth";

async function DELETE({ request }: { request: Request }) {
  if (!getAdminSession(request)) return unauthorizedResponse();

  try {
    const { id } = await request.json();
    if (typeof id !== "string" || !ObjectId.isValid(id)) {
      return json({ error: "Invalid quote id" }, { status: 400 });
    }

    const result = await (await getDatabase())
      .collection(COLLECTIONS.QUOTES)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return json({ error: "Quote not found" }, { status: 404 });
    }

    return json({ success: true });
  } catch (error) {
    console.error("Delete quote error:", error);
    return json({ error: "Failed to delete quote" }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/delete-quote")({
  server: { handlers: { DELETE } },
});