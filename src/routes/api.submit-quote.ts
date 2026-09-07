import { json } from '@tanstack/react-start';
import { createFileRoute } from '@tanstack/react-router';
import { getDatabase } from '@/lib/mongodb';
import { QuoteSubmission, COLLECTIONS } from '@/lib/models';
import { quoteSchema } from '@/lib/form-validation';
import { guardSubmission } from '@/lib/request-guard';

export async function POST({ request }: { request: Request }) {
  const blocked = guardSubmission(request, 'quote');
  if (blocked) return blocked;

  try {
    const rawData = await request.json();
    const parsed = quoteSchema.safeParse(rawData);
    if (!parsed.success) {
      console.error('Validation error:', parsed.error);
      return json({ error: 'Invalid form data', details: parsed.error.errors }, { status: 400 });
    }

    const data = parsed.data;
    const {
      name,
      email,
      phone,
      collectionPostcode,
      deliveryPostcode,
      shipmentSize,
      serviceSpeed,
      weightKg,
      numberOfItems,
      additionalHandling,
      specialInstructions,
      preferredCollectionDate,
      preferredCollectionTime,
    } = data;

    const quoteSubmission: QuoteSubmission = {
      name,
      email,
      phone,
      company: data.company || 'N/A',
      collectionPostcode: collectionPostcode.toUpperCase(),
      deliveryPostcode: deliveryPostcode.toUpperCase(),
      shipmentSize,
      serviceSpeed,
      weightKg,
      numberOfItems,
      additionalHandling,
      estimatedCost: 0, // No calculation, will be manually quoted
      quoteBreakdown: null,
      specialInstructions: specialInstructions || '',
      preferredCollectionDate: preferredCollectionDate || null,
      preferredCollectionTime: preferredCollectionTime || null,
      createdAt: new Date(),
      status: 'pending',
    };

    const db = await getDatabase();
    const result = await db.collection(COLLECTIONS.QUOTES).insertOne(quoteSubmission);

    return json({
      success: true,
      message: 'Quote request submitted successfully',
      id: result.insertedId.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Quote submission error:', error);
    return json({ error: 'Failed to submit quote' }, { status: 500 });
  }
}

export const Route = createFileRoute('/api/submit-quote')({
  server: {
    handlers: {
      POST,
    },
  },
});
