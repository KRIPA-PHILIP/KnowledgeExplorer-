import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-10">
      <p className="text-8xl font-light text-zinc-700 mb-4">404</p>
      <h1 className="text-2xl font-medium text-white mb-2">Page Not Found</h1>
      <p className="text-zinc-400 text-sm mb-8">The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold rounded transition-colors"
      >
        Back to Articles
      </button>
    </div>
  )
}