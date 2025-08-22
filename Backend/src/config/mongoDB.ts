import mongoose from 'mongoose'
import 'dotenv/config'

const mongoURI = process.env.MONGO_URI || ''
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const response = await mongoose.connect(mongoURI, {
      dbName: 'AiImageGenerator',
      serverSelectionTimeoutMS: 30000,
      maxPoolSize: 10,
      retryWrites: true,
      retryReads: true,
    });
    isConnected = true;
    console.log(`Database connected to ${response.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

export default connectDB