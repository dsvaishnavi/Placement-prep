// App.jsx
import { useState, useEffect, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer' // Import the Footer
import AppRoutes from './routes/AppRoutes'
import LoadingSpinner from './components/LoadingSpinner'
import { useSessionManager } from './hooks/useSessionManager'
import SessionDebug from './components/SessionDebug'

function App() {
  const [landingTheme, setLandingTheme] = useState('dark')
  const [appTheme, setAppTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'light'
  })
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  // Initialize session management
  useSessionManager()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname === '/') {
      localStorage.setItem('landingTheme', landingTheme)
    } else {
      localStorage.setItem('appTheme', appTheme)
    }
  }, [landingTheme, appTheme, location.pathname])

  const currentTheme = location.pathname === '/' ? landingTheme : appTheme
  const setCurrentTheme = (newTheme) => {
    if (location.pathname === '/') {
      setLandingTheme(newTheme)
    } else {
      setAppTheme(newTheme)
    }
  }

  // Check if we should show footer (not on landing page)
  const showFooter = location.pathname !== '/'

  return (
    <div className={`min-h-screen transition-all duration-300 relative flex flex-col ${currentTheme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
      
      {location.pathname !== '/' && <Navbar theme={currentTheme} setTheme={setCurrentTheme} />}
      
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner theme={currentTheme} />}>
          <AppRoutes 
            landingTheme={landingTheme} 
            setLandingTheme={setLandingTheme} 
            appTheme={appTheme} 
            setAppTheme={setAppTheme} 
          />
        </Suspense>
      </main>

      {/* Conditionally render Footer */}
      {showFooter && <Footer theme={appTheme} />}
      
      {/* Session Debug Component (Development Only) */}
      <SessionDebug theme={currentTheme} />
      
      {isLoading && <LoadingSpinner theme={currentTheme} />}
    </div>
  )
}

export default App