# ResumeIQ AI REST API Design

## Summary
This API design follows REST best practices for the ResumeIQ AI backend. It covers authentication, resume upload, AI analysis, dashboard, profile, and settings.

---

## Authentication

### POST /api/auth/register
- Description: Register a new user account.
- Authentication Required: No
- Request Body: { email, password, name }
- Response: { user: { id, email, name, role, status }, createdAt }
- Status Codes: 201, 400, 409, 422

### POST /api/auth/login
- Description: Authenticate the user and issue access and refresh tokens.
- Authentication Required: No
- Request Body: { email, password }
- Response: { accessToken, refreshToken, user: { id, email, name, role } }
- Status Codes: 200, 400, 401, 422

### POST /api/auth/refresh
- Description: Exchange a valid refresh token for a new access token.
- Authentication Required: No
- Request Body: { refreshToken }
- Response: { accessToken, refreshToken }
- Status Codes: 200, 400, 401, 410

### POST /api/auth/logout
- Description: Revoke the current refresh session.
- Authentication Required: Yes
- Response: { message: "Logged out successfully" }
- Status Codes: 200, 401, 403

### POST /api/auth/password-reset/request
- Description: Initiate password reset flow by sending a reset link or code.
- Authentication Required: No
- Request Body: { email }
- Response: { message: "Password reset requested" }
- Status Codes: 200, 400, 404

### POST /api/auth/password-reset/confirm
- Description: Complete password reset with token and new password.
- Authentication Required: No
- Request Body: { token, newPassword }
- Response: { message: "Password updated" }
- Status Codes: 200, 400, 401, 422

---

## Resume Upload

### POST /api/resumes
- Description: Upload a new resume file for analysis.
- Authentication Required: Yes
- Request Body: multipart/form-data with file and optional metadata
- Response: { resume: { id, userId, filename, fileType, status, uploadDate } }
- Status Codes: 201, 400, 401, 415, 422

### GET /api/resumes
- Description: List uploaded resumes for the authenticated user.
- Authentication Required: Yes
- Query Parameters: page, limit, status, sort
- Response: { resumes: [ { id, filename, fileType, status, uploadDate, lastViewedAt } ], pagination }
- Status Codes: 200, 401

### GET /api/resumes/{resumeId}
- Description: Retrieve resume metadata and analysis summary.
- Authentication Required: Yes
- Response: { resume: { id, userId, filename, status, uploadDate, metadata, storageLocation } }
- Status Codes: 200, 401, 403, 404

### DELETE /api/resumes/{resumeId}
- Description: Delete a resume and associated analysis records.
- Authentication Required: Yes
- Response: { message: "Resume deleted" }
- Status Codes: 200, 401, 403, 404

### GET /api/resumes/{resumeId}/download
- Description: Download the original resume file.
- Authentication Required: Yes
- Response: file stream
- Status Codes: 200, 401, 403, 404

---

## AI Analysis

### POST /api/analysis
- Description: Request AI analysis for a resume.
- Authentication Required: Yes
- Request Body: { resumeId, analysisType }
- Response: { analysis: { id, resumeId, userId, analysisType, status, createdAt } }
- Status Codes: 202, 400, 401, 403, 404, 422

### GET /api/analysis
- Description: List AI analysis results for the authenticated user.
- Authentication Required: Yes
- Query Parameters: resumeId, analysisType, status, page, limit, sort
- Response: { analyses: [ { id, resumeId, score, status, createdAt } ], pagination }
- Status Codes: 200, 401

### GET /api/analysis/{analysisId}
- Description: Retrieve detailed AI analysis results for a specific record.
- Authentication Required: Yes
- Response: { analysis: { id, resumeId, userId, score, summary, recommendations, issues, rawOutput, status, modelVersion, createdAt } }
- Status Codes: 200, 401, 403, 404

### GET /api/resumes/{resumeId}/analysis
- Description: List all analysis entries for a resume.
- Authentication Required: Yes
- Response: { analysis: [ ... ] }
- Status Codes: 200, 401, 403, 404

---

## Dashboard

### GET /api/dashboard/summary
- Description: Get user dashboard metrics and recent activity.
- Authentication Required: Yes
- Response: { summary: { totalResumes, pendingAnalyses, completedAnalyses, averageScore }, recentResumes, recentAnalyses }
- Status Codes: 200, 401

### GET /api/dashboard/trends
- Description: Get historical dashboard data for charts and trends.
- Authentication Required: Yes
- Query Parameters: range, type
- Response: { trends: [ { date, resumesUploaded, analysesCompleted, averageScore } ] }
- Status Codes: 200, 401

### GET /api/dashboard/notifications
- Description: Fetch dashboard notification list for the user.
- Authentication Required: Yes
- Response: { notifications: [ { id, type, title, message, channel, status, createdAt, readAt } ] }
- Status Codes: 200, 401

---

## Profile

### GET /api/profile
- Description: Retrieve the authenticated user profile.
- Authentication Required: Yes
- Response: { profile: { id, email, name, role, status, createdAt, updatedAt, profile, preferences } }
- Status Codes: 200, 401

### PUT /api/profile
- Description: Update profile details such as name, title, company, location, and contact info.
- Authentication Required: Yes
- Request Body: { name, profile: { title, company, location, phone, website } }
- Response: { profile: { ... } }
- Status Codes: 200, 400, 401, 422

### PUT /api/profile/password
- Description: Change the authenticated user's password.
- Authentication Required: Yes
- Request Body: { currentPassword, newPassword }
- Response: { message: "Password updated" }
- Status Codes: 200, 400, 401, 403, 422

---

## Settings

### GET /api/settings
- Description: Retrieve user-specific application settings.
- Authentication Required: Yes
- Response: { settings: { notifications: { email, inApp }, theme } }
- Status Codes: 200, 401

### PUT /api/settings
- Description: Update user-specific application settings.
- Authentication Required: Yes
- Request Body: { notifications: { email, inApp }, theme }
- Response: { settings: { ... } }
- Status Codes: 200, 400, 401, 422

### GET /api/settings/sessions
- Description: List active authentication sessions for the user.
- Authentication Required: Yes
- Response: { sessions: [ { id, deviceInfo, ipAddress, createdAt, expiresAt, status } ] }
- Status Codes: 200, 401

### DELETE /api/settings/sessions/{sessionId}
- Description: Revoke a specific active session.
- Authentication Required: Yes
- Response: { message: "Session revoked" }
- Status Codes: 200, 401, 403, 404

---

## Notes
- All protected routes require a valid bearer token.
- Use standard HTTP verbs and resource-oriented endpoints.
- Return appropriate HTTP status codes for validation, authorization, and resource errors.
- Ensure paginated list endpoints support `page`, `limit`, and sorting query parameters.
- Keep request and response payloads minimal and consistent.
