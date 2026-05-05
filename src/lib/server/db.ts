import { MongoClient, Db, Collection } from 'mongodb';
import type { User } from './types.js';

const uri = process.env.MONGO_URI || 'mongodb+srv://funayd:matkhaulah2o@nzq.x84qs.mongodb.net/?appName=nzq';
const dbName = process.env.MONGO_DB || 'nzq';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

export async function getUsersCollection(): Promise<Collection<User>> {
  const database = await getDb();
  return database.collection<User>('users');
}
