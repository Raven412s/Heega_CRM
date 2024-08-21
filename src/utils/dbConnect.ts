// utils/dbConnect.ts
import mongoose from 'mongoose';

interface Global {
  mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

declare global {
  var mongoose: Global['mongoose'];
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    cached.promise = mongoose.connect(MONGODB_URI) as unknown as Promise<mongoose.Connection>;
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
