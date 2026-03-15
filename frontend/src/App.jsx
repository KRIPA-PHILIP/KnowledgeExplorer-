import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ArticleListPage from './pages/ArticleListPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import Header from './components/Header'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
  <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0f', color: 'white', width: '100%' }}>
  <Header darkMode={darkMode} setDarkMode={setDarkMode} />
  <main style={{ width: '100%' }}>
    <Routes>
      <Route index element={<ArticleListPage />} />
      <Route path="articles/:id" element={<ArticleDetailPage />} />
    </Routes>
  </main>
</div>
  )
}