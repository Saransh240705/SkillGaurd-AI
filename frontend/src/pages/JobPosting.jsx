import { useState } from 'react';
import toast from 'react-hot-toast';

const JobPosting = () => {
  const [formData, setFormData] = useState({
    title: 'Senior Motion Designer',
    department: 'Design & Creative',
    employmentType: 'Full-time',
    experienceLevel: 'Senior',
    location: 'Remote (US/EU)',
    description: '',
    skills: ['Adobe After Effects', 'Cinema 4D', 'Video Editing', 'Visual Storytelling'],
    difficulty: 'expert',
  });

  const [newSkill, setNewSkill] = useState('');
  const [suggestedSkills] = useState(['Figma', 'Blender', 'Typography']);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      handleChange('skills', [...formData.skills, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    handleChange('skills', formData.skills.filter(s => s !== skill));
  };

  const handleSubmit = () => {
    toast.success('Job posting created successfully!');
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-dark-text-secondary">
          Jobs &gt; New Posting
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Job Posting</h1>
            <p className="text-dark-text-secondary">
              Configure role details, required skills, and the AI verification task.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-dark-surface border border-dark-border text-white px-6 py-2 rounded-lg hover:bg-dark-card transition">
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition"
            >
              Publish Job
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Details */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl">📁</span>
                <h2 className="text-xl font-semibold text-white">Job Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                      Department / Category
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                    >
                      <option>Design & Creative</option>
                      <option>Engineering</option>
                      <option>Product</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                      Employment Type
                    </label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => handleChange('employmentType', e.target.value)}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                      Experience Level
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => handleChange('experienceLevel', e.target.value)}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                    >
                      <option>Junior</option>
                      <option>Mid</option>
                      <option>Senior</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                      Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-600"
                    >
                      <option>Remote (US/EU)</option>
                      <option>On-site</option>
                      <option>Hybrid</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-dark-text-secondary">
                      Job Description
                    </label>
                    <button className="text-sm text-primary-400 hover:text-primary-300">
                      Generate with AI
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="We are looking for a talented Senior Motion Designer..."
                    className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-white placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
              </div>
            </div>

            {/* Skills & Verification */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📌</span>
                  <h2 className="text-xl font-semibold text-white">Skills & Verification</h2>
                </div>
                <span className="bg-primary-600/20 text-primary-400 px-3 py-1 rounded-full text-xs font-medium">
                  AI POWERED
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                    Required Technical Skills
                  </label>
                  <div className="relative mb-3">
                    <input
                      type="text"
                      placeholder="Type to add skills (e.g. Figma, Python, Video Editing)..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newSkill.trim()) {
                          addSkill(newSkill.trim());
                        }
                      }}
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-4 py-2 pl-10 text-white placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary">
                      🔍
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => addSkill(skill)}
                        className="text-primary-400 hover:text-primary-300 text-sm underline"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                    Verification Task Difficulty
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={formData.difficulty === 'junior' ? 1 : formData.difficulty === 'mid' ? 2 : formData.difficulty === 'senior' ? 3 : 4}
                      onChange={(e) => {
                        const levels = ['junior', 'mid', 'senior', 'expert'];
                        handleChange('difficulty', levels[parseInt(e.target.value) - 1]);
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-dark-text-secondary">
                      <span>JUNIOR</span>
                      <span>MID</span>
                      <span>SENIOR</span>
                      <span>EXPERT</span>
                    </div>
                    <div className="text-primary-400 font-medium">
                      Level 4: Expert
                    </div>
                  </div>
                </div>

                <div className="bg-dark-surface border border-dark-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">📄</span>
                      <h3 className="font-semibold text-white">Recommended Assessment</h3>
                    </div>
                    <button className="text-sm text-primary-400 hover:text-primary-300">
                      Change Task
                    </button>
                  </div>
                  <p className="text-sm text-dark-text-secondary mb-3">
                    Based on "{formData.title}" &amp; "After Effects"
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="text-white font-medium">TASK ID: MD-404-KINETIC</div>
                    <div className="text-white">Product Launch Teaser (15s)</div>
                    <div className="text-dark-text-secondary">
                      Create a high-energy kinetic typography sequence revealing a fictional product name "Nebula". Assets provided: Brand palette, Logo SVG.
                    </div>
                    <div className="text-dark-text-secondary">
                      Evaluation Criteria: Timing, Easing smoothness, Render efficiency.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* AI Assistant */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🤖</span>
                <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <span className="text-green-400">✓</span>
                  <div className="text-sm text-dark-text-secondary">
                    The clarity score of your job description is <strong className="text-white">92/100</strong>. It balances technical needs with creative freedom.
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-yellow-400">💡</span>
                  <div className="text-sm text-dark-text-secondary">
                    For "Senior Motion Designer" roles, adding a requirement for <strong className="text-white">3D Compositing</strong> typically increases candidate quality by 15%.
                  </div>
                </div>
                <button
                  onClick={() => addSkill('3D Compositing')}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm transition"
                >
                  Add "3D Compositing"
                </button>
              </div>
            </div>

            {/* Talent Pool Estimate */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">TALENT POOL ESTIMATE</h3>
              <div className="text-4xl font-bold text-white mb-2">842</div>
              <div className="text-sm text-dark-text-secondary mb-4">verified candidates</div>
              <p className="text-sm text-dark-text-secondary mb-4">
                Matches your criteria for Motion Design + Expert Level.
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                  <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                  <div className="w-2 h-2 rounded-full bg-dark-border"></div>
                </div>
                <span className="text-xs text-dark-text-secondary">Active in last 7 days</span>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-600/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">?</span>
                </div>
                <p className="text-sm text-dark-text-secondary mb-4">
                  Need help defining a task? Our engineering team can help create custom verification challenges for niche roles.
                </p>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm transition">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;

