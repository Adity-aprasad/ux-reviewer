# UX Reviewer AI

An AI-powered UX analysis tool. Paste any public URL and get a detailed UX report with scores, issues, and before/after suggestions — powered by Claude.

## Project Structure

```
project/
├── frontend/     # React + Vite
└── backend/      # Node.js + Express
```

## Quick Start

### 1. Set up your API key

Create `backend/.env`:
```
GEMINI_API_KEY=sk-ant-...
```

### 2. Install & run the backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on http://localhost:3001

### 3. Install & run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173

## Features

- 🔍 **Analyze any URL** — scrapes and extracts meaningful page data
- 🤖 **Claude-powered** — deep UX analysis with specific, actionable issues
- 📊 **Score + report** — 0–100 score with categorized issues and before/after suggestions
- 📁 **History** — last 5 reviews stored locally
- ✅ **Status page** — health checks for all services
