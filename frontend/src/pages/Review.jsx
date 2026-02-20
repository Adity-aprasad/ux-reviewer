import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ScoreCard from '../components/ScoreCard.jsx'
import CategoryGroup from '../components/CategoryGroup.jsx'
import IssueModal from '../components/Modal.jsx'
import API_URL from '../config.js'
import './styles/Review.css'

export default function Review() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [review, setReview] = useState(null)
  const [error, setError] = useState('')
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
     fetch(`${API_URL}/api/history/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject('Not found'))
      .then(setReview)
      .catch(() => setError('Review not found.'))
  }, [id])

  if (error) return <p className="review-error">{error}</p>
  if (!review) return (
    <div className="review-loading">
      <div className="review-spinner" />
      <p>Loading report...</p>
    </div>
  )

  const grouped = review.issues?.reduce((acc, issue) => {
    acc[issue.category] = acc[issue.category] || []
    acc[issue.category].push(issue)
    return acc
  }, {}) || {}

  return (
    <div className="review-root">
      <button className="review-back" onClick={() => navigate(-1)}>← Back</button>

      <ScoreCard
        score={review.score}
        url={review.url}
        date={review.date}
        issues={review.issues || []}
      />

      <p className="review-summary">{review.summary}</p>

      <h2 className="review-grid-title">
        Category Breakdown <span>— click any card for details</span>
      </h2>

      <div className="review-grid">
        {Object.entries(grouped).map(([category, issues]) => (
          <CategoryGroup
            key={category}
            category={category}
            issues={issues}
            onCardClick={setActiveModal}
          />
        ))}
      </div>

      {activeModal && (
        <IssueModal {...activeModal} onClose={() => setActiveModal(null)} />
      )}
    </div>
  )
}