import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Aptitude from '../pages/Aptitude'
import CoreConcepts from '../pages/CoreConcepts'
import Progress from '../pages/Progress'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Admin from '../pages/Admin'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aptitude" element={<Aptitude />} />
      <Route path="/core-concepts" element={<CoreConcepts />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default AppRoutes

