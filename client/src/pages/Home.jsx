import { Trophy, Target, Clock } from 'lucide-react'
import StatCard from '../components/StatCard'
import ActivityItem from '../components/ActivityItem'
import GoalProgress from '../components/GoalProgress'

function Home() {
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-muted">
            Track your placement prep progress and keep improving.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Lower Section - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-primarySoft rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-xl font-bold text-primary mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>

          {/* Your Goals */}
          <div className="bg-primarySoft rounded-lg shadow-sm p-6 border border-border">
            <h2 className="text-xl font-bold text-primary mb-4">
              Your Goals
            </h2>
            <div>
              {goals.map((goal, index) => (
                <GoalProgress key={index} {...goal} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
