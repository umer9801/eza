import { json } from '@tanstack/react-start';
import { createFileRoute } from '@tanstack/react-router';
import { getDatabase } from '@/lib/mongodb';
import { ContactSubmission, COLLECTIONS } from '@/lib/models';
import { contactSchema } from '@/lib/form-validation';
import { guardSubmission } from '@/lib/request-guard';
import { sendContactEmails } from '@/lib/email';

export async function POST({ request }: { request: Request }) {
  const blocked = guardSubmission(request, 'contact');
  if (blocked) return blocked;

  try {
    const data = await request.json();
    console.log('Contact form data received:', data);
    
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      console.error('Contact form validation error:', parsed.error.errors);
      return json({ 
        error: 'Invalid form data', 
        details: parsed.error.errors 
      }, { status: 400 });
    }
    
    const { name, email, enquiryType, message, consent, phone, company } = parsed.data;

    const contactSubmission: ContactSubmission = {
      name,
      email,
      phone: phone || "",
      company: company || "",
      enquiryType,
      message,
      consent,
      createdAt: new Date(),
      status: 'new',
    };

    const db = await getDatabase();
    const result = await db.collection(COLLECTIONS.CONTACTS).insertOne(contactSubmission);

    // Send emails (non-blocking)
    sendContactEmails(contactSubmission).catch((error) => {
      console.error('Failed to send contact emails:', error);
    });

    return json({
      success: true,
      message: 'Contact form submitted successfully',
      id: result.insertedId.toString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Contact submission error:', error);
    return json({ 
      error: 'Failed to submit contact form',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export const Route = createFileRoute('/api/submit-contact')({
  server: {
    handlers: {
      POST,
    },
  },
});
