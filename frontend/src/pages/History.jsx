import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API_URL from '../config.js'
import './styles/History.css'

export default function History() {
  const [history, setHistory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
   fetch(`${API_URL}/api/history`)
      .then(r => r.json())
      .then(setHistory)
      .catch(() => setHistory([]))
  }, [])

  if (!history.length) return <p style={{ color: '#888' }}>No reviews yet. Go analyze a URL!</p>

  return (
    <div>
      <h2 className="history-title">Recent Reviews</h2>
      <div className="history-list">
        {history.map(r => (
          <div key={r.id} className="history-card" onClick={() => navigate(`/review/${r.id}`)}>
            <div className="history-score" style={{ color: r.score >= 70 ? '#22c55e' : r.score >= 40 ? '#f59e0b' : '#f87171' }}>
              {r.score}
            </div>
            <div className="history-info">
              <p className="history-url">{r.url}</p>
              <p className="history-date">{new Date(r.date).toLocaleString()}</p>
            </div>
            <span className="history-arrow">→</span>
          </div>
        ))}
      </div>
    </div>
  )
}