import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import Navbar from '../components/Navbar'

export default function MainPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white pt-16 flex">
      {/* NAVBAR */}
      <Navbar />

      {/* LEFT SIDEBAR */}
      <div className="w-72 bg-gray-50 border-r border-gray-200 p-6 fixed left-0 top-16 bottom-0 overflow-y-auto">
        
        {/* Navigation */}
        <nav className="space-y-2">
          <button
            onClick={() => navigate('/projects')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-200 transition font-medium text-gray-900 flex items-center gap-3"
          >
            <span className="text-xl">📋</span>
            <span>Проекты</span>
          </button>

          <button
            onClick={() => navigate('/resources')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-200 transition font-medium text-gray-900 flex items-center gap-3"
          >
            <span className="text-xl">👥</span>
            <span>Ресурсы</span>
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-72 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-600">Добро пожаловать</h1>
        </div>
      </div>
    </div>
  )
}
