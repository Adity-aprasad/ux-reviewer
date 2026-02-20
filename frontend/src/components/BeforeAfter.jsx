import './styles/BeforeAfter.css'

export default function BeforeAfter({ before, after }) {
  return (
    <div className="ba-container">
      <div className="ba-panel ba-before">
        <span className="ba-label">Before</span>
        <p>{before}</p>
      </div>
      <div className="ba-arrow">→</div>
      <div className="ba-panel ba-after">
        <span className="ba-label">After</span>
        <p>{after}</p>
      </div>
    </div>
  )
}