import { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Check if user is logged in on app start
    if (token) {
      // You could validate the token here by calling an API endpoint
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
    setLoading(false);
  }, [token]);

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
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
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
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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