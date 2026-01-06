import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskService } from '../services/api';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';

const TaskMarketplace = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    difficulty: '',
    skill: '',
    status: 'active',
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(filters);
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
      case 'easy':
        return { bg: 'bg-green-500/20', text: 'text-green-400', dot: 'bg-green-500' };
      case 'intermediate':
      case 'medium':
        return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', dot: 'bg-yellow-500' };
      case 'advanced':
      case 'hard':
        return { bg: 'bg-red-500/20', text: 'text-red-400', dot: 'bg-red-500' };
      default:
        return { bg: 'bg-gray-500/20', text: 'text-gray-400', dot: 'bg-gray-500' };
    }
  };

  const getTaskIcon = (title) => {
    // Simple icon mapping based on task title/keywords
    if (title?.toLowerCase().includes('api') || title?.toLowerCase().includes('backend')) {
      return '🔧';
    } else if (title?.toLowerCase().includes('design') || title?.toLowerCase().includes('ui')) {
      return '🎨';
    } else if (title?.toLowerCase().includes('video') || title?.toLowerCase().includes('edit')) {
      return '🎬';
    } else if (title?.toLowerCase().includes('database') || title?.toLowerCase().includes('sql')) {
      return '💾';
    } else if (title?.toLowerCase().includes('security') || title?.toLowerCase().includes('auth')) {
      return '🔒';
    } else if (title?.toLowerCase().includes('performance') || title?.toLowerCase().includes('optimize')) {
      return '⚡';
    }
    return '📋';
  };

  const getOrgInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || 'O';
  };

  const formatDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { text: 'Expired', subtext: 'Closed', expired: true };
    } else if (diffDays === 0) {
      return { text: 'Today', subtext: 'Due today' };
    } else if (diffDays === 1) {
      return { text: '1 Day', subtext: 'Est. 2-3h work' };
    } else if (diffDays <= 7) {
      return { text: `${diffDays} Days`, subtext: `Est. ${diffDays * 2}h work` };
    } else {
      return { text: `${Math.ceil(diffDays / 7)} Weeks`, subtext: 'Long term' };
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />
      <div className="flex-1 ml-64 pt-16 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
          <p className="text-dark-text-secondary">
            Find verified tasks in Development, Design, Video, and Writing.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks, categories, or tags..."
                  className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 pl-10 text-white placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary">
                  🔍
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3 ml-4">
              <select
                className="bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
                value={filters.skill || ''}
                onChange={(e) => handleFilterChange('skill', e.target.value)}
              >
                <option value="">All Skills</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Python">Python</option>
                <option value="Node.js">Node.js</option>
              </select>
              <select
                className="bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
                value={filters.difficulty || ''}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              >
                <option value="">Difficulty: Any</option>
                <option value="beginner">Easy</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Hard</option>
              </select>
              <select
                className="bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">Duration: Any</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center space-x-2">
                <span>✨</span>
                <span>Random Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-dark-card border border-dark-border rounded-lg p-12 text-center">
            <p className="text-dark-text-secondary text-lg">No tasks found.</p>
          </div>
        ) : (
          <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-dark-border bg-dark-surface">
              <div className="col-span-4 text-sm font-semibold text-dark-text-secondary uppercase">
                TASK DETAILS
              </div>
              <div className="col-span-2 text-sm font-semibold text-dark-text-secondary uppercase">
                ORGANIZATION
              </div>
              <div className="col-span-2 text-sm font-semibold text-dark-text-secondary uppercase">
                DIFFICULTY
              </div>
              <div className="col-span-2 text-sm font-semibold text-dark-text-secondary uppercase">
                DEADLINE
              </div>
              <div className="col-span-2 text-sm font-semibold text-dark-text-secondary uppercase">
                ACTION
              </div>
            </div>

            {/* Tasks List */}
            <div className="divide-y divide-dark-border">
              {tasks.map((task) => {
                const difficultyStyle = getDifficultyColor(task.difficulty);
                const deadlineInfo = formatDeadline(task.deadline);
                const taskId = `#TKT-${task._id.slice(-4)}`;

                return (
                  <div
                    key={task._id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-dark-surface transition"
                  >
                    {/* Task Details */}
                    <div className="col-span-4 flex items-start space-x-3">
                      <span className="text-2xl mt-1">{getTaskIcon(task.title)}</span>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{task.title}</h3>
                        <p className="text-xs text-dark-text-secondary mb-2">{taskId}</p>
                        <div className="flex flex-wrap gap-2">
                          {task.requiredSkills?.slice(0, 2).map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-dark-surface text-primary-400 px-2 py-1 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Organization */}
                    <div className="col-span-2 flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                        {getOrgInitial(task.providerId?.name || task.providerId?.profile?.company)}
                      </div>
                      <span className="text-white text-sm">
                        {task.providerId?.name || task.providerId?.profile?.company || 'Unknown'}
                      </span>
                    </div>

                    {/* Difficulty */}
                    <div className="col-span-2 flex items-center">
                      <span
                        className={`${difficultyStyle.bg} ${difficultyStyle.text} px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2`}
                      >
                        <span className={`w-2 h-2 rounded-full ${difficultyStyle.dot}`}></span>
                        <span className="capitalize">{task.difficulty || 'N/A'}</span>
                      </span>
                    </div>

                    {/* Deadline */}
                    <div className="col-span-2">
                      <div className="text-white text-sm font-medium">{deadlineInfo.text}</div>
                      <div className="text-xs text-dark-text-secondary">{deadlineInfo.subtext}</div>
                    </div>

                    {/* Action */}
                    <div className="col-span-2">
                      {deadlineInfo.expired ? (
                        <button
                          disabled
                          className="bg-dark-surface text-dark-text-secondary px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
                        >
                          Closed
                        </button>
                      ) : (
                        <Link
                          to={`/tasks/${task._id}`}
                          className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                          View Task
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-dark-border flex items-center justify-center space-x-2">
              <button className="px-3 py-2 text-dark-text-secondary hover:text-white transition">
                &lt;
              </button>
              <button className="px-3 py-2 bg-primary-600 text-white rounded">1</button>
              <button className="px-3 py-2 text-dark-text-secondary hover:text-white transition">
                2
              </button>
              <button className="px-3 py-2 text-dark-text-secondary hover:text-white transition">
                3
              </button>
              <span className="px-2 text-dark-text-secondary">...</span>
              <button className="px-3 py-2 text-dark-text-secondary hover:text-white transition">
                12
              </button>
              <button className="px-3 py-2 text-dark-text-secondary hover:text-white transition">
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskMarketplace;
