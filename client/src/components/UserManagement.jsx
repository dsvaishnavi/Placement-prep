import { useState, useEffect } from 'react'
import { 
  Search, Plus, Download, Edit, Trash2, Eye, CheckCircle, XCircle, 
  Calendar, Clock, X, Settings, UserCheck, UserX, Shield, Mail, Hash,
  Users, TrendingUp, Activity, UserPlus, LogIn
} from 'lucide-react'
import { showToast } from '../utils/toast'

const UserManagement = ({ theme = 'light' }) => {
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
    },
    input: isDark ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-200',
    table: {
      header: isDark ? 'bg-gray-800/50 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600',
      row: isDark ? 'hover:bg-white/5 border-gray-700' : 'hover:bg-gray-50 border-gray-200',
    },
    role: {
      admin: isDark ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-purple-100 text-purple-800',
      'content-manager': isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-800',
      user: isDark ? 'bg-gray-500/20 text-gray-400 border-gray-500/30' : 'bg-gray-100 text-gray-800',
    },
    iconBg: {
      blue: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
    },
  }

  // State management
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showActionsModal, setShowActionsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [activeTab, setActiveTab] = useState('details')

  // Dashboard state
  const [stats, setStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [dashboardLoading, setDashboardLoading] = useState(true)

  // Form state
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users || [])
      } else {
        showToast.error('Failed to fetch users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      showToast.error('Error fetching users')
    } finally {
      setLoading(false)
    }
  }

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setDashboardLoading(true)
      const token = localStorage.getItem('token')
      
      // Fetch stats
      const statsResponse = await fetch('http://localhost:3000/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // Fetch recent activity
      const activityResponse = await fetch('http://localhost:3000/admin/recent-activity?limit=8', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (statsResponse.ok && activityResponse.ok) {
        const statsData = await statsResponse.json()
        const activityData = await activityResponse.json()
        
        setStats(statsData.stats)
        setRecentActivity(activityData.activities || [])
      } else {
        showToast.error('Failed to fetch dashboard data')
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      showToast.error('Error fetching dashboard data')
    } finally {
      setDashboardLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchDashboardData()
  }, [])

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive)
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    
    return matchesSearch && matchesStatus && matchesRole
  })

  // Handle user creation
  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/admin/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userForm)
      })

      if (response.ok) {
        showToast.success('User created successfully')
        setShowAddModal(false)
        setUserForm({ name: '', email: '', password: '', role: 'user' })
        fetchUsers()
        fetchDashboardData() // Refresh dashboard data
      } else {
        const data = await response.json()
        showToast.error(data.message || 'Failed to create user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      showToast.error('Error creating user')
    }
  }

  // Handle user update
  const handleUpdateUser = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/admin/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userForm.name,
          email: userForm.email,
          role: userForm.role
        })
      })

      if (response.ok) {
        showToast.success('User updated successfully')
        setActiveTab('details')
        fetchUsers()
        const updatedUser = { ...selectedUser, name: userForm.name, email: userForm.email, role: userForm.role }
        setSelectedUser(updatedUser)
      } else {
        const data = await response.json()
        showToast.error(data.message || 'Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      showToast.error('Error updating user')
    }
  }

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        showToast.success('User deleted successfully')
        setShowActionsModal(false)
        setSelectedUser(null)
        fetchUsers()
      } else {
        const data = await response.json()
        showToast.error(data.message || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      showToast.error('Error deleting user')
    }
  }

  // Handle status toggle
  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !currentStatus })
      })

      if (response.ok) {
        showToast.success(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully`)
        fetchUsers()
        if (selectedUser && selectedUser._id === userId) {
          setSelectedUser({ ...selectedUser, isActive: !currentStatus })
        }
      } else {
        const data = await response.json()
        showToast.error(data.message || 'Failed to update user status')
      }
    } catch (error) {
      console.error('Error updating user status:', error)
      showToast.error('Error updating user status')
    }
  }

  // Handle export
  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/admin/users/export/csv', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        showToast.success('Users data exported successfully')
      } else {
        showToast.error('Failed to export users data')
      }
    } catch (error) {
      console.error('Error exporting users:', error)
      showToast.error('Error exporting users')
    }
  }

  // Open actions modal
  const openActionsModal = (user) => {
    setSelectedUser(user)
    setUserForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    })
    setActiveTab('details')
    setShowActionsModal(true)
  }

  // Close actions modal
  const closeActionsModal = () => {
    setShowActionsModal(false)
    setSelectedUser(null)
    setUserForm({ name: '', email: '', password: '', role: 'user' })
    setActiveTab('details')
  }

  // Get user avatar initials
  const getAvatarInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Format date for activity
  const formatActivityDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`
    }
  }

  // Get activity icon
  const getActivityIcon = (type) => {
    switch (type) {
      case 'registration':
        return <UserPlus className="w-4 h-4" />
      case 'login':
        return <LogIn className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  // Get activity color
  const getActivityColor = (type) => {
    switch (type) {
      case 'registration':
        return isDark ? 'text-green-400' : 'text-green-600'
      case 'login':
        return isDark ? 'text-blue-400' : 'text-blue-600'
      default:
        return themeClasses.text.secondary
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
{/* Dashboard Grid Layout */}
<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
  
  {/* Left Column: Stats Grid (2/5 width) */}
  <div className="lg:col-span-2">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      
      {/* Card 1: Total Users */}
      <div className={`rounded-xl border p-6 flex flex-col ${themeClasses.cardBg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${themeClasses.text.secondary}`}>Total Users</p>
            <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>
              {stats?.users?.total || 0}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${themeClasses.iconBg.blue}`}>
            <Users className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2">
          <TrendingUp className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          <span className={`text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {stats?.users?.active || 0} active
          </span>
        </div>
      </div>

      {/* Card 2: Admin Users */}
      <div className={`rounded-xl border p-6 flex flex-col ${themeClasses.cardBg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${themeClasses.text.secondary}`}>Admins</p>
            <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>
              {stats?.users?.byRole?.admin || 0}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
            <Shield className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2">
          <Eye className={`w-4 h-4 ${themeClasses.text.secondary}`} />
          <span className={`text-sm ${themeClasses.text.secondary}`}>
            Full access
          </span>
        </div>
      </div>

      {/* Card 3: Content Managers */}
      <div className={`rounded-xl border p-6 flex flex-col ${themeClasses.cardBg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${themeClasses.text.secondary}`}>Content Managers</p>
            <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>
              {stats?.users?.byRole?.contentManager || 0}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}>
            <UserCheck className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
          </div>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2">
          <Calendar className={`w-4 h-4 ${themeClasses.text.secondary}`} />
          <span className={`text-sm ${themeClasses.text.secondary}`}>
            Content access
          </span>
        </div>
      </div>

      {/* Card 4: Regular Users */}
      <div className={`rounded-xl border p-6 flex flex-col ${themeClasses.cardBg}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${themeClasses.text.secondary}`}>Regular Users</p>
            <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>
              {stats?.users?.byRole?.user || 0}
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
            <Users className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
          </div>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-2">
          <Clock className={`w-4 h-4 ${themeClasses.text.secondary}`} />
          <span className={`text-sm ${themeClasses.text.secondary}`}>
            Standard access
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* Right Column: Recent Activity Card (3/5 width) */}
  <div className="lg:col-span-3">
    <div className={`rounded-xl border p-6 h-full ${themeClasses.cardBg}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Recent Activity</h3>
        <div className="flex items-center gap-2">
          <button className={`px-3 py-1 text-sm rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${themeClasses.text.secondary} transition-colors`}>
            Last 24h
          </button>
          <button className={`px-3 py-1 text-sm rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${themeClasses.text.secondary} transition-colors`}>
            Last 7 days
          </button>
          <button className={`px-3 py-1 text-sm rounded-lg ${isDark ? 'bg-blue-500/20 hover:bg-blue-500/30' : 'bg-blue-100 hover:bg-blue-200'} ${isDark ? 'text-blue-400' : 'text-blue-600'} transition-colors`}>
            All time
          </button>
          <Activity className={`w-5 h-5 ${themeClasses.text.secondary}`} />
        </div>
      </div>
      
      {dashboardLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      ) : recentActivity.length > 0 ? (
        <div className="space-y-4">
          {/* Show only last 3 activities */}
          {recentActivity.slice(0, 3).map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className={`p-2 rounded-lg ${activity.type === 'registration' ? (isDark ? 'bg-green-500/20' : 'bg-green-100') : (isDark ? 'bg-blue-500/20' : 'bg-blue-100')}`}>
                <span className={getActivityColor(activity.type)}>
                  {getActivityIcon(activity.type)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-medium ${themeClasses.text.primary}`}>
                    {activity.user.name}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.user.role === 'admin' 
                      ? isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-800'
                      : activity.user.role === 'content-manager'
                      ? isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                      : isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.user.role === 'content-manager' ? 'Content Manager' : 
                     activity.user.role.charAt(0).toUpperCase() + activity.user.role.slice(1)}
                  </span>
                </div>
                <p className={`text-sm ${themeClasses.text.secondary}`}>
                  {activity.description}
                </p>
              </div>
              <div className={`text-sm whitespace-nowrap ${themeClasses.text.secondary}`}>
                {formatActivityDate(activity.timestamp)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Activity className={`w-12 h-12 mx-auto mb-4 ${themeClasses.text.secondary}`} />
          <p className={`text-sm ${themeClasses.text.secondary}`}>No recent activity</p>
        </div>
      )}
    </div>
  </div>
</div>

      {/* Header */}
      <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className={`text-2xl font-bold ${themeClasses.text.primary}`}>User Management</h2>
            <p className={`text-sm mt-1 ${themeClasses.text.secondary}`}>
              Manage user accounts, roles, and permissions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border ${themeClasses.button.secondary}`}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${themeClasses.button.primary}`}
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.text.secondary}`} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="content-manager">Content Manager</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className={`rounded-xl border overflow-hidden ${themeClasses.cardBg}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${themeClasses.table.header}`}>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">User</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Last Login</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Registration</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredUsers.map((user) => (
                <tr key={user._id} className={`transition-colors ${themeClasses.table.row}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${themeClasses.iconBg.blue}`}>
                        <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                          {getAvatarInitials(user.name)}
                        </span>
                      </div>
                      <div>
                        <div className={`font-medium ${themeClasses.text.primary}`}>{user.name}</div>
                        <div className={`text-sm ${themeClasses.text.secondary}`}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${themeClasses.role[user.role]}`}>
                      {user.role === 'content-manager' ? 'Content Manager' : 
                       user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                      <span className={`text-sm ${themeClasses.text.primary}`}>
                        {formatDate(user.lastLogin)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                      <span className={`text-sm ${themeClasses.text.primary}`}>
                        {formatDate(user.createdAt)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {user.isActive ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className={`font-medium text-sm ${isDark ? 'text-green-400' : 'text-green-700'}`}>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className={`font-medium text-sm ${isDark ? 'text-red-400' : 'text-red-700'}`}>Inactive</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => openActionsModal(user)}
                      className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${themeClasses.button.primary}`}
                    >
                      <Settings className="w-4 h-4" />
                      Actions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className={`px-6 py-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
          <div className={`text-sm ${themeClasses.text.secondary}`}>
            Showing <span className={`font-medium ${themeClasses.text.primary}`}>{filteredUsers.length}</span> of{' '}
            <span className={`font-medium ${themeClasses.text.primary}`}>{users.length}</span> users
          </div>
        </div>
      </div>

      {/* Actions Modal */}
      {showActionsModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border ${themeClasses.cardBg}`}>
            {/* Modal Header */}
            <div className={`px-6 py-4 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex justify-between items-center`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${themeClasses.iconBg.blue}`}>
                  <span className={`text-lg font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {getAvatarInitials(selectedUser.name)}
                  </span>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${themeClasses.text.primary}`}>
                    {selectedUser.name}
                  </h3>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>
                    User Management Panel
                  </p>
                </div>
              </div>
              <button
                onClick={closeActionsModal}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className={`px-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'details'
                      ? 'border-blue-500 text-blue-600'
                      : `border-transparent ${themeClasses.text.secondary} hover:text-blue-500`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    User Details
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'edit'
                      ? 'border-blue-500 text-blue-600'
                      : `border-transparent ${themeClasses.text.secondary} hover:text-blue-500`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit User
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('actions')}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'actions'
                      ? 'border-blue-500 text-blue-600'
                      : `border-transparent ${themeClasses.text.secondary} hover:text-blue-500`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Actions
                  </div>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* User Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Full Name</label>
                        <p className={`mt-1 text-sm ${themeClasses.text.primary}`}>{selectedUser.name}</p>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Email Address</label>
                        <p className={`mt-1 text-sm ${themeClasses.text.primary}`}>{selectedUser.email}</p>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>User ID</label>
                        <p className={`mt-1 text-sm font-mono ${themeClasses.text.primary}`}>{selectedUser._id}</p>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Role</label>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium border ${themeClasses.role[selectedUser.role]}`}>
                          {selectedUser.role === 'content-manager' ? 'Content Manager' : 
                           selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Account Status</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Status</label>
                        <div className="flex items-center gap-2 mt-1">
                          {selectedUser.isActive ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-700'}`}>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span className={`text-sm font-medium ${isDark ? 'text-red-400' : 'text-red-700'}`}>Inactive</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Email Verified</label>
                        <p className={`mt-1 text-sm ${selectedUser.emailverified ? 'text-green-500' : 'text-orange-500'}`}>
                          {selectedUser.emailverified ? 'Verified' : 'Not Verified'}
                        </p>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Registration Date</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                          <span className={`text-sm ${themeClasses.text.primary}`}>
                            {formatDate(selectedUser.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Last Login</label>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                          <span className={`text-sm ${themeClasses.text.primary}`}>
                            {formatDate(selectedUser.lastLogin)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit User Tab */}
              {activeTab === 'edit' && (
                <div className="space-y-6">
                  <form onSubmit={handleUpdateUser}>
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>Full Name</label>
                        <input
                          type="text"
                          required
                          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                          value={userForm.name}
                          onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>Email Address</label>
                        <input
                          type="email"
                          required
                          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                          value={userForm.email}
                          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>Role</label>
                        <select
                          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                          value={userForm.role}
                          onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                        >
                          <option value="user">User</option>
                          <option value="content-manager">Content Manager</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setActiveTab('details')}
                          className={`px-4 py-2 rounded-lg transition-colors border ${themeClasses.button.secondary}`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`px-4 py-2 rounded-lg transition-colors ${themeClasses.button.primary}`}
                        >
                          Update User
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Actions Tab */}
              {activeTab === 'actions' && (
                <div className="space-y-6">
                  {/* Account Actions */}
                  <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Account Actions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Toggle Status */}
                      <button
                        onClick={() => handleToggleStatus(selectedUser._id, selectedUser.isActive)}
                        className={`p-4 rounded-lg border transition-colors text-left ${
                          selectedUser.isActive 
                            ? isDark ? 'border-orange-500 bg-orange-900 hover:bg-orange-800' : 'border-orange-200 bg-orange-50 hover:bg-orange-100'
                            : isDark ? 'border-green-500 bg-green-900 hover:bg-green-800' : 'border-green-200 bg-green-50 hover:bg-green-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {selectedUser.isActive ? (
                            <UserX className="w-6 h-6 text-orange-500" />
                          ) : (
                            <UserCheck className="w-6 h-6 text-green-500" />
                          )}
                          <div>
                            <div className={`font-medium ${selectedUser.isActive ? 'text-orange-500' : 'text-green-500'}`}>
                              {selectedUser.isActive ? 'Deactivate User' : 'Activate User'}
                            </div>
                            <div className={`text-sm ${themeClasses.text.secondary}`}>
                              {selectedUser.isActive ? 'Suspend account access' : 'Restore account access'}
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Edit Role */}
                      <button
                        onClick={() => setActiveTab('edit')}
                        className={`p-4 rounded-lg border transition-colors text-left ${isDark ? 'border-blue-500 bg-blue-900 hover:bg-blue-800' : 'border-blue-200 bg-blue-50 hover:bg-blue-100'}`}
                      >
                        <div className="flex items-center gap-3">
                          <Shield className="w-6 h-6 text-blue-500" />
                          <div>
                            <div className="font-medium text-blue-500">Edit User Role</div>
                            <div className={`text-sm ${themeClasses.text.secondary}`}>
                              Change user permissions and access level
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Communication Actions */}
                  <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${themeClasses.text.primary}`}>Communication</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Send Email */}
                      <button
                        onClick={() => window.open(`mailto:${selectedUser.email}`, '_blank')}
                        className={`p-4 rounded-lg border transition-colors text-left ${isDark ? 'border-indigo-500 bg-indigo-900 hover:bg-indigo-800' : 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100'}`}
                      >
                        <div className="flex items-center gap-3">
                          <Mail className="w-6 h-6 text-indigo-500" />
                          <div>
                            <div className="font-medium text-indigo-500">Send Email</div>
                            <div className={`text-sm ${themeClasses.text.secondary}`}>
                              Contact user directly via email
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Copy User ID */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedUser._id)
                          showToast.success('User ID copied to clipboard')
                        }}
                        className={`p-4 rounded-lg border transition-colors text-left ${isDark ? 'border-gray-500 bg-gray-800 hover:bg-gray-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
                      >
                        <div className="flex items-center gap-3">
                          <Hash className="w-6 h-6 text-gray-500" />
                          <div>
                            <div className={`font-medium ${themeClasses.text.primary}`}>Copy User ID</div>
                            <div className={`text-sm ${themeClasses.text.secondary}`}>
                              Copy user ID to clipboard
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className={`p-4 rounded-lg border ${isDark ? 'border-red-500 bg-red-900' : 'border-red-200 bg-red-50'}`}>
                    <h4 className="text-lg font-semibold mb-4 text-red-500">Danger Zone</h4>
                    <button
                      onClick={() => handleDeleteUser(selectedUser._id)}
                      className={`w-full p-4 rounded-lg border transition-colors text-left ${isDark ? 'border-red-500 bg-red-800 hover:bg-red-700' : 'border-red-300 bg-red-100 hover:bg-red-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <Trash2 className="w-6 h-6 text-red-500" />
                        <div>
                          <div className="font-medium text-red-500">Delete User Account</div>
                          <div className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                            Permanently remove this user from the system
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className={`rounded-xl border p-6 w-full max-w-md ${themeClasses.cardBg}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Add New User</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className={`p-1 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>Name</label>
                <input
                  type="text"
                  required
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>Email</label>
                <input
                  type="email"
                  required
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>Password</label>
                <input
                  type="password"
                  required
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${themeClasses.text.primary}`}>Role</label>
                <select
                  className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.input}`}
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="content-manager">Content Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-lg transition-colors border ${themeClasses.button.secondary}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg transition-colors ${themeClasses.button.primary}`}
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement