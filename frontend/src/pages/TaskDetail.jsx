import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { taskService } from '../services/api';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const TaskDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const data = await taskService.getTask(id);
      setTask(data);
    } catch (error) {
      toast.error('Failed to load task');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-dark-bg pt-16 p-8">
        <p className="text-dark-text-secondary">Task not found.</p>
      </div>
    );
  }

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

  const difficultyStyle = getDifficultyColor(task.difficulty);
  const taskId = `#TKT-${id.slice(-4)}`;

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />
      <div className="flex-1 ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6 text-sm text-dark-text-secondary">
            Dashboard &gt; Tasks &gt; {task.requiredSkills[0] || 'Task'} &gt; {task.title}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                  Verified Task
                </span>
                <span className="text-dark-text-secondary text-sm">ID: {taskId}</span>
              </div>
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl font-bold text-white">{task.title}</h1>
                <div className="flex space-x-2">
                  <button className="bg-dark-surface border border-dark-border text-white px-4 py-2 rounded-lg hover:bg-dark-card transition">
                    Share
                  </button>
                  <button className="bg-dark-surface border border-dark-border text-white px-4 py-2 rounded-lg hover:bg-dark-card transition">
                    Save
                  </button>
                </div>
              </div>
              <p className="text-lg text-dark-text-secondary mb-8">{task.description}</p>

              {/* Project Scope */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl">📄</span>
                  <h2 className="text-xl font-semibold text-white">Project Scope</h2>
                </div>
                <p className="text-dark-text-secondary mb-4">{task.instructions}</p>
                <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
                  <div className="text-sm text-dark-text-secondary mb-2">Tools:</div>
                  <div className="flex flex-wrap gap-2">
                    {task.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-600/20 text-primary-400 px-3 py-1 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Requirements */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl">🔧</span>
                  <h2 className="text-xl font-semibold text-white">Technical Requirements</h2>
                </div>
                <ul className="space-y-2">
                  {task.evaluationCriteria.split('\n').filter(c => c.trim()).map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-primary-400 mt-1">✓</span>
                      <span className="text-dark-text-secondary">{req.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources & Documentation */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Resources & Documentation</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-surface border border-dark-border rounded-lg p-4 cursor-pointer hover:border-primary-600 transition">
                    <div className="text-2xl mb-2">📚</div>
                    <div className="text-sm font-medium text-white mb-1">Documentation</div>
                    <div className="text-xs text-dark-text-secondary">Official guides and references</div>
                  </div>
                  <div className="bg-dark-surface border border-dark-border rounded-lg p-4 cursor-pointer hover:border-primary-600 transition">
                    <div className="text-2xl mb-2">📦</div>
                    <div className="text-sm font-medium text-white mb-1">Starter Template</div>
                    <div className="text-xs text-dark-text-secondary">Base code and assets</div>
                  </div>
                </div>
              </div>

              {/* Submission Guidelines */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Submission Guidelines</h2>
                <ol className="space-y-4 list-decimal list-inside text-dark-text-secondary">
                  <li>
                    <strong className="text-white">Fork the Repository:</strong> Clone the official repository to your workspace and create a new branch.
                  </li>
                  <li>
                    <strong className="text-white">Run Tests:</strong> Execute the test suite and ensure all tests pass before submission.
                  </li>
                  <li>
                    <strong className="text-white">Submit Pull Request:</strong> Push your changes and open a PR with a clear description.
                  </li>
                </ol>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
                <div className="mb-4">
                  <span className="bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-xs font-medium">
                    OPEN FOR SUBMISSION
                  </span>
                </div>
                {user?.role === 'student' && task.status === 'active' ? (
                  <Link
                    to={`/tasks/${id}/submit`}
                    className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-medium transition mb-3"
                  >
                    Start Task
                  </Link>
                ) : (
                  <button
                    disabled
                    className="block w-full bg-dark-surface text-dark-text-secondary text-center py-3 rounded-lg font-medium cursor-not-allowed mb-3"
                  >
                    Not Available
                  </button>
                )}
                <p className="text-xs text-dark-text-secondary mb-4">
                  By starting, you agree to the{' '}
                  <a href="#" className="text-primary-400 hover:underline">
                    Contributor License Agreement
                  </a>
                  .
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">💰</span>
                    <div>
                      <div className="text-dark-text-secondary">Bounty</div>
                      <div className="text-white font-semibold">$500.00</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">📊</span>
                    <div>
                      <div className="text-dark-text-secondary">Difficulty</div>
                      <span className={`${difficultyStyle.bg} ${difficultyStyle.text} px-2 py-1 rounded text-xs`}>
                        {task.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">⏱️</span>
                    <div>
                      <div className="text-dark-text-secondary">Est. Time</div>
                      <div className="text-white font-semibold">~15 Hours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organization Card */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">ORGANIZATION</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold">
                    {task.providerId?.name?.charAt(0) || 'O'}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {task.providerId?.name || task.providerId?.profile?.company || 'Unknown'}
                    </div>
                    <a href="#" className="text-sm text-primary-400 hover:underline">
                      View Profile
                    </a>
                  </div>
                </div>
                <p className="text-sm text-dark-text-secondary mb-4">
                  {task.providerId?.profile?.bio || 'Leading organization in technology and innovation.'}
                </p>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-dark-surface border border-dark-border text-white py-2 rounded-lg text-sm hover:bg-dark-bg transition">
                    Follow
                  </button>
                  <button className="flex-1 bg-dark-surface border border-dark-border text-white py-2 rounded-lg text-sm hover:bg-dark-bg transition">
                    Website
                  </button>
                </div>
              </div>

              {/* Required Skills */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">REQUIRED SKILLS</h3>
                <div className="flex flex-wrap gap-2">
                  {task.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-dark-surface text-primary-400 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Similar Tasks */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">SIMILAR TASKS</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="text-white font-medium mb-1">Optimize API Response</div>
                    <div className="text-dark-text-secondary">Backend • $300</div>
                  </div>
                  <div className="text-sm">
                    <div className="text-white font-medium mb-1">React Component Library</div>
                    <div className="text-dark-text-secondary">Frontend • $450</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
