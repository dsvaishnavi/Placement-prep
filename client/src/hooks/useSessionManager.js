import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export const useSessionManager = () => {
  const { user, logout } = useAuth();
  const warningShownRef = useRef(false);
  const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000; // 7 days
  const WARNING_TIME = 60 * 60 * 1000; // Show warning 1 hour before expiry

  useEffect(() => {
    if (!user) return;

    const checkSession = () => {
      const loginTime = localStorage.getItem('loginTime');
      if (!loginTime) {
        logout('session_invalid');
        return;
      }

      const now = new Date().getTime();
      const sessionAge = now - parseInt(loginTime);
      const timeLeft = SESSION_TIMEOUT - sessionAge;

      // Session expired
      if (timeLeft <= 0) {
        logout('timeout');
        return;
      }

      // Show warning if less than 1 hour left and not already shown
      if (timeLeft <= WARNING_TIME && !warningShownRef.current) {
        warningShownRef.current = true;
        
        const shouldExtend = window.confirm(
          `Your session will expire in ${Math.ceil(timeLeft / 60000)} minutes. Would you like to extend it for another 7 days?`
        );

        if (shouldExtend) {
          extendSession();
        } else {
          logout('manual');
        }
      }
    };

    const extendSession = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/auth/refresh-session', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const newLoginTime = new Date().getTime();
          localStorage.setItem('loginTime', newLoginTime.toString());
          warningShownRef.current = false; // Reset warning flag
        } else {
          logout('session_invalid');
        }
      } catch (error) {
        console.error('Failed to extend session:', error);
        logout('session_error');
      }
    };

    // Check session every 5 minutes instead of every minute for 7-day sessions
    const interval = setInterval(checkSession, 5 * 60000);
    
    // Initial check
    checkSession();

    return () => {
      clearInterval(interval);
    };
  }, [user, logout]);

  // Handle page focus/blur for tab switching detection
  useEffect(() => {
    if (!user) return;

    let blurTime = null;

    const handleBlur = () => {
      blurTime = new Date().getTime();
    };

    const handleFocus = () => {
      if (blurTime) {
        const timeAway = new Date().getTime() - blurTime;
        
        // If away for more than 2 hours, logout
        if (timeAway > 2 * 60 * 60 * 1000) {
          logout('inactivity');
        }
        
        blurTime = null;
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [user, logout]);
};

export default useSessionManager;