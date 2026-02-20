import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Review from './pages/Review.jsx'
import History from './pages/History.jsx'
import Status from './pages/Status.jsx'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <span className="nav-brand">🔍 UX Reviewer</span>
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            🏠 Home
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            🕐 History
          </NavLink>
          <NavLink to="/status" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            ◉ Status
          </NavLink>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/history" element={<History />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}