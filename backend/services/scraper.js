import * as cheerio from 'cheerio'

export async function scrape(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UXReviewer/1.0)' },
    timeout: 10000,
  })

  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)

  const html = await res.text()
  const $ = cheerio.load(html)

  // Extract meaningful content
  const title = $('title').text().trim()
  const metaDesc = $('meta[name="description"]').attr('content') || ''
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get()
  const h2s = $('h2').map((_, el) => $(el).text().trim()).get().slice(0, 8)
  const links = $('a[href]').length
  const images = $('img').length
  const imagesWithoutAlt = $('img:not([alt]), img[alt=""]').length
  const buttons = $('button, [role="button"], input[type="submit"]').length
  const forms = $('form').length
  const navPresent = $('nav, [role="navigation"]').length > 0
  const footerPresent = $('footer').length > 0

  // Text content (trimmed)
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 3000)

  return {
    title,
    metaDesc,
    h1s,
    h2s,
    links,
    images,
    imagesWithoutAlt,
    buttons,
    forms,
    navPresent,
    footerPresent,
    bodyText,
  }
}