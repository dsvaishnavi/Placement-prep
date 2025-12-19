// App.jsx
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import SplashScreen from './components/SplashScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <AppRoutes />
    </div>
  )
}

export default App