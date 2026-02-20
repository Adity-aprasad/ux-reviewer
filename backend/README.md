# UX Reviewer — Backend

The backend is a Node.js + Express REST API that accepts a URL, scrapes the page, sends the extracted data to the Gemini AI API, and returns a structured UX report. Reviews are persisted to a local JSON file.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Node.js | v20+ | Runtime |
| Express | 4.19 | HTTP server and routing |
| Cheerio | 1.0 | HTML parsing and content extraction |
| @google/generative-ai | latest | Gemini API SDK |
| dotenv | latest | Environment variable loading |
| uuid | 10.0 | Unique review IDs |
| cors | 2.8 | Cross-origin request handling |

---

## Project Structure

```
backend/
├── index.js                # Entry point, Express setup
├── routes/
│   ├── analyze.js          # POST /api/analyze — main analysis route
│   ├── history.js          # GET /api/history — list + fetch reviews
│   └── status.js           # GET /api/status — health checks
├── services/
│   ├── scraper.js          # Fetches URL and extracts page data with Cheerio
│   ├── claude.js           # Sends data to Gemini and parses the response
│   └── storage.js          # Read/write reviews to reviews.json
├── storage/
│   └── reviews.json        # File-based persistence (up to 50 reviews)
├── .env                    # Environment variables (not committed)
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v20+
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### 1. Install dependencies
```bash
npm install
```

### 2. Create your `.env` file
```bash
touch .env
```

Add the following:
```
GEMINI_API_KEY=your-gemini-api-key-here
PORT=3001
```

### 3. Start the server
```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

Server runs on **http://localhost:3001**

---

## API Endpoints

### `POST /api/analyze`
Scrapes the given URL and returns a full UX report.

**Request body:**
```json
{ "url": "https://example.com" }
```

**Response:**
```json
{
  "id": "uuid",
  "url": "https://example.com",
  "date": "2026-02-21T00:00:00.000Z",
  "score": 72,
  "summary": "Overall assessment...",
  "issues": [
    {
      "category": "Accessibility",
      "severity": "high",
      "title": "Missing alt text",
      "description": "...",
      "proof": "...",
      "before": "...",
      "after": "..."
    }
  ]
}
```

---

### `GET /api/history`
Returns the last 5 reviews (id, url, score, date only).

---

### `GET /api/history/:id`
Returns the full review object for a given ID.

---

### `GET /api/status`
Returns health status of all services.

**Response:**
```json
{
  "services": [
    { "name": "Gemini API", "ok": true, "message": "API key configured" },
    { "name": "Network",    "ok": true, "message": "Reachable" },
    { "name": "Backend Server", "ok": true, "message": "Running on port 3001" }
  ]
}
```

---

## How the Analysis Works

1. **Scraper** (`services/scraper.js`) — fetches the URL using the native `fetch` API and parses the HTML with Cheerio, extracting: page title, meta description, headings, link/image/button counts, alt text coverage, nav/footer presence, and a 3000-char body text sample.

2. **Gemini** (`services/claude.js`) — sends the extracted data to `gemini-2.0-flash` with a structured prompt that asks for a JSON UX report with a score, summary, and categorised issues with before/after suggestions.

3. **Storage** (`services/storage.js`) — saves the report to `storage/reviews.json`, keeping the last 50 entries.

---

## Notes

- Uses Node.js built-in `fetch` — no `node-fetch` needed (requires Node v18+, recommend v20+)
- Storage is file-based and not suitable for multi-instance deployments — swap for a database if scaling