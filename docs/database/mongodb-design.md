# ResumeIQ AI MongoDB Design

## Collections

### 1. users
- _id: ObjectId
- email: String
- passwordHash: String
- name: String
- role: String
- status: String
- createdAt: Date
- updatedAt: Date
- profile: Object
  - title: String
  - company: String
  - location: String
  - phone: String
  - website: String
- preferences: Object
  - theme: String
  - notifications: Object
    - email: Boolean
    - inApp: Boolean

#### Indexes
- email: unique
- role: non-unique
- status: non-unique
- createdAt: non-unique

#### Relationships
- One-to-many with `resumes` via `resumes.userId`
- One-to-many with `notifications` via `notifications.userId`
- One-to-many with `ai_analyses` via `ai_analyses.userId`

---

### 2. resumes
- _id: ObjectId
- userId: ObjectId
- filename: String
- fileType: String
- fileSize: Number
- source: String
- status: String
- uploadDate: Date
- lastViewedAt: Date
- metadata: Object
  - pageCount: Number
  - wordCount: Number
  - educationSections: Array
  - experienceSections: Array
- storageLocation: String

#### Indexes
- userId: non-unique
- status: non-unique
- uploadDate: non-unique
- lastViewedAt: non-unique

#### Relationships
- Many-to-one with `users` via `userId`
- One-to-many with `ai_analyses` via `ai_analyses.resumeId`

---

### 3. ai_analyses
- _id: ObjectId
- resumeId: ObjectId
- userId: ObjectId
- analysisType: String
- score: Number
- summary: String
- recommendations: Array
- issues: Array
- createdAt: Date
- updatedAt: Date
- modelVersion: String
- status: String
- rawOutput: Object

#### Indexes
- resumeId: non-unique
- userId: non-unique
- analysisType: non-unique
- createdAt: non-unique
- status: non-unique

#### Relationships
- Many-to-one with `resumes` via `resumeId`
- Many-to-one with `users` via `userId`

---

### 4. auth_sessions
- _id: ObjectId
- userId: ObjectId
- refreshToken: String
- deviceInfo: Object
- ipAddress: String
- createdAt: Date
- expiresAt: Date
- revokedAt: Date
- status: String

#### Indexes
- userId: non-unique
- refreshToken: unique
- expiresAt: non-unique
- status: non-unique

#### Relationships
- Many-to-one with `users` via `userId`

---

### 5. notifications
- _id: ObjectId
- userId: ObjectId
- type: String
- title: String
- message: String
- channel: String
- status: String
- createdAt: Date
- readAt: Date
- metadata: Object

#### Indexes
- userId: non-unique
- status: non-unique
- createdAt: non-unique

#### Relationships
- Many-to-one with `users` via `userId`

---

## Notes
- Use `ObjectId` references to support join-like application queries.
- Favor sparse and compound indexes for query patterns on active users, resumes, and analysis history.
- Keep large AI payloads in `rawOutput` only when needed; archive or externalize oversized data.
- Keep collection names singular or plural consistently. This design uses plural collection naming for clarity.