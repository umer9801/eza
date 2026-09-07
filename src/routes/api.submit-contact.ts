import { json } from '@tanstack/react-start';
import { createFileRoute } from '@tanstack/react-router';
import { getDatabase } from '@/lib/mongodb';
import { ContactSubmission, COLLECTIONS } from '@/lib/models';
import { contactSchema } from '@/lib/form-validation';
import { guardSubmission } from '@/lib/request-guard';

export async function POST({ request }: { request: Request }) {
  const blocked = guardSubmission(request, 'contact');
  if (blocked) return blocked;

  try {
    const data = await request.json();
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) return json({ error: 'Invalid form data' }, { status: 400 });
    const { name, email, enquiryType, message, consent, phone, company } = parsed.data;

    const contactSubmission: ContactSubmission = {
      name,
      email,
      phone,
      company,
      enquiryType,
      message,
      consent,
      createdAt: new Date(),
      status: 'new',
    };

    const db = await getDatabase();
    const result = await db.collection(COLLECTIONS.CONTACTS).insertOne(contactSubmission);

    return json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertedId.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Contact submission error:', error);
    return json({ error: 'Failed to submit contact form' }, { status: 500 });
  }
}

export const Route = createFileRoute('/api/submit-contact')({
  server: {
    handlers: {
      POST,
    },
  },
});
