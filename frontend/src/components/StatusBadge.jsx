import './styles/StatusBadge.css'

export default function StatusBadge({ ok }) {
  return (
    <span className={`status-badge ${ok ? 'ok' : 'fail'}`}>
      {ok ? '●' : '●'}
    </span>
  )
}