import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const studentNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/tasks', label: 'Tasks', icon: '📋', badge: null },
    { path: '/certifications', label: 'Certifications', icon: '🏆' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
  ];

  const providerNavItems = [
    { path: '/provider/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/provider/tasks', label: 'My Tasks', icon: '📋' },
  ];

  const recruiterNavItems = [
    { path: '/recruiter/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/recruiter/search', label: 'Candidates', icon: '👥' },
    { path: '/recruiter/jobs', label: 'Jobs', icon: '💼' },
    { path: '/recruiter/assessments', label: 'Assessments', icon: '📝' },
  ];

  const navItems =
    user?.role === 'student'
      ? studentNavItems
      : user?.role === 'provider'
      ? providerNavItems
      : recruiterNavItems;

  return (
    <div className="w-64 bg-dark-surface border-r border-dark-border h-screen fixed left-0 top-0 pt-16 flex flex-col">
      {/* User Profile Section */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="text-white font-medium">{user?.name}</div>
            <div className="text-xs text-dark-text-secondary uppercase">
              {user?.role === 'student' ? 'Student Ed.' : user?.role === 'provider' ? 'Provider' : 'Recruiter'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-primary-600 text-white'
                : 'text-dark-text-secondary hover:bg-dark-card hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-dark-border">
        <Link
          to="/settings"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-dark-text-secondary hover:bg-dark-card hover:text-white transition-colors"
        >
          <span className="text-xl">⚙️</span>
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

