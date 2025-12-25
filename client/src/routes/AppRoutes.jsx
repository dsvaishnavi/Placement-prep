// AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'

// Main Pages
import Home from '../pages/Home'
import Aptitude from '../pages/Aptitude'
import CoreConcepts from '../pages/CoreConcepts'
import Progress from '../pages/Progress'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Admin from '../pages/Admin'
import ResumeAnalyzer from '../pages/ResumeAnalyzer'
import LandingPage from '../pages/LandingPage'

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
      
      {/* Main App Pages */}
      <Route path="/home" element={<Home theme={appTheme} />} />
      <Route path="/aptitude" element={<Aptitude theme={appTheme} />} />
      <Route path="/core-concepts" element={<CoreConcepts theme={appTheme} />} />
      <Route path="/progress" element={<Progress theme={appTheme} />} />
      <Route path="/login" element={<Login theme={appTheme} />} />
      <Route path="/signup" element={<Signup theme={appTheme} />} />
      <Route path="/admin" element={<Admin theme={appTheme} />} />
      <Route path="/resumeanalyzer" element={<ResumeAnalyzer theme={appTheme} />} />
      
      {/* Legal/Footer Pages */}
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