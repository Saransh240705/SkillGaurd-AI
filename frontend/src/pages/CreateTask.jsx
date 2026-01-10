import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Icons
const CodeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const DesignIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const MegaphoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const FigmaIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-.098z"/>
  </svg>
);

const FileIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const CloudIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const categories = [
  { id: 'software', name: 'Software', icon: CodeIcon, color: 'from-blue-500 to-blue-600' },
  { id: 'design', name: 'Design', icon: DesignIcon, color: 'from-pink-500 to-pink-600' },
  { id: 'data-science', name: 'Data Science', icon: ChartIcon, color: 'from-green-500 to-green-600' },
  { id: 'marketing', name: 'Marketing', icon: MegaphoneIcon, color: 'from-yellow-500 to-orange-500' },
];

const difficulties = [
  { id: 'beginner', name: 'Beginner', description: 'Simple tasks suitable for students with foundational knowledge. (1-3 days)' },
  { id: 'intermediate', name: 'Intermediate', description: 'Requires specific tools or deeper understanding. (3-7 days)' },
  { id: 'advanced', name: 'Advanced', description: 'Complex problem solving or real-world project work. (1-2 weeks)' },
];

const submissionFormats = [
  { id: 'github', name: 'GitHub URL', icon: GitHubIcon },
  { id: 'figma', name: 'Figma Link', icon: FigmaIcon },
  { id: 'file', name: 'PDF / File Upload', icon: FileIcon },
];

const rewards = [
  { id: 'badge', name: 'AI-Verified Badge', description: 'Students who successfully complete this task will receive a verified skill badge on their profile.', emoji: '◆', checked: true },
  { id: 'interview', name: 'Direct Interview Invite', description: 'Promise a guaranteed interview for the top 3 submissions.', emoji: '📂', checked: false },
  { id: 'certificate', name: 'Certificate of Completion', description: 'Generate a branded PDF certificate for successful completion.', emoji: '🏆', checked: false },
];

const CreateTask = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 - Task Basics
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  
  // Step 2 - Requirements
  const [requirements, setRequirements] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  
  // Step 3 - Guidelines & Submission
  const [selectedFormats, setSelectedFormats] = useState(['github']);
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedRewards, setSelectedRewards] = useState(['badge']);

  const toggleFormat = (formatId) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(f => f !== formatId)
        : [...prev, formatId]
    );
  };

  const toggleReward = (rewardId) => {
    setSelectedRewards(prev => 
      prev.includes(rewardId) 
        ? prev.filter(r => r !== rewardId)
        : [...prev, rewardId]
    );
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = () => {
    // Here you would submit to the backend
    toast.success('Task created successfully!');
    navigate('/org/tasks');
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { number: 1, name: 'Task Basics' },
    { number: 2, name: 'Requirements' },
    { number: 3, name: 'Guidelines' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e17]">
      {/* Header */}
      <header className="bg-[#0f1419] border-b border-[#1e2d3d] px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/org/overview" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">✦</span>
            </div>
            <span className="text-white font-bold text-lg">SkillBridge AI</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <CloudIcon />
              <span>Draft Saved</span>
            </div>
            <button className="text-gray-400 hover:text-white">
              <BellIcon />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user?.name?.charAt(0) || 'U'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                  currentStep > step.number 
                    ? 'bg-blue-600 text-white' 
                    : currentStep === step.number 
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#1a2332] text-gray-400'
                }`}>
                  {currentStep > step.number ? <CheckIcon /> : step.number}
                </div>
                <span className={`text-xs mt-1 ${
                  currentStep >= step.number ? 'text-blue-400' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-20 h-0.5 mx-2 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-[#1e2d3d]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-2xl p-8">
          {/* Step 1: Task Basics */}
          {currentStep === 1 && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Create New Task</h1>
              <p className="text-gray-400 mb-8">Step 1: Define the basics to help us categorize your request.</p>
              
              {/* Task Title */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-white font-medium mb-3">
                  Task Title
                  <InfoIcon className="text-gray-400" />
                </label>
                <input
                  type="text"
                  placeholder="e.g., Build a React Component for Dashboard..."
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
              </div>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Select a Category</label>
                <div className="grid grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                        selectedCategory === category.id
                          ? 'bg-[#1a2332] border-blue-500'
                          : 'bg-[#1a2332] border-[#2a3544] hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-2`}>
                        <category.icon className="text-white" />
                      </div>
                      <span className="text-white text-sm">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Estimated Difficulty</label>
                <div className="space-y-3">
                  {difficulties.map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => setSelectedDifficulty(diff.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        selectedDifficulty === diff.id
                          ? 'bg-[#1a2332] border-blue-500'
                          : 'bg-[#1a2332] border-[#2a3544] hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedDifficulty === diff.id ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                        }`}>
                          {selectedDifficulty === diff.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div className="text-left">
                          <div className="text-white font-medium">{diff.name}</div>
                          <div className="text-gray-400 text-sm">{diff.description}</div>
                        </div>
                      </div>
                      {selectedDifficulty === diff.id && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <CheckIcon className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {currentStep === 2 && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Task Requirements</h1>
              <p className="text-gray-400 mb-8">Step 2: Define what skills are needed and describe the task in detail.</p>
              
              {/* Task Description */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Task Description</label>
                <textarea
                  placeholder="Describe the task in detail. What should students accomplish? What are the key deliverables?"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={6}
                  className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none"
                />
              </div>

              {/* Required Skills */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Required Skills</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add a skill (e.g., React, Python, Figma)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="flex-1 bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  />
                  <button
                    onClick={addSkill}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-600/20 text-blue-400 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-white">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Guidelines & Submission */}
          {currentStep === 3 && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Guidelines & Submission</h1>
              <p className="text-gray-400 mb-8">Step 3: Define how students submit their work, set the deadline, and choose rewards.</p>
              
              {/* Submission Requirements */}
              <div className="mb-6">
                <label className="text-white font-medium mb-1 block">Submission Requirements</label>
                <span className="text-gray-500 text-sm mb-3 block">Select allowed formats</span>
                <div className="grid grid-cols-3 gap-4">
                  {submissionFormats.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => toggleFormat(format.id)}
                      className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                        selectedFormats.includes(format.id)
                          ? 'bg-[#1a2332] border-blue-500'
                          : 'bg-[#1a2332] border-[#2a3544] hover:border-gray-500'
                      }`}
                    >
                      <div className="text-gray-400 mb-2">
                        <format.icon />
                      </div>
                      <span className="text-white text-sm">{format.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline & Deadline */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-white font-medium mb-1 block">Timeline & Deadline</label>
                  <span className="text-gray-500 text-sm mb-3 block">Due Date</span>
                  <div className="relative">
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-transparent mb-1 block">.</span>
                  <span className="text-gray-500 text-sm mb-3 block">Time (UTC)</span>
                  <div className="relative">
                    <input
                      type="time"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                      className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Task Visibility */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Task Visibility</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPublic(!isPublic)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      isPublic ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      isPublic ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                  <div>
                    <span className="text-white">Public (Visible to all students)</span>
                    <p className="text-gray-500 text-sm">Public tasks receive 3x more applications on average.</p>
                  </div>
                </div>
              </div>

              {/* Student Rewards */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">Student Rewards & Incentives</label>
                <div className="space-y-3">
                  {rewards.map((reward) => (
                    <button
                      key={reward.id}
                      onClick={() => toggleReward(reward.id)}
                      className={`w-full flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${
                        selectedRewards.includes(reward.id)
                          ? 'bg-[#1a2332] border-blue-500'
                          : 'bg-[#1a2332] border-[#2a3544] hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                        selectedRewards.includes(reward.id) 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-500'
                      }`}>
                        {selectedRewards.includes(reward.id) && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{reward.name}</span>
                          <span>{reward.emoji}</span>
                        </div>
                        <div className="text-gray-400 text-sm">{reward.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-[#1e2d3d]">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Back
              </button>
            ) : (
              <Link to="/org/tasks" className="text-gray-400 hover:text-white">
                Cancel
              </Link>
            )}
            
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              >
                Next: {steps[currentStep]?.name}
                <ArrowRightIcon />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Create Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
