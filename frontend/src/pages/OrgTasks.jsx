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

const PencilIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const CogIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ArchiveIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Mini bar chart component
const TrendBars = ({ data, color }) => (
  <div className="flex items-end gap-0.5 h-6">
    {data.map((value, index) => (
      <div
        key={index}
        className={`w-1.5 ${color} rounded-sm`}
        style={{ height: `${(value / 100) * 100}%` }}
      ></div>
    ))}
  </div>
);

// Mock tasks data
const tasksData = [
  { 
    id: 1, 
    name: 'Backend API Refactor', 
    taskId: '#SK-8821', 
    updated: 'Updated 2h ago',
    category: 'Python', 
    categoryColor: 'bg-blue-600', 
    status: 'Live', 
    statusColor: 'text-green-400',
    submissions: 124,
    avgScore: 92,
    trend: [60, 75, 80, 90, 85, 95, 100],
    trendColor: 'bg-green-400'
  },
  { 
    id: 2, 
    name: 'Frontend Dashboard UI', 
    taskId: '#SK-9942', 
    updated: 'Updated 1d ago',
    category: 'React', 
    categoryColor: 'bg-cyan-500', 
    status: 'Reviewing', 
    statusColor: 'text-yellow-400',
    submissions: 18,
    avgScore: 78,
    trend: [40, 50, 45, 60, 55, 70, 65],
    trendColor: 'bg-yellow-400'
  },
  { 
    id: 3, 
    name: 'Machine Learning Model', 
    taskId: '#SK-3310', 
    updated: 'Updated 5h ago',
    category: 'Data Science', 
    categoryColor: 'bg-orange-500', 
    status: 'Draft', 
    statusColor: 'text-gray-400',
    submissions: null,
    avgScore: null,
    trend: null,
    trendColor: null
  },
  { 
    id: 4, 
    name: 'Mobile Auth Flow', 
    taskId: '#SK-4155', 
    updated: 'Updated 2d ago',
    category: 'Swift', 
    categoryColor: 'bg-orange-400', 
    status: 'Live', 
    statusColor: 'text-green-400',
    submissions: 56,
    avgScore: 88,
    trend: [50, 60, 70, 80, 85, 90, 95],
    trendColor: 'bg-green-400'
  },
  { 
    id: 5, 
    name: 'Legacy System Migration', 
    taskId: '#SK-1029', 
    updated: 'Updated 1w ago',
    category: 'Java', 
    categoryColor: 'bg-red-500', 
    status: 'Completed', 
    statusColor: 'text-blue-400',
    submissions: 89,
    avgScore: 95,
    trend: null,
    trendColor: null
  },
];

const OrgTasks = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Category');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [currentPage, setCurrentPage] = useState(1);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <OrgSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">My Tasks</h1>
            <p className="text-gray-400">Manage your task library and monitor performance metrics.</p>
          </div>
          <Link to="/org/tasks/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium flex items-center gap-2">
            <PlusIcon />
            Create New Task
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search tasks by name or ID..."
                className="w-full pl-12 pr-4 py-2.5 bg-[#1a2332] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#1a2332] border border-[#2a3544] text-white px-4 py-2.5 pr-10 rounded-lg focus:outline-none appearance-none"
              >
                <option>Category</option>
                <option>Python</option>
                <option>React</option>
                <option>Data Science</option>
                <option>Swift</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#1a2332] border border-[#2a3544] text-white px-4 py-2.5 pr-10 rounded-lg focus:outline-none appearance-none"
              >
                <option>Status</option>
                <option>Live</option>
                <option>Reviewing</option>
                <option>Draft</option>
                <option>Completed</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <div className="text-gray-400 text-sm">
              Sort by: <span className="text-white">Newest</span> ▼
            </div>
            <div className="text-gray-400 text-sm">
              Showing <span className="text-white">1-10</span> of <span className="text-white">42</span>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-[#1e2d3d]">
                <th className="px-6 py-4 font-medium">Task Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Submissions</th>
                <th className="px-6 py-4 font-medium">Avg AI Score</th>
                <th className="px-6 py-4 font-medium">7-Day Trend</th>
                <th className="px-6 py-4 font-medium">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2d3d]">
              {tasksData.map((task) => (
                <tr key={task.id} className="hover:bg-[#1a2332] transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{task.name}</div>
                    <div className="text-gray-500 text-xs">ID: {task.taskId} • {task.updated}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${task.categoryColor} text-white text-xs px-2.5 py-1 rounded font-medium`}>
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${task.statusColor} flex items-center gap-1.5`}>
                      <span className={`w-2 h-2 rounded-full ${
                        task.status === 'Live' ? 'bg-green-400' : 
                        task.status === 'Reviewing' ? 'bg-yellow-400' : 
                        task.status === 'Completed' ? 'bg-blue-400' : 'bg-gray-400'
                      }`}></span>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{task.submissions || '-'}</td>
                  <td className="px-6 py-4">
                    {task.avgScore ? (
                      <span className={getScoreColor(task.avgScore)}>{task.avgScore}%</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {task.trend ? (
                      <TrendBars data={task.trend} color={task.trendColor} />
                    ) : (
                      <span className="text-gray-500 text-sm italic">No data yet</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {task.status === 'Completed' ? (
                        <>
                          <button className="p-2 text-gray-400 hover:text-white rounded hover:bg-[#2a3544] transition-colors">
                            <EyeIcon />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white rounded hover:bg-[#2a3544] transition-colors">
                            <ArchiveIcon />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="p-2 text-gray-400 hover:text-white rounded hover:bg-[#2a3544] transition-colors">
                            <PencilIcon />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white rounded hover:bg-[#2a3544] transition-colors">
                            <CogIcon />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-[#1e2d3d] flex items-center justify-between">
            <p className="text-gray-500 text-sm">
              Showing <span className="text-white">1 to 10</span> of <span className="text-blue-400">42</span> results
            </p>
            <div className="flex items-center gap-1">
              <button className="p-2 text-gray-400 hover:text-white rounded hover:bg-[#2a3544] transition-colors">
                <ChevronLeftIcon />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-[#2a3544] hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="text-gray-500 px-2">...</span>
              <button className="w-8 h-8 rounded text-gray-400 hover:bg-[#2a3544] hover:text-white font-medium transition-colors">
                8
              </button>
              <button className="p-2 text-gray-400 hover:text-white rounded hover:bg-[#2a3544] transition-colors">
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgTasks;
