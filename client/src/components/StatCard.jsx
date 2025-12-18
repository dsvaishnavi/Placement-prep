function StatCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-navy" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
      <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </div>
  )
}

export default StatCard

