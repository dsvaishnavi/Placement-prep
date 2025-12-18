function ActivityItem({ title, date, score }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-slate-800">{title}</h4>
          <p className="text-sm text-slate-500 mt-1">{date}</p>
        </div>
        {score && (
          <div className="text-right">
            <span className="text-lg font-semibold text-navy">{score}</span>
            <p className="text-xs text-slate-400">Score</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityItem

