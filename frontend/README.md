# UX Reviewer — Frontend

The frontend is a React + Vite single-page application that lets users submit a URL, view a full UX report, browse past reviews, and check service health.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| Vite | 5.4 | Dev server and bundler |
| React Router DOM | 6.26 | Client-side routing |

---

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── pages/
│   │   ├── Home.jsx         # URL input, how it works, progress steps
│   │   ├── Review.jsx       # Full UX report with category grid
│   │   ├── History.jsx      # Last 5 reviews
│   │   └── Status.jsx       # Service health checks
│   ├── components/
│   │   ├── ScoreCard.jsx    # Animated score ring + severity pills
│   │   ├── CategoryGroup.jsx# Metric card with hover elevation
│   │   ├── IssueModal.jsx   # Blur backdrop popup with issue details
│   │   ├── IssueCard.jsx    # Single issue display
│   │   ├── BeforeAfter.jsx  # Side-by-side suggestion view
│   │   └── StatusBadge.jsx  # Green/red health indicator
│   ├── App.jsx              # Router + sticky navbar
│   ├── App.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v20+
- Backend server running on port `3001`

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

Runs on **http://localhost:5173**

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## API Proxy

The Vite dev server proxies all `/api/*` requests to the backend at `http://localhost:3001`, configured in `vite.config.js`:

```js
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
  }
}
```

This means no CORS issues during development — the frontend and backend appear to be on the same origin.

---

## Pages

**Home** `/`
Submit any public URL for analysis. Shows a 4-step progress indicator while the backend scrapes and analyses the page.

**Review** `/review/:id`
Displays the full UX report — an animated score ring, severity pill summary, and a grid of category cards. Clicking any card opens a modal with all issues, evidence, and before/after suggestions.

**History** `/history`
Lists the last 5 reviewed URLs with scores and timestamps. Click any row to re-open its report.

**Status** `/status`
Shows live health status for the Gemini API key and backend server.