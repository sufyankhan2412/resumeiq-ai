# ResumeIQ AI

## Project Overview
ResumeIQ AI is a production-ready SaaS platform for resume optimization and ATS analysis. Users can upload resumes, receive AI-powered scoring and feedback, and download polished reports to improve job application performance.

## Features
- Secure user authentication and session management
- Resume upload and metadata extraction
- AI-driven ATS compatibility scoring
- Detailed analysis reports with recommendations
- Dashboard with summary metrics and trends
- Profile and account settings management
- Notification system for analysis completion
- Docker-ready deployment and GitHub Actions CI/CD support

## Architecture
ResumeIQ AI uses a feature-based architecture with a separated frontend and backend. The backend exposes REST APIs for authentication, resume management, AI analysis, dashboard insights, and user settings. The frontend communicates with these APIs to deliver a modern user experience.

## Tech Stack
- React (JavaScript)
- Express.js
- Node.js
- MongoDB
- Docker
- Nginx
- GitHub Actions
- Tailwind CSS (design spec)

## Folder Structure
```text
resumeiq-ai/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── config/
│   │   └── routes/
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── server/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── features/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── jobs/
│   │   └── tests/
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── shared/
│   └── schemas/
├── docker/
│   ├── nginx/
│   │   └── conf.d/
│   ├── mongo/
│   └── docker-compose.yml
├── nginx/
│   └── conf/
├── docs/
│   ├── api/
│   ├── architecture/
│   ├── database/
│   ├── security/
│   ├── ui/
│   └── user-journey.md
├── .github/
│   └── workflows/
├── scripts/
├── logs/
├── README.md
└── LICENSE
```

## Installation
1. Clone the repository:
   ```bash
git clone https://github.com/your-org/resumeiq-ai.git
cd resumeiq-ai
```
2. Install dependencies for both services:
   ```bash
cd client && npm install
cd ../server && npm install
```
3. Create `.env` files from `.env.example` in both `client/` and `server/`.
4. Start the backend and frontend locally.

## Environment Variables
The application uses environment variables for secrets and configuration. Key variables include:
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `NODE_ENV`
- `PORT`
- `CLIENT_URL`
- `AWS_S3_BUCKET` (optional)
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` (optional)

## Docker
The repo includes Docker support for local development and production deployment.

### Run with Docker Compose
```bash
docker compose up --build
```

### Containers
- `client` — React frontend
- `server` — Express API
- `mongo` — MongoDB database
- `nginx` — Reverse proxy for frontend/backend routing

## API
The backend exposes REST endpoints for authentication, resume upload, AI analysis, dashboard data, profile, and settings.

Key endpoints include:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/resumes`
- `GET /api/resumes`
- `POST /api/analysis`
- `GET /api/dashboard/summary`
- `GET /api/profile`
- `PUT /api/settings`

For full API details, see `docs/api/rest-api-design.md`.

## Screenshots Placeholder
_Insert dashboard, resume upload, analysis, and profile screens here._

## Roadmap
- Build authentication, resume upload, and analysis workflow
- Add dashboard analytics and notifications
- Implement profile and settings management
- Harden security and follow deployment best practices
- Add premium features such as advanced reports and AI recommendations

## Future Improvements
- Premium multi-resume upload and batch analysis
- Custom resume templates and job-specific optimization
- ATS integrations with third-party platforms
- Team accounts and collaboration features
- Advanced analytics and benchmarking reports
- Mobile-friendly and accessible UI

## License
This project is licensed under the [MIT License](LICENSE).

## Contributing
Contributions are welcome. Please open issues for bugs or feature requests, and submit pull requests for improvements. Follow coding standards, add tests for new functionality, and update documentation as needed.
