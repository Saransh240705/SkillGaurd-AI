import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OrgSidebar from '../components/OrgSidebar';

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const WarningIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const MoreIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

// Mock data
const activeTasks = [
  { id: 1, name: 'Backend API Refactor', taskId: '#SK-8821', category: 'Python', categoryColor: 'bg-blue-600', status: 'Live', statusColor: 'text-green-400', submissions: 24 },
  { id: 2, name: 'Frontend Dashboard UI', taskId: '#SK-9942', category: 'React', categoryColor: 'bg-cyan-500', status: 'Reviewing', statusColor: 'text-yellow-400', submissions: 18 },
  { id: 3, name: 'Machine Learning Model', taskId: '#SK-3310', category: 'Data Science', categoryColor: 'bg-orange-500', status: 'Draft', statusColor: 'text-gray-400', submissions: null },
  { id: 4, name: 'Mobile Auth Flow', taskId: '#SK-4155', category: 'Swift', categoryColor: 'bg-orange-400', status: 'Live', statusColor: 'text-green-400', submissions: 56 },
];

const recentSubmissions = [
  { id: 1, name: 'Sarah Jenkins', task: 'Backend API Refactor', score: 98, time: '2m ago', avatar: 'SJ', avatarBg: 'from-blue-500 to-blue-600' },
  { id: 2, name: 'Marcus Chen', task: 'Frontend Dashboard UI', score: 92, time: '15m ago', avatar: 'MC', avatarBg: 'from-purple-500 to-purple-600' },
  { id: 3, name: 'Emily Ross', task: 'Mobile Auth Flow', score: 76, time: '1h ago', avatar: 'ER', avatarBg: 'from-pink-500 to-pink-600' },
  { id: 4, name: 'David Kim', task: 'Backend API Refactor', score: 89, time: '2h ago', avatar: 'DK', avatarBg: 'from-gray-500 to-gray-600' },
];

const OrgOverview = () => {
  const { user } = useAuth();

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <OrgSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Overview</h1>
            <p className="text-gray-400">Manage your ecosystem and monitor real-time submissions.</p>
          </div>
          <Link to="/org/tasks/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2">
            <PlusIcon />
            Post New Task
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckIcon className="text-green-400" />
              <span className="text-gray-400 text-sm">Active Tasks</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">12</div>
            <p className="text-gray-500 text-sm">3 drafts pending</p>
          </div>

          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <ClockIcon className="text-blue-400" />
              <span className="text-gray-400 text-sm">Pending Verifications</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">45</div>
            <p className="text-yellow-400 text-sm flex items-center gap-1">
              <WarningIcon />
              Action required
            </p>
          </div>

          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <StarIcon className="text-yellow-400" />
              <span className="text-gray-400 text-sm">Avg. Applicant Score</span>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-white">88</span>
              <span className="text-gray-400">/100</span>
            </div>
            <p className="text-green-400 text-sm">↗ +2.4% vs last month</p>
          </div>

          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <UsersIcon className="text-purple-400" />
              <span className="text-gray-400 text-sm">Total Talent Reach</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">1,240</div>
            <p className="text-green-400 text-sm">↗ +12% new talent</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Active Task Management */}
          <div className="col-span-2 bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Active Task Management</h2>
              <Link to="/org/tasks" className="text-blue-400 hover:text-blue-300 text-sm">
                View All
              </Link>
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-4 font-medium">Task Name</th>
                  <th className="pb-4 font-medium">Category</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium">Submissions</th>
                  <th className="pb-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2d3d]">
                {activeTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="py-4">
                      <div className="text-white font-medium">{task.name}</div>
                      <div className="text-gray-500 text-xs">ID: {task.taskId}</div>
                    </td>
                    <td className="py-4">
                      <span className={`${task.categoryColor} text-white text-xs px-2.5 py-1 rounded font-medium`}>
                        {task.category}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`${task.statusColor} flex items-center gap-1.5`}>
                        <span className={`w-2 h-2 rounded-full ${task.status === 'Live' ? 'bg-green-400' : task.status === 'Reviewing' ? 'bg-yellow-400' : 'bg-gray-400'}`}></span>
                        {task.status}
                      </span>
                    </td>
                    <td className="py-4 text-white">{task.submissions || '-'}</td>
                    <td className="py-4">
                      <button className="text-gray-400 hover:text-white">
                        <MoreIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Submissions */}
          <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-white">Recent Submissions</h2>
              <span className="text-blue-400 text-sm">Real-time feed</span>
            </div>

            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${submission.avatarBg} flex items-center justify-center`}>
                      <span className="text-white text-sm font-medium">{submission.avatar}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{submission.name}</div>
                      <div className="text-gray-500 text-xs">{submission.task}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`${getScoreColor(submission.score)} text-white text-xs px-2 py-1 rounded font-medium`}>
                      {submission.score}% SCORE
                    </span>
                    <div className="text-gray-500 text-xs mt-1">{submission.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgOverview;
