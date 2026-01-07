import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { submissionService, taskService } from '../services/api';
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';

const SubmissionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [submissionType, setSubmissionType] = useState('github');
  const [githubUrl, setGithubUrl] = useState('');
  const [file, setFile] = useState(null);
  const [code, setCode] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const data = await taskService.getTask(id);
      setTask(data);
    } catch (error) {
      toast.error('Failed to load task');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let submissionData = {
        taskId: id,
        submissionType,
      };

      if (submissionType === 'github') {
        if (!githubUrl) {
          toast.error('Please provide a GitHub URL');
          setLoading(false);
          return;
        }
        submissionData.githubRepo = { url: githubUrl };
      } else if (submissionType === 'file') {
        if (!file) {
          toast.error('Please select a file');
          setLoading(false);
          return;
        }
        submissionData.fileUpload = {
          filename: file.name,
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          storagePath: 'placeholder',
        };
      } else {
        if (!code.trim()) {
          toast.error('Please paste your code');
          setLoading(false);
          return;
        }
        // For code snippet, we'll treat it as a file submission
        submissionData.fileUpload = {
          filename: 'code.txt',
          originalName: 'code.txt',
          mimeType: 'text/plain',
          size: code.length,
          storagePath: 'placeholder',
        };
      }

      await submissionService.createSubmission(submissionData);
      toast.success('Submission created! Evaluation will begin shortly.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar />
      <div className="flex-1 ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <div className="mb-6 text-sm text-dark-text-secondary">
            Dashboard / Active Tasks / Task #{id.slice(-4)}
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{task.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-dark-text-secondary">
              <span>Task ID: #{id.slice(-4)}</span>
              <span>•</span>
              <span>Due in {Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days</span>
              <span className="ml-auto bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-xs">
                • In Progress
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Task Context */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Context */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl">ℹ️</span>
                  <h2 className="text-xl font-semibold text-white">Task Context</h2>
                </div>
                <p className="text-dark-text-secondary mb-4">{task.description}</p>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="text-sm font-semibold text-green-400 mb-2"># Requirement Checklist:</div>
                  <ul className="space-y-1 text-sm text-dark-text-secondary">
                    {task.requiredSkills.map((skill, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="text-green-400">✓</span>
                        <span>{skill} proficiency required</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Resources & Assets */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">RESOURCES & ASSETS</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-dark-surface border border-dark-border rounded-lg hover:border-primary-600 transition cursor-pointer">
                    <span className="text-xl">🔗</span>
                    <div>
                      <div className="text-sm font-medium text-white">Design_System_v2.fig</div>
                      <div className="text-xs text-dark-text-secondary">External Link</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-dark-surface border border-dark-border rounded-lg hover:border-primary-600 transition cursor-pointer">
                    <span className="text-xl">📄</span>
                    <div>
                      <div className="text-sm font-medium text-white">Walkthrough_Script.pdf</div>
                      <div className="text-xs text-dark-text-secondary">450 KB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Submission */}
            <div className="space-y-6">
              {/* Submission Method */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Submission Method</h2>
                <div className="flex space-x-2 mb-4 border-b border-dark-border">
                  <button
                    onClick={() => setSubmissionType('github')}
                    className={`px-4 py-2 text-sm font-medium transition ${
                      submissionType === 'github'
                        ? 'text-primary-400 border-b-2 border-primary-400'
                        : 'text-dark-text-secondary hover:text-white'
                    }`}
                  >
                    GitHub Repo
                  </button>
                  <button
                    onClick={() => setSubmissionType('file')}
                    className={`px-4 py-2 text-sm font-medium transition ${
                      submissionType === 'file'
                        ? 'text-primary-400 border-b-2 border-primary-400'
                        : 'text-dark-text-secondary hover:text-white'
                    }`}
                  >
                    Upload File
                  </button>
                  <button
                    onClick={() => setSubmissionType('code')}
                    className={`px-4 py-2 text-sm font-medium transition ${
                      submissionType === 'code'
                        ? 'text-primary-400 border-b-2 border-primary-400'
                        : 'text-dark-text-secondary hover:text-white'
                    }`}
                  >
                    Paste Code
                  </button>
                </div>

                {submissionType === 'github' && (
                  <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-white placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>
                )}

                {submissionType === 'file' && (
                  <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                      Upload Files
                    </label>
                    <div className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center hover:border-primary-600 transition cursor-pointer">
                      <div className="text-4xl mb-2">☁️</div>
                      <div className="text-sm text-white mb-1">Drag & drop files here, or click to browse</div>
                      <div className="text-xs text-dark-text-secondary">
                        Supports MP4, MOV, ZIP, PDF, PNG, JPG (Max 2GB per file)
                      </div>
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="mt-4 inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer">
                        Select Files
                      </label>
                    </div>
                  </div>
                )}

                {submissionType === 'code' && (
                  <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                      Source Code
                    </label>
                    <div className="bg-dark-surface border border-dark-border rounded-lg">
                      <div className="flex justify-between items-center px-4 py-2 border-b border-dark-border">
                        <span className="text-xs text-dark-text-secondary">main.py</span>
                        <span className="text-xs text-dark-text-secondary">Python 3.11</span>
                      </div>
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="# Paste your solution here..."
                        className="w-full bg-dark-surface text-white p-4 font-mono text-sm focus:outline-none resize-none"
                        rows={15}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Developer Notes */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Developer Notes (Optional)</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any implementation details, known issues, or specific instructions for the reviewer..."
                  className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-3 text-white placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
                  rows={6}
                />
              </div>

              {/* Submission Status */}
              <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-green-400">✓</span>
                  <span className="text-sm text-white font-medium">Ready for review</span>
                </div>
                <div className="text-xs text-dark-text-secondary mb-4">
                  {submissionType === 'code' && code && `Code pasted (approx ${code.split('\n').length} lines).`}
                  {submissionType === 'file' && file && `${file.name} selected.`}
                  {submissionType === 'github' && githubUrl && 'GitHub repo linked.'}
                  {!code && !file && !githubUrl && 'No attachments'}
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 bg-dark-surface border border-dark-border text-white px-6 py-3 rounded-lg font-medium hover:bg-dark-bg transition"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || (!githubUrl && !file && !code)}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <span>Submit Task</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;
