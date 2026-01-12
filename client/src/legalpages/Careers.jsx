import { Briefcase, Target, Users, Award, Clock, MapPin, DollarSign, Zap } from 'lucide-react'

function Careers({ theme }) {
  const jobOpenings = [
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      experience: '2-4 years',
      salary: '₹8-15 LPA',
      description: 'Build beautiful, responsive interfaces for our placement prep platform.'
    },
    {
      title: 'Content Strategist',
      department: 'Content',
      type: 'Full-time',
      location: 'Bangalore',
      experience: '3-5 years',
      salary: '₹10-18 LPA',
      description: 'Create educational content and placement preparation materials.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      type: 'Full-time',
      location: 'Bangalore',
      experience: '4-7 years',
      salary: '₹18-30 LPA',
      description: 'Lead product development and strategy for learning features.'
    },
    {
      title: 'UX Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'Remote',
      experience: '2-5 years',
      salary: '₹9-16 LPA',
      description: 'Design intuitive learning experiences for students.'
    },
    {
      title: 'Backend Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Hybrid',
      experience: '3-6 years',
      salary: '₹12-20 LPA',
      description: 'Build scalable backend systems for our learning platform.'
    },
    {
      title: 'Placement Coach',
      department: 'Education',
      type: 'Contract',
      location: 'Remote',
      experience: '5+ years',
      salary: 'Negotiable',
      description: 'Mentor students and conduct mock interviews.'
    }
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Industry-standard compensation with regular reviews'
    },
    {
      icon: Users,
      title: 'Flexible Work',
      description: 'Remote and hybrid options available'
    },
    {
      icon: Award,
      title: 'Learning Budget',
      description: 'Annual budget for courses and conferences'
    },
    {
      icon: Zap,
      title: 'Fast Growth',
      description: 'Rapid career progression opportunities'
    }
  ]

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/10 to-blue-500/10 mb-6">
            <Briefcase className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Help us revolutionize placement preparation and empower millions of students worldwide
          </p>
        </div>

        {/* Why Join Us */}
        <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border mb-12 ${theme === 'dark'
          ? 'bg-gradient-to-r from-blue-500/5 to-green-500/5 border-white/10'
          : 'bg-gradient-to-r from-blue-50 to-green-50 border-gray-200/60'
          }`}>
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-blue-500" />
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Why Work at Skill Sync?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-white/70'}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-500/20 to-green-500/20'
                  : 'bg-gradient-to-br from-blue-100 to-green-100'
                  }`}>
                  <benefit.icon className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {benefit.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Open Positions
            </h2>
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {jobOpenings.length} positions open
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobOpenings.map((job, index) => (
              <div 
                key={index} 
                className={`rounded-xl shadow-sm p-6 backdrop-blur-md border transition-transform duration-300 hover:scale-[1.02] ${theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-white/70 border-gray-200/60 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {job.title}
                    </h3>
                    <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                      {job.department}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${theme === 'dark'
                    ? job.type === 'Full-time' ? 'bg-green-500/20 text-green-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    : job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.type}
                  </span>
                </div>

                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {job.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {job.salary}
                    </span>
                  </div>
                </div>

                <button className={`w-full py-2.5 rounded-lg font-medium transition-colors ${theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white'
                }`}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Our Hiring Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${theme === 'dark'
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-blue-100 text-blue-600'
              }`}>
                1
              </div>
              <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Application Review
              </h4>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                We review your resume and portfolio
              </p>
            </div>
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${theme === 'dark'
                ? 'bg-green-500/20 text-green-300'
                : 'bg-green-100 text-green-600'
              }`}>
                2
              </div>
              <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Initial Screening
              </h4>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                30-minute call with our talent team
              </p>
            </div>
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${theme === 'dark'
                ? 'bg-purple-500/20 text-purple-300'
                : 'bg-purple-100 text-purple-600'
              }`}>
                3
              </div>
              <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Technical Assessment
              </h4>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Skills evaluation and case study
              </p>
            </div>
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${theme === 'dark'
                ? 'bg-yellow-500/20 text-yellow-300'
                : 'bg-yellow-100 text-yellow-600'
              }`}>
                4
              </div>
              <h4 className={`font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Final Interview
              </h4>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Meet the team and leadership
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Careers