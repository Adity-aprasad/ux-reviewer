import { useEffect, useState } from 'react'
import StatusBadge from '../components/StatusBadge.jsx'
import API_URL from '../config.js'
import './styles/Status.css'

export default function Status() {
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/api/status`)
      .then(r => r.json())
      .then(setStatus)
      .catch(() => setStatus({ services: [], error: true }))
  }, [])

  return (
    <div>
      <h2 className="status-title">System Status</h2>
      {!status ? (
        <p style={{ color: '#888' }}>Checking services...</p>
      ) : (
        <div className="status-list">
          {status.services?.map(s => (
            <div key={s.name} className="status-row">
              <StatusBadge ok={s.ok} />
              <span className="status-name">{s.name}</span>
              <span className="status-msg">{s.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}