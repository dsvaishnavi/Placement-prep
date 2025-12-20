function StatCard({ icon: Icon, title, value, subtitle, theme }) {
  return (
    <div className={`rounded-lg shadow-sm p-6 border ${theme === 'dark'
        ? 'bg-white/5 border-white/10'
        : 'bg-white/70 border-gray-200/60'
      }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark'
            ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20'
            : 'bg-gradient-to-br from-blue-100 to-green-100'
          }`}>
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
      <h3 className={`text-2xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{value}</h3>
      <p className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{title}</p>
      {subtitle && <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{subtitle}</p>}
    </div>
  )
}

export default StatCard