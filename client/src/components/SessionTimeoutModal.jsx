import { useState, useEffect } from 'react'
import { AlertTriangle, Clock, Shield } from 'lucide-react'

const SessionTimeoutModal = ({ 
  isOpen, 
  timeLeft, 
  onExtend, 
  onLogout, 
  theme 
}) => {
  const [countdown, setCountdown] = useState(timeLeft)

  useEffect(() => {
    if (!isOpen) return

    setCountdown(timeLeft)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1000) {
          onLogout()
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, timeLeft, onLogout])

  const formatTime = (ms) => {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000))
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
    const seconds = Math.floor((ms % (60 * 1000)) / 1000)
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`max-w-md w-full rounded-xl shadow-2xl border ${theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-gray-200'
        }`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-yellow-500/20">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Session Expiring Soon
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Your session will expire automatically
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center space-x-2 px-4 py-3 rounded-lg ${theme === 'dark'
              ? 'bg-red-500/20 text-red-300'
              : 'bg-red-50 text-red-800'
              }`}>
              <Clock className="w-5 h-5" />
              <span className="text-2xl font-mono font-bold">
                {formatTime(countdown)}
              </span>
            </div>
          </div>

          <p className={`text-center mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            For your security, you'll be automatically logged out when the timer reaches zero. 
            Your session will be extended for another 7 days if you choose to continue.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onExtend}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors font-medium"
            >
              <Shield className="w-4 h-4" />
              <span>Extend Session</span>
            </button>
            <button
              onClick={onLogout}
              className={`flex-1 px-4 py-3 rounded-lg transition-colors font-medium ${theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
            >
              Logout Now
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 rounded-b-xl ${theme === 'dark'
          ? 'bg-gray-900/50'
          : 'bg-gray-50'
          }`}>
          <p className={`text-xs text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            Sessions automatically expire after 7 days for security
          </p>
        </div>
      </div>
    </div>
  )
}

export default SessionTimeoutModal