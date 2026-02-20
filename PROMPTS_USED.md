# Prompts Used

## Main UX Analysis Prompt

Used in `backend/services/claude.js`:

```
You are a senior UX expert. Analyze this webpage and return a JSON UX report.

URL: {url}
Page Data:
- Title: {title}
- Meta Description: {metaDesc}
- H1s: {h1s}
- H2s: {h2s}
- Links: {links}, Images: {images}, Images without alt: {imagesWithoutAlt}
- Buttons: {buttons}, Forms: {forms}
- Has nav: {navPresent}, Has footer: {footerPresent}
- Body text sample: {bodyText}

Return ONLY valid JSON with this exact shape:
{
  "score": <0-100 integer>,
  "summary": "<2-3 sentence overall assessment>",
  "issues": [
    {
      "category": "<Accessibility|Navigation|Content|Visual Design|Performance|SEO>",
      "severity": "<high|medium|low>",
      "title": "<short issue title>",
      "description": "<clear explanation>",
      "proof": "<specific element or text from the page that proves this issue>",
      "before": "<example of current bad copy/element>",
      "after": "<improved version>"
    }
  ]
}

Find 5-10 real, specific issues. Be concrete and actionable.
```

## Prompt Design Notes

- **JSON-only output** — prevents Claude from adding prose that breaks `JSON.parse()`
- **Strict schema** — listing exact field names reduces hallucinated keys
- **"Be concrete and actionable"** — steers Claude away from vague generic UX advice
- **Body text sample** — gives Claude enough page context without hitting token limits