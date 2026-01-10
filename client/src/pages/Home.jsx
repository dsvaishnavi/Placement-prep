import { Trophy, Target, Clock, TrendingUp, Calendar, Award, Brain, Users, BookOpen, ChevronRight, Star, Zap, Target as TargetIcon, BarChart3, TrendingDown } from 'lucide-react'
import Snowfall from 'react-snowfall'
import { useAuth } from '../context/AuthContext'

function Home({ theme }) {
  const { user, loading } = useAuth()

  // Show loading state if user data is still being fetched
  if (loading) {
    return (
      <div className={`min-h-screen pt-16 flex items-center justify-center ${theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
        : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
        }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    )
  }
  // Enhanced dummy data
  const stats = [
    {
      icon: Trophy,
      title: 'Tests Completed',
      value: '24',
      subtitle: 'This month',
      change: '+12%',
      trend: 'up',
      color: 'from-yellow-500/20 to-yellow-600/20',
      iconColor: 'text-yellow-500'
    },
    {
      icon: Target,
      title: 'Average Score',
      value: '82%',
      subtitle: 'Across all tests',
      change: '+5%',
      trend: 'up',
      color: 'from-green-500/20 to-emerald-600/20',
      iconColor: 'text-green-500'
    },
    {
      icon: Clock,
      title: 'Study Hours',
      value: '68 hrs',
      subtitle: 'Tracked sessions',
      change: '+18%',
      trend: 'up',
      color: 'from-blue-500/20 to-cyan-600/20',
      iconColor: 'text-blue-500'
    },
    {
      icon: BarChart3,
      title: 'Performance Rank',
      value: '#42',
      subtitle: 'Top 15% of users',
      change: '+36 spots',
      trend: 'up',
      color: 'from-purple-500/20 to-pink-600/20',
      iconColor: 'text-purple-500'
    }
  ]

  const recentActivities = [
    { 
      title: 'Quantitative Aptitude Mock Test', 
      date: 'Today, 10:30 AM', 
      score: '85%',
      icon: Brain,
      category: 'Aptitude',
      timeSpent: '2h 15m',
      difficulty: 'Hard'
    },
    { 
      title: 'DBMS Fundamentals Assessment', 
      date: 'Yesterday, 3:15 PM', 
      score: '78%',
      icon: BookOpen,
      category: 'Technical',
      timeSpent: '1h 45m',
      difficulty: 'Medium'
    },
    { 
      title: 'Logical Reasoning Challenge', 
      date: 'Dec 18, 11:00 AM', 
      score: '92%',
      icon: Brain,
      category: 'Aptitude',
      timeSpent: '1h 30m',
      difficulty: 'Hard'
    },
    { 
      title: 'OOPS Concepts Quiz', 
      date: 'Dec 17, 2:45 PM', 
      score: '88%',
      icon: BookOpen,
      category: 'Technical',
      timeSpent: '2h',
      difficulty: 'Medium'
    }
  ]

  const goals = [
    { 
      title: 'Complete 30 aptitude tests', 
      progress: 24, 
      total: 30,
      percentage: 80,
      deadline: 'Dec 30, 2024',
      icon: TargetIcon
    },
    { 
      title: 'Master all core concepts', 
      progress: 15, 
      total: 25,
      percentage: 60,
      deadline: 'Jan 15, 2025',
      icon: Award
    },
    { 
      title: 'Achieve 85% average score', 
      progress: 82, 
      total: 85,
      percentage: 96,
      deadline: 'Ongoing',
      icon: Star
    }
  ]

  const upcomingTasks = [
    { 
      title: 'Mock Interview Prep', 
      time: '10:00 AM', 
      date: 'Tomorrow',
      type: 'interview',
      duration: '1 hour',
      priority: 'high'
    },
    { 
      title: 'Coding Challenge', 
      time: '2:00 PM', 
      date: 'Dec 20',
      type: 'coding',
      duration: '2 hours',
      priority: 'medium'
    },
    { 
      title: 'Aptitude Test Series', 
      time: '11:00 AM', 
      date: 'Dec 22',
      type: 'test',
      duration: '3 hours',
      priority: 'high'
    }
  ]

  const performanceInsights = [
    { 
      area: 'Logical Reasoning', 
      score: 92, 
      trend: 'up',
      change: '+4%',
      color: 'bg-green-500'
    },
    { 
      area: 'Quantitative Aptitude', 
      score: 85, 
      trend: 'up',
      change: '+2%',
      color: 'bg-blue-500'
    },
    { 
      area: 'Verbal Ability', 
      score: 78, 
      trend: 'stable',
      change: '0%',
      color: 'bg-yellow-500'
    },
    { 
      area: 'Technical Concepts', 
      score: 82, 
      trend: 'up',
      change: '+3%',
      color: 'bg-purple-500'
    }
  ]

  const quickActions = [
    { icon: Target, label: 'Start Test', color: 'blue', path: '/tests' },
    { icon: BookOpen, label: 'Study Now', color: 'green', path: '/study' },
    { icon: Users, label: 'Mock Interview', color: 'purple', path: '/interview' },
    { icon: TrendingUp, label: 'Progress', color: 'yellow', path: '/progress' }
  ]

  return (
    <div className={`min-h-screen pt-16 ${theme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
      <Snowfall 
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1
        }}
        snowflakeCount={100}
        color={theme === 'dark' ? '#ffffff' : '#b5b5b5'}
        speed={[0.5, 1.5]}
        wind={[-0.5, 0.5]}
        radius={[0.5, 3]}
      />

      {/* Main Container with Centered Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section - Centered */}
        <div className="mb-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Welcome back, {user?.name?.split(' ')[0] || user?.name || 'User'}! 👋
              </h1>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Your placement preparation dashboard
              </p>
            </div>
            <div className={`px-4 py-3 rounded-xl backdrop-blur-md border ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
              }`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Daily Streak</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((day) => (
                    <div key={day} className={`w-2 h-6 rounded-sm mx-0.5 ${day <= 4 
                      ? 'bg-green-500' 
                      : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                    }`} />
                  ))}
                </div>
                <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>4 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Centered with proper spacing */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Performance Overview
            </h2>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Updated today
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className={`rounded-xl shadow-sm p-5 backdrop-blur-md border transition-all duration-300 hover:scale-[1.02] ${theme === 'dark'
                ? 'bg-white/5 border-white/10 hover:border-white/20'
                : 'bg-white/70 border-gray-200/60 hover:border-gray-300'
                }`}>
                <div className="flex justify-between items-start mb-3">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${theme === 'dark'
                    ? `bg-gradient-to-br ${stat.color}`
                    : stat.color.replace('/20', '/10')
                    }`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${stat.trend === 'up' 
                      ? (theme === 'dark' ? 'text-green-400' : 'text-green-700')
                      : (theme === 'dark' ? 'text-red-400' : 'text-red-700')
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <h3 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.title}
                </h3>
                <p className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid - Centered Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Left Column - 66% width */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Goals Progress Section */}
            <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
              }`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Your Learning Goals
                </h2>
                <button className={`text-sm flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}>
                  Set New Goal
                </button>
              </div>
              <div className="space-y-5">
                {goals.map((goal, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'}`}>
                        <goal.icon className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {goal.title}
                          </span>
                          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {goal.progress}/{goal.total}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <div className={`w-full rounded-full h-2 mr-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div
                              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${goal.percentage}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-bold ${goal.percentage >= 80 ? 'text-green-500' : 
                            goal.percentage >= 60 ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {goal.percentage}%
                          </span>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Target: {goal.deadline}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities Section */}
            <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
              }`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Recent Activities
                </h2>
                <button className={`text-sm flex items-center gap-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} hover:opacity-80`}>
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-xl backdrop-blur-md border transition-colors ${theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-white/70 border-gray-200/60 hover:bg-white'
                    }`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'}`}>
                        <activity.icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {activity.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {activity.date}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark'
                            ? activity.category === 'Aptitude' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-green-500/20 text-green-300'
                            : activity.category === 'Aptitude' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                          }`}>
                            {activity.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark'
                            ? activity.difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            : activity.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                          }`}>
                            {activity.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium block mb-1 ${activity.score >= 85 ? (theme === 'dark' ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-800') :
                        activity.score >= 75 ? (theme === 'dark' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-800') :
                        (theme === 'dark' ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-800')
                      }`}>
                        {activity.score}
                      </span>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        {activity.timeSpent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 33% width */}
          <div className="space-y-6">
            
            {/* Upcoming Tasks */}
            <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
              }`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Upcoming Schedule
                </h2>
                <Calendar className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className={`p-4 rounded-xl backdrop-blur-md border transition-colors ${theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-white/70 border-gray-200/60 hover:bg-white'
                    }`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {task.date} • {task.time}
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${theme === 'dark'
                        ? task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        : task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded ${theme === 'dark'
                        ? task.type === 'interview' ? 'bg-purple-500/20 text-purple-300' :
                          task.type === 'coding' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        : task.type === 'interview' ? 'bg-purple-100 text-purple-800' :
                          task.type === 'coding' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.type}
                      </span>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        ⏱️ {task.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
              }`}>
              <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Performance Insights
              </h2>
              <div className="space-y-5">
                {performanceInsights.map((insight, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {insight.area}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                          {insight.score}%
                        </span>
                        <div className="flex items-center gap-1">
                          {insight.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          ) : insight.trend === 'down' ? (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          ) : null}
                          <span className={`text-xs ${insight.trend === 'up' ? 'text-green-500' : 
                            insight.trend === 'down' ? 'text-red-500' : 'text-yellow-500'
                          }`}>
                            {insight.change}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className={`${insight.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${insight.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                    Daily Tip
                  </p>
                </div>
                <p className={`text-xs ${theme === 'dark' ? 'text-blue-400/80' : 'text-blue-600'}`}>
                  Focus on Verbal Ability - it's your area with most improvement potential. Try 30 minutes daily practice.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
              }`}>
              <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 ${theme === 'dark'
                      ? `bg-${action.color}-500/10 hover:bg-${action.color}-500/20 border border-${action.color}-500/20`
                      : `bg-${action.color}-50 hover:bg-${action.color}-100 border border-${action.color}-100`
                    }`}
                  >
                    <action.icon className={`w-6 h-6 text-${action.color}-500 mb-2`} />
                    <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Motivational Quote */}
        <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border text-center ${theme === 'dark'
          ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-white/10'
          : 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-gray-200/60'
          }`}>
          <div className="max-w-2xl mx-auto">
            <Award className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Today's Motivation
            </h3>
            <p className={`italic mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              "The secret of getting ahead is getting started. Every expert was once a beginner."
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {user?.name ? `${user.name}, you're` : "You're"} in the top 15% of SkillSync users. Keep pushing! 🚀
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home