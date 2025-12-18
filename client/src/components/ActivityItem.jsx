function ActivityItem({ title, date, score }) {
  return (
    <div className="bg-primarySoft rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-primary">{title}</h4>
          <p className="text-sm text-muted mt-1">{date}</p>
        </div>
        {score && (
          <div className="text-right">
            <span className="text-lg font-semibold text-primaryAccent">{score}</span>
            <p className="text-xs text-muted">Score</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityItem

