import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecruiterSidebar from '../components/RecruiterSidebar';

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
  </svg>
);

// Mock data for recent applications
const recentApplications = [
  { id: 1, name: 'Jane Doe', initials: 'JD', appliedAgo: '2h ago', discipline: 'Video Editing', score: 98, status: 'NEW', statusColor: 'bg-blue-500' },
  { id: 2, name: 'Alex Smith', initials: 'AS', appliedAgo: '5h ago', discipline: 'React Dev', score: 92, status: 'REVIEWING', statusColor: 'bg-gray-600' },
  { id: 3, name: 'Sarah Chen', initials: 'SC', appliedAgo: '1d ago', discipline: 'UI Designer', score: 89, status: 'SCREENING', statusColor: 'bg-gray-600' },
];

const RecruiterDashboard = () => {
  const { user } = useAuth();

  const getScoreBarWidth = (score) => {
    return `${(score / 100) * 100}%`;
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <RecruiterSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Bar */}
        <div className="bg-[#0f1419] border-b border-[#1e2d3d] px-8 py-4 flex items-center justify-between">
          <div className="flex-1 max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search candidates, jobs, or skills..."
              className="w-full pl-12 pr-4 py-2.5 bg-[#1a2332] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4 ml-8">
            <button className="p-2 text-gray-400 hover:text-white relative">
              <BellIcon />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2">
              <PlusIcon />
              Post a New Task
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-1">Dashboard Overview</h1>
            <p className="text-gray-400">Welcome back, {user?.name?.split(' ')[0] || 'Marcus'}. Here's what's happening with your recruitment funnel today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">Active Job Postings</span>
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <DocumentIcon className="text-blue-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">12</span>
                <span className="text-gray-500">Postings</span>
              </div>
            </div>

            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">Total Applicants</span>
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <UsersIcon className="text-blue-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-white">1,240</span>
                <span className="text-green-400 text-sm">+15%</span>
              </div>
              <p className="text-gray-500 text-xs">Increasing trend this week</p>
            </div>

            <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-sm">Verified Top Talent</span>
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <VerifiedIcon className="text-blue-400" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">84</span>
                <span className="text-gray-500">Candidates</span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Recent Applications */}
            <div className="col-span-2 bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Recent Applications</h2>
                <Link to="/recruiter/applications" className="text-blue-400 hover:text-blue-300 text-sm">
                  View All
                </Link>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                    <th className="pb-4 font-medium">Candidate</th>
                    <th className="pb-4 font-medium">Discipline</th>
                    <th className="pb-4 font-medium">AI Verified Score</th>
                    <th className="pb-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2d3d]">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-[#1a2332] transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
                            {app.initials}
                          </div>
                          <div>
                            <div className="text-white font-medium">{app.name}</div>
                            <div className="text-gray-500 text-xs">Applied {app.appliedAgo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="bg-[#1a2332] border border-[#2a3544] text-gray-300 px-3 py-1 rounded text-sm">
                          {app.discipline}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-[#1a2332] rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: getScoreBarWidth(app.score) }}
                            ></div>
                          </div>
                          <span className="text-white font-medium">{app.score}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`${app.statusColor} text-white px-3 py-1 rounded text-xs font-medium`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
              
              <Link to="/recruiter/talent" className="block bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-4 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <SearchIcon className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Launch Search</div>
                    <div className="text-gray-500 text-sm">Find specific skills</div>
                  </div>
                </div>
              </Link>

              <button className="w-full bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-4 hover:border-blue-500/50 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <DocumentIcon className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Weekly Report</div>
                    <div className="text-gray-500 text-sm">Export hiring metrics</div>
                  </div>
                </div>
              </button>

              {/* AI Recruiting Assistant */}
              <div className="bg-gradient-to-br from-[#1a3a4a] to-[#0f1419] border border-[#1e4a5a] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <SparklesIcon className="text-blue-400" />
                  <span className="text-blue-400 font-bold text-sm uppercase">AI Recruiting Assistant</span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  You have 14 candidates that perfectly match your "Senior React Dev" role. Would you like to send batch screening tasks?
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors">
                  Review Matches
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
