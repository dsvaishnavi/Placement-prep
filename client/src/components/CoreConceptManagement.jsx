import { useState, useEffect } from 'react'
import { 
  Search, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, 
  Filter, Download, Upload, BarChart3, BookOpen, Type,
  Save, X, AlertCircle, Hash, Clock, User, Star, Youtube,
  ChevronDown, ChevronUp
} from 'lucide-react'
import { showToast } from '../utils/toast'

const CoreConceptManagement = ({ theme = 'light' }) => {
  const isDark = theme === 'dark'
  
  // Theme classes
  const themeClasses = {
    cardBg: isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
    },
    button: {
      primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90',
      secondary: isDark ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
      success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90',
      danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90',
    },
    input: isDark ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-200',
    table: {
      header: isDark ? 'bg-gray-800/50 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600',
      row: isDark ? 'hover:bg-white/5 border-gray-700' : 'hover:bg-gray-50 border-gray-200',
    },
    status: {
      Published: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200',
      Draft: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Archived: isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-800 border-gray-200',
    },
    difficulty: {
      Beginner: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200',
      Intermediate: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Advanced: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-800 border-red-200',
    },
    iconBg: {
      blue: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
      green: isDark ? 'bg-green-500/20' : 'bg-green-100',
      yellow: isDark ? 'bg-yellow-500/20' : 'bg-yellow-100',
      purple: isDark ? 'bg-purple-500/20' : 'bg-purple-100',
      orange: isDark ? 'bg-orange-500/20' : 'bg-orange-100',
    },
  }

  // State management
  const [concepts, setConcepts] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalConcepts, setTotalConcepts] = useState(0)
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  
  // Form state
  const [conceptForm, setConceptForm] = useState({
    title: '',
    description: '',
    subject: '',
    difficulty: 'Beginner',
    modules: [{ title: '', content: '' }],
    youtubeLink: '',
    status: 'Draft',
    tags: []
  })

  // Fetch concepts from API
  const fetchConcepts = async (page = 1) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search: searchTerm,
        difficulty: difficultyFilter !== 'all' ? difficultyFilter : '',
        status: statusFilter !== 'all' ? statusFilter : '',
        subject: subjectFilter !== 'all' ? subjectFilter : ''
      })

      console.log('Fetching concepts with params:', params.toString())

      const response = await fetch(`http://localhost:3000/core-concepts?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        setConcepts(data.concepts || [])
        setTotalPages(data.totalPages || 1)
        setTotalConcepts(data.total || 0)
        setCurrentPage(data.currentPage || 1)
      } else {
        console.error('Failed to fetch concepts:', data)
        showToast.error(data.message || 'Failed to fetch core concepts')
      }
    } catch (error) {
      console.error('Error fetching concepts:', error)
      showToast.error('Error fetching core concepts: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch statistics
  const fetchStats = async () => {
    try {
      setStatsLoading(true)
      const token = localStorage.getItem('token')
      
      const response = await fetch('http://localhost:3000/core-concepts/stats/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      } else {
        const errorData = await response.json()
        console.error('Failed to fetch statistics:', errorData)
        showToast.error('Failed to fetch statistics')
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      showToast.error('Error fetching statistics')
    } finally {
      setStatsLoading(false)
    }
  }

  useEffect(() => {
    fetchConcepts(1)
    fetchStats()
  }, [searchTerm, difficultyFilter, statusFilter, subjectFilter])

  // Handle form submission for creating concept
  const handleCreateConcept = async (e) => {
    e.preventDefault()
    
    console.log('Creating concept with data:', conceptForm)
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        showToast.error('No authentication token found. Please login again.')
        return
      }
      
      const response = await fetch('http://localhost:3000/core-concepts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(conceptForm)
      })

      console.log('Create response status:', response.status)
      const data = await response.json()
      console.log('Create response data:', data)

      if (response.ok) {
        showToast.success('Core concept created successfully!')
        setShowAddModal(false)
        resetForm()
        fetchConcepts(currentPage)
        fetchStats()
      } else {
        console.error('Failed to create concept:', data)
        showToast.error(data.message || 'Failed to create core concept')
      }
    } catch (error) {
      console.error('Error creating concept:', error)
      showToast.error('Error creating core concept: ' + error.message)
    }
  }

  // Handle form submission for updating concept
  const handleUpdateConcept = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch(`http://localhost:3000/core-concepts/${selectedConcept._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(conceptForm)
      })

      if (response.ok) {
        showToast.success('Core concept updated successfully!')
        setShowEditModal(false)
        resetForm()
        fetchConcepts(currentPage)
        fetchStats()
      } else {
        const data = await response.json()
        showToast.error(data.message || 'Failed to update core concept')
      }
    } catch (error) {
      console.error('Error updating concept:', error)
      showToast.error('Error updating core concept')
    }
  }

  // Handle concept deletion
  const handleDeleteConcept = async (conceptId) => {
    if (!window.confirm('Are you sure you want to delete this core concept?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch(`http://localhost:3000/core-concepts/${conceptId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        showToast.success('Core concept deleted successfully!')
        fetchConcepts(currentPage)
        fetchStats()
      } else {
        const data = await response.json()
        showToast.error(data.message || 'Failed to delete core concept')
      }
    } catch (error) {
      console.error('Error deleting concept:', error)
      showToast.error('Error deleting core concept')
    }
  }

  // Reset form
  const resetForm = () => {
    setConceptForm({
      title: '',
      description: '',
      subject: '',
      difficulty: 'Beginner',
      modules: [{ title: '', content: '' }],
      youtubeLink: '',
      status: 'Draft',
      tags: []
    })
  }

  // Handle modal open/close with body scroll prevention
  const openModal = (type, concept = null) => {
    document.body.classList.add('modal-open')
    
    if (type === 'add') {
      setShowAddModal(true)
    } else if (type === 'edit') {
      setSelectedConcept(concept)
      setConceptForm({
        title: concept.title,
        description: concept.description,
        subject: concept.subject,
        difficulty: concept.difficulty,
        modules: concept.modules && concept.modules.length > 0 ? concept.modules : [{ title: '', content: '' }],
        youtubeLink: concept.youtubeLink || '',
        status: concept.status,
        tags: concept.tags || []
      })
      setShowEditModal(true)
    } else if (type === 'view') {
      setSelectedConcept(concept)
      setShowViewModal(true)
    }
  }

  const closeModal = () => {
    document.body.classList.remove('modal-open')
    setShowAddModal(false)
    setShowEditModal(false)
    setShowViewModal(false)
    resetForm()
  }

  // Open edit modal
  const openEditModal = (concept) => {
    openModal('edit', concept)
  }

  // Open view modal
  const openViewModal = (concept) => {
    openModal('view', concept)
  }

  // Handle module changes
  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...conceptForm.modules]
    updatedModules[index] = { ...updatedModules[index], [field]: value }
    setConceptForm({ ...conceptForm, modules: updatedModules })
  }

  // Add new module
  const handleAddModule = () => {
    setConceptForm({
      ...conceptForm,
      modules: [...conceptForm.modules, { title: '', content: '' }]
    })
  }

  // Delete module
  const handleDeleteModule = (index) => {
    if (conceptForm.modules.length > 1) {
      const updatedModules = conceptForm.modules.filter((_, i) => i !== index)
      setConceptForm({ ...conceptForm, modules: updatedModules })
    }
  }

  // Statistics Cards Component
  const StatisticsCards = () => {
    if (statsLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`rounded-xl border p-6 animate-pulse ${themeClasses.cardBg}`}>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      )
    }

    if (!stats) return null

    const statsData = [
      { 
        label: 'Total Concepts', 
        value: stats.total, 
        icon: BookOpen, 
        color: 'blue',
        change: `+${stats.recentlyAdded} this week`
      },
      { 
        label: 'Published', 
        value: stats.published, 
        icon: CheckCircle, 
        color: 'green',
        change: `${Math.round((stats.published / stats.total) * 100)}% of total`
      },
      { 
        label: 'Draft', 
        value: stats.draft, 
        icon: Edit, 
        color: 'yellow',
        change: `${Math.round((stats.draft / stats.total) * 100)}% of total`
      },
      { 
        label: 'Subjects Covered', 
        value: stats.bySubject?.length || 0, 
        icon: Hash, 
        color: 'purple',
        change: 'Active subjects'
      }
    ]

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => {
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
                    stat.color === 'yellow' ? isDark ? 'text-yellow-400' : 'text-yellow-600' : 
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-sm ${themeClasses.text.secondary}`}>{stat.change}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <StatisticsCards />

      {/* Filters and Search */}
      <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.text.secondary}`} />
              <input
                type="text"
                placeholder="Search concepts..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="all">All Subjects</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Algorithms">Algorithms</option>
              <option value="Operating Systems">Operating Systems</option>
              <option value="DBMS">DBMS</option>
              <option value="Computer Networks">Computer Networks</option>
              <option value="System Design">System Design</option>
            </select>

            <select
              className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select
              className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>

            <button
              onClick={() => openModal('add')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${themeClasses.button.primary}`}
            >
              <Plus className="w-4 h-4" />
              Add Concept
            </button>
          </div>
        </div>
      </div>

      {/* Concepts Table */}
      <div className={`rounded-xl border overflow-hidden ${themeClasses.cardBg}`}>
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Core Concepts</h3>
            <p className={`text-sm ${themeClasses.text.secondary}`}>
              {totalConcepts} concepts found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className={`mt-2 ${themeClasses.text.secondary}`}>Loading concepts...</p>
          </div>
        ) : concepts.length === 0 ? (
          <div className="p-8 text-center">
            <BookOpen className={`w-12 h-12 mx-auto mb-4 ${themeClasses.text.secondary}`} />
            <p className={`text-lg font-medium ${themeClasses.text.primary}`}>No concepts found</p>
            <p className={`${themeClasses.text.secondary}`}>Create your first core concept to get started.</p>
            <button
              onClick={() => openModal('add')}
              className={`mt-4 px-4 py-2 rounded-lg transition-colors ${themeClasses.button.primary}`}
            >
              Add First Concept
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${themeClasses.table.header}`}>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Difficulty</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Modules</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {concepts.map((concept) => (
                  <tr key={concept._id} className={`transition-colors ${themeClasses.table.row}`}>
                    <td className="py-4 px-6">
                      <div>
                        <p className={`font-medium ${themeClasses.text.primary}`}>{concept.title}</p>
                        <p className={`text-sm mt-1 line-clamp-2 ${themeClasses.text.secondary}`}>
                          {concept.description}
                        </p>
                        {concept.youtubeLink && (
                          <div className="flex items-center gap-1 mt-1">
                            <Youtube className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-red-500">Video Available</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${themeClasses.iconBg.purple} ${isDark ? 'text-purple-400' : 'text-purple-800'}`}>
                        {concept.subject}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${themeClasses.difficulty[concept.difficulty]}`}>
                        {concept.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Hash className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                        <span className={`text-sm font-medium ${themeClasses.text.primary}`}>
                          {concept.moduleCount || concept.modules?.length || 0}
                        </span>
                        <span className={`text-sm ${themeClasses.text.secondary}`}>modules</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${themeClasses.status[concept.status]}`}>
                        {concept.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openViewModal(concept)}
                          className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} 
                          aria-label="View concept"
                        >
                          <Eye className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                        </button>
                        <button 
                          onClick={() => openEditModal(concept)}
                          className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} 
                          aria-label="Edit concept"
                        >
                          <Edit className="w-4 h-4 text-blue-500" />
                        </button>
                        <button 
                          onClick={() => handleDeleteConcept(concept._id)}
                          className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} 
                          aria-label="Delete concept"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <div className={`text-sm ${themeClasses.text.secondary}`}>
              Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalConcepts)} of {totalConcepts} concepts
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => fetchConcepts(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === 1 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:opacity-80'
                } ${themeClasses.button.secondary}`}
              >
                Previous
              </button>
              <span className={`px-3 py-1 ${themeClasses.text.primary}`}>
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => fetchConcepts(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === totalPages 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:opacity-80'
                } ${themeClasses.button.secondary}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay">
          {/* Transparent Backdrop - No black background */}
          <div 
            className="fixed inset-0 transition-opacity"
            onClick={closeModal}
          ></div>
          
          {/* Modal Container */}
          <div className="modal-container">
            <div className={`modal-content ${themeClasses.cardBg}`}>
              {/* Modal Header */}
              <div className={`sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} rounded-t-xl`}>
                <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>
                  {showAddModal ? 'Add New Core Concept' : 'Edit Core Concept'}
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className={`rounded-lg p-2 transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                >
                  <X className={`h-5 w-5 ${themeClasses.text.secondary}`} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-scroll max-h-[calc(90vh-120px)] overflow-y-auto">
                <form onSubmit={showAddModal ? handleCreateConcept : handleUpdateConcept} className="p-6">
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                        Concept Title *
                      </label>
                      <input
                        type="text"
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                        value={conceptForm.title}
                        onChange={(e) => setConceptForm({ ...conceptForm, title: e.target.value })}
                        placeholder="e.g., Data Structures - Arrays"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                        Description *
                      </label>
                      <textarea
                        rows="4"
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                        value={conceptForm.description}
                        onChange={(e) => setConceptForm({ ...conceptForm, description: e.target.value })}
                        placeholder="Detailed description of the core concept..."
                        required
                      />
                    </div>

                    {/* Subject & Difficulty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                          Subject *
                        </label>
                        <select
                          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                          value={conceptForm.subject}
                          onChange={(e) => setConceptForm({ ...conceptForm, subject: e.target.value })}
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
                    <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                      Difficulty Level *
                    </label>
                    <select
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                      value={conceptForm.difficulty}
                      onChange={(e) => setConceptForm({ ...conceptForm, difficulty: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* YouTube Link */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    YouTube Video Reference Link
                  </label>
                  <input
                    type="url"
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={conceptForm.youtubeLink}
                    onChange={(e) => setConceptForm({ ...conceptForm, youtubeLink: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className={`text-xs mt-1 ${themeClasses.text.secondary}`}>
                    Optional: Add a YouTube video link for additional learning reference
                  </p>
                </div>

                {/* Modules Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className={`block text-sm font-medium ${themeClasses.text.primary}`}>
                      Modules
                    </label>
                    <button
                      type="button"
                      onClick={handleAddModule}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${themeClasses.button.primary}`}
                    >
                      + Add Module
                    </button>
                  </div>

                  <div className="space-y-4">
                    {conceptForm.modules.map((module, index) => (
                      <div key={index} className={`p-4 border rounded-lg relative group ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-center mb-3">
                          <span className={`font-medium ${themeClasses.text.primary}`}>
                            Module {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteModule(index)}
                            className={`px-3 py-1 text-sm rounded transition-colors ${
                              conceptForm.modules.length > 1 
                                ? `${themeClasses.button.danger} opacity-0 group-hover:opacity-100`
                                : 'opacity-0 cursor-not-allowed'
                            }`}
                            disabled={conceptForm.modules.length <= 1}
                          >
                            Delete
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className={`block text-xs font-medium mb-1 ${themeClasses.text.secondary}`}>
                              Module Title
                            </label>
                            <input
                              type="text"
                              className={`w-full px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                              value={module.title}
                              onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
                              placeholder={`Module ${index + 1} Title`}
                              required
                            />
                          </div>

                          <div>
                            <label className={`block text-xs font-medium mb-1 ${themeClasses.text.secondary}`}>
                              Module Content
                            </label>
                            <textarea
                              rows="3"
                              className={`w-full px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                              value={module.content}
                              onChange={(e) => handleModuleChange(index, 'content', e.target.value)}
                              placeholder={`Enter content for Module ${index + 1}...`}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {conceptForm.modules.length === 0 && (
                      <div className={`text-center py-8 border-2 border-dashed rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                        <p className={themeClasses.text.secondary}>No modules added yet</p>
                        <button
                          type="button"
                          onClick={handleAddModule}
                          className={`mt-2 px-4 py-2 text-sm rounded-lg transition-colors ${themeClasses.button.primary}`}
                        >
                          Create Your First Module
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Status
                  </label>
                  <select
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={conceptForm.status}
                    onChange={(e) => setConceptForm({ ...conceptForm, status: e.target.value })}
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
                        onClick={() => {
                          setShowAddModal(false)
                          setShowEditModal(false)
                          resetForm()
                        }}
                        className={`px-6 py-2 rounded-lg transition-colors ${themeClasses.button.secondary}`}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-6 py-2 rounded-lg transition-colors ${themeClasses.button.primary}`}
                      >
                        {showAddModal ? 'Create Concept' : 'Update Concept'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedConcept && (
        <div className="modal-overlay">
          {/* Transparent Backdrop - No black background */}
          <div 
            className="fixed inset-0 transition-opacity"
            onClick={closeModal}
          ></div>
          
          {/* Modal Container */}
          <div className="modal-container">
            <div className={`modal-content ${themeClasses.cardBg}`}>
              {/* Modal Header */}
              <div className={`sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} rounded-t-xl`}>
                <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>
                  View Core Concept
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className={`rounded-lg p-2 transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                >
                  <X className={`h-5 w-5 ${themeClasses.text.secondary}`} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="modal-scroll max-h-[calc(90vh-120px)] overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Header Info */}
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 ${themeClasses.text.primary}`}>
                      {selectedConcept.title}
                    </h2>
                    <p className={`text-lg ${themeClasses.text.secondary} mb-4`}>
                      {selectedConcept.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${themeClasses.iconBg.purple} ${isDark ? 'text-purple-400' : 'text-purple-800'}`}>
                        {selectedConcept.subject}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${themeClasses.difficulty[selectedConcept.difficulty]}`}>
                        {selectedConcept.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${themeClasses.status[selectedConcept.status]}`}>
                        {selectedConcept.status}
                      </span>
                    </div>

                    {selectedConcept.youtubeLink && (
                      <div className="mb-4">
                        <a
                          href={selectedConcept.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Youtube className="w-4 h-4" />
                          Watch Video Tutorial
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Modules */}
                  {selectedConcept.modules && selectedConcept.modules.length > 0 && (
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>
                        Modules ({selectedConcept.modules.length})
                      </h3>
                      <div className="space-y-4">
                        {selectedConcept.modules.map((module, index) => (
                          <div key={index} className={`p-4 border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                            <h4 className={`font-medium mb-2 ${themeClasses.text.primary}`}>
                              {index + 1}. {module.title}
                            </h4>
                            <div className={`text-sm ${themeClasses.text.secondary} whitespace-pre-wrap`}>
                              {module.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Metadata */}
                  <div className={`pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className={`font-medium ${themeClasses.text.primary}`}>Created by:</span>
                        <span className={`ml-2 ${themeClasses.text.secondary}`}>
                          {selectedConcept.createdBy?.name || 'Unknown'}
                        </span>
                      </div>
                      <div>
                        <span className={`font-medium ${themeClasses.text.primary}`}>Created at:</span>
                        <span className={`ml-2 ${themeClasses.text.secondary}`}>
                          {new Date(selectedConcept.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {selectedConcept.updatedBy && (
                        <div>
                          <span className={`font-medium ${themeClasses.text.primary}`}>Updated by:</span>
                          <span className={`ml-2 ${themeClasses.text.secondary}`}>
                            {selectedConcept.updatedBy?.name || 'Unknown'}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className={`font-medium ${themeClasses.text.primary}`}>Last updated:</span>
                        <span className={`ml-2 ${themeClasses.text.secondary}`}>
                          {new Date(selectedConcept.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CoreConceptManagement