import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/api';
import toast from 'react-hot-toast';

// Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const TasksIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const CertIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Mock task data matching the design
const mockTasks = [
  {
    id: '1',
    company: 'CLOUDSYSTEMS INC.',
    companyIcon: '💻',
    postedAgo: '2h ago',
    difficulty: 'HARD',
    title: 'High-Performance API Rate Limiter',
    description: 'Design and implement a distributed rate limiter for a high-traffic public A...',
    tags: ['Backend', 'Redis', 'Node.js'],
    estimatedHours: 12,
    reward: 450.00,
  },
  {
    id: '2',
    company: 'PIXELCRAFT',
    companyIcon: '🎨',
    postedAgo: '5h ago',
    difficulty: 'MEDIUM',
    title: 'Mobile App UI Redesign',
    description: 'Revamp the user interface for our fintech mobile application focusing o...',
    tags: ['Figma', 'UI/UX', 'Mobile'],
    estimatedHours: 8,
    reward: 300.00,
  },
  {
    id: '3',
    company: 'STREAMLINE',
    companyIcon: '📺',
    postedAgo: '1d ago',
    difficulty: 'EASY',
    title: 'Social Media Teaser Clip',
    description: 'Edit a 30-second promotional teaser from provided raw footage for an...',
    tags: ['Premiere', 'Social'],
    estimatedHours: 3,
    reward: 120.00,
  },
  {
    id: '4',
    company: 'DEVCORP',
    companyIcon: '🖥️',
    postedAgo: '1d ago',
    difficulty: 'MEDIUM',
    title: 'Python Data Processing Script',
    description: 'Write a script to clean and normalize a large JSON dataset containing user...',
    tags: ['Python', 'Pandas', 'Data'],
    estimatedHours: 5,
    reward: 200.00,
  },
  {
    id: '5',
    company: 'SECURENET',
    companyIcon: '🔒',
    postedAgo: '3h ago',
    difficulty: 'HARD',
    title: 'OAuth2 Implementation',
    description: 'Implement secure OAuth2 authentication flow for a React Nativ...',
    tags: ['React Native', 'Auth'],
    estimatedHours: 16,
    reward: 650.00,
  },
  {
    id: '6',
    company: 'BRANDNEW',
    companyIcon: '✏️',
    postedAgo: '6h ago',
    difficulty: 'EASY',
    title: 'Icon Set Illustration',
    description: 'Create a consistent set of 20 SVG icons for a new dashboard product,...',
    tags: ['Illustrator', 'Vector'],
    estimatedHours: 4,
    reward: 180.00,
  },
];

const TaskMarketplace = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks({});
      setTasks(data.length > 0 ? data : mockTasks);
    } catch (error) {
      // Use mock data if API fails
      setTasks(mockTasks);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty?.toUpperCase()) {
      case 'HARD':
        return 'bg-red-500 text-white';
      case 'MEDIUM':
        return 'bg-yellow-500 text-black';
      case 'EASY':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard', badge: null },
    { name: 'Tasks', icon: TasksIcon, path: '/tasks', badge: 2 },
    { name: 'Certifications', icon: CertIcon, path: '/certifications', badge: null },
    { name: 'Analytics', icon: AnalyticsIcon, path: '/analytics', badge: null },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f1419] border-r border-[#1e2d3d] flex flex-col fixed h-full">
        {/* User Profile */}
        <div className="p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-white font-medium text-sm">{user?.name || 'Alex Chen'}</div>
            <div className="text-gray-500 text-xs uppercase tracking-wider">STUDENT ED.</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-gray-400 hover:bg-[#1a2332] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings at bottom */}
        <div className="p-3 border-t border-[#1e2d3d]">
          <Link
            to="/settings"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-[#1a2332] hover:text-white transition-colors"
          >
            <SettingsIcon />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Task Marketplace</h1>
              <p className="text-gray-400">Browse AI-verified tasks and build your portfolio.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors">
              <BookmarkIcon />
              Saved Tasks
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-8">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search by skill, company, or keyword..."
                className="w-full pl-12 pr-4 py-3 bg-[#0f1419] border border-[#1e2d3d] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Dropdowns */}
            <button className="flex items-center gap-2 px-4 py-3 bg-[#0f1419] border border-[#1e2d3d] text-gray-300 rounded-lg hover:bg-[#1a2332] transition-colors">
              <span>🏷️</span>
              <span>Category</span>
              <ChevronDownIcon />
            </button>

            <button className="flex items-center gap-2 px-4 py-3 bg-[#0f1419] border border-[#1e2d3d] text-gray-300 rounded-lg hover:bg-[#1a2332] transition-colors">
              <span>⚡</span>
              <span>Difficulty</span>
              <ChevronDownIcon />
            </button>

            <button className="flex items-center gap-2 px-4 py-3 bg-[#0f1419] border border-[#1e2d3d] text-gray-300 rounded-lg hover:bg-[#1a2332] transition-colors">
              <span>💰</span>
              <span>Reward Range</span>
              <ChevronDownIcon />
            </button>
          </div>

          {/* Task Cards Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(tasks.length > 0 ? tasks : mockTasks).map((task) => (
                <Link
                  key={task.id || task._id}
                  to={`/tasks/${task.id || task._id}`}
                  className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1a2332] rounded-lg flex items-center justify-center text-lg">
                        {task.companyIcon || '💼'}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {task.company || task.providerId?.name || 'Company'}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {task.postedAgo || 'Posted recently'}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-xs font-bold ${getDifficultyStyle(task.difficulty)}`}>
                      {task.difficulty?.toUpperCase() || 'MEDIUM'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                    {task.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {task.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(task.tags || task.requiredSkills || []).slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#1a2332] border border-[#2a3544] text-gray-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#1e2d3d]">
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <ClockIcon />
                      <span>Est. {task.estimatedHours || 8} Hours</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Reward: </span>
                      <span className="text-green-400 font-semibold">
                        ${task.reward?.toFixed(2) || '250.00'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskMarketplace;
