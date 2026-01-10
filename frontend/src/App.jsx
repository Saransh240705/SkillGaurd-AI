import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TaskMarketplace from './pages/TaskMarketplace';
import TaskDetail from './pages/TaskDetail';
import SubmissionForm from './pages/SubmissionForm';
import Certifications from './pages/Certifications';
import Analytics from './pages/Analytics';
import ProviderDashboard from './pages/ProviderDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import RecruiterSearch from './pages/RecruiterSearch';
import RecruiterActiveJobs from './pages/RecruiterActiveJobs';
import TalentPool from './pages/TalentPool';
import RecruiterAnalytics from './pages/RecruiterAnalytics';
import RecruiterMessages from './pages/RecruiterMessages';
import StudentProfile from './pages/StudentProfile';
import JobPosting from './pages/JobPosting';
import OrgOverview from './pages/OrgOverview';
import OrgTasks from './pages/OrgTasks';
import OrgPipeline from './pages/OrgPipeline';
import OrgAnalytics from './pages/OrgAnalytics';
import OrgSettings from './pages/OrgSettings';
import StudentSettings from './pages/StudentSettings';
import CreateTask from './pages/CreateTask';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-dark-bg">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskMarketplace />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <PrivateRoute>
                <TaskDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:id/submit"
            element={
              <PrivateRoute>
                <SubmissionForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/certifications"
            element={
              <PrivateRoute>
                <Certifications />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <StudentSettings />
              </PrivateRoute>
            }
          />

          {/* Provider Routes */}
          <Route
            path="/provider/dashboard"
            element={
              <PrivateRoute allowedRoles={['provider']}>
                <ProviderDashboard />
              </PrivateRoute>
            }
          />

          {/* Recruiter Routes */}
          <Route
            path="/recruiter/dashboard"
            element={
              <PrivateRoute allowedRoles={['recruiter']}>
                <RecruiterDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/recruiter/search"
            element={
              <PrivateRoute allowedRoles={['recruiter']}>
                <RecruiterSearch />
              </PrivateRoute>
            }
          />
          <Route
            path="/recruiter/jobs"
            element={
              <PrivateRoute allowedRoles={['recruiter']}>
                <RecruiterActiveJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/recruiter/talent"
            element={
              <PrivateRoute allowedRoles={['recruiter']}>
                <TalentPool />
              </PrivateRoute>
            }
          />
          <Route
            path="/recruiter/analytics"
            element={
              <PrivateRoute allowedRoles={['recruiter']}>
                <RecruiterAnalytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/recruiter/messages"
            element={
              <PrivateRoute allowedRoles={['recruiter']}>
                <RecruiterMessages />
              </PrivateRoute>
            }
          />
          <Route
            path="/recruiter/student/:id"
            element={
              <PrivateRoute allowedRoles={['recruiter']}>
                <StudentProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/recruiter/jobs/new"
            element={
              <PrivateRoute allowedRoles={['recruiter']}>
                <JobPosting />
              </PrivateRoute>
            }
          />

          {/* Organization Routes */}
          <Route
            path="/org/overview"
            element={
              <PrivateRoute allowedRoles={['organization']}>
                <OrgOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/org/tasks"
            element={
              <PrivateRoute allowedRoles={['organization']}>
                <OrgTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/org/pipeline"
            element={
              <PrivateRoute allowedRoles={['organization']}>
                <OrgPipeline />
              </PrivateRoute>
            }
          />
          <Route
            path="/org/analytics"
            element={
              <PrivateRoute allowedRoles={['organization']}>
                <OrgAnalytics />
              </PrivateRoute>
            }
          />
          <Route
            path="/org/settings"
            element={
              <PrivateRoute allowedRoles={['organization']}>
                <OrgSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/org/tasks/new"
            element={
              <PrivateRoute allowedRoles={['organization']}>
                <CreateTask />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </AuthProvider>
  );
}

export default App;

