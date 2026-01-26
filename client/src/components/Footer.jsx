import { Rocket, Github, Linkedin, Mail, ExternalLink, ChevronRight, Target, Trophy, BookOpen, Users, Brain, MessageSquare } from 'lucide-react'

function Footer({ theme }) {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Aptitude Tests', path: '/aptitude', icon: Brain },
    { name: 'Core Concepts', path: '/core-concepts', icon: BookOpen },
    { name: 'Progress', path: '/progress', icon: Trophy },
    { name: 'Resume Analyzer', path: '/resumeanalyzer', icon: Target },
  ]

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' },
  ]

  return (
    <footer className={`sticky top-[100vh] w-full py-6 sm:py-8 px-3 sm:px-4 border-t backdrop-blur-sm ${theme === 'dark' 
      ? 'bg-gradient-to-t from-gray-900/95 via-gray-900/90 to-gray-900/95 border-white/10' 
      : 'bg-gradient-to-t from-white/95 via-blue-50/90 to-white/95 border-gray-200'
      }`}>
      
      <div className="container mx-auto max-w-4xl">
        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
          
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-1.5 sm:space-x-2 mb-2 sm:mb-3">
              <div className={`p-1.5 rounded-lg ${theme === 'dark' 
                ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20' 
                : 'bg-gradient-to-br from-green-100 to-blue-100'
                }`}>
                <Rocket className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-500" />
              </div>
              <span className={`text-base sm:text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Skill Sync
              </span>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Empowering careers through placement preparation.
            </p>
            
            {/* Quick Actions */}
            <div className="mt-3 sm:mt-4 space-y-1.5">
              {quickLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.path}
                  className={`flex items-center gap-1.5 text-xs py-1.5 px-2 rounded transition-colors ${theme === 'dark'
                    ? 'hover:bg-white/10 text-gray-300 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <link.icon className="w-3 h-3 text-blue-500" />
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`font-medium mb-1 sm:mb-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Company
            </h4>
            <div className="space-y-0.5 sm:space-y-1">
              {companyLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.path}
                  className={`flex items-center gap-1.5 text-xs py-1 hover:underline transition-colors ${theme === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <ChevronRight className="w-2.5 h-2.5 opacity-50" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className={`font-medium mb-1 sm:mb-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Connect
            </h4>
            <div className="flex space-x-1.5 sm:space-x-2 mb-3 sm:mb-4">
              <a 
                href="https://github.com/satyajeet323" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-1.5 rounded transition-colors ${theme === 'dark'
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                }`}
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-1.5 rounded transition-colors ${theme === 'dark'
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a 
                href="mailto:contact@skillsync.com" 
                className={`p-1.5 rounded transition-colors ${theme === 'dark'
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                }`}
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
            
            {/* Newsletter */}
            <div>
              <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Join our newsletter
              </p>
              <div className="flex gap-1">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className={`flex-1 px-2 py-1.5 text-xs rounded border ${theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-1 focus:ring-green-500`}
                />
                <button className={`px-2 py-1.5 text-xs rounded font-medium transition-colors ${theme === 'dark'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
                }`}>
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className={`font-medium mb-1 sm:mb-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Legal
            </h4>
            <div className="space-y-0.5 sm:space-y-1">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.path}
                  className={`flex items-center gap-1.5 text-xs py-1 hover:underline transition-colors ${theme === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Contact Info */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}">
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Need help?
              </p>
              <a 
                href="mailto:sattudesai007@gmail.com" 
                className={`text-xs font-medium transition-colors ${theme === 'dark'
                  ? 'text-green-400 hover:text-green-300'
                  : 'text-green-600 hover:text-green-700'
                }`}
              >
                support@skillsync.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-3 sm:pt-4 text-center ${theme === 'dark'
          ? 'border-white/10 text-gray-400'
          : 'border-gray-200 text-gray-500'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-xs">
              © {currentYear} Skill Sync. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-xs">
              <span className={`px-1.5 py-0.5 rounded ${theme === 'dark' 
                ? 'bg-white/5 text-gray-400' 
                : 'bg-gray-100 text-gray-600'
              }`}>
                Developed By Coders Paradise Group
              </span>
              <span className="hidden sm:inline">|</span>
              <a 
                href="/sitemap" 
                className={`hover:underline transition-colors ${theme === 'dark'
                  ? 'hover:text-white'
                  : 'hover:text-gray-900'
                }`}
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer