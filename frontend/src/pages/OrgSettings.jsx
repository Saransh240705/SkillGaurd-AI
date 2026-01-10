import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OrgSidebar from '../components/OrgSidebar';

// Icons
const UploadIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const OrgSettings = () => {
  const { user} = useAuth();
  const [activeTab, setActiveTab] = useState('General');
  const [orgName, setOrgName] = useState('TechCorp Inc.');
  const [websiteUrl, setWebsiteUrl] = useState('https://techcorp.io');
  const [industrySector, setIndustrySector] = useState('Software & Technology');
  const [contactEmail, setContactEmail] = useState('admin@techcorp.io');
  const [gradingSensitivity, setGradingSensitivity] = useState(50);
  const [plagiarismDetection, setPlagiarismDetection] = useState(true);
  const [identityVerification, setIdentityVerification] = useState(false);

  const tabs = ['General', 'Team', 'Billing', 'Integrations'];

  const getSensitivityLabel = () => {
    if (gradingSensitivity <= 33) return 'Lenient';
    if (gradingSensitivity <= 66) return 'Balanced';
    return 'Strict';
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <OrgSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-1">Organization Settings</h1>
          <p className="text-gray-400">Manage your company profile, team access, and AI configurations.</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#1e2d3d] mb-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Company Profile Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-6">Company Profile</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Logo Upload */}
            <div>
              <label className="text-gray-400 text-sm block mb-2">Company Logo</label>
              <div className="border-2 border-dashed border-[#2a3544] rounded-xl p-8 flex flex-col items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-[#1a2332] rounded-full flex items-center justify-center mb-4">
                  <UploadIcon className="text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm">Click to upload</p>
                <p className="text-gray-500 text-xs">SVG, PNG, JPG (max. 2MB)</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Website URL</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <GlobeIcon className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full bg-[#1a2332] border border-[#2a3544] text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Industry Sector</label>
                <div className="relative">
                  <select
                    value={industrySector}
                    onChange={(e) => setIndustrySector(e.target.value)}
                    className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 pr-10 rounded-lg focus:outline-none appearance-none"
                  >
                    <option>Software & Technology</option>
                    <option>Finance & Banking</option>
                    <option>Healthcare</option>
                    <option>E-commerce</option>
                    <option>Education</option>
                  </select>
                  <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">Contact Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Verification & Grading Section */}
        <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Verification & Grading</h2>
              <p className="text-gray-400 text-sm">Configure how SkillBridge AI evaluates candidates.</p>
            </div>
            <span className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wider">
              Beta Feature
            </span>
          </div>

          {/* AI Grading Sensitivity */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-medium">AI Grading Sensitivity</span>
              <span className="text-blue-400 font-medium">{getSensitivityLabel()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={gradingSensitivity}
              onChange={(e) => setGradingSensitivity(Number(e.target.value))}
              className="w-full h-2 bg-[#1a2332] rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-gray-500 text-sm mt-2">
              <span>Lenient</span>
              <span>Balanced</span>
              <span>Strict</span>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#1a2332] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <CodeIcon className="text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Code Plagiarism Detection</div>
                  <div className="text-gray-400 text-sm">Flag submissions that match public repositories or known solutions.</div>
                </div>
              </div>
              <button
                onClick={() => setPlagiarismDetection(!plagiarismDetection)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  plagiarismDetection ? 'bg-blue-600' : 'bg-gray-600'
                } relative`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    plagiarismDetection ? 'right-1' : 'left-1'
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#1a2332] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <ShieldIcon className="text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Require Identity Verification</div>
                  <div className="text-gray-400 text-sm">Candidates must verify ID before starting assessments.</div>
                </div>
              </div>
              <button
                onClick={() => setIdentityVerification(!identityVerification)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  identityVerification ? 'bg-blue-600' : 'bg-gray-600'
                } relative`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    identityVerification ? 'right-1' : 'left-1'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrgSettings;
