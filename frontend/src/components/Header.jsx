import { Link, useLocation } from 'react-router-dom'

export default function Header({ darkMode, setDarkMode }) {
  const location = useLocation()

  return (
    <header style={{ background: 'rgba(10,10,15,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
      className="sticky top-0 z-50 flex items-center justify-between px-8 h-16">
      
      <Link to="/" className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          <span className="text-white text-sm font-bold">K</span>
        </div>
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
          KnowledgeAI
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/"
          className="text-sm transition-all duration-200"
          style={{ color: location.pathname === '/' ? '#a78bfa' : '#6b7280' }}>
          Articles
        </Link>
        
      </div>
    </header>
  )
}
