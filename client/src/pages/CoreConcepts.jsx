import { useState, useMemo } from 'react'
import { 
  BookOpen, Database, Cpu, Layers, Network, Box, 
  Search, Filter, Code, Cloud, Server,
  Smartphone, Shield, Wifi, GitBranch,
  Terminal, Lock, Globe, BarChart, Zap, Hash,
  Cpu as Circuit, // Using Cpu for Circuit
  Cpu as Microchip // Using Cpu for Microchip
} from 'lucide-react'

function CoreConcepts() {
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
    { 
      title: 'Digital Electronics', 
      description: 'Logic gates, flip-flops, and digital circuit design',
      topicCount: 17,
      icon: Circuit, // Using Cpu icon
      department: 'Electronics & Communication',
      status: 'Not Started',
      popularity: 85
    },
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
    { 
      title: 'Thermodynamics', 
      description: 'Laws of thermodynamics, heat transfer, and energy conversion',
      topicCount: 14,
      icon: Zap,
      department: 'Mechanical Engineering',
      status: 'Not Started',
      popularity: 78
    },
    // Civil Engineering
    { 
      title: 'Structural Analysis', 
      description: 'Stress, strain, beams, and structural design principles',
      topicCount: 16,
      icon: BarChart,
      department: 'Civil Engineering',
      status: 'Not Started',
      popularity: 76
    },
    // Electrical Engineering
    { 
      title: 'Power Systems', 
      description: 'Generation, transmission, and distribution of electrical power',
      topicCount: 18,
      icon: GitBranch,
      department: 'Electrical Engineering',
      status: 'Not Started',
      popularity: 80
    },
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
    { 
      title: 'Ethical Hacking', 
      description: 'Penetration testing, vulnerability assessment, and security auditing',
      topicCount: 19,
      icon: Lock,
      department: 'Cybersecurity',
      status: 'Not Started',
      popularity: 87
    },
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

  const getIconColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600'
      case 'In Progress':
        return 'text-blue-600'
      default:
        return 'text-gray-400'
    }
  }

  const totalSubjects = filteredSubjects.length
  const totalTopics = filteredSubjects.reduce((sum, subject) => sum + subject.topicCount, 0)
  const completedSubjects = filteredSubjects.filter(s => s.status === 'Completed').length
  const avgProgress = totalSubjects > 0 
    ? Math.round((completedSubjects / totalSubjects) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r 
                 from-blue-900 
                 via-blue-700 
                 to-sky-500 
                 bg-clip-text text-transparent">
  Core Concepts
</span>

          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Master the fundamental concepts across engineering disciplines. 
            Each module is designed to build your expertise from ground up.
          </p>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{totalSubjects}</div>
                  <div className="text-sm text-gray-600">Core Concepts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{totalTopics}</div>
                  <div className="text-sm text-gray-600">Total Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{completedSubjects}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{avgProgress}%</div>
                  <div className="text-sm text-gray-600">Avg. Progress</div>
                </div>
              </div>
            </div>
        <div className="mb-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between 
                        bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search concepts, subjects, or departments..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                text-gray-400 w-5 h-5" />
                <select
                  className="pl-12 pr-10 py-3 border border-gray-200 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent appearance-none bg-white
                           text-gray-700 cursor-pointer"
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
                  className="pl-4 pr-10 py-3 border border-gray-200 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent appearance-none bg-white
                           text-gray-700 cursor-pointer"
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
                  className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium
                           hover:bg-gray-50 rounded-xl transition-colors"
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

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedDepartment !== 'All Departments' && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 
                             bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                Department: {selectedDepartment}
                <button 
                  onClick={() => setSelectedDepartment('All Departments')}
                  className="hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {searchQuery.trim() !== '' && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 
                             bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                Search: "{searchQuery}"
                <button 
                  onClick={() => setSearchQuery('')}
                  className="hover:text-green-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{totalSubjects}</span> concepts
            {selectedDepartment !== 'All Departments' && ` in ${selectedDepartment}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {filteredSubjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {filteredSubjects.map((subject, index) => {
                const IconComponent = subject.icon
                return (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl p-6 border border-gray-100 
                             shadow-sm hover:shadow-xl transition-all duration-300 
                             hover:-translate-y-1 cursor-pointer
                             hover:border-blue-100 active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-blue-50 
                                      transition-colors duration-300 ${getIconColor(subject.status)}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 
                                       transition-colors duration-300">
                            {subject.title}
                          </h3>
                          <div className="mt-1 flex flex-wrap gap-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full 
                                           text-xs font-medium ${subject.status === 'Completed' 
                                             ? 'bg-green-50 text-green-700' 
                                             : subject.status === 'In Progress' 
                                             ? 'bg-blue-50 text-blue-700' 
                                             : 'bg-gray-50 text-gray-700'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${subject.status === 'Completed' 
                                               ? 'bg-green-500' 
                                               : subject.status === 'In Progress' 
                                               ? 'bg-blue-500' 
                                               : 'bg-gray-400'}`}></span>
                              {subject.status}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full 
                                           text-xs font-medium bg-purple-50 text-purple-700">
                              {subject.department}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                      {subject.description}
                    </p>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {subject.topicCount} Topics
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Popularity:</span>
                          <span className="text-sm font-semibold text-gray-700">
                            {subject.popularity}%
                          </span>
                        </div>
                      </div>
                      
                      <button 
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 
                                 font-semibold text-sm transition-all duration-300
                                 group-hover:gap-3"
                      >
                        Start Learning
                        <svg 
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M14 5l7 7m0 0l-7 7m7-7H3" 
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                                  group-hover:border-blue-200 transition-all duration-300 
                                  pointer-events-none" />
                  </div>
                )
              })}
            </div>

            
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-4">
              <Search className="w-16 h-16 text-gray-300 mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No concepts found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              No concepts match your search criteria. Try adjusting your filters or search term.
            </p>
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl
                       hover:bg-blue-700 transition-colors"
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