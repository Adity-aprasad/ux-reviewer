import './styles/CategoryGroup.css'

const CATEGORY_META = {
  Accessibility:   { icon: '♿', color: '#f87171', bg: 'rgba(248,113,113,0.08)' },
  Navigation:      { icon: '🧭', color: '#fb923c', bg: 'rgba(251,146,60,0.08)' },
  Content:         { icon: '📝', color: '#facc15', bg: 'rgba(250,204,21,0.08)' },
  'Visual Design': { icon: '🎨', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
  Performance:     { icon: '⚡', color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
  SEO:             { icon: '🔍', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)' },
}

function scoreColor(s) {
  if (s >= 75) return '#34d399'
  if (s >= 50) return '#facc15'
  return '#f87171'
}

function categoryScore(issues) {
  const penalty = issues.reduce((acc, i) =>
    acc + (i.severity === 'high' ? 25 : i.severity === 'medium' ? 12 : 5), 0)
  return Math.max(0, 100 - penalty)
}

function ScoreRing({ score }) {
  const size = 58, stroke = 5
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

export default function CategoryGroup({ category, issues, onCardClick }) {
  const meta = CATEGORY_META[category] || { icon: '📊', color: '#aaa', bg: 'rgba(170,170,170,0.08)' }
  const catScore = categoryScore(issues)
  const highCount = issues.filter(i => i.severity === 'high').length

  return (
    <div className="metric-card"
      style={{ '--accent': meta.color, '--accent-bg': meta.bg }}
      onClick={() => onCardClick({ category, issues, meta, catScore })}>
      <div className="metric-card-top">
        <span className="metric-icon">{meta.icon}</span>
        <div className="metric-ring-wrap">
          <ScoreRing score={catScore} />
          <span className="metric-ring-score" style={{ color: scoreColor(catScore) }}>{catScore}</span>
        </div>
      </div>
      <h3 className="metric-name">{category}</h3>
      <p className="metric-count">{issues.length} issue{issues.length !== 1 ? 's' : ''}</p>
      {highCount > 0 && <span className="metric-high-badge">⚠ {highCount} critical</span>}
      <div className="metric-bar-track">
        <div className="metric-bar-fill" style={{ width: `${catScore}%`, background: `linear-gradient(90deg, ${scoreColor(catScore)}, ${scoreColor(catScore)}aa)` }} />
      </div>
      <span className="metric-cta">View details →</span>
    </div>
  )
}