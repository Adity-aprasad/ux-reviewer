import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  const services = []

  // Check Gemini API key
  services.push({
    name: 'Gemini API',
    ok: !!process.env.GEMINI_API_KEY,
    message: process.env.GEMINI_API_KEY ? 'API key configured' : 'Missing GEMINI_API_KEY',
  })

  // Check network (simple check)
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    await fetch('https://www.google.com', { signal: controller.signal, method: 'HEAD' })
    clearTimeout(timeout)
    services.push({ name: 'Network', ok: true, message: 'Reachable' })
  } catch {
    services.push({ name: 'Network', ok: false, message: 'Unreachable' })
  }


  services.push({ name: 'Backend Server', ok: true, message: `Running on port ${process.env.PORT || 3001}` })

  res.json({ services })
})

export default router