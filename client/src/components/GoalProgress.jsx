function GoalProgress({ title, progress, percentage, theme }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
        <span className="text-sm font-semibold text-green-400">{percentage}%</span>
      </div>
      <div className={`w-full rounded-full h-2.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default GoalProgress

