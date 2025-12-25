import { Shield, Lock, Eye, FileText, AlertCircle, CheckCircle } from 'lucide-react'

function PrivacyPolicy({ theme }) {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-green-500/10 mb-4">
            <Shield className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Last updated: December 15, 2024
          </p>
        </div>

        <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          
          {/* Introduction */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-blue-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                1. Introduction
              </h2>
            </div>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Welcome to Skill Sync ("we," "our," or "us"). We are committed to protecting your personal information 
              and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
              your information when you use our placement preparation platform.
            </p>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                  By using Skill Sync, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-green-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                2. Information We Collect
              </h2>
            </div>
            
            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
              Personal Information
            </h3>
            <ul className={`space-y-2 mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Name, email address, and contact information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Academic details and educational background</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Payment information for premium features</span>
              </li>
            </ul>

            <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
              Learning Data
            </h3>
            <ul className={`space-y-2 mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Test scores and performance metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Study progress and time tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Resume analysis results</span>
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-purple-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                3. How We Use Your Information
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Personalized Learning
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  To provide customized study plans and recommendations based on your performance.
                </p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Platform Improvement
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  To analyze usage patterns and improve our educational content and features.
                </p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Communication
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  To send important updates, study tips, and placement opportunity alerts.
                </p>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Security
                </h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  To protect your account and detect fraudulent activities.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              4. Data Security
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              We implement appropriate technical and organizational security measures to protect your personal 
              information. However, no electronic transmission or storage is 100% secure, so we cannot guarantee 
              absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              5. Your Rights
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              You have the right to:
            </p>
            <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-3">
                <div className={`p-1 rounded ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <span>Access and review your personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`p-1 rounded ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <span>Request correction of inaccurate data</span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`p-1 rounded ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <span>Request deletion of your data</span>
              </li>
              <li className="flex items-start gap-3">
                <div className={`p-1 rounded ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <span>Opt-out of marketing communications</span>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
            <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
              Contact Us
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              For any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:privacy@skillsync.com" className="font-medium hover:underline">
                privacy@skillsync.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy