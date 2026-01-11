import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../utils/toast'
import { Shield, User, Mail, Lock, Key } from 'lucide-react'

function AdminSetup({ theme = 'light' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const isDark = theme === 'dark'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      showToast.error('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password length
    if (formData.password.length < 6) {
      showToast.error('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3000/auth/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          adminKey: formData.adminKey
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        showToast.success('Admin account created successfully!')
        
        // Redirect to admin panel
        navigate('/admin')
      } else {
        showToast.error(data.message)
      }
    } catch (error) {
      showToast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDark ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
    }`}>
      <div className={`w-full max-w-md rounded-xl shadow-sm p-8 backdrop-blur-md border ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60'
      }`}>
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isDark ? 'bg-purple-500/20' : 'bg-purple-500/10'
          }`}>
            <Shield className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Admin Setup
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Create the first administrator account for Skill Sync
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                isDark ? 'border-white/20 bg-white/5 text-white focus:ring-purple-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-purple-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                isDark ? 'border-white/20 bg-white/5 text-white focus:ring-purple-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-purple-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a secure password"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                isDark ? 'border-white/20 bg-white/5 text-white focus:ring-purple-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-purple-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Lock className="w-4 h-4 inline mr-2" />
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                isDark ? 'border-white/20 bg-white/5 text-white focus:ring-purple-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-purple-500'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Key className="w-4 h-4 inline mr-2" />
              Admin Setup Key
            </label>
            <input
              type="password"
              name="adminKey"
              value={formData.adminKey}
              onChange={handleChange}
              required
              placeholder="Enter admin setup key"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                isDark ? 'border-white/20 bg-white/5 text-white focus:ring-purple-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-purple-500'
              }`}
            />
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Use: SKILL_SYNC_ADMIN_2024
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
          </button>
        </form>

        <div className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>This page is only for creating the first admin account.</p>
          <p>Once created, use the regular login page.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminSetup