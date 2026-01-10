import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submissionService, authService } from '../services/api';
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

const TrendIcon = () => (
  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RobotIcon = () => (
  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

// Mock data for skills
const skillProficiencyData = [
  { name: 'Python', score: 88, color: 'bg-blue-500' },
  { name: 'SQL Database', score: 94, color: 'bg-blue-500' },
  { name: 'React Framework', score: 72, color: 'bg-blue-500' },
  { name: 'Machine Learning', score: 65, color: 'bg-blue-500' },
];

// Mock recent tasks
const recentTasks = [
  { name: 'API Rate Limiter', date: 'Oct 24', difficulty: 'HARD', score: 98, status: 'verified' },
  { name: 'Optimize SQL Query', date: 'Oct 22', difficulty: 'MEDIUM', score: 92, status: 'verified' },
  { name: 'React State Mgmt', date: 'Oct 20', difficulty: 'MEDIUM', score: 85, status: 'pending' },
  { name: 'Python Basics', date: 'Oct 18', difficulty: 'EASY', score: 100, status: 'verified' },
];

// Mock certifications
const certifications = [
  { name: 'Clean Code', icon: '<>' },
  { name: 'Algo Master', icon: '▶' },
  { name: 'SQL Pro', icon: '≡' },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [submissions, setSubmissions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [submissionsData, userProfile] = await Promise.all([
        submissionService.getMySubmissions(),
        authService.getMe(),
      ]);
      setSubmissions(submissionsData);
      setUserData(userProfile);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0e17]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const completedTasks = submissions.filter((s) => s.status === 'evaluated').length;
  const avgScore = submissions
    .filter((s) => s.evaluationResult)
    .reduce((sum, s) => sum + (s.evaluationResult?.overallScore || 0), 0) /
    (submissions.filter((s) => s.evaluationResult).length || 1);

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard', badge: null },
    { name: 'Tasks', icon: TasksIcon, path: '/tasks', badge: 2 },
    { name: 'Certifications', icon: CertIcon, path: '/certifications', badge: null },
    { name: 'Analytics', icon: AnalyticsIcon, path: '/analytics', badge: null },
  ];

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'HARD':
        return 'bg-red-500/20 text-red-400';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'EASY':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

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
              <h1 className="text-3xl font-bold text-white mb-1">
                Welcome back, {user?.name?.split(' ')[0] || 'Alex'}
              </h1>
              <div className="flex items-center text-gray-400 text-sm">
                <span className="mr-1">🎓</span>
                Software Engineering Track • Year 3
              </div>
            </div>
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-lg px-4 py-3 text-right">
              <div className="flex items-center gap-2">
                <ChartIcon />
                <div>
                  <div className="text-xs text-gray-500 uppercase">Percentile</div>
                  <div className="text-lg font-bold text-white">Top 12%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Current Level */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">Current Level</span>
                <TrendIcon />
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-bold text-white">Level 4</span>
                <span className="text-blue-400 text-sm">+1 Level</span>
              </div>
              <div className="w-full bg-[#1a2332] rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="text-xs text-gray-500">75% to Level 5</div>
            </div>

            {/* Tasks Completed */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">Tasks Completed</span>
                <CheckCircleIcon />
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-bold text-white">{completedTasks || 24}</span>
                <span className="text-blue-400 text-sm">+3 this week</span>
              </div>
              <div className="text-sm text-gray-500">Maintained 95% completion rate.</div>
            </div>

            {/* Avg. AI Score */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">Avg. AI Score</span>
                <RobotIcon />
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-bold text-white">{Math.round(avgScore) || 92}</span>
                <span className="text-gray-400 text-lg">/100</span>
                <span className="text-green-400 text-sm">+5%</span>
              </div>
              <div className="text-sm text-gray-500">Based on last 10 verified submissions.</div>
            </div>
          </div>

          {/* Main Grid - Left and Right Columns */}
          <div className="grid grid-cols-3 gap-6">
            {/* Left Column - Skill Proficiency + Task Log */}
            <div className="col-span-2 space-y-6">
              {/* Skill Proficiency */}
              <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Skill Proficiency</h2>
                  <Link to="/analytics" className="text-blue-400 hover:text-blue-300 text-sm">
                    View Detailed Report
                  </Link>
                </div>
                <div className="space-y-5">
                  {skillProficiencyData.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white text-sm font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.score}%</span>
                      </div>
                      <div className="w-full bg-[#1a2332] rounded-full h-2">
                        <div
                          className={`${skill.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Task Log */}
              <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent Task Log</h2>
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="pb-4 font-medium">Task Name</th>
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium">Difficulty</th>
                      <th className="pb-4 font-medium">AI Score</th>
                      <th className="pb-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2d3d]">
                    {recentTasks.map((task, index) => (
                      <tr key={index} className="hover:bg-[#1a2332] transition-colors">
                        <td className="py-4 text-white font-medium">{task.name}</td>
                        <td className="py-4 text-gray-400 text-sm">{task.date}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyStyle(task.difficulty)}`}>
                            {task.difficulty}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className="text-blue-400 font-semibold">{task.score}/100</span>
                        </td>
                        <td className="py-4">
                          {task.status === 'verified' ? (
                            <span className="text-green-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                              Verified
                            </span>
                          ) : (
                            <span className="text-yellow-400">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column - AI Insight + Recommended + Certifications */}
            <div className="space-y-6">
              {/* AI Insight */}
              <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <SparklesIcon />
                    <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">AI Insight</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "Your debugging speed is <span className="text-blue-400 font-medium">2x faster</span> than the average for Level 4. Focus on <span className="text-white font-medium">Time Complexity</span> in your next algorithm task."
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="text-xs bg-[#1a2332] text-gray-400 px-3 py-1 rounded-full border border-[#2a3544]">#efficiency</span>
                    <span className="text-xs bg-[#1a2332] text-gray-400 px-3 py-1 rounded-full border border-[#2a3544]">#algorithms</span>
                  </div>
                </div>
              </div>

              {/* Recommended Next */}
              <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
                <h3 className="text-white font-bold mb-1">Recommended Next</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Based on your lowest score in Data Structures.
                </p>
                <div className="bg-[#1a2332] border border-[#2a3544] rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold mb-1">Binary Search Trees</div>
                    <div className="text-gray-500 text-xs">EST. 45 MIN • HARD</div>
                  </div>
                  <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center text-white transition-colors">
                    <PlayIcon />
                  </button>
                </div>
              </div>

              {/* Latest Certifications */}
              <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-bold">Latest Certifications</h3>
                  <Link to="/certifications" className="text-blue-400 hover:text-blue-300 text-xs">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-[#1a2332] border border-[#2a3544] rounded-lg p-4 text-center">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 mx-auto mb-2 text-lg font-mono">
                        {cert.icon}
                      </div>
                      <div className="text-gray-400 text-xs">{cert.name}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-[#1a2332] border border-[#2a3544] rounded-lg p-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
                    🔒
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
