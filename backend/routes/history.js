import { Router } from 'express'
import { getHistory, getReview } from '../services/storage.js'

const router = Router()


router.get('/', async (req, res) => {
  const history = await getHistory()
  res.json(history)
})


router.get('/:id', async (req, res) => {
  const review = await getReview(req.params.id)
  if (!review) return res.status(404).json({ error: 'Not found' })
  res.json(review)
})

export default router