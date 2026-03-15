const BASE_URL = 'http://localhost:8000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(err.detail || `HTTP ${res.status}`)
  }

  return res.json()
}

export const api = {
  getArticles: () => request('/articles'),
  getArticle: (id) => request(`/articles/${id}`),
  ask: (article_id, question) =>
    request('/ask', {
      method: 'POST',
      body: JSON.stringify({ article_id, question }),
    }),
}
