import { LogIn } from 'lucide-react'
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react'
import Snowfall from 'react-snowfall';

// Mouse Follower Pink Circle
const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const circleRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      setPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={circleRef}
      className="fixed pointer-events-none z-30 mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.1s ease-out, top 0.1s ease-out',
        willChange: 'transform'
      }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-sm" />
      <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-pink-400/40 to-purple-400/40 blur-sm" />
      <div className="absolute inset-0 w-4 h-4 rounded-full bg-pink-400/60 blur-sm" />
    </div>
  )
}

const Signup = ({ theme }) => {
  return (
    <>
       <Snowfall 
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1
        }}
        snowflakeCount={100}
        color={theme === 'dark' ? '#ffffff' : '#cbd5e1'}
        speed={[0.5, 1.5]}
        wind={[-0.5, 0.5]}
        radius={[0.5, 3]}
      />
      <MouseFollower />
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
        : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
        }`}>
        <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
              <LogIn className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Create your account</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Start your placement preparation journey
            </p>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4">
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Enter OTP
              </label>
              <input
                type="password"
                placeholder="Enter OTP"
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className={`w-full mt-2 py-2 rounded-md font-medium transition-colors ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Sign up
            </button>
          </form>

          {/* Footer */}
          <p className={`mt-6 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Already have an account?
            <Link
              to="/login"
              className={`ml-1 font-medium transition-colors ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;