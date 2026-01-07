import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recruiterService } from '../services/api';
import toast from 'react-hot-toast';

const RecruiterSearch = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    skills: '',
    minScore: '85',
    institution: '',
    year: '',
    discipline: [],
    available: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    fetchStudents();
  }, [filters, searchQuery]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await recruiterService.searchStudents(filters);
      setStudents(data);
    } catch (error) {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleDiscipline = (discipline) => {
    const current = filters.discipline || [];
    if (current.includes(discipline)) {
      handleFilterChange('discipline', current.filter(d => d !== discipline));
    } else {
      handleFilterChange('discipline', [...current, discipline]);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const getTopSkills = (student) => {
    if (!student.verifiedSkills || student.verifiedSkills.length === 0) return [];
    return student.verifiedSkills
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(vs => vs.skill);
  };

  const getSkillScore = (student) => {
    if (!student.verifiedSkills || student.verifiedSkills.length === 0) return 0;
    const scores = student.verifiedSkills.map(vs => vs.score);
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const getCompletionRate = (student) => {
    // Mock completion rate - in real app, calculate from submissions
    return Math.floor(Math.random() * 10) + 90;
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-16">
      <div className="flex">
        {/* Left Sidebar - Filters */}
        <div className="w-64 bg-dark-surface border-r border-dark-border min-h-screen pt-8 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Filters</h2>
            <button
              onClick={() => setFilters({ skills: '', minScore: '85', institution: '', year: '', discipline: [], available: false })}
              className="text-sm text-primary-400 hover:text-primary-300"
            >
              Reset
            </button>
          </div>

          {/* Discipline */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Discipline</h3>
            <div className="space-y-2">
              {['Web Development', 'Graphic Design', 'Video Editing', 'Data Science', 'Mobile Development', 'UX Research'].map((disc) => (
                <label key={disc} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.discipline?.includes(disc)}
                    onChange={() => toggleDiscipline(disc)}
                    className="w-4 h-4 rounded border-dark-border bg-dark-card text-primary-600 focus:ring-primary-600"
                  />
                  <span className="text-sm text-dark-text-secondary">{disc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Min Skill Score */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Min Skill Score</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minScore}
                onChange={(e) => handleFilterChange('minScore', e.target.value)}
                className="w-full"
              />
              <div className="text-sm text-primary-400 font-medium">{filters.minScore}+</div>
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white mb-3">Availability</h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.available}
                onChange={(e) => handleFilterChange('available', e.target.checked)}
                className="w-4 h-4 rounded border-dark-border bg-dark-card text-primary-600 focus:ring-primary-600"
              />
              <span className="text-sm text-dark-text-secondary">Available Immediately</span>
            </label>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Technical Skills</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {filters.skills.split(',').filter(s => s.trim()).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs flex items-center space-x-2"
                >
                  <span>{skill.trim()}</span>
                  <button
                    onClick={() => handleFilterChange('skills', filters.skills.split(',').filter(s => s.trim() !== skill.trim()).join(','))}
                    className="hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              placeholder="+ Add skill..."
              className="w-full bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleFilterChange('skills', filters.skills ? `${filters.skills},${e.target.value.trim()}` : e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Breadcrumbs */}
          <div className="mb-6 text-sm text-dark-text-secondary">
            Dashboard / Talent Search
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by name, job title, or keywords (e.g., 'Senior React Developer')..."
                  className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 pl-10 text-white placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary">
                  🔍
                </span>
              </div>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition">
                Search
              </button>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-dark-text-secondary">
              Showing {students.length} candidates.
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="score">Sort by: Score</option>
              <option value="recent">Sort by: Recent</option>
            </select>
          </div>

          {/* Candidate Cards */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : students.length === 0 ? (
            <div className="bg-dark-card border border-dark-border rounded-lg p-12 text-center">
              <p className="text-dark-text-secondary text-lg">No candidates found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => {
                const skillScore = getSkillScore(student);
                const completion = getCompletionRate(student);
                const topSkills = getTopSkills(student);

                return (
                  <div
                    key={student._id}
                    className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-primary-600 transition relative"
                  >
                    <button className="absolute top-4 right-4 text-dark-text-secondary hover:text-white">
                      🔖
                    </button>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                        {getInitials(student.name)}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{student.name}</h3>
                        <p className="text-sm text-dark-text-secondary">
                          {student.profile?.title || 'Developer'}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-dark-text-secondary mb-1">SKILL SCORE</div>
                        <div className="text-2xl font-bold text-white">{skillScore}/100</div>
                      </div>
                      <div>
                        <div className="text-xs text-dark-text-secondary mb-1">COMPLETION</div>
                        <div className="text-2xl font-bold text-white">{completion}%</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-dark-text-secondary mb-2">TOP SKILLS</div>
                      <div className="flex flex-wrap gap-2">
                        {topSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-dark-surface text-primary-400 px-2 py-1 rounded text-xs cursor-pointer hover:bg-primary-600/20 transition"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      to={`/recruiter/student/${student._id}`}
                      className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-2 rounded-lg font-medium transition"
                    >
                      View Profile
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {students.length > 0 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button className="px-4 py-2 text-dark-text-secondary hover:text-white transition">
                &lt; Previous
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded">1</button>
              <button className="px-4 py-2 text-dark-text-secondary hover:text-white transition">
                2
              </button>
              <button className="px-4 py-2 text-dark-text-secondary hover:text-white transition">
                3
              </button>
              <span className="px-2 text-dark-text-secondary">...</span>
              <button className="px-4 py-2 text-dark-text-secondary hover:text-white transition">
                12
              </button>
              <button className="px-4 py-2 text-dark-text-secondary hover:text-white transition">
                Next &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterSearch;
