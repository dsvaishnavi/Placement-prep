import { Trophy, Target, Clock } from 'lucide-react'
import StatCard from '../components/StatCard'
import ActivityItem from '../components/ActivityItem'
import GoalProgress from '../components/GoalProgress'
import Snowfall from 'react-snowfall'
function Home({ theme }) {
  // Dummy data
  const stats = [
    {
      icon: Trophy,
      title: 'Tests Completed',
      value: '24',
      subtitle: 'This month',
    },
    {
      icon: Target,
      title: 'Average Score',
      value: '82%',
      subtitle: 'Across all tests',
    },
    {
      icon: Clock,
      title: 'Study Hours',
      value: '68 hrs',
      subtitle: 'Tracked sessions',
    },
  ]

  const recentActivities = [
    { title: 'Quantitative Aptitude', date: 'Today', score: '85%' },
    { title: 'DBMS Fundamentals', date: 'Yesterday', score: '78%' },
    { title: 'Logical Reasoning', date: '2 days ago', score: '92%' },
  ]

  const goals = [
    { title: 'Complete 30 aptitude tests', progress: 80, percentage: 80 },
    { title: 'Master all core concepts', progress: 60, percentage: 60 },
    { title: 'Achieve 85% average score', progress: 96, percentage: 96 },
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
        snowflakeCount={100 }
        color={theme === 'dark' ? '#ffffff' : '#b5b5b5'}
        speed={[0.5, 1.5]}
        wind={[-0.5, 0.5]}
        radius={[0.5, 3]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, Alex! 👋
          </h1>
          <p className={`text-muted ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your placement prep progress and keep improving.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`rounded-xl shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
              ? 'bg-white/5 border-white/10'
              : 'bg-white/70 border-gray-200/60'
              }`}>
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4 ${theme === 'dark'
                ? 'bg-gradient-to-br from-blue-500/10 to-green-500/10'
                : 'bg-gradient-to-br from-blue-100 to-green-100'
                }`}>
                <stat.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {stat.title}
              </h3>
              <p className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                {stat.value}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Lower Section - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className={`rounded-lg shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg backdrop-blur-md ${theme === 'dark'
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white/70 border border-gray-200/60'
                  }`}>
                  <div>
                    <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {activity.title}
                    </h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {activity.date}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${activity.score >= 80 ? 'bg-green-100 text-green-800' :
                    activity.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                    {activity.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Your Goals */}
          <div className={`rounded-lg shadow-sm p-6 backdrop-blur-md border ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Your Goals
            </h2>
            <div>
              {goals.map((goal, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {goal.title}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {goal.percentage}%
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
