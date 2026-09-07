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

    if (!ObjectId.isValid(id) || !['new', 'in-progress', 'resolved'].includes(status)) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDatabase();
    const result = await db
      .collection(COLLECTIONS.CONTACTS)
      .updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    if (result.matchedCount === 0) {
      return json({ error: 'Contact not found' }, { status: 404 });
    }

    return json({ success: true, message: 'Status updated' }, { status: 200 });
  } catch (error) {
    console.error('Update contact error:', error);
    return json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

export const Route = createFileRoute('/api/update-contact')({
  server: {
    handlers: {
      POST,
    },
  },
});
