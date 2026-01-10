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

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// Mock candidates data
const candidates = [
  {
    id: 1,
    name: 'Jane Cooper',
    location: 'London, UK',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    avatarBg: 'from-green-500 to-green-600',
    aiScore: 98,
    expertise: ['Video Editing', 'Motion Graphics', 'After Effects'],
  },
  {
    id: 2,
    name: 'Sarah Chen',
    location: 'San Francisco, US',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    avatarBg: 'from-blue-500 to-blue-600',
    aiScore: 94,
    expertise: ['UI Design', 'Figma', 'Prototyping'],
  },
  {
    id: 3,
    name: 'Marcus Thorne',
    location: 'Berlin, DE',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    avatarBg: 'from-purple-500 to-purple-600',
    aiScore: 89,
    expertise: ['React', 'Node.js', 'Tailwind'],
  },
  {
    id: 4,
    name: 'Alex Rivera',
    location: 'Remote',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    avatarBg: 'from-orange-500 to-orange-600',
    aiScore: 91,
    expertise: ['Data Analytics', 'Python', 'SQL'],
  },
  {
    id: 5,
    name: 'Elena Vance',
    location: 'Seattle, US',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    avatarBg: 'from-pink-500 to-pink-600',
    aiScore: 96,
    expertise: ['3D Animation', 'Blender', 'Unreal Engine'],
  },
  {
    id: 6,
    name: 'Jordan Lee',
    location: 'Seoul, KR',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    avatarBg: 'from-teal-500 to-teal-600',
    aiScore: 87,
    expertise: ['Product Management', 'Agile', 'User Research'],
  },
];

// Mock saved searches
const savedSearches = [
  { name: 'React Devs (UK)', count: 12 },
  { name: 'Senior Designers', count: 5 },
];

const TalentPool = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [discipline, setDiscipline] = useState('All Disciplines');
  const [minScore, setMinScore] = useState('Any Score');
  const [locationFilter, setLocationFilter] = useState('Global');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/recruiter/dashboard' },
    { name: 'Active Jobs', icon: JobsIcon, path: '/recruiter/jobs' },
    { name: 'Talent Pool', icon: TalentIcon, path: '/recruiter/talent' },
    { name: 'Analytics', icon: AnalyticsIcon, path: '/recruiter/analytics' },
    { name: 'Messages', icon: MessagesIcon, path: '/recruiter/messages' },
  ];

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

        {/* Saved Searches */}
        <div className="px-4 py-4 border-t border-[#1e2d3d]">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Saved Searches</h3>
          <div className="space-y-2">
            {savedSearches.map((search, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-400 hover:text-white cursor-pointer">{search.name}</span>
                <span className="bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded text-xs">{search.count}</span>
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
        <div className="bg-[#0f1419] border-b border-[#1e2d3d] px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-xl relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search for candidates by name, specific skills, or experience..."
                className="w-full pl-12 pr-4 py-2.5 bg-[#1a2332] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Advanced Filters Button */}
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
              <FilterIcon />
              Advanced Filters
            </button>
          </div>

          {/* Filter Row */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              {/* Discipline */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">DISCIPLINE:</span>
                <div className="relative">
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="bg-[#1a2332] border border-[#2a3544] text-white px-3 py-1.5 rounded focus:outline-none appearance-none pr-8 text-sm"
                  >
                    <option>All Disciplines</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Data Science</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Min Score */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">MIN SCORE:</span>
                <div className="relative">
                  <select
                    value={minScore}
                    onChange={(e) => setMinScore(e.target.value)}
                    className="bg-[#1a2332] border border-[#2a3544] text-white px-3 py-1.5 rounded focus:outline-none appearance-none pr-8 text-sm"
                  >
                    <option>Any Score</option>
                    <option>80+</option>
                    <option>85+</option>
                    <option>90+</option>
                    <option>95+</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">LOCATION:</span>
                <div className="relative">
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="bg-[#1a2332] border border-[#2a3544] text-white px-3 py-1.5 rounded focus:outline-none appearance-none pr-8 text-sm"
                  >
                    <option>Global</option>
                    <option>Remote</option>
                    <option>US</option>
                    <option>Europe</option>
                    <option>Asia</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Count */}
            <p className="text-gray-400 text-sm">
              Showing <span className="text-blue-400 font-medium">1,240</span> verified candidates
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Talent Pool</h1>
              <p className="text-gray-400">Discover and manage AI-verified talent across your disciplines.</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-[#0f1419] border border-[#1e2d3d] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#1a2332] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <GridIcon />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#1a2332] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <ListIcon />
              </button>
            </div>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5 hover:border-blue-500/30 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${candidate.avatarBg} flex items-center justify-center overflow-hidden`}>
                      <img src={candidate.avatar} alt={candidate.name} className="w-full h-full" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{candidate.name}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <LocationIcon />
                        {candidate.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-400">{candidate.aiScore}</div>
                    <div className="text-xs text-gray-500 uppercase">AI Score</div>
                  </div>
                </div>

                {/* Expertise */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 uppercase mb-2">Expertise</div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.expertise.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="bg-[#1a2332] border border-[#2a3544] text-gray-300 px-2.5 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600/20 border border-blue-600 text-blue-400 py-2 rounded-lg hover:bg-blue-600/30 transition-colors font-medium">
                    Shortlist
                  </button>
                  <button className="flex-1 bg-[#1a2332] border border-[#2a3544] text-white py-2 rounded-lg hover:bg-[#252f3f] transition-colors font-medium">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              Showing page <span className="text-white">1</span> of <span className="text-blue-400">42</span>
            </p>
            <div className="flex items-center gap-1">
              <button className="px-3 py-2 text-gray-400 hover:text-white transition-colors">
                Previous
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-[#1a2332] hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-500 px-2">...</span>
              <button className="w-10 h-10 rounded-lg text-gray-400 hover:bg-[#1a2332] hover:text-white font-medium transition-colors">
                42
              </button>
              <button className="px-3 py-2 bg-[#1a2332] border border-[#2a3544] text-white rounded-lg hover:bg-[#252f3f] transition-colors ml-2">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentPool;
