import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    sessionStorage.clear(); // Clear session storage as well
    
    if (reason === 'timeout') {
      alert('Your session has expired after 7 days. Please log in again.');
    } else if (reason === 'inactivity') {
      alert('You have been logged out due to inactivity (2 hours).');
    }
  };

  // Start session timeout
  const startSessionTimeout = () => {
    clearTimeouts();
    
    // Absolute session timeout (7 days from login)
    sessionTimeoutRef.current = setTimeout(() => {
      logout('timeout');
    }, SESSION_TIMEOUT);

    // Activity timeout (2 hours of inactivity)
    const resetActivityTimeout = () => {
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      activityTimeoutRef.current = setTimeout(() => {
        logout('inactivity');
      }, ACTIVITY_TIMEOUT);
    };

    // Reset activity timeout on user interaction
    resetActivityTimeout();
    
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

  // Check if session is still valid
  const isSessionValid = () => {
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) return false;
    
    const now = new Date().getTime();
    const sessionAge = now - parseInt(loginTime);
    
    return sessionAge < SESSION_TIMEOUT;
  };

  useEffect(() => {
    // Check if user is logged in on app start
    if (token) {
      const userData = localStorage.getItem('user');
      if (userData && isSessionValid()) {
        setUser(JSON.parse(userData));
        const cleanupActivity = startSessionTimeout();
        
        // Cleanup on unmount
        return cleanupActivity;
      } else {
        // Session expired, clear everything
        logout('timeout');
      }
    }
    setLoading(false);
  }, [token]);

  // Handle page visibility change (tab switching, minimizing)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched away from tab or minimized window
        // Store the time when they left
        if (user) {
          sessionStorage.setItem('tabHiddenTime', new Date().getTime().toString());
        }
      } else {
        // User came back to tab
        const hiddenTime = sessionStorage.getItem('tabHiddenTime');
        if (hiddenTime && user) {
          const now = new Date().getTime();
          const timeAway = now - parseInt(hiddenTime);
          
          // If away for more than 30 minutes, logout
          if (timeAway > 30 * 60 * 1000) {
            logout('inactivity');
          }
          
          sessionStorage.removeItem('tabHiddenTime');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  // Handle beforeunload (tab/window closing)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (user) {
        // Clear session storage to force re-login
        sessionStorage.clear();
        
        // Note: We can't reliably clear localStorage here due to browser restrictions
        // But we can set a flag to check on next load
        localStorage.setItem('tabClosed', 'true');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  // Check if tab was closed on app initialization
  useEffect(() => {
    const tabClosed = localStorage.getItem('tabClosed');
    if (tabClosed === 'true') {
      // Tab was closed, force logout
      localStorage.removeItem('tabClosed');
      logout('session_ended');
    }
  }, []);

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

  const value = {
    user,
    token,
    loading,
    login,
    sendOTP,
    verifyOTP,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isModerator: user?.role === 'moderator' || user?.role === 'admin',
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