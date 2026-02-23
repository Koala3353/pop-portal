import { Routes, Route, Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Home from './pages/Home'
import VerificationWorkspace from './pages/VerificationWorkspace'

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="nav-brand text-gradient">
            <ShieldCheck size={28} />
            <span>PayShield</span>
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://pop-mr3f5gr9i-keenes-projects-d1636aaf.vercel.app/docs#/" target="_blank" rel="noreferrer" className="btn btn-secondary">
              API Docs
            </a>
            <Link to="/workspace" className="btn btn-primary">
              Verify Payments
            </Link>
          </div>
        </div>
      </nav>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workspace" element={<VerificationWorkspace />} />
        </Routes>
      </main>
    </>
  )
}

export default App
