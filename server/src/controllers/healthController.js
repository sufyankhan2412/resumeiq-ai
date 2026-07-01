const { sendSuccess } = require('../utils/response');
const { env } = require('../config/env');

const getHealth = (req, res) => {
  const memoryUsage = process.memoryUsage();

  sendSuccess(
    res,
    {
      status: 'ok',
      service: 'ResumeIQ AI API',
      uptime: `${Math.floor(process.uptime())}s`,
      nodeVersion: process.version,
      memoryUsage: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
      },
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
    },
    'Service is healthy'
  );
};

module.exports = {
  getHealth,
};
