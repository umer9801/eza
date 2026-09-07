import { ObjectId } from 'mongodb';

// Contact Form Schema
export interface ContactSubmission {
  _id?: ObjectId;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  enquiryType: string;
  message: string;
  consent: boolean;
  createdAt: Date;
  status: 'new' | 'in-progress' | 'resolved';
}

// Quote Form Schema
export interface QuoteSubmission {
  _id?: ObjectId;
  // Personal Details
  name: string;
  email: string;
  phone: string;
  company?: string;
  
  // Shipment Details
  collectionPostcode: string;
  deliveryPostcode: string;
  shipmentSize: string;
  serviceSpeed: string;
  weightKg: number;
  numberOfItems: number;
  additionalHandling: string[];
  
  // Quote Details
  estimatedCost?: number;
  quoteBreakdown?: {
    base: number;
    mileage: number;
    speedUplift: number;
    weightSurcharge: number;
    packageUplift: number;
    handlingFee: number;
    fuel: number;
    subtotal: number;
    vat: number;
    total: number;
    eta?: string;
    distance?: number;
  };
  
  // Additional Info
  specialInstructions?: string;
  preferredCollectionDate?: string;
  preferredCollectionTime?: string;
  
  createdAt: Date;
  status: 'pending' | 'quoted' | 'approved' | 'completed' | 'cancelled';
}

// Admin User Schema
export interface AdminUser {
  _id?: ObjectId;
  username: string;
  passwordHash: string;
  email: string;
  role: 'admin' | 'superadmin';
  createdAt: Date;
  lastLogin?: Date;
}

// Collection Names
export const COLLECTIONS = {
  CONTACTS: 'contacts',
  QUOTES: 'quotes',
  ADMINS: 'admins',
} as const;
