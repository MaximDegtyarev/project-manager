import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import '../styles/auth.css'


export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signUp, user, loading: appLoading, checkAuth } = useAuthStore()

  // 🔑 Если уже авторизован → редирект на /main
  useEffect(() => {
    if (!appLoading && user) {
      navigate('/main', { replace: true })
    }
  }, [user, appLoading, navigate])

  // 🚀 Показываем loading пока проверяется авторизация
  if (appLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // 🛑 Если авторизован - ничего не показываем
  if (user) {
    return null
  }

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!fullName || fullName.length < 2) {
      newErrors.fullName = 'Введите корректное имя'
    }

    if (!email || !isValidEmail(email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (!password || password.length < 8) {
      newErrors.password = 'Пароль минимум 8 символов'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await signUp(email, password, fullName)
      await checkAuth()
      setSuccessMessage(`✓ Аккаунт создан! Добро пожаловать, ${fullName}!`)
      
      setFullName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setErrors({})
      
      setTimeout(() => {
        navigate('/main')
      }, 2000)
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({
        submit: error.message || 'Ошибка при регистрации. Попробуйте еще раз.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">📋</div>
          <h1 className="auth-title">PM Helper</h1>
          <p className="auth-subtitle">Управляй проектами эффективнее с современным инструментом</p>
        </div>

        {successMessage && (
          <div className="success-message show">
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="error-message show" style={{ display: 'block', marginBottom: '16px' }}>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Полное имя</label>
            <input
              type="text"
              id="fullName"
              placeholder="Иван Петров"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              required
            />
            {errors.fullName && <div className="error-message show">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email адрес</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            {errors.email && <div className="error-message show">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Минимум 8 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <div className="error-message show">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердить пароль</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && <div className="error-message show">{errors.confirmPassword}</div>}
          </div>

          <button 
            type="submit" 
            className="button button-primary"
            disabled={loading}
          >
            {loading ? 'Создание аккаунта...' : 'Создать аккаунт'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Уже есть аккаунт? <a href="/login">Войти</a></p>
        </div>
      </div>
    </div>
  )
}