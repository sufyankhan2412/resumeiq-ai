# ResumeIQ AI Dashboard Design

## Style Summary
- Minimal and professional
- Glassmorphism layering with soft blur and translucency
- Dark mode first with high-contrast text and subtle accent colors
- Tailwind CSS utility-based layout approach
- Focus on clarity, hierarchy, and fast decision-making

## Layout Overview
- Left sidebar for global navigation
- Top bar for quick actions, profile, and notifications
- Main content area divided into cards and charts
- Responsive grid with consistent spacing and glass panels

---

## Sidebar
- Fixed vertical navigation on the left
- Height: full viewport
- Background: translucent dark panel with blurred backdrop
- Logo and product name at the top
- Primary links:
  - Dashboard
  - Resumes
  - AI Analysis
  - Reports
  - Settings
- Secondary links at bottom:
  - Help
  - Logout
- Active state: soft neon accent underline or filled pill
- Hover state: subtle glow and elevated glass effect

### Sidebar Details
- Minimal icon + label pairs
- Collapsible on smaller screens
- Section separators with faint dividing lines

---

## Top Bar
- Horizontal bar across top of main content
- Left: page title and breadcrumb or status chip
- Center: optional search / quick action pill
- Right: notifications icon, profile dropdown, and settings shortcut
- Use glassmorphism with a slight gradient and border
- Notification badge: bright accent dot on icon

### Profile Dropdown
- Triggered from avatar or name button
- Panel content:
  - User name and role
  - View profile
  - Account settings
  - Session management
  - Logout
- Visual style: floating card with soft shadow and blurred backdrop

---

## Dashboard Header
- Main dashboard title: `ResumeIQ AI`
- Subtitle: quick summary of current account usage or active plan
- Action buttons:
  - Upload Resume
  - New Analysis
  - View All Resumes
- Buttons use accent color with glass hover states

---

## Upload Resume Card
- Positioned top-left in main grid
- Card type: primary action card
- Content:
  - Title: `Upload Resume`
  - Description: `Add a new resume to receive ATS analysis and scoring.`
  - Upload CTA button
  - Secondary quick stats: accepted formats, max file size
- Visual treatment: bold accent header, translucent background, dashed inset upload zone or icon
- Interaction: hover elevation, button glow

---

## ATS Score Card
- Key performance indicator card
- Prominent placement near top center
- Content:
  - Title: `ATS Compatibility Score`
  - Numeric score gauge (e.g. `82/100`)
  - Trend summary: `Up 6% from last upload`
  - Quick bullet indicators: readability, keywords, formatting
- Visual style: radial progress or progress bar on glass panel
- Accent color based on score band: green/yellow/red

---

## Recent Analyses Section
- Card or panel listing latest AI analysis results
- Columns:
  - Resume name
  - Analysis type
  - Score
  - Status
  - Completed date
  - Action button: `View report`
- Include filter chips for `All`, `Completed`, `Pending`, `Failed`
- Row highlight for highest-priority items
- Use compact glass rows and subtle dividers

---

## Charts Section
- Display 2-3 chart cards in a row
- Suggested charts:
  - Resume uploads over time
  - Analysis completion trend
  - Average ATS score by resume type
- Use minimalist axes, soft glows, and gradient area fills
- Each panel includes a small summary and legend
- Chart backgrounds: transparent glass with faint border

### Chart Variants
- Line chart for trend data
- Bar chart for counts by category
- Donut / radial chart for score distribution

---

## Additional Dashboard Cards
- Quick stats row with small KPI cards:
  - Total resumes uploaded
  - Pending analyses
  - Active alerts
  - Monthly active users (for admin view)
- Recent notification panel with short messages and timestamps
- Shortcut card for `Review latest report` or `Start a new analysis`

---

## Visual Details
- Typography: clean sans-serif, generous line-height
- Colors: dark background, soft white text, cyan/purple/neon accents
- Borders: subtle translucent borders with `backdrop-blur`
- Shadows: gentle, diffused glow to lift cards
- Spacing: consistent padding and margin using Tailwind spacing scale

## Accessibility
- Ensure strong contrast for text and action buttons
- Use clearly labeled icons and accessible button targets
- Support keyboard navigation through sidebar and dropdowns

---

## Responsive Behavior
- Sidebar collapses to icon-only on tablet screens
- Top bar and cards stack vertically on small screens
- Chart cards resize gracefully and become full width on mobile
- Upload card remains prominent and actionable across breakpoints

## Summary
ResumeIQ AI dashboard should feel polished, modern, and focused. It balances actionable UI elements like upload and score cards with analytical overviews from recent analyses and charts. Glassmorphism and dark mode provide a premium SaaS look while keeping the interface clean and usable.