import { Cookie, Settings, Eye, Shield, Trash2, Check } from 'lucide-react'

function CookiePolicy({ theme }) {
  const cookieTypes = [
    {
      name: 'Essential Cookies',
      description: 'Required for basic site functionality',
      examples: ['Authentication', 'Session management', 'Security features'],
      necessary: true
    },
    {
      name: 'Performance Cookies',
      description: 'Help improve website performance',
      examples: ['Analytics', 'Error tracking', 'Performance monitoring'],
      necessary: false
    },
    {
      name: 'Functional Cookies',
      description: 'Enable enhanced features',
      examples: ['Preferences', 'Personalization', 'Language settings'],
      necessary: false
    },
    {
      name: 'Targeting Cookies',
      description: 'Used for advertising purposes',
      examples: ['Ad personalization', 'Social media integration'],
      necessary: false
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 mb-4">
            <Cookie className="w-6 h-6 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Cookie Policy</h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            How we use cookies to enhance your learning experience
          </p>
        </div>

        <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              What Are Cookies?
            </h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              understanding how you use Skill Sync.
            </p>
          </section>

          {/* Cookie Types */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 text-blue-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Types of Cookies We Use
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cookieTypes.map((type, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${theme === 'dark'
                    ? type.necessary ? 'border-green-500/20 bg-green-500/5' : 'border-white/10 bg-white/5'
                    : type.necessary ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {type.name}
                    </h3>
                    {type.necessary && (
                      <span className={`px-2 py-1 text-xs rounded-full ${theme === 'dark'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-green-100 text-green-800'
                      }`}>
                        Essential
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {type.description}
                  </p>
                  <div className="space-y-1">
                    {type.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cookie Control */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-purple-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Managing Your Cookie Preferences
              </h2>
            </div>
            
            <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                    Browser Settings
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    Most web browsers allow you to control cookies through their settings preferences. 
                    However, limiting essential cookies may affect your ability to use Skill Sync.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors ${theme === 'dark'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
              }`}>
                <Check className="w-4 h-4" />
                Accept All Cookies
              </button>
              <button className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium border transition-colors ${theme === 'dark'
                ? 'border-white/20 hover:bg-white/10 text-white'
                : 'border-gray-300 hover:bg-gray-100 text-gray-700'
              }`}>
                <Settings className="w-4 h-4" />
                Customize Preferences
              </button>
              <button className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium border transition-colors ${theme === 'dark'
                ? 'border-red-500/20 hover:bg-red-500/10 text-red-400'
                : 'border-red-300 hover:bg-red-50 text-red-600'
              }`}>
                <Trash2 className="w-4 h-4" />
                Reject Non-Essential
              </button>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-green-500" />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Third-Party Cookies
              </h2>
            </div>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              We may use third-party services that place their own cookies on your device. These include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Analytics Services
                </p>
              </div>
              <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Payment Processors
                </p>
              </div>
              <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Social Media Features
                </p>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-500/10' : 'bg-yellow-50'}`}>
            <h3 className={`font-bold mb-2 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-800'}`}>
              Policy Updates
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'}`}>
              We may update this Cookie Policy from time to time. We will notify you of any changes by 
              posting the new Cookie Policy on this page and updating the "effective date" at the top.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicy