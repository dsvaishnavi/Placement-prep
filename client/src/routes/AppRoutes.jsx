// AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'

// Main Pages
import Home from '../pages/Home'
import Aptitude from '../pages/Aptitude'
import CoreConcepts from '../pages/CoreConcepts'
import Progress from '../pages/Progress'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Admin from '../pages/Admin'
import AdminSetup from '../pages/AdminSetup'
import ResumeAnalyzer from '../pages/ResumeAnalyzer'
import LandingPage from '../pages/LandingPage'
import ToastTestPage from '../pages/ToastTestPage'

// Legal/Footer Pages (now in legalpages folder at same level as pages folder)
import PrivacyPolicy from '../legalpages/PrivacyPolicy'
import TermsOfService from '../legalpages/TermsOfService'
import CookiePolicy from '../legalpages/CookiePolicy'
import AboutUs from '../legalpages/AboutUs'
import Contact from '../legalpages/Contact'
import Blog from '../legalpages/Blog'
import Careers from '../legalpages/Careers'

function AppRoutes({ landingTheme, setLandingTheme, appTheme, setAppTheme }) {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage theme={landingTheme} setTheme={setLandingTheme} />} />
      
      {/* Public Auth Pages */}
      <Route path="/login" element={<Login theme={appTheme} />} />
      <Route path="/signup" element={<Signup theme={appTheme} />} />
      <Route path="/admin-setup" element={<AdminSetup theme={appTheme} />} />
      <Route path="/toast-test" element={<ToastTestPage />} />
      
      {/* Protected Main App Pages */}
      <Route path="/home" element={
        <ProtectedRoute theme={appTheme}>
          <Home theme={appTheme} />
        </ProtectedRoute>
      } />
      <Route path="/aptitude" element={
        <ProtectedRoute theme={appTheme}>
          <Aptitude theme={appTheme} />
        </ProtectedRoute>
      } />
      <Route path="/core-concepts" element={
        <ProtectedRoute theme={appTheme}>
          <CoreConcepts theme={appTheme} />
        </ProtectedRoute>
      } />
      <Route path="/progress" element={
        <ProtectedRoute theme={appTheme}>
          <Progress theme={appTheme} />
        </ProtectedRoute>
      } />
      {/* Protected Admin Panel - Admin Only */}
      <Route path="/admin" element={
        <ProtectedRoute theme={appTheme} requiredRoles={['admin']}>
          <Admin theme={appTheme} />
        </ProtectedRoute>
      } />
      
      {/* Protected Content Management - Admin and Content Manager */}
      <Route path="/content-management" element={
        <ProtectedRoute theme={appTheme} requiredRoles={['admin', 'content-manager']}>
          <Admin theme={appTheme} contentManagerMode={true} />
        </ProtectedRoute>
      } />
      <Route path="/resumeanalyzer" element={
        <ProtectedRoute theme={appTheme}>
          <ResumeAnalyzer theme={appTheme} />
        </ProtectedRoute>
      } />
      
      {/* Public Legal/Footer Pages */}
      <Route path="/privacy" element={<PrivacyPolicy theme={appTheme} />} />
      <Route path="/terms" element={<TermsOfService theme={appTheme} />} />
      <Route path="/cookies" element={<CookiePolicy theme={appTheme} />} />
      <Route path="/about" element={<AboutUs theme={appTheme} />} />
      <Route path="/contact" element={<Contact theme={appTheme} />} />
      <Route path="/blog" element={<Blog theme={appTheme} />} />
      <Route path="/careers" element={<Careers theme={appTheme} />} />

    </Routes>
  )
}

export default AppRoutes


