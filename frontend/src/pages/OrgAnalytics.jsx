import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OrgSidebar from '../components/OrgSidebar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Icons
const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const TrendUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const TrendDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// Mock chart data
const volumeQualityData = [
  { week: 'Week 1', volume: 150, quality: 82 },
  { week: 'Week 2', volume: 180, quality: 85 },
  { week: 'Week 3', volume: 220, quality: 83 },
  { week: 'Week 4', volume: 280, quality: 88 },
];

// Mock task leaderboard
const taskLeaderboard = [
  { name: 'Frontend React Challenge', category: 'Frontend Dev', attempts: 142, avgScore: 92, rating: 4.9 },
  { name: 'Python Data Analysis', category: 'Data Science', attempts: 89, avgScore: 85, rating: 4.7 },
];

// Mock recruitment funnel
const recruitmentFunnel = [
  { stage: 'Tasks Submitted', count: 524, icon: '☑️' },
  { stage: 'AI Verified (Passed)', count: 419, icon: '✓' },
  { stage: 'Shortlisted', count: 62, icon: '📋' },
];

// Mock talent pool skills
const talentPoolSkills = [
  { name: 'Frontend (React/Vue)', percentage: 45, color: 'bg-blue-500' },
  { name: 'Backend (Node/Python)', percentage: 28, color: 'bg-green-500' },
  { name: 'Data Science', percentage: 15, color: 'bg-purple-500' },
  { name: 'UI/UX Design', percentage: 12, color: 'bg-orange-500' },
];

const OrgAnalytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30 Days');

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <OrgSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Analytics Dashboard</h1>
            <p className="text-gray-400">Last updated: Just now</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#0f1419] border border-[#1e2d3d] rounded-lg overflow-hidden">
              {['30 Days', '90 Days', 'YTD'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-[#1a2332] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2">
              <DownloadIcon />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Talent Quality Score</span>
              <span className="text-green-400 text-sm flex items-center gap-1">
                <TrendUpIcon />
                +2.4%
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">88</span>
              <span className="text-gray-400">/100</span>
            </div>
            <p className="text-gray-500 text-xs mt-2">Based on AI assessment metrics</p>
          </div>

          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Avg. Time-to-Verify</span>
              <span className="text-green-400 text-sm flex items-center gap-1">
                <TrendDownIcon />
                -0.5 days
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">1.2</span>
              <span className="text-gray-400">Days</span>
            </div>
            <p className="text-gray-500 text-xs mt-2">Faster than industry avg (2.5d)</p>
          </div>

          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Top Performing Task</span>
              <span className="bg-green-600/20 text-green-400 text-xs px-2 py-0.5 rounded">High Engagement</span>
            </div>
            <div className="text-xl font-bold text-white mb-1">React Challenge</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#1a2332] rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <span className="text-gray-400 text-xs">98% Completion rate</span>
            </div>
          </div>

          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Candidate Conversion</span>
              <span className="text-gray-400 text-sm">— Stable</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">12</span>
              <span className="text-gray-400">%</span>
            </div>
            <p className="text-gray-500 text-xs mt-2">Task Completion to Interview</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Volume & Quality Trends */}
          <div className="col-span-2 bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Submission Volume & Quality Trends</h2>
                <p className="text-gray-400 text-sm">Correlating volume with average AI score over time</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  Volume
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Quality
                </span>
              </div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volumeQualityData}>
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
                  <Line type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="quality" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Talent Pool Skills */}
          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Talent Pool Skills</h2>
            <div className="space-y-4">
              {talentPoolSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                    <span className="text-white font-medium">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#1a2332] rounded-full h-2">
                    <div
                      className={`${skill.color} h-2 rounded-full`}
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recruitment Funnel */}
          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6">Recruitment Funnel</h2>
            <div className="space-y-4">
              {recruitmentFunnel.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <span>{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-300">{item.stage}</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Leaderboard */}
          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Task Leaderboard</h2>
              <Link to="/org/tasks" className="text-blue-400 hover:text-blue-300 text-sm">
                View All
              </Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Task Name</th>
                  <th className="pb-3 font-medium">Attempts</th>
                  <th className="pb-3 font-medium">Avg. Score</th>
                  <th className="pb-3 font-medium">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2d3d]">
                {taskLeaderboard.map((task, index) => (
                  <tr key={index}>
                    <td className="py-3">
                      <div className="text-white font-medium text-sm">{task.name}</div>
                      <div className="text-gray-500 text-xs">{task.category}</div>
                    </td>
                    <td className="py-3 text-white">{task.attempts}</td>
                    <td className="py-3">
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-medium">
                        {task.avgScore}%
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="flex items-center gap-1 text-white">
                        <StarIcon />
                        {task.rating}
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
  );
};

export default OrgAnalytics;
