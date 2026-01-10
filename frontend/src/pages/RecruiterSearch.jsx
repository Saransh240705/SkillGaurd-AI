import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Icons
const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Mock candidate data
const mockCandidates = [
  {
    id: 1,
    name: 'David Chen',
    role: 'Senior Front-end Dev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    avatarBg: 'from-blue-500 to-blue-600',
    skillScore: 98,
    completion: 99,
    skills: ['React.js', 'TypeScript', 'Next.js', 'Tailwind'],
  },
  {
    id: 2,
    name: 'Sarah Miller',
    role: 'Lead Product Designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    avatarBg: 'from-green-500 to-green-600',
    skillScore: 96,
    completion: 100,
    skills: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    id: 3,
    name: 'James Wilson',
    role: 'Data Scientist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    avatarBg: 'from-purple-500 to-purple-600',
    skillScore: 94,
    completion: 92,
    skills: ['Python', 'PyTorch', 'SQL', 'AWS'],
  },
  {
    id: 4,
    name: 'Emily Zhang',
    role: 'Video Editor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    avatarBg: 'from-pink-500 to-pink-600',
    skillScore: 91,
    completion: 98,
    skills: ['Premiere Pro', 'After Effects', 'Color Grading'],
  },
  {
    id: 5,
    name: 'Michael Torres',
    role: 'Mobile Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    avatarBg: 'from-orange-500 to-orange-600',
    skillScore: 89,
    completion: 94,
    skills: ['Swift', 'Kotlin', 'React Native'],
  },
  {
    id: 6,
    name: 'Lisa Patel',
    role: 'UX Researcher',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    avatarBg: 'from-teal-500 to-teal-600',
    skillScore: 93,
    completion: 96,
    skills: ['User Interviews', 'Usability Testing', 'Data Analysis'],
  },
];

const disciplines = [
  { name: 'Web Development', checked: true },
  { name: 'Graphic Design', checked: false },
  { name: 'Video Editing', checked: false },
  { name: 'Data Science', checked: false },
];

const RecruiterSearch = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [minSkillScore, setMinSkillScore] = useState(85);
  const [availableImmediately, setAvailableImmediately] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState(['React', 'Figma']);
  const [selectedDisciplines, setSelectedDisciplines] = useState(['Web Development']);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  const toggleDiscipline = (discipline) => {
    if (selectedDisciplines.includes(discipline)) {
      setSelectedDisciplines(selectedDisciplines.filter(d => d !== discipline));
    } else {
      setSelectedDisciplines([...selectedDisciplines, discipline]);
    }
  };

  const resetFilters = () => {
    setMinSkillScore(85);
    setAvailableImmediately(true);
    setSelectedSkills([]);
    setSelectedDisciplines([]);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Top Navbar */}
      <nav className="bg-[#0f1419] border-b border-[#1e2d3d] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">≡</span>
          </div>
          <span className="text-white font-bold">SkillBridge AI</span>
        </div>

        <div className="flex items-center space-x-8">
          <Link to="/recruiter/dashboard" className="text-gray-400 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link to="/recruiter/search" className="text-blue-400 font-medium">
            Talent Search
          </Link>
          <Link to="/recruiter/jobs" className="text-gray-400 hover:text-white transition-colors">
            Jobs
          </Link>
          <Link to="/recruiter/messages" className="text-gray-400 hover:text-white transition-colors">
            Messages
          </Link>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" 
            alt="Avatar" 
            className="w-full h-full rounded-full"
          />
        </div>
      </nav>

      <div className="flex">
        {/* Left Filters Panel */}
        <div className="w-64 bg-[#0f1419] border-r border-[#1e2d3d] min-h-[calc(100vh-73px)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <button onClick={resetFilters} className="text-blue-400 hover:text-blue-300 text-sm">
              Reset
            </button>
          </div>

          {/* Discipline */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Discipline</h3>
            <div className="space-y-2">
              {disciplines.map((discipline) => (
                <label key={discipline.name} className="flex items-center cursor-pointer">
                  <div 
                    onClick={() => toggleDiscipline(discipline.name)}
                    className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${
                      selectedDisciplines.includes(discipline.name)
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {selectedDisciplines.includes(discipline.name) && <CheckIcon />}
                  </div>
                  <span className="text-gray-400 text-sm">{discipline.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Min Skill Score */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium">Min Skill Score</h3>
              <span className="text-blue-400 font-medium">{minSkillScore}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={minSkillScore}
              onChange={(e) => setMinSkillScore(Number(e.target.value))}
              className="w-full h-2 bg-[#1a2332] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Availability</h3>
            <label className="flex items-center cursor-pointer">
              <div
                onClick={() => setAvailableImmediately(!availableImmediately)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  availableImmediately ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    availableImmediately ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </div>
              <span className="text-gray-400 text-sm ml-3">Available Immediately</span>
            </label>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Technical Skills</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedSkills.map((skill) => (
                <span 
                  key={skill} 
                  className="bg-[#1a2332] border border-[#2a3544] text-gray-300 px-3 py-1 rounded text-sm flex items-center gap-2"
                >
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="text-gray-500 hover:text-white">
                    <XIcon />
                  </button>
                </span>
              ))}
            </div>
            <button className="text-gray-400 text-sm hover:text-white">
              + Add skill...
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            <Link to="/recruiter/dashboard" className="hover:text-white">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Talent Search</span>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search by name, job title, or keywords (e.g., 'Senior React Developer')..."
                className="w-full pl-12 pr-4 py-3 bg-[#0f1419] border border-[#1e2d3d] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Search
            </button>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing <span className="text-white font-medium">124</span> candidates
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0f1419] border border-[#1e2d3d] text-white px-3 py-2 rounded-lg focus:outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="score">Highest Score</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {mockCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-5 hover:border-blue-500/50 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${candidate.avatarBg} flex items-center justify-center overflow-hidden`}>
                      <img src={candidate.avatar} alt={candidate.name} className="w-full h-full" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{candidate.name}</h3>
                      <p className="text-gray-400 text-sm">{candidate.role}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-blue-400 transition-colors">
                    <BookmarkIcon />
                  </button>
                </div>

                {/* Scores */}
                <div className="flex gap-6 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 uppercase mb-1">Skill Score</div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-white">{candidate.skillScore}</span>
                      <span className="text-gray-500 text-sm">/100</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase mb-1">Completion</div>
                    <div className="text-2xl font-bold text-green-400">{candidate.completion}%</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 uppercase mb-2">Top Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="bg-[#1a2332] border border-[#2a3544] text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Profile Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <button className="flex items-center gap-1 text-gray-400 hover:text-white px-3 py-2 transition-colors">
              <ChevronLeftIcon />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
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
                12
              </button>
            </div>

            <button className="flex items-center gap-1 text-gray-400 hover:text-white px-3 py-2 transition-colors">
              Next
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSearch;
