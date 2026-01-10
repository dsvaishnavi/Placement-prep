import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Rocket, Sun, Moon, MonitorSmartphone, LogOut, User, Settings, Shield } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  const navItems = [
    { label: 'Home', href: '/home' },
    { label: 'Aptitude', href: '/aptitude' },
    { label: 'Core Concepts', href: '/core-concepts' },
    { label: 'Progress', href: '/progress' },
    { label: 'Resume Analyzer', href: '/resumeanalyzer' },
  ]

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    setShowUserMenu(false)
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/login')
  }

  const getThemeIcon = () => {
    if (theme === 'system') return <MonitorSmartphone className="w-4 h-4" />
    return theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />
  }

  const isActiveRoute = (href) => location.pathname === href

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-40 
      transition-all duration-300 ease-out
      py-3 sm:py-4
      ${theme === 'dark'
        ? 'backdrop-blur-lg sm:backdrop-blur-xl bg-black/30 border-b border-white/10'
        : 'backdrop-blur-lg sm:backdrop-blur-xl bg-white/40 border-b border-gray-200/50'
      }
    `}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2 flex-shrink-0">
            <div className={`p-1 sm:p-1.5 rounded-md ${theme === 'dark'
              ? 'bg-gradient-to-br from-blue-500/15 to-green-500/15'
              : 'bg-gradient-to-br from-blue-100 to-green-100'
              }`}>
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
            </div>
            <div>
              <span className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Skill Sync
              </span>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Placement Platform
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`relative text-xs xl:text-sm font-medium transition-all duration-300 px-2 xl:px-3 py-2 rounded-lg whitespace-nowrap ${isActiveRoute(item.href)
                  ? `text-blue-400 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'} shadow-lg shadow-blue-500/30`
                  : `hover:text-blue-400 ${theme === 'dark' ? 'text-gray-300 hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100/50'}`
                  }`}
              >
                {item.label}
                {isActiveRoute(item.href) && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-green-500/20 animate-pulse" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                lg:hidden flex items-center justify-center w-10 h-10 rounded-lg
                transition-all duration-300 ease-out
                ${theme === 'dark'
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-white border border-white/10'
                  : 'bg-white/70 hover:bg-white/80 text-gray-800 border border-gray-200/50'
                }
                backdrop-blur-sm
              `}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* User Menu or Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg backdrop-blur-lg border
                    transition-all duration-300 ease-out
                    ${theme === 'dark'
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-white/70 border-gray-200/60 hover:bg-white/80'
                    }
                  `}
                >
                  <User className="w-4 h-4" />
                  <span className={`text-sm font-medium hidden sm:inline ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name || 'User'}
                  </span>
                </button>

                {showUserMenu && (
                  <div className={`absolute top-full right-0 mt-2 w-56 rounded-lg shadow-xl backdrop-blur-xl border z-50 ${theme === 'dark'
                    ? 'bg-gray-800/95 border-white/20'
                    : 'bg-white/95 border-gray-200'
                    }`}>
                    {/* User Info */}
                    <div className="p-3 border-b border-gray-200/20">
                      <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {user?.name}
                      </p>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user?.email}
                      </p>
                    </div>

                    {/* Theme Options */}
                    <div className="p-2 border-b border-gray-200/20">
                      <div className={`text-xs font-medium mb-2 px-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Theme
                      </div>
                      <button
                        onClick={() => handleThemeChange('light')}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${theme === 'light'
                          ? 'bg-blue-500/20 text-blue-400'
                          : theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100/50 text-gray-700'
                          }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Sun className="w-4 h-4 flex-shrink-0" />
                          <span>Light</span>
                        </div>
                        {theme === 'light' && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
                      </button>

                      <button
                        onClick={() => handleThemeChange('dark')}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${theme === 'dark'
                          ? 'bg-blue-500/20 text-blue-400'
                          : theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100/50 text-gray-700'
                          }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Moon className="w-4 h-4 flex-shrink-0" />
                          <span>Dark</span>
                        </div>
                        {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
                      </button>

                      <button
                        onClick={() => handleThemeChange('system')}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${theme === 'system'
                          ? 'bg-blue-500/20 text-blue-400'
                          : theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100/50 text-gray-700'
                          }`}
                      >
                        <div className="flex items-center space-x-2">
                          <MonitorSmartphone className="w-4 h-4 flex-shrink-0" />
                          <span>System</span>
                        </div>
                        {theme === 'system' && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
                      </button>
                    </div>

                    {/* Admin Link (if user is admin/moderator) */}
                    {(user?.role === 'admin' || user?.role === 'moderator') && (
                      <div className="p-2 border-b border-gray-200/20">
                        <Link
                          to="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className={`flex items-center space-x-2 w-full px-3 py-2 text-sm rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100/50 text-gray-700'
                            }`}
                        >
                          <Shield className="w-4 h-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </div>
                    )}

                    {/* Logout */}
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-2 w-full px-3 py-2 text-sm rounded-md transition-colors ${theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100/50 text-gray-700'
                          }`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <div className={`
                  px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-out
                  ${theme === 'dark'
                    ? 'bg-gradient-to-r from-blue-500/20 to-green-500/20 text-white border border-white/20 hover:from-blue-500/30 hover:to-green-500/30'
                    : 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:opacity-90'
                  }
                  backdrop-blur-sm shadow-lg
                `}>
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3">
            <div className={`
              p-3 rounded-lg backdrop-blur-xl border
              ${theme === 'dark'
                ? 'bg-black/70 border-white/10'
                : 'bg-white/80 border-gray-200'
              }
            `}>
              <div className="flex flex-col space-y-2">
                {/* Navigation Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`py-2 px-3 rounded transition-all ${isActiveRoute(item.href)
                      ? `text-blue-400 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`
                      : `hover:bg-white/10 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Admin Link for Mobile (if user is admin/moderator) */}
                {isAuthenticated && (user?.role === 'admin' || user?.role === 'moderator') && (
                  <Link
                    to="/admin"
                    className={`py-2 px-3 rounded transition-all flex items-center space-x-2 ${isActiveRoute('/admin')
                      ? `text-blue-400 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`
                      : `hover:bg-white/10 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </Link>
                )}

                {/* Theme Options for Mobile */}
                <div className="border-t border-gray-200/20 pt-2 mt-2">
                  <div className={`text-xs font-medium mb-2 px-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Theme
                  </div>
                  <button
                    onClick={() => {
                      handleThemeChange('light')
                      setIsMenuOpen(false)
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded transition-colors ${theme === 'light'
                      ? 'bg-blue-500/20 text-blue-400'
                      : theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100/50 text-gray-700'
                      }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4 flex-shrink-0" />
                      <span>Light</span>
                    </div>
                    {theme === 'light' && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
                  </button>

                  <button
                    onClick={() => {
                      handleThemeChange('dark')
                      setIsMenuOpen(false)
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded transition-colors ${theme === 'dark'
                      ? 'bg-blue-500/20 text-blue-400'
                      : theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100/50 text-gray-700'
                      }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Moon className="w-4 h-4 flex-shrink-0" />
                      <span>Dark</span>
                    </div>
                    {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
                  </button>

                  <button
                    onClick={() => {
                      handleThemeChange('system')
                      setIsMenuOpen(false)
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded transition-colors ${theme === 'system'
                      ? 'bg-blue-500/20 text-blue-400'
                      : theme === 'dark' ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-100/50 text-gray-700'
                      }`}
                  >
                    <div className="flex items-center space-x-2">
                      <MonitorSmartphone className="w-4 h-4 flex-shrink-0" />
                      <span>System</span>
                    </div>
                    {theme === 'system' && <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />}
                  </button>
                </div>

                {/* User Actions */}
                <div className="border-t border-gray-200/20 pt-2 mt-2">
                  {isAuthenticated ? (
                    <>
                      <div className={`text-xs font-medium mb-2 px-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user?.name} ({user?.email})
                      </div>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                        className={`flex items-center space-x-2 w-full py-2 px-3 rounded transition-colors hover:bg-white/10 text-sm text-left ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className={`flex items-center space-x-2 py-2 px-3 rounded transition-colors hover:bg-white/10 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Login</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar