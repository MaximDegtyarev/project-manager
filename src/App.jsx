import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/useAuthStore'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AboutPage from './pages/AboutPage'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const { checkAuth } = useAuthStore()

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Публичные роуты */}
        <Route path="/" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Защищённые роуты (потом добавим /projects) */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <div className="p-8">
                <h1 className="text-3xl font-bold">Скоро здесь будут проекты...</h1>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Неизвестные роуты */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
