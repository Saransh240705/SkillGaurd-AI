import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OrgSidebar from '../components/OrgSidebar';

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
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

const CodeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const GradCapIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const MoreIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// Mock pipeline data
const pipelineColumns = [
  {
    id: 'verified',
    title: 'TOP VERIFIED',
    count: 12,
    color: 'bg-green-400',
    candidates: [
      {
        id: 1,
        name: 'Alex Chen',
        time: '2h ago',
        score: 98,
        task: 'Algo Optimization Task',
        university: 'Stanford University',
        skills: ['C++', 'Algorithms', 'System Design'],
        avatar: 'AC',
        avatarBg: 'from-blue-500 to-cyan-500',
      },
      {
        id: 2,
        name: 'Marcus Johnson',
        time: '5h ago',
        score: 94,
        task: 'Frontend Architecture',
        university: 'MIT',
        skills: ['React', 'TypeScript'],
        avatar: 'MJ',
        avatarBg: 'from-green-500 to-emerald-500',
      },
    ],
  },
  {
    id: 'shortlisted',
    title: 'SHORTLISTED',
    count: 5,
    color: 'bg-yellow-400',
    candidates: [
      {
        id: 3,
        name: 'Sarah Jenkins',
        time: '1d ago',
        score: 92,
        task: 'UX Case Study',
        university: 'Parsons School of Design',
        skills: ['Figma', 'User Research'],
        avatar: 'SJ',
        avatarBg: 'from-purple-500 to-pink-500',
      },
    ],
  },
  {
    id: 'interviewing',
    title: 'INTERVIEWING',
    count: 3,
    color: 'bg-blue-400',
    candidates: [
      {
        id: 4,
        name: 'David Okonjo',
        time: null,
        score: 88,
        task: null,
        label: 'TECHROUND',
        labelColor: 'bg-blue-600',
        scheduled: 'Scheduled: tomorrow, 2pm',
        avatar: 'DO',
        avatarBg: 'from-orange-500 to-red-500',
      },
    ],
  },
];

const OrgPipeline = () => {
  const { user } = useAuth();
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [universitySearch, setUniversitySearch] = useState('');
  const [minScore, setMinScore] = useState(80);
  const [viewMode, setViewMode] = useState('kanban');

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <OrgSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-2">
          Home <span className="mx-2">›</span> <span className="text-white">Talent Pipeline</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-white">Talent Pipeline</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-[#0f1419] border border-[#1e2d3d] rounded-lg p-1">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded ${viewMode === 'kanban' ? 'bg-[#1a2332] text-white' : 'text-gray-400 hover:text-white'}`}
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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2">
              <PlusIcon />
              Add Candidate
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Task Category</label>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#1a2332] border border-[#2a3544] text-white px-4 py-2.5 pr-10 rounded-lg focus:outline-none appearance-none min-w-[160px]"
              >
                <option>All Categories</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>Data Science</option>
                <option>Design</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex-1 max-w-sm">
            <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1">University</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search universities..."
                className="w-full pl-12 pr-4 py-2.5 bg-[#1a2332] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={universitySearch}
                onChange={(e) => setUniversitySearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 max-w-sm">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-gray-500 uppercase tracking-wider">Minimum AI Score</label>
              <span className="text-blue-400 font-medium">{minScore}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full h-2 bg-[#1a2332] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Pipeline Columns */}
        <div className="flex gap-6">
          {pipelineColumns.map((column) => (
            <div key={column.id} className="flex-1">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${column.color}`}></span>
                  <span className="text-gray-400 font-medium text-sm">{column.title}</span>
                  <span className="bg-[#1a2332] text-gray-400 px-2 py-0.5 rounded text-xs">{column.count}</span>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreIcon />
                </button>
              </div>

              {/* Candidate Cards */}
              <div className="space-y-4">
                {column.candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-4 hover:border-blue-500/30 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${candidate.avatarBg} flex items-center justify-center`}>
                          <span className="text-white text-sm font-medium">{candidate.avatar}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{candidate.name}</div>
                          {candidate.time && <div className="text-gray-500 text-xs">{candidate.time}</div>}
                          {candidate.label && (
                            <span className={`${candidate.labelColor} text-white text-xs px-2 py-0.5 rounded font-medium`}>
                              {candidate.label}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded font-bold text-lg">
                        {candidate.score}
                      </div>
                    </div>

                    {/* Task Info */}
                    {candidate.task && (
                      <div className="mb-2">
                        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                          <CodeIcon />
                          {candidate.task}
                        </div>
                        {candidate.university && (
                          <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-1">
                            <GradCapIcon />
                            {candidate.university}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Scheduled */}
                    {candidate.scheduled && (
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-2">
                        <CalendarIcon />
                        {candidate.scheduled}
                      </div>
                    )}

                    {/* Skills */}
                    {candidate.skills && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {candidate.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="bg-[#1a2332] border border-[#2a3544] text-gray-300 px-2 py-0.5 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action */}
                    {candidate.task ? (
                      <Link 
                        to={`/org/candidate/${candidate.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                      >
                        View Analysis <ArrowRightIcon />
                      </Link>
                    ) : (
                      <button className="text-gray-400 hover:text-white text-sm">
                        Manage Invite
                      </button>
                    )}

                    {/* Drag Handle */}
                    <div className="absolute right-4 bottom-4 text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="8" cy="6" r="1.5" />
                        <circle cx="16" cy="6" r="1.5" />
                        <circle cx="8" cy="12" r="1.5" />
                        <circle cx="16" cy="12" r="1.5" />
                        <circle cx="8" cy="18" r="1.5" />
                        <circle cx="16" cy="18" r="1.5" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgPipeline;
