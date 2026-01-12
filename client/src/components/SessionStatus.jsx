import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import SessionTimeoutModal from './SessionTimeoutModal'

const SessionStatus = ({ theme }) => {
  const { user } = useAuth()
  const [timeLeft, setTimeLeft] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!user) return

    const updateTimeLeft = () => {
      const loginTime = localStorage.getItem('loginTime')
      if (!loginTime) return

      const now = new Date().getTime()
      const sessionAge = now - parseInt(loginTime)
      const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000 // 7 days
      const remaining = SESSION_TIMEOUT - sessionAge

      if (remaining <= 0) {
        // Session expired, but let AuthContext handle the logout
        return
      }

      setTimeLeft(remaining)
      
      // Show modal when less than 1 hour left (instead of 5 minutes for 7-day sessions)
      if (remaining < 60 * 60 * 1000 && !showModal) {
        setShowModal(true)
      }
    }

    updateTimeLeft()
    // Check less frequently for 7-day sessions (every 5 minutes instead of every second)
    const interval = setInterval(updateTimeLeft, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [user, showModal])

  const extendSession = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/auth/refresh-session', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const newLoginTime = new Date().getTime()
        localStorage.setItem('loginTime', newLoginTime.toString())
        setShowModal(false)
      } else {
        // Let AuthContext handle invalid sessions
      }
    } catch (error) {
      console.error('Failed to extend session:', error)
    }
  }

  const handleLogout = () => {
    setShowModal(false)
    // Let AuthContext handle the logout
  }

  if (!user || !timeLeft) return null

  // Only show modal, no navbar indicator for 7-day sessions
  return (
    <SessionTimeoutModal
      isOpen={showModal}
      timeLeft={timeLeft}
      onExtend={extendSession}
      onLogout={handleLogout}
      theme={theme}
    />
  )
}

export default SessionStatus