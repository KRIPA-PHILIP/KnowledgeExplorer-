import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'




const tagColors = {
  'Football':  { bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.2)',  text: '#4ade80' },
  'Basketball':{ bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)', text: '#fb923c' },
  'Running':   { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)', text: '#60a5fa' },
  'Tennis':    { bg: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.2)',  text: '#facc15' },
  'Olympics':  { bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)', text: '#c084fc' },
  'Cricket':   { bg: 'rgba(20,184,166,0.1)', border: 'rgba(20,184,166,0.2)', text: '#2dd4bf' },
}

export default function ArticleListPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.getArticles()
      .then(setArticles)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="max-w-6xl mx-auto px-2 py-16" style={{ width: '100%' }}>
      <div className="h-10 w-56 rounded-xl animate-pulse mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="h-5 w-80 rounded-lg animate-pulse mb-12" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-56 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
        ))}
      </div>
    </div>
  )

  if (error) return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <span className="text-2xl">⚠</span>
      </div>
      <p className="text-white font-medium mb-1">Failed to load articles</p>
      <p className="text-sm" style={{ color: '#6b7280' }}>{error}</p>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-20 py-24" style={{ width: '100%' }}>

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#a78bfa' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          AI-Powered Knowledge Base
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05 }}
          className="mb-4">
          Explore Sports<br />
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Knowledge
          </span>
        </h1>
        <p className="text-base mb-8 max-w-lg" style={{ color: '#9ca3af', lineHeight: 1.7 }}>
          Browse articles and ask our AI assistant any question. Get instant answers based purely on the article content.
        </p>

        
      </div>

    
      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-medium text-white mb-1">No results found</p>
          <p className="text-sm" style={{ color: '#6b7280' }}>Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, i) => {
            const colors = tagColors[article.tag] || { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', text: '#a78bfa' }
            return (
              <div key={article.id}
                className="group rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div className="flex items-center justify-between">
                  {article.tag && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}>
                      {article.tag}
                    </span>
                  )}
                 
                </div>

                <div>
                  <h2 className="font-semibold text-white leading-snug mb-2"
                    style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem' }}>
                    {article.title}
                  </h2>
                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: '#9ca3af' }}>
                    {article.content.slice(0, 120)}…
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/articles/${article.id}`)}
                  className="mt-auto flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.15)', color: '#a78bfa' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.1)'}
                >
                  <span>Read Article</span>
                  <span>→</span>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
