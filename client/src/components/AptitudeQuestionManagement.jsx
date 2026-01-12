import { useState, useEffect } from 'react'
import { 
  Search, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, 
  Filter, Download, Upload, BarChart3, HelpCircle, Type,
  Save, X, AlertCircle, BookOpen, Tag, Clock, User
} from 'lucide-react'
import { showToast } from '../utils/toast'

const AptitudeQuestionManagement = ({ theme = 'light' }) => {
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
      published: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200',
      draft: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    difficulty: {
      Easy: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200',
      Medium: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Hard: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-800 border-red-200',
    },
    iconBg: {
      blue: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
      green: isDark ? 'bg-green-500/20' : 'bg-green-100',
      yellow: isDark ? 'bg-yellow-500/20' : 'bg-yellow-100',
      purple: isDark ? 'bg-purple-500/20' : 'bg-purple-100',
    },
  }

  // State management
  const [questions, setQuestions] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [topicFilter, setTopicFilter] = useState('all')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalQuestions, setTotalQuestions] = useState(0)
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  
  // Form state
  const [questionForm, setQuestionForm] = useState({
    question: '',
    options: { A: '', B: '', C: '', D: '' },
    correctAnswer: '',
    difficulty: 'Medium',
    topic: '',
    solution: '',
    status: 'Draft',
    tags: []
  })

  // Fetch questions from API
  const fetchQuestions = async (page = 1) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search: searchTerm,
        difficulty: difficultyFilter !== 'all' ? difficultyFilter : '',
        status: statusFilter !== 'all' ? statusFilter : '',
        topic: topicFilter !== 'all' ? topicFilter : ''
      })

      console.log('Fetching questions with params:', params.toString())

      const response = await fetch(`http://localhost:3000/aptitude?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        setQuestions(data.questions || [])
        setTotalPages(data.totalPages || 1)
        setTotalQuestions(data.total || 0)
        setCurrentPage(data.currentPage || 1)
      } else {
        console.error('Failed to fetch questions:', data)
        showToast.error(data.message || 'Failed to fetch questions')
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
      showToast.error('Error fetching questions: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Fetch statistics
  const fetchStats = async () => {
    try {
      setStatsLoading(true)
      const token = localStorage.getItem('token')
      
      const response = await fetch('http://localhost:3000/aptitude/stats/overview', {
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
    fetchQuestions(1)
    fetchStats()
  }, [searchTerm, difficultyFilter, statusFilter, topicFilter])

  // Handle form submission for creating question
  const handleCreateQuestion = async (e) => {
    e.preventDefault()
    
    console.log('Creating question with data:', questionForm)
    
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        showToast.error('No authentication token found. Please login again.')
        return
      }
      
      const response = await fetch('http://localhost:3000/aptitude', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionForm)
      })

      console.log('Create response status:', response.status)
      const data = await response.json()
      console.log('Create response data:', data)

      if (response.ok) {
        showToast.success('Question created successfully!')
        setShowAddModal(false)
        resetForm()
        fetchQuestions(currentPage)
        fetchStats()
      } else {
        console.error('Failed to create question:', data)
        showToast.error(data.message || 'Failed to create question')
      }
    } catch (error) {
      console.error('Error creating question:', error)
      showToast.error('Error creating question: ' + error.message)
    }
  }

  // Handle form submission for updating question
  const handleUpdateQuestion = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch(`http://localhost:3000/aptitude/${selectedQuestion._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(questionForm)
      })

      if (response.ok) {
        showToast.success('Question updated successfully!')
        setShowEditModal(false)
        resetForm()
        fetchQuestions(currentPage)
        fetchStats()
      } else {
        const data = await response.json()
        showToast.error(data.message || 'Failed to update question')
      }
    } catch (error) {
      console.error('Error updating question:', error)
      showToast.error('Error updating question')
    }
  }

  // Handle question deletion
  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch(`http://localhost:3000/aptitude/${questionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        showToast.success('Question deleted successfully!')
        fetchQuestions(currentPage)
        fetchStats()
      } else {
        const data = await response.json()
        showToast.error(data.message || 'Failed to delete question')
      }
    } catch (error) {
      console.error('Error deleting question:', error)
      showToast.error('Error deleting question')
    }
  }

  // Reset form
  const resetForm = () => {
    setQuestionForm({
      question: '',
      options: { A: '', B: '', C: '', D: '' },
      correctAnswer: '',
      difficulty: 'Medium',
      topic: '',
      solution: '',
      status: 'Draft',
      tags: []
    })
  }

  // Open edit modal
  const openEditModal = (question) => {
    setSelectedQuestion(question)
    setQuestionForm({
      question: question.question,
      options: question.options,
      correctAnswer: question.correctAnswer,
      difficulty: question.difficulty,
      topic: question.topic,
      solution: question.solution || '',
      status: question.status,
      tags: question.tags || []
    })
    setShowEditModal(true)
  }

  // Open view modal
  const openViewModal = (question) => {
    setSelectedQuestion(question)
    setShowViewModal(true)
  }

  // Get unique topics for filter
  const uniqueTopics = [...new Set(questions.map(q => q.topic))].sort()

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              label: 'Total Questions', 
              value: stats.total.toString(), 
              icon: HelpCircle, 
              color: 'blue',
              subtext: `${stats.recentlyAdded} added this week`
            },
            { 
              label: 'Published', 
              value: stats.published.toString(), 
              icon: CheckCircle, 
              color: 'green',
              subtext: `${Math.round((stats.published / (stats.total || 1)) * 100)}% of total`
            },
            { 
              label: 'In Draft', 
              value: stats.draft.toString(), 
              icon: Type, 
              color: 'yellow',
              subtext: `${Math.round((stats.draft / (stats.total || 1)) * 100)}% of total`
            },
            { 
              label: 'Topics Covered', 
              value: stats.topTopics.length.toString(), 
              icon: BookOpen, 
              color: 'purple',
              subtext: 'Different categories'
            }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${themeClasses.text.secondary}`}>{stat.label}</p>
                    <p className={`text-2xl font-bold mt-1 ${themeClasses.text.primary}`}>{stat.value}</p>
                    <p className={`text-xs mt-1 ${themeClasses.text.secondary}`}>{stat.subtext}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${themeClasses.iconBg[stat.color]}`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'blue' ? 'text-blue-500' :
                      stat.color === 'green' ? 'text-green-500' :
                      stat.color === 'yellow' ? 'text-yellow-500' : 'text-purple-500'
                    }`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Controls */}
      <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className={`text-xl font-semibold ${themeClasses.text.primary}`}>Aptitude Questions</h2>
            <p className={`text-sm ${themeClasses.text.secondary}`}>
              Manage and organize aptitude questions for the platform
            </p>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${themeClasses.button.primary}`}
          >
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.text.secondary}`} />
            <input
              type="text"
              placeholder="Search questions..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          
          <select
            className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
          
          <select
            className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
          >
            <option value="all">All Topics</option>
            {uniqueTopics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Questions Table */}
      <div className={`rounded-xl border overflow-hidden ${themeClasses.cardBg}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${themeClasses.table.header}`}>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Question</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Topic</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Difficulty</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Created</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      <span className={`ml-2 ${themeClasses.text.secondary}`}>Loading questions...</span>
                    </div>
                  </td>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center">
                    <div className="flex flex-col items-center">
                      <HelpCircle className={`w-12 h-12 ${themeClasses.text.secondary} mb-2`} />
                      <p className={`${themeClasses.text.secondary}`}>No questions found</p>
                      <p className={`text-sm ${themeClasses.text.secondary} mt-1`}>
                        {searchTerm || difficultyFilter !== 'all' || statusFilter !== 'all' || topicFilter !== 'all' 
                          ? 'Try adjusting your filters' 
                          : 'Click "Add Question" to create your first question'
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                questions.map((question) => (
                  <tr key={question._id} className={`transition-colors ${themeClasses.table.row}`}>
                    <td className="py-4 px-6">
                      <div className="max-w-xs">
                        <p className={`font-medium line-clamp-2 ${themeClasses.text.primary}`}>
                          Q{question.questionNumber}: {question.question}
                        </p>
                        <p className={`text-sm mt-1 ${themeClasses.text.secondary}`}>
                          Correct: Option {question.correctAnswer}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${themeClasses.iconBg.blue} ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
                        {question.topic}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${themeClasses.difficulty[question.difficulty]}`}>
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${themeClasses.status[question.status.toLowerCase()]}`}>
                        {question.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Clock className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                        <span className={`text-sm ${themeClasses.text.secondary}`}>
                          {new Date(question.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {question.createdBy && (
                        <div className="flex items-center gap-2 mt-1">
                          <User className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                          <span className={`text-xs ${themeClasses.text.secondary}`}>
                            {question.createdBy.name}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openViewModal(question)}
                          className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} 
                          aria-label="View question"
                        >
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button 
                          onClick={() => openEditModal(question)}
                          className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} 
                          aria-label="Edit question"
                        >
                          <Edit className="w-4 h-4 text-green-500" />
                        </button>
                        <button 
                          onClick={() => handleDeleteQuestion(question._id)}
                          className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`} 
                          aria-label="Delete question"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`px-6 py-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
            <div className={`text-sm ${themeClasses.text.secondary}`}>
              Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalQuestions)} of {totalQuestions} questions
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchQuestions(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === 1 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${themeClasses.text.secondary}`}
              >
                Previous
              </button>
              <span className={`px-3 py-1 ${themeClasses.text.primary}`}>
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => fetchQuestions(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded transition-colors ${
                  currentPage === totalPages 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                } ${themeClasses.text.secondary}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border ${themeClasses.cardBg}`}>
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex justify-between items-center`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${themeClasses.iconBg.blue}`}>
                  <Plus className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${themeClasses.text.primary}`}>
                    Add New Question
                  </h3>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>
                    Create a new aptitude question
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  resetForm()
                }}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <form onSubmit={handleCreateQuestion} className="space-y-6">
                {/* Question Text */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Question Text *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={questionForm.question}
                    onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                    placeholder="Enter the question text..."
                  />
                </div>

                {/* Options */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Answer Options *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div key={option}>
                        <label className={`block text-xs font-medium mb-1 ${themeClasses.text.secondary}`}>
                          Option {option}
                        </label>
                        <input
                          type="text"
                          required
                          className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                          value={questionForm.options[option]}
                          onChange={(e) => setQuestionForm({
                            ...questionForm,
                            options: { ...questionForm.options, [option]: e.target.value }
                          })}
                          placeholder={`Enter option ${option}...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Correct Answer */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Correct Answer *
                  </label>
                  <select
                    required
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={questionForm.correctAnswer}
                    onChange={(e) => setQuestionForm({ ...questionForm, correctAnswer: e.target.value })}
                  >
                    <option value="">Select correct answer</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>

                {/* Topic and Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                      Topic *
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                      value={questionForm.topic}
                      onChange={(e) => setQuestionForm({ ...questionForm, topic: e.target.value })}
                      placeholder="e.g., Logical Reasoning, Quantitative Aptitude"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                      Difficulty *
                    </label>
                    <select
                      required
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                      value={questionForm.difficulty}
                      onChange={(e) => setQuestionForm({ ...questionForm, difficulty: e.target.value })}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Solution (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={questionForm.solution}
                    onChange={(e) => setQuestionForm({ ...questionForm, solution: e.target.value })}
                    placeholder="Explain the solution or approach..."
                  />
                </div>

                {/* Status */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Status
                  </label>
                  <select
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={questionForm.status}
                    onChange={(e) => setQuestionForm({ ...questionForm, status: e.target.value })}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false)
                      resetForm()
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors border ${themeClasses.button.secondary}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${themeClasses.button.primary}`}
                  >
                    <Save className="w-4 h-4" />
                    Create Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Question Modal */}
      {showViewModal && selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border ${themeClasses.cardBg}`}>
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex justify-between items-center`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${themeClasses.iconBg.blue}`}>
                  <HelpCircle className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${themeClasses.text.primary}`}>
                    Question #{selectedQuestion.questionNumber}
                  </h3>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>
                    View Question Details
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {/* Question Details */}
                <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Question</h4>
                  <p className={`text-sm ${themeClasses.text.primary} leading-relaxed`}>
                    {selectedQuestion.question}
                  </p>
                </div>

                {/* Options */}
                <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Answer Options</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div key={option} className={`p-3 rounded-lg border ${
                        selectedQuestion.correctAnswer === option 
                          ? isDark ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-green-100 border-green-200 text-green-800'
                          : isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${
                            selectedQuestion.correctAnswer === option 
                              ? isDark ? 'text-green-400' : 'text-green-800'
                              : themeClasses.text.secondary
                          }`}>
                            {option}.
                          </span>
                          <span className={`${
                            selectedQuestion.correctAnswer === option 
                              ? isDark ? 'text-green-400' : 'text-green-800'
                              : themeClasses.text.primary
                          }`}>
                            {selectedQuestion.options[option]}
                          </span>
                          {selectedQuestion.correctAnswer === option && (
                            <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metadata */}
                <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <h4 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Question Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Topic</label>
                      <p className={`mt-1 text-sm ${themeClasses.text.primary}`}>{selectedQuestion.topic}</p>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Difficulty</label>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium border ${themeClasses.difficulty[selectedQuestion.difficulty]}`}>
                        {selectedQuestion.difficulty}
                      </span>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Status</label>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium border ${themeClasses.status[selectedQuestion.status.toLowerCase()]}`}>
                        {selectedQuestion.status}
                      </span>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Created</label>
                      <p className={`mt-1 text-sm ${themeClasses.text.primary}`}>
                        {new Date(selectedQuestion.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Solution */}
                {selectedQuestion.solution && (
                  <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Solution</h4>
                    <p className={`text-sm ${themeClasses.text.primary} leading-relaxed`}>
                      {selectedQuestion.solution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Question Modal */}
      {showEditModal && selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border ${themeClasses.cardBg}`}>
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex justify-between items-center`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${themeClasses.iconBg.green}`}>
                  <Edit className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${themeClasses.text.primary}`}>
                    Edit Question #{selectedQuestion.questionNumber}
                  </h3>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>
                    Modify question details
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  resetForm()
                }}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <form onSubmit={handleUpdateQuestion} className="space-y-6">
                {/* Question Text */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Question Text *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={questionForm.question}
                    onChange={(e) => setQuestionForm({ ...questionForm, question: e.target.value })}
                    placeholder="Enter the question text..."
                  />
                </div>

                {/* Options */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Answer Options *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['A', 'B', 'C', 'D'].map((option) => (
                      <div key={option}>
                        <label className={`block text-xs font-medium mb-1 ${themeClasses.text.secondary}`}>
                          Option {option}
                        </label>
                        <input
                          type="text"
                          required
                          className={`w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                          value={questionForm.options[option]}
                          onChange={(e) => setQuestionForm({
                            ...questionForm,
                            options: { ...questionForm.options, [option]: e.target.value }
                          })}
                          placeholder={`Enter option ${option}...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Correct Answer */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Correct Answer *
                  </label>
                  <select
                    required
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={questionForm.correctAnswer}
                    onChange={(e) => setQuestionForm({ ...questionForm, correctAnswer: e.target.value })}
                  >
                    <option value="">Select correct answer</option>
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>

                {/* Topic and Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                      Topic *
                    </label>
                    <input
                      type="text"
                      required
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                      value={questionForm.topic}
                      onChange={(e) => setQuestionForm({ ...questionForm, topic: e.target.value })}
                      placeholder="e.g., Logical Reasoning, Quantitative Aptitude"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                      Difficulty *
                    </label>
                    <select
                      required
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                      value={questionForm.difficulty}
                      onChange={(e) => setQuestionForm({ ...questionForm, difficulty: e.target.value })}
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Solution (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={questionForm.solution}
                    onChange={(e) => setQuestionForm({ ...questionForm, solution: e.target.value })}
                    placeholder="Explain the solution or approach..."
                  />
                </div>

                {/* Status */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Status
                  </label>
                  <select
                    className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                    value={questionForm.status}
                    onChange={(e) => setQuestionForm({ ...questionForm, status: e.target.value })}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false)
                      resetForm()
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors border ${themeClasses.button.secondary}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${themeClasses.button.success}`}
                  >
                    <Save className="w-4 h-4" />
                    Update Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AptitudeQuestionManagement