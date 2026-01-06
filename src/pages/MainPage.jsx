import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Navbar from '../components/Navbar'

export default function MainPage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* NAVBAR с кнопкой выхода */}
      <Navbar />

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* ЗАГОЛОВОК СТРАНИЦЫ */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              PM Helper
            </h1>
            <p className="text-gray-600">
              Добро пожаловать, <span className="font-semibold text-indigo-600">{user?.email}</span>
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg">
            + Новый проект
          </button>
        </div>

        {/* НАВИГАЦИЯ МЕЖДУ РАЗДЕЛАМИ */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'projects'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 Проекты
          </button>
          <button
            onClick={() => setActiveTab('gantt')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'gantt'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📊 Гант-диаграммы
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'tasks'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ✅ Задачи
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'analytics'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📈 Аналитика
          </button>
        </div>

        {/* СОДЕРЖИМОЕ КАЖДОГО РАЗДЕЛА */}
        
        {/* 📋 ПРОЕКТЫ */}
        {activeTab === 'projects' && (
          <div>
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
        )}

        {/* 📊 ГАНТ-ДИАГРАММЫ */}
        {activeTab === 'gantt' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Гант-диаграммы
              </h3>
              <p className="text-gray-600 mb-6">
                Визуализируйте сроки и сроки ваших проектов
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition opacity-50 cursor-not-allowed" disabled>
                Скоро появится 🚀
              </button>
            </div>
          </div>
        )}

        {/* ✅ ЗАДАЧИ */}
        {activeTab === 'tasks' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Управление задачами
              </h3>
              <p className="text-gray-600 mb-6">
                Управляйте задачами и отслеживайте прогресс
              </p>
              <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition opacity-50 cursor-not-allowed" disabled>
                Скоро появится 🚀
              </button>
            </div>
          </div>
        )}

        {/* 📈 АНАЛИТИКА */}
        {activeTab === 'analytics' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Аналитика и отчеты
              </h3>
              <p className="text-gray-600 mb-6">
                Получайте insights по вашим проектам
              </p>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition opacity-50 cursor-not-allowed" disabled>
                Скоро появится 🚀
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
