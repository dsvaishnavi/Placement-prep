import { Users, Target, Award, Rocket, Heart, TrendingUp, GraduationCap, Globe } from 'lucide-react'

function AboutUs({ theme }) {
  const teamMembers = [
    { name: 'Dr. Ananya Sharma', role: 'Education Director', expertise: 'Ph.D. in Educational Technology' },
    { name: 'Rohan Mehra', role: 'CTO', expertise: 'Former Google Tech Lead' },
    { name: 'Priya Desai', role: 'Product Lead', expertise: 'Ex-Amazon Product Manager' },
    { name: 'Karan Singh', role: 'Content Head', expertise: 'IIT Delhi Alumni' }
  ]

  const milestones = [
    { year: '2022', event: 'Skill Sync Founded', description: 'Started with vision to revolutionize placement prep' },
    { year: '2023', event: '10K+ Users', description: 'Reached first major milestone of active learners' },
    { year: '2024', event: 'AI Integration', description: 'Launched AI-powered resume analyzer and mock interviews' },
    { year: '2025', event: 'Global Expansion', description: 'Expanding to international markets' }
  ]

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className={`text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-green-500/10 mb-6">
            <Rocket className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Skill Sync</h1>
          <p className={`text-xl max-w-3xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Empowering the next generation of professionals through intelligent placement preparation
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-green-500" />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h2>
            </div>
            <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              To democratize access to quality placement preparation and bridge the gap between 
              academic education and industry requirements.
            </p>
            <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-2">
                <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Make premium placement prep accessible to all students</span>
              </li>
              <li className="flex items-start gap-2">
                <GraduationCap className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Provide personalized learning paths based on individual strengths</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Track and optimize student progress with data-driven insights</span>
              </li>
            </ul>
          </div>

          <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border ${theme === 'dark'
            ? 'bg-white/5 border-white/10'
            : 'bg-white/70 border-gray-200/60'
            }`}>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-blue-500" />
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Vision
              </h2>
            </div>
            <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              To become the world's most trusted platform for career preparation, helping millions 
              of students achieve their professional dreams.
            </p>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <p className={`italic ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
                "We believe every student deserves equal opportunity to succeed in their career journey."
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border mb-12 ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          <h2 className={`text-3xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-green-500 transform -translate-x-1/2"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-full border-4 ${theme === 'dark' ? 'bg-gray-900 border-blue-500' : 'bg-white border-blue-500'} z-10`}></div>
                  <div className={`ml-4 md:ml-8 md:w-5/12 p-6 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className={`font-bold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {milestone.event}
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-4">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className={`text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Meet Our Team
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Experts dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`rounded-xl p-6 text-center backdrop-blur-md border transition-transform duration-300 hover:scale-105 ${theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:border-white/20'
                  : 'bg-white/70 border-gray-200/60 hover:border-gray-300'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {member.name}
                </h3>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {member.role}
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {member.expertise}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                50K+
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Students Empowered
              </p>
            </div>
            <div className="text-center">
              <p className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                95%
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Success Rate
              </p>
            </div>
            <div className="text-center">
              <p className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                200+
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Partner Companies
              </p>
            </div>
            <div className="text-center">
              <p className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                10K+
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Mock Tests
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs