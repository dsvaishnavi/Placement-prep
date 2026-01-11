import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Users, 
  BookOpen, 
  HelpCircle, 
  BarChart3,
  Shield,
  Edit
} from 'lucide-react';

const RoleBasedNavigation = ({ theme = 'light' }) => {
  const { user, isAdmin, isContentManager, hasContentAccess } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const themeClasses = {
    cardBg: isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-gray-200/60',
    text: {
      primary: isDark ? 'text-white' : 'text-gray-900',
      secondary: isDark ? 'text-gray-400' : 'text-gray-600',
    },
    button: {
      primary: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90',
      secondary: isDark ? 'border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
    },
    iconBg: {
      blue: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
      purple: isDark ? 'bg-purple-500/20' : 'bg-purple-100',
      green: isDark ? 'bg-green-500/20' : 'bg-green-100',
    }
  };

  // Define navigation options based on roles
  const getNavigationOptions = () => {
    const options = [];

    // Admin gets full access
    if (isAdmin) {
      options.push({
        title: 'Admin Panel',
        description: 'Full system administration',
        icon: Shield,
        color: 'purple',
        path: '/admin',
        features: ['User Management', 'Content Management', 'System Settings', 'Analytics']
      });
    }

    // Content Manager gets limited access
    if (isContentManager) {
      options.push({
        title: 'Content Management',
        description: 'Manage educational content',
        icon: Edit,
        color: 'blue',
        path: '/content-management',
        features: ['Aptitude Questions', 'Core Concepts', 'Content Analytics']
      });
    }

    // All users get access to main features
    options.push({
      title: 'Learning Dashboard',
      description: 'Your learning progress',
      icon: BarChart3,
      color: 'green',
      path: '/home',
      features: ['Progress Tracking', 'Practice Tests', 'Performance Analytics']
    });

    return options;
  };

  const navigationOptions = getNavigationOptions();

  if (!user) return null;

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className={`text-xl font-bold ${themeClasses.text.primary}`}>
          Welcome, {user.name}
        </h2>
        <p className={`text-sm ${themeClasses.text.secondary}`}>
          Role: {user.role === 'content-manager' ? 'Content Manager' : 
                 user.role === 'admin' ? 'Administrator' : 'User'}
        </p>
      </div>

      <div className="grid gap-4">
        {navigationOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <div
              key={index}
              className={`rounded-xl border p-6 cursor-pointer transition-all hover:shadow-lg ${themeClasses.cardBg}`}
              onClick={() => navigate(option.path)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${themeClasses.iconBg[option.color]}`}>
                  <Icon className={`w-6 h-6 ${
                    option.color === 'blue' ? 'text-blue-500' :
                    option.color === 'purple' ? 'text-purple-500' :
                    'text-green-500'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 ${themeClasses.text.primary}`}>
                    {option.title}
                  </h3>
                  <p className={`text-sm mb-3 ${themeClasses.text.secondary}`}>
                    {option.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {option.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-xs ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Information */}
      <div className={`rounded-xl border p-4 ${themeClasses.cardBg}`}>
        <h4 className={`text-sm font-medium mb-2 ${themeClasses.text.primary}`}>
          Your Access Level
        </h4>
        <div className="space-y-2 text-sm">
          {isAdmin && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className={themeClasses.text.secondary}>Full administrative access</span>
            </div>
          )}
          {isContentManager && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className={themeClasses.text.secondary}>Content management access</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className={themeClasses.text.secondary}>Learning platform access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedNavigation;