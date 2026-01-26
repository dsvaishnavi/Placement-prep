import { useState, useEffect } from 'react'
import { 
  Users, HelpCircle, BookOpen, BarChart3, TrendingUp, 
  Cpu, Database, HardDrive, Server, FileText,
  Activity, Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react'
import axios from 'axios'
import { showToast } from '../utils/toast'

const DashboardOverview = ({ theme = 'light' }) => {
  const isDark = theme === 'dark'
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  // Theme classes
  const themeClasses = {
    bg: isDark ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white',
    cardBg: isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60',
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
      muted: isDark ? 'text-gray-500' : 'text-gray-500',
    },
    iconBg: {
      blue: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
      green: isDark ? 'bg-green-500/20' : 'bg-green-100',
      purple: isDark ? 'bg-purple-500/20' : 'bg-purple-100',
      orange: isDark ? 'bg-amber-500/20' : 'bg-amber-100',
      red: isDark ? 'bg-red-500/20' : 'bg-red-100',
    },
    button: {
      primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90',
    }
  }

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:3000/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.data.success) {
        setStats(response.data.stats)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      showToast('Failed to fetch dashboard statistics', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and auto-refresh every 30 seconds
  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
        <p className={themeClasses.text.secondary}>Failed to load dashboard data</p>
      </div>
    )
  }

  // Calculate percentages for progress bars
  const userActivePercentage = stats.users.total > 0 ? (stats.users.active / stats.users.total) * 100 : 0
  const contentPublishedPercentage = stats.content.total > 0 ? (stats.content.published / stats.content.total) * 100 : 0
  const aptitudePublishedPercentage = stats.aptitudeQuestions.total > 0 ? (stats.aptitudeQuestions.published / stats.aptitudeQuestions.total) * 100 : 0
  const conceptsPublishedPercentage = stats.coreConcepts.total > 0 ? (stats.coreConcepts.published / stats.coreConcepts.total) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl font-bold ${themeClasses.text.primary}`}>Admin Dashboard</h1>
            <p className={`mt-2 ${themeClasses.text.secondary}`}>
              Welcome back! Here's your system overview and analytics.
            </p>
            {lastUpdated && (
              <p className={`mt-1 text-sm ${themeClasses.text.muted} flex items-center gap-2`}>
                <Clock className="w-4 h-4" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-100'}`}>
              <span className={`text-sm font-medium ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                System Status: <span className="font-bold">Online</span>
              </span>
            </div>
            <button 
              onClick={fetchStats}
              className={`px-4 py-2 rounded-lg transition-colors ${themeClasses.button.primary}`}
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={`text-sm ${themeClasses.text.secondary}`}>Total Users</p>
              <p className={`text-2xl font-bold mt-1 ${themeClasses.text.primary}`}>{stats.users.total.toLocaleString()}</p>
            </div>
            <div className={`p-3 rounded-lg ${themeClasses.iconBg.blue}`}>
              <Users className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium ${stats.users.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.users.growth >= 0 ? '+' : ''}{stats.users.growth}%
            </span>
            <span className={`text-sm ml-2 ${themeClasses.text.secondary}`}>from last month</span>
          </div>
        </div>

        {/* Aptitude Questions */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={`text-sm ${themeClasses.text.secondary}`}>Aptitude Questions</p>
              <p className={`text-2xl font-bold mt-1 ${themeClasses.text.primary}`}>{stats.aptitudeQuestions.total.toLocaleString()}</p>
            </div>
            <div className={`p-3 rounded-lg ${themeClasses.iconBg.green}`}>
              <HelpCircle className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium text-green-600`}>
              {stats.aptitudeQuestions.published} Published
            </span>
            <span className={`text-sm ml-2 ${themeClasses.text.secondary}`}>• {stats.aptitudeQuestions.draft} Draft</span>
          </div>
        </div>

        {/* Core Concepts */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={`text-sm ${themeClasses.text.secondary}`}>Core Concepts</p>
              <p className={`text-2xl font-bold mt-1 ${themeClasses.text.primary}`}>{stats.coreConcepts.total.toLocaleString()}</p>
            </div>
            <div className={`p-3 rounded-lg ${themeClasses.iconBg.purple}`}>
              <BookOpen className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium text-green-600`}>
              {stats.coreConcepts.published} Published
            </span>
            <span className={`text-sm ml-2 ${themeClasses.text.secondary}`}>• {stats.coreConcepts.draft} Draft</span>
          </div>
        </div>

        {/* Engagement Score */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={`text-sm ${themeClasses.text.secondary}`}>Avg. User Score</p>
              <p className={`text-2xl font-bold mt-1 ${themeClasses.text.primary}`}>{stats.engagement.averageScore}%</p>
            </div>
            <div className={`p-3 rounded-lg ${themeClasses.iconBg.orange}`}>
              <BarChart3 className={`w-6 h-6 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-sm font-medium text-green-600`}>
              +5%
            </span>
            <span className={`text-sm ml-2 ${themeClasses.text.secondary}`}>from last month</span>
          </div>
        </div>
      </div>

      {/* Content Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aptitude Questions Breakdown */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <h3 className={`text-lg font-semibold mb-6 ${themeClasses.text.primary}`}>Aptitude Questions Distribution</h3>
          
          <div className="space-y-4">
            {/* By Difficulty */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${themeClasses.text.primary}`}>By Difficulty</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`text-xs w-16 ${themeClasses.text.secondary}`}>Easy</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-green-500"
                      style={{ width: `${stats.aptitudeQuestions.total > 0 ? (stats.aptitudeQuestions.byDifficulty.easy / stats.aptitudeQuestions.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs w-12 text-right ${themeClasses.text.primary}`}>{stats.aptitudeQuestions.byDifficulty.easy}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs w-16 ${themeClasses.text.secondary}`}>Medium</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-yellow-500"
                      style={{ width: `${stats.aptitudeQuestions.total > 0 ? (stats.aptitudeQuestions.byDifficulty.medium / stats.aptitudeQuestions.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs w-12 text-right ${themeClasses.text.primary}`}>{stats.aptitudeQuestions.byDifficulty.medium}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs w-16 ${themeClasses.text.secondary}`}>Hard</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-red-500"
                      style={{ width: `${stats.aptitudeQuestions.total > 0 ? (stats.aptitudeQuestions.byDifficulty.hard / stats.aptitudeQuestions.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs w-12 text-right ${themeClasses.text.primary}`}>{stats.aptitudeQuestions.byDifficulty.hard}</span>
                </div>
              </div>
            </div>

            {/* By Category */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${themeClasses.text.primary}`}>By Category</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${themeClasses.text.secondary}`}>Quantitative</p>
                  <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.aptitudeQuestions.byCategory.quantitative}</p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${themeClasses.text.secondary}`}>Logical</p>
                  <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.aptitudeQuestions.byCategory.logical}</p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${themeClasses.text.secondary}`}>Verbal</p>
                  <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.aptitudeQuestions.byCategory.verbal}</p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <p className={`text-xs ${themeClasses.text.secondary}`}>Non-verbal</p>
                  <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.aptitudeQuestions.byCategory.nonVerbal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Concepts Breakdown */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <h3 className={`text-lg font-semibold mb-6 ${themeClasses.text.primary}`}>Core Concepts Distribution</h3>
          
          <div className="space-y-4">
            {/* By Subject */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${themeClasses.text.primary}`}>By Subject</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Data Structures', value: stats.coreConcepts.bySubject.dataStructures, color: 'bg-blue-500' },
                  { label: 'Algorithms', value: stats.coreConcepts.bySubject.algorithms, color: 'bg-green-500' },
                  { label: 'Operating Systems', value: stats.coreConcepts.bySubject.operatingSystems, color: 'bg-purple-500' },
                  { label: 'DBMS', value: stats.coreConcepts.bySubject.dbms, color: 'bg-amber-500' },
                  { label: 'Networks', value: stats.coreConcepts.bySubject.networks, color: 'bg-pink-500' },
                  { label: 'System Design', value: stats.coreConcepts.bySubject.systemDesign, color: 'bg-indigo-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className={`text-xs w-24 ${themeClasses.text.secondary}`}>{item.label}</span>
                    <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${stats.coreConcepts.total > 0 ? (item.value / stats.coreConcepts.total) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs w-8 text-right ${themeClasses.text.primary}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By Difficulty */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${themeClasses.text.primary}`}>By Difficulty</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className={`p-3 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-50'} text-center`}>
                  <p className={`text-xs ${themeClasses.text.secondary}`}>Beginner</p>
                  <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.coreConcepts.byDifficulty.beginner}</p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'} text-center`}>
                  <p className={`text-xs ${themeClasses.text.secondary}`}>Intermediate</p>
                  <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.coreConcepts.byDifficulty.intermediate}</p>
                </div>
                <div className={`p-3 rounded-lg ${isDark ? 'bg-red-900/30' : 'bg-red-50'} text-center`}>
                  <p className={`text-xs ${themeClasses.text.secondary}`}>Advanced</p>
                  <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.coreConcepts.byDifficulty.advanced}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User & Content Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Status */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <h3 className={`text-lg font-semibold mb-6 ${themeClasses.text.primary}`}>User Status Overview</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className={`text-sm ${themeClasses.text.primary}`}>Active Users</span>
              </div>
              <span className={`text-sm font-bold ${themeClasses.text.primary}`}>{stats.users.active}</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div 
                className="h-full rounded-full bg-green-500"
                style={{ width: `${userActivePercentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className={`text-sm ${themeClasses.text.primary}`}>Inactive Users</span>
              </div>
              <span className={`text-sm font-bold ${themeClasses.text.primary}`}>{stats.users.inactive}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-50'} text-center`}>
                <p className={`text-xs ${themeClasses.text.secondary}`}>Admins</p>
                <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.users.byRole.admin}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'} text-center`}>
                <p className={`text-xs ${themeClasses.text.secondary}`}>Managers</p>
                <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.users.byRole.contentManager}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700/30' : 'bg-gray-50'} text-center`}>
                <p className={`text-xs ${themeClasses.text.secondary}`}>Users</p>
                <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>{stats.users.byRole.user}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Status */}
        <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
          <h3 className={`text-lg font-semibold mb-6 ${themeClasses.text.primary}`}>Content Status Overview</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className={`text-sm ${themeClasses.text.primary}`}>Published Content</span>
              </div>
              <span className={`text-sm font-bold ${themeClasses.text.primary}`}>{stats.content.published}</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div 
                className="h-full rounded-full bg-green-500"
                style={{ width: `${contentPublishedPercentage}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <span className={`text-sm ${themeClasses.text.primary}`}>Draft Content</span>
              </div>
              <span className={`text-sm font-bold ${themeClasses.text.primary}`}>{stats.content.draft}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className={`p-3 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-xs ${themeClasses.text.secondary}`}>Aptitude</p>
                  <HelpCircle className="w-4 h-4 text-green-500" />
                </div>
                <p className={`text-lg font-bold ${themeClasses.text.primary}`}>{stats.aptitudeQuestions.published}/{stats.aptitudeQuestions.total}</p>
                <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mt-2">
                  <div 
                    className="h-full rounded-full bg-green-500"
                    style={{ width: `${aptitudePublishedPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-xs ${themeClasses.text.secondary}`}>Concepts</p>
                  <BookOpen className="w-4 h-4 text-purple-500" />
                </div>
                <p className={`text-lg font-bold ${themeClasses.text.primary}`}>{stats.coreConcepts.published}/{stats.coreConcepts.total}</p>
                <div className="h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mt-2">
                  <div 
                    className="h-full rounded-full bg-purple-500"
                    style={{ width: `${conceptsPublishedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className={`rounded-xl border p-6 ${themeClasses.cardBg}`}>
        <h3 className={`text-lg font-semibold mb-6 ${themeClasses.text.primary}`}>System Health & Performance</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'} text-center`}>
            <Cpu className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className={`text-xs ${themeClasses.text.secondary}`}>Server Uptime</p>
            <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>99.9%</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-50'} text-center`}>
            <Database className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className={`text-xs ${themeClasses.text.secondary}`}>Database</p>
            <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>Healthy</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-purple-900/30' : 'bg-purple-50'} text-center`}>
            <HardDrive className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className={`text-xs ${themeClasses.text.secondary}`}>Storage</p>
            <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>68%</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-amber-900/30' : 'bg-amber-50'} text-center`}>
            <Activity className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className={`text-xs ${themeClasses.text.secondary}`}>API Response</p>
            <p className={`text-lg font-bold mt-1 ${themeClasses.text.primary}`}>128ms</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
