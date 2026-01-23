// App.jsx
import { useState, useEffect, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import Footer from './components/Footer' // Import the Footer
import AppRoutes from './routes/AppRoutes'
import LoadingSpinner from './components/LoadingSpinner'
import { useSessionManager } from './hooks/useSessionManager'

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
    // Only show loading animation for actual navigation, not for refresh
    // Check if this is a page refresh by looking at performance navigation type
    const isPageRefresh = performance.navigation?.type === 1 || 
                         performance.getEntriesByType('navigation')[0]?.type === 'reload';
    
    // Don't show loading on refresh if user has a token (likely authenticated)
    if (isPageRefresh && localStorage.getItem('token')) {
      return; // Skip loading animation on refresh for authenticated users
    }
    
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 300) // Reduced from 500ms to 300ms
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

  // Check if we should show navbar (exclude landing page, auth pages, admin pages, test pages, and exam pages)
  const authPages = ['/login', '/signup', '/admin-setup']
  const adminPages = ['/admin']
  const testPages = ['/toast-test']
  const examPages = ['/aptitude-exam']
  const excludedPages = ['/', ...authPages, ...adminPages, ...testPages, ...examPages]
  const showNavbar = !excludedPages.includes(location.pathname)
  
  // Check if we should show footer (not on landing page or exam pages)
  const showFooter = location.pathname !== '/' && !examPages.includes(location.pathname)

  return (
    <div className={`min-h-screen transition-all duration-300 relative flex flex-col ${currentTheme === 'dark'
      ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-black'
      : 'bg-gradient-to-b from-gray-50 via-blue-50/30 to-white'
      }`}>
      
      {showNavbar && <Navbar theme={currentTheme} setTheme={setCurrentTheme} />}
      
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
      
      {isLoading && <LoadingSpinner theme={currentTheme} />}
    </div>
  )
}

export default App