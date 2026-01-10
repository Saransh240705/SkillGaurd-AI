import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';

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

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const ThumbsUpIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
  </svg>
);

const TrendUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

// Mock skill progression data
const skillProgressionData = [
  { month: 'AUG', tech: 25, design: 20, video: 15 },
  { month: '', tech: 35, design: 28, video: 22 },
  { month: '', tech: 40, design: 35, video: 28 },
  { month: 'SEP', tech: 55, design: 45, video: 38 },
  { month: '', tech: 60, design: 52, video: 42 },
  { month: '', tech: 68, design: 58, video: 48 },
  { month: 'OCT', tech: 85, design: 65, video: 55 },
];

// Mock radar data
const radarData = [
  { skill: 'Technical', you: 85, average: 65 },
  { skill: 'Speed', you: 72, average: 60 },
  { skill: 'Quality', you: 90, average: 70 },
  { skill: 'Consistency', you: 78, average: 65 },
  { skill: 'Focus', you: 82, average: 62 },
];

// Mock activity data (GitHub-style heatmap)
const generateActivityData = () => {
  const data = [];
  const months = ['Jul', 'Aug', 'Sep', 'Oct'];
  
  for (let week = 0; week < 18; week++) {
    for (let day = 0; day < 7; day++) {
      data.push({
        week,
        day,
        value: Math.floor(Math.random() * 5), // 0-4 intensity
        monthLabel: week % 4 === 0 ? months[Math.floor(week / 4)] : null,
      });
    }
  }
  return data;
};

const activityData = generateActivityData();

// Mock strengths and opportunities
const topStrengths = [
  { name: 'API Development', score: 96, trend: '+8%' },
  { name: 'Database Design', score: 94, trend: '+5%' },
  { name: 'Code Review', score: 92, trend: '+3%' },
];

const growthOpportunities = [
  { name: 'System Design', current: 68, target: 85 },
  { name: 'DevOps', current: 55, target: 75 },
  { name: 'Mobile Development', current: 48, target: 70 },
];

const Analytics = () => {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard', badge: null },
    { name: 'Tasks', icon: TasksIcon, path: '/tasks', badge: 2 },
    { name: 'Certifications', icon: CertIcon, path: '/certifications', badge: null },
    { name: 'Analytics', icon: AnalyticsIcon, path: '/analytics', badge: null },
  ];

  const getActivityColor = (value) => {
    const colors = [
      'bg-[#1a2332]',
      'bg-blue-900/50',
      'bg-blue-700/60',
      'bg-blue-500/70',
      'bg-blue-400',
    ];
    return colors[value] || colors[0];
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
              <h1 className="text-3xl font-bold text-white mb-1">Performance Analytics</h1>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <CalendarIcon />
                <span>Last 30 Days vs Previous Period</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0f1419] border border-[#1e2d3d] text-gray-300 rounded-lg hover:bg-[#1a2332] transition-colors">
                <DownloadIcon />
                <span>Export Report</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <ShareIcon />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>TOTAL TASKS</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">142</span>
                <span className="text-green-400 text-sm">↑ 12%</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">Attempted across all modules</p>
            </div>

            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>AVG VERIFICATION</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">94</span>
                <span className="text-gray-400 text-lg">/100</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">AI-Verified accuracy score</p>
            </div>

            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>GLOBAL RANKING</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">Top 5%</span>
                <span className="text-green-400 text-sm">↑ 2%</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">Percentile among all students</p>
            </div>

            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>LEARNING VELOCITY</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">High</span>
                <span className="text-green-400 text-sm">2.4x</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">Skills acquired per week</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Skill Progression Chart */}
            <div className="col-span-2 bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Skill Progression Over Time</h2>
                  <p className="text-gray-500 text-sm">Score improvement across categories (Month-over-Month)</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-400">Tech</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                    <span className="text-gray-400">Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-400">Video</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={skillProgressionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a2332',
                        border: '1px solid #2a3544',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="tech"
                      stroke="#60a5fa"
                      strokeWidth={2}
                      dot={{ fill: '#60a5fa', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="design"
                      stroke="#4ade80"
                      strokeWidth={2}
                      dot={{ fill: '#4ade80', r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="video"
                      stroke="#c084fc"
                      strokeWidth={2}
                      dot={{ fill: '#c084fc', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Breakdown Radar */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="mb-4">
                <h2 className="text-lg font-bold text-white">Breakdown</h2>
                <p className="text-gray-500 text-sm">Vs. Global Average</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#1e2d3d" />
                    <PolarAngleAxis dataKey="skill" stroke="#6b7280" fontSize={11} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="You"
                      dataKey="you"
                      stroke="#60a5fa"
                      fill="#60a5fa"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Platform Avg"
                      dataKey="average"
                      stroke="#6b7280"
                      fill="#6b7280"
                      fillOpacity={0.1}
                      strokeWidth={1}
                      strokeDasharray="4 4"
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-blue-400"></span>
                  <span className="text-gray-400">You</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-gray-500 border-dashed"></span>
                  <span className="text-gray-400">Platform Avg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Task Activity Log */}
          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white">Task Activity Log</h2>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>Less</span>
                <div className="flex gap-1">
                  <span className="w-3 h-3 rounded bg-[#1a2332]"></span>
                  <span className="w-3 h-3 rounded bg-blue-900/50"></span>
                  <span className="w-3 h-3 rounded bg-blue-700/60"></span>
                  <span className="w-3 h-3 rounded bg-blue-500/70"></span>
                  <span className="w-3 h-3 rounded bg-blue-400"></span>
                </div>
                <span>More</span>
              </div>
            </div>
            
            {/* Activity Heatmap */}
            <div className="overflow-x-auto">
              <div className="flex gap-0.5">
                {Array.from({ length: 18 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-0.5">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const dataPoint = activityData.find(
                        (d) => d.week === weekIndex && d.day === dayIndex
                      );
                      return (
                        <div
                          key={dayIndex}
                          className={`w-4 h-4 rounded-sm ${getActivityColor(dataPoint?.value || 0)}`}
                          title={`${dataPoint?.value || 0} tasks`}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 px-1">
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
              </div>
            </div>
          </div>

          {/* Strengths and Opportunities */}
          <div className="grid grid-cols-2 gap-6">
            {/* Top Strengths */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsUpIcon className="text-green-400" />
                <h2 className="text-lg font-bold text-white">Top Strengths</h2>
              </div>
              <div className="space-y-4">
                {topStrengths.map((strength, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
                      <span className="text-white font-medium">{strength.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{strength.score}%</span>
                      <span className="text-green-400 text-sm">{strength.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Opportunities */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendUpIcon className="text-yellow-400" />
                <h2 className="text-lg font-bold text-white">Growth Opportunities</h2>
              </div>
              <div className="space-y-4">
                {growthOpportunities.map((opp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{opp.name}</span>
                      <span className="text-gray-400 text-sm">{opp.current}% → {opp.target}%</span>
                    </div>
                    <div className="w-full bg-[#1a2332] rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all"
                        style={{ width: `${(opp.current / opp.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
