import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

const PencilIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const DesignIcon = () => (
  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MarketingIcon = () => (
  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
  </svg>
);

const DataIcon = () => (
  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Mock job postings data
const jobPostings = [
  {
    id: 1,
    title: 'Senior React Developer',
    status: 'ACTIVE',
    icon: CodeIcon,
    category: 'Engineering',
    location: 'Remote',
    postedAgo: 'Posted 2 days ago',
    applicants: 48,
    aiVerified: 12,
    hired: null,
  },
  {
    id: 2,
    title: 'Senior Product Designer',
    status: 'ACTIVE',
    icon: DesignIcon,
    category: 'Design',
    location: 'Hybrid',
    postedAgo: 'Posted 5 days ago',
    applicants: 32,
    aiVerified: 8,
    hired: null,
  },
  {
    id: 3,
    title: 'Growth Marketing Lead',
    status: 'DRAFT',
    icon: MarketingIcon,
    category: 'Marketing',
    location: 'New York',
    postedAgo: 'Last edited 4h ago',
    applicants: null,
    aiVerified: null,
    hired: null,
  },
  {
    id: 4,
    title: 'Data Analyst',
    status: 'CLOSED',
    icon: DataIcon,
    category: 'Data Science',
    location: 'London',
    postedAgo: 'Closed 2 weeks ago',
    applicants: 156,
    aiVerified: null,
    hired: 1,
  },
];

// Mock recent job activity
const recentJobActivity = [
  { name: 'React Developer', count: '+4' },
  { name: 'Product Designer', count: '+2' },
];

const RecruiterActiveJobs = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Postings');

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/recruiter/dashboard' },
    { name: 'Active Jobs', icon: JobsIcon, path: '/recruiter/jobs' },
    { name: 'Talent Pool', icon: TalentIcon, path: '/recruiter/search' },
    { name: 'Analytics', icon: AnalyticsIcon, path: '/recruiter/analytics' },
    { name: 'Messages', icon: MessagesIcon, path: '/recruiter/messages' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded font-medium">ACTIVE</span>;
      case 'DRAFT':
        return <span className="bg-yellow-600 text-white text-xs px-2 py-0.5 rounded font-medium">DRAFT</span>;
      case 'CLOSED':
        return <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-medium">CLOSED</span>;
      default:
        return null;
    }
  };

  const activeCount = jobPostings.filter(j => j.status === 'ACTIVE').length;
  const draftCount = jobPostings.filter(j => j.status === 'DRAFT').length;

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

        {/* Recent Job Activity */}
        <div className="px-4 py-4 border-t border-[#1e2d3d]">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Recent Job Activity</h3>
          <div className="space-y-2">
            {recentJobActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-400 hover:text-white cursor-pointer">{activity.name}</span>
                <span className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded text-xs">{activity.count}</span>
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
              placeholder="Search job titles or departments..."
              className="w-full pl-12 pr-4 py-2.5 bg-[#1a2332] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4 ml-8">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Filter by Status:</span>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#1a2332] border border-[#2a3544] text-white px-4 py-2 rounded-lg focus:outline-none appearance-none pr-8"
                >
                  <option>All Postings</option>
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Closed</option>
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-white relative">
              <BellIcon />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2">
              <PlusIcon />
              Post a New Job
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Active Job Postings</h1>
              <p className="text-gray-400">Manage your current openings and track applicant progress with AI-verification.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#0f1419] border border-[#1e2d3d] px-4 py-2 rounded-lg">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-white font-medium">{activeCount * 6} Active</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0f1419] border border-[#1e2d3d] px-4 py-2 rounded-lg">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="text-white font-medium">{draftCount * 3} Drafts</span>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobPostings.map((job) => (
              <div
                key={job.id}
                className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Job Icon */}
                    <div className="w-12 h-12 bg-[#1a2332] rounded-lg flex items-center justify-center">
                      <job.icon />
                    </div>
                    
                    {/* Job Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <span className="text-gray-500">🏢</span>
                          {job.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <LocationIcon />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon />
                          {job.postedAgo}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats & Actions */}
                  <div className="flex items-center gap-8">
                    {/* Applicants */}
                    <div className="text-center">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Applicants</div>
                      <div className="text-2xl font-bold text-white">
                        {job.applicants !== null ? job.applicants : '—'}
                      </div>
                    </div>

                    {/* AI Verified / Hired */}
                    <div className="text-center">
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {job.status === 'CLOSED' ? 'Hired' : 'AI Verified'}
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-2xl font-bold text-white">
                          {job.hired !== null ? job.hired : job.aiVerified !== null ? job.aiVerified : '—'}
                        </span>
                        {(job.aiVerified || job.hired) && <CheckCircleIcon />}
                      </div>
                    </div>

                    {/* Actions */}
                    {job.status === 'ACTIVE' && (
                      <div className="flex items-center gap-2">
                        <button className="bg-blue-600/20 border border-blue-600 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600/30 transition-colors font-medium">
                          View Applicants
                        </button>
                        <button className="p-2 bg-[#1a2332] border border-[#2a3544] rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                          <PencilIcon />
                        </button>
                        <button className="p-2 bg-[#1a2332] border border-[#2a3544] rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                          <CopyIcon />
                        </button>
                      </div>
                    )}

                    {job.status === 'DRAFT' && (
                      <div className="flex items-center gap-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                          Publish Now
                        </button>
                        <button className="p-2 bg-[#1a2332] border border-[#2a3544] rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
                          <PencilIcon />
                        </button>
                        <button className="p-2 bg-[#1a2332] border border-[#2a3544] rounded-lg text-gray-400 hover:text-red-400 hover:border-red-600 transition-colors">
                          <TrashIcon />
                        </button>
                      </div>
                    )}

                    {job.status === 'CLOSED' && (
                      <div className="flex items-center gap-2">
                        <button className="bg-[#1a2332] border border-[#2a3544] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#252f3f] transition-colors font-medium">
                          Archive
                        </button>
                        <button className="bg-blue-600/20 border border-blue-600 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600/30 transition-colors font-medium">
                          Repost
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-8">
            <p className="text-gray-500 text-sm">
              Showing <span className="text-white">1-4</span> of <span className="text-blue-400">15</span> postings
            </p>
            <div className="flex items-center gap-2">
              <button className="bg-[#1a2332] border border-[#2a3544] text-white px-4 py-2 rounded-lg hover:bg-[#252f3f] transition-colors font-medium">
                Previous
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterActiveJobs;
