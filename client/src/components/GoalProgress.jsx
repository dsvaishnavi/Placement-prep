function GoalProgress({ title, progress, percentage }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-primary">{title}</h4>
        <span className="text-sm font-semibold text-primaryAccent">{percentage}%</span>
      </div>
      <div className="w-full bg-primarySoft rounded-full h-2.5">
        <div
          className="bg-primaryAccent h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default GoalProgress

