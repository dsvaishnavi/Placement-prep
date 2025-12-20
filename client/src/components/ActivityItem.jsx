function ActivityItem({ title, date, score, theme }) {
  return (
    <div className={`rounded-lg p-4 border ${theme === 'dark'
        ? 'bg-white/5 border-white/10'
        : 'bg-white/50 border-gray-200/50'
      }`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{date}</p>
        </div>
        {score && (
          <div className="text-right">
            <span className={`text-lg font-semibold text-green-400`}>{score}</span>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Score</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityItem

