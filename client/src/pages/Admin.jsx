import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showToast } from '../utils/toast'
import UserManagement from '../components/UserManagement'
import AptitudeQuestionManagement from '../components/AptitudeQuestionManagement'
import { 
  // Navigation & Layout Icons
  Menu, Search, Bell, User, Home, Users, HelpCircle, 
  BookOpen, Settings, LogOut, ChevronDown, ArrowLeft,
  // Table & Action Icons
  Edit, Trash2, Eye, Star,
  Plus, Download,
  // Form & Content Icons
  BarChart3, Lock
} from 'lucide-react'

function Admin({ theme = 'light', contentManagerMode = false }) {
  // Theme helper functions
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { user, isAdmin, isContentManager, hasContentAccess } = useAuth();
  
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
  
  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      role: 'Admin',
      lastLogin: '2024-01-15 14:30',
      registrationDate: '2023-12-01',
      status: 'Active',
      avatar: 'AJ'
    },
    {
      id: 2,
      fullName: 'Sarah Miller',
      email: 'sarah.m@example.com',
      role: 'Content Manager',
      lastLogin: '2024-01-14 11:20',
      registrationDate: '2023-11-15',
      status: 'Active',
      avatar: 'SM'
    },
    {
      id: 3,
      fullName: 'Robert Chen',
      email: 'robert.chen@example.com',
      role: 'Student',
      lastLogin: '2024-01-13 09:45',
      registrationDate: '2024-01-01',
      status: 'Active',
      avatar: 'RC'
    },
    {
      id: 4,
      fullName: 'Maria Garcia',
      email: 'maria.g@example.com',
      role: 'Student',
      lastLogin: '2024-01-10 16:20',
      registrationDate: '2023-12-20',
      status: 'Inactive',
      avatar: 'MG'
    },
    {
      id: 5,
      fullName: 'David Wilson',
      email: 'david.w@example.com',
      role: 'Student',
      lastLogin: '2024-01-12 13:15',
      registrationDate: '2023-12-10',
      status: 'Active',
      avatar: 'DW'
    }
  ])
  
  // Mock data for core concepts
  const [coreConcepts, setCoreConcepts] = useState([
    {
      id: 1,
      title: 'Data Structures - Arrays',
      description: 'Understanding array data structure, operations, and time complexity',
      subject: 'Data Structures',
      topics: 15,
      difficulty: 'Beginner',
      status: 'Published',
      lastUpdated: '2024-01-10'
    },
    {
      id: 2,
      title: 'Operating Systems - Processes',
      description: 'Process management, scheduling algorithms, and synchronization',
      subject: 'Operating Systems',
      topics: 22,
      difficulty: 'Intermediate',
      status: 'Draft',
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      title: 'Database Normalization',
      description: 'Normal forms, functional dependencies, and database design principles',
      subject: 'DBMS',
      topics: 18,
      difficulty: 'Advanced',
      status: 'Published',
      lastUpdated: '2024-01-08'
    }
  ])
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [userFilter, setUserFilter] = useState('all')
  
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
  
  // Reusable Core Concept Form Component
  const CoreConceptForm = ({ onSubmit, initialData = {
    title: '',
    description: '',
    subject: '',
    difficulty: 'Beginner',
    status: 'Draft'
  }, mode = 'add' }) => {
    const [formData, setFormData] = useState(initialData)
    
    const handleChange = (field, value) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
    
    return (
      <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
        <h3 className={`text-lg font-semibold mb-6 ${themeClasses.text.primary}`}>
          {mode === 'add' ? 'Add New Core Concept' : 'Edit Core Concept'}
        </h3>
        
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }}>
          <div className="space-y-6">
            {/* Concept Title */}
            <div>
              <label htmlFor="concept-title" className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                Concept Title
              </label>
              <input
                id="concept-title"
                type="text"
                className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Data Structures - Arrays"
                required
              />
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="concept-description" className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                Description
              </label>
              <textarea
                id="concept-description"
                rows="4"
                className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Detailed description of the core concept..."
                required
              />
            </div>
            
            {/* Subject & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="concept-subject" className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Subject
                </label>
                <select
                  id="concept-subject"
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Algorithms">Algorithms</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="DBMS">DBMS</option>
                  <option value="Computer Networks">Computer Networks</option>
                  <option value="System Design">System Design</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="concept-difficulty" className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Difficulty Level
                </label>
                <select
                  id="concept-difficulty"
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                  value={formData.difficulty}
                  onChange={(e) => handleChange('difficulty', e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            
            {/* Status */}
            <div>
              <label htmlFor="concept-status" className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                Status
              </label>
              <select
                id="concept-status"
                className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            
            {/* Form Actions */}
            <div className={`flex justify-end gap-3 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                type="button"
                className={`px-6 py-2 rounded-lg transition-colors ${themeClasses.button.secondary}`}
                onClick={() => setFormData(initialData)}
              >
                Reset
              </button>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg transition-colors ${themeClasses.button.primary}`}
              >
                {mode === 'add' ? 'Add Concept' : 'Update Concept'}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
  
  // Dashboard Overview Component
  const DashboardOverview = () => {
    const stats = [
      { label: 'Total Users', value: '1,248', change: '+12%', icon: Users, color: 'blue' },
      { label: 'Active Questions', value: '856', change: '+8%', icon: HelpCircle, color: 'green' },
      { label: 'Core Concepts', value: '124', change: '+15%', icon: BookOpen, color: 'purple' },
      { label: 'Avg. User Score', value: '72%', change: '+5%', icon: BarChart3, color: 'orange' }
    ]
    
    return (
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className={`text-sm ${themeClasses.text.secondary}`}>{stat.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${themeClasses.text.primary}`}>{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${themeClasses.iconBg[stat.color]}`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'blue' ? isDark ? 'text-blue-400' : 'text-blue-600' :
                      stat.color === 'green' ? isDark ? 'text-green-400' : 'text-green-600' :
                      stat.color === 'purple' ? isDark ? 'text-purple-400' : 'text-purple-600' : 
                      isDark ? 'text-amber-400' : 'text-amber-600'
                    }`} />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  <span className={`text-sm ml-2 ${themeClasses.text.secondary}`}>from last month</span>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
            <h3 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Recent Activity</h3>
            <div className="space-y-4">
              {[
                { user: 'Admin', action: 'added new aptitude question', time: '2 hours ago' },
                { user: 'Sarah Miller', action: 'updated core concept', time: '5 hours ago' },
                { user: 'System', action: 'user registration completed', time: '1 day ago' },
                { user: 'Admin', action: 'published new content', time: '2 days ago' }
              ].map((activity, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${themeClasses.iconBg.blue}`}>
                    <User className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${themeClasses.text.primary}`}>
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className={`text-xs mt-1 ${themeClasses.text.secondary}`}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
            <h3 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Show different quick actions based on role */}
              {hasContentAccess && (
                <>
                  <button 
                    className={`p-4 border rounded-lg transition-colors text-center ${isDark ? 'border-gray-700 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}
                    onClick={() => setActiveModule('aptitude')}
                  >
                    <HelpCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className={`text-sm font-medium ${themeClasses.text.primary}`}>Add Question</p>
                    <p className={`text-xs mt-1 ${themeClasses.text.secondary}`}>Create new aptitude question</p>
                  </button>
                  
                  <button 
                    className={`p-4 border rounded-lg transition-colors text-center ${isDark ? 'border-gray-700 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}
                    onClick={() => setActiveModule('concepts')}
                  >
                    <BookOpen className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className={`text-sm font-medium ${themeClasses.text.primary}`}>Add Concept</p>
                    <p className={`text-xs mt-1 ${themeClasses.text.secondary}`}>Create new core concept</p>
                  </button>
                </>
              )}
              
              {isAdmin && (
                <button 
                  className={`p-4 border rounded-lg transition-colors text-center ${isDark ? 'border-gray-700 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => setActiveModule('users')}
                >
                  <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className={`text-sm font-medium ${themeClasses.text.primary}`}>Add User</p>
                  <p className={`text-xs mt-1 ${themeClasses.text.secondary}`}>Create new user account</p>
                </button>
              )}
              
              <button className={`p-4 border rounded-lg transition-colors text-center ${isDark ? 'border-gray-700 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                <Download className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className={`text-sm font-medium ${themeClasses.text.primary}`}>Export Data</p>
                <p className={`text-xs mt-1 ${themeClasses.text.secondary}`}>Export reports & analytics</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Aptitude Questions Management Component
  const AptitudeQuestionsModule = () => {
    return <AptitudeQuestionManagement theme={theme} />
  }
  
  // Core Concepts Management Component
  const CoreConceptsModule = () => {
    return (
      <div className="space-y-6">
        {/* Add Concept Form */}
        <CoreConceptForm 
          onSubmit={(data) => {
            console.log('Adding concept:', data)
            showToast.success('Core concept added successfully!')
          }}
        />
        
        {/* Concepts List */}
        <div className={`rounded-xl border overflow-hidden ${themeClasses.cardBg}`}>
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>All Core Concepts</h3>
              <p className={`text-sm ${themeClasses.text.secondary}`}>Manage educational content and subjects</p>
            </div>
            <button className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${themeClasses.button.primary}`}>
              <Plus className="w-4 h-4" />
              Add Concept
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${themeClasses.table.header}`}>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Difficulty</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Topics</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {coreConcepts.map((concept) => (
                  <tr key={concept.id} className={`transition-colors ${themeClasses.table.row}`}>
                    <td className="py-4 px-6">
                      <div>
                        <p className={`font-medium ${themeClasses.text.primary}`}>{concept.title}</p>
                        <p className={`text-sm mt-1 line-clamp-2 ${themeClasses.text.secondary}`}>{concept.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${themeClasses.iconBg.purple} ${isDark ? 'text-purple-400' : 'text-purple-800'}`}>
                        {concept.subject}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Star className={`w-4 h-4 ${
                          concept.difficulty === 'Beginner' ? 'text-green-500' :
                          concept.difficulty === 'Intermediate' ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                        <span className={`text-sm ${themeClasses.text.primary}`}>{concept.difficulty}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Hash className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                        <span className={`text-sm font-medium ${themeClasses.text.primary}`}>{concept.topics}</span>
                        <span className={`text-sm ${themeClasses.text.secondary}`}>topics</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        concept.status === 'Published' ? themeClasses.status.published :
                        concept.status === 'Draft' ? themeClasses.status.draft :
                        themeClasses.role.student
                      }`}>
                        {concept.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} aria-label="Edit concept">
                          <Edit className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} aria-label="Delete concept">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                        <button className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} aria-label="View concept">
                          <Eye className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
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
        return <DashboardOverview />
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
            <p className={themeClasses.text.secondary}>Settings panel would be implemented here.</p>
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
      <header className={`border-b sticky top-0 z-50 ${themeClasses.headerBg}`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 rounded-lg transition-colors hover:opacity-80"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                <Menu className="w-5 h-5 text-secondary" />
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
            
            {/* Right: User Menu & Notifications */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.text.secondary}`} />
                <input
                  type="search"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                  aria-label="Search in admin panel"
                />
              </div>
              
              {/* Notifications */}
              <button 
                className="p-2 rounded-lg relative transition-colors hover:opacity-80"
                aria-label="View notifications"
              >
                <Bell className={`w-5 h-5 ${themeClasses.text.secondary}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Profile Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:opacity-80"
                  aria-label="User profile menu"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${themeClasses.iconBg.blue}`}>
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="text-left hidden md:block">
                    <p className={`text-sm font-medium ${themeClasses.text.primary}`}>{user?.name || 'User'}</p>
                    <p className={`text-xs ${themeClasses.text.secondary}`}>
                      {user?.role === 'admin' ? 'Administrator' : 
                       user?.role === 'content-manager' ? 'Content Manager' : 'User'}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                </button>
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
            <p className={`${themeClasses.text.secondary} mt-2`}>
              {activeModule === 'users' && 'Manage user accounts, roles, and permissions'}
              {activeModule === 'aptitude' && 'Create and manage aptitude test questions'}
              {activeModule === 'concepts' && 'Manage educational content and core concepts'}
              {activeModule === 'dashboard' && 'Overview of platform analytics and metrics'}
              {activeModule === 'settings' && 'Configure platform settings and preferences'}
            </p>
          </div>
          
          {/* Main Content */}
          {renderContent()}
          
          {/* Footer */}
          <footer className={`mt-8 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className={`text-sm ${themeClasses.text.secondary}`}>
                © 2024 Learning Platform. All rights reserved.
              </p>
              <div className={`flex items-center gap-6 text-sm ${themeClasses.text.secondary}`}>
                <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-blue-500 transition-colors">Help Center</a>
              </div>
            </div>
          </footer>
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