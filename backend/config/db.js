const mongoose = require('mongoose');

// Serverless (Vercel): cache the connection so a new one is not created on every request
let cached = global._mongoose || (global._mongoose = { conn: null, promise: null });

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
