import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          
          {/* Пустой левый блок */}
          <div className="flex-1"></div>

          {/* PM Helper в центре */}
          <div className="text-2xl font-bold text-gray-900">
            PM Helper
          </div>

          {/* Email и кнопка Выход справа */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <span className="text-sm font-medium text-gray-700">
              {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-white-600 text-black text-sm font-medium rounded-lg hover:bg-red-200 transition-colors duration-300"
            >
              Выход
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
