import { z } from "zod";

const postcode = z
  .string()
  .trim()
  .min(1, "Postcode is required")
  .max(10);

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().default(""),
  company: z.string().trim().max(150).optional().default(""),
  enquiryType: z.enum([
    "General enquiry",
    "Quote request",
    "Account setup",
    "Existing booking",
    "Complaint or feedback",
    "Partnership enquiry",
  ]),
  message: z.string().trim().min(5).max(5_000),
  consent: z.literal(true),
});

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  phone: z.string().trim().min(5, "Phone number must be at least 5 characters").max(40),
  company: z.string().trim().max(150).optional().default(""),
  collectionPostcode: postcode,
  deliveryPostcode: postcode,
  shipmentSize: z.enum(["small", "medium", "large", "pallet", "freight", "multi"]),
  serviceSpeed: z.enum(["same-day", "next-day", "scheduled", "international"]),
  weightKg: z.coerce.number().finite().positive().max(26_000),
  numberOfItems: z.coerce.number().int().positive().max(1_000),
  additionalHandling: z.array(z.enum(["tail-lift", "fragile", "temperature", "two-person"])).max(10).default([]),
  specialInstructions: z.string().trim().max(5_000).optional().default(""),
  preferredCollectionDate: z.string().max(30).optional().default(""),
  preferredCollectionTime: z.string().max(30).optional().default(""),
});