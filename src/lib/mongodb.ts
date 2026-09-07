import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  minPoolSize: 0,
  serverSelectionTimeoutMS: 5_000,
  connectTimeoutMS: 10_000,
};

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env file');
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _mongoIndexesPromise: Promise<void> | undefined;
}

if (!global._mongoClientPromise) {
  global._mongoClientPromise = new MongoClient(uri, options).connect();
}

const clientPromise = global._mongoClientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  const db = client.db('kinetic-logistics');
  if (!global._mongoIndexesPromise) {
    global._mongoIndexesPromise = Promise.all([
      db.collection('contacts').createIndex({ createdAt: -1 }),
      db.collection('quotes').createIndex({ createdAt: -1 }),
    ]).then(() => undefined);
  }
  await global._mongoIndexesPromise;
  return db;
}

export default clientPromise;
