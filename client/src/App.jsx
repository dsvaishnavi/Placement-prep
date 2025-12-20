// App.jsx
import { useState, useEffect, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [landingTheme, setLandingTheme] = useState('dark')
  const [appTheme, setAppTheme] = useState(() => {
    // Load theme from localStorage or default to 'light' for app pages
    return localStorage.getItem('appTheme') || 'light'
  })
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Show loading on route change
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500) // Simulate loading time
    return () => clearTimeout(timer)
  }, [location.pathname])

  useEffect(() => {
    // Save theme to localStorage
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

  return (
    <div className={`min-h-screen transition-all duration-300 relative ${currentTheme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
      {location.pathname !== '/' && <Navbar theme={currentTheme} setTheme={setCurrentTheme} />}
      <Suspense fallback={<LoadingSpinner theme={currentTheme} />}>
        <AppRoutes landingTheme={landingTheme} setLandingTheme={setLandingTheme} appTheme={appTheme} setAppTheme={setAppTheme} />
      </Suspense>
      {isLoading && <LoadingSpinner theme={currentTheme} />}
    </div>
  )
}

export default App