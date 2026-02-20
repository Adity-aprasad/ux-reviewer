import { useEffect } from 'react'
import './styles/IssueModal.css'

const SEVERITY_COLOR = { high: '#f87171', medium: '#f59e0b', low: '#60a5fa' }

function scoreColor(s) {
  if (s >= 75) return '#34d399'
  if (s >= 50) return '#facc15'
  return '#f87171'
}

export default function IssueModal({ category, issues, meta, catScore, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>

        <div className="modal-header" style={{ borderBottomColor: meta.color + '44' }}>
          <div className="modal-title-row">
            <span className="modal-icon">{meta.icon}</span>
            <div style={{ flex: 1 }}>
              <h2 className="modal-category" style={{ color: meta.color }}>{category}</h2>
              <p className="modal-subtitle">{issues.length} issue{issues.length !== 1 ? 's' : ''} detected</p>
            </div>
            <div className="modal-score-wrap">
              <span className="modal-score-num" style={{ color: scoreColor(catScore) }}>{catScore}</span>
              <span className="modal-score-label">/100</span>
            </div>
          </div>
        </div>

        <div className="modal-issues">
          {issues.map((issue, i) => (
            <div key={i} className="modal-issue-card" style={{ borderLeftColor: SEVERITY_COLOR[issue.severity] || '#555' }}>
              <div className="modal-issue-top">
                <span className="modal-severity" style={{ color: SEVERITY_COLOR[issue.severity], background: `${SEVERITY_COLOR[issue.severity]}18` }}>
                  {issue.severity?.toUpperCase()}
                </span>
                <h3 className="modal-issue-title">{issue.title}</h3>
              </div>
              <p className="modal-issue-desc">{issue.description}</p>
              {issue.proof && (
                <div className="modal-proof">
                  <span className="modal-proof-label">📍 Evidence</span>
                  <span className="modal-proof-text">{issue.proof}</span>
                </div>
              )}
              {issue.before && issue.after && (
                <div className="modal-ba">
                  <div className="modal-ba-col modal-before">
                    <span className="modal-ba-tag">Before</span>
                    <p>{issue.before}</p>
                  </div>
                  <div className="modal-ba-arrow">→</div>
                  <div className="modal-ba-col modal-after">
                    <span className="modal-ba-tag">After</span>
                    <p>{issue.after}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="modal-close" onClick={onClose}>✕ Close</button>
        </div>

      </div>
    </div>
  )
}