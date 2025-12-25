// pages/Sitemap.jsx
import { Sitemap as SitemapIcon, Home, BookOpen, TrendingUp, FileText, Users, Mail, Briefcase } from 'lucide-react'

function Sitemap({ theme }) {
  const sections = [
    {
      title: 'Main Pages',
      icon: Home,
      links: [
        { name: 'Home', path: '/home' },
        { name: 'Aptitude Tests', path: '/aptitude' },
        { name: 'Core Concepts', path: '/core-concepts' },
        { name: 'Progress Tracker', path: '/progress' },
        { name: 'Resume Analyzer', path: '/resumeanalyzer' },
        { name: 'Login', path: '/login' },
        { name: 'Sign Up', path: '/signup' },
      ]
    },
    {
      title: 'Educational Resources',
      icon: BookOpen,
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Study Materials', path: '/study-materials' },
        { name: 'Mock Tests', path: '/mock-tests' },
        { name: 'Interview Prep', path: '/interview-prep' },
        { name: 'Success Stories', path: '/success-stories' },
      ]
    },
    {
      title: 'Company',
      icon: Users,
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' },
      ]
    },
    {
      title: 'Legal',
      icon: FileText,
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Cookie Policy', path: '/cookies' },
      ]
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-green-500/10 mb-6">
            <SitemapIcon className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sitemap</h1>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Navigate through all pages and resources on Skill Sync
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
                ? 'bg-white/5 border-white/10'
                : 'bg-white/70 border-gray-200/60'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'}`}>
                  <section.icon className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a 
                      href={link.path}
                      className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-colors ${theme === 'dark'
                        ? 'hover:bg-white/10 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-xs opacity-50">›</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sitemap