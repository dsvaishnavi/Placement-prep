import { Calendar, User, Clock, Tag, ArrowRight, BookOpen, TrendingUp, Brain } from 'lucide-react'

function Blog({ theme }) {
  const blogPosts = [
    {
      title: '10 Tips to Ace Your Technical Interview in 2025',
      excerpt: 'Learn the latest strategies and technical skills that top tech companies are looking for...',
      author: 'Priya Desai',
      date: 'Dec 15, 2024',
      readTime: '8 min read',
      category: 'Interview Prep',
      tags: ['Technical', 'Interview', 'Coding'],
      imageColor: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      title: 'How to Build a Winning Resume for Freshers',
      excerpt: 'Essential tips and format recommendations to make your resume stand out...',
      author: 'Karan Singh',
      date: 'Dec 12, 2024',
      readTime: '6 min read',
      category: 'Resume Building',
      tags: ['Resume', 'Freshers', 'ATS'],
      imageColor: 'from-green-500/20 to-emerald-500/20'
    },
    {
      title: 'Mastering Aptitude Tests: A Complete Guide',
      excerpt: 'Proven techniques to improve your speed and accuracy in quantitative aptitude...',
      author: 'Dr. Ananya Sharma',
      date: 'Dec 10, 2024',
      readTime: '10 min read',
      category: 'Aptitude',
      tags: ['Quantitative', 'Reasoning', 'Practice'],
      imageColor: 'from-purple-500/20 to-pink-500/20'
    },
    {
      title: 'The Future of Placement Preparation: AI Trends',
      excerpt: 'How artificial intelligence is revolutionizing how students prepare for placements...',
      author: 'Rohan Mehra',
      date: 'Dec 8, 2024',
      readTime: '7 min read',
      category: 'Industry Trends',
      tags: ['AI', 'Future', 'Technology'],
      imageColor: 'from-orange-500/20 to-red-500/20'
    },
    {
      title: 'Communication Skills That Get You Hired',
      excerpt: 'Essential soft skills that complement your technical expertise in interviews...',
      author: 'Priya Desai',
      date: 'Dec 5, 2024',
      readTime: '5 min read',
      category: 'Soft Skills',
      tags: ['Communication', 'Soft Skills', 'HR'],
      imageColor: 'from-yellow-500/20 to-amber-500/20'
    },
    {
      title: 'Balancing College Studies with Placement Prep',
      excerpt: 'Effective time management strategies for final year students...',
      author: 'Dr. Ananya Sharma',
      date: 'Dec 3, 2024',
      readTime: '6 min read',
      category: 'Study Tips',
      tags: ['Time Management', 'Students', 'Productivity'],
      imageColor: 'from-indigo-500/20 to-blue-500/20'
    }
  ]

  const categories = [
    { name: 'All Posts', count: 24 },
    { name: 'Interview Prep', count: 8 },
    { name: 'Resume Building', count: 5 },
    { name: 'Aptitude', count: 6 },
    { name: 'Study Tips', count: 3 },
    { name: 'Industry Trends', count: 2 }
  ]

  const popularTags = [
    'Technical', 'Interview', 'Coding', 'Resume', 'Freshers', 
    'Quantitative', 'Soft Skills', 'Productivity', 'AI', 'Career'
  ]

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-6">
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skill Sync Blog</h1>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Expert insights, tips, and strategies to help you succeed in your placement journey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Post */}
            <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border mb-8 ${theme === 'dark'
              ? 'bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-white/10'
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-200/60'
              }`}>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <span className={`font-bold ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  Featured Post
                </span>
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                The Ultimate Guide to Campus Placements 2025
              </h2>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Comprehensive strategies covering aptitude tests, technical rounds, HR interviews, 
                and offer negotiation for the upcoming placement season.
              </p>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Team Skill Sync
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Dec 20, 2024
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    12 min read
                  </span>
                </div>
              </div>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transition-colors`}>
                Read Full Article <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post, index) => (
                <div 
                  key={index} 
                  className={`rounded-xl shadow-sm overflow-hidden backdrop-blur-md border transition-transform duration-300 hover:scale-[1.02] ${theme === 'dark'
                    ? 'bg-white/5 border-white/10 hover:border-white/20'
                    : 'bg-white/70 border-gray-200/60 hover:border-gray-300'
                  }`}
                >
                  <div className={`h-40 ${post.imageColor}`}></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme === 'dark'
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-blue-100 text-blue-800'
                      }`}>
                        {post.category}
                      </span>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {post.author}
                        </span>
                      </div>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {post.date}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={`text-xs px-2 py-1 rounded ${theme === 'dark'
                            ? 'bg-white/10 text-gray-300'
                            : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Categories */}
            <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border mb-6 ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
              }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Brain className="w-5 h-5 text-blue-500" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${theme === 'dark'
                      ? 'hover:bg-white/10 text-gray-300 hover:text-white'
                      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark'
                      ? 'bg-white/10 text-gray-400'
                      : 'bg-gray-100 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border mb-6 ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
              }`}>
              <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <Tag className="w-5 h-5 text-green-500" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
              ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10'
              : 'bg-gradient-to-br from-blue-50 to-purple-50 border-gray-200/60'
              }`}>
              <h3 className={`text-lg font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Stay Updated
              </h3>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Get weekly placement tips and latest blog posts delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className={`w-full px-4 py-2.5 rounded-lg border ${theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button className={`w-full py-2.5 rounded-lg font-medium transition-colors ${theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                }`}>
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog