import { json } from '@tanstack/react-start';
import { createFileRoute } from '@tanstack/react-router';
import { getDatabase } from '@/lib/mongodb';
import { QuoteSubmission, COLLECTIONS } from '@/lib/models';
import { quoteSchema } from '@/lib/form-validation';
import { guardSubmission } from '@/lib/request-guard';
import { calculateQuote } from '@/lib/site-data';

export async function POST({ request }: { request: Request }) {
  const blocked = guardSubmission(request, 'quote');
  if (blocked) return blocked;

  try {
    const rawData = await request.json();
    const parsed = quoteSchema.safeParse(rawData);
    if (!parsed.success) return json({ error: 'Invalid form data' }, { status: 400 });

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

    const quoteBreakdown = calculateQuote({
      size: shipmentSize,
      speed: serviceSpeed,
      from: collectionPostcode,
      to: deliveryPostcode,
      weightKg,
      packages: numberOfItems,
      handling: additionalHandling,
    });

    const quoteSubmission: QuoteSubmission = {
      name,
      email,
      phone,
      company: data.company || '',
      collectionPostcode: collectionPostcode.toUpperCase(),
      deliveryPostcode: deliveryPostcode.toUpperCase(),
      shipmentSize,
      serviceSpeed,
      weightKg,
      numberOfItems,
      additionalHandling,
      estimatedCost: quoteBreakdown.total,
      quoteBreakdown,
      specialInstructions,
      preferredCollectionDate,
      preferredCollectionTime,
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
