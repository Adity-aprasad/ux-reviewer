# AI Notes

## How Claude is used

The backend calls Claude (claude-opus-4-6) via the Anthropic SDK in `backend/services/claude.js`.

### Prompt strategy
- Sends structured page data extracted by the scraper (title, headings, image counts, etc.)
- Asks Claude to return **strict JSON only** — no markdown fences, no preamble
- The JSON schema is enforced in the prompt itself

### Output shape
```json
{
  "score": 72,
  "summary": "...",
  "issues": [
    {
      "category": "Accessibility",
      "severity": "high",
      "title": "...",
      "description": "...",
      "proof": "...",
      "before": "...",
      "after": "..."
    }
  ]
}
```

## Model
`claude-opus-4-6` — used for deep reasoning and detailed UX analysis.

## Gotchas
- JSON parsing strips markdown code fences if Claude wraps output
- Long pages are truncated to 3000 chars of body text to stay within token limits