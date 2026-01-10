import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const JobsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const TalentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const MessagesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const NewChatIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const EmojiIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AttachmentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

const GifIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.5 9H13v6h-1.5zM9 9H6c-.6 0-1 .5-1 1v4c0 .5.4 1 1 1h3c.6 0 1-.5 1-1v-2H8.5v1.5h-2v-3H10V10c0-.5-.4-1-1-1zm10 1.5V9h-4.5v6H16v-2h2v-1.5h-2v-1z"/>
  </svg>
);

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Mock conversations data
const conversations = [
  {
    id: 1,
    name: 'Alex Smith',
    role: 'UI/UX Designer Applicant',
    avatar: 'AS',
    avatarBg: 'from-blue-500 to-blue-600',
    lastMessage: "I've attached the revised portfolio as r...",
    time: '2:45 PM',
    online: true,
    unread: 0,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Senior React Developer',
    avatar: 'SC',
    avatarBg: 'from-green-500 to-green-600',
    lastMessage: 'Sounds great! Looking forward to the i...',
    time: '11:20 AM',
    online: false,
    unread: 0,
  },
  {
    id: 3,
    name: 'Jane Doe',
    role: 'Video Editor',
    avatar: 'JD',
    avatarBg: 'from-purple-500 to-purple-600',
    lastMessage: 'The AI test was quite challenging but...',
    time: 'Yesterday',
    online: false,
    unread: 0,
  },
  {
    id: 4,
    name: 'David Miller',
    role: 'Product Manager',
    avatar: 'DM',
    avatarBg: 'from-orange-500 to-orange-600',
    lastMessage: 'Thanks for reaching out about the posi...',
    time: 'Mon',
    online: false,
    unread: 0,
  },
  {
    id: 5,
    name: 'Emily Wang',
    role: 'Data Scientist',
    avatar: 'EM',
    avatarBg: 'from-pink-500 to-pink-600',
    lastMessage: 'Can we reschedule our sync to 4pm?',
    time: '2 days ago',
    online: false,
    unread: 0,
  },
];

// Mock messages for selected conversation
const mockMessages = [
  {
    id: 1,
    sender: 'other',
    text: "Hello Marcus, I've just finished the SkillBridge AI design challenge. Should I upload the Figma link here or through the portal?",
    time: '10:15 AM',
  },
  {
    id: 2,
    sender: 'me',
    text: 'Great job, Alex! Please upload it through the portal for the AI to begin the verification process. You can also drop the link here for my personal review.',
    time: '10:20 AM',
    read: true,
  },
  {
    id: 3,
    sender: 'other',
    text: "Got it. I've attached the revised portfolio as requested in our last sync. I've focused more on the accessibility features for the dashboard project.",
    time: '2:45 PM',
    hasAttachment: true,
    attachment: {
      name: 'Portfolio_v2_AlexSmith.pdf',
      size: '4.2 MB',
      type: 'PDF',
    },
  },
];

// Mock team chats
const teamChats = [
  { name: 'Hiring Squad A', count: 3 },
  { name: 'Project Beta', count: null },
];

const RecruiterMessages = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');

  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/recruiter/dashboard' },
    { name: 'Active Jobs', icon: JobsIcon, path: '/recruiter/jobs' },
    { name: 'Talent Pool', icon: TalentIcon, path: '/recruiter/talent' },
    { name: 'Analytics', icon: AnalyticsIcon, path: '/recruiter/analytics' },
    { name: 'Messages', icon: MessagesIcon, path: '/recruiter/messages' },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle send message
      setMessageInput('');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f1419] border-r border-[#1e2d3d] flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">≡</span>
          </div>
          <div>
            <span className="text-white font-bold">SkillBridge AI</span>
            <div className="text-xs text-blue-400">RECRUITER PORTAL</div>
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
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-[#1a2332] hover:text-white'
                }`}
              >
                <item.icon />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Team Chats */}
        <div className="px-4 py-4 border-t border-[#1e2d3d]">
          <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Team Chats</h3>
          <div className="space-y-2">
            {teamChats.map((chat, index) => (
              <div key={index} className="flex items-center justify-between text-sm cursor-pointer hover:text-white text-gray-400">
                <span>{chat.name}</span>
                {chat.count && (
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">{chat.count}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* User Profile at bottom */}
        <div className="p-4 border-t border-[#1e2d3d] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
              <span className="text-white text-sm font-medium">MT</span>
            </div>
            <div>
              <div className="text-white font-medium text-sm">{user?.name || 'Marcus Thorne'}</div>
              <div className="text-gray-500 text-xs">Senior Recruiter</div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <SettingsIcon />
          </button>
        </div>
      </div>

      {/* Conversations List */}
      <div className="w-80 ml-64 bg-[#0f1419] border-r border-[#1e2d3d] flex flex-col h-screen fixed">
        {/* Header */}
        <div className="p-4 border-b border-[#1e2d3d] flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Messages</h2>
          <button className="text-gray-400 hover:text-white p-2">
            <NewChatIcon />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-[#1a2332] border border-[#2a3544] text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                selectedConversation?.id === conv.id
                  ? 'bg-blue-600/20 border-l-2 border-blue-500'
                  : 'hover:bg-[#1a2332]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${conv.avatarBg} flex items-center justify-center`}>
                    <span className="text-white font-medium">{conv.avatar}</span>
                  </div>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0f1419] rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium text-sm truncate">{conv.name}</span>
                    <span className="text-gray-500 text-xs">{conv.time}</span>
                  </div>
                  <p className="text-gray-400 text-xs truncate">{conv.role}</p>
                  <p className="text-gray-500 text-xs truncate mt-1">{conv.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className="flex-1 ml-[calc(256px+320px)] flex flex-col h-screen">
        {/* Chat Header */}
        <div className="bg-[#0f1419] border-b border-[#1e2d3d] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedConversation?.avatarBg} flex items-center justify-center`}>
              <span className="text-white font-medium text-sm">{selectedConversation?.avatar}</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{selectedConversation?.name}</h3>
              <p className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1a2332] transition-colors">
              <PhoneIcon />
            </button>
            <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1a2332] transition-colors">
              <VideoIcon />
            </button>
            <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1a2332] transition-colors">
              <InfoIcon />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0a0e17]">
          {/* Today */}
          <div className="flex justify-center">
            <span className="bg-[#1a2332] text-gray-400 text-xs px-3 py-1 rounded-full">TODAY</span>
          </div>

          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg rounded-2xl px-4 py-3 ${
                  msg.sender === 'me'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#1a2332] text-gray-200'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                
                {msg.hasAttachment && (
                  <div className="mt-3 bg-[#0f1419] rounded-lg p-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <DocumentIcon className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{msg.attachment.name}</p>
                      <p className="text-gray-400 text-xs">{msg.attachment.size} • {msg.attachment.type}</p>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <DownloadIcon />
                    </button>
                  </div>
                )}

                <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-500'}`}>
                    {msg.time}
                  </span>
                  {msg.sender === 'me' && msg.read && (
                    <span className="text-blue-200">
                      <CheckIcon />
                      <CheckIcon className="-ml-2" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-[#0f1419] border-t border-[#1e2d3d] p-4">
          <div className="bg-[#1a2332] rounded-xl p-3">
            <input
              type="text"
              placeholder={`Type a message to ${selectedConversation?.name}...`}
              className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none mb-3"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <PlusCircleIcon />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <EmojiIcon />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <AttachmentIcon />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <GifIcon />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs">Press Shift + Enter for a new line</span>
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  Send
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterMessages;
