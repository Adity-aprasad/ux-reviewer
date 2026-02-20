import BeforeAfter from './BeforeAfter.jsx'
import './styles/IssueCard.css'

const SEVERITY_COLOR = { high: '#f87171', medium: '#f59e0b', low: '#60a5fa' }

export default function IssueCard({ issue }) {
  return (
    <div className="issue-card">
      <div className="issue-header">
        <span className="issue-severity" style={{ color: SEVERITY_COLOR[issue.severity] || '#aaa' }}>
          {issue.severity?.toUpperCase()}
        </span>
        <h4 className="issue-title">{issue.title}</h4>
      </div>
      <p className="issue-desc">{issue.description}</p>
      {issue.proof && <p className="issue-proof">📍 {issue.proof}</p>}
      {issue.before && issue.after && (
        <BeforeAfter before={issue.before} after={issue.after} />
      )}
    </div>
  )
}