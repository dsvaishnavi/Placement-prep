import { LogIn } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from 'react'
import Snowfall from 'react-snowfall';
import { showToast } from '../utils/toast';
import { useAuth } from '../context/AuthContext';

// Mouse Follower Pink Circle
const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const circleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={circleRef}
      className="fixed pointer-events-none z-30 mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        transition: "left 0.1s ease-out, top 0.1s ease-out",
        willChange: "transform",
      }}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-sm" />
      <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-pink-400/40 to-purple-400/40 blur-sm" />
      <div className="absolute inset-0 w-4 h-4 rounded-full bg-pink-400/60 blur-sm" />
    </div>
  );
};

const Signup = ({ theme }) => {
  const [step, setStep] = useState(1); // 1: Form, 2: OTP Verification
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { sendOTP, verifyOTP, isAuthenticated } = useAuth();
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
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      showToast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      showToast.error('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const result = await sendOTP(formData.name, formData.email);
    
    if (result.success) {
      showToast.success(result.message);
      setStep(2); // Move to OTP verification step
    } else {
      showToast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.otp || formData.otp.length !== 6) {
      showToast.error('Please enter a valid 6-digit OTP');
      setLoading(false);
      return;
    }

    const result = await verifyOTP(formData.email, formData.otp, formData.password);
    
    if (result.success) {
      showToast.success(result.message);
      // Navigation will happen automatically due to useEffect above
    } else {
      showToast.error(result.message);
    }
    
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setLoading(true);

    const result = await sendOTP(formData.name, formData.email);
    
    if (result.success) {
      showToast.success('OTP resent successfully');
    } else {
      showToast.error(result.message);
    }
    
    setLoading(false);
  };

  return (
    <>
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1,
        }}
        snowflakeCount={100}
        color={theme === "dark" ? "#ffffff" : "#cbd5e1"}
        speed={[0.5, 1.5]}
        wind={[-0.5, 0.5]}
        radius={[0.5, 3]}
      />
      <MouseFollower />
      <div className={`min-h-screen flex items-center justify-center pt-16 px-4 ${theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
        : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
        }`}>
        <div className={`rounded-xl shadow-sm p-8 backdrop-blur-md border w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl ${theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white/70 border-gray-200/60'
          }`}>
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
              <LogIn className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {step === 1 ? 'Create your account' : 'Verify your email'}
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {step === 1 ? 'Start your placement preparation journey' : `Enter the 6-digit OTP sent to ${formData.email}`}
            </p>
          </div>

          {step === 1 ? (
            /* Step 1: Registration Form */
            <form onSubmit={handleSendOTP} className="mt-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password (min 6 characters)"
                  className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm password"
                  className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-2 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            /* Step 2: OTP Verification */
            <form onSubmit={handleVerifyOTP} className="mt-6 space-y-4">
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Enter 6-digit OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  maxLength="6"
                  placeholder="123456"
                  className={`mt-1 w-full rounded-md border px-3 py-2 text-sm text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:border-transparent ${theme === 'dark' ? 'border-white/20 bg-white/5 text-white focus:ring-blue-400' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'}`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-2 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className={`text-sm transition-colors disabled:opacity-50 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  Resend OTP
                </button>
                <span className={`mx-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>|</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`text-sm transition-colors ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                >
                  Change Email
                </button>
              </div>
            </form>
          )}

          {/* Footer */}
          <p
            className={`mt-6 text-center text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Already have an account?
            <Link
              to="/login"
              className={`ml-1 font-medium transition-colors ${
                theme === "dark"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-800"
              }`}
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
