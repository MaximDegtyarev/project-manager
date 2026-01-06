import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export default function Navbar() {
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {user ? (
            <Link to="/projects" className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PM Helper
              </div>
            </Link>
          ) : (
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PM Helper
            </div>
          )}

          <div className="flex items-center gap-6">
            {user && (
              <>
                <Link 
                  to="/projects"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition"
                >
                  Проекты
                </Link>

                <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
                  <span className="text-gray-600 text-sm">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm"
                  >
                    Выход
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
