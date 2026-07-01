const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const { env } = require('./config/env');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');
const { requestLogger, logRequestStart, logRequestEnd } = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(requestLogger);
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const start = Date.now();
  logRequestStart(req);

  res.on('finish', () => {
    logRequestEnd(req, res, Date.now() - start);
  });

  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ResumeIQ AI API is running',
  });
});

app.use('/api/v1', healthRoutes);

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;
