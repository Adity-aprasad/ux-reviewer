import './styles/ScoreCard.css'

function scoreColor(s) {
  if (s >= 75) return '#34d399'
  if (s >= 50) return '#facc15'
  return '#f87171'
}

function ScoreRing({ score }) {
  const size = 148, stroke = 11
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const fill = (score / 100) * circ
  const color = scoreColor(score)
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)' }} />
    </svg>
  )
}

export default function ScoreCard({ score, url, date, issues = [] }) {
  const highCount  = issues.filter(i => i.severity === 'high').length
  const medCount   = issues.filter(i => i.severity === 'medium').length
  const lowCount   = issues.filter(i => i.severity === 'low').length
  const totalCount = issues.length

  return (
    <div className="score-card">
      <div className="score-ring-wrap">
        <ScoreRing score={score} />
        <div className="score-ring-inner">
          <span className="score-num" style={{ color: scoreColor(score) }}>{score}</span>
          <span className="score-tag">UX Score</span>
        </div>
      </div>
      <div className="score-meta">
        <h1 className="score-url">{url}</h1>
        <p className="score-date">{new Date(date).toLocaleString()}</p>
        <div className="score-pills">
          <span className="pill pill-high">🔴 {highCount} High</span>
          <span className="pill pill-med">🟡 {medCount} Medium</span>
          <span className="pill pill-low">🔵 {lowCount} Low</span>
          <span className="pill pill-total">📊 {totalCount} Total</span>
        </div>
      </div>
    </div>
  )
}