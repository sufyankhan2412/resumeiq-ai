# ResumeIQ AI Backend Architecture

This document explains the structure and runtime behavior of the backend service for ResumeIQ AI.

## 1. Folder Structure

- src/app.js
  - Builds the Express application and registers middleware.
- src/server.js
  - Starts the HTTP server and handles startup and shutdown lifecycle events.
- src/config
  - Contains environment configuration and database connection setup.
- src/controllers
  - Holds request handlers for each route.
- src/services
  - Contains business logic that controllers delegate to.
- src/models
  - Stores database schemas and models when they are added.
- src/routes
  - Defines API routes and groups them by version.
- src/middleware
  - Contains reusable middleware such as error handling and async wrappers.
- src/validators
  - Holds request validation logic for incoming payloads.
- src/utils
  - Contains shared helpers such as response formatting, logger utilities, and custom errors.
- src/tests
  - Includes automated tests for the backend behavior.

## 2. Middleware Order

The Express app applies middleware in a production-friendly order:

1. Security and performance middleware
   - Helmet adds HTTP security headers.
   - Compression reduces response size.
   - Cookie parser reads browser cookies.

2. Logging and cross-origin support
   - Morgan logs incoming requests in development or production-friendly formats.
   - CORS enables controlled cross-origin access.

3. Request protection
   - Rate limiting prevents abuse and brute-force traffic.

4. Body parsing
   - JSON parser handles JSON request bodies.
   - URL-encoded parser handles form submissions.

5. Route handling
   - The root route returns a basic service status.
   - Versioned routes are mounted under /api/v1.

6. Error handling
   - A 404 middleware catches unmatched routes.
   - A global error handler returns consistent JSON responses.

## 3. Server Lifecycle

The backend startup flow is:

1. The Express app is created in src/app.js.
2. The server is created in src/server.js.
3. Database connection events are registered.
4. The application connects to MongoDB asynchronously.
5. The HTTP server starts listening on the configured port.
6. Graceful shutdown listens for SIGINT and SIGTERM signals.

This ensures the app can shut down safely and close database connections cleanly.

## 4. API Versioning

The API is versioned under the /api/v1 prefix.

Why this matters:
- It allows backward-compatible changes without breaking existing clients.
- It makes upgrade paths clearer for frontend and third-party consumers.
- It provides a stable contract for API evolution.

## 5. Environment Variables

The backend reads configuration from environment variables through src/config/env.js.

Common variables include:
- PORT: The port used by the server.
- NODE_ENV: The current runtime environment such as development or production.
- MONGODB_URI: MongoDB connection string.
- JWT_ACCESS_SECRET: Secret for access token signing.
- JWT_REFRESH_SECRET: Secret for refresh token signing.
- CLOUDINARY_*: Cloudinary storage configuration.
- OPENAI_API_KEY: API key for OpenAI services.
- FRONTEND_URL: Allowed frontend origin.
- COOKIE_SECRET: Secret used for cookie security.

Using environment variables keeps secrets out of source code and allows deployment-specific configuration.

## 6. Docker Setup

The backend includes a Dockerfile and docker-compose.yml for containerized deployment.

This setup provides:
- A consistent runtime across machines.
- Easy local development with MongoDB and Mongo Express.
- A simple deployment path for cloud environments.

The backend container exposes port 5000 and connects to MongoDB using Docker networking.

## 7. Logging

The backend uses a reusable logging module built around Morgan and custom helpers.

It supports:
- Request logging for incoming API traffic.
- Error logging for failures and exceptions.
- Development and production-friendly output formatting.

This approach keeps logging centralized and easy to expand toward structured logging tools later.

## 8. Health Check

The health endpoint is available at GET /api/v1/health.

It returns runtime information including:
- Status
- Uptime
- Node version
- Memory usage
- Environment
- Timestamp

This endpoint is useful for:
- Load balancers
- Container orchestration platforms
- Uptime monitoring
- Deployment verification
