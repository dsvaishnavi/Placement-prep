import { LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Snowfall from 'react-snowfall'
import { useAuth } from '../context/AuthContext'

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

function Login({ theme }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      setSuccess(result.message);
      // Navigation will happen automatically due to useEffect above
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

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
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Login</h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Access your dashboard to continue your placement preparation journey.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-green-500 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className={`mt-6 text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className={`font-medium transition-colors ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                Sign up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login;