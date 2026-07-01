const http = require('http');
const app = require('./app');
const { env } = require('./config/env');
const { connectDB, registerConnectionEvents, gracefulShutdown } = require('./config/database');

const server = http.createServer(app);

const startServer = async () => {
  registerConnectionEvents();

  try {
    await connectDB();

    server.listen(env.PORT, () => {
      console.log(`ResumeIQ AI server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to database connection error.', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  gracefulShutdown('SIGINT');
});

process.on('SIGTERM', () => {
  gracefulShutdown('SIGTERM');
});

startServer();
