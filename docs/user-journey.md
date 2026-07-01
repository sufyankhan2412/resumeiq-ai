# ResumeIQ AI User Journey

This user journey covers the experience from opening the website through downloading the AI report. It includes all major screens and backend interactions, represented with arrows.

## 1. Landing and Onboarding

1. User opens website
   - Browser → `Landing Page`
   - Display: product value, feature highlights, CTA buttons

2. User selects `Sign Up`
   - `Landing Page` → `Registration Page`
   - Display: email, password, name, terms
   - Backend: `POST /api/auth/register`
   - Response: create user, return user data + tokens

3. User receives welcome and is redirected to `Dashboard`
   - `Registration Page` → `Dashboard`
   - Backend: server validates token, initializes session

## 2. Login Flow

1. User selects `Log In`
   - `Landing Page` → `Login Page`
   - Display: email, password
   - Backend: `POST /api/auth/login`
   - Response: accessToken, refreshToken, user profile

2. Successful login redirects to `Dashboard`
   - `Login Page` → `Dashboard`
   - Backend: load dashboard summary and recent activity

3. If invalid credentials
   - `Login Page` shows error
   - Backend: `401 Unauthorized`

## 3. Dashboard Experience

1. Authenticated user lands on `Dashboard`
   - `Dashboard` loads
   - Backend: `GET /api/dashboard/summary`
   - Backend: `GET /api/dashboard/notifications`
   - Display: total resumes, pending/completed analyses, average score, recent resumes, recent analyses, notifications

2. User reviews summary metrics and selects next action
   - Possible actions:
     - `Upload Resume`
     - `View Resumes`
     - `Start Analysis`
     - `Open Profile`
     - `Open Settings`

## 4. Resume Upload

1. User clicks `Upload Resume`
   - `Dashboard` → `Resume Upload Page`
   - Display: drag/drop upload area, file picker, optional metadata

2. User chooses resume file
   - `Resume Upload Page` → upload form
   - Backend: `POST /api/resumes`
   - Response: resume record with status `uploaded`

3. After upload, system shows resume details and prompts analysis
   - `Resume Upload Page` → `Resume Detail Page`
   - Display: resume metadata, file name, upload date, analysis button

## 5. AI Analysis Request

1. User selects `Analyze Resume`
   - `Resume Detail Page` → `Analysis Request`
   - Backend: `POST /api/analysis`
   - Request body: { resumeId, analysisType }
   - Response: analysis job created with status `pending`

2. System schedules analysis and returns to analysis status
   - `Analysis Request` → `Analysis Status Page`
   - Backend: job queue or async worker processes analysis

3. User optionally checks analysis list
   - `Dashboard` or `Resume Detail Page` → `Analysis List`
   - Backend: `GET /api/analysis?resumeId={resumeId}`
   - Display: analysis entries, status, score preview

## 6. Analysis Processing and Notification

1. Backend performs AI analysis
   - Worker/AI service → process resume text and metadata
   - Save result to `ai_analyses` collection
   - Update resume record status if needed

2. Notify user of completion
   - Backend: create notification record
   - Display on UI: new notification badge or alert
   - Notification fetch: `GET /api/dashboard/notifications`

## 7. Viewing Analysis Results

1. User opens completed analysis
   - `Analysis List` → `Analysis Detail Page`
   - Backend: `GET /api/analysis/{analysisId}`
   - Display: score, summary, recommendations, issues, model version, raw insights

2. User reviews section-by-section AI feedback
   - `Analysis Detail Page` shows:
     - ATS compatibility score
     - keyword match quality
     - formatting and structure issues
     - resume strengths and weaknesses

## 8. Downloading the AI Report

1. User selects `Download Report`
   - `Analysis Detail Page` → `Download Report`
   - Backend: generate downloadable report from analysis data and resume metadata
   - Response: file download stream
   - Status: `200 OK`

2. Report saved locally
   - Browser downloads PDF/HTML report
   - UI shows confirmation or success message

## 9. Profile and Settings

1. User opens `Profile`
   - `Dashboard` → `Profile Page`
   - Backend: `GET /api/profile`
   - Display: personal info, profile details, activity summary

2. User updates profile
   - `Profile Page` → `PUT /api/profile`
   - Response: updated profile object

3. User opens `Settings`
   - `Dashboard` → `Settings Page`
   - Backend: `GET /api/settings`
   - Display: notification preferences, theme, session list

4. User updates settings
   - `Settings Page` → `PUT /api/settings`
   - Response: updated settings object

5. User manages active sessions
   - `Settings Page` → `GET /api/settings/sessions`
   - Backend: list active sessions
   - User revokes session: `DELETE /api/settings/sessions/{sessionId}`

## 10. Logout

1. User clicks `Log Out`
   - `Dashboard` or nav → `Logout` action
   - Backend: `POST /api/auth/logout`
   - Response: session revoked
   - Redirect to `Landing Page`

## Flow Diagram (Arrow Representation)

Landing Page -> Registration Page -> POST /api/auth/register -> Dashboard
Landing Page -> Login Page -> POST /api/auth/login -> Dashboard

Dashboard -> Resume Upload Page -> POST /api/resumes -> Resume Detail Page
Resume Detail Page -> POST /api/analysis -> Analysis Status Page
Analysis Status Page -> GET /api/analysis?resumeId={resumeId} -> Analysis List
Analysis List -> Analysis Detail Page -> GET /api/analysis/{analysisId}
Analysis Detail Page -> Download Report -> file download

Dashboard -> Profile Page -> GET /api/profile
Profile Page -> PUT /api/profile

Dashboard -> Settings Page -> GET /api/settings
Settings Page -> PUT /api/settings
Settings Page -> GET /api/settings/sessions -> DELETE /api/settings/sessions/{sessionId}

Dashboard -> POST /api/auth/logout -> Landing Page

## Notes
- The journey emphasizes authenticated flow, upload-to-analysis, and report download.
- Backend interactions are explicit for every key screen transition.
- Notification and status updates occur asynchronously as AI analysis completes.