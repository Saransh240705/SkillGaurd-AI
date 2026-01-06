import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submissionService, authService } from '../services/api';
import Sidebar from '../components/Sidebar';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [submissionsData, userProfile] = await Promise.all([
        submissionService.getMySubmissions(),
        authService.getMe(),
      ]);
      setSubmissions(submissionsData);
      setUserData(userProfile);
    } catch (error) {
      toast.error('Failed to load dashboard data');
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

  // Process skill data for charts
  const skillData = {};
  if (userData?.verifiedSkills) {
    userData.verifiedSkills.forEach((vs) => {
      if (!skillData[vs.skill]) {
        skillData[vs.skill] = [];
      }
      skillData[vs.skill].push({
        date: new Date(vs.verifiedAt).toLocaleDateString(),
        score: vs.score,
      });
    });
  }

  const skillBreakdown = Object.entries(skillData).map(([skill, data]) => ({
    skill,
    averageScore:
      data.reduce((sum, d) => sum + d.score, 0) / data.length,
    highestScore: Math.max(...data.map((d) => d.score)),
    count: data.length,
  }));

  const completedTasks = submissions.filter(
    (s) => s.status === 'evaluated'
  ).length;
  const pendingTasks = submissions.filter((s) => s.status === 'pending' || s.status === 'evaluating').length;
  const avgScore = submissions
    .filter((s) => s.evaluationResult)
    .reduce((sum, s) => sum + (s.evaluationResult?.overallScore || 0), 0) /
    (submissions.filter((s) => s.evaluationResult).length || 1);

  // Chart colors for dark theme
  const chartColors = {
    grid: '#334155',
    text: '#cbd5e1',
    primary: '#3b82f6',
    secondary: '#10b981',
  };

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />
      <div className="flex-1 ml-64 pt-16 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Student'}
          </h1>
          <p className="text-dark-text-secondary">
            Software Engineering Track • Year 3
          </p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="bg-dark-card border border-dark-border rounded-lg px-4 py-2">
              <div className="text-xs text-dark-text-secondary uppercase">Percentile</div>
              <div className="text-lg font-semibold text-white">Top 12%</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-dark-text-secondary">Current Level</h3>
              <span className="text-2xl">📈</span>
            </div>
            <div className="flex items-baseline space-x-2 mb-2">
              <p className="text-3xl font-bold text-white">Level 4</p>
              <span className="text-sm text-primary-400">+1 Level</span>
            </div>
            <div className="w-full bg-dark-surface rounded-full h-2 mb-2">
              <div
                className="bg-primary-600 h-2 rounded-full"
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="text-xs text-dark-text-secondary">75% to Level 5</p>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-dark-text-secondary">Tasks Completed</h3>
              <span className="text-2xl">✓</span>
            </div>
            <div className="flex items-baseline space-x-2 mb-2">
              <p className="text-3xl font-bold text-white">{completedTasks}</p>
              <span className="text-sm text-primary-400">+3 this week</span>
            </div>
            <p className="text-sm text-dark-text-secondary">
              Maintained 95% completion rate.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-dark-text-secondary">Avg. AI Score</h3>
              <span className="text-2xl">🤖</span>
            </div>
            <div className="flex items-baseline space-x-2 mb-2">
              <p className="text-3xl font-bold text-white">{Math.round(avgScore)}/100</p>
              <span className="text-sm text-primary-400">+5%</span>
            </div>
            <p className="text-sm text-dark-text-secondary">
              Based on last 10 verified submissions.
            </p>
          </div>
        </div>

        {/* Skill Proficiency */}
        {skillBreakdown.length > 0 && (
          <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Skill Proficiency</h2>
              <Link
                to="/analytics"
                className="text-sm text-primary-400 hover:text-primary-300"
              >
                View Detailed Report
              </Link>
            </div>
            <div className="space-y-4">
              {skillBreakdown.slice(0, 4).map((skill) => (
                <div key={skill.skill}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">{skill.skill}</span>
                    <span className="text-sm text-dark-text-secondary">
                      {Math.round(skill.averageScore)}%
                    </span>
                  </div>
                  <div className="w-full bg-dark-surface rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${skill.averageScore}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Insight */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center">
              <span className="mr-2">💡</span> AI INSIGHT
            </h2>
            <p className="text-dark-text-secondary">
              Your debugging speed is <strong className="text-white">2x faster</strong> than the average for Level 4. Focus on <strong className="text-white">Time Complexity</strong> in your next algorithm task.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="text-xs bg-dark-surface text-primary-400 px-2 py-1 rounded">#efficiency</span>
              <span className="text-xs bg-dark-surface text-primary-400 px-2 py-1 rounded">#algorithms</span>
            </div>
          </div>
        </div>

        {/* Recent Task Log */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Recent Task Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-dark-text-secondary">TASK NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-dark-text-secondary">DATE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-dark-text-secondary">DIFFICULTY</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-dark-text-secondary">AI SCORE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-dark-text-secondary">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-dark-text-secondary">
                      No submissions yet.
                    </td>
                  </tr>
                ) : (
                  submissions.slice(0, 5).map((submission) => (
                    <tr key={submission._id} className="border-b border-dark-border hover:bg-dark-surface transition">
                      <td className="py-3 px-4 text-white font-medium">
                        {submission.taskId?.title || 'Unknown Task'}
                      </td>
                      <td className="py-3 px-4 text-dark-text-secondary text-sm">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-dark-surface text-dark-text-secondary">
                          {submission.taskId?.difficulty || 'N/A'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white font-semibold">
                        {submission.evaluationResult?.overallScore || 'N/A'}/100
                      </td>
                      <td className="py-3 px-4">
                        {submission.status === 'evaluated' ? (
                          <span className="text-primary-400">✓ Verified</span>
                        ) : submission.status === 'evaluating' ? (
                          <span className="text-yellow-400">Pending</span>
                        ) : (
                          <span className="text-dark-text-secondary">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recommended Next */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-2">Recommended Next</h2>
          <p className="text-sm text-dark-text-secondary mb-4">
            Based on your lowest score in Data Structures.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Binary Search Trees</h3>
              <p className="text-sm text-dark-text-secondary">EST. 45 MIN • HARD</p>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Start Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
