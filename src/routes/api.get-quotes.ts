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
    const total = await db.collection(COLLECTIONS.QUOTES).countDocuments();
    const quotes = await db
      .collection(COLLECTIONS.QUOTES)
      .find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return json({ success: true, quotes, page, limit, total }, { status: 200 });
  } catch (error) {
    console.error('Get quotes error:', error);
    return json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export const Route = createFileRoute('/api/get-quotes')({
  server: {
    handlers: {
      GET,
    },
  },
});
