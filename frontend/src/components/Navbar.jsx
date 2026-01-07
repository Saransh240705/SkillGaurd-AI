import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-dark-surface border-b border-dark-border fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">&lt;/&gt;</span>
              </div>
              <span className="text-xl font-bold text-white">
                SkillBridge AI
              </span>
            </Link>
            {user && (
              <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
                {user.role === 'student' && (
                  <>
                    <Link
                      to="/tasks"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark-text-secondary hover:text-white border-b-2 border-transparent hover:border-primary-600 transition"
                    >
                      Marketplace
                    </Link>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark-text-secondary hover:text-white border-b-2 border-transparent hover:border-primary-600 transition"
                    >
                      My Tasks
                    </Link>
                    <Link
                      to="/verifications"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark-text-secondary hover:text-white border-b-2 border-transparent hover:border-primary-600 transition"
                    >
                      Verifications
                    </Link>
                  </>
                )}
                {user.role === 'provider' && (
                  <Link
                    to="/provider/dashboard"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark-text-secondary hover:text-white border-b-2 border-transparent hover:border-primary-600 transition"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === 'recruiter' && (
                  <>
                    <Link
                      to="/recruiter/dashboard"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark-text-secondary hover:text-white border-b-2 border-transparent hover:border-primary-600 transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/recruiter/search"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark-text-secondary hover:text-white border-b-2 border-transparent hover:border-primary-600 transition"
                    >
                      Candidates
                    </Link>
                    <Link
                      to="/recruiter/jobs"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-dark-text-secondary hover:text-white border-b-2 border-transparent hover:border-primary-600 transition"
                    >
                      Jobs
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-dark-text-secondary">
                  <span className="text-sm font-medium">{user.name?.split(' ')[0] || 'User'}</span>
                  <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded">Lvl 4</span>
                  <span className="text-xs">890 XP</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                  {user.name?.charAt(0) || 'U'}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-dark-text-secondary hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

