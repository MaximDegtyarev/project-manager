import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'

export default function Navbar() {
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PM
            </div>
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-6">
            <Link
              to="/projects"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Проекты
            </Link>

            {user && (
              <div className="flex items-center gap-4">
                <span className="text-gray-700 text-sm">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Выход
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
