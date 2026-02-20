import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import analyzeRouter from './routes/analyze.js'
import historyRouter from './routes/history.js'
import statusRouter from './routes/status.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/analyze', analyzeRouter)
app.use('/api/history', historyRouter)
app.use('/api/status', statusRouter)

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`)
})