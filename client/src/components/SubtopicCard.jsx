import { FileText, BookOpen } from 'lucide-react'

function SubtopicCard({ name, type = 'Concepts', marks = '20 Marks', onTakeAssessment }) {
  return (
    <div className="group bg-surface border border-border rounded-lg p-5 hover:border-primaryAccent hover:shadow-md transition-all duration-200">
      {/* Header with name and label */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold text-primary text-base leading-tight flex-1">
            {name}
          </h4>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primarySoft text-primary text-xs font-medium whitespace-nowrap">
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
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
        <span className="text-sm font-medium text-muted">{marks}</span>
        <button
          onClick={onTakeAssessment}
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primaryAccent active:scale-95 transition-all duration-200 whitespace-nowrap"
        >
          Take Assessment
        </button>
      </div>
    </div>
  )
}

export default SubtopicCard

