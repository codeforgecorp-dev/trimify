import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI in your .env.local file");
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI)
      .then((mongoose) => {
        
        return mongoose;
      })
      .catch((error) => {
        
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

global.mongoose = cached;

export default connectDB;
