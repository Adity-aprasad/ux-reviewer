import { readFile, writeFile } from 'fs/promises'
import { randomUUID } from 'crypto'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const FILE = join(__dirname, '../storage/reviews.json')

async function load() {
  try {
    const data = await readFile(FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function save(reviews) {
  await writeFile(FILE, JSON.stringify(reviews, null, 2))
}

export async function saveReview(data) {
  const reviews = await load()
  const review = { id: randomUUID(), date: new Date().toISOString(), ...data }
  reviews.unshift(review)
  // Keep only last 50
  await save(reviews.slice(0, 50))
  return review
}

export async function getHistory() {
  const reviews = await load()
  return reviews.slice(0, 5).map(({ id, url, score, date }) => ({ id, url, score, date }))
}

export async function getReview(id) {
  const reviews = await load()
  return reviews.find(r => r.id === id) || null
}