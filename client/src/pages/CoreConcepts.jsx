import { BookOpen } from 'lucide-react'

function CoreConcepts() {
  const subjects = [
    { title: 'DBMS', status: 'Completed' },
    { title: 'Operating Systems', status: 'In Progress' },
    { title: 'OOPS', status: 'Not Started' },
    { title: 'Computer Networks', status: 'In Progress' },
    { title: 'Data Structures', status: 'In Progress' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700'
      case 'In Progress':
        return 'bg-blue-50 text-blue-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Core Concepts
          </h1>
          <p className="text-slate-600">
            Master the fundamentals that matter in technical interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-navy" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  {subject.title}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    subject.status
                  )}`}
                >
                  {subject.status}
                </span>
                <button className="text-navy hover:text-navy-dark font-medium text-sm">
                  Open →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoreConcepts
