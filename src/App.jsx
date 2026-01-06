import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  const { checkAuth, loading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  // 🚀 Показываем loading пока проверяется авторизация
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* 🔓 PUBLIC ROUTES - для неавторизованных */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔐 PROTECTED ROUTES - для авторизованных */}
        <Route 
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } 
        />

        {/* 🏠 DEFAULT ROUTES */}
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="*" element={<Navigate to="/main" replace />} />
      </Routes>
    </Router>
  )
}

export default App
