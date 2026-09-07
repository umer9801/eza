import { json } from '@tanstack/react-start';
import { createFileRoute } from '@tanstack/react-router';
import { getDatabase } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/models';
import { getAdminSession, unauthorizedResponse } from '@/lib/admin-auth';

export async function GET({ request }: { request: Request }) {
  if (!getAdminSession(request)) return unauthorizedResponse();

  try {
    const url = new URL(request.url);
    const requestedPage = Number(url.searchParams.get('page') || '1');
    const requestedLimit = Number(url.searchParams.get('limit') || '50');
    const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const limit = Number.isInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(100, requestedLimit)
      : 50;
    const db = await getDatabase();
    const total = await db.collection(COLLECTIONS.CONTACTS).countDocuments();
    const contacts = await db
      .collection(COLLECTIONS.CONTACTS)
      .find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return json({ success: true, contacts, page, limit, total }, { status: 200 });
  } catch (error) {
    console.error('Get contacts error:', error);
    return json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export const Route = createFileRoute('/api/get-contacts')({
  server: {
    handlers: {
      GET,
    },
  },
});
