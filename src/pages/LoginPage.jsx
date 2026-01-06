import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import '../styles/auth.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuthStore()

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!email || !isValidEmail(email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (!password) {
      newErrors.password = 'Введите пароль'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await signIn(email, password)
      setSuccessMessage(`✓ Успешный вход! Email: ${email}`)
      setTimeout(() => {
        navigate('/projects')
      }, 2000)
    } catch (error) {
      setErrors({ submit: error.message })
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

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email адрес</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <div className="error-message show">{errors.password}</div>}
          </div>

          <button type="submit" className="button button-primary">
            Войти
          </button>
        </form>

        <div className="auth-footer">
          <p>Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
        </div>
      </div>
    </div>
  )
}
