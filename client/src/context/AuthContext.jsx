import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { showToast } from '../utils/toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialize user state immediately if we have valid session data
  const initializeUserState = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      // Quick synchronous validation
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        const now = new Date().getTime();
        const sessionAge = now - parseInt(loginTime);
        const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000; // 7 days
        
        // If session is still valid, initialize user immediately
        if (sessionAge < SESSION_TIMEOUT) {
          try {
            return JSON.parse(userData);
          } catch (e) {
            console.error('Error parsing user data:', e);
          }
        }
      }
    }
    return null;
  };

  const [user, setUser] = useState(initializeUserState());
  const [loading, setLoading] = useState(!user); // Start with false if we have user data
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // Session management
  const sessionTimeoutRef = useRef(null);
  const activityTimeoutRef = useRef(null);
  const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000; // 7 days
  const ACTIVITY_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours of inactivity

  // Clear all timeouts
  const clearTimeouts = () => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
      sessionTimeoutRef.current = null;
    }
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
      activityTimeoutRef.current = null;
    }
  };

  // Logout function
  const logout = (reason = 'manual') => {
    clearTimeouts();
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('lastActivityTime');
    
    if (reason === 'timeout') {
      showToast.error('Your session has expired after 7 days. Please log in again.');
    } else if (reason === 'inactivity') {
      showToast.warning('You have been logged out due to inactivity (2 hours).');
    }
  };

  // Update last activity time
  const updateLastActivity = () => {
    const now = new Date().getTime();
    localStorage.setItem('lastActivityTime', now.toString());
  };

  // Start session timeout with improved activity tracking
  const startSessionTimeout = () => {
    clearTimeouts();
    
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) return;

    const now = new Date().getTime();
    const sessionAge = now - parseInt(loginTime);
    const remainingSessionTime = SESSION_TIMEOUT - sessionAge;

    // Only set session timeout if there's time remaining
    if (remainingSessionTime > 0) {
      sessionTimeoutRef.current = setTimeout(() => {
        logout('timeout');
      }, remainingSessionTime);
    } else {
      // Session already expired
      logout('timeout');
      return;
    }

    // Activity timeout management
    const resetActivityTimeout = () => {
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      
      // Update activity time
      updateLastActivity();
      
      activityTimeoutRef.current = setTimeout(() => {
        logout('inactivity');
      }, ACTIVITY_TIMEOUT);
    };

    // Check if we need to restore activity timeout based on last activity
    const lastActivityTime = localStorage.getItem('lastActivityTime');
    if (lastActivityTime) {
      const timeSinceActivity = now - parseInt(lastActivityTime);
      if (timeSinceActivity >= ACTIVITY_TIMEOUT) {
        // User has been inactive too long
        logout('inactivity');
        return;
      } else {
        // Set timeout for remaining time
        const remainingActivityTime = ACTIVITY_TIMEOUT - timeSinceActivity;
        activityTimeoutRef.current = setTimeout(() => {
          logout('inactivity');
        }, remainingActivityTime);
      }
    } else {
      // No previous activity recorded, start fresh
      resetActivityTimeout();
    }

    // Reset activity timeout on user interaction
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const resetTimeout = () => resetActivityTimeout();
    
    events.forEach(event => {
      document.addEventListener(event, resetTimeout, true);
    });

    // Cleanup function
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout, true);
      });
    };
  };

  // Check if session should continue (improved logic)
  const shouldContinueSession = () => {
    const loginTime = localStorage.getItem('loginTime');
    const lastActivityTime = localStorage.getItem('lastActivityTime');
    
    if (!loginTime) {
      console.log('No login time found');
      return false;
    }
    
    const now = new Date().getTime();
    const sessionAge = now - parseInt(loginTime);
    
    // Check if session hasn't expired (7 days)
    if (sessionAge >= SESSION_TIMEOUT) {
      console.log('Session expired due to age');
      return false;
    }
    
    // If we have last activity time, check if user was recently active
    if (lastActivityTime) {
      const timeSinceActivity = now - parseInt(lastActivityTime);
      if (timeSinceActivity >= ACTIVITY_TIMEOUT) {
        console.log('Session expired due to inactivity');
        return false;
      }
    }
    
    console.log('Session should continue');
    return true;
  };

  useEffect(() => {
    console.log('AuthContext: Initializing with token:', !!token, 'User already set:', !!user);
    
    // If user is already set from initialization, just start session management
    if (user && token) {
      console.log('AuthContext: User already initialized, starting session management');
      updateLastActivity();
      const cleanupActivity = startSessionTimeout();
      setLoading(false);
      return cleanupActivity;
    }
    
    // Check if user is logged in on app start
    if (token) {
      const userData = localStorage.getItem('user');
      console.log('AuthContext: Found user data:', !!userData);
      
      if (userData && shouldContinueSession()) {
        console.log('AuthContext: Continuing session for user');
        setUser(JSON.parse(userData));
        setLoading(false); // Set loading to false immediately when session is valid
        
        // Update activity time on page load
        updateLastActivity();
        
        const cleanupActivity = startSessionTimeout();
        
        // Cleanup on unmount
        return cleanupActivity;
      } else {
        // Session expired or shouldn't continue, clear everything
        console.log('AuthContext: Session should not continue, logging out');
        logout('timeout');
        setLoading(false); // Set loading to false after logout
      }
    } else {
      console.log('AuthContext: No token found');
      setLoading(false); // Set loading to false when no token
    }
  }, [token]);

  // Periodic session validation (every 5 minutes)
  useEffect(() => {
    if (!user) return;

    const sessionCheckInterval = setInterval(() => {
      if (!shouldContinueSession()) {
        const loginTime = localStorage.getItem('loginTime');
        const lastActivityTime = localStorage.getItem('lastActivityTime');
        
        if (loginTime) {
          const sessionAge = new Date().getTime() - parseInt(loginTime);
          if (sessionAge >= SESSION_TIMEOUT) {
            logout('timeout');
            return;
          }
        }
        
        if (lastActivityTime) {
          const timeSinceActivity = new Date().getTime() - parseInt(lastActivityTime);
          if (timeSinceActivity >= ACTIVITY_TIMEOUT) {
            logout('inactivity');
            return;
          }
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(sessionCheckInterval);
  }, [user]);

  // Handle page visibility change (improved - no aggressive logout)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched away from tab - just update activity time
        if (user) {
          updateLastActivity();
        }
      } else {
        // User came back to tab - update activity and reset timeout if needed
        if (user) {
          updateLastActivity();
          // Restart session timeout to ensure proper timing
          const cleanupActivity = startSessionTimeout();
          return cleanupActivity;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const loginTime = new Date().getTime();
        
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('loginTime', loginTime.toString());
        
        // Initialize activity tracking
        updateLastActivity();
        
        // Start session management
        startSessionTimeout();
        
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const sendOTP = async (name, email) => {
    try {
      const response = await fetch('http://localhost:3000/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();
      return { success: data.success, message: data.message };
    } catch (error) {
      console.error('Send OTP error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const verifyOTP = async (email, otp, password) => {
    try {
      const response = await fetch('http://localhost:3000/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();

      if (data.success) {
        const loginTime = new Date().getTime();
        
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('loginTime', loginTime.toString());
        
        // Initialize activity tracking
        updateLastActivity();
        
        // Start session management
        startSessionTimeout();
        
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  // Extend session (useful for keeping active users logged in)
  const extendSession = () => {
    if (user && shouldContinueSession()) {
      updateLastActivity();
      // Restart timeouts with fresh timing
      const cleanupActivity = startSessionTimeout();
      return cleanupActivity;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    sendOTP,
    verifyOTP,
    logout,
    extendSession,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isContentManager: user?.role === 'content-manager',
    isModerator: user?.role === 'moderator' || user?.role === 'admin',
    hasContentAccess: user?.role === 'admin' || user?.role === 'content-manager',
    fetchUsers: async (page = 1, limit = 10, search = '', role = '') => {
      try {
        const response = await fetch(`http://localhost:3000/admin/users?page=${page}&limit=${limit}&search=${search}&role=${role}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return await response.json();
      } catch (error) {
        return { success: false, message: 'Network error. Please try again.' };
      }
    },
    fetchStats: async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/stats', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return await response.json();
      } catch (error) {
        return { success: false, message: 'Network error. Please try again.' };
      }
    },
    updateUserRole: async (userId, role) => {
      try {
        const response = await fetch(`http://localhost:3000/admin/users/${userId}/role`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role }),
        });
        return await response.json();
      } catch (error) {
        return { success: false, message: 'Network error. Please try again.' };
      }
    },
    updateUserStatus: async (userId, isActive) => {
      try {
        const response = await fetch(`http://localhost:3000/admin/users/${userId}/status`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive }),
        });
        return await response.json();
      } catch (error) {
        return { success: false, message: 'Network error. Please try again.' };
      }
    },
    deleteUser: async (userId) => {
      try {
        const response = await fetch(`http://localhost:3000/admin/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        return await response.json();
      } catch (error) {
        return { success: false, message: 'Network error. Please try again.' };
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};