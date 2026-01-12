import { Scale, FileCheck, AlertTriangle, BookOpen, Users, Shield } from 'lucide-react'

function TermsOfService({ theme }) {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-4">
            <Scale className="w-6 h-6 text-purple-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Terms of Service</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Effective Date: December 15, 2024
          </p>
        </div>

        <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          
          {/* Agreement */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="w-5 h-5 text-blue-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                1. Agreement to Terms
              </h2>
            </div>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              By accessing or using Skill Sync ("Service"), you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>

          {/* Accounts */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-green-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                2. User Accounts
              </h2>
            </div>
            
            <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
                    Important
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
                    You are responsible for maintaining the confidentiality of your account and password. 
                    You agree to accept responsibility for all activities that occur under your account.
                  </p>
                </div>
              </div>
            </div>

            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>You must be at least 16 years old to use this Service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Provide accurate and complete registration information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Notify us immediately of any unauthorized use of your account</span>
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                3. Intellectual Property
              </h2>
            </div>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              The Service and its original content, features, and functionality are and will remain the exclusive 
              property of Skill Sync and its licensors. Our educational content, including test questions, 
              study materials, and analytical tools, are protected by copyright and other intellectual property laws.
            </p>
          </section>

          {/* User Conduct */}
          <section className="mb-8">
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              4. Acceptable Use
            </h2>
            <p className={`mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              You agree not to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  Copy, distribute, or disclose test questions
                </p>
              </div>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  Use automated systems to access the Service
                </p>
              </div>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  Share accounts or login credentials
                </p>
              </div>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
                  Misrepresent your identity or qualifications
                </p>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-blue-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                5. Limitation of Liability
              </h2>
            </div>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Skill Sync provides educational content and placement preparation tools. We do not guarantee 
              job placement or specific interview outcomes. The Service is provided "as is" without warranties 
              of any kind.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              6. Changes to Terms
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              We reserve the right to modify or replace these Terms at any time. We will provide notice 
              of significant changes via email or through the Service. Your continued use of the Service 
              after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              7. Governing Law
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              These Terms shall be governed by and construed in accordance with the laws of India, 
              without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService