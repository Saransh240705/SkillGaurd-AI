import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SG</span>
              </div>
              <span className="text-xl font-bold text-white">SkillGuard</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.p variants={fadeInUp} className="text-blue-400 font-medium">
                SKILL VERIFICATION PLATFORM
              </motion.p>
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-bold leading-tight"
              >
                Proof of skill,<br />
                <span className="text-gray-400">not just resumes.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg text-gray-400 max-w-lg">
                Skip the resume black hole. Complete real-world tasks verified by AI, and let your proven abilities speak directly to top employers. Build a portfolio that matters.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Start for Free
                  <ArrowRightIcon />
                </Link>
                <a
                  href="#how-it-works"
                  className="bg-dark-surface hover:bg-dark-card text-white px-6 py-3 rounded-lg font-medium border border-dark-border transition-colors"
                >
                  See How It Works
                </a>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Free to start
                </span>
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  AI-powered verification
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Code Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <div className="bg-dark-surface rounded-xl border border-dark-border p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="text-sm font-mono">
                  <code className="text-gray-300">
{`// Skill Verification Result
{
  "student": "Jane Developer",
  "task": "Build REST API",
  "score": 94,
  "verified": true,
  "skills": [
    "Node.js",
    "Express",
    "MongoDB"
  ],
  "ai_feedback": "Excellent code
    structure and error handling"
}`}
                  </code>
                </pre>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2 backdrop-blur">
                <span className="text-green-400 font-medium">✓ AI Verified</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* The Problem */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">The Portfolio Gap</h2>
              <p className="text-gray-400">Why traditional methods fail developers</p>
              <div className="space-y-4">
                {[
                  "Resumes don't reflect true skills",
                  "Portfolio projects lack verification",
                  "No way to prove problem-solving ability",
                  "Hiring based on keywords, not competence"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <XIcon />
                    <span className="text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* The Solution */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-white">The SkillBridge Solution</h2>
              <p className="text-gray-400">Real work, verified by AI</p>
              <div className="space-y-4">
                {[
                  "Real-world tasks from industry",
                  "AI-powered skill verification",
                  "Detailed analytics dashboard",
                  "Automated candidate matching"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <CheckIcon />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Verification Works</h2>
            <p className="text-gray-400">From signup to verified skills in 4 simple steps</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8"
          >
            {[
              {
                step: "1",
                title: "Select a Task",
                description: "Browse tasks from real companies across different skill levels",
                icon: "📋"
              },
              {
                step: "2",
                title: "Submit Work",
                description: "Complete the task and submit your solution through our platform",
                icon: "💻"
              },
              {
                step: "3",
                title: "AI Analysis",
                description: "Our AI evaluates your code quality, approach, and best practices",
                icon: "🤖"
              },
              {
                step: "4",
                title: "Get Verified",
                description: "Receive your verified skill badge and get matched with employers",
                icon: "✅"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
              >
                <div className="bg-dark-surface rounded-xl border border-dark-border p-6 h-full hover:border-blue-500/50 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-blue-400 font-medium mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-600">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Evaluation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white">
                AI that evaluates<br />real work, not buzzwords.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-400 text-lg">
                Our advanced AI doesn't just scan for keywords. It analyzes your actual code, evaluates problem-solving approaches, and measures against industry standards.
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-4">
                {[
                  "Pattern recognition for code quality",
                  "Best practices validation",
                  "Real-time feedback and suggestions"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-dark-surface rounded-xl border border-dark-border p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">AI Analysis Results</span>
                  <span className="text-green-400 text-sm font-medium">94/100</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Code Quality</span>
                    <span className="text-white">95%</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Best Practices</span>
                    <span className="text-white">92%</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Problem Solving</span>
                    <span className="text-white">96%</span>
                  </div>
                  <div className="w-full bg-dark-bg rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-dark-bg rounded-lg border border-dark-border">
                  <p className="text-sm text-gray-400">
                    <span className="text-green-400 font-medium">Feedback:</span> Excellent implementation with clean architecture. Consider adding more error handling for edge cases.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skill Profile Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Proven Skill Profile</h2>
            <p className="text-gray-400">Build a portfolio that speaks for itself</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-dark-surface rounded-xl border border-dark-border p-8 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                JD
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Jane Developer</h3>
                <p className="text-gray-400">Full Stack Developer • San Francisco, CA</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Verified</span>
                  <span className="text-gray-500 text-sm">12 tasks completed</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Verified Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'TypeScript', 'MongoDB', 'GraphQL', 'AWS'].map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Skill Scores</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Frontend</span>
                      <span className="text-white">94%</span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Backend</span>
                      <span className="text-white">89%</span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">DevOps</span>
                      <span className="text-white">78%</span>
                    </div>
                    <div className="w-full bg-dark-bg rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-surface/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Trusted by Top Hiring Teams</h2>
            <p className="text-gray-400">Leading companies use SkillGuard to find verified talent</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { name: 'Tech Startup Inc.', role: 'Hiring Manager', quote: 'Finally, candidates that can prove their skills.' },
              { name: 'Enterprise Corp', role: 'Tech Lead', quote: 'Reduced our hiring time by 60%.' },
              { name: 'Scale Labs', role: 'CTO', quote: 'Quality candidates, every time.' },
              { name: 'Digital Agency', role: 'HR Director', quote: 'The future of tech hiring.' }
            ].map((company, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-dark-surface rounded-xl border border-dark-border p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{company.name.charAt(0)}</span>
                </div>
                <p className="text-gray-400 text-sm italic mb-3">"{company.quote}"</p>
                <p className="text-white font-medium text-sm">{company.name}</p>
                <p className="text-gray-500 text-xs">{company.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-bg to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stop listing skills.<br />Start proving them.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-8">
              Join thousands of developers who are building verified skill profiles and connecting with top employers.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all transform hover:scale-105"
              >
                Get Started for Free
                <ArrowRightIcon />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-dark-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SG</span>
              </div>
              <span className="text-xl font-bold text-white">SkillGuard</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            <p className="text-gray-500 text-sm">© 2026 SkillGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
