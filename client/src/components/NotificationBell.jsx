import { useState, useEffect, useRef } from 'react'
import { Bell, X, Check, CheckCheck, Trash2, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const NotificationBell = ({ theme }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef(null)
  const { token } = useAuth()

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!token) return
    
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/notifications/my-notifications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (data.success) {
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`http://localhost:3000/notifications/mark-read/${notificationId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (data.success) {
        // Update local state
        setNotifications(prev => prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, read: true, readAt: new Date() }
            : notif
        ))
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch('http://localhost:3000/notifications/mark-all-read', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      
      if (data.success) {
        setNotifications(prev => prev.map(notif => ({ 
          ...notif, 
          read: true, 
          readAt: new Date() 
        })))
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    }
  }

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'announcement':
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <Info className="w-5 h-5 text-gray-500" />
    }
  }

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'medium':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'low':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  // Format time ago
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
    return new Date(date).toLocaleDateString()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch notifications on mount and periodically
  useEffect(() => {
    fetchNotifications()
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    
    return () => clearInterval(interval)
  }, [token])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => {
          setShowDropdown(!showDropdown)
          if (!showDropdown) fetchNotifications()
        }}
        className={`
          relative flex items-center justify-center w-10 h-10 rounded-lg
          transition-all duration-300 ease-out
          ${theme === 'dark'
            ? 'bg-gray-800/50 hover:bg-gray-700/50 text-white border border-white/10'
            : 'bg-white/70 hover:bg-white/80 text-gray-800 border border-gray-200/50'
          }
          backdrop-blur-sm
        `}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-current">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className={`
          absolute top-full right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] rounded-lg shadow-xl backdrop-blur-xl border z-50
          ${theme === 'dark'
            ? 'bg-gray-800/95 border-white/20'
            : 'bg-white/95 border-gray-200'
          }
        `}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/20">
            <div>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {unreadCount} unread
                </p>
              )}
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className={`
                  flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium
                  transition-colors
                  ${theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }
                `}
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4">
                <Bell className={`w-12 h-12 mb-2 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  No notifications yet
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200/10">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`
                      p-4 transition-colors cursor-pointer
                      ${!notification.read 
                        ? theme === 'dark' 
                          ? 'bg-blue-500/10 hover:bg-blue-500/15' 
                          : 'bg-blue-50 hover:bg-blue-100'
                        : theme === 'dark'
                          ? 'hover:bg-gray-700/30'
                          : 'hover:bg-gray-50'
                      }
                    `}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5"></div>
                          )}
                        </div>
                        
                        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {notification.message}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                          
                          {notification.priority !== 'medium' && (
                            <span className={`
                              text-xs px-2 py-0.5 rounded-full border
                              ${getPriorityColor(notification.priority)}
                            `}>
                              {notification.priority}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className={`
              p-3 border-t border-gray-200/20 text-center
            `}>
              <button
                onClick={() => setShowDropdown(false)}
                className={`
                  text-sm font-medium transition-colors
                  ${theme === 'dark'
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-700'
                  }
                `}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationBell
