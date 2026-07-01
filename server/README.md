# ResumeIQ AI Backend

This backend is a production-ready Express.js starter for the ResumeIQ AI SaaS application.

## Structure

- src/app.js - Express app assembly and middleware registration.
- src/server.js - HTTP server bootstrap.
- src/config - Environment and configuration helpers.
- src/controllers - Request handlers for each route.
- src/services - Business logic layer.
- src/models - Data models and database schemas.
- src/routes - Versioned API routes.
- src/middleware - Custom middleware such as error handling and async wrappers.
- src/validators - Request validation logic.
- src/utils - Shared helpers and utility functions.
- src/tests - Automated smoke tests.

## Run locally

```bash
npm install
npm run dev
```

## Run with Docker Compose

```bash
docker compose up --build
```

## Health check

```bash
curl http://localhost:5000/api/v1/health
```
