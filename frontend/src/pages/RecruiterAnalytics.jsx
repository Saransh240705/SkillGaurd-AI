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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const JobsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const TalentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const MessagesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
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

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const TrendDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const TrendUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

// Mock application trends data
const applicationTrendsData = [
  { week: 'Week 1', applications: 180 },
  { week: 'Week 2', applications: 220 },
  { week: 'Week 3', applications: 280 },
  { week: 'Week 4', applications: 420 },
];

// Mock hiring funnel data
const hiringFunnelData = [
  { stage: 'Applied', count: 2450, percentage: 100 },
  { stage: 'Verified', count: 1120, percentage: 45.7 },
  { stage: 'Interviewed', count: 340, percentage: 13.8 },
  { stage: 'Hired', count: 48, percentage: 1.9 },
];

// Mock skills data for donut chart
const skillsData = [
  { name: 'React', value: 350, color: '#3b82f6' },
  { name: 'Python', value: 280, color: '#10b981' },
  { name: 'Figma', value: 220, color: '#8b5cf6' },
  { name: 'Node.js', value: 180, color: '#f59e0b' },
  { name: 'Other', value: 170, color: '#6b7280' },
];

// Mock job performance data
const jobPerformanceData = [
  { position: 'Senior Frontend Engineer', id: '#8829', impressions: 12450, applied: 412, ctr: 3.3, status: 'ACTIVE' },
  { position: 'Lead Product Designer', id: '#8830', impressions: 8120, applied: 189, ctr: 2.1, status: 'ACTIVE' },
];

// Mock saved reports
const savedReports = [
  { name: 'Monthly Hiring Q3', hasArrow: true },
  { name: 'Tech Stack Trends', hasArrow: true },
];

const RecruiterAnalytics = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/recruiter/dashboard' },
    { name: 'Active Jobs', icon: JobsIcon, path: '/recruiter/jobs' },
    { name: 'Talent Pool', icon: TalentIcon, path: '/recruiter/talent' },
    { name: 'Analytics', icon: AnalyticsIcon, path: '/recruiter/analytics' },
    { name: 'Messages', icon: MessagesIcon, path: '/recruiter/messages' },
  ];

  const getMaxFunnelWidth = (percentage) => {
    return `${percentage}%`;
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f1419] border-r border-[#1e2d3d] flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">≡</span>
          </div>
          <div>
            <span className="text-white font-bold">SkillBridge AI</span>
            <div className="text-xs text-blue-400">RECRUITER PORTAL</div>
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
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-[#1a2332] hover:text-white'
                }`}
              >
                <item.icon />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Saved Reports */}
        <div className="px-4 py-4 border-t border-[#1e2d3d]">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Saved Reports</h3>
          <div className="space-y-2">
            {savedReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between text-sm cursor-pointer hover:text-white text-gray-400">
                <span>{report.name}</span>
                <ChevronRightIcon />
              </div>
            ))}
          </div>
        </div>

        {/* User Profile at bottom */}
        <div className="p-4 border-t border-[#1e2d3d] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
              <span className="text-white text-sm font-medium">MT</span>
            </div>
            <div>
              <div className="text-white font-medium text-sm">{user?.name || 'Marcus Thorne'}</div>
              <div className="text-gray-500 text-xs">Senior Recruiter</div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <SettingsIcon />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <div className="bg-[#0f1419] border-b border-[#1e2d3d] px-8 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search analytics data..."
              className="w-full pl-12 pr-4 py-2.5 bg-[#1a2332] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-[#1a2332] border border-[#2a3544] rounded-lg text-gray-400 hover:text-white transition-colors">
              <CalendarIcon />
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
              <DownloadIcon />
              Export PDF
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-1">Recruiter Analytics</h1>
            <p className="text-gray-400">Data-driven insights for the current hiring cycle (Oct 1 - Oct 31, 2023)</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Avg. Time to Hire</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-white">18.5</span>
                <span className="text-gray-400">Days</span>
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <TrendDownIcon />
                <span>4.2% from last month</span>
              </div>
            </div>

            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Cost Per Hire</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-white">$1,240</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <span className="w-2 h-0.5 bg-gray-500"></span>
                <span>Stable performance</span>
              </div>
            </div>

            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Offer Acceptance</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-white">92%</span>
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <TrendUpIcon />
                <span>12% improvement</span>
              </div>
            </div>

            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Quality of Hire</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-white">4.8</span>
                <span className="text-gray-400">/5.0</span>
              </div>
              <div className="flex items-center gap-1 text-blue-400 text-sm">
                <CheckCircleIcon />
                <span>Above industry avg</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Candidate Application Trends */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Candidate Application Trends</h2>
                <span className="text-gray-400 text-sm">Last 30 Days</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={applicationTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" />
                    <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a2332',
                        border: '1px solid #2a3544',
                        borderRadius: '8px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="applications"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Hiring Funnel Conversion */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Hiring Funnel Conversion</h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-gray-400">Conversion Rate</span>
                </div>
              </div>
              <div className="space-y-4">
                {hiringFunnelData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-400 text-sm">{item.stage}</span>
                      <span className="text-white text-sm">
                        {item.count.toLocaleString()} <span className="text-gray-500">({item.percentage}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-[#1a2332] rounded-full h-3">
                      <div
                        className="bg-blue-500 h-3 rounded-full transition-all"
                        style={{ width: getMaxFunnelWidth(item.percentage) }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Top Skills in Talent Pool */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-6">Top Skills in Talent Pool</h2>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={skillsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {skillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">1.2k</span>
                    <span className="text-gray-400 text-xs">TOTAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Performance Overview */}
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Job Performance Overview</h2>
                <Link to="/recruiter/jobs" className="text-blue-400 hover:text-blue-300 text-sm">
                  View Detail
                </Link>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                    <th className="pb-3 font-medium">Position</th>
                    <th className="pb-3 font-medium">Impressions</th>
                    <th className="pb-3 font-medium">Applied</th>
                    <th className="pb-3 font-medium">CTR</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2d3d]">
                  {jobPerformanceData.map((job, index) => (
                    <tr key={index}>
                      <td className="py-3">
                        <div className="text-white font-medium text-sm">{job.position}</div>
                        <div className="text-gray-500 text-xs">Internal ID: {job.id}</div>
                      </td>
                      <td className="py-3 text-white text-sm">{job.impressions.toLocaleString()}</td>
                      <td className="py-3 text-white text-sm">{job.applied}</td>
                      <td className="py-3 text-blue-400 text-sm">{job.ctr}%</td>
                      <td className="py-3">
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-medium">
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterAnalytics;
