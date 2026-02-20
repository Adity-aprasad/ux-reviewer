import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function analyzeWithClaude(url, pageData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' })

  const prompt = `You are a senior UX expert. Analyze this webpage and return a JSON UX report.

URL: ${url}
Page Data:
- Title: ${pageData.title}
- Meta Description: ${pageData.metaDesc}
- H1s: ${JSON.stringify(pageData.h1s)}
- H2s: ${JSON.stringify(pageData.h2s)}
- Links: ${pageData.links}, Images: ${pageData.images}, Images without alt: ${pageData.imagesWithoutAlt}
- Buttons: ${pageData.buttons}, Forms: ${pageData.forms}
- Has nav: ${pageData.navPresent}, Has footer: ${pageData.footerPresent}
- Body text sample: ${pageData.bodyText}

Return ONLY valid JSON with this exact shape, no markdown, no backticks:
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

Find 5-10 real, specific issues. Be concrete and actionable.`

  const result = await model.generateContent(prompt)
  const text = result.response.text().trim()
  const json = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
  return JSON.parse(json)
}