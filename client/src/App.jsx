// App.jsx
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import SplashScreen from './components/SplashScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState('dark')
  const location = useLocation()

  useEffect(() => {
    // Mark as mounted
    setIsMounted(true)

    // Check if we should skip splash screen (for development)
    const skipSplash = localStorage.getItem('skipSplash') === 'true'

    // Simulate minimum loading time (for smooth animation completion)
    const minLoadingTime = 3200 // 3.2 seconds

    if (skipSplash) {
      setIsLoading(false)
    } else {
      const timer = setTimeout(() => {
        setIsLoading(false)
        // Optional: Mark splash as shown for this session
        sessionStorage.setItem('splashShown', 'true')
      }, minLoadingTime)

      return () => clearTimeout(timer)
    }
  }, [])

  // Show splash screen only when mounted and loading
  if (!isMounted || isLoading) {
    return <SplashScreen />
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-900' : 'bg-background'}`}>
      {location.pathname !== '/' && <Navbar theme={theme} setTheme={setTheme} />}
      <AppRoutes theme={theme} setTheme={setTheme} />
    </div>
  )
}

export default App