import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const CheckBadgeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

// Mock data for milestones
const milestones = [
  {
    id: 1,
    title: 'Full-Stack Proficiency',
    description: 'Demonstrated mastery in frontend frameworks, backend logic, and database management.',
    icon: '💎',
    iconBg: 'bg-blue-600',
    issuedDate: 'Oct 12, 2023',
    score: 96,
    verified: true,
  },
  {
    id: 2,
    title: 'Advanced UI Systems',
    description: 'Validated expertise in component architecture, accessibility standards, and design tokens.',
    icon: '✕',
    iconBg: 'bg-green-600',
    issuedDate: 'Sep 28, 2023',
    score: 94,
    verified: true,
  },
];

// Mock data for skill badges
const skillBadges = [
  { id: 1, name: 'React Hooks', icon: '⟳', iconBg: 'bg-[#1a2332]', score: 98.5, verifiedDate: 'Oct 24', color: 'text-blue-400' },
  { id: 2, name: 'Python Scripting', icon: '🖥️', iconBg: 'bg-[#1a2332]', score: 92.0, verifiedDate: 'Oct 18', color: 'text-blue-400' },
  { id: 3, name: 'PostgreSQL', icon: '≡', iconBg: 'bg-[#1a2332]', score: 88.5, verifiedDate: 'Oct 10', color: 'text-green-400' },
  { id: 4, name: 'REST API Design', icon: '⚡', iconBg: 'bg-[#1a2332]', score: 95.0, verifiedDate: 'Sep 15', color: 'text-blue-400' },
  { id: 5, name: 'AWS Basics', icon: '☁️', iconBg: 'bg-[#1a2332]', score: 82.0, verifiedDate: 'Aug 30', color: 'text-yellow-400' },
  { id: 6, name: 'Web Security', icon: '🔒', iconBg: 'bg-[#1a2332]', score: 91.5, verifiedDate: 'Aug 12', color: 'text-green-400' },
];

// Mock data for in-progress
const inProgressItems = [
  { name: 'Machine Learning Ops', progress: 65 },
  { name: 'System Design II', progress: 30 },
];

const Certifications = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [badgeFilter, setBadgeFilter] = useState('recent');

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
              <h1 className="text-3xl font-bold text-white mb-1">Your Certifications</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <CheckBadgeIcon />
                <span>Manage and share your AI-verified credentials</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Earned</div>
                <div className="text-2xl font-bold text-white">14</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wider">In Progress</div>
                <div className="text-2xl font-bold text-green-400">3</div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Milestones + Badges */}
            <div className="col-span-2 space-y-6">
              {/* Featured Milestones */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <StarIcon className="text-yellow-400" />
                    <h2 className="text-xl font-bold text-white">Featured Milestones</h2>
                  </div>
                  <span className="text-sm text-gray-500 uppercase tracking-wider">Highest Honors</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6 relative"
                    >
                      {milestone.verified && (
                        <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">
                          VERIFIED
                        </span>
                      )}
                      <div className={`w-12 h-12 ${milestone.iconBg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                        {milestone.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{milestone.description}</p>
                      <div className="text-sm text-gray-500">
                        Issued {milestone.issuedDate} • <span className="text-blue-400">Score: {milestone.score}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Badges */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Skill Badges</h2>
                  <div className="flex bg-[#1a2332] rounded-lg p-1">
                    <button
                      onClick={() => setBadgeFilter('recent')}
                      className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                        badgeFilter === 'recent'
                          ? 'bg-[#2a3544] text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Most Recent
                    </button>
                    <button
                      onClick={() => setBadgeFilter('score')}
                      className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                        badgeFilter === 'score'
                          ? 'bg-[#2a3544] text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Highest Score
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {skillBadges
                    .sort((a, b) => badgeFilter === 'score' ? b.score - a.score : 0)
                    .map((badge) => (
                      <div
                        key={badge.id}
                        className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5 hover:border-blue-500/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-10 h-10 ${badge.iconBg} border border-[#2a3544] rounded-lg flex items-center justify-center text-blue-400`}>
                            {badge.icon}
                          </div>
                          <span className={`text-sm font-bold ${badge.color}`}>{badge.score.toFixed(1)}</span>
                        </div>
                        <h3 className="text-white font-semibold mb-1">{badge.name}</h3>
                        <p className="text-gray-500 text-sm">Verified {badge.verifiedDate}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Add to Profile */}
              <div className="bg-gradient-to-br from-[#1a3a4a] to-[#0f1419] border border-[#1e4a5a] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShareIcon className="text-blue-400" />
                  <span className="text-white font-bold uppercase text-sm">Add to Profile</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Boost your professional visibility by adding your verified SkillBridge credentials directly to LinkedIn.
                </p>
                <button className="w-full bg-white hover:bg-gray-100 text-[#0a0e17] font-medium py-2.5 rounded-lg transition-colors">
                  Sync Now
                </button>
              </div>

              {/* In Progress */}
              <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
                <h3 className="text-white font-bold mb-1">In Progress</h3>
                <p className="text-gray-500 text-sm mb-4">Based on your learning path.</p>
                
                <div className="space-y-4">
                  {inProgressItems.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium text-sm">{item.name}</span>
                        <span className="text-blue-400 text-sm font-medium">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-[#1a2332] rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      {index === 0 && (
                        <p className="text-gray-500 text-xs mt-1">2 tasks remaining for badge.</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Public Portfolio Link */}
              <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
                <h3 className="text-white font-bold mb-3">Public Portfolio Link</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value="skillbridge.ai/u/alexchen"
                    readOnly
                    className="flex-1 bg-[#1a2332] border border-[#2a3544] rounded-lg px-3 py-2 text-gray-400 text-sm"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certifications;
