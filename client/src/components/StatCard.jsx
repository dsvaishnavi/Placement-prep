function StatCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="bg-primarySoft rounded-lg shadow-sm p-6 border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-full bg-primaryAccent flex items-center justify-center">
          <Icon className="w-6 h-6 text-surface" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-primary mb-1">{value}</h3>
      <p className="text-sm font-medium text-muted mb-1">{title}</p>
      {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
    </div>
  )
}

export default StatCard