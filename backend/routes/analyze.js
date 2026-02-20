import { Router } from 'express'
import { scrape } from '../services/scraper.js'
import { analyzeWithClaude } from '../services/gemini.js'
import { saveReview } from '../services/storage.js'

const router = Router()

router.post('/', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'URL is required' })

  try {
    const pageData = await scrape(url)
    const result = await analyzeWithClaude(url, pageData)
    const review = await saveReview({ url, ...result })
    res.json(review)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || 'Analysis failed' })
  }
})

export default router