const mongoose = require('mongoose');
const { env } = require('./env');

let isConnecting = false;
let connectionAttempts = 0;
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (isConnecting) {
    return mongoose.connection;
  }

  isConnecting = true;

  try {
    const connection = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      autoIndex: true,
      maxPoolSize: 10,
      minPoolSize: 1,
    });

    connectionAttempts = 0;
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    connectionAttempts += 1;

    if (connectionAttempts <= MAX_RETRIES) {
      console.warn(
        `MongoDB connection failed. Retrying in ${RETRY_DELAY_MS / 1000}s... (${connectionAttempts}/${MAX_RETRIES})`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDB();
    }

    console.error('MongoDB connection failed after retries.', error);
    throw error;
  } finally {
    isConnecting = false;
  }
};

const registerConnectionEvents = () => {
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
  });

  mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
  });
};

const closeDB = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.connection.close();
  console.log('MongoDB connection closed');
};

const gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  await closeDB();
  process.exit(0);
};

module.exports = {
  connectDB,
  registerConnectionEvents,
  closeDB,
  gracefulShutdown,
};
