import { useState, useEffect, useRef } from 'react'
import {
  Brain, BookOpen, Target, FileText, TrendingUp, Cpu, Zap, Clock, CheckCircle,
  Activity, Target as AccuracyIcon, Gauge as SpeedIcon, RefreshCw as ConsistencyIcon, 
  Users as ManagementIcon, BarChart3, LineChart, PieChart, TrendingDown, ChevronRight, 
  Star, Award, Calendar, Book, Code, Database, Server, Network, Sparkles, Trophy,
  ArrowUp, ArrowDown, MoreHorizontal, Filter, Download, Eye, Play, Pause
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Progress({ theme }) {
  const { user } = useAuth()
  const [preparationLevel, setPreparationLevel] = useState(0)
  const [animatedCompletion, setAnimatedCompletion] = useState(0)
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const [isAnimating, setIsAnimating] = useState(false)

  // Enhanced progress data with landing page color palette
  const progressOverview = [
    {
      title: 'Aptitude Performance',
      progress: 85,
      percentage: 85,
      completed: 42,
      total: 50,
      icon: Brain,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      change: '+12%',
      trend: 'up',
      animationDelay: 0
    },
    {
      title: 'Technical Skills',
      progress: 78,
      percentage: 78,
      completed: 39,
      total: 50,
      icon: Code,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      change: '+8%',
      trend: 'up',
      animationDelay: 100
    },
    {
      title: 'Study Consistency',
      progress: 92,
      percentage: 92,
      completed: 46,
      total: 50,
      icon: Target,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      change: '+15%',
      trend: 'up',
      animationDelay: 200
    },
    {
      title: 'Mock Tests',
      progress: 73,
      percentage: 73,
      completed: 22,
      total: 30,
      icon: FileText,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/10 to-red-500/10',
      change: '+5%',
      trend: 'up',
      animationDelay: 300
    },
  ]

  // Weekly performance data
  const weeklyData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      scores: [75, 82, 78, 85, 88, 92, 89],
      activities: [3, 5, 4, 6, 7, 8, 6]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      scores: [78, 82, 85, 89],
      activities: [25, 32, 28, 35]
    },
    year: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      scores: [72, 78, 85, 89],
      activities: [95, 120, 110, 135]
    }
  }

  // Skills radar data
  const skillsData = [
    { skill: 'Problem Solving', value: 85, icon: Cpu, color: 'blue' },
    { skill: 'Communication', value: 78, icon: ManagementIcon, color: 'green' },
    { skill: 'Speed & Accuracy', value: 82, icon: SpeedIcon, color: 'purple' },
    { skill: 'Consistency', value: 90, icon: ConsistencyIcon, color: 'orange' },
    { skill: 'Technical Knowledge', value: 76, icon: AccuracyIcon, color: 'pink' },
  ]

  // Subject progress data
  const subjectsData = [
    { 
      subject: 'Data Structures & Algorithms', 
      completed: 28, 
      total: 32, 
      icon: Code,
      difficulty: 'Advanced',
      timeSpent: '45h',
      lastActivity: '2 hours ago',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      subject: 'Database Management', 
      completed: 24, 
      total: 24, 
      icon: Database,
      difficulty: 'Intermediate',
      timeSpent: '32h',
      lastActivity: '1 day ago',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      subject: 'Operating Systems', 
      completed: 18, 
      total: 22, 
      icon: Server,
      difficulty: 'Intermediate',
      timeSpent: '28h',
      lastActivity: '3 hours ago',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      subject: 'Computer Networks', 
      completed: 15, 
      total: 20, 
      icon: Network,
      difficulty: 'Advanced',
      timeSpent: '22h',
      lastActivity: '5 hours ago',
      gradient: 'from-orange-500 to-red-500'
    },
  ]

  // Recent achievements
  const achievements = [
    {
      title: 'Perfect Week',
      description: 'Completed all daily goals for 7 consecutive days',
      icon: Trophy,
      date: '2 days ago',
      type: 'milestone',
      color: 'yellow'
    },
    {
      title: 'Speed Demon',
      description: 'Solved 50 problems in under 2 hours',
      icon: Zap,
      date: '1 week ago',
      type: 'achievement',
      color: 'blue'
    },
    {
      title: 'Knowledge Master',
      description: 'Completed Database Management course',
      icon: Award,
      date: '2 weeks ago',
      type: 'completion',
      color: 'green'
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreparationLevel(82)
      setAnimatedCompletion(85)
      setIsAnimating(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Enhanced Circular Progress Component
  const CircularProgress = ({ progress, size = 200, strokeWidth = 12, children }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (progress / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className={`fill-transparent ${theme === 'dark' ? 'stroke-gray-700' : 'stroke-gray-200'}`}
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="fill-transparent stroke-blue-500 transition-all duration-2000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    )
  }

  // Performance Chart Component
  const PerformanceChart = () => {
    const currentData = weeklyData[selectedTimeframe]
    const maxScore = Math.max(...currentData.scores)

    return (
      <div className="space-y-4">
        {/* Timeframe Selector */}
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Performance Trend
          </h3>
          <div className={`flex rounded-lg p-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {['week', 'month', 'year'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-500 text-white shadow-sm'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="flex items-end justify-between gap-2 h-48 p-4">
          {currentData.scores.map((score, index) => (
            <div key={index} className="flex-1 flex flex-col items-center h-full">
              <div className="w-full relative h-full flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-1000 ease-out relative group"
                  style={{ 
                    height: `${(score / maxScore) * 100}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Tooltip */}
                  <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
                    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
                  }`}>
                    {score}%
                  </div>
                </div>
              </div>
              <span className={`text-xs font-medium mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentData.labels[index]}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200/20">
          <div className="text-center">
            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {Math.round(currentData.scores.reduce((a, b) => a + b, 0) / currentData.scores.length)}%
            </div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Average</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold text-green-500`}>
              {Math.max(...currentData.scores)}%
            </div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Best</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {currentData.activities.reduce((a, b) => a + b, 0)}
            </div>
            <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Activities</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen pt-16 transition-all duration-300 ${theme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl ${
          theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
        }`} />
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl ${
          theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'
        }`} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-xl ${theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' 
                  : 'bg-gradient-to-br from-blue-100 to-purple-100'
                }`}>
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <h1 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
                  Progress Dashboard
                </h1>
              </div>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Welcome back, {user?.name || 'Student'}! Track your learning journey and achievements.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
              }`}>
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
              }`}>
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Main Progress Overview */}
        <div className={`rounded-2xl p-8 mb-8 backdrop-blur-xl border transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-white/5 border-white/10 hover:bg-white/10' 
            : 'bg-white/70 border-gray-200/60 hover:bg-white/80'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Overall Progress Circle */}
            <div className="text-center lg:text-left">
              <CircularProgress progress={preparationLevel} size={220}>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Sparkles className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {preparationLevel}%
                  </div>
                  <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Overall Progress
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">+12% this week</span>
                  </div>
                </div>
              </CircularProgress>
            </div>

            {/* Progress Metrics */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {progressOverview.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-xl backdrop-blur-md border transition-all duration-300 hover:scale-105 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                          : 'bg-white/70 border-gray-200/60 hover:bg-white/80'
                      }`}
                      style={{ animationDelay: `${item.animationDelay}ms` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${item.bgGradient}`}>
                          <Icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-1">
                          <ArrowUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-500">{item.change}</span>
                        </div>
                      </div>
                      
                      <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {item.percentage}%
                        </span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {item.completed}/{item.total}
                        </span>
                      </div>
                      
                      <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                          className={`h-full bg-gradient-to-r ${item.gradient} transition-all duration-1000 ease-out`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Subject Progress */}
          <div className={`lg:col-span-2 rounded-2xl p-6 backdrop-blur-xl border ${
            theme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/70 border-gray-200/60'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${theme === 'dark' 
                  ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' 
                  : 'bg-gradient-to-br from-green-100 to-emerald-100'
                }`}>
                  <BookOpen className="w-5 h-5 text-green-500" />
                </div>
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Subject Progress
                </h2>
              </div>
              <button className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'
              }`}>
                <MoreHorizontal className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>

            <div className="space-y-6">
              {subjectsData.map((subject, index) => {
                const Icon = subject.icon
                const percentage = Math.round((subject.completed / subject.total) * 100)
                
                return (
                  <div key={index} className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-white/50 border-gray-200/60 hover:bg-white'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'}`}>
                          <Icon className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {subject.subject}
                          </h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              subject.difficulty === 'Advanced' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {subject.difficulty}
                            </span>
                            <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {subject.timeSpent} • {subject.lastActivity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {percentage}%
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {subject.completed}/{subject.total}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`h-3 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className={`h-full bg-gradient-to-r ${subject.gradient} transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Performance Chart */}
          <div className={`rounded-2xl p-6 backdrop-blur-xl border ${
            theme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/70 border-gray-200/60'
          }`}>
            <PerformanceChart />
          </div>
        </div>

        {/* Skills Analysis & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Skills Radar */}
          <div className={`rounded-2xl p-6 backdrop-blur-xl border ${
            theme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/70 border-gray-200/60'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-xl ${theme === 'dark' 
                ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' 
                : 'bg-gradient-to-br from-purple-100 to-pink-100'
              }`}>
                <Cpu className="w-5 h-5 text-purple-500" />
              </div>
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Skills Analysis
              </h2>
            </div>

            {/* Radar Chart */}
            <div className="relative w-full max-w-md mx-auto mb-6">
              <div className={`rounded-xl p-6 ${theme === 'dark' 
                ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20' 
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
              }`}>
                <svg
                  width="100%"
                  height="320"
                  viewBox="0 0 320 320"
                  className="mx-auto"
                  aria-label="Skills Analysis Radar Chart"
                  role="img"
                >
                  <defs>
                    <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Grid circles */}
                  {[0.2, 0.4, 0.6, 0.8, 1].map((scale, index) => (
                    <circle
                      key={`grid-${index}`}
                      cx="160"
                      cy="160"
                      r={120 * scale}
                      fill="none"
                      stroke={theme === 'dark' ? '#374151' : '#D1D5DB'}
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      opacity="0.5"
                    />
                  ))}

                  {/* Axis lines */}
                  {skillsData.map((_, index) => {
                    const angle = (index * 2 * Math.PI) / skillsData.length - Math.PI / 2
                    const x = 160 + 120 * Math.cos(angle)
                    const y = 160 + 120 * Math.sin(angle)
                    return (
                      <line
                        key={`axis-${index}`}
                        x1="160"
                        y1="160"
                        x2={x}
                        y2={y}
                        stroke={theme === 'dark' ? '#374151' : '#D1D5DB'}
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    )
                  })}

                  {/* Skills polygon */}
                  <polygon
                    points={skillsData.map((skill, index) => {
                      const angle = (index * 2 * Math.PI) / skillsData.length - Math.PI / 2
                      const radius = (skill.value / 100) * 120
                      const x = 160 + radius * Math.cos(angle)
                      const y = 160 + radius * Math.sin(angle)
                      return `${x},${y}`
                    }).join(' ')}
                    fill="url(#radarFill)"
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />

                  {/* Skill points */}
                  {skillsData.map((skill, index) => {
                    const angle = (index * 2 * Math.PI) / skillsData.length - Math.PI / 2
                    const radius = (skill.value / 100) * 120
                    const x = 160 + radius * Math.cos(angle)
                    const y = 160 + radius * Math.sin(angle)
                    return (
                      <g key={`point-${index}`}>
                        <circle
                          cx={x}
                          cy={y}
                          r="4"
                          fill="white"
                          stroke="#8B5CF6"
                          strokeWidth="2"
                          filter="url(#glow)"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="2"
                          fill="#8B5CF6"
                        />
                      </g>
                    )
                  })}

                  {/* Skill labels */}
                  {skillsData.map((skill, index) => {
                    const Icon = skill.icon
                    const angle = (index * 2 * Math.PI) / skillsData.length - Math.PI / 2
                    const labelRadius = 140
                    const x = 160 + labelRadius * Math.cos(angle)
                    const y = 160 + labelRadius * Math.sin(angle)

                    let textAnchor = 'middle'
                    if (Math.abs(Math.cos(angle)) > 0.7) {
                      textAnchor = Math.cos(angle) > 0 ? 'start' : 'end'
                    }

                    return (
                      <g key={`label-${index}`}>
                        {/* Icon background */}
                        <circle
                          cx={x}
                          cy={y - 15}
                          r="12"
                          fill={theme === 'dark' ? '#1F2937' : '#FFFFFF'}
                          stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                          strokeWidth="1"
                        />
                        
                        {/* Icon */}
                        <foreignObject x={x - 8} y={y - 23} width="16" height="16">
                          <div className="flex items-center justify-center w-full h-full">
                            <Icon className="w-4 h-4 text-purple-500" />
                          </div>
                        </foreignObject>

                        {/* Skill name */}
                        <text
                          x={x}
                          y={y + 5}
                          textAnchor={textAnchor}
                          fontSize="11"
                          fontWeight="600"
                          fill={theme === 'dark' ? '#F3F4F6' : '#374151'}
                          className="font-sans"
                        >
                          {skill.skill}
                        </text>
                        
                        {/* Skill value */}
                        <text
                          x={x}
                          y={y + 18}
                          textAnchor={textAnchor}
                          fontSize="12"
                          fontWeight="700"
                          fill="#8B5CF6"
                          className="font-sans"
                        >
                          {skill.value}%
                        </text>
                      </g>
                    )
                  })}

                  {/* Center point */}
                  <circle
                    cx="160"
                    cy="160"
                    r="3"
                    fill="#8B5CF6"
                    opacity="0.8"
                  />
                </svg>
              </div>
            </div>

            {/* Skills Legend */}
            <div className="space-y-3">
              {skillsData.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'}`}>
                        <Icon className="w-4 h-4 text-purple-500" />
                      </div>
                      <span className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {skill.skill}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-16 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                      <span className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {skill.value}%
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Overall Skills Score */}
            <div className={`mt-6 p-4 rounded-xl ${theme === 'dark' 
              ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20' 
              : 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                    <Zap className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Overall Skills Score
                    </div>
                    <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Average across all skills
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {Math.round(skillsData.reduce((sum, skill) => sum + skill.value, 0) / skillsData.length)}%
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-green-500">+8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className={`rounded-2xl p-6 backdrop-blur-xl border ${
            theme === 'dark' 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/70 border-gray-200/60'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-xl ${theme === 'dark' 
                ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20' 
                : 'bg-gradient-to-br from-yellow-100 to-orange-100'
              }`}>
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Recent Achievements
              </h2>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div key={index} className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-white/50 border-gray-200/60 hover:bg-white'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                        achievement.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {achievement.description}
                        </p>
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          {achievement.date}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress