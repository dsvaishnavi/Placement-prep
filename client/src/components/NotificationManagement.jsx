import { useState, useEffect } from 'react'
import { 
  Search, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, 
  Filter, Bell, AlertCircle, Info, AlertTriangle,
  Save, X, Users, Clock, User
} from 'lucide-react'
import { showToast } from '../utils/toast'

const NotificationManagement = ({ theme = 'light' }) => {
  const isDark = theme === 'dark'
  
  // Theme classes (matching AptitudeQuestionManagement pattern)
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
      active: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200',
      inactive: isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-800 border-gray-200',
    },
    type: {
      info: isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-800 border-blue-200',
      success: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200',
      warning: isDark ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-yellow-100 text-yellow-800 border-yellow-200',
      error: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-800 border-red-200',
      announcement: isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-800 border-purple-200',
    },
    iconBg: {
      blue: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
      green: isDark ? 'bg-green-500/20' : 'bg-green-100',
      yellow: isDark ? 'bg-yellow-500/20' : 'bg-yellow-100',
      purple: isDark ? 'bg-purple-500/20' : 'bg-purple-100',
    },
  }

  // State management
  const [notifications, setNotifications] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [audienceFilter, setAudienceFilter] = useState('all')
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalNotifications, setTotalNotifications] = useState(0)
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)
  
  // Form state
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'medium',
    targetAudience: 'all',
    expiresAt: ''
  })

  // Fetch notifications from API
  const fetchNotifications = async (page = 1) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        type: typeFilter !== 'all' ? typeFilter : '',
        targetAudience: audienceFilter !== 'all' ? audienceFilter : ''
      })

      console.log('Fetching notifications with params:', params.toString())

      const response = await fetch(`http://localhost:3000/notifications/all?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok) {
        setNotifications(data.notifications || [])
        setTotalPages(data.totalPages || 1)
        setTotalNotifications(data.total || 0)
        setCurrentPage(data.currentPage || 1)
      } else {
        console.error('Failed to fetch notifications:', data)
        showToast(data.message || 'Failed to fetch notifications', 'error')
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      showToast('Error fetching notifications: ' + error.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Fetch statistics
  const fetchStats = async () => {
    try {
      setStatsLoading(true)
      const token = localStorage.getItem('token')
      
      const response = await fetch('http://localhost:3000/notifications/stats', {
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
      }
    } catch (error) {
      console.error('Error fetching statistics:', error)
    } finally {
      setStatsLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchNotifications(currentPage)
    fetchStats()
  }, [currentPage, typeFilter, audienceFilter])

  // Handle search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (currentPage === 1) {
        fetchNotifications(1)
      } else {
        setCurrentPage(1)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  // Handle add notification
  const handleAddNotification = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      
      console.log('Creating notification:', notificationForm)
      
      const response = await fetch('http://localhost:3000/notifications/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationForm)
      })

      const data = await response.json()
      console.log('Create response:', data)

      if (response.ok) {
        showToast('Notification created successfully', 'success')
        setShowAddModal(false)
        resetForm()
        fetchNotifications(currentPage)
        fetchStats()
      } else {
        showToast(data.message || 'Failed to create notification', 'error')
      }
    } catch (error) {
      console.error('Error creating notification:', error)
      showToast('Error creating notification: ' + error.message, 'error')
    }
  }

  // Handle edit notification
  const handleEditNotification = async (e) => {
    e.preventDefault()
    
    try {
      const token = localStorage.getItem('token')
      
      console.log('Updating notification:', notificationForm)
      
      const response = await fetch(`http://localhost:3000/notifications/update/${selectedNotification._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationForm)
      })

      const data = await response.json()
      console.log('Update response:', data)

      if (response.ok) {
        showToast('Notification updated successfully', 'success')
        setShowEditModal(false)
        setSelectedNotification(null)
        resetForm()
        fetchNotifications(currentPage)
        fetchStats()
      } else {
        showToast(data.message || 'Failed to update notification', 'error')
      }
    } catch (error) {
      console.error('Error updating notification:', error)
      showToast('Error updating notification: ' + error.message, 'error')
    }
  }

  // Handle delete notification
  const handleDeleteNotification = async (id) => {
    if (!confirm('Are you sure you want to delete this notification?')) return
    
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch(`http://localhost:3000/notifications/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (response.ok) {
        showToast('Notification deleted successfully', 'success')
        fetchNotifications(currentPage)
        fetchStats()
      } else {
        showToast(data.message || 'Failed to delete notification', 'error')
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
      showToast('Error deleting notification: ' + error.message, 'error')
    }
  }

  // Open edit modal
  const openEditModal = (notification) => {
    setSelectedNotification(notification)
    setNotificationForm({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      priority: notification.priority,
      targetAudience: notification.targetAudience,
      expiresAt: notification.expiresAt ? new Date(notification.expiresAt).toISOString().slice(0, 16) : ''
    })
    setShowEditModal(true)
  }

  // Reset form
  const resetForm = () => {
    setNotificationForm({
      title: '',
      message: '',
      type: 'info',
      priority: 'medium',
      targetAudience: 'all',
      expiresAt: ''
    })
  }

  // Get type icon
  const getTypeIcon = (type) => {
    const icons = {
      info: Info,
      success: CheckCircle,
      warning: AlertTriangle,
      error: AlertCircle,
      announcement: Bell
    }
    return icons[type] || Info
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      {!statsLoading && stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.text.secondary}`}>Total</p>
                <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>{stats.total || 0}</p>
              </div>
              <div className={`p-3 rounded-lg ${themeClasses.iconBg.blue}`}>
                <Bell className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.text.secondary}`}>Active</p>
                <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>{stats.active || 0}</p>
              </div>
              <div className={`p-3 rounded-lg ${themeClasses.iconBg.green}`}>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.text.secondary}`}>Expired</p>
                <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>{stats.expired || 0}</p>
              </div>
              <div className={`p-3 rounded-lg ${themeClasses.iconBg.yellow}`}>
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${themeClasses.text.secondary}`}>Audiences</p>
                <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>{stats.byAudience?.length || 0}</p>
              </div>
              <div className={`p-3 rounded-lg ${themeClasses.iconBg.purple}`}>
                <Users className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div className={`rounded-xl border ${themeClasses.cardBg}`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className={`text-2xl font-bold ${themeClasses.text.primary}`}>
                Notification Management
              </h2>
              <p className={`text-sm ${themeClasses.text.secondary} mt-1`}>
                Create and manage system notifications
              </p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowAddModal(true)
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${themeClasses.button.primary}`}
            >
              <Plus className="w-4 h-4" />
              Create Notification
            </button>
          </div>

          {/* Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.text.secondary}`} />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${themeClasses.input}`}
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${themeClasses.input}`}
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="announcement">Announcement</option>
            </select>

            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${themeClasses.input}`}
            >
              <option value="all">All Audiences</option>
              <option value="all">All Users</option>
              <option value="users">Students Only</option>
              <option value="admins">Admins Only</option>
              <option value="content-managers">Content Managers</option>
            </select>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className={`mt-4 ${themeClasses.text.secondary}`}>Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className={`w-16 h-16 mx-auto mb-4 ${themeClasses.text.secondary}`} />
              <p className={`text-lg ${themeClasses.text.primary}`}>No notifications found</p>
              <p className={`text-sm ${themeClasses.text.secondary} mt-2`}>
                Create your first notification to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => {
                const TypeIcon = getTypeIcon(notification.type)
                
                return (
                  <div
                    key={notification._id}
                    className={`border rounded-lg p-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${themeClasses.iconBg.blue}`}>
                          <TypeIcon className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${themeClasses.text.primary}`}>
                            {notification.title}
                          </h4>
                          <p className={`text-sm ${themeClasses.text.secondary} mt-1`}>
                            {notification.message}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className={`text-xs px-2 py-1 rounded-full border ${themeClasses.type[notification.type]}`}>
                              {notification.type}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {notification.priority}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {notification.targetAudience}
                            </span>
                            {notification.isActive ? (
                              <span className={`text-xs px-2 py-1 rounded-full border ${themeClasses.status.active}`}>
                                Active
                              </span>
                            ) : (
                              <span className={`text-xs px-2 py-1 rounded-full border ${themeClasses.status.inactive}`}>
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className={`text-xs ${themeClasses.text.secondary} mt-2`}>
                            Created: {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(notification)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                          }`}
                          title="Edit"
                        >
                          <Edit className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                        </button>
                        <button
                          onClick={() => handleDeleteNotification(notification._id)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-red-500/20' : 'hover:bg-red-50'
                          }`}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className={`text-sm ${themeClasses.text.secondary}`}>
                Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalNotifications)} of {totalNotifications} notifications
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border transition-all ${themeClasses.button.secondary} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border transition-all ${themeClasses.button.secondary} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Notification Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl border max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className={`text-xl font-bold ${themeClasses.text.primary}`}>
                Create Notification
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  resetForm()
                }}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            </div>
            
            <form onSubmit={handleAddNotification} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Title *
                </label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Message *
                </label>
                <textarea
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                  rows="4"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Type
                  </label>
                  <select
                    value={notificationForm.type}
                    onChange={(e) => setNotificationForm({ ...notificationForm, type: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Priority
                  </label>
                  <select
                    value={notificationForm.priority}
                    onChange={(e) => setNotificationForm({ ...notificationForm, priority: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Target Audience
                </label>
                <select
                  value={notificationForm.targetAudience}
                  onChange={(e) => setNotificationForm({ ...notificationForm, targetAudience: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                >
                  <option value="all">All Users</option>
                  <option value="users">Students Only</option>
                  <option value="admins">Admins Only</option>
                  <option value="content-managers">Content Managers Only</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Expires At (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={notificationForm.expiresAt}
                  onChange={(e) => setNotificationForm({ ...notificationForm, expiresAt: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 rounded-lg transition-all ${themeClasses.button.primary}`}
                >
                  Create Notification
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    resetForm()
                  }}
                  className={`px-4 py-2 rounded-lg border transition-all ${themeClasses.button.secondary}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Notification Modal */}
      {showEditModal && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl border max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className={`text-xl font-bold ${themeClasses.text.primary}`}>
                Edit Notification
              </h3>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedNotification(null)
                  resetForm()
                }}
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            </div>
            
            <form onSubmit={handleEditNotification} className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Title *
                </label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Message *
                </label>
                <textarea
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                  rows="4"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Type
                  </label>
                  <select
                    value={notificationForm.type}
                    onChange={(e) => setNotificationForm({ ...notificationForm, type: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="announcement">Announcement</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                    Priority
                  </label>
                  <select
                    value={notificationForm.priority}
                    onChange={(e) => setNotificationForm({ ...notificationForm, priority: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Target Audience
                </label>
                <select
                  value={notificationForm.targetAudience}
                  onChange={(e) => setNotificationForm({ ...notificationForm, targetAudience: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                >
                  <option value="all">All Users</option>
                  <option value="users">Students Only</option>
                  <option value="admins">Admins Only</option>
                  <option value="content-managers">Content Managers Only</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
                  Expires At (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={notificationForm.expiresAt}
                  onChange={(e) => setNotificationForm({ ...notificationForm, expiresAt: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input}`}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 rounded-lg transition-all ${themeClasses.button.primary}`}
                >
                  Update Notification
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedNotification(null)
                    resetForm()
                  }}
                  className={`px-4 py-2 rounded-lg border transition-all ${themeClasses.button.secondary}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationManagement
