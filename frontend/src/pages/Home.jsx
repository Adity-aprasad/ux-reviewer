import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Home.css'

const STEPS = [
  { id: 1, icon: '🔗', label: 'Fetching page' },
  { id: 2, icon: '🕷️', label: 'Scraping content' },
  { id: 3, icon: '🤖', label: 'AI analysis' },
  { id: 4, icon: '✅', label: 'Done!' },
]

const HOW_IT_WORKS = [
  { step: '01', icon: '🌐', title: 'Paste a URL', desc: 'Enter any public website URL you want to audit.' },
  { step: '02', icon: '🕷️', title: 'We scrape it', desc: 'Our engine fetches the page and extracts structure, content, and metadata.' },
  { step: '03', icon: '🤖', title: 'AI analyses it', desc: 'Claude reviews every element across 6 UX categories.' },
  { step: '04', icon: '📊', title: 'Get your report', desc: 'A scored report with specific issues and before/after fixes.' },
]

export default function Home() {
  const [url, setUrl] = useState('')
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const isAnalyzing = step > 0 && step < 4

  async function handleSubmit(e) {
    e.preventDefault()
    if (!url.trim()) return
    setError('')
    setStep(1)

    try {
      setStep(2)
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      setStep(3)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setStep(4)
      setTimeout(() => navigate(`/review/${data.id}`), 600)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setStep(0)
    }
  }

  return (
    <div className="home">
      <div className="home-orb home-orb-1" />
      <div className="home-orb home-orb-2" />

      {/* Product name */}
      <div className="home-product-name">UX Reviewer</div>

      {/* Heading + subheading */}
      <div className="home-hero">
        <h1 className="home-title">
          Audit any website's<br />
          <span className="home-title-accent">UX in seconds</span>
        </h1>
        <p className="home-sub">
          Paste a URL and get a detailed report with scores, issues,
          and before/after suggestions — powered by AI.
        </p>
      </div>

      {/* URL input */}
      <div className="home-card">
        <form className="url-form" onSubmit={handleSubmit}>
          <div className="url-input-wrap">
            <span className="url-prefix">🌐</span>
            <input
              className="url-input"
              type="url"
              placeholder="https://yourwebsite.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
              disabled={isAnalyzing}
              required
            />
          </div>
          <button className="url-btn" type="submit" disabled={isAnalyzing}>
            {isAnalyzing
              ? <><span className="btn-spinner" /> Analyzing...</>
              : <>Analyze →</>}
          </button>
        </form>

        {error && <p className="home-error">⚠ {error}</p>}

        {step > 0 && (
          <div className="steps">
            {STEPS.map((s, i) => {
              const state = step > s.id ? 'done' : step === s.id ? 'active' : 'idle'
              return (
                <div key={s.id} className="step-wrap">
                  <div className={`step ${state}`}>
                    <span className="step-icon">{state === 'done' ? '✓' : s.icon}</span>
                    <span className="step-label">{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`step-line ${step > s.id ? 'filled' : ''}`} />}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="hiw-section">
        <h2 className="hiw-title">How it works</h2>
        <div className="hiw-grid">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={item.step} className="hiw-card">
              <div className="hiw-top">
                <span className="hiw-step">{item.step}</span>
                <span className="hiw-icon">{item.icon}</span>
              </div>
              <h3 className="hiw-name">{item.title}</h3>
              <p className="hiw-desc">{item.desc}</p>
              {i < HOW_IT_WORKS.length - 1 && <div className="hiw-connector" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}