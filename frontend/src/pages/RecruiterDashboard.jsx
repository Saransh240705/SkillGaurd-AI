import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  return (
    <div className="min-h-screen bg-dark-bg pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Recruiter Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/recruiter/search"
            className="bg-dark-card border border-dark-border rounded-lg p-8 hover:border-primary-600 transition text-center"
          >
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Talent Search
            </h2>
            <p className="text-dark-text-secondary">
              Search and filter candidates by verified skills, scores, and other criteria
            </p>
          </Link>

          <Link
            to="/recruiter/jobs/new"
            className="bg-dark-card border border-dark-border rounded-lg p-8 hover:border-primary-600 transition text-center"
          >
            <div className="text-4xl mb-4">💼</div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Create Job Posting
            </h2>
            <p className="text-dark-text-secondary">
              Post new job openings with AI-powered skill verification tasks
            </p>
          </Link>

          <div className="bg-dark-card border border-dark-border rounded-lg p-8">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Analytics
            </h2>
            <p className="text-dark-text-secondary">
              View hiring metrics and candidate insights
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
