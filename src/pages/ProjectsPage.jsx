import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export default function ProjectsPage() {
  const { user } = useAuthStore()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    // Заглушка для MVP
    setProjects([])
  }, [user?.id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Проекты
            </h1>
            <p className="text-gray-600">
              Всего проектов: <span className="font-semibold text-indigo-600">{projects.length}</span>
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg">
            + Новый проект
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Нет проектов
          </h3>
          <p className="text-gray-600 mb-6">
            Создайте первый проект, чтобы начать управление
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
            Создать проект
          </button>
        </div>
      </div>
    </div>
  )
}
