import { useState, useEffect } from 'react'
import GoalProgress from '../components/GoalProgress'

function Progress() {
  const [preparationLevel, setPreparationLevel] = useState(68)
  
  // Progress data for overview section
  const progressOverview = [
    { 
      title: 'Aptitude Performance', 
      progress: 76, 
      percentage: 76, 
      completed: 38, 
      total: 50,
      icon: '🧠',
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      color: 'from-blue-600 to-cyan-500',
      strokeColor: '#3b82f6'
    },
    { 
      title: 'Core Subject Completion', 
      progress: 58, 
      percentage: 58, 
      completed: 29, 
      total: 50,
      icon: '📚',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      color: 'from-purple-600 to-pink-500',
      strokeColor: '#8b5cf6'
    },
    { 
      title: 'Weekly Study Target', 
      progress: 80, 
      percentage: 80, 
      completed: 4, 
      total: 5,
      icon: '🎯',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'from-emerald-500 to-green-600',
      strokeColor: '#10b981'
    },
    { 
      title: 'Mock Test Performance', 
      progress: 65, 
      percentage: 65, 
      completed: 13, 
      total: 20,
      icon: '📝',
      gradient: 'linear-gradient(135deg, #f97316, #f59e0b)',
      color: 'from-orange-500 to-amber-500',
      strokeColor: '#f97316'
    },
  ]

  // Weekly scores for bar chart
  const weeklyScores = [64, 72, 75, 70, 78, 82, 85]
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  // Skills data for radar chart
  const skillsData = {
    problemSolving: 75,
    speed: 60,
    accuracy: 80,
    consistency: 55,
    timeManagement: 70,
  }

  // Topics completion data
  const topicsData = [
    { subject: 'Data Structures', completed: 24, total: 28, gradient: 'linear-gradient(90deg, #3b82f6, #6366f1)' },
    { subject: 'Algorithms', completed: 16, total: 32, gradient: 'linear-gradient(90deg, #8b5cf6, #d946ef)' },
    { subject: 'DBMS', completed: 24, total: 24, gradient: 'linear-gradient(90deg, #10b981, #059669)' },
    { subject: 'Operating Systems', completed: 10, total: 18, gradient: 'linear-gradient(90deg, #f97316, #f59e0b)' },
    { subject: 'Computer Networks', completed: 12, total: 22, gradient: 'linear-gradient(90deg, #06b6d4, #3b82f6)' },
  ]

  // Calculate overall stats
  const totalTopics = topicsData.reduce((sum, topic) => sum + topic.total, 0)
  const completedTopics = topicsData.reduce((sum, topic) => sum + topic.completed, 0)
  const pendingTopics = totalTopics - completedTopics
  const completionPercentage = Math.round((completedTopics / totalTopics) * 100)

  useEffect(() => {
    const avgProgress = progressOverview.reduce((sum, item) => sum + item.percentage, 0) / progressOverview.length
    setPreparationLevel(Math.round(avgProgress))
  }, [])

  // Professional Circular Progress Component
  const CircularProgress = ({ progress, size = 180, strokeWidth = 16, icon = '🎯', label = '' }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (progress / 100) * circumference
    
    // Dynamic color based on progress
    let progressColor = '#3b82f6' // Default blue
    if (progress >= 80) progressColor = '#10b981' // Green for high progress
    else if (progress >= 60) progressColor = '#f59e0b' // Yellow for medium
    else progressColor = '#ef4444' // Red for low
    
    return (
      <div className="relative flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              className="stroke-gray-100 fill-transparent"
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
              className="fill-transparent transition-all duration-1000 ease-out"
              style={{ stroke: progressColor }}
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl mb-1">{icon}</div>
            <div className="text-4xl font-bold text-gray-900">
              {progress}%
            </div>
            {label && (
              <div className="text-sm font-medium text-gray-500 mt-1">{label}</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Professional Progress Bars Component
  const ProgressBars = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {progressOverview.map((item, index) => {
          const percentage = Math.round((item.completed / item.total) * 100)
          return (
            <div 
              key={index} 
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{item.icon}</div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                </div>
                <span className="text-lg font-bold text-gray-900">{item.percentage}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div 
                  className="absolute h-full rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    width: `${item.percentage}%`,
                    background: item.gradient 
                  }}
                />
              </div>
              
              {/* Progress Info */}
              <div className="flex justify-between text-sm text-gray-600 mt-3">
                <span className="font-medium">Progress</span>
                <span>{item.completed}/{item.total} completed</span>
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-2 mt-3">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.strokeColor }}
                />
                <span className="text-sm text-gray-600">
                  {item.percentage >= 80 ? 'Excellent' : 
                   item.percentage >= 60 ? 'Good' : 
                   'Needs Improvement'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Professional Radar Chart Component
  const RadarChart = () => {
    const skills = Object.entries(skillsData)
    const size = 220
    const center = size / 2
    const radius = size * 0.35
    const angleStep = (2 * Math.PI) / skills.length
    
    const skillPoints = skills.map(([skill, value], index) => {
      const angle = index * angleStep - Math.PI / 2
      const valueRadius = (value / 100) * radius
      const x = center + valueRadius * Math.cos(angle)
      const y = center + valueRadius * Math.sin(angle)
      return { x, y, skill, value }
    })

    const polygonPoints = skillPoints.map(point => `${point.x},${point.y}`).join(' ')
    const axisPoints = skills.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      return { x, y }
    })

    const gridCircles = [0.25, 0.5, 0.75, 1].map(scale => radius * scale)

    return (
      <div className="relative w-full max-w-md mx-auto">
        <svg 
          width="100%" 
          height="300" 
          viewBox={`0 0 ${size} ${size}`}
          className="mx-auto"
          aria-label="Skills Analysis Radar Chart"
          role="img"
        >
          <defs>
            <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid circles */}
          {gridCircles.map((r, index) => (
            <circle
              key={`grid-${index}`}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4"
            />
          ))}

          {/* Axis lines */}
          {axisPoints.map((point, index) => (
            <line
              key={`axis-${index}`}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#d1d5db"
              strokeWidth="1"
            />
          ))}

          {/* Skills polygon */}
          <polygon
            points={polygonPoints}
            fill="url(#radarFill)"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Skill points */}
          {skillPoints.map((point, index) => (
            <g key={`point-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="white"
                stroke="#3b82f6"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Skill labels */}
          {skillPoints.map((point, index) => {
            const angle = index * angleStep - Math.PI / 2
            const labelRadius = radius + 32
            const labelX = center + labelRadius * Math.cos(angle)
            const labelY = center + labelRadius * Math.sin(angle)
            
            let textAnchor = 'middle'
            if (Math.abs(Math.cos(angle)) > 0.8) {
              textAnchor = Math.cos(angle) > 0 ? 'start' : 'end'
            }

            return (
              <g key={`label-${index}`}>
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={textAnchor}
                  fontSize="10"
                  fontWeight="500"
                  fill="#6b7280"
                  className="font-sans"
                >
                  {skills[index][0].replace(/([A-Z])/g, ' $1')}
                </text>
                <text
                  x={labelX}
                  y={labelY + 12}
                  textAnchor={textAnchor}
                  fontSize="10"
                  fontWeight="600"
                  fill="#374151"
                  className="font-sans"
                >
                  {skills[index][1]}%
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Progress Dashboard
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Track your learning progress and analyze performance metrics across different subjects and skills
          </p>
        </div>

        {/* Overall Progress Section */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Main Circular Progress */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Overall Preparation</h2>
                    <p className="text-gray-600 text-sm">Your current progress level</p>
                  </div>
                </div>
                
                <CircularProgress 
                  progress={preparationLevel} 
                  size={180} 
                  strokeWidth={14} 
                  icon="🎯"
                  label="Overall Progress"
                />
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 gap-6 flex-1 max-w-2xl">
                <div className="bg-gray-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{completionPercentage}%</div>
                  <div className="text-gray-600 text-sm">Topics Completion</div>
                  <div className="h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{completedTopics}</div>
                  <div className="text-gray-600 text-sm">Completed Topics</div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-2 bg-green-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }} />
                    </div>
                    <span className="text-sm text-gray-600">+12%</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{pendingTopics}</div>
                  <div className="text-gray-600 text-sm">Pending Topics</div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full" />
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5">
                  <div className="text-3xl font-bold text-gray-900 mb-1">68%</div>
                  <div className="text-gray-600 text-sm">Skill Proficiency</div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Metrics */}
          <ProgressBars />
        </div>

        {/* Detailed Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Topics Completion */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Subject-wise Progress</h2>
              <span className="text-sm text-gray-500">{completionPercentage}% overall</span>
            </div>
            
            <div className="space-y-6">
              {topicsData.map((topic, index) => {
                const percent = Math.round((topic.completed / topic.total) * 100)
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{topic.subject}</span>
                      <span className="font-semibold text-gray-900">{percent}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ 
                          width: `${percent}%`,
                          background: topic.gradient 
                        }}
                      />
                      <div className="absolute inset-0 flex items-center px-3">
                        <span className="text-xs font-medium text-white">
                          {topic.completed}/{topic.total} topics
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Weekly Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Performance</h2>
            
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyScores.map((score, index) => (
                <div key={index} className="flex-1 flex flex-col items-center h-full group">
                  <div className="w-full bg-gray-100 rounded-t-lg relative h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300"
                      style={{ height: `${score}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {score}%
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 mt-2">{weekDays[index]}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Average Score</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(weeklyScores.reduce((a, b) => a + b, 0) / weeklyScores.length)}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Weekly Trend</div>
                  <div className="text-lg font-semibold text-green-600">+12%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Analysis Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills Analysis</h2>
              <p className="text-gray-600 max-w-2xl">
                Comprehensive analysis of your core competencies and areas for improvement
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
                <span className="text-sm font-medium">Overall Score: 68%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RadarChart />
              
              {/* Skill Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                {Object.entries(skillsData).map(([skill, value]) => {
                  let statusColor = 'bg-green-100 text-green-800'
                  let statusText = 'Strong'
                  if (value < 60) {
                    statusColor = 'bg-red-100 text-red-800'
                    statusText = 'Needs Focus'
                  } else if (value < 75) {
                    statusColor = 'bg-yellow-100 text-yellow-800'
                    statusText = 'Good'
                  }
                  
                  return (
                    <div key={skill} className="bg-white rounded-lg p-4 border border-gray-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          {skill.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
                          {statusText}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{value}%</div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            value < 60 ? 'bg-red-500' :
                            value < 75 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-4">Recommendations</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 text-sm">⚡</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Improve Speed</div>
                      <div className="text-sm text-gray-600 mt-1">Practice time-bound sessions</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 text-sm">📊</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Enhance Consistency</div>
                      <div className="text-sm text-gray-600 mt-1">Regular daily practice</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 text-sm">🎯</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Maintain Accuracy</div>
                      <div className="text-sm text-gray-600 mt-1">Review incorrect answers</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skill Distribution */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Skill Distribution</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Problem Solving</span>
                      <span className="font-medium text-gray-900">75%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Accuracy</span>
                      <span className="font-medium text-gray-900">80%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">Time Management</span>
                      <span className="font-medium text-gray-900">70%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '70%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress