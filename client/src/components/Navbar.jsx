import { NavLink } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

function Navbar() {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/aptitude', label: 'Aptitude Exam' },
    { path: '/core-concepts', label: 'Core Concepts' },
    { path: '/progress', label: 'Progress' },
    { path: '/login', label: 'Login' }

  ]

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <span className="text-xl font-bold">Prepixify</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full transition-colors ${isActive
                      ? 'bg-white/20 text-white font-medium'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 