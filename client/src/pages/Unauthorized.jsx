import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, ArrowLeft, Home } from 'lucide-react';

const Unauthorized = ({ theme = 'light' }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isDark = theme === 'dark';

  const themeClasses = {
    bg: isDark ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white',
    cardBg: isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60',
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
    },
    button: {
      primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90',
      secondary: isDark ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleGoHome = () => {
    if (user) {
      // Navigate based on user role
      switch (user.role) {
        case 'admin':
        case 'content-manager':
          navigate('/home'); // Both should go to home first, then can access their panels
          break;
        case 'user':
        default:
          navigate('/home');
          break;
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${themeClasses.bg}`}>
      <div className={`max-w-md w-full rounded-xl border p-8 text-center ${themeClasses.cardBg}`}>
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-2xl font-bold mb-4 ${themeClasses.text.primary}`}>
          Access Denied
        </h1>

        {/* Message */}
        <p className={`mb-6 ${themeClasses.text.secondary}`}>
          You don't have permission to access this page. Your current role ({user?.role || 'unknown'}) doesn't have the required privileges.
        </p>

        {/* Role Information */}
        {user && (
          <div className={`mb-6 p-4 rounded-lg border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <p className={`text-sm ${themeClasses.text.secondary} mb-2`}>Current User:</p>
            <p className={`font-medium ${themeClasses.text.primary}`}>{user.name}</p>
            <p className={`text-sm ${themeClasses.text.secondary}`}>Role: {user.role}</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${themeClasses.button.primary}`}
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </button>

          <button
            onClick={handleGoBack}
            className={`w-full px-4 py-2 rounded-lg transition-colors border flex items-center justify-center gap-2 ${themeClasses.button.secondary}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          {user && (
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full px-4 py-2 rounded-lg transition-colors text-red-600 hover:bg-red-50 border border-red-200"
            >
              Logout & Login as Different User
            </button>
          )}
        </div>

        {/* Help Text */}
        <p className={`mt-6 text-xs ${themeClasses.text.secondary}`}>
          If you believe this is an error, please contact your administrator.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;