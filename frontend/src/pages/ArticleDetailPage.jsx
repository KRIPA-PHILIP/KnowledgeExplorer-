import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { api } from '../api/client'





export default function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [asking, setAsking] = useState(false)
  const [askError, setAskError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [showBackTop, setShowBackTop] = useState(false)
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    api.getArticle(Number(id))
      .then(setArticle)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatHistory, asking])

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  async function handleAsk(q) {
    const text = typeof q === 'string' ? q : question.trim()
    if (!text || asking) return
    setQuestion('')
    setAskError(null)
    setChatHistory(h => [...h, { role: 'user', content: text }])
    setAsking(true)
    try {
      const { answer } = await api.ask(Number(id), text)
      setChatHistory(h => [...h, { role: 'ai', content: answer }])
    } catch (e) {
      setAskError(e.message)
      setChatHistory(h => h.slice(0, -1))
    } finally {
      setAsking(false)
      inputRef.current?.focus()
    }
  }

  

  if (loading) return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <div className="h-4 w-32 rounded animate-pulse mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="h-10 w-96 rounded-xl animate-pulse mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="h-64 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.04)' }} />
    </div>
  )

  if (error) return (
    <div className="max-w-6xl mx-auto px-8 py-12">
      <button onClick={() => navigate('/')} className="text-sm mb-6 block" style={{ color: '#6b7280' }}>← Back</button>
      <div className="text-center py-20" style={{ color: '#6b7280' }}>⚠ {error}</div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-8 py-12">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8" style={{ color: '#6b7280' }}>
        <button onClick={() => navigate('/')} className="transition-colors hover:text-white">
          ← Home
        </button>
        <span style={{ color: '#374151' }}>/</span>
        <span className="truncate max-w-xs text-white">{article.title}</span>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

        {/* Article */}
        <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3 mb-6">
            {article.tag && (
              <span className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#a78bfa' }}>
                {article.tag}
              </span>
            )}
           
          </div>

          <h1 className="mb-6 pb-6" style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            borderBottom: '1px solid rgba(255,255,255,0.07)'
          }}>
            {article.title}
          </h1>

          <div className="space-y-5">
            {article.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm leading-8" style={{ color: '#9ca3af' }}>{para}</p>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        <div className="rounded-2xl flex flex-col sticky top-20"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', maxHeight: '85vh' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <span className="text-xs">✦</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Assistant</p>
                <p className="text-xs" style={{ color: '#6b7280' }}>Article context only</p>
              </div>
            </div>
            
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {chatHistory.length === 0 && !asking && (
              <div className="flex flex-col gap-3 mt-2">
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <span className="text-lg">✦</span>
                  </div>
                  <p className="text-sm font-medium text-white mb-1">Ask anything</p>
                  <p className="text-xs" style={{ color: '#6b7280' }}>About "{article.title}"</p>
                </div>
               
              </div>
            )}

            {chatHistory.map((msg, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: msg.role === 'user' ? '#a78bfa' : '#6b7280' }}>
                    {msg.role === 'user' ? 'You' : 'AI'}
                  </span>
                  
                </div>
                {msg.role === 'user' ? (
                  <div className="px-3 py-2.5 rounded-xl text-sm leading-relaxed text-white"
                    style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    {msg.content}
                  </div>
                ) : (
                  <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none"
                    style={{ color: '#d1d5db' }}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}

          

            {askError && (
              <div className="text-xs px-3 py-2 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171' }}>
                ⚠ {askError}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={e => { e.preventDefault(); handleAsk(question) }}
            className="flex gap-2 p-4 shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <input
              ref={inputRef}
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              disabled={asking}
              placeholder="Ask about this article…"
              className="flex-1 px-3 py-2.5 rounded-xl text-sm text-white outline-none transition-all disabled:opacity-50"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'Inter' }}
              onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
           
          </form>
        </div>
      </div>

      {/* Back to top */}
      {showBackTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xl"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          ↑
        </button>
      )}
    </div>
  )
}
