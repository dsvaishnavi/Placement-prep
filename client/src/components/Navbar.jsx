import { NavLink } from 'react-router-dom'
import { GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/aptitude', label: 'Aptitude Exam' },
    { path: '/core-concepts', label: 'Core Concepts' },
    { path: '/progress', label: 'Progress' },
    { path: '/resumeanalyzer', label: 'Resume Analyzer' },
    { path: '/login', label: 'Login' }

  ]

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <span className="text-xl font-bold">SkillSync</span>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-1">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md transition-colors ${isActive
                        ? 'bg-white/20 text-white font-medium'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 