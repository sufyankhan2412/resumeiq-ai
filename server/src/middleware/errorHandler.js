const { env } = require('../config/env');
const { logError } = require('../utils/logger');

const normalizeError = (err) => {
  if (err?.name === 'ValidationError' || err?.name === 'CastError') {
    return {
      statusCode: 400,
      message: 'Validation failed',
      details: err.message,
    };
  }

  if (err?.code === 11000 || err?.code === 11001) {
    return {
      statusCode: 409,
      message: 'Resource already exists',
      details: 'A resource with the same unique field already exists.',
    };
  }

  if (err?.name === 'MongoServerError' || err?.name === 'MongoError') {
    return {
      statusCode: 502,
      message: 'Database operation failed',
      details: err.message,
    };
  }

  if (err?.statusCode === 404 || err?.name === 'NotFoundError') {
    return {
      statusCode: 404,
      message: 'Resource not found',
      details: err.message,
    };
  }

  if (err?.isOperational || err?.statusCode) {
    return {
      statusCode: err.statusCode || 500,
      message: err.message || 'Operation failed',
      details: err.details || null,
    };
  }

  return {
    statusCode: 500,
    message: 'Internal server error',
    details: null,
  };
};

const errorHandler = (err, req, res, _next) => {
  const normalized = normalizeError(err);

  logError('Unhandled error', err, {
    method: req.method,
    url: req.originalUrl,
    statusCode: normalized.statusCode,
  });

  const response = {
    success: false,
    message: normalized.message,
  };

  if (normalized.details) {
    response.details = normalized.details;
  }

  if (env.NODE_ENV === 'development' && err?.stack) {
    response.stack = err.stack;
  }

  res.status(normalized.statusCode).json(response);
};

module.exports = errorHandler;
