import { FileText, BookOpen } from 'lucide-react'

function SubtopicCard({ name, type = 'Concepts', marks = '20 Marks', onTakeAssessment, theme }) {
  return (
    <div className={`group rounded-lg p-5 hover:shadow-md transition-all duration-200 backdrop-blur-md ${theme === 'dark'
      ? 'bg-white/5 border border-white/10 hover:border-blue-400/50'
      : 'bg-white/70 border border-gray-200/60 hover:border-blue-500/50'
      }`}>
      {/* Header with name and label */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className={`font-semibold text-base leading-tight flex-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h4>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${theme === 'dark'
            ? 'bg-blue-500/20 text-blue-400'
            : 'bg-blue-100 text-blue-600'
            }`}>
            {type === 'Formulas' ? (
              <FileText className="w-3 h-3" />
            ) : (
              <BookOpen className="w-3 h-3" />
            )}
            {type}
          </span>
        </div>
      </div>

      {/* Assessment Info and Button */}
      <div className={`flex items-center justify-between gap-3 pt-3 ${theme === 'dark' ? 'border-t border-white/10' : 'border-t border-gray-200/60'}`}>
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{marks}</span>
        <button
          onClick={onTakeAssessment}
          className={`px-4 py-2 text-sm font-medium rounded-lg active:scale-95 transition-all duration-200 whitespace-nowrap ${theme === 'dark'
            ? 'bg-blue-600 text-white hover:bg-blue-500'
            : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          Take Assessment
        </button>
      </div>
    </div>
  )
}

export default SubtopicCard

