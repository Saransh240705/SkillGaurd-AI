import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recruiterService } from '../services/api';
import toast from 'react-hot-toast';

const StudentProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const data = await recruiterService.getStudentProfile(id);
      setProfile(data);
    } catch (error) {
      toast.error('Failed to load student profile');
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-dark-bg pt-16 p-8">
        <p className="text-dark-text-secondary">Student profile not found.</p>
      </div>
    );
  }

  // Group verifications by category
  const getCategory = (title) => {
    const t = title?.toLowerCase() || '';
    if (t.includes('ui') || t.includes('design') || t.includes('figma')) return 'GRAPHIC DESIGN';
    if (t.includes('react') || t.includes('frontend') || t.includes('javascript')) return 'FRONTEND DEV';
    if (t.includes('video') || t.includes('edit') || t.includes('motion')) return 'VIDEO EDITING';
    if (t.includes('backend') || t.includes('api') || t.includes('server')) return 'BACKEND DEV';
    return 'OTHER';
  };

  // Get top 3 skills for proficiency summary
  const topSkills = profile.skillStatistics
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 3);

  // Calculate completion rate
  const completionRate = profile.submissions.length > 0
    ? Math.round((profile.submissions.filter(s => s.status === 'evaluated').length / profile.submissions.length) * 100)
    : 0;

  // Get average rating (mock for now)
  const avgRating = 4.9;

  return (
    <div className="min-h-screen bg-dark-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-dark-text-secondary">
          Dashboard &gt; Candidates &gt; Product Design &amp; Dev &gt; {profile.student.name}
        </div>

        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                Verified Top 5% Talent
              </span>
              <span className="text-dark-text-secondary text-sm">#{id.slice(-4)}-CD</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{profile.student.name}</h1>
            <p className="text-dark-text-secondary text-lg max-w-3xl">
              {profile.student.profile?.bio || 'Multidisciplinary Designer & Frontend Developer. Specializing in bridging the gap between design systems and production code.'}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-dark-surface border border-dark-border text-white px-6 py-2 rounded-lg hover:bg-dark-card transition">
              Contact
            </button>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition">
              Resume
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Verified Proficiency Summary */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Verified Proficiency Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topSkills.map((skill, idx) => {
                  const verification = profile.verifications.find(v => 
                    Object.keys(v.skillBreakdown || {}).includes(skill.skill)
                  );
                  const count = profile.verifications.filter(v => 
                    Object.keys(v.skillBreakdown || {}).includes(skill.skill)
                  ).length;
                  
                  return (
                    <div key={idx} className="bg-dark-card border border-dark-border rounded-lg p-6">
                      <div className="text-sm text-dark-text-secondary mb-2">{skill.skill}</div>
                      <div className="text-3xl font-bold text-white mb-2">
                        {Math.round(skill.averageScore)}/100
                      </div>
                      <div className="w-full bg-dark-surface rounded-full h-2 mb-3">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${skill.averageScore}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-dark-text-secondary">
                        Verified via {count} {count === 1 ? 'task' : 'tasks'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verified Portfolio & Tasks */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Verified Portfolio & Tasks</h2>
                <span className="text-sm text-dark-text-secondary">
                  Showing {Math.min(3, profile.verifications.length)} of {profile.verifications.length} verified tasks
                </span>
              </div>
              <div className="space-y-6">
                {profile.verifications.slice(0, 3).map((verification) => {
                  const category = getCategory(verification.taskId?.title);
                  const daysAgo = Math.floor((new Date() - new Date(verification.verifiedAt)) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={verification._id} className="bg-dark-card border border-dark-border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs text-dark-text-secondary uppercase mb-2 inline-block">
                            {category}
                          </span>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {verification.taskId?.title}
                          </h3>
                          <p className="text-sm text-dark-text-secondary">
                            Completed {daysAgo === 0 ? 'today' : daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`}
                          </p>
                        </div>
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                          Pass: {verification.overallScore}%
                        </span>
                      </div>

                      {/* Evidence of Work */}
                      <div className="bg-dark-surface border border-dark-border rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center">
                        {verification.submissionId?.submissionType === 'github' ? (
                          <div className="text-center">
                            <div className="text-4xl mb-2">💻</div>
                            <div className="text-sm text-dark-text-secondary">
                              {verification.submissionId.githubRepo?.owner}/{verification.submissionId.githubRepo?.repo}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-4xl mb-2">📄</div>
                            <div className="text-sm text-dark-text-secondary">File Submission</div>
                          </div>
                        )}
                      </div>

                      {/* AI Verification Feedback */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-white mb-2">AI Verification Feedback:</h4>
                        {verification.strengths.slice(0, 3).map((strength, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="text-green-400 mt-1">✓</span>
                            <span className="text-sm text-dark-text-secondary">{strength}</span>
                          </div>
                        ))}
                        {verification.weaknesses.length > 0 && (
                          <div className="flex items-start space-x-2">
                            <span className="text-yellow-400 mt-1">⚠</span>
                            <span className="text-sm text-dark-text-secondary">
                              {verification.weaknesses[0]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Availability */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Availability</h3>
              <div className="mb-4">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                  OPEN TO WORK
                </span>
              </div>
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium mb-3 transition">
                Request Interview
              </button>
              <div className="flex space-x-2">
                <button className="flex-1 bg-dark-surface border border-dark-border text-white py-2 rounded-lg text-sm hover:bg-dark-bg transition">
                  Shortlist
                </button>
                <button className="flex-1 bg-dark-surface border border-dark-border text-white py-2 rounded-lg text-sm hover:bg-dark-bg transition">
                  Forward
                </button>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Avg. Task Rating</span>
                  <span className="text-white font-medium">{avgRating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Tasks Completed</span>
                  <span className="text-white font-medium">{profile.verifications.length} Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text-secondary">Last Active</span>
                  <span className="text-white font-medium">2 hours ago</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
              <div className="space-y-4">
                {profile.student.profile?.institution && (
                  <div>
                    <div className="font-medium text-white mb-1">
                      {profile.student.profile.institution}
                    </div>
                    <div className="text-sm text-dark-text-secondary">
                      {profile.student.profile.year || '2020-2024'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Proficiencies */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Top Proficiencies</h3>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-dark-surface text-primary-400 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Similar Candidates */}
            <div className="bg-dark-card border border-dark-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Similar Candidates</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                    DC
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">David Chen</div>
                    <div className="text-xs text-dark-text-secondary">Frontend Specialist</div>
                  </div>
                  <span className="text-primary-400 text-sm font-medium">98% Match</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                    MG
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">Maria Gonzalez</div>
                    <div className="text-xs text-dark-text-secondary">Product Designer</div>
                  </div>
                  <span className="text-primary-400 text-sm font-medium">94% Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
