import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Icons
const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Media & Entertainment',
  'Real Estate',
  'Non-Profit',
  'Other'
];

const Register = () => {
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Student form data
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Recruiter form data
  const [recruiterData, setRecruiterData] = useState({
    name: '',
    jobTitle: '',
    workEmail: '',
    companyName: '',
    password: '',
  });

  // Organization form data
  const [orgData, setOrgData] = useState({
    organizationName: '',
    officialEmail: '',
    websiteUrl: '',
    industry: '',
    password: '',
  });

  const handleStudentChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleRecruiterChange = (e) => {
    setRecruiterData({ ...recruiterData, [e.target.name]: e.target.value });
  };

  const handleOrgChange = (e) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData;
    let password;

    if (role === 'student') {
      formData = studentData;
      password = studentData.password;
    } else if (role === 'recruiter') {
      formData = recruiterData;
      password = recruiterData.password;
    } else {
      formData = orgData;
      password = orgData.password;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      // Build registration payload based on role
      const payload = {
        role,
        password,
        ...(role === 'student' && {
          name: studentData.name,
          email: studentData.email,
        }),
        ...(role === 'recruiter' && {
          name: recruiterData.name,
          email: recruiterData.workEmail,
          jobTitle: recruiterData.jobTitle,
          companyName: recruiterData.companyName,
        }),
        ...(role === 'organization' && {
          name: orgData.organizationName,
          email: orgData.officialEmail,
          websiteUrl: orgData.websiteUrl,
          industry: orgData.industry,
        }),
      };

      await register(payload);
      toast.success('Registration successful!');
      
      // Role-based redirect
      switch (role) {
        case 'recruiter':
          navigate('/recruiter/dashboard');
          break;
        case 'organization':
          navigate('/org/overview');
          break;
        case 'provider':
          navigate('/provider/dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const renderStudentForm = () => (
    <>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="Jane Doe"
          value={studentData.name}
          onChange={handleStudentChange}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="jane@example.com"
          value={studentData.email}
          onChange={handleStudentChange}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={8}
            className="w-full px-4 py-3 pr-12 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Create a password"
            value={studentData.password}
            onChange={handleStudentChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <p className="mt-1.5 text-xs text-gray-500">Must be at least 8 characters</p>
      </div>
    </>
  );

  const renderRecruiterForm = () => (
    <>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="e.g. John Doe"
          value={recruiterData.name}
          onChange={handleRecruiterChange}
        />
      </div>

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300 mb-2">
          Job Title
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          required
          className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="e.g. Senior Talent Acquisition"
          value={recruiterData.jobTitle}
          onChange={handleRecruiterChange}
        />
      </div>

      <div>
        <label htmlFor="workEmail" className="block text-sm font-medium text-gray-300 mb-2">
          Work Email
        </label>
        <input
          id="workEmail"
          name="workEmail"
          type="email"
          required
          className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="name@company.com"
          value={recruiterData.workEmail}
          onChange={handleRecruiterChange}
        />
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
          Company Name
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          required
          className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="e.g. Acme Corp"
          value={recruiterData.companyName}
          onChange={handleRecruiterChange}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={8}
            className="w-full px-4 py-3 pr-12 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Create a password"
            value={recruiterData.password}
            onChange={handleRecruiterChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <p className="mt-1.5 text-xs text-gray-500">Must be at least 8 characters</p>
      </div>
    </>
  );

  const renderOrganizationForm = () => (
    <>
      <div>
        <label htmlFor="organizationName" className="block text-sm font-medium text-gray-300 mb-2">
          Organization Name
        </label>
        <input
          id="organizationName"
          name="organizationName"
          type="text"
          required
          className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="Acme Inc."
          value={orgData.organizationName}
          onChange={handleOrgChange}
        />
      </div>

      <div>
        <label htmlFor="officialEmail" className="block text-sm font-medium text-gray-300 mb-2">
          Official Email
        </label>
        <input
          id="officialEmail"
          name="officialEmail"
          type="email"
          required
          className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="contact@acme.com"
          value={orgData.officialEmail}
          onChange={handleOrgChange}
        />
      </div>

      <div>
        <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-300 mb-2">
          Website URL
        </label>
        <input
          id="websiteUrl"
          name="websiteUrl"
          type="url"
          required
          className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="https://www.acme.com"
          value={orgData.websiteUrl}
          onChange={handleOrgChange}
        />
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
          Industry
        </label>
        <div className="relative">
          <select
            id="industry"
            name="industry"
            required
            className="w-full px-4 py-3 bg-[#1a2233] border border-[#2a3544] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer"
            value={orgData.industry}
            onChange={handleOrgChange}
          >
            <option value="" disabled className="text-gray-500">Select an industry</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry} className="bg-[#1a2233]">
                {industry}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDownIcon />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            minLength={8}
            className="w-full px-4 py-3 pr-12 bg-[#1a2233] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Create a password"
            value={orgData.password}
            onChange={handleOrgChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <p className="mt-1.5 text-xs text-gray-500">Must be at least 8 characters</p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0e17] py-20 px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8">
       
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-[#0f1623] border border-[#1e293b] rounded-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-400 text-sm">
            Join the AI-powered career network today.
          </p>
        </div>

        {/* Role Toggle - 3 options */}
        <div className="flex bg-[#1a2233] rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
              role === 'student'
                ? 'bg-[#2a3544] text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('recruiter')}
            className={`flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
              role === 'recruiter'
                ? 'bg-[#2a3544] text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Recruiter
          </button>
          <button
            type="button"
            onClick={() => setRole('organization')}
            className={`flex-1 py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
              role === 'organization'
                ? 'bg-[#2a3544] text-white'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Organization
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dynamic Form Fields based on Role */}
          {role === 'student' && renderStudentForm()}
          {role === 'recruiter' && renderRecruiterForm()}
          {role === 'organization' && renderOrganizationForm()}

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f1623] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Terms */}
          <p className="text-center text-xs text-gray-500">
            By clicking "Create Account", you agree to our{' '}
            <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>.
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2a3544]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#0f1623] text-gray-500 uppercase tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1a2233] border border-[#2a3544] text-gray-300 font-medium rounded-lg hover:bg-[#232d42] transition-colors"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1a2233] border border-[#2a3544] text-gray-300 font-medium rounded-lg hover:bg-[#232d42] transition-colors"
            >
              <LinkedInIcon />
              LinkedIn
            </button>
          </div>
        </form>
      </div>

      {/* Sign In Link */}
      <p className="mt-6 text-gray-400 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
