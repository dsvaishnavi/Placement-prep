import { useState, useEffect } from 'react'
import { 
  Users, UserCheck, Shield, Clock, TrendingUp, Activity,
  Calendar, Eye, UserPlus, LogIn
} from 'lucide-react'
import { showToast } from '../utils/toast'

const UserDashboard = ({ theme = 'light' }) => {
  const isDark = theme === 'dark'
  
  // Theme classes
  const themeClasses = {
    cardBg: isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
    },
    iconBg: {
      blue: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
      green: isDark ? 'bg-green-500/20' : 'bg-green-100',
      purple: isDark ? 'bg-purple-500/20' : 'bg-purple-100',
      orange: isDark ? 'bg-orange-500/20' : 'bg-orange-100',
    },
  }

  const [stats, setStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true)
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
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
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
          <div className="mt-4 flex items-center gap-2">
            <TrendingUp className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            <span className={`text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {stats?.users?.active || 0} active
            </span>
          </div>
        </div>

        {/* Admin Users */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.text.secondary}`}>Admins</p>
              <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>
                {stats?.users?.byRole?.admin || 0}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${themeClasses.iconBg.purple}`}>
              <Shield className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Eye className={`w-4 h-4 ${themeClasses.text.secondary}`} />
            <span className={`text-sm ${themeClasses.text.secondary}`}>
              Full access
            </span>
          </div>
        </div>

        {/* Content Managers */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.text.secondary}`}>Content Managers</p>
              <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>
                {stats?.users?.byRole?.contentManager || 0}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${themeClasses.iconBg.green}`}>
              <UserCheck className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${themeClasses.text.secondary}`} />
            <span className={`text-sm ${themeClasses.text.secondary}`}>
              Content access
            </span>
          </div>
        </div>

        {/* Regular Users */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.text.secondary}`}>Regular Users</p>
              <p className={`text-3xl font-bold ${themeClasses.text.primary}`}>
                {stats?.users?.byRole?.user || 0}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${themeClasses.iconBg.orange}`}>
              <Users className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Clock className={`w-4 h-4 ${themeClasses.text.secondary}`} />
            <span className={`text-sm ${themeClasses.text.secondary}`}>
              Standard access
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${themeClasses.text.primary}`}>Recent Activity</h3>
          <Activity className={`w-5 h-5 ${themeClasses.text.secondary}`} />
        </div>
        
        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className={`p-2 rounded-lg ${activity.type === 'registration' ? themeClasses.iconBg.green : themeClasses.iconBg.blue}`}>
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
                <div className={`text-sm ${themeClasses.text.secondary}`}>
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
  )
}

export default UserDashboard