import { useState, useEffect, useRef } from 'react'
import { 
  Brain, BookOpen, Target, FileText, 
  TrendingUp, Cpu, Zap, Clock, CheckCircle, 
  Activity, Target as AccuracyIcon, Gauge as SpeedIcon,
  RefreshCw as ConsistencyIcon, Users as ManagementIcon,
  BarChart3, LineChart, PieChart, TrendingDown,
  ChevronRight, Star, Award, Calendar,
  Book, Code, Database, Server, Network
} from 'lucide-react'

function Progress() {
  const [preparationLevel, setPreparationLevel] = useState(0)
  const [animatedCompletion, setAnimatedCompletion] = useState(0)
  const radarRef = useRef(null)
  
  // Progress data for overview section - updated to blue theme
  const progressOverview = [
    { 
      title: 'Aptitude Performance', 
      progress: 76, 
      percentage: 76, 
      completed: 38, 
      total: 50,
      icon: Brain,
      gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      strokeColor: '#2563eb',
      animationDelay: 0
    },
    { 
      title: 'Core Subject Completion', 
      progress: 58, 
      percentage: 58, 
      completed: 29, 
      total: 50,
      icon: BookOpen,
      gradient: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
      strokeColor: '#1d4ed8',
      animationDelay: 100
    },
    { 
      title: 'Weekly Study Target', 
      progress: 80, 
      percentage: 80, 
      completed: 4, 
      total: 5,
      icon: Target,
      gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
      strokeColor: '#3b82f6',
      animationDelay: 200
    },
    { 
      title: 'Mock Test Performance', 
      progress: 65, 
      percentage: 65, 
      completed: 13, 
      total: 20,
      icon: FileText,
      gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
      strokeColor: '#60a5fa',
      animationDelay: 300
    },
  ]

  // Weekly scores for bar chart
  const weeklyScores = [64, 72, 75, 70, 78, 82, 85]
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  // Skills data for radar chart - updated to blue theme
  const skillsData = [
    { skill: 'Problem Solving', value: 75, icon: Cpu, color: '#2563eb' },
    { skill: 'Management', value: 70, icon: ManagementIcon, color: '#1d4ed8' },
    { skill: 'Speed', value: 60, icon: SpeedIcon, color: '#3b82f6' },
    { skill: 'Consistency', value: 55, icon: ConsistencyIcon, color: '#60a5fa' },
    { skill: 'Accuracy', value: 80, icon: AccuracyIcon, color: '#93c5fd' },
  ]

  // Subject icons mapping
  const subjectIcons = {
    'Data Structures': Code,
    'Algorithms': Brain,
    'DBMS': Database,
    'Operating Systems': Server,
    'Computer Networks': Network,
  }

  // Topics completion data - updated to blue theme
  const topicsData = [
    { subject: 'Data Structures', completed: 24, total: 28, gradient: 'linear-gradient(90deg, #2563eb, #1d4ed8)' },
    { subject: 'Algorithms', completed: 16, total: 32, gradient: 'linear-gradient(90deg, #1d4ed8, #1e40af)' },
    { subject: 'DBMS', completed: 24, total: 24, gradient: 'linear-gradient(90deg, #3b82f6, #2563eb)' },
    { subject: 'Operating Systems', completed: 10, total: 18, gradient: 'linear-gradient(90deg, #60a5fa, #3b82f6)' },
    { subject: 'Computer Networks', completed: 12, total: 22, gradient: 'linear-gradient(90deg, #93c5fd, #60a5fa)' },
  ]

  // Calculate overall stats
  const totalTopics = topicsData.reduce((sum, topic) => sum + topic.total, 0)
  const completedTopics = topicsData.reduce((sum, topic) => sum + topic.completed, 0)
  const pendingTopics = totalTopics - completedTopics
  const completionPercentage = Math.round((completedTopics / totalTopics) * 100)

  useEffect(() => {
    // Animate overall preparation level
    const timer = setTimeout(() => {
      setPreparationLevel(68)
      setAnimatedCompletion(completionPercentage)
    }, 500)

    return () => clearTimeout(timer)
  }, [completionPercentage])

  // Enhanced Circular Progress Component with smooth animation
  const CircularProgress = ({ progress, size = 200, strokeWidth = 16, Icon = TrendingUp, label = '' }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (progress / 100) * circumference
    
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
              className="stroke-blue-100 fill-transparent"
            />
            {/* Animated Progress Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              className="fill-transparent transition-all duration-2000 ease-out stroke-blue-600"
              style={{ 
                strokeDashoffset: offset,
              }}
            />
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-2">
              <Icon className="w-10 h-10 text-blue-700" />
            </div>
            <div className="text-4xl font-bold text-blue-900 transition-all duration-1000 ease-out">
              {progress}%
            </div>
            {label && (
              <div className="text-sm font-medium text-slate-600 mt-1">{label}</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Enhanced Progress Bars Component
  const ProgressBars = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {progressOverview.map((item, index) => {
          const Icon = item.icon
          return (
            <div 
              key={index} 
              className="bg-white rounded-lg p-5 border border-blue-100 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900">{item.title}</h3>
                </div>
                <span className="text-lg font-bold text-blue-900">{item.percentage}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative h-2 bg-blue-100 rounded-full overflow-hidden mb-2">
                <div 
                  className="absolute h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${item.percentage}%`,
                    background: item.gradient
                  }}
                />
              </div>
              
              {/* Progress Info */}
              <div className="flex justify-between text-sm text-slate-600 mt-3">
                <span className="font-medium">Progress</span>
                <span>{item.completed}/{item.total} completed</span>
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-2 mt-3">
                <div 
                  className="w-2 h-2 rounded-full bg-blue-500"
                />
                <span className="text-sm text-slate-600">
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

  // Enhanced Radar Chart Component
  const RadarChart = () => {
    const size = 320
    const center = size / 2
    const radius = size * 0.35
    const angleStep = (2 * Math.PI) / skillsData.length
    
    const skillPoints = skillsData.map((item, index) => {
      const angle = index * angleStep - Math.PI / 2
      const valueRadius = (item.value / 100) * radius
      const x = center + valueRadius * Math.cos(angle)
      const y = center + valueRadius * Math.sin(angle)
      return { x, y, ...item }
    })

    const polygonPoints = skillPoints.map(point => `${point.x},${point.y}`).join(' ')
    const axisPoints = skillsData.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      return { x, y }
    })

    const gridCircles = [0.2, 0.4, 0.6, 0.8, 1].map(scale => radius * scale)

    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
          <svg 
            width="100%" 
            height="320" 
            viewBox={`0 0 ${size} ${size}`}
            className="mx-auto"
            aria-label="Skills Analysis Radar Chart"
            role="img"
          >
            <defs>
              <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.1" />
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
                stroke="#DBEAFE"
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
                stroke="#DBEAFE"
                strokeWidth="1"
              />
            ))}

            {/* Skills polygon */}
            <polygon
              points={polygonPoints}
              fill="url(#radarFill)"
              stroke="#3B82F6"
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
                  stroke="#3B82F6"
                  strokeWidth="2"
                />
              </g>
            ))}

            {/* Skill labels */}
            {skillPoints.map((point, index) => {
              const Icon = point.icon
              const angle = index * angleStep - Math.PI / 2
              const labelRadius = radius + 40
              const labelX = center + labelRadius * Math.cos(angle)
              const labelY = center + labelRadius * Math.sin(angle)
              
              let textAnchor = 'middle'
              if (Math.abs(Math.cos(angle)) > 0.8) {
                textAnchor = Math.cos(angle) > 0 ? 'start' : 'end'
              }

              return (
                <g key={`label-${index}`}>
                  <foreignObject x={labelX - 20} y={labelY - 20} width="40" height="40">
                    <div className="flex items-center justify-center w-full h-full">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </foreignObject>
                  
                  <text
                    x={labelX}
                    y={labelY + 25}
                    textAnchor={textAnchor}
                    fontSize="10"
                    fontWeight="600"
                    fill="#374151"
                    className="font-sans"
                  >
                    {point.skill}
                  </text>
                  <text
                    x={labelX}
                    y={labelY + 40}
                    textAnchor={textAnchor}
                    fontSize="11"
                    fontWeight="700"
                    fill="#1e40af"
                    className="font-sans"
                  >
                    {point.value}%
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
        
        {/* Skill indicators */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {skillsData.map((skill, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-4 border border-blue-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium text-slate-700">{skill.skill}</span>
                </div>
                <span className="text-sm font-bold text-blue-900">{skill.value}%</span>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                  style={{ width: `${skill.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Activity className="w-8 h-8 text-blue-700" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              Progress Dashboard
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Track your learning progress and analyze performance metrics
          </p>
        </div>

        {/* Overall Progress Section */}
        <div className="mb-10">
          <div className="bg-white rounded-xl p-6 border border-blue-100 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Main Circular Progress */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                    <TrendingUp className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">Overall Preparation</h2>
                    <p className="text-slate-600 text-sm">Your current progress level</p>
                  </div>
                </div>
                
                <CircularProgress 
                  progress={preparationLevel} 
                  size={200} 
                  strokeWidth={16} 
                  Icon={TrendingUp}
                  label="Overall Progress"
                />
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 gap-4 flex-1 max-w-2xl">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{animatedCompletion}%</div>
                      <div className="text-sm text-slate-600">Topics Completion</div>
                    </div>
                  </div>
                  <div className="h-2 bg-blue-100 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-2000"
                      style={{ width: `${animatedCompletion}%` }}
                    />
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-blue-900">{completedTopics}</div>
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-sm text-slate-600 mb-2">Completed Topics</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{ width: '80%' }} />
                    </div>
                    <span className="text-xs font-medium text-blue-700">+12%</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-bold text-blue-900">{pendingTopics}</div>
                    <Clock className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="text-sm text-slate-600 mb-2">Pending Topics</div>
                  <div className="h-2 bg-blue-100 rounded-full">
                    <div className="h-full bg-blue-300 rounded-full" style={{ width: `${(pendingTopics/totalTopics)*100}%` }} />
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <div className="text-2xl font-bold text-blue-900">68%</div>
                  </div>
                  <div className="text-sm text-slate-600 mb-2">Skill Proficiency</div>
                  <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Metrics */}
          <ProgressBars />
        </div>

        {/* Detailed Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Topics Completion */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-blue-900">Subject-wise Progress</h2>
              </div>
              <span className="text-sm text-slate-500">{completionPercentage}% overall</span>
            </div>
            
            <div className="space-y-5">
              {topicsData.map((topic, index) => {
                const percent = Math.round((topic.completed / topic.total) * 100)
                const Icon = subjectIcons[topic.subject] || Book
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50">
                          <Icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-blue-900">{topic.subject}</span>
                      </div>
                      <span className="font-bold text-blue-900">{percent}%</span>
                    </div>
                    <div className="h-3 bg-blue-100 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full rounded-full transition-all duration-700"
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
          <div className="bg-white rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-50">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-blue-900">Weekly Performance</h2>
            </div>
            
            <div className="flex items-end justify-between gap-2 h-40">
              {weeklyScores.map((score, index) => (
                <div key={index} className="flex-1 flex flex-col items-center h-full">
                  <div className="w-full bg-blue-100 rounded-t-lg relative h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300"
                      style={{ height: `${score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-700 mt-2">{weekDays[index]}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-6 mt-6 border-t border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-600">Average Score</div>
                  <div className="text-xl font-bold text-blue-900">
                    {Math.round(weeklyScores.reduce((a, b) => a + b, 0) / weeklyScores.length)}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600">Weekly Trend</div>
                  <div className="flex items-center gap-1 text-base font-medium text-blue-700">
                    <TrendingUp className="w-4 h-4" />
                    +12%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Analysis Section */}
        <div className="bg-white rounded-xl p-6 border border-blue-100 mb-8">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Cpu className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-blue-900">Skills Analysis</h2>
              </div>
              <p className="text-slate-600 max-w-2xl">
                Comprehensive analysis of your core competencies and areas for improvement
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Overall Score: 68%</span>
            </div>
          </div>

          <RadarChart />
        </div>

        {/* CSS for subtle animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Progress