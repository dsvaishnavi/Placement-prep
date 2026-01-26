import { useState, useMemo } from 'react'
import {
  BookOpen, Database, Cpu, Layers, Network, Box,
  Search, Filter, Code, Cloud, Server,
  Smartphone, Shield, Wifi, GitBranch,
  Terminal, Lock, Globe, BarChart, Zap, Hash,
  Cpu as Circuit, // Using Cpu for Circuit
  Cpu as Microchip, // Using Cpu for Microchip
  Sparkles, ChevronRight, ArrowRight, Star
} from 'lucide-react'

function CoreConcepts({ theme }) {
  // All departments/branches
  const departments = [
    'All Departments',
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Data Science',
    'Cybersecurity'
  ]

  // All subjects with department information
  const allSubjects = [
    // Computer Science
    {
      title: 'DBMS',
      description: 'Master database management systems, SQL queries, and data modeling',
      topicCount: 24,
      icon: Database,
      department: 'Computer Science',
      status: 'Completed',
      popularity: 95
    },
    {
      title: 'Operating Systems',
      description: 'Understand processes, memory management, and system architecture',
      topicCount: 18,
      icon: Cpu,
      department: 'Computer Science',
      status: 'In Progress',
      popularity: 90
    },
    {
      title: 'OOPS',
      description: 'Learn object-oriented principles, design patterns, and SOLID principles',
      topicCount: 16,
      icon: Box,
      department: 'Computer Science',
      status: 'Not Started',
      popularity: 88
    },
    {
      title: 'Computer Networks',
      description: 'Explore network protocols, topologies, and communication models',
      topicCount: 22,
      icon: Network,
      department: 'Computer Science',
      status: 'In Progress',
      popularity: 92
    },
    {
      title: 'Data Structures',
      description: 'Master arrays, linked lists, trees, graphs, and algorithm analysis',
      topicCount: 28,
      icon: Layers,
      department: 'Computer Science',
      status: 'In Progress',
      popularity: 98
    },
    {
      title: 'Algorithms',
      description: 'Learn sorting, searching, dynamic programming, and complexity analysis',
      topicCount: 32,
      icon: Code,
      department: 'Computer Science',
      status: 'In Progress',
      popularity: 97
    },
    // Information Technology
    {
      title: 'Web Development',
      description: 'Full-stack development with modern frameworks and best practices',
      topicCount: 26,
      icon: Globe,
      department: 'Information Technology',
      status: 'In Progress',
      popularity: 96
    },
    {
      title: 'Cloud Computing',
      description: 'AWS, Azure, and Google Cloud services and architectures',
      topicCount: 21,
      icon: Cloud,
      department: 'Information Technology',
      status: 'Not Started',
      popularity: 94
    },
    {
      title: 'DevOps',
      description: 'CI/CD pipelines, containerization, and infrastructure as code',
      topicCount: 19,
      icon: Server,
      department: 'Information Technology',
      status: 'In Progress',
      popularity: 91
    },
    // Electronics & Communication
    // {
    //   title: 'Digital Electronics',
    //   description: 'Logic gates, flip-flops, and digital circuit design',
    //   topicCount: 17,
    //   icon: Circuit, // Using Cpu icon
    //   department: 'Electronics & Communication',
    //   status: 'Not Started',
    //   popularity: 85
    // },
    {
      title: 'Microprocessors',
      description: '8085/8086 architecture, assembly programming, and interfacing',
      topicCount: 15,
      icon: Microchip, // Using Cpu icon
      department: 'Electronics & Communication',
      status: 'Not Started',
      popularity: 82
    },
    // Mechanical Engineering
    // {
    //   title: 'Thermodynamics',
    //   description: 'Laws of thermodynamics, heat transfer, and energy conversion',
    //   topicCount: 14,
    //   icon: Zap,
    //   department: 'Mechanical Engineering',
    //   status: 'Not Started',
    //   popularity: 78
    // },
    // // Civil Engineering
    // {
    //   title: 'Structural Analysis',
    //   description: 'Stress, strain, beams, and structural design principles',
    //   topicCount: 16,
    //   icon: BarChart,
    //   department: 'Civil Engineering',
    //   status: 'Not Started',
    //   popularity: 76
    // },
    // // Electrical Engineering
    // {
    //   title: 'Power Systems',
    //   description: 'Generation, transmission, and distribution of electrical power',
    //   topicCount: 18,
    //   icon: GitBranch,
    //   department: 'Electrical Engineering',
    //   status: 'Not Started',
    //   popularity: 80
    // },
    // Data Science
    {
      title: 'Machine Learning',
      description: 'Supervised and unsupervised learning algorithms and models',
      topicCount: 25,
      icon: Terminal,
      department: 'Data Science',
      status: 'In Progress',
      popularity: 99
    },
    {
      title: 'Big Data Analytics',
      description: 'Hadoop, Spark, and distributed computing frameworks',
      topicCount: 20,
      icon: Hash,
      department: 'Data Science',
      status: 'Not Started',
      popularity: 93
    },
    // Cybersecurity
    {
      title: 'Network Security',
      description: 'Cryptography, firewalls, intrusion detection, and security protocols',
      topicCount: 22,
      icon: Shield,
      department: 'Cybersecurity',
      status: 'Not Started',
      popularity: 89
    },
    // {
    //   title: 'Ethical Hacking',
    //   description: 'Penetration testing, vulnerability assessment, and security auditing',
    //   topicCount: 19,
    //   icon: Lock,
    //   department: 'Cybersecurity',
    //   status: 'Not Started',
    //   popularity: 87
    // },
  ]

  const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popularity')

  // Filter and sort subjects
  const filteredSubjects = useMemo(() => {
    let filtered = allSubjects

    if (selectedDepartment !== 'All Departments') {
      filtered = filtered.filter(subject =>
        subject.department === selectedDepartment
      )
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(subject =>
        subject.title.toLowerCase().includes(query) ||
        subject.description.toLowerCase().includes(query) ||
        subject.department.toLowerCase().includes(query)
      )
    }

    switch (sortBy) {
      case 'popularity':
        return [...filtered].sort((a, b) => b.popularity - a.popularity)
      case 'topicCount':
        return [...filtered].sort((a, b) => b.topicCount - a.topicCount)
      case 'title':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered
    }
  }, [selectedDepartment, searchQuery, sortBy])

  const totalSubjects = filteredSubjects.length
  const totalTopics = filteredSubjects.reduce((sum, subject) => sum + subject.topicCount, 0)
  const completedSubjects = filteredSubjects.filter(s => s.status === 'Completed').length
  const avgProgress = totalSubjects > 0
    ? Math.round((completedSubjects / totalSubjects) * 100)
    : 0

  return (
    <div className={`min-h-screen pt-16 transition-all duration-300 ${theme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
              Master Core Engineering Concepts
            </span>
          </div>

          <h1 className="mb-4">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                Core Concepts
              </span>
            </div>
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                Mastery Platform
              </span>
            </div>
          </h1>

          <p className={`text-lg mb-8 max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
            Master fundamental concepts across engineering disciplines. Each module is designed to build your expertise from the ground up with interactive learning and practical applications.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <div className={`p-4 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-[1.02] ${theme === 'dark'
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-white/70 border-gray-200/60 hover:bg-white/80'
              }`}>
              <div className="text-2xl font-bold text-blue-400 mb-1">{totalSubjects}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Core Concepts</div>
            </div>
            <div className={`p-4 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-[1.02] ${theme === 'dark'
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-white/70 border-gray-200/60 hover:bg-white/80'
              }`}>
              <div className="text-2xl font-bold text-green-400 mb-1">{totalTopics}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Topics</div>
            </div>
            <div className={`p-4 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-[1.02] ${theme === 'dark'
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-white/70 border-gray-200/60 hover:bg-white/80'
              }`}>
              <div className="text-2xl font-bold text-purple-400 mb-1">{completedSubjects}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Completed</div>
            </div>
            <div className={`p-4 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:scale-[1.02] ${theme === 'dark'
              ? 'bg-white/5 border-white/10 hover:bg-white/10'
              : 'bg-white/70 border-gray-200/60 hover:bg-white/80'
              }`}>
              <div className="text-2xl font-bold text-blue-400 mb-1">{avgProgress}%</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Avg. Progress</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className={`flex flex-col md:flex-row gap-4 items-center justify-between rounded-xl p-6 backdrop-blur-lg border ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                <input
                  type="text"
                  placeholder="Search concepts, subjects, or departments..."
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${theme === 'dark'
                    ? 'bg-gray-800/50 text-white border-gray-600 placeholder-gray-400'
                    : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'
                    }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <Filter className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                <select
                  className={`pl-12 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-300 ${theme === 'dark'
                    ? 'bg-gray-800/50 text-white border-gray-600'
                    : 'bg-white text-gray-900 border-gray-300'
                    }`}
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  className={`pl-4 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-300 ${theme === 'dark'
                    ? 'bg-gray-800/50 text-white border-gray-600'
                    : 'bg-white text-gray-900 border-gray-300'
                    }`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="topicCount">Sort by: Topic Count</option>
                  <option value="title">Sort by: Title</option>
                </select>
              </div>

              {(selectedDepartment !== 'All Departments' || searchQuery.trim() !== '') && (
                <button
                  className={`px-4 py-3 font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] ${theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                    }`}
                  onClick={() => {
                    setSelectedDepartment('All Departments')
                    setSearchQuery('')
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Active Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedDepartment !== 'All Departments' && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium">
                Department: {selectedDepartment}
                <button
                  onClick={() => setSelectedDepartment('All Departments')}
                  className="hover:text-blue-300 transition-colors"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery.trim() !== '' && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-sm font-medium">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-green-300 transition-colors"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing <span className="font-semibold text-blue-400">{totalSubjects}</span> concepts
            {selectedDepartment !== 'All Departments' && ` in ${selectedDepartment}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Concepts Grid */}
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject, index) => {
              const IconComponent = subject.icon
              return (
                <div
                  key={index}
                  className={`group relative rounded-xl p-6 backdrop-blur-lg border transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer ${theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-white/70 border-gray-200/60 hover:bg-white/80 hover:border-gray-200'
                    }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${theme === 'dark'
                      ? 'bg-gradient-to-br from-blue-500/10 to-green-500/10'
                      : 'bg-gradient-to-br from-blue-100 to-green-100'
                      }`}>
                      <IconComponent className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-yellow-400">
                        {subject.popularity}%
                      </span>
                    </div>
                  </div>

                  {/* Title and Status */}
                  <div className="mb-4">
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                      {subject.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${subject.status === 'Completed'
                        ? 'bg-green-500/10 text-green-400'
                        : subject.status === 'In Progress'
                          ? 'bg-blue-500/10 text-blue-400'
                          : theme === 'dark'
                            ? 'bg-gray-500/10 text-gray-400'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${subject.status === 'Completed'
                          ? 'bg-green-400'
                          : subject.status === 'In Progress'
                            ? 'bg-blue-400'
                            : 'bg-gray-400'
                          }`}></span>
                        {subject.status}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                        {subject.department}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className={`mb-6 leading-relaxed line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    {subject.description}
                  </p>

                  {/* Footer */}
                  <div className={`flex items-center justify-between pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <div className="flex items-center gap-2">
                      <BookOpen className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        {subject.topicCount} Topics
                      </span>
                    </div>

                    <button className="flex items-center gap-2 text-blue-400 hover:text-green-400 font-semibold text-sm transition-all duration-300 group-hover:gap-3">
                      Start Learning
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className={`text-center py-16 rounded-xl backdrop-blur-lg border ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <div className="mb-4">
              <Search className="w-16 h-16 text-blue-400 mx-auto" />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No concepts found
            </h3>
            <p className={`mb-6 max-w-md mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
              No concepts match your search criteria. Try adjusting your filters or search term.
            </p>
            <button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
              onClick={() => {
                setSelectedDepartment('All Departments')
                setSearchQuery('')
              }}
            >
              Show All Concepts
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoreConcepts