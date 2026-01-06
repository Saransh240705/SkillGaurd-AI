import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskService, submissionService } from '../services/api';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';

const ProviderDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getMyTasks();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.deleteTask(taskId);
      toast.success('Task deleted');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />
      <div className="flex-1 ml-64 pt-16 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Tasks</h1>
          <Link
            to="/tasks/new"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Create New Task
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-dark-card border border-dark-border rounded-lg p-12 text-center">
            <p className="text-dark-text-secondary text-lg mb-4">No tasks created yet.</p>
            <Link
              to="/tasks/new"
              className="text-primary-400 hover:text-primary-300"
            >
              Create your first task →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-primary-600 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {task.title}
                    </h3>
                    <p className="text-dark-text-secondary mb-4">{task.description}</p>
                    <div className="flex gap-4 text-sm text-dark-text-secondary">
                      <span>Status: <span className="text-white capitalize">{task.status}</span></span>
                      <span>Submissions: <span className="text-white">{task.currentSubmissions}</span></span>
                      <span>
                        Deadline: <span className="text-white">{new Date(task.deadline).toLocaleDateString()}</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link
                      to={`/tasks/${task._id}/submissions`}
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      View Submissions
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
