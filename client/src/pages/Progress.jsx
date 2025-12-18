import GoalProgress from '../components/GoalProgress'

function Progress() {
  const progressData = [
    { title: 'Aptitude Performance', progress: 76, percentage: 76 },
    { title: 'Core Subject Completion', progress: 58, percentage: 58 },
    { title: 'Weekly Study Target', progress: 80, percentage: 80 },
  ]

  // Simple bar chart data
  const weeklyScores = [64, 72, 75, 70, 78]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Progress</h1>
          <p className="text-slate-600">
            Visualize your preparation journey and track your improvements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Aptitude Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Aptitude Performance
            </h2>
            <div className="flex items-end justify-between gap-3 h-48">
              {weeklyScores.map((score, index) => (
                <div key={index} className="flex-1 flex flex-col items-center h-full">
                  <div className="w-full bg-gray-200 rounded-t-lg relative h-full flex items-end">
                    <div
                      className="w-full bg-navy rounded-t-lg transition-all duration-500"
                      style={{ height: `${score}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-500 mt-2">W{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Subject Completion */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Core Subject Completion
            </h2>
            <div className="space-y-4">
              {progressData.map((item, index) => (
                <GoalProgress key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress
