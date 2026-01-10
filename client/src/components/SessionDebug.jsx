import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

// Debug component to show session status (only in development)
const SessionDebug = ({ theme }) => {
  const { user, isAuthenticated } = useAuth()
  const [sessionInfo, setSessionInfo] = useState({})

  useEffect(() => {
    if (!isAuthenticated) return

    const updateSessionInfo = () => {
      const loginTime = localStorage.getItem('loginTime')
      const token = localStorage.getItem('token')
      const tabClosed = localStorage.getItem('tabClosed')
      const tabHiddenTime = sessionStorage.getItem('tabHiddenTime')

      if (loginTime) {
        const now = new Date().getTime()
        const sessionAge = now - parseInt(loginTime)
        const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000 // 7 days
        const timeLeft = SESSION_TIMEOUT - sessionAge

        setSessionInfo({
          loginTime: new Date(parseInt(loginTime)).toLocaleString(),
          sessionAge: Math.floor(sessionAge / (60 * 60 * 1000)), // Show in hours
          timeLeft: Math.floor(timeLeft / (60 * 60 * 1000)), // Show in hours
          hasToken: !!token,
          tabClosed: !!tabClosed,
          tabHidden: !!tabHiddenTime,
          isValid: timeLeft > 0
        })
      }
    }

    updateSessionInfo()
    const interval = setInterval(updateSessionInfo, 30000) // Update every 30 seconds for 7-day sessions

    return () => clearInterval(interval)
  }, [isAuthenticated])

  // Only show in development
  if (import.meta.env.PROD || !isAuthenticated) return null

  return (
    <div className={`fixed bottom-4 right-4 p-3 rounded-lg text-xs max-w-xs z-50 ${theme === 'dark'
      ? 'bg-gray-800 border border-gray-700 text-gray-300'
      : 'bg-white border border-gray-200 text-gray-700'
      }`}>
      <div className="font-semibold mb-2">🔐 Session Debug</div>
      <div className="space-y-1">
        <div>👤 User: {user?.name}</div>
        <div>⏰ Login: {sessionInfo.loginTime}</div>
        <div>📊 Age: {sessionInfo.sessionAge}h</div>
        <div className={sessionInfo.timeLeft < 1 ? 'text-red-500' : ''}>
          ⏳ Left: {sessionInfo.timeLeft}h
        </div>
        <div>🎫 Token: {sessionInfo.hasToken ? '✅' : '❌'}</div>
        <div>🚪 Tab: {sessionInfo.tabClosed ? '🔴' : '🟢'}</div>
        <div>👁️ Hidden: {sessionInfo.tabHidden ? '🔴' : '🟢'}</div>
        <div className={sessionInfo.isValid ? 'text-green-500' : 'text-red-500'}>
          Status: {sessionInfo.isValid ? 'Valid' : 'Expired'}
        </div>
      </div>
    </div>
  )
}

export default SessionDebug