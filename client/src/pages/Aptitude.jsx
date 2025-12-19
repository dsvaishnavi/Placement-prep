import { Play } from 'lucide-react'

function Aptitude() {
  const topics = [
    {
      title: 'Quantitative',
      description: 'Algebra, arithmetic, data interpretation, and geometry problems.',
      difficulty: 'Intermediate',
    },
    {
      title: 'Logical Reasoning',
      description: 'Puzzles, patterns, arrangements, and analytical reasoning questions.',
      difficulty: 'Easy to Intermediate',
    },
    {
      title: 'Verbal Ability',
      description: 'Reading comprehension, grammar, and vocabulary practice tests.',
      difficulty: 'Intermediate',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Aptitude Exam
          </h1>
          <p className="text-muted">
            Strengthen your quantitative, logical, and verbal skills with practice tests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="bg-primarySoft rounded-lg shadow-sm p-6 border border-border hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-primary mb-2">
                  {topic.title}
                </h3>
                <span className="inline-block px-3 py-1 bg-primaryAccent/10 text-primaryAccent text-xs font-medium rounded-full">
                  {topic.difficulty}
                </span>
              </div>
              <p className="text-muted text-sm mb-6">{topic.description}</p>
              <button className="w-full bg-primary text-white py-2.5 px-4 rounded-lg font-medium hover:bg-primaryAccent transition-colors flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Aptitude
