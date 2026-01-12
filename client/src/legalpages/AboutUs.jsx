import { Users, Target, Award, Rocket, Heart, TrendingUp, GraduationCap, Globe, Linkedin, Github, Twitter } from 'lucide-react'

function AboutUs({ theme }) {
  const teamMembers = [
    { 
      name: 'Vaishnavi Dhawade', 
      role: 'Developer', 
      expertise: 'Expert In Mern Development',
      image: '/assets/vaishnavi.png',
      linkedin: '#',
      github: '#',
      twitter: '#'
    },
    { 
      name: 'Satyajeet Desai', 
      role: 'Senior Developer', 
      expertise: 'Expert In Mern Development',
      image: '/assets/satyajeet.png',
      linkedin: '#',
      github: '#',
      twitter: '#'
    },
    { 
      name: 'Susmit Naik', 
      role: 'UI/UX Designer', 
      expertise: 'Managing the UI/UX',
      image: '/assets/susmit.png',
      linkedin: '#',
      github: '#',
      twitter: '#'
    },
  ]

  const milestones = [
    { year: '2023', event: 'Skill Sync Founded', description: 'Started with vision to revolutionize placement prep' },
    { year: '2024', event: '10K+ Users', description: 'Reached first major milestone of active learners' },
    { year: '2025', event: 'AI Integration', description: 'Launched AI-powered resume analyzer and mock interviews' },
  ]

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className={`text-center mb-12 animate-fadeIn ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-green-500/10 mb-6 animate-pulse-slow">
            <Rocket className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideUp">About Skill Sync</h1>
          <p className={`text-xl max-w-3xl mx-auto animate-slideUp ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Empowering the next generation of professionals through intelligent placement preparation
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border animate-slideInLeft ${theme === 'dark'
            ? 'bg-white/5 border-white/10 hover:border-blue-500/30'
            : 'bg-white/70 border-gray-200/60 hover:border-blue-500/30'
            } transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-green-500/10' : 'bg-green-100'} animate-bounce-slow`}>
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h2>
            </div>
            <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              To democratize access to quality placement preparation and bridge the gap between 
              academic education and industry requirements.
            </p>
            <ul className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-2 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0 animate-pulse" />
                <span>Make premium placement prep accessible to all students</span>
              </li>
              <li className="flex items-start gap-2 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <GraduationCap className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0 animate-pulse" />
                <span>Provide personalized learning paths based on individual strengths</span>
              </li>
              <li className="flex items-start gap-2 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 animate-pulse" />
                <span>Track and optimize student progress with data-driven insights</span>
              </li>
            </ul>
          </div>

          <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border animate-slideInRight ${theme === 'dark'
            ? 'bg-white/5 border-white/10 hover:border-blue-500/30'
            : 'bg-white/70 border-gray-200/60 hover:border-blue-500/30'
            } transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-100'} animate-bounce-slow`}>
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Vision
              </h2>
            </div>
            <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              To become the world's most trusted platform for career preparation, helping millions 
              of students achieve their professional dreams.
            </p>
            <div className={`p-4 rounded-lg border-l-4 ${theme === 'dark' 
              ? 'bg-blue-500/10 border-blue-500' 
              : 'bg-blue-50 border-blue-500'
            } animate-pulse-slow`}>
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
          <h2 className={`text-3xl font-bold mb-6 text-center animate-fadeIn ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Our Journey
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-green-500 transform -translate-x-1/2 animate-glow"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center animate-slideInLeft ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-8 h-8 rounded-full border-4 ${theme === 'dark' ? 'bg-gray-900 border-blue-500' : 'bg-white border-blue-500'} z-10 animate-ping-slow`}></div>
                  <div className={`ml-4 md:ml-8 md:w-5/12 p-6 rounded-lg transform transition-all duration-300 hover:scale-105 ${theme === 'dark' 
                    ? 'bg-white/5 hover:bg-white/10' 
                    : 'bg-gray-50 hover:bg-gray-100'
                    }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-5 h-5 text-yellow-500 animate-spin-slow" />
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
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-4 animate-pulse-slow">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className={`text-3xl font-bold mb-3 animate-slideUp ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Meet Our Team
            </h2>
            <p className={`text-lg animate-slideUp ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Experts dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className={`group relative rounded-2xl p-8 backdrop-blur-md border overflow-hidden animate-fadeIn ${theme === 'dark'
                  ? 'bg-white/5 border-white/10 hover:border-blue-500/50'
                  : 'bg-white/70 border-gray-200/60 hover:border-blue-500/50'
                } transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === 'dark'
                  ? 'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-green-500/10'
                  : 'bg-gradient-to-br from-blue-50 via-purple-50 to-green-50'
                }`}></div>
                
                {/* Profile Image */}
                <div className="relative z-10 mb-6">
                  <div className="w-32 h-32 rounded-full mx-auto overflow-hidden border-4 transition-all duration-500 group-hover:scale-110 group-hover:border-blue-500/50 animate-float">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${member.name}&background=3B82F6&color=fff&size=128`;
                        }}
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                        <Users className="w-16 h-16 text-blue-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Team Member Info */}
                <div className="relative z-10 text-center">
                  <h3 className={`text-xl font-bold mb-2 transition-all duration-300 group-hover:text-blue-500 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3 transition-all duration-300 group-hover:scale-110 ${theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-300 group-hover:bg-blue-500/30'
                    : 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
                  }`}>
                    {member.role}
                  </div>
                  <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {member.expertise}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <a href={member.linkedin} className={`p-2 rounded-full transition-all duration-300 hover:scale-125 ${theme === 'dark'
                      ? 'bg-white/10 hover:bg-blue-500 text-gray-400 hover:text-white'
                      : 'bg-gray-100 hover:bg-blue-500 text-gray-600 hover:text-white'
                    }`}>
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.github} className={`p-2 rounded-full transition-all duration-300 hover:scale-125 ${theme === 'dark'
                      ? 'bg-white/10 hover:bg-gray-800 text-gray-400 hover:text-white'
                      : 'bg-gray-100 hover:bg-gray-800 text-gray-600 hover:text-white'
                    }`}>
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={member.twitter} className={`p-2 rounded-full transition-all duration-300 hover:scale-125 ${theme === 'dark'
                      ? 'bg-white/10 hover:bg-blue-400 text-gray-400 hover:text-white'
                      : 'bg-gray-100 hover:bg-blue-400 text-gray-600 hover:text-white'
                    }`}>
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Hover Effect Ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border animate-fadeIn ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '50K+', label: 'Students Empowered', color: 'text-blue-500' },
              { value: '95%', label: 'Success Rate', color: 'text-green-500' },
              { value: '200+', label: 'Partner Companies', color: 'text-purple-500' },
              { value: '10K+', label: 'Mock Tests', color: 'text-yellow-500' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center transform transition-all duration-300 hover:scale-110 hover:-translate-y-2"
              >
                <p className={`text-4xl font-bold mb-2 animate-count ${stat.color}`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add custom animations to your index.css */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
        }
        @keyframes count {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 2s ease-in-out infinite; }
        .animate-ping-slow { animation: ping 1.5s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spinSlow 8s linear infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-count { animation: count 0.8s ease-out; }
        
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default AboutUs