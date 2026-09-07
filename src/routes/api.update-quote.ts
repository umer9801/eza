import { json } from '@tanstack/react-start';
import { createFileRoute } from '@tanstack/react-router';
import { getDatabase } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/models';
import { ObjectId } from 'mongodb';
import { getAdminSession, unauthorizedResponse } from '@/lib/admin-auth';

export async function POST({ request }: { request: Request }) {
  if (!getAdminSession(request)) return unauthorizedResponse();

  try {
    const { id, status } = await request.json();

    if (!ObjectId.isValid(id) || !['pending', 'quoted', 'approved', 'completed', 'cancelled'].includes(status)) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();
    const result = await db
      .collection(COLLECTIONS.QUOTES)
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    if (result.matchedCount === 0) {
      return json({ error: 'Quote not found' }, { status: 404 });
    }

    return json({ success: true, message: 'Status updated' }, { status: 200 });
  } catch (error) {
    console.error('Update quote error:', error);
    return json({ error: 'Failed to update quote' }, { status: 500 });
  }
}

export const Route = createFileRoute('/api/update-quote')({
  server: {
    handlers: {
      POST,
    },
  },
});
