const morgan = require('morgan');
const { env } = require('../config/env');

const isDevelopment = env.NODE_ENV !== 'production';

const requestLogger = morgan(isDevelopment ? 'dev' : 'combined');

const logInfo = (message, meta = {}) => {
  if (isDevelopment) {
    console.info('[INFO]', message, meta);
  } else {
    console.info('[INFO]', message, JSON.stringify(meta));
  }
};

const logError = (message, error = null, meta = {}) => {
  const payload = {
    message,
    error: error ? error.message : null,
    ...meta,
  };

  if (isDevelopment) {
    console.error('[ERROR]', payload);
  } else {
    console.error('[ERROR]', JSON.stringify(payload));
  }
};

const logRequestStart = (req) => {
  logInfo('Incoming request', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
};

const logRequestEnd = (req, res, durationMs) => {
  logInfo('Request completed', {
    method: req.method,
    url: req.originalUrl,
    statusCode: res.statusCode,
    durationMs,
  });
};

module.exports = {
  requestLogger,
  logInfo,
  logError,
  logRequestStart,
  logRequestEnd,
};
