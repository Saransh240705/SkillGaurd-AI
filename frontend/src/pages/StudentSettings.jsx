import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const TasksIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const CertIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const StudentSettings = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('Profile');
  const [profileData, setProfileData] = useState({
    fullName: user?.name || 'Alex Chen',
    email: user?.email || 'alex.chen@university.edu',
    university: 'Stanford University',
    track: 'Software Engineering',
    year: 'Year 3',
    bio: 'Passionate about building scalable systems and solving algorithmic challenges.',
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskReminders: true,
    weeklyDigest: true,
    marketingEmails: false,
  });
  
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showScores: true,
    showCertifications: true,
  });

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard', badge: null },
    { name: 'Tasks', icon: TasksIcon, path: '/tasks', badge: 2 },
    { name: 'Certifications', icon: CertIcon, path: '/certifications', badge: null },
    { name: 'Analytics', icon: AnalyticsIcon, path: '/analytics', badge: null },
  ];

  const tabs = [
    { name: 'Profile', icon: UserIcon },
    { name: 'Notifications', icon: BellIcon },
    { name: 'Privacy', icon: EyeIcon },
    { name: 'Security', icon: LockIcon },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f1419] border-r border-[#1e2d3d] flex flex-col fixed h-full">
        {/* User Profile */}
        <div className="p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-white font-medium text-sm">{user?.name || 'Alex Chen'}</div>
            <div className="text-gray-500 text-xs uppercase tracking-wider">STUDENT ED.</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-gray-400 hover:bg-[#1a2332] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Settings at bottom */}
        <div className="p-3 border-t border-[#1e2d3d] space-y-1">
          <Link
            to="/settings"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-blue-600/20 text-blue-400"
          >
            <SettingsIcon />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogoutIcon />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors ${
                activeTab === tab.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#0f1419] border border-[#1e2d3d] text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#0f1419] border border-[#1e2d3d] rounded-xl p-6">
          {/* Profile Tab */}
          {activeTab === 'Profile' && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Profile Picture</h3>
                  <p className="text-gray-500 text-sm mb-3">JPG, PNG or GIF. Max size 2MB.</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Upload New
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">University</label>
                  <input
                    type="text"
                    value={profileData.university}
                    onChange={(e) => setProfileData({...profileData, university: e.target.value})}
                    className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Track / Major</label>
                  <input
                    type="text"
                    value={profileData.track}
                    onChange={(e) => setProfileData({...profileData, track: e.target.value})}
                    className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  rows={4}
                  className="w-full bg-[#1a2332] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'Notifications' && (
            <div className="space-y-6">
              <h3 className="text-white font-medium text-lg">Email Notifications</h3>
              
              {[
                { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account activity.' },
                { key: 'taskReminders', label: 'Task Reminders', desc: 'Get reminded about pending tasks and deadlines.' },
                { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Receive a weekly summary of your progress.' },
                { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive news about new features and updates.' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-[#1a2332] rounded-lg">
                  <div>
                    <div className="text-white font-medium">{item.label}</div>
                    <div className="text-gray-500 text-sm">{item.desc}</div>
                  </div>
                  <button
                    onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key]})}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      notifications[item.key] ? 'bg-blue-600' : 'bg-gray-600'
                    } relative`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                        notifications[item.key] ? 'right-1' : 'left-1'
                      }`}
                    ></span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'Privacy' && (
            <div className="space-y-6">
              <h3 className="text-white font-medium text-lg">Privacy Settings</h3>
              
              <div className="p-4 bg-[#1a2332] rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white font-medium">Profile Visibility</div>
                    <div className="text-gray-500 text-sm">Control who can see your profile.</div>
                  </div>
                  <div className="relative">
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                      className="bg-[#0f1419] border border-[#2a3544] text-white px-4 py-2 pr-10 rounded-lg focus:outline-none appearance-none"
                    >
                      <option value="public">Public</option>
                      <option value="recruiters">Recruiters Only</option>
                      <option value="private">Private</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#1a2332] rounded-lg">
                <div>
                  <div className="text-white font-medium">Show AI Scores</div>
                  <div className="text-gray-500 text-sm">Display your AI-verified scores on your public profile.</div>
                </div>
                <button
                  onClick={() => setPrivacy({...privacy, showScores: !privacy.showScores})}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.showScores ? 'bg-blue-600' : 'bg-gray-600'
                  } relative`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      privacy.showScores ? 'right-1' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#1a2332] rounded-lg">
                <div>
                  <div className="text-white font-medium">Show Certifications</div>
                  <div className="text-gray-500 text-sm">Display earned certifications on your profile.</div>
                </div>
                <button
                  onClick={() => setPrivacy({...privacy, showCertifications: !privacy.showCertifications})}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    privacy.showCertifications ? 'bg-blue-600' : 'bg-gray-600'
                  } relative`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      privacy.showCertifications ? 'right-1' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'Security' && (
            <div className="space-y-6">
              <h3 className="text-white font-medium text-lg">Security Settings</h3>
              
              <div className="p-4 bg-[#1a2332] rounded-lg">
                <h4 className="text-white font-medium mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0f1419] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0f1419] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#0f1419] border border-[#2a3544] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <h4 className="text-red-400 font-medium mb-2">Danger Zone</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="px-6 py-3 text-gray-400 hover:text-white transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;
