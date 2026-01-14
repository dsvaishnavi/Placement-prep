import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showToast } from '../utils/toast'
import UserManagement from '../components/UserManagement'
import AptitudeQuestionManagement from '../components/AptitudeQuestionManagement'
import CoreConceptManagement from '../components/CoreConceptManagement'
import DashboardOverview from '../components/DashboardOverview'
import { 
  // Navigation & Layout Icons
  Menu, Search, Bell, User, Home, Users, HelpCircle, 
  BookOpen, Settings, LogOut, ChevronDown, ArrowLeft,
  // Table & Action Icons
  Edit, Trash2, Eye, Star,
  Plus, Download,
  // Form & Content Icons
  BarChart3, Lock, Hash, TrendingUp , Cpu , Database ,HardDrive , Server ,FileText,
  // Theme & Profile Icons
  Sun, Moon, UserCircle
} from 'lucide-react'



function Admin({ theme = 'light', contentManagerMode = false, toggleTheme }) {
  // Theme helper functions
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { user, isAdmin, isContentManager, hasContentAccess, logout } = useAuth();
  
  // State for dropdowns
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  
  // Refs for dropdown elements
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Check access permissions
  if (!user) {
    navigate('/login');
    return null;
  }
  
  // If in content manager mode, ensure user has content access
  if (contentManagerMode && !hasContentAccess) {
    navigate('/unauthorized');
    return null;
  }
  
  // If not in content manager mode, ensure user is admin
  if (!contentManagerMode && !isAdmin) {
    navigate('/unauthorized');
    return null;
  }
  
  // Theme-based color classes (following Aptitude.jsx pattern)
  const themeClasses = {
    // Backgrounds
    bg: isDark ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white',
    cardBg: isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60',
    sidebarBg: isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white border-gray-200',
    headerBg: isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200',
    
    // Text colors
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
      muted: isDark ? 'text-gray-500' : 'text-gray-500',
      inverse: isDark ? 'text-gray-900' : 'text-white',
    },
    
    // Button colors
    button: {
      primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90',
      secondary: isDark ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
      danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90',
      success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90',
    },
    
    // Form elements
    input: isDark ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-200',
    
    // Table colors
    table: {
      header: isDark ? 'bg-gray-800/50 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600',
      row: isDark ? 'hover:bg-white/5 border-gray-700' : 'hover:bg-gray-50 border-gray-200',
      cell: isDark ? 'text-gray-300' : 'text-gray-700',
    },
    
    // Status colors (following Aptitude.jsx difficulty colors)
    status: {
      active: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200',
      inactive: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-800 border-red-200',
      draft: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
      published: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200',
    },
    
    // Role colors (matching Aptitude.jsx category colors)
    role: {
      admin: isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-800',
      manager: isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-800',
      student: isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-800',
    },
    
    // Progress colors (matching Aptitude.jsx)
    progress: {
      bg: isDark ? 'bg-gray-700' : 'bg-gray-200',
      easy: isDark ? 'bg-green-400' : 'bg-green-500',
      medium: isDark ? 'bg-yellow-400' : 'bg-yellow-500',
      hard: isDark ? 'bg-red-400' : 'bg-red-500',
    },
    
    // Icon backgrounds (matching Aptitude.jsx)
    iconBg: {
      blue: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
      green: isDark ? 'bg-green-500/20' : 'bg-green-100',
      purple: isDark ? 'bg-purple-500/20' : 'bg-purple-100',
      orange: isDark ? 'bg-amber-500/20' : 'bg-amber-100',
    },
    
    // Gradient colors (matching Aptitude.jsx)
    gradient: {
      blue: 'from-blue-500 to-indigo-600',
      purple: 'from-purple-500 to-indigo-600',
      green: 'from-green-500 to-emerald-600',
      orange: 'from-amber-500 to-orange-600',
      gray: 'from-gray-500 to-slate-600',
    }
  };

  // State for active module and sidebar
  const getDefaultModule = () => {
    if (contentManagerMode) {
      return 'aptitude'; // Content managers start with aptitude questions
    }
    return 'dashboard'; // Admins start with dashboard
  };
  
  const [activeModule, setActiveModule] = useState(getDefaultModule())
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [userFilter, setUserFilter] = useState('all')

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logged out successfully', 'success');
      navigate('/login');
    } catch (error) {
      showToast('Error logging out', 'error');
    }
  };

  // Mock notifications data
  const notifications = [
    { id: 1, title: 'New user registered', message: 'John Doe has joined the platform', time: '2 min ago', unread: true },
    { id: 2, title: 'Question approved', message: 'Your aptitude question has been approved', time: '1 hour ago', unread: true },
    { id: 3, title: 'System update', message: 'Platform maintenance scheduled for tonight', time: '3 hours ago', unread: false },
  ];
  
  // Navigation modules configuration based on user role
  const getAvailableModules = () => {
    // Content modules available to both admin and content manager
    const contentModules = [
      { id: 'aptitude', label: 'Aptitude Questions', icon: HelpCircle, color: 'green' },
      { id: 'concepts', label: 'Core Concepts', icon: BookOpen, color: 'orange' }
    ];
    
    // Admin-only modules
    const adminModules = [
      { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'blue' },
      { id: 'users', label: 'User Management', icon: Users, color: 'purple' },
      { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' }
    ];
    
    if (contentManagerMode) {
      // Content Manager: Content modules only (no dashboard)
      return contentModules;
    } else if (isAdmin) {
      // Admin: All modules
      return [...adminModules, ...contentModules];
    } else {
      // Fallback: Dashboard only
      return [{ id: 'dashboard', label: 'Dashboard', icon: Home, color: 'blue' }];
    }
  };
  
  const modules = getAvailableModules();
  
  // User Management Component - Now using the dedicated UserManagement component
  const UsersModule = () => {
    return <UserManagement theme={theme} />
  }
  
  // Aptitude Questions Management Component
  const AptitudeQuestionsModule = () => {
    return <AptitudeQuestionManagement theme={theme} />
  }

  // Core Concepts Management Component
  const CoreConceptsModule = () => {
    return <CoreConceptManagement theme={theme} />
  }
  
  // Main content renderer based on active module and user permissions
  const renderContent = () => {
    // Check if user has access to the requested module
    const hasModuleAccess = modules.some(m => m.id === activeModule);
    if (!hasModuleAccess) {
      return (
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <h2 className={`text-2xl font-bold mb-6 ${themeClasses.text.primary}`}>Access Denied</h2>
          <p className={themeClasses.text.secondary}>You don't have permission to access this module.</p>
        </div>
      );
    }
    
    switch (activeModule) {
      case 'dashboard':
        return <DashboardOverview theme={theme} />
      case 'users':
        // Only admins can access user management
        return isAdmin ? <UsersModule /> : (
          <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
            <h2 className={`text-2xl font-bold mb-6 ${themeClasses.text.primary}`}>Access Denied</h2>
            <p className={themeClasses.text.secondary}>User management is only available to administrators.</p>
          </div>
        )
      case 'aptitude':
        return <AptitudeQuestionsModule />
      case 'concepts':
        return <CoreConceptsModule />
      case 'settings':
        // Only admins can access settings
        return isAdmin ? (
          <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
            <h2 className={`text-2xl font-bold mb-6 ${themeClasses.text.primary}`}>Settings</h2>
            <p className={`${themeClasses.text.primary} opacity-70`}>Settings panel would be implemented here.</p>
          </div>
        ) : (
          <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
            <h2 className={`text-2xl font-bold mb-6 ${themeClasses.text.primary}`}>Access Denied</h2>
            <p className={themeClasses.text.secondary}>System settings are only available to administrators.</p>
          </div>
        )
      default:
        return <DashboardOverview />
    }
  }
  
  // Accessible page title based on active module
  const getPageTitle = () => {
    const module = modules.find(m => m.id === activeModule)
    return module ? `${module.label} - Admin Panel` : 'Admin Panel'
  }
  
  return (
    // Main container with semantic structure
    <div className={`min-h-screen ${themeClasses.bg}`}>
      {/* SEO-friendly page title (hidden for screen readers) */}
      <div className="sr-only">
        <h1>{getPageTitle()}</h1>
      </div>
      
      {/* Top Navigation Header */}
      <header className={`border-b sticky top-0 z-50 ${themeClasses.headerBg} backdrop-blur-sm`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 rounded-lg transition-colors hover:opacity-80"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                <Menu className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${themeClasses.text.primary}`}>
                    {contentManagerMode ? 'Content Management' : 'Admin Panel'}
                  </h1>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>
                    {contentManagerMode ? 'Educational Content Management' : 'Learning Platform Management'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Center: Search Bar */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.text.secondary}`} />
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${themeClasses.input}`}
                  aria-label="Search in admin panel"
                />
              </div>
            </div>
            
            {/* Right: Actions & User Menu */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors hover:opacity-80 ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
                title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              >
                {isDark ? (
                  <Sun className={`w-5 h-5 ${themeClasses.text.secondary}`} />
                ) : (
                  <Moon className={`w-5 h-5 ${themeClasses.text.secondary}`} />
                )}
              </button>
              
              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationDropdownRef}>
                <button 
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  className={`p-2 rounded-lg relative transition-colors hover:opacity-80 ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                  aria-label="View notifications"
                  title="Notifications"
                >
                  <Bell className={`w-5 h-5 ${themeClasses.text.secondary}`} />
                  {notifications.some(n => n.unread) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                
                {/* Notifications Dropdown Menu */}
                {notificationDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-lg border shadow-lg z-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className={`font-semibold ${themeClasses.text.primary}`}>Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 ${notification.unread ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${themeClasses.text.primary}`}>{notification.title}</p>
                              <p className={`text-xs mt-1 ${themeClasses.text.secondary}`}>{notification.message}</p>
                            </div>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                            )}
                          </div>
                          <p className={`text-xs mt-2 ${themeClasses.text.secondary}`}>{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                      <button className={`w-full text-sm text-blue-500 hover:text-blue-600 font-medium`}>
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors hover:opacity-80 ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                  aria-label="User profile menu"
                  title="Profile menu"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${themeClasses.iconBg.blue}`}>
                    <UserCircle className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-left hidden md:block">
                    <p className={`text-sm font-medium ${themeClasses.text.primary}`}>
                      {user?.name || 'Satyajeet S. Desai'}
                    </p>
                    <p className={`text-xs ${themeClasses.text.secondary}`}>
                      {user?.role === 'admin' ? 'Administrator' : 
                       user?.role === 'content-manager' ? 'Content Manager' : 'Administrator'}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 ${themeClasses.text.secondary} transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-lg border shadow-lg z-50 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    {/* User Info Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${themeClasses.iconBg.blue}`}>
                          <UserCircle className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                          <p className={`font-semibold ${themeClasses.text.primary}`}>
                            {user?.name || 'Satyajeet S. Desai'}
                          </p>
                          <p className={`text-sm ${themeClasses.text.secondary}`}>
                            {user?.email || 'admin@example.com'}
                          </p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${themeClasses.role.admin}`}>
                            {user?.role === 'admin' ? 'Administrator' : 
                             user?.role === 'content-manager' ? 'Content Manager' : 'Administrator'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <button 
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          // Navigate to profile page or show profile modal
                          showToast('Profile page coming soon', 'info');
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`}
                      >
                        <User className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                        <span className={`text-sm ${themeClasses.text.primary}`}>View Profile</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setActiveModule('settings');
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`}
                      >
                        <Settings className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                        <span className={`text-sm ${themeClasses.text.primary}`}>Settings</span>
                      </button>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      
                      <button 
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogout();
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Layout Container */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'
        } lg:translate-x-0 lg:w-64 ${themeClasses.sidebarBg} h-[calc(100vh-73px)] fixed lg:static transition-all duration-300 z-40 overflow-y-auto`}>
          <nav className="p-4" aria-label="Main navigation">
            {/* Back Button */}
            <div className="mb-4">
              <button
                onClick={() => {
                  // Try to go back to previous page, or default to home
                  if (window.history.length > 1) {
                    navigate(-1); // Go back to previous page
                  } else {
                    navigate('/home'); // Default to home if no history
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors border ${
                  isDark 
                    ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500' 
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
                aria-label="Back to previous page"
                title="Return to main application"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to App</span>
              </button>
            </div>
            
            {/* Divider */}
            <div className={`mb-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}></div>
            
            {/* Navigation Modules */}
            <ul className="space-y-2">
              {modules.map((module) => {
                const Icon = module.icon
                return (
                  <li key={module.id}>
                    <button
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeModule === module.id
                          ? `bg-gradient-to-r ${themeClasses.gradient[module.color]} text-white`
                          : `${themeClasses.text.secondary} ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'}`
                      }`}
                      aria-current={activeModule === module.id ? 'page' : undefined}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{module.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            
            {/* Divider */}
            <div className={`my-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}></div>
            
            {/* Quick Stats */}
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <h3 className={`text-sm font-medium mb-2 ${themeClasses.text.primary}`}>Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className={themeClasses.text.secondary}>Active Users</span>
                    <span className={`font-medium ${themeClasses.text.primary}`}>1,042</span>
                  </div>
                  <div className={`h-1 rounded-full overflow-hidden mt-1 ${themeClasses.progress.bg}`}>
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span className={themeClasses.text.secondary}>Content Coverage</span>
                    <span className={`font-medium ${themeClasses.text.primary}`}>72%</span>
                  </div>
                  <div className={`h-1 rounded-full overflow-hidden mt-1 ${themeClasses.progress.bg}`}>
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Logout Button */}
            <button className={`w-full mt-6 flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isDark ? 'text-red-400 hover:bg-red-500/20' : 'text-red-600 hover:bg-red-50'}`}>
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </nav>
        </aside>
        
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className={`flex items-center text-sm ${themeClasses.text.secondary}`} aria-label="Breadcrumb">
              <span className="hover:text-blue-500 cursor-pointer transition-colors">Admin Panel</span>
              <ChevronDown className="w-4 h-4 mx-2 rotate-270" />
              <span className="font-medium text-blue-500">
                {modules.find(m => m.id === activeModule)?.label || 'Dashboard'}
              </span>
            </nav>
          </div>
          
          {/* Page Heading */}
          <div className="mb-6">
            <h2 className={`text-2xl font-bold ${themeClasses.text.primary}`}>
              {modules.find(m => m.id === activeModule)?.label || 'Dashboard'}
            </h2>
            <p className={`${themeClasses.text.primary} opacity-70 mt-2`}>
              {activeModule === 'users' && 'Manage user accounts, roles, and permissions'}
              {activeModule === 'aptitude' && 'Create and manage aptitude test questions'}
              {activeModule === 'concepts' && 'Manage educational content and core concepts'}
              {activeModule === 'dashboard' && 'Overview of platform analytics and metrics'}
              {activeModule === 'settings' && 'Configure platform settings and preferences'}
            </p>
          </div>
          
          {/* Main Content */}
          {renderContent()}
          
          
        </main>
      </div>
      
      {/* Global Styles for responsive design */}
      <style jsx>{`
        @media (max-width: 640px) {
          .rotate-270 {
            transform: rotate(270deg);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default Admin