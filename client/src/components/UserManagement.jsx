import { useState, useEffect } from 'react'
import { 
  Search, Plus, Download, Filter, MoreVertical, 
  Edit, Trash2, Eye, CheckCircle, XCircle, 
  Calendar, Clock, User, ChevronDown, X, Save
} from 'lucide-react'
import { showToast } from '../utils/toast'

const UserManagement = ({ theme = 'light' }) => {
  const isDark = theme === 'dark'
  
  // Theme classes
  const themeClasses = {
    bg: isDark ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white',
    cardBg: isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60',
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
      muted: isDark ? 'text-gray-500' : 'text-gray-500',
    },
    button: {
      primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90',
      secondary: isDark ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
      danger: 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90',
      success: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90',
    },
    input: isDark ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-200',
    table: {
      header: isDark ? 'bg-gray-800/50 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600',
      row: isDark ? 'hover:bg-white/5 border-gray-700' : 'hover:bg-gray-50 border-gray-200',
      cell: isDark ? 'text-gray-300' : 'text-gray-700',
    },
    status: {
      active: isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-800 border-green-200',
      inactive: isDark ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-red-100 text-red-800 border-red-200',
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
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [actionDropdown, setActionDropdown] = useState(null)

  // Form state for add/edit user
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

  // Load users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  // Filter users based on search and filters
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
        setShowEditModal(false)
        setSelectedUser(null)
        setUserForm({ name: '', email: '', password: '', role: 'user' })
        fetchUsers()
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

  // Open edit modal
  const openEditModal = (user) => {
    setSelectedUser(user)
    setUserForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role
    })
    setShowEditModal(true)
    setActionDropdown(null)
  }

  // Open details modal
  const openDetailsModal = (user) => {
    setSelectedUser(user)
    setShowDetailsModal(true)
    setActionDropdown(null)
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

  // Action Dropdown Component
  const ActionDropdown = ({ user, isOpen, onClose }) => {
    if (!isOpen) return null

    return (
      <div className={`absolute right-0 top-8 z-50 w-48 rounded-lg shadow-lg border ${themeClasses.cardBg} ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="py-1">
          <button
            onClick={() => openDetailsModal(user)}
            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'} ${themeClasses.text.primary}`}
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={() => openEditModal(user)}
            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'} text-blue-500`}
          >
            <Edit className="w-4 h-4" />
            Edit User
          </button>
          <button
            onClick={() => handleToggleStatus(user._id, user.isActive)}
            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'} ${user.isActive ? 'text-orange-500' : 'text-green-500'}`}
          >
            {user.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            {user.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} my-1`}></div>
          <button
            onClick={() => handleDeleteUser(user._id)}
            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-50'} text-red-500`}
          >
            <Trash2 className="w-4 h-4" />
            Delete User
          </button>
        </div>
      </div>
    )
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
                    <div className="relative">
                      <button
                        onClick={() => setActionDropdown(actionDropdown === user._id ? null : user._id)}
                        className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                      >
                        <MoreVertical className={`w-4 h-4 ${themeClasses.text.secondary}`} />
                      </button>
                      <ActionDropdown
                        user={user}
                        isOpen={actionDropdown === user._id}
                        onClose={() => setActionDropdown(null)}
                      />
                    </div>
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

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl border p-6 w-full max-w-md ${themeClasses.cardBg}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Edit User</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className={`p-1 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="space-y-4">
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
                  onClick={() => setShowEditModal(false)}
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
            </form>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showDetailsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl border p-6 w-full max-w-lg ${themeClasses.cardBg}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>User Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className={`p-1 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${themeClasses.text.secondary}`} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${themeClasses.iconBg.blue}`}>
                  <span className={`text-xl font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {getAvatarInitials(selectedUser.name)}
                  </span>
                </div>
                <div>
                  <h4 className={`text-xl font-semibold ${themeClasses.text.primary}`}>{selectedUser.name}</h4>
                  <p className={`text-sm ${themeClasses.text.secondary}`}>{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Role</label>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${themeClasses.role[selectedUser.role]} inline-block mt-1`}>
                    {selectedUser.role === 'content-manager' ? 'Content Manager' : 
                     selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </span>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    {selectedUser.isActive ? (
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
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Registration Date</label>
                  <p className={`text-sm mt-1 ${themeClasses.text.primary}`}>{formatDate(selectedUser.createdAt)}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Last Login</label>
                  <p className={`text-sm mt-1 ${themeClasses.text.primary}`}>{formatDate(selectedUser.lastLogin)}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>Email Verified</label>
                  <p className={`text-sm mt-1 ${themeClasses.text.primary}`}>
                    {selectedUser.emailverified ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text.secondary}`}>User ID</label>
                  <p className={`text-sm mt-1 font-mono ${themeClasses.text.primary}`}>{selectedUser._id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {actionDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActionDropdown(null)}
        />
      )}
    </div>
  )
}

export default UserManagement