import { Pool } from 'pg';
import mongoose from 'mongoose';

// PostgreSQL Connection
export const pgPool = new Pool({
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
  database: process.env.POSTGRES_DB ?? 'enterprise_platform',
  user: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'Prateek@1234',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// MongoDB Connection
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/enterprise_platform'
    );
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Test PostgreSQL connection
pgPool.on('connect', () => {
  console.log('✓ PostgreSQL connected');
});

pgPool.on('error', (err: Error) => {
  console.error('PostgreSQL error:', err);
});