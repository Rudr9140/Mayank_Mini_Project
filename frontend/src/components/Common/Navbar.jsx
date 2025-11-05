import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Target } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-800">FutureYou</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                Dashboard
              </Link>
              <Link to="/goals" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                Goals
              </Link>
              <Link to="/analytics" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                Analytics
              </Link>
              <Link to="/messages" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                Future Messages
              </Link>
              <Link to="/calendar" className="text-gray-700 hover:text-primary-600 px-3 py-2">
                Calendar
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hi, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
