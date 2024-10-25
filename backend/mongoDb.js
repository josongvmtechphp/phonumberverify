/* eslint-disable no-undef */
/**
 * This file uses mongo db fucntionality
 */
import mongoose from 'mongoose';

/**
 * This is used for connecting database
 */
export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { authSource: 'admin' });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
