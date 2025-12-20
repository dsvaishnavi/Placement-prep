// AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Aptitude from '../pages/Aptitude'
import CoreConcepts from '../pages/CoreConcepts'
import Progress from '../pages/Progress'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Admin from '../pages/Admin'
import ResumeAnalyzer from '../pages/ResumeAnalyzer'
import LandingPage from '../pages/LandingPage'

function AppRoutes({ landingTheme, setLandingTheme, appTheme, setAppTheme }) {
  return (
    <Routes>
      <Route path="/" element={<LandingPage theme={landingTheme} setTheme={setLandingTheme} />} />
      <Route path="/home" element={<Home theme={appTheme} />} />
      <Route path="/aptitude" element={<Aptitude theme={appTheme} />} />
      <Route path="/core-concepts" element={<CoreConcepts theme={appTheme} />} />
      <Route path="/progress" element={<Progress theme={appTheme} />} />
      <Route path="/login" element={<Login theme={appTheme} />} />
      <Route path="/signup" element={<Signup theme={appTheme} />} />
      <Route path="/admin" element={<Admin theme={appTheme} />} />
      <Route path="/resumeanalyzer" element={<ResumeAnalyzer theme={appTheme} />} />

    </Routes>
  )
}

export default AppRoutes